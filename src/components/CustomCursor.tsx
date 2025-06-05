
import React, { useEffect, useState, useRef } from 'react';
import { useIsMobile } from "@/hooks/use-mobile";

export const CustomCursor = () => {
  const isMobile = useIsMobile();
  
  // Не рендерим кастомный курсор на мобильных устройствах
  if (isMobile) {
    return null;
  }
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      if (rafId.current) return;
      
      rafId.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        
        // Check if the cursor is over a clickable element
        const target = e.target as HTMLElement;
        const isClickable = target.tagName.toLowerCase() === 'button' || 
                          target.tagName.toLowerCase() === 'a' ||
                          target.closest('button') !== null || 
                          target.closest('a') !== null ||
                          window.getComputedStyle(target).cursor === 'pointer';
        
        // Упрощаем проверку на текст, используя селекторы
        const textElements = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'li', 'code', 'pre', 'blockquote', 'article'];
        const isText = textElements.includes(target.tagName.toLowerCase()) ||
                      textElements.some(tag => target.closest(tag) !== null) ||
                      (target.tagName.toLowerCase() === 'div' && (target.className.includes('markdown') || target.className.includes('blog'))) ||
                      target.closest('.markdown-content') !== null ||
                      target.closest('.blog-post') !== null;
        
        // Now we're setting a boolean, not an element
        setIsPointer(isClickable);
        setIsOverText(isText);
        
        rafId.current = null;
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updatePosition, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.documentElement.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Main cursor - уменьшен на 10px и скрыт при наведении на текст */}
      <div 
        className={`fixed pointer-events-none z-50 transition-transform duration-100 ${isClicking ? 'scale-75' : 'scale-100'} ${isOverText ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform, opacity'
        }}
      >
        <div className={`rounded-full ${isPointer 
            ? 'w-6 h-6 border-2 border-purple-500 bg-transparent' 
            : 'w-4 h-4 bg-white/10 backdrop-blur-sm border border-white/30'
        } transition-all duration-150`}></div>
      </div>
      
      {/* Cursor dot */}
      <div 
        className="fixed w-2 h-2 bg-white rounded-full pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      ></div>
    </>
  );
};
