import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Dark is default

  useEffect(() => {
    // Check localStorage for saved preference (optional)
    const saved = localStorage.getItem('theme-mode');
    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      // Default to dark
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev;
      localStorage.setItem('theme-mode', newValue ? 'dark' : 'light');
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