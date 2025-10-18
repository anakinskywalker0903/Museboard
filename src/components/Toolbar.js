import React, { useState } from 'react';
import useAI from '../hooks/useAI';

const Toolbar = ({ ideas, selectedIdeas, onIdeasChange, onSelectedIdeasChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [summary, setSummary] = useState('');
  const { 
    isLoading, 
    error, 
    expandIdeas, 
    refineIdea, 
    summarizeIdeas, 
    translateIdea 
  } = useAI();

  const handleExpandIdeas = async () => {
    if (!inputValue.trim()) {
      alert('Please enter an idea or prompt first!');
      return;
    }

    try {
      const expandedIdeas = await expandIdeas(inputValue);
      
      // Clear existing ideas and add new ones
      const newIdeas = expandedIdeas.map((idea, index) => ({
        id: Date.now() + index,
        text: idea,
        x: 150 + (index % 3) * 180,
        y: 120 + Math.floor(index / 3) * 120,
        connections: []
      }));
      
      // Replace all existing ideas with new ones
      onIdeasChange(newIdeas);
      onSelectedIdeasChange([]); // Clear selection
      setInputValue(''); // Clear input after expansion
    } catch (err) {
      console.error('Failed to expand ideas:', err);
    }
  };

  const handleRefineIdeas = async () => {
    if (selectedIdeas.length === 0) {
      alert('Please select ideas to refine first!');
      return;
    }

    try {
      const selectedIdeaObjects = ideas.filter(idea => 
        selectedIdeas.includes(idea.id)
      );
      
      for (const idea of selectedIdeaObjects) {
        const refinedText = await refineIdea(idea.text);
        
        // Update the idea with refined text
        onIdeasChange(ideas.map(i => 
          i.id === idea.id ? { ...i, text: refinedText } : i
        ));
      }
      
      onSelectedIdeasChange([]); // Clear selection after refining
    } catch (err) {
      console.error('Failed to refine ideas:', err);
    }
  };

  const handleSummarize = async () => {
    if (ideas.length === 0) {
      alert('No ideas to summarize!');
      return;
    }

    try {
      const summaryText = await summarizeIdeas(ideas);
      setSummary(summaryText);
    } catch (err) {
      console.error('Failed to summarize:', err);
    }
  };

  const handleClearBoard = () => {
    onIdeasChange([]);
    onSelectedIdeasChange([]);
    setSummary('');
    setInputValue('');
  };

  const handleTranslate = async () => {
    if (ideas.length === 0) {
      alert('No ideas to translate!');
      return;
    }

    try {
      const languages = ['spanish', 'french', 'hindi'];
      const randomLang = languages[Math.floor(Math.random() * languages.length)];
      
      // Translate first few ideas as demo
      const ideasToTranslate = ideas.slice(0, 3);
      
      for (const idea of ideasToTranslate) {
        const translation = await translateIdea(idea.text, randomLang);
        
        // Add translation as a new idea
        const translatedIdea = {
          id: Date.now() + Math.random(),
          text: `${idea.text} → ${translation}`,
          x: idea.x + 50,
          y: idea.y + 50,
          connections: [idea.id]
        };
        
        onIdeasChange([...ideas, translatedIdea]);
      }
    } catch (err) {
      console.error('Failed to translate:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex flex-wrap gap-3">
        {/* Input Area */}
        <div className="flex-1 min-w-64">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your idea or prompt..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleExpandIdeas()}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleExpandIdeas}
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '⏳ Processing...' : '🧠 Expand Ideas'}
          </button>
          
          <button
            onClick={handleRefineIdeas}
            disabled={isLoading || selectedIdeas.length === 0}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '⏳ Processing...' : '✨ Refine'}
          </button>
          
          <button
            onClick={handleSummarize}
            disabled={isLoading || ideas.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '⏳ Processing...' : '📝 Summarize'}
          </button>
          
          <button
            onClick={handleTranslate}
            disabled={isLoading || ideas.length === 0}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '⏳ Processing...' : '🌍 Translate'}
          </button>
          
          <button
            onClick={handleClearBoard}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            🗑️ Clear Board
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-500 mr-2">⚠️</div>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Summary Display */}
      {summary && (
        <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-green-500 mr-2 mt-1">📝</div>
            <div>
              <h4 className="text-green-800 font-medium mb-2">AI Summary</h4>
              <pre className="text-green-700 text-sm whitespace-pre-wrap">{summary}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
        <div>
          {ideas.length} ideas • {selectedIdeas.length} selected
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
          <span>{isLoading ? 'AI Processing...' : 'AI Ready'}</span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
