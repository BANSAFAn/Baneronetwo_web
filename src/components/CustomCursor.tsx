
import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.tagName.toLowerCase() === 'button' || 
                         target.tagName.toLowerCase() === 'a' ||
                         target.closest('button') !== null || 
                         target.closest('a') !== null ||
                         window.getComputedStyle(target).cursor === 'pointer';
      
      // Now we're setting a boolean, not an element
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Main cursor */}
      <div 
        className={`fixed pointer-events-none z-50 transition-transform duration-100 ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className={`rounded-full ${
          isPointer 
            ? 'w-8 h-8 border-2 border-purple-500 bg-transparent' 
            : 'w-6 h-6 bg-white/10 backdrop-blur-sm border border-white/30'
        } transition-all duration-150`}></div>
      </div>
      
      {/* Cursor dot */}
      <div 
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
    </>
  );
};
