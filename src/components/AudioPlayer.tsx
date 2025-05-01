
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
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  
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
  
  // Делаем функцию setupAnalyser доступной глобально
  useEffect(() => {
    // Экспортируем функцию в глобальный объект window
    (window as any).setupAnalyser = setupAnalyser;
    
    return () => {
      // Удаляем функцию при размонтировании компонента
      delete (window as any).setupAnalyser;
    };
  }, []);
  
  // Update the equalizer when the audio reference is available
  const setupAnalyser = (audioElement: HTMLAudioElement | null) => {
    if (!audioElement) return;
    console.log('Настройка эквалайзера для аудио элемента:', audioElement);
    
    audioElementRef.current = audioElement;
    
    try {
      // Закрываем предыдущий контекст, если он существует
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      
      // Создаем новый AudioContext
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Создаем новый анализатор
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 128; // Увеличиваем размер FFT для лучшего разрешения
      analyserRef.current.smoothingTimeConstant = 0.7; // Добавляем сглаживание для более плавной анимации
      
      // Создаем источник из аудио элемента
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      
      console.log('Эквалайзер успешно настроен');
      
      // Запускаем анимацию
      updateEqualizer();
    } catch (error) {
      console.error('Ошибка при настройке эквалайзера:', error);
    }
  };
  
  // Функция обновления эквалайзера
  const updateEqualizer = () => {
    if (!analyserRef.current || !audioElementRef.current) {
      // Если анализатор или аудио элемент не доступны, показываем случайное движение
      setBars(bars => bars.map(() => 2 + Math.random() * 8));
      animationRef.current = requestAnimationFrame(updateEqualizer);
      return;
    }
    
    // Проверяем, воспроизводится ли аудио
    const isAudioPlaying = !audioElementRef.current.paused && 
                          !audioElementRef.current.ended && 
                          audioElementRef.current.currentTime > 0;
    
    if (!isAudioPlaying) {
      // Если аудио не воспроизводится, показываем мягкое случайное движение
      setBars(bars => bars.map(() => 2 + Math.random() * 5));
      animationRef.current = requestAnimationFrame(updateEqualizer);
      return;
    }
    
    // Получаем данные частот
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Выбираем частоты для каждого столбца
    const barValues = Array.from({ length: 15 }, (_, i) => {
      // Используем логарифмическое распределение для лучшего представления частот
      // Низкие частоты имеют больше энергии, поэтому мы даем им больше веса
      const index = Math.floor(Math.pow(i / 15, 1.5) * bufferLength);
      // Масштабируем значение и добавляем небольшую минимальную высоту
      return 3 + (dataArray[index] / 255) * 60; // Увеличиваем максимальную высоту до 60px
    });
    
    setBars(barValues);
    animationRef.current = requestAnimationFrame(updateEqualizer);
  };
  
  return (
    <div className="flex items-center h-12 gap-[2px] mx-2">
      {bars.map((height, index) => (
        <div 
          key={index}
          className="w-[2px] bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
          style={{ 
            height: `${Math.max(2, height)}px`, 
            opacity: 0.7 + (height / 100),
            transition: 'height 0.05s ease-in-out' // Добавляем плавный переход для высоты
          }}
        />
      ))}
      
      {/* This hidden div is used to expose the setupAnalyser function */}
      <div className="hidden" data-setup-analyser="setupAnalyser" />
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
      const setupAnalyserElement = equalizerRef.current.querySelector('[data-setup-analyser]') as HTMLDivElement;
      if (setupAnalyserElement) {
        // Получаем функцию setupAnalyser из data-атрибута
        const setupAnalyserFn = setupAnalyserElement.dataset.setupAnalyser;
        // Проверяем, что функция существует и вызываем её
        if (setupAnalyserFn && typeof window[setupAnalyserFn as any] === 'function') {
          window[setupAnalyserFn as any](audioRef.current);
        } else {
          // Прямой доступ к функции через свойство объекта
          const analyserSetup = (window as any).setupAnalyser || (setupAnalyserElement as any).setupAnalyser;
          if (typeof analyserSetup === 'function') {
            analyserSetup(audioRef.current);
          }
        }
      }
    }
    
    // Try to find music files
    const fetchMusicFiles = async () => {
      try {
        // Проверим наличие файлов в папке public/music
        const testTracks = [
          // Список тестовых треков для проверки
          '/music/test1.mp3',
          '/music/test2.mp3',
          // Добавьте сюда другие пути к файлам, если они у вас есть
        ];
        
        // Проверим все файлы в папке music с расширением .mp3
        const validTracks: string[] = [];
        
        // Проверяем наличие файлов
        for (const track of testTracks) {
          try {
            const response = await fetch(track, { method: 'HEAD' });
            if (response.ok) {
              validTracks.push(track);
            }
          } catch (err) {
            console.log(`Трек ${track} не найден:`, err);
          }
        }
        
        // Если файлы не найдены, добавим демо-трек для тестирования
        if (validTracks.length === 0) {
          // Используем демо-трек из общедоступного источника
          const demoTrack = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
          try {
            const response = await fetch(demoTrack, { method: 'HEAD' });
            if (response.ok) {
              validTracks.push(demoTrack);
              console.log('Добавлен демо-трек для тестирования');
            }
          } catch (err) {
            console.log('Не удалось загрузить демо-трек:', err);
          }
        }
        
        setTrackList(validTracks);
        console.log('Доступные треки:', validTracks);
        
        if (validTracks.length === 0) {
          toast({
            title: "Музыка не найдена",
            description: "Добавьте MP3 файлы в папку /public/music вашего проекта",
            variant: "destructive"
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

  // Показываем плеер даже если треки не найдены, чтобы пользователь видел сообщение
  const noTracksFound = trackList.length === 0;
  
  useEffect(() => {
    // Повторная попытка подключения эквалайзера при изменении состояния воспроизведения
    if (isPlaying && audioRef.current && equalizerRef.current) {
      try {
        // Пробуем напрямую вызвать глобальную функцию setupAnalyser
        if (typeof (window as any).setupAnalyser === 'function') {
          (window as any).setupAnalyser(audioRef.current);
          console.log('Эквалайзер подключен через глобальную функцию');
        }
      } catch (err) {
        console.error('Ошибка при подключении эквалайзера:', err);
      }
    }
  }, [isPlaying]);
  
  if (noTracksFound) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/30 backdrop-blur-lg p-3 rounded-full border border-white/10">
        <div className="text-white text-sm px-4 py-2">
          Музыка не найдена. Добавьте MP3 файлы в папку /public/music
        </div>
      </div>
    );
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
