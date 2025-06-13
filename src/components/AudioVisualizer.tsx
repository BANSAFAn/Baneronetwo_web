
import React, { useRef, useEffect, useState } from 'react';
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
  const [visualizerType, setVisualizerType] = useState<'bars' | 'wave' | 'circle'>('bars');

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
        analyser.fftSize = 256;
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
  }, [audioRef]);

  useEffect(() => {
    if (!isPlaying || !analyserRef.current || !dataArrayRef.current || !canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / dataArrayRef.current.length;

      if (visualizerType === 'bars') {
        drawBars(ctx, dataArrayRef.current, barWidth, canvas);
      } else if (visualizerType === 'wave') {
        drawWave(ctx, dataArrayRef.current, canvas);
      } else if (visualizerType === 'circle') {
        drawCircle(ctx, dataArrayRef.current, canvas);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, [isPlaying, visualizerType]);

  const drawBars = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, barWidth: number, canvas: HTMLCanvasElement) => {
    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height;
      const hue = (i / dataArray.length) * 120 + 120;
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
    }
  };

  const drawWave = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, canvas: HTMLCanvasElement) => {
    ctx.strokeStyle = '#39FF14';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const sliceWidth = canvas.width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * canvas.height / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  };

  const drawCircle = (ctx: CanvasRenderingContext2D, dataArray: Uint8Array, canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.strokeStyle = '#39FF14';
    ctx.lineWidth = 2;

    for (let i = 0; i < dataArray.length; i++) {
      const angle = (i / dataArray.length) * Math.PI * 2;
      const amplitude = (dataArray[i] / 255) * radius;
      
      const x1 = centerX + Math.cos(angle) * (radius - amplitude);
      const y1 = centerY + Math.sin(angle) * (radius - amplitude);
      const x2 = centerX + Math.cos(angle) * radius;
      const y2 = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      
      const hue = (i / dataArray.length) * 360;
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
