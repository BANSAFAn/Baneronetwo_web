
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [osType, setOsType] = useState<'windows' | 'macos' | 'android' | 'linux'>('linux');

  useEffect(() => {
    // Detect OS
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    
    if (userAgent.includes('win')) {
      setOsType('windows');
    } else if (userAgent.includes('mac') && !isMobile) {
      setOsType('macos');
    } else if (userAgent.includes('android') || isMobile) {
      setOsType('android');
    } else {
      setOsType('linux');
    }
  }, []);

  const windowsMessages = [
    'SYSTEM_SERVICE_EXCEPTION',
    'CRITICAL_PROCESS_DIED',
    'MEMORY_MANAGEMENT',
    'IRQL_NOT_LESS_OR_EQUAL',
    'PAGE_FAULT_IN_NONPAGED_AREA'
  ];

  const macMessages = [
    'Ḩ̷̀a̴͎̿c̵̰̈k̷̰̾i̶̦͐n̵̰̈́g̸̱̀.̴̰̌.̷̱̈.̵̰̈́',
    'S̶̰̈́ỳ̷̱š̴̰ẗ̷̰́ḛ̵̈́m̶̰̌ ̴̰̌C̷̰̈́ö̵̰́m̶̰̌p̷̰̈́r̵̰̈́ǒ̴̰m̷̰̈́ḭ̵̈́š̶̰ḛ̷̈́ď̴̰',
    'Ë̷́r̶̈́ř̷ö̵́ř̶ ̴̌4̷̈́0̵̈́4̶̌:̴̌ ̷̈́R̵̈́ě̶ä̷́ľ̴ḯ̷ẗ̵́y̶̌ ̴̌N̷̈́ö̵́ť̶ ̴̌F̷̈́ö̵́ǔ̶n̷̈́ď̴',
    'Ḭ̶̇n̵̰̈́v̶̰̌ä̷̰́d̵̰̈́ḭ̶̌n̷̰̈́g̸̰̀ ̴̰̌M̷̰̈́ä̵̰́ḭ̶̌n̷̰̈́f̴̰̌r̷̰̈́ä̵̰́m̶̰̌ḛ̷̈́.̴̰̌.̷̰̈́.̵̰̈́'
  ];

  const androidMessages = [
    'Booting Android System...',
    'Loading Kernel Modules...',
    'Initializing Hardware...',
    'Starting Services...',
    'Mounting File Systems...'
  ];

  const linuxMessages = [
    'Initializing quantum matrix...',
    'Decrypting neural pathways...',
    'Loading cybernetic modules...',
    'Establishing secure connection...',
    'Bypassing firewall protocols...',
    'Accessing mainframe database...',
    'Welcome to the future...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    const messageInterval = setInterval(() => {
      let messages;
      switch (osType) {
        case 'windows':
          messages = windowsMessages;
          break;
        case 'macos':
          messages = macMessages;
          break;
        case 'android':
          messages = androidMessages;
          break;
        default:
          messages = linuxMessages;
      }
      const messageIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[messageIndex]);
    }, 800);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearInterval(cursorInterval);
    };
  }, [onComplete, osType]);

  const progressBar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));

  if (osType === 'windows') {
    return (
      <div className="fixed inset-0 bg-blue-600 flex flex-col items-center justify-center z-50 text-white">
        <div className="glitch-effect w-full h-full absolute opacity-20"></div>
        <div className="text-center space-y-8 z-10">
          <div className="text-6xl md:text-8xl font-mono">:(</div>
          <div className="text-xl md:text-2xl font-mono">
            Your PC ran into a problem and needs to restart.
          </div>
          <div className="text-lg font-mono">
            We're just collecting some error info, and then we'll restart for you.
          </div>
          <div className="text-lg font-mono text-blue-200">
            {progress}% complete
          </div>
          <div className="text-sm font-mono text-blue-300 glitch-text" data-text={currentMessage}>
            Stop code: {currentMessage}
          </div>
        </div>
      </div>
    );
  }

  if (osType === 'macos') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 text-white">
        <div className="matrix-bg opacity-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 opacity-30 animate-matrix-rain text-xs glitch-text"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </div>
          ))}
        </div>
        
        <div className="text-center space-y-8 z-10">
          <div className="text-8xl md:text-9xl">🍎</div>
          <div className="text-neon-green font-mono text-lg md:text-xl glitch-text animate-flicker" data-text={currentMessage}>
            {currentMessage}
            <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
          </div>
          <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (osType === 'android') {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 text-green-400">
        <div className="glitch-effect w-full h-full absolute opacity-30"></div>
        
        <div className="text-center space-y-6 z-10 font-mono">
          <div className="text-4xl md:text-6xl font-bold text-green-400 animate-pulse">
            ANDROID
          </div>
          
          <div className="space-y-2">
            <div className="text-sm md:text-base">
              [{progressBar}] {progress}%
            </div>
            <div className="text-green-300 glitch-text" data-text={currentMessage}>
              {currentMessage}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-green-600">
            <div>Bootloader: BANERONETWO v2.1</div>
            <div>Kernel: Linux 5.15.0-android</div>
            <div>Build: HACKER_BUILD_337</div>
          </div>
        </div>
      </div>
    );
  }

  // Default Linux loader
  return (
    <div className="fixed inset-0 bg-cyber-dark flex items-center justify-center z-50">
      <div className="matrix-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-neon-green opacity-20 animate-matrix-rain text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {String.fromCharCode(0x30A0 + Math.random() * 96)}
          </div>
        ))}
      </div>
      
      <div className="terminal-window w-full max-w-2xl mx-4">
        <div className="terminal-header">
          <div className="terminal-button bg-red-500"></div>
          <div className="terminal-button bg-yellow-500"></div>
          <div className="terminal-button bg-green-500"></div>
          <span className="text-neon-green ml-4 font-orbitron">BANERONETWO_SYSTEM</span>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-neon-green font-mono">
            <div className="mb-4">
              <span className="text-neon-blue">root@baneronetwo</span>
              <span className="text-white">:</span>
              <span className="text-neon-purple">~$</span>
              <span className="text-neon-green ml-2">loading_portfolio.sh</span>
            </div>
            
            <div className="space-y-2">
              <div>[{progressBar}] {progress}%</div>
              <div className="text-neon-blue">
                {currentMessage}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>
              </div>
            </div>
            
            <div className="mt-4 text-xs text-neon-purple">
              <div>System: CyberOS v2.1.337</div>
              <div>Security Level: MAXIMUM</div>
              <div>Access Level: ROOT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
