import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Load theme from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('Brainstormzz-theme');
    return savedTheme || 'dark';
  });

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('Brainstormzz-theme', theme);
    // Apply theme to document body
    document.body.className = theme === 'dark' ? 'theme-dark' : 'theme-light';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const themes = {
    dark: {
      // Star Wars Dark Theme
      background: 'linear-gradient(180deg, #000000 0%, #0b0d17 100%)',
      boardBg: 'linear-gradient(180deg, #000000 0%, #0b0d17 100%)',
      cardBg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      text: '#ffe81f',
      textSecondary: 'rgba(255, 232, 31, 0.8)',
      border: 'rgba(255, 232, 31, 0.3)',
      borderSelected: '#ffe81f',
      shadow: '0 0 20px rgba(255, 232, 31, 0.2)',
      shadowSelected: '0 0 20px rgba(255, 232, 31, 0.6)',
      textShadow: '0 0 10px rgba(255, 232, 31, 0.6)',
      gridLine: '#ffe81f',
      connectionLine: '#ffe81f',
      buttonBg: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      buttonBorder: 'rgba(255, 232, 31, 0.4)',
      buttonHoverBg: 'linear-gradient(135deg, #222 0%, #111 100%)',
      inputBg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      fontFamily: 'Rajdhani, sans-serif',
    },
    light: {
      // Clean White Theme
      background: 'linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)',
      boardBg: '#ffffff',
      cardBg: '#ffffff',
      text: '#1f2937',
      textSecondary: '#6b7280',
      border: '#e5e7eb',
      borderSelected: '#3b82f6',
      shadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      shadowSelected: '0 4px 12px rgba(59, 130, 246, 0.4)',
      textShadow: 'none',
      gridLine: '#e5e7eb',
      connectionLine: '#9ca3af',
      buttonBg: '#f3f4f6',
      buttonBorder: '#d1d5db',
      buttonHoverBg: '#e5e7eb',
      inputBg: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
    }
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};