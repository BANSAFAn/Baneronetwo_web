
import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Определяем, является ли устройство мобильным
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Уменьшаем набор символов для лучшей производительности
    const characters = isMobile 
      ? '01' // Минимальный набор для мобильных устройств
      : 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    
    // Увеличиваем размер шрифта на мобильных для меньшего количества колонок
    const fontSize = isMobile ? 18 : 14;
    
    // Уменьшаем количество колонок для лучшей производительности
    const columnSpacing = isMobile ? 2 : 1; // Пропускаем колонки на мобильных
    const columns = Math.ceil(canvas.width / (fontSize * columnSpacing));
    
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    let animationFrameId: number;
    let lastTime = 0;
    const frameInterval = isMobile ? 100 : 50; // Меньшая частота обновления на мобильных

    const draw = (timestamp: number) => {
      // Ограничиваем частоту кадров
      if (timestamp - lastTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      
      lastTime = timestamp;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#39FF14';
      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

      // Обрабатываем только видимую часть экрана
      for (let i = 0; i < drops.length; i++) {
        if (i % columnSpacing !== 0) continue; // Пропускаем колонки для оптимизации
        
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize * columnSpacing, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30"
    />
  );
};

export default MatrixBackground;
