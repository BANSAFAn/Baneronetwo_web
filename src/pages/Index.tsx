
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import { LoadingScreen } from '@/components/LoadingScreen';
import { CommandLine } from '@/components/CommandLine';
import { Clock } from '@/components/Clock';
import { SocialLinks } from '@/components/SocialLinks';
import { AudioPlayer } from '@/components/AudioPlayer';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import { UserCircle, Newspaper, Github, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/context/LanguageContext';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pixels, setPixels] = useState<{id: number, x: number, y: number, size: number, color: string, tx: number}[]>([]);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      createPixelEffect();
      setTimeout(() => setShowContent(true), 100);
    }, 3000);

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

  const createPixelEffect = (event?: React.MouseEvent<HTMLAnchorElement>, buttonColors?: string[]) => {
    const newPixels = [];
    const defaultColors = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#F43F5E', '#22C55E'];
    const colors = buttonColors || defaultColors;
    
    // Определяем позицию для создания частиц
    let posX = window.innerWidth / 2;
    let posY = window.innerHeight / 2;
    
    // Если событие существует, используем позицию кнопки
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      posX = rect.left + rect.width / 2;
      posY = rect.top + rect.height; // Позиция снизу кнопки
    }
    
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 6 + 2;
      // Создаем частицы под кнопкой с небольшим разбросом по горизонтали
      // и падением вниз от кнопки
      const horizontalSpread = (Math.random() - 0.5) * 60; // Меньший разброс по горизонтали
      const verticalOffset = Math.random() * 40 + 5; // Смещение вниз от кнопки
      
      newPixels.push({
        id: i,
        x: posX + horizontalSpread,
        y: posY + verticalOffset,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        tx: (Math.random() - 0.5) * 20
      });
    }
    
    setPixels(newPixels);

    setTimeout(() => {
      setPixels([]);
    }, 2000);
  };

  const scrollToContent = () => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Custom cursor */}
      <SmoothCursor />
      
      <div className="absolute inset-0 backdrop-blur-[3px] opacity-80">
        <ParticlesBg 
          type="cobweb" 
          bg={true} 
          color="#111111"
          num={isMobile ? 80 : 150}
        />
      </div>
      
      {/* Pixel Animation */}
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute animate-float"
          style={{
            top: `${pixel.y}px`,
            left: `${pixel.x}px`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            backgroundColor: pixel.color,
            '--tx': `${pixel.tx}px`
          } as React.CSSProperties}
        />
      ))}
      
      <div className={`w-full min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <AudioPlayer />
        
        <div className="fixed top-0 left-0 z-50 p-4">
          <LanguageSwitcher />
        </div>
        
        <div className="fixed top-0 right-0 z-50 p-4">
          <Clock />
        </div>
        
        {/* Hero Section */}
        <header className="h-screen w-full flex flex-col items-center justify-center relative">
          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center">
            <h1 className={`text-5xl md:text-7xl font-bold text-center mb-8 transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] hover:animate-pulse">
                Baneronetwo
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-center max-w-lg text-white/70 mb-10 transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              {t('developer')}
            </p>

            <div className={`transition-all duration-1000 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <SocialLinks />
            </div>
          </div>
          
          <button 
            onClick={scrollToContent}
            className={`absolute bottom-10 animate-bounce transition-all duration-300 bg-white/5 backdrop-blur-md rounded-full p-3 hover:bg-white/10 ${showContent ? 'opacity-100' : 'opacity-0'}`}
          >
            <ChevronDown className="h-6 w-6 text-white/80" />
          </button>
        </header>

        {/* Main Content Section */}
        <main ref={mainContentRef} className="min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className={`bg-black/30 backdrop-blur-md p-8 rounded-lg border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in hover:-translate-y-2`}>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('about_me')}</h2>
                <p className="text-white/70 mb-6">{t('about_description')}</p>
                <Link 
                  to="/about" 
                  className="inline-block py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 button-with-particles"
                  onMouseEnter={(e) => createPixelEffect(e, ['#3B82F6', '#9333EA'])}
                >
                  {t('learn_more')}
                </Link>
              </div>
              
              <div className={`bg-black/30 backdrop-blur-md p-8 rounded-lg border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in delay-100 hover:-translate-y-2`}>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{t('my_projects')}</h2>
                <p className="text-white/70 mb-6">{t('projects_description')}</p>
                <Link 
                  to="/projects" 
                  className="inline-block py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 button-with-particles"
                  onMouseEnter={(e) => createPixelEffect(e, ['#9333EA', '#3B82F6'])}
                >
                  {t('view_projects')}
                </Link>
              </div>
              
              <div className={`bg-black/30 backdrop-blur-md p-8 rounded-lg border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in delay-200 hover:-translate-y-2`}>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">{t('my_posts')}</h2>
                <p className="text-white/70 mb-6">{t('posts_description')}</p>
                <Link 
                  to="/posts" 
                  className="inline-block py-2 px-4 bg-gradient-to-r from-pink-600 to-red-600 rounded-md text-white hover:from-pink-700 hover:to-red-700 transition-all duration-300 hover:scale-105 button-with-particles"
                  onMouseEnter={(e) => createPixelEffect(e, ['#DB2777', '#DC2626'])}
                >
                  {t('read_posts')}
                </Link>
              </div>
              
              <div className={`bg-black/30 backdrop-blur-md p-8 rounded-lg border border-white/10 transition-all duration-500 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10 animate-fade-in delay-300 hover:-translate-y-2`}>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">{t('blog')}</h2>
                <p className="text-white/70 mb-6">{t('blog_description') || 'Read my latest blog posts with updates, tutorials and thoughts.'}</p>
                <Link 
                  to="/blog" 
                  className="inline-block py-2 px-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-md text-white hover:from-blue-700 hover:to-green-700 transition-all duration-300 hover:scale-105 button-with-particles"
                  onMouseEnter={(e) => createPixelEffect(e, ['#3B82F6', '#16A34A'])}
                >
                  {t('blog')}
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
