
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
import { useToast } from "@/hooks/use-toast";

// Equalizer component
const Equalizer = () => {
  const [bars, setBars] = useState<number[]>([]);
  const [volumeLevel, setVolumeLevel] = useState<number>(0); // Добавляем состояние для уровня громкости
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
    
    try {
      // Сохраняем ссылку на аудио элемент
      audioElementRef.current = audioElement;
      
      // Проверяем, был ли уже создан источник для этого аудио элемента
      // Если источник уже существует, не создаем новый AudioContext
      if (sourceRef.current) {
        console.log('Источник аудио уже существует, пропускаем создание нового контекста');
        return;
      }
      
      // Закрываем предыдущий контекст, если он существует
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch (closeError) {
          console.warn('Не удалось закрыть предыдущий AudioContext:', closeError);
        }
      }
      
      // Создаем новый AudioContext с обработкой ошибок
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (contextError) {
        console.error('Не удалось создать AudioContext:', contextError);
        return; // Прерываем выполнение функции, если не удалось создать контекст
      }
      
      // Создаем новый анализатор
      try {
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 128; // Размер FFT для хорошего разрешения
        analyserRef.current.smoothingTimeConstant = 0.7; // Сглаживание для плавной анимации
      } catch (analyserError) {
        console.error('Не удалось создать анализатор:', analyserError);
        return;
      }
      
      // Создаем источник из аудио элемента с обработкой ошибок
      try {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      } catch (sourceError) {
        console.error('Не удалось создать или подключить источник аудио:', sourceError);
        return;
      }
      
      console.log('Эквалайзер успешно настроен');
      
      // Запускаем анимацию
      updateEqualizer();
    } catch (error) {
      console.error('Общая ошибка при настройке эквалайзера:', error);
      // Сбрасываем все ссылки в случае ошибки
      try {
        if (sourceRef.current) sourceRef.current.disconnect();
        if (analyserRef.current) analyserRef.current.disconnect();
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
      } catch (cleanupError) {
        console.warn('Ошибка при очистке ресурсов после сбоя:', cleanupError);
      }
    }
  };
  
  // Функция обновления эквалайзера
  const updateEqualizer = () => {
    try {
      if (!analyserRef.current || !audioElementRef.current) {
        // Если анализатор или аудио элемент не доступны, показываем случайное движение
        setBars(bars => bars.map(() => 2 + Math.random() * 8));
        setVolumeLevel(0); // Сбрасываем уровень громкости
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
        setVolumeLevel(0); // Сбрасываем уровень громкости при паузе
        animationRef.current = requestAnimationFrame(updateEqualizer);
        return;
      }
      
      try {
        // Получаем данные частот
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Вычисляем текущий уровень громкости (среднее значение всех частот)
        const sum = dataArray.reduce((acc, val) => acc + val, 0);
        const avgVolume = sum / bufferLength / 255; // Нормализуем от 0 до 1
        setVolumeLevel(Math.min(1, avgVolume * 1.2)); // Немного увеличиваем для лучшей видимости, но не больше 1
        
        // Выбираем частоты для каждого столбца
        const barValues = Array.from({ length: 15 }, (_, i) => {
          // Используем логарифмическое распределение для лучшего представления частот
          // Низкие частоты имеют больше энергии, поэтому мы даем им больше веса
          const index = Math.floor(Math.pow(i / 15, 1.5) * bufferLength);
          // Проверяем, что индекс находится в допустимых пределах
          const safeIndex = Math.min(Math.max(0, index), bufferLength - 1);
          // Масштабируем значение и добавляем небольшую минимальную высоту
          return 3 + (dataArray[safeIndex] / 255) * 60; // Увеличиваем максимальную высоту до 60px
        });
        
        setBars(barValues);
      } catch (dataError) {
        console.error('Ошибка при обработке аудио данных:', dataError);
        // В случае ошибки при получении данных, показываем случайное движение
        setBars(bars => bars.map(() => 2 + Math.random() * 5));
      }
      
      // Продолжаем анимацию в любом случае
      animationRef.current = requestAnimationFrame(updateEqualizer);
    } catch (error) {
      console.error('Критическая ошибка в updateEqualizer:', error);
      // Пытаемся продолжить анимацию даже при ошибке
      try {
        animationRef.current = requestAnimationFrame(updateEqualizer);
      } catch (rafError) {
        console.error('Не удалось запланировать следующий кадр анимации:', rafError);
      }
    }
  };
  
  return (
    <div className="flex items-center h-12 gap-[2px] mx-2">
      {/* Индикатор уровня громкости */}
      <div className="relative mr-2 w-3 h-12 bg-black/20 dark:bg-white/10 rounded-full overflow-hidden">
        <div 
          className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-yellow-500 rounded-full"
          style={{ 
            height: `${volumeLevel * 100}%`,
            transition: 'height 0.1s ease-out'
          }}
        />
      </div>
      
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
  const [volume, setVolume] = useState([50]); // Начальная громкость 50%
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [trackList, setTrackList] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const equalizerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up equalizer when audio element is available
    try {
      if (audioRef.current && equalizerRef.current) {
        const setupAnalyserElement = equalizerRef.current.querySelector('[data-setup-analyser]') as HTMLDivElement;
        if (setupAnalyserElement) {
          try {
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
          } catch (error) {
            console.error('Ошибка при вызове функции setupAnalyser:', error);
            // Не даем ошибке прервать выполнение приложения
          }
        }
      }
    } catch (error) {
      console.error('Ошибка при настройке эквалайзера:', error);
      // Не даем ошибке прервать выполнение приложения
    }
    
    // Try to find music files
    const fetchMusicFiles = async () => {
      try {
        // Сканируем все MP3 файлы в папке public/music
        const validTracks: string[] = [];
        
        // Список файлов, которые мы знаем, что существуют в папке music
        const musicFiles = [];
        
        // Добавляем все файлы parampam (1-31).mp3
        for (let i = 1; i <= 31; i++) {
          musicFiles.push(`/music/parampam (${i}).mp3`);
        }
        
        // Используем Promise.all для параллельной проверки файлов
        const checkPromises = musicFiles.map(async (track) => {
          try {
            const response = await fetch(track, { 
              method: 'HEAD',
              // Добавляем cache: 'no-store' для предотвращения кэширования
              cache: 'no-store'
            });
            if (response.ok) {
              return track;
            }
            return null;
          } catch (err) {
            console.log(`Трек ${track} не найден:`, err);
            return null;
          }
        });
        
        // Ждем завершения всех проверок и фильтруем null значения
        const results = await Promise.all(checkPromises);
        const filteredTracks = results.filter(track => track !== null) as string[];
        
        validTracks.push(...filteredTracks);
        console.log(`Найдено ${validTracks.length} треков`);
        
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
        toast({
          title: "Ошибка загрузки музыки",
          description: "Произошла ошибка при поиске музыкальных файлов",
          variant: "destructive"
        });
      }
    };
    
    fetchMusicFiles();
  }, [toast]);

  useEffect(() => {
    try {
      if (audioRef.current) {
        // Преобразуем значение громкости от 0-300 к 0-3 для элемента audio
        // Ограничиваем значение громкости от 0 до 1 (стандартный диапазон для HTML Audio)
        const safeVolume = Math.min(1, Math.max(0, volume[0] / 100));
        audioRef.current.volume = safeVolume;
        console.log('Установлена громкость:', safeVolume);
      }
    } catch (error) {
      console.error('Ошибка при установке громкости:', error);
      // Не даем ошибке прервать выполнение приложения
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
      // Сохраняем текущее состояние воспроизведения
      const wasPlaying = !audioRef.current.paused;
      
      // Устанавливаем новый источник
      audioRef.current.src = trackList[nextIndex];
      
      // Если аудио воспроизводилось или это переключение трека, запускаем воспроизведение
      if (wasPlaying || true) { // Всегда воспроизводить при переключении трека
        audioRef.current.play()
          .then(() => {
            setIsLoading(false);
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Ошибка воспроизведения при переключении:', error);
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
      // Сохраняем текущее состояние воспроизведения
      const wasPlaying = !audioRef.current.paused;
      
      // Устанавливаем новый источник
      audioRef.current.src = trackList[prevIndex];
      
      // Если аудио воспроизводилось или это переключение трека, запускаем воспроизведение
      if (wasPlaying || true) { // Всегда воспроизводить при переключении трека
        audioRef.current.play()
          .then(() => {
            setIsLoading(false);
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Ошибка воспроизведения при переключении:', error);
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
    if (volume[0] <= 100) return <Volume2 size={18} />;
    // Для громкости выше 100% добавляем индикатор усиления
    return <Volume2 size={18} className="text-yellow-400" />;
  };

  // Показываем плеер даже если треки не найдены, чтобы пользователь видел сообщение
  const noTracksFound = trackList.length === 0;
  
  useEffect(() => {
    // Повторная попытка подключения эквалайзера при изменении состояния воспроизведения или трека
    if (audioRef.current && equalizerRef.current) {
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
  }, [isPlaying, currentTrackIndex, trackList.length]);
  
  if (noTracksFound) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/30 dark:bg-gray-900/50 backdrop-blur-lg p-3 rounded-full border border-white/10 dark:border-gray-700/50">
        <div className="text-white dark:text-gray-200 text-sm px-4 py-2">
          Музыка не найдена. Добавьте MP3 файлы в папку /public/music
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-black/30 dark:bg-gray-900/50 backdrop-blur-lg p-3 rounded-full border border-white/10 dark:border-gray-700/50">
      <audio
        ref={audioRef}
        src={trackList[currentTrackIndex]}
        onEnded={handleTrackEnd}
        onLoadedData={() => {
          // Когда аудио загружено, пробуем воспроизвести его
          if (audioRef.current && !isPlaying) {
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setIsLoading(false);
              })
              .catch(error => {
                console.error('Ошибка автовоспроизведения:', error);
                setIsLoading(false);
              });
          }
        }}
      />
      
      <button
        onClick={playPrevTrack}
        disabled={isLoading || trackList.length <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50"
      >
        <SkipBack size={18} className="text-white dark:text-gray-200" />
      </button>
      
      <button
        onClick={togglePlayPause}
        disabled={isLoading}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50"
      >
        {isPlaying ? <Pause size={20} className="text-white dark:text-gray-200" /> : <Play size={20} className="text-white dark:text-gray-200" />}
      </button>
      
      <button
        onClick={playNextTrack}
        disabled={isLoading || trackList.length <= 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50"
      >
        <SkipForward size={18} className="text-white dark:text-gray-200" />
      </button>
      
      {/* Equalizer component */}
      <div ref={equalizerRef}>
        <Equalizer />
      </div>
      
      <div className="flex items-center gap-2">
        <VolumeIcon />
        <div className="flex flex-col items-center">
          <Slider
            value={volume}
            onValueChange={(newValue) => {
              try {
                // Проверяем, что newValue - это массив и содержит хотя бы один элемент
                if (Array.isArray(newValue) && newValue.length > 0) {
                  // Ограничиваем значение в пределах допустимого диапазона
                  const safeValue = [Math.min(300, Math.max(0, newValue[0]))];
                  setVolume(safeValue);
                }
              } catch (error) {
                console.error('Ошибка при изменении громкости:', error);
                // Не даем ошибке прервать выполнение приложения
              }
            }}
            max={300} // Максимальная громкость 300%
            step={1}
            className="w-24"
          />
          <span className="text-xs text-white/70 dark:text-gray-300/70 mt-1">{volume[0]}%</span>
        </div>
      </div>
    </div>
  );
};
