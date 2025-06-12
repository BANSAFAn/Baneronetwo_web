
import { useEffect, useState, useRef } from 'react';
import { LoadingScreen } from '../components/LoadingScreen';
import { CommandLine } from '../components/CommandLine';
import { Clock } from '../components/Clock';
import { SocialLinks } from '../components/SocialLinks';
import { AudioPlayer } from '../components/AudioPlayer';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { SmoothCursor } from '../components/ui/smooth-cursor';
import Navigation from '../components/Navigation';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useLanguage } from '../context/LanguageContext';
import SimpleBackground from '../animation/background';
import PixelTrail from '../animation/pixelts';
import ErrorBoundary from '../components/ErrorBoundary';
import ProfileCardComponent from '../components/ProfileCardComponent';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 100);
    }, 1500);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen text-white dark:text-gray-100 relative overflow-hidden">
      {/* Custom cursor */}
      <SmoothCursor />
      
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <SimpleBackground />
      </div>
      
      <div className={`w-full min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AudioPlayer />
        
        <div className="fixed top-0 left-0 z-50 p-4 flex gap-2">
          <LanguageSwitcher />
        </div>
        
        <div className="fixed top-0 right-0 z-50 p-4">
          <Clock />
        </div>
        
        {/* Navigation Menu */}
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Navigation />
        </div>
        
        {/* Hero Section */}
        <header className="h-screen w-full flex flex-col items-center justify-center relative">
          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center">
            <h1 className={`text-5xl md:text-7xl font-bold text-center mb-8 transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] hover:animate-pulse">
                Baneronetwo
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-center max-w-lg text-white/70 dark:text-gray-300/70 mb-10 transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {t('developer')}
            </p>

            <div className={`transition-all duration-1000 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <SocialLinks />
            </div>

            <div className={`mt-12 w-full max-w-md transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <ProfileCardComponent transparent={true} />
            </div>
          </div>
          
          <button 
            onClick={scrollToContent}
            className={`absolute bottom-10 animate-bounce transition-all duration-300 bg-white/5 dark:bg-white/10 backdrop-blur-md rounded-full p-3 hover:bg-white/10 dark:hover:bg-white/20 ${showContent ? 'opacity-100' : 'opacity-0'}`}
          >
            <ChevronDown className="h-6 w-6 text-white/80 dark:text-gray-300/80" />
          </button>
        </header>

        {/* Main Content Section */}
        <main ref={mainContentRef} className="min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-40">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {t('welcome_message') || 'Welcome to my personal website'}
              </h2>
              <p className="text-xl text-white/70 dark:text-gray-300/70 max-w-2xl mx-auto">
                {t('welcome_description') || 'Feel free to explore my projects, read my blog posts, or get in touch with me.'}
              </p>
            </div>
            
            <div className="relative">
              <PixelTrail 
                gridSize={40} 
                trailSize={0.1} 
                maxAge={250} 
                color="#3B82F6" 
                gooeyFilter={{ id: "main-gooey", strength: 10 }}
              />
              <CommandLine />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
