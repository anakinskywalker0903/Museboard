import React, { useState } from 'react';
import Board from './components/Board';
import Toolbar from './components/Toolbar';
import './App.css';

function App() {
  const [ideas, setIdeas] = useState([]);
  const [selectedIdeas, setSelectedIdeas] = useState([]);

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🎯 MuseBoard
              </h1>
              <span className="ml-3 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                AI-Powered
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Turn thoughts into structured ideas
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Toolbar */}
          <Toolbar 
            ideas={ideas}
            selectedIdeas={selectedIdeas}
            onIdeasChange={setIdeas}
            onSelectedIdeasChange={setSelectedIdeas}
          />
          
          {/* Board */}
          <div className="mt-6">
            <Board 
              ideas={ideas}
              selectedIdeas={selectedIdeas}
              onIdeasChange={setIdeas}
              onSelectedIdeasChange={setSelectedIdeas}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-500">
            <p>Powered by Chrome's built-in AI • 100% Local • 100% Private</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
