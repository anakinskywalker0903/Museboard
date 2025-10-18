import React, { useState } from 'react';

const IdeaNode = ({ idea, isSelected, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(idea.text);

  const handleSave = () => {
    onUpdate({ ...idea, text: editText });
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(idea.text);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{
        left: idea.x,
        top: idea.y,
        zIndex: 10
      }}
    >
      <div className={`bg-white rounded-lg shadow-sm border-2 p-3 min-w-24 max-w-48 ${
        isSelected ? 'border-blue-500' : 'border-gray-200'
      }`}>
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="w-full text-sm font-medium bg-transparent border-none outline-none"
            autoFocus
          />
        ) : (
          <div className="flex items-center justify-between">
            <span 
              className="text-sm font-medium text-gray-800 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {idea.text}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="ml-2 text-gray-400 hover:text-red-500 text-xs"
            >
              ×
            </button>
          </div>
        )}
      </div>
      
      {/* Connection points */}
      <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
      <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-1/2 -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-1/2 -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default IdeaNode;
