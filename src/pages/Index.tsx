
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { CommandLine } from '../components/CommandLine';
import { Clock } from '../components/Clock';
import { SocialLinks } from '../components/SocialLinks';
import { AudioPlayer } from '../components/AudioPlayer';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { CustomCursor } from '../components/CustomCursor';
import { SmoothCursor } from '../components/ui/smooth-cursor';
import Navigation from '../components/Navigation';
import { UserCircle, Newspaper, Github, ChevronDown } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { useLanguage } from '../context/LanguageContext';
import SimpleBackground from '../animation/background';
import PixelTrail from '../animation/pixelts';
import ErrorBoundary from '../components/ErrorBoundary';

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
        {console.log("Rendering background in Index.tsx")}
        <SimpleBackground />
      </div>
      
      <div className={`w-full min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AudioPlayer />
        
        <div className="fixed top-0 left-0 z-50 p-4 flex gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className={`bg-black/30 dark:bg-gray-900/30 backdrop-blur-md p-8 rounded-lg border border-white/10 dark:border-white/20 transition-all duration-500 hover:border-white/20 dark:hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in hover:-translate-y-2 relative`}>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('about_me')}</h2>
                <p className="text-white/70 dark:text-gray-300/70 mb-6">{t('about_description')}</p>
                <div className="relative">
                  <PixelTrail 
                    gridSize={40} 
                    trailSize={0.1} 
                    maxAge={250} 
                    color="#3B82F6" 
                    gooeyFilter={{ id: "about-gooey", strength: 10 }}
                  />
                  <Link 
                    to="/about" 
                    className="inline-block py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                  >
                    {t('learn_more')}
                  </Link>
                </div>
              </div>
              
              <div className={`bg-black/30 dark:bg-gray-900/30 backdrop-blur-md p-8 rounded-lg border border-white/10 dark:border-white/20 transition-all duration-500 hover:border-white/20 dark:hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in delay-100 hover:-translate-y-2 relative`}>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{t('my_projects')}</h2>
                <p className="text-white/70 dark:text-gray-300/70 mb-6">{t('projects_description')}</p>
                <div className="relative">
                  <PixelTrail 
                    gridSize={40} 
                    trailSize={0.1} 
                    maxAge={250} 
                    color="#9333EA" 
                    gooeyFilter={{ id: "projects-gooey", strength: 10 }}
                  />
                  <Link 
                    to="/projects" 
                    className="inline-block py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105"
                  >
                    {t('view_projects')}
                  </Link>
                </div>
              </div>
              
              <div className={`bg-black/30 dark:bg-gray-900/30 backdrop-blur-md p-8 rounded-lg border border-white/10 dark:border-white/20 transition-all duration-500 hover:border-white/20 dark:hover:border-white/30 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in delay-200 hover:-translate-y-2 relative`}>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">{t('my_posts')}</h2>
                <p className="text-white/70 dark:text-gray-300/70 mb-6">{t('posts_description')}</p>
                <div className="relative">
                  <PixelTrail 
                    gridSize={40} 
                    trailSize={0.1} 
                    maxAge={250} 
                    color="#DB2777" 
                    gooeyFilter={{ id: "posts-gooey", strength: 10 }}
                  />
                  <Link 
                    to="/posts" 
                    className="inline-block py-2 px-4 bg-gradient-to-r from-pink-600 to-red-600 rounded-md text-white hover:from-pink-700 hover:to-red-700 transition-all duration-300 hover:scale-105"
                  >
                    {t('read_posts')}
                  </Link>
                </div>
              </div>
              
              <div className={`bg-black/30 dark:bg-gray-900/30 backdrop-blur-md p-8 rounded-lg border border-white/10 dark:border-white/20 transition-all duration-500 hover:border-white/20 dark:hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10 animate-fade-in delay-300 hover:-translate-y-2 relative`}>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">{t('blog')}</h2>
                <p className="text-white/70 dark:text-gray-300/70 mb-6">{t('blog_description') || 'Read my latest blog posts with updates, tutorials and thoughts.'}</p>
                <div className="relative">
                  <PixelTrail 
                    gridSize={40} 
                    trailSize={0.1} 
                    maxAge={250} 
                    color="#16A34A" 
                    gooeyFilter={{ id: "blog-gooey", strength: 10 }}
                  />
                  <Link 
                    to="/blog" 
                    className="inline-block py-2 px-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-md text-white hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105"
                  >
                    {t('blog')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
