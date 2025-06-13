
import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-150 ${
          isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 8,
          top: position.y - 8,
        }}
      >
        <div className="relative">
          {/* Main cursor dot */}
          <div className={`w-4 h-4 rounded-full border-2 ${
            isHovering ? 'border-neon-blue bg-neon-blue/20' : 'border-neon-green bg-neon-green/20'
          } animate-pulse-neon`} />
          
          {/* Crosshair lines */}
          <div className={`absolute top-1/2 left-1/2 w-8 h-0.5 ${
            isHovering ? 'bg-neon-blue' : 'bg-neon-green'
          } transform -translate-x-1/2 -translate-y-1/2`} />
          <div className={`absolute top-1/2 left-1/2 w-0.5 h-8 ${
            isHovering ? 'bg-neon-blue' : 'bg-neon-green'
          } transform -translate-x-1/2 -translate-y-1/2`} />
          
          {/* Corner brackets */}
          <div className={`absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 ${
            isHovering ? 'border-neon-blue' : 'border-neon-green'
          }`} />
          <div className={`absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 ${
            isHovering ? 'border-neon-blue' : 'border-neon-green'
          }`} />
          <div className={`absolute -bottom-2 -left-2 w-3 h-3 border-l-2 border-b-2 ${
            isHovering ? 'border-neon-blue' : 'border-neon-green'
          }`} />
          <div className={`absolute -bottom-2 -right-2 w-3 h-3 border-r-2 border-b-2 ${
            isHovering ? 'border-neon-blue' : 'border-neon-green'
          }`} />
        </div>
      </div>

      {/* Trail effect */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          left: position.x - 16,
          top: position.y - 16,
        }}
      >
        <div className={`w-8 h-8 rounded-full border ${
          isHovering ? 'border-neon-blue/30' : 'border-neon-green/30'
        } animate-ping`} />
      </div>

      {/* Scanning lines effect */}
      {isClicking && (
        <div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: position.x - 24,
            top: position.y - 24,
          }}
        >
          <div className="w-12 h-12 border-2 border-neon-purple rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/2 w-16 h-0.5 bg-neon-purple transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-neon-purple transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
      )}
    </>
  );
};

export default CustomCursor;
