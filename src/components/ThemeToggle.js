import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: isDark ? '#1a1a2e' : '#f5f5f5',
        boxShadow: isDark 
          ? '0 0 15px rgba(255, 0, 0, 0.5), inset 0 0 10px rgba(255, 0, 0, 0.3)'
          : '0 0 15px rgba(255, 200, 0, 0.5), inset 0 0 10px rgba(255, 200, 0, 0.3)'
      }}
      aria-label="Toggle theme"
    >
      {/* Lightsaber blade */}
      <div
        className="absolute transition-all duration-300"
        style={{
          width: '3px',
          height: isDark ? '20px' : '20px',
          backgroundColor: isDark ? '#ff0000' : '#ffcc00',
          borderRadius: '2px',
          boxShadow: isDark
            ? '0 0 10px #ff0000, 0 0 20px rgba(255, 0, 0, 0.8)'
            : '0 0 10px #ffcc00, 0 0 20px rgba(255, 200, 0, 0.8)',
          left: isDark ? '4px' : '9px',
        }}
      />
      
      {/* Lightsaber handle */}
      <div
        className="absolute transition-all duration-300"
        style={{
          width: '6px',
          height: '10px',
          backgroundColor: '#333',
          borderRadius: '1px',
          left: isDark ? '5px' : '10px',
          bottom: '-2px',
        }}
      />

      {/* Labels */}
      <span
        className="absolute text-xs font-bold transition-opacity duration-300"
        style={{
          left: '2px',
          opacity: isDark ? 1 : 0.3,
          color: '#ff0000',
          fontSize: '10px',
        }}
      >
        D
      </span>
      <span
        className="absolute text-xs font-bold transition-opacity duration-300"
        style={{
          right: '2px',
          opacity: isDark ? 0.3 : 1,
          color: '#ffcc00',
          fontSize: '10px',
        }}
      >
        L
      </span>
    </button>
  );
};