
import React, { useState, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';

interface EqualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const Equalizer = ({ audioRef }: EqualizerProps) => {
  const [bands, setBands] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [isEnabled, setIsEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const filtersRef = useRef<BiquadFilterNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const frequencies = [32, 64, 125, 250, 500, 1000, 2000, 4000];

  useEffect(() => {
    if (!audioRef.current || !isEnabled) return;

    const setupEqualizer = () => {
      try {
        if (audioContextRef.current) return; // Already setup

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        const source = audioContext.createMediaElementSource(audioRef.current!);
        sourceRef.current = source;

        const gainNode = audioContext.createGain();
        gainNodeRef.current = gainNode;

        // Create filters for each frequency band
        const filters = frequencies.map((freq, index) => {
          const filter = audioContext.createBiquadFilter();
          filter.type = 'peaking';
          filter.frequency.value = freq;
          filter.Q.value = 1;
          filter.gain.value = bands[index];
          return filter;
        });

        filtersRef.current = filters;

        // Connect the audio chain
        source.connect(filters[0]);
        for (let i = 0; i < filters.length - 1; i++) {
          filters[i].connect(filters[i + 1]);
        }
        filters[filters.length - 1].connect(gainNode);
        gainNode.connect(audioContext.destination);

      } catch (error) {
        console.error('Error setting up equalizer:', error);
      }
    };

    setupEqualizer();

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [isEnabled, audioRef]);

  useEffect(() => {
    if (filtersRef.current.length === 0) return;

    bands.forEach((gain, index) => {
      if (filtersRef.current[index]) {
        filtersRef.current[index].gain.value = gain;
      }
    });
  }, [bands]);

  const handleBandChange = (index: number, value: number) => {
    const newBands = [...bands];
    newBands[index] = value;
    setBands(newBands);
  };

  const resetEqualizer = () => {
    setBands([0, 0, 0, 0, 0, 0, 0, 0]);
  };

  const toggleEqualizer = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-neon-purple" />
          <span className="text-xs text-neon-purple font-mono">EQUALIZER</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleEqualizer}
            className={`text-xs px-2 py-1 rounded font-mono transition-colors ${
              isEnabled 
                ? 'bg-neon-green text-cyber-dark' 
                : 'bg-cyber-gray text-neon-green border border-neon-green'
            }`}
          >
            {isEnabled ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={resetEqualizer}
            className="text-xs px-2 py-1 rounded font-mono bg-cyber-gray text-neon-orange border border-neon-orange hover:bg-neon-orange hover:text-cyber-dark transition-colors"
          >
            RESET
          </button>
        </div>
      </div>

      {isEnabled && (
        <div className="bg-cyber-darker p-3 rounded border border-neon-purple">
          <div className="flex justify-between items-end gap-1">
            {frequencies.map((freq, index) => (
              <div key={freq} className="flex flex-col items-center">
                <div className="text-xs text-neon-blue font-mono mb-1">
                  {freq >= 1000 ? `${freq / 1000}k` : freq}
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="1"
                    value={bands[index]}
                    onChange={(e) => handleBandChange(index, parseFloat(e.target.value))}
                    className="h-16 w-4 appearance-none bg-transparent cursor-pointer eq-slider transform -rotate-90 origin-center"
                  />
                </div>
                <div className="text-xs text-neon-green font-mono mt-1">
                  {bands[index] > 0 ? '+' : ''}{bands[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Equalizer;
