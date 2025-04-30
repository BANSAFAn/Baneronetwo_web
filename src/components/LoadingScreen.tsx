
import { useEffect, useState } from 'react';
import { Apple, Terminal, LoaderCircle } from 'lucide-react';
import { detectOS, OperatingSystem } from '@/utils/osDetection';
import { useLanguage } from '@/context/LanguageContext';

export const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [text, setText] = useState('');
  const [dots, setDots] = useState('');
  const [os, setOs] = useState<OperatingSystem>('Unknown');
  const [showLinuxMessage, setShowLinuxMessage] = useState(false);
  const [showAppleIcon, setShowAppleIcon] = useState(false);
  const [appleClicked, setAppleClicked] = useState(false);
  const [androidConsoleLines, setAndroidConsoleLines] = useState<string[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Detect OS
    const detectedOS = detectOS();
    setOs(detectedOS);

    // OS-specific initializations
    if (detectedOS === 'Linux') {
      setShowLinuxMessage(true);
      setTimeout(() => setFadeOut(true), 3000);
    } else if (detectedOS === 'MacOS') {
      setShowAppleIcon(true);
    } else if (detectedOS === 'Android') {
      startAndroidConsole();
    } else {
      // Default loading behavior for other OS
      defaultLoadingBehavior();
    }
  }, []);

  // Android console simulation
  const startAndroidConsole = () => {
    const consoleLines = [
      '> Starting Android shell...',
      '> adb devices',
      '> List of devices attached',
      '> device-id    device',
      '> Starting package installation...',
      '> pm install -r com.baneronetwo.app',
      '> Package installed successfully',
      '> Starting app initialization...',
      '> Loading system resources...',
      '> Optimizing application...',
      '> Starting main activity...'
    ];

    let index = 0;
    const intervalId = setInterval(() => {
      if (index < consoleLines.length) {
        setAndroidConsoleLines(prev => [...prev, consoleLines[index]]);
        index++;
      } else {
        clearInterval(intervalId);
        setTimeout(() => {
          setGlitch(true);
          setTimeout(() => setFadeOut(true), 1000);
        }, 1500);
      }
    }, 800);

    return () => clearInterval(intervalId);
  };

  // Default loading screen behavior
  const defaultLoadingBehavior = () => {
    // Progressively increase loading value
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + Math.random() * 15;
        return nextProgress > 100 ? 100 : nextProgress;
      });
    }, 200);

    // Create glitch effect periodically
    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 2000);

    // Update loading text
    const textMessages = [
      t('initializing'),
      t('system_check'),
      t('loading_modules'),
      t('connecting_to_server'),
      t('decrypting_data'),
      t('almost_ready')
    ];
    
    let currentTextIndex = 0;
    const textInterval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % textMessages.length;
      setText(textMessages[currentTextIndex]);
    }, 1500);
    
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '');
    }, 300);
    
    const timer = setTimeout(() => setFadeOut(true), 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      clearInterval(textInterval);
      clearInterval(dotsInterval);
    };
  };

  // Handle Apple icon click for MacOS
  const handleAppleClick = () => {
    setAppleClicked(true);
    setGlitch(true);
    setTimeout(() => setFadeOut(true), 1000);
  };

  // Render different loading screens based on OS
  if (os === 'Linux' && showLinuxMessage) {
    return (
      <div 
        className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 z-50 bg-black ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div 
          className={`text-6xl font-bold text-white text-center mb-8 transition-all ${glitch ? 'glitch-effect' : ''}`}
        >
          <span className="relative bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            {t('linux_message')}
          </span>
        </div>
      </div>
    );
  }

  if (os === 'MacOS' && showAppleIcon) {
    return (
      <div 
        className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 z-50 bg-black ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <button 
          onClick={handleAppleClick}
          className={`text-8xl transition-all duration-300 hover:scale-110 ${appleClicked ? 'glitch-effect' : ''}`}
        >
          <Apple className="w-32 h-32 text-white" />
        </button>
        <p className="text-white/70 mt-6 text-xl">Click to enter</p>
      </div>
    );
  }

  if (os === 'Android') {
    return (
      <div 
        className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 z-50 bg-black ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="max-w-md w-full p-4">
          <div className="flex items-center mb-6">
            <Terminal className="w-8 h-8 text-green-500 mr-3" />
            <span className="text-green-500 text-lg font-mono">Android Terminal</span>
          </div>
          <div className="bg-black/80 border border-green-500/30 p-4 rounded-md font-mono text-sm text-green-500">
            {androidConsoleLines.map((line, index) => (
              <div key={index} className="mb-1">
                {line}
                {index === androidConsoleLines.length - 1 && (
                  <span className="animate-pulse ml-1">_</span>
                )}
              </div>
            ))}
          </div>
        </div>
        {glitch && (
          <div className="absolute inset-0 bg-green-500/10 glitch-effect"></div>
        )}
      </div>
    );
  }

  // Default loading screen for other OS
  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 z-50 bg-black ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative z-10 w-full max-w-sm px-4">
        <div 
          className={`text-6xl font-bold text-white text-center mb-8 transition-all ${
            glitch ? 'glitch-effect' : ''
          }`}
        >
          <span 
            className={`absolute inset-0 flex items-center justify-center blur-sm animate-pulse bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent ${
              glitch ? 'translate-x-2 translate-y-1 scale-105' : ''
            }`}
          >
            Baneronetwo
          </span>
          <span 
            className={`relative bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent animate-pulse ${
              glitch ? 'translate-x-1 translate-y-0.5 scale-105' : ''
            }`}
          >
            Baneronetwo
          </span>
          {glitch && (
            <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent opacity-70 translate-x-[-5px] translate-y-[2px]">
              Baneronetwo
            </span>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="text-white/70 text-sm mt-4 font-mono text-center">
          {text}{dots}
        </div>
        
        {/* Simulate typing effect for "hacking" feel */}
        <div className="mt-8 font-mono text-xs text-green-500 opacity-70 max-h-32 overflow-hidden">
          {Array.from({ length: Math.ceil(progress / 10) }).map((_, i) => (
            <div key={i} className="mb-1">
              &gt; {randomHackingText()} <span className="animate-ping">_</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Random matrix-like characters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="matrix-rain">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute text-green-400 opacity-70 font-mono text-xs"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fade-in ${Math.random() * 2 + 1}s linear`,
              }}
            >
              {randomMatrixChars()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to generate random "hacking" text
function randomHackingText() {
  const texts = [
    "Decrypting system files...",
    "Access granted to main terminal",
    "Downloading user data...",
    "Bypassing security protocols",
    "Running initialization sequence",
    "Connecting to secure server",
    "Authenticating credentials",
    "Encrypting connection",
    "Scanning network",
    "Optimizing system resources",
    "Loading modules",
    "Checking for updates",
    "Patching security vulnerabilities",
    "Анализ системы",
    "Установка соединения",
    "Шифрование канала",
  ];
  
  return texts[Math.floor(Math.random() * texts.length)];
}

// Helper function to generate random matrix-like characters
function randomMatrixChars() {
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン1234567890";
  let result = '';
  const length = Math.floor(Math.random() * 10) + 5;
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}
