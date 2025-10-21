import React, { useRef, useEffect, useState } from 'react';
import IdeaNode from './IdeaNode';

const Board = ({ ideas, selectedIdeas, onIdeasChange, onSelectedIdeasChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [dragStart, setDragStart] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ideas.forEach(idea => {
      idea.connections.forEach(connectedId => {
        const connectedIdea = ideas.find(i => i.id === connectedId);
        if (connectedIdea) {
          drawConnection(ctx, idea, connectedIdea);
        }
      });
    });
  }, [ideas]);

  const drawConnection = (ctx, idea1, idea2) => {
    ctx.beginPath();
    ctx.moveTo(idea1.x + 50, idea1.y + 25); // Center of first node
    ctx.lineTo(idea2.x + 50, idea2.y + 25); // Center of second node
    ctx.strokeStyle = '#ffe81f'; // Star Wars gold for lines
    ctx.lineWidth = 2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 232, 31, 0.5)';
    ctx.stroke();
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is on an existing idea
    const clickedIdea = ideas.find(idea => 
      x >= idea.x && x <= idea.x + 100 && 
      y >= idea.y && y <= idea.y + 50
    );

    if (clickedIdea) {
      // Toggle selection
      const newSelected = selectedIdeas.includes(clickedIdea.id)
        ? selectedIdeas.filter(id => id !== clickedIdea.id)
        : [...selectedIdeas, clickedIdea.id];
      onSelectedIdeasChange(newSelected);
    } else {
      // Add new idea
      const newIdea = {
        id: Date.now(),
        text: 'New idea',
        x: x - 50,
        y: y - 25,
        connections: []
      };
      onIdeasChange([...ideas, newIdea]);
    }
  };

  return (
    <div className="relative">
      {/* Canvas for connections */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Ideas container with Star Wars black theme */}
      <div 
        className="relative rounded-lg shadow-xl min-h-96"
        style={{ 
          height: '500px',
          background: 'linear-gradient(180deg, #000000 0%, #0b0d17 100%)',
          border: '2px solid rgba(255, 232, 31, 0.3)',
          boxShadow: '0 0 20px rgba(255, 232, 31, 0.2)',
          color: '#ffe81f'
        }}
        onClick={handleCanvasClick}
      >
        {/* Grid background - Star Wars gold tint */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffe81f 1px, transparent 1px),
              linear-gradient(to bottom, #ffe81f 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Idea nodes */}
        {ideas.map(idea => (
          <IdeaNode
            key={idea.id}
            idea={idea}
            isSelected={selectedIdeas.includes(idea.id)}
            onUpdate={(updatedIdea) => {
              onIdeasChange(ideas.map(i => 
                i.id === idea.id ? updatedIdea : i
              ));
            }}
            onDelete={() => {
              onIdeasChange(ideas.filter(i => i.id !== idea.id));
              onSelectedIdeasChange(selectedIdeas.filter(id => id !== idea.id));
            }}
          />
        ))}

        {/* Empty state with Star Wars styling */}
        {ideas.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ color: '#ffe81f' }}>
            <div className="text-center" style={{ 
              fontFamily: 'Rajdhani, sans-serif',
              textShadow: '0 0 15px rgba(255, 232, 31, 0.6)'
            }}>
              <div className="text-4xl mb-2">💡</div>
              <p className="text-lg font-medium mb-2" style={{ 
                color: '#ffe81f',
                fontWeight: '700',
                fontSize: '1.25rem'
              }}>Welcome to Brainstormzz!</p>
              <p className="text-sm" style={{ 
                color: '#ffe81f',
                fontSize: '0.95rem'
              }}>Enter a topic above and click "Expand Ideas" to get started</p>
              <p className="text-xs mt-2" style={{ 
                color: 'rgba(255, 232, 31, 0.8)',
                fontSize: '0.85rem'
              }}>Or click anywhere to add individual ideas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;