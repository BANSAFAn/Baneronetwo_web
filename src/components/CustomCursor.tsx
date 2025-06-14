
import { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const scanningRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      // Используем transform вместо изменения left/top для лучшей производительности
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
      }
      
      // Обновляем позицию trail с небольшой задержкой для эффекта следования
      if (trailRef.current) {
        requestAnimationFrame(() => {
          if (trailRef.current) {
            trailRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
          }
        });
      }
      
      // Обновляем позицию scanning эффекта при клике
      if (isClicking && scanningRef.current) {
        scanningRef.current.style.transform = `translate(${e.clientX - 24}px, ${e.clientY - 24}px)`;
      }
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

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isClicking]);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] mix-blend-difference will-change-transform ${
          isClicking ? 'scale-75' : isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          transform: 'translate(0, 0)',
          transition: 'transform 0.01s linear, scale 0.15s ease-out'
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
        ref={trailRef}
        className="fixed pointer-events-none z-[9998] will-change-transform"
        style={{
          transform: 'translate(0, 0)',
          transition: 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
        }}
      >
        <div className={`w-8 h-8 rounded-full border ${
          isHovering ? 'border-neon-blue/30' : 'border-neon-green/30'
        } animate-ping`} />
      </div>

      {/* Scanning lines effect */}
      {isClicking && (
        <div
          ref={scanningRef}
          className="fixed pointer-events-none z-[9997] will-change-transform"
          style={{
            transform: 'translate(0, 0)',
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
