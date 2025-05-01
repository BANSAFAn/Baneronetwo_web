
import { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  Volume1, 
  VolumeX, 
  Pause, 
  Play, 
  SkipForward,
  SkipBack
} from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

// Equalizer component
const Equalizer = () => {
  const [bars, setBars] = useState<number[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>(0);
  
  useEffect(() => {
    // Initialize with random heights for bars
    setBars(Array.from({ length: 15 }, () => Math.random() * 50));
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  // Update the equalizer when the audio reference is available
  const setupAnalyser = (audioElement: HTMLAudioElement | null) => {
    if (!audioElement) return;
    
    audioElementRef.current = audioElement;
    
    // Initialize AudioContext if not already created
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Create analyser if not already created
    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      
      const source = audioContextRef.current.createMediaElementSource(audioElement);
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
    }
    
    // Start the animation
    const updateEqualizer = () => {
      if (!analyserRef.current || !audioElementRef.current || audioElementRef.current.paused) {
        // If paused, show gentle random movement
        setBars(bars => bars.map(() => 2 + Math.random() * 8));
        animationRef.current = requestAnimationFrame(updateEqualizer);
        return;
      }
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // Pick frequencies for each bar
      const barValues = Array.from({ length: 15 }, (_, i) => {
        const index = Math.floor(i * (bufferLength / 15));
        return dataArray[index] / 255 * 50; // Scale to max height of 50px
      });
      
      setBars(barValues);
      animationRef.current = requestAnimationFrame(updateEqualizer);
    };
    
    updateEqualizer();
  };
  
  return (
    <div className="flex items-center h-12 gap-[2px] mx-2">
      {bars.map((height, index) => (
        <div 
          key={index}
          className="w-[2px] bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
          style={{ 
            height: `${Math.max(2, height)}px`, 
            opacity: 0.7 + (height / 100) 
          }}
        />
      ))}
      
      {/* This hidden div is used to expose the setupAnalyser function */}
      <div className="hidden" data-setup-analyser={setupAnalyser} />
    </div>
  );
};

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [trackList, setTrackList] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const equalizerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up equalizer when audio element is available
    if (audioRef.current && equalizerRef.current) {
      const setupAnalyser = (equalizerRef.current.querySelector('[data-setup-analyser]') as any)?.dataset?.setupAnalyser;
      if (typeof setupAnalyser === 'function') {
        setupAnalyser(audioRef.current);
      }
    }
    
    // Try to find music files
    const fetchMusicFiles = async () => {
      try {
        // Попытка найти все MP3 файлы в папке music
        try {
          // Попробуем получить список всех файлов в папке music
          const response = await fetch('/music');
          if (!response.ok) {
            throw new Error('Не удалось получить доступ к папке music');
          }
        } catch (err) {
          console.log('Не удалось получить список файлов напрямую:', err);
        }
        
        // Проверим все файлы в папке music с расширением .mp3
        const validTracks = [];
        
        // Список файлов из папки public/music, которые мы обнаружили через list_dir
        const musicFiles = [
          '/music/TRAPCHIK NYA (1).mp3',
          '/music/TRAPCHIK NYA (2).mp3',
          '/music/TRAPCHIK NYA (3).mp3',
          '/music/TRAPCHIK NYA (4).mp3',
          '/music/TRAPCHIK NYA (5).mp3',
          '/music/trap muzika (4).mp3',
          '/music/trap1.2 (1).mp3',
          '/music/trap1.2 (2).mp3',
          '/music/trap1.2 (3).mp3',
          '/music/trap1.2 (4).mp3',
          '/music/trap1.2 (5).mp3',
          '/music/trap1.2 (6).mp3',
          '/music/trapchikik (1).mp3',
          '/music/trapchikik (2).mp3',
          '/music/trapchikik (3).mp3',
          '/music/trapchikik (4).mp3',
          '/music/Цирковые мелодии (1).mp3',
          '/music/Цирковые мелодии (2).mp3',
          '/music/Цирковые мелодии (3).mp3',
          '/music/Цирковые мелодии (4).mp3',
          '/music/Цирковые мелодии (5).mp3',
          '/music/Цирковые мелодии (6).mp3',
          '/music/Цирковые мелодии (7).mp3',
          '/music/Шкатулка  (1).mp3',
          '/music/Шкатулка  (2).mp3',
          '/music/Шкатулка  (3).mp3',
          '/music/Шкатулка  (4).mp3',
          '/music/Шкатулка  (5).mp3',
          '/music/Шкатулка  (6).mp3',
          '/music/Шкатулка  (7).mp3',
          '/music/Шкатулка  (8).mp3'
        ];
        
        // Проверим каждый файл
        for (const track of musicFiles) {
          try {
            const response = await fetch(track, { method: 'HEAD' });
            if (response.ok) {
              validTracks.push(track);
            }
          } catch (err) {
            console.log(`Трек ${track} не найден:`, err);
          }
        }
        
        setTrackList(validTracks);
        console.log('Доступные треки:', validTracks);
        
        if (validTracks.length === 0) {
          toast({
            title: "Музыка не найдена",
            description: "Проверьте файлы MP3 в папке /public/music",
          });
        } else {
          console.log(`Найдено ${validTracks.length} музыкальных файлов`);
          toast({
            title: "Музыка загружена",
            description: `Найдено ${validTracks.length} музыкальных файлов`,
          });
        }
      } catch (err) {
        console.error('Error loading tracks:', err);
      }
    };
    
    fetchMusicFiles();
  }, [toast]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Playback error:', error);
            setIsLoading(false);
            toast({
              variant: "destructive",
              title: "Ошибка воспроизведения",
              description: "Не удалось воспроизвести аудиофайл",
            });
          });
      }
    }
  };

  const playNextTrack = () => {
    if (trackList.length === 0) return;
    
    const nextIndex = (currentTrackIndex + 1) % trackList.length;
    setCurrentTrackIndex(nextIndex);
    setIsLoading(true);
    
    if (audioRef.current) {
      audioRef.current.src = trackList[nextIndex];
      if (isPlaying) {
        audioRef.current.play()
          .then(() => setIsLoading(false))
          .catch(() => {
            setIsLoading(false);
            setIsPlaying(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  };
  
  const playPrevTrack = () => {
    if (trackList.length === 0) return;
    
    const prevIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    setCurrentTrackIndex(prevIndex);
    setIsLoading(true);
    
    if (audioRef.current) {
      audioRef.current.src = trackList[prevIndex];
      if (isPlaying) {
        audioRef.current.play()
          .then(() => setIsLoading(false))
          .catch(() => {
            setIsLoading(false);
            setIsPlaying(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  };

  const handleTrackEnd = () => {
    playNextTrack();
  };

  const VolumeIcon = () => {
    if (volume[0] === 0) return <VolumeX size={18} />;
    if (volume[0] < 50) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  if (trackList.length === 0) {
    return null; // Hide the player if no tracks are found
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-black/30 backdrop-blur-lg p-3 rounded-full border border-white/10">
      <audio
        ref={audioRef}
        src={trackList[currentTrackIndex]}
        onEnded={handleTrackEnd}
      />
      
      <button
        onClick={playPrevTrack}
        disabled={isLoading || trackList.length <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
      >
        <SkipBack size={18} />
      </button>
      
      <button
        onClick={togglePlayPause}
        disabled={isLoading}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      
      <button
        onClick={playNextTrack}
        disabled={isLoading || trackList.length <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50"
      >
        <SkipForward size={18} />
      </button>
      
      {/* Equalizer component */}
      <div ref={equalizerRef}>
        <Equalizer />
      </div>
      
      <div className="flex items-center gap-2">
        <VolumeIcon />
        <Slider
          value={volume}
          onValueChange={setVolume}
          max={100}
          step={1}
          className="w-20"
        />
      </div>
    </div>
  );
};
