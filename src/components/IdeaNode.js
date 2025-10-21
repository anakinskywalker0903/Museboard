import React, { useState } from 'react';

const IdeaNode = ({ idea, isSelected, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(idea.text);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate({ ...idea, text });
  };

  return (
    <div
      className="absolute cursor-move"
      style={{
        left: idea.x,
        top: idea.y,
        zIndex: 10,
      }}
    >
      <div
        className="rounded-lg shadow-lg transition-all"
        style={{
          width: '180px',
          padding: '12px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          border: isSelected 
            ? '2px solid #ffe81f' 
            : '1px solid rgba(255, 232, 31, 0.4)',
          boxShadow: isSelected
            ? '0 0 20px rgba(255, 232, 31, 0.6)'
            : '0 4px 6px rgba(0, 0, 0, 0.3)',
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            onBlur={handleBlur}
            autoFocus
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffe81f',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '14px',
              fontWeight: '600',
              textShadow: '0 0 10px rgba(255, 232, 31, 0.6)',
            }}
          />
        ) : (
          <div
            onClick={() => setIsEditing(true)}
            style={{
              color: '#ffe81f',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '14px',
              fontWeight: '600',
              textShadow: '0 0 10px rgba(255, 232, 31, 0.6)',
              cursor: 'text',
              wordWrap: 'break-word',
            }}
          >
            {text}
          </div>
        )}
        
        <button
          onClick={onDelete}
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 232, 31, 0.4)',
            borderRadius: '4px',
            color: '#ffe81f',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ffe81f';
            e.target.style.color = '#000';
            e.target.style.boxShadow = '0 0 10px rgba(255, 232, 31, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.6)';
            e.target.style.color = '#ffe81f';
            e.target.style.boxShadow = 'none';
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default IdeaNode;