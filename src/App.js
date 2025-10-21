import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import Board from './components/Board';
import Toolbar from './components/Toolbar';
import './App.css';

function AppContent() {
  const { isDark } = useTheme();
  const [ideas, setIdeas] = useState([]);
  const [selectedIdeas, setSelectedIdeas] = useState([]);

  const bgColor = isDark ? '#000000' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#1e3a8a';
  const headerBg = isDark ? '#000000' : '#ffffff';
  const borderColor = isDark ? '#333333' : '#e5e7eb';

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: bgColor,
      color: textColor,
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: borderColor,
        backgroundColor: headerBg
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold',
          color: isDark ? '#ffff00' : '#1e3a8a',
          margin: 0
        }}>
          Brainstormzz
        </h1>
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px' }}>
        <Toolbar 
          ideas={ideas}
          selectedIdeas={selectedIdeas}
          onIdeasChange={setIdeas}
          onSelectedIdeasChange={setSelectedIdeas}
        />
        <div style={{ marginTop: '24px' }}>
          <Board 
            ideas={ideas}
            selectedIdeas={selectedIdeas}
            onIdeasChange={setIdeas}
            onSelectedIdeasChange={setSelectedIdeas}
          />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;