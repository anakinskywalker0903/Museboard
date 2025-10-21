import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Sith (dark) is default

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme-mode');
    if (saved) {
      setIsDark(saved === 'sith');
    } else {
      // Default to Sith (dark)
      setIsDark(true);
    }
  }, []);

  // Apply theme to document whenever isDark changes
  useEffect(() => {
    const theme = isDark ? 'dark' : 'light';
    // Set data-theme attribute on document root
    document.documentElement.setAttribute('data-theme', theme);
    // Also add class for Tailwind dark mode (if needed)
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev;
      localStorage.setItem('theme-mode', newValue ? 'sith' : 'jedi');
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};