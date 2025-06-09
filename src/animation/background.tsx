import React, { useState, useEffect } from 'react';

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 1,
}: DitherProps) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [time, setTime] = useState(0);

  // Эффект для анимации
  useEffect(() => {
    if (disableAnimation) return;

    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const currentTime = (Date.now() - startTime) / 1000;
      setTime(currentTime);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [disableAnimation]);

  // Обработчик движения мыши
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableMouseInteraction) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePos({ x, y });
  };

  // Преобразуем значения цвета из массива [r,g,b] в строку CSS
  const cssColor = `rgb(${Math.floor(waveColor[0] * 255)}, ${Math.floor(waveColor[1] * 255)}, ${Math.floor(waveColor[2] * 255)})`;

  return (
    <div 
      className="w-full h-full relative"
      onMouseMove={handleMouseMove}
      style={{
        background: `linear-gradient(135deg, ${cssColor}30, ${cssColor}10)`,
        overflow: 'hidden',
      }}
    >
      {/* Создаем эффект волн с помощью CSS */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${cssColor}40 0%, transparent 50%)`,
          opacity: enableMouseInteraction ? 0.8 : 0.5,
          transform: `scale(${1 + Math.sin(time * waveSpeed) * 0.05})`,
          transition: 'background-image 0.3s ease',
        }}
      />
      
      {/* Создаем эффект пикселизации с помощью CSS */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent ${pixelSize}px, rgba(0,0,0,0.05) ${pixelSize}px, rgba(0,0,0,0.05) ${pixelSize * 2}px),
                           repeating-linear-gradient(90deg, transparent, transparent ${pixelSize}px, rgba(0,0,0,0.05) ${pixelSize}px, rgba(0,0,0,0.05) ${pixelSize * 2}px)`,
          opacity: 0.3,
        }}
      />
    </div>
  );
}
