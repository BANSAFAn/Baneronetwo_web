
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { BarChart3, Activity, Radio } from 'lucide-react';

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
}

const AudioVisualizer = ({ audioRef, isPlaying }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const [visualizerType, setVisualizerType] = useState<'bars' | 'wave' | 'circle'>('bars');
  const [isMobile, setIsMobile] = useState(false);
  
  // Определяем, является ли устройство мобильным
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Оптимизированные настройки в зависимости от устройства
  const settings = useMemo(() => ({
    fftSize: isMobile ? 64 : 256,
    frameInterval: isMobile ? 100 : 30, // миллисекунды между кадрами
    barWidth: isMobile ? 4 : 2,
  }), [isMobile]);

  useEffect(() => {
    if (!audioRef.current || !canvasRef.current) return;

    const setupVisualizer = () => {
      try {
        if (audioContextRef.current) return;

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaElementSource(audioRef.current!);
        sourceRef.current = source;

        const analyser = audioContext.createAnalyser();
        // Используем оптимизированные настройки FFT в зависимости от устройства
        analyser.fftSize = settings.fftSize;
        analyser.smoothingTimeConstant = 0.8; // Добавляем сглаживание для более плавной анимации
        analyserRef.current = analyser;

        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        source.connect(analyser);
        analyser.connect(audioContext.destination);
      } catch (error) {
        console.error('Error setting up visualizer:', error);
      }
    };

    setupVisualizer();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [audioRef, settings]);

  useEffect(() => {
    if (!isPlaying || !analyserRef.current || !dataArrayRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Оптимизируем размер canvas для лучшей производительности
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      // Для мобильных устройств уменьшаем разрешение canvas
      const scaleFactor = isMobile ? 0.5 : 1;
      
      canvas.width = rect.width * dpr * scaleFactor;
      canvas.height = rect.height * dpr * scaleFactor;
      ctx.scale(dpr * scaleFactor, dpr * scaleFactor);
    };
    
    updateCanvasSize();

    const draw = (timestamp: number) => {
      if (!analyserRef.current || !dataArrayRef.current || !ctx) return;

      animationRef.current = requestAnimationFrame(draw);
      
      // Контроль частоты кадров для оптимизации производительности
      const elapsed = timestamp - lastFrameTimeRef.current;
      if (elapsed < settings.frameInterval) {
        return; // Пропускаем кадр, если прошло недостаточно времени
      }
      
      lastFrameTimeRef.current = timestamp;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      // Очищаем только изменившуюся область для оптимизации
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), 
                          canvas.height / (window.devicePixelRatio || 1));

      if (visualizerType === 'bars') {
        drawBars(ctx, dataArrayRef.current, barWidth, canvas);
      } else if (visualizerType === 'wave') {
        drawWave(ctx, dataArrayRef.current, canvas);
      } else if (visualizerType === 'circle') {
        drawCircle(ctx, dataArrayRef.current, canvas);
      }
    };

    // Добавляем обработчик изменения размера окна
    const handleResize = () => {
      updateCanvasSize();
    };
    
    window.addEventListener('resize', handleResize);
    lastFrameTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, visualizerType, settings, isMobile]);

  const drawBars = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dataArray: Uint8Array) => {
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
    const barWidth = settings.barWidth;
    const step = isMobile ? 2 : 1; // Пропускаем каждый второй бар на мобильных устройствах
    
    // Используем оптимизированный цикл с шагом
    for (let i = 0; i < dataArray.length; i += step) {
      const barHeight = (dataArray[i] / 255) * canvasHeight;
      
      // Оптимизация вычисления цвета
      let hue;
      if (isMobile) {
        // На мобильных устройствах используем предварительно вычисленные значения
        hue = (i % 3 === 0) ? 120 : (i % 3 === 1) ? 180 : 240;
      } else {
        hue = (i / dataArray.length) * 120 + 120;
      }
      
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(i * barWidth, canvasHeight - barHeight, barWidth, barHeight);
    }
  };

  const drawWave = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dataArray: Uint8Array) => {
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
    
    ctx.strokeStyle = '#39FF14';
    ctx.lineWidth = isMobile ? 1.5 : 2;
    ctx.beginPath();

    const step = isMobile ? 2 : 1; // Пропускаем точки на мобильных устройствах
    const sliceWidth = canvasWidth / (dataArray.length / step);
    let x = 0;

    for (let i = 0; i < dataArray.length; i += step) {
      const v = dataArray[i] / 128.0;
      const y = v * canvasHeight / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        // На мобильных устройствах используем более простой путь
        if (isMobile && i % 4 !== 0) {
          x += sliceWidth;
          continue;
        }
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();
  };

  const drawCircle = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, dataArray: Uint8Array) => {
    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.lineWidth = isMobile ? 1.5 : 2;
    
    // Оптимизация для мобильных устройств - рисуем меньше линий
    const step = isMobile ? 4 : 1;
    
    // Предварительно вычисляем синусы и косинусы для мобильных устройств
    const cosCache = isMobile ? new Array(dataArray.length / step).fill(0).map((_, i) => 
      Math.cos((i * step / dataArray.length) * Math.PI * 2)) : null;
    const sinCache = isMobile ? new Array(dataArray.length / step).fill(0).map((_, i) => 
      Math.sin((i * step / dataArray.length) * Math.PI * 2)) : null;

    for (let i = 0; i < dataArray.length; i += step) {
      // Пропускаем некоторые точки для оптимизации
      if (isMobile && i % 8 === 0) continue;
      
      let cos, sin;
      if (isMobile && cosCache && sinCache) {
        // Используем кэшированные значения
        const cacheIndex = Math.floor(i / step);
        cos = cosCache[cacheIndex % cosCache.length];
        sin = sinCache[cacheIndex % sinCache.length];
      } else {
        const angle = (i / dataArray.length) * Math.PI * 2;
        cos = Math.cos(angle);
        sin = Math.sin(angle);
      }
      
      const amplitude = (dataArray[i] / 255) * radius;
      
      const x1 = centerX + cos * (radius - amplitude);
      const y1 = centerY + sin * (radius - amplitude);
      const x2 = centerX + cos * radius;
      const y2 = centerY + sin * radius;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      
      // Оптимизация вычисления цвета
      let hue;
      if (isMobile) {
        // Используем ограниченный набор цветов на мобильных устройствах
        hue = (i % 12 === 0) ? 0 : (i % 12 === 4) ? 120 : 240;
      } else {
        hue = (i / dataArray.length) * 360;
      }
      
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.stroke();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-neon-purple" />
          <span className="text-xs text-neon-purple font-mono">VISUALIZER</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setVisualizerType('bars')}
            className={`text-xs px-2 py-1 rounded font-mono transition-colors ${
              visualizerType === 'bars' 
                ? 'bg-neon-green text-cyber-dark' 
                : 'bg-cyber-gray text-neon-green border border-neon-green'
            }`}
          >
            <BarChart3 size={12} />
          </button>
          <button
            onClick={() => setVisualizerType('wave')}
            className={`text-xs px-2 py-1 rounded font-mono transition-colors ${
              visualizerType === 'wave' 
                ? 'bg-neon-green text-cyber-dark' 
                : 'bg-cyber-gray text-neon-green border border-neon-green'
            }`}
          >
            <Activity size={12} />
          </button>
          <button
            onClick={() => setVisualizerType('circle')}
            className={`text-xs px-2 py-1 rounded font-mono transition-colors ${
              visualizerType === 'circle' 
                ? 'bg-neon-green text-cyber-dark' 
                : 'bg-cyber-gray text-neon-green border border-neon-green'
            }`}
          >
            <Radio size={12} />
          </button>
        </div>
      </div>

      <div className="bg-cyber-darker p-3 rounded border border-neon-purple">
        <canvas
          ref={canvasRef}
          width={320}
          height={120}
          className="w-full h-20 bg-cyber-dark rounded"
        />
      </div>
    </div>
  );
};

export default AudioVisualizer;
