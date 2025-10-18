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
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
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
      
      {/* Ideas container */}
      <div 
        className="relative bg-white rounded-lg shadow-sm border min-h-96"
        style={{ height: '500px' }}
        onClick={handleCanvasClick}
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
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

        {/* Empty state */}
        {ideas.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">💡</div>
              <p className="text-lg font-medium mb-2">Welcome to MuseBoard!</p>
              <p className="text-sm">Enter a topic above and click "Expand Ideas" to get started</p>
              <p className="text-xs mt-2">Or click anywhere to add individual ideas</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
