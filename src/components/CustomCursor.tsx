
import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOverText, setIsOverText] = useState(false);

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
      
      // Проверяем, находится ли курсор над текстом, ссылкой или элементами блога
      const isText = target.tagName.toLowerCase() === 'p' ||
                    target.tagName.toLowerCase() === 'span' ||
                    target.tagName.toLowerCase() === 'h1' ||
                    target.tagName.toLowerCase() === 'h2' ||
                    target.tagName.toLowerCase() === 'h3' ||
                    target.tagName.toLowerCase() === 'h4' ||
                    target.tagName.toLowerCase() === 'h5' ||
                    target.tagName.toLowerCase() === 'h6' ||
                    target.tagName.toLowerCase() === 'a' ||
                    target.tagName.toLowerCase() === 'li' ||
                    target.tagName.toLowerCase() === 'code' ||
                    target.tagName.toLowerCase() === 'pre' ||
                    target.tagName.toLowerCase() === 'blockquote' ||
                    target.tagName.toLowerCase() === 'article' ||
                    target.tagName.toLowerCase() === 'div' && (target.className.includes('markdown') || target.className.includes('blog')) ||
                    target.closest('p') !== null ||
                    target.closest('span') !== null ||
                    target.closest('h1') !== null ||
                    target.closest('h2') !== null ||
                    target.closest('h3') !== null ||
                    target.closest('h4') !== null ||
                    target.closest('h5') !== null ||
                    target.closest('h6') !== null ||
                    target.closest('a') !== null ||
                    target.closest('li') !== null ||
                    target.closest('code') !== null ||
                    target.closest('pre') !== null ||
                    target.closest('blockquote') !== null ||
                    target.closest('article') !== null ||
                    target.closest('.markdown-content') !== null ||
                    target.closest('.blog-post') !== null;
      
      // Now we're setting a boolean, not an element
      setIsPointer(isClickable);
      setIsOverText(isText);
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
      {/* Main cursor - уменьшен на 10px и скрыт при наведении на текст */}
      <div 
        className={`fixed pointer-events-none z-50 transition-transform duration-100 ${isClicking ? 'scale-75' : 'scale-100'} ${isOverText ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
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
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
    </>
  );
};
