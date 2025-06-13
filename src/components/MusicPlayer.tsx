import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import TerminalWindow from './TerminalWindow';
import Equalizer from './Equalizer';
import AudioVisualizer from './AudioVisualizer';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { name: '123 (1)', file: '/music/123 (1).mp3' },
    { name: '123 (2)', file: '/music/123 (2).mp3' },
    { name: '123 (3)', file: '/music/123 (3).mp3' },
    { name: '123 (4)', file: '/music/123 (4).mp3' },
    { name: '123 (5)', file: '/music/123 (5).mp3' },
    { name: '123 (6)', file: '/music/123 (6).mp3' },
    { name: '123 (7)', file: '/music/123 (7).mp3' },
    { name: '123 (8)', file: '/music/123 (8).mp3' },
    { name: '123 (9)', file: '/music/123 (9).mp3' },
    { name: '123 (10)', file: '/music/123 (10).mp3' },
    { name: '123 (11)', file: '/music/123 (11).mp3' },
    { name: '123 (12)', file: '/music/123 (12).mp3' },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  // Set volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrack]);

  return (
    <TerminalWindow title="MUSIC_PLAYER.EXE" className="fixed bottom-4 right-4 w-80 z-40">
      <div className="p-4 space-y-4">
        <audio
          ref={audioRef}
          src={tracks[currentTrack]?.file}
          crossOrigin="anonymous"
        />
        
        <div className="text-center">
          <div className="text-neon-green font-mono text-sm mb-2">
            {tracks[currentTrack]?.name || 'No Track'}
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={prevTrack}
              className="text-neon-blue hover:text-neon-green transition-colors"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={togglePlay}
              className="text-neon-green hover:text-neon-blue transition-colors p-2 border border-neon-green rounded hover:bg-neon-green hover:bg-opacity-20"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button
              onClick={nextTrack}
              className="text-neon-blue hover:text-neon-green transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-neon-purple">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1 bg-cyber-gray rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #39FF14 0%, #39FF14 ${(currentTime / duration) * 100}%, #111111 ${(currentTime / duration) * 100}%, #111111 100%)`
                }}
              />
              <span>{formatTime(duration)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-neon-orange" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-cyber-gray rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #FF4500 0%, #FF4500 ${volume * 100}%, #111111 ${volume * 100}%, #111111 100%)`
                }}
              />
            </div>
          </div>
        </div>

        {/* Audio Visualizer */}
        <AudioVisualizer audioRef={audioRef} isPlaying={isPlaying} />

        {/* Equalizer */}
        <Equalizer audioRef={audioRef} />
      </div>
    </TerminalWindow>
  );
};

export default MusicPlayer;
