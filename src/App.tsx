
import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { useIsMobile } from './hooks/use-mobile';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';

// Lazy load pages with dynamic import() for better code splitting
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Posts = lazy(() => import('./pages/Posts'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PriceList = lazy(() => import('./pages/PriceList'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  // Определяем, является ли устройство мобильным
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  
  // Эффект для определения мобильного устройства при загрузке
  useEffect(() => {
    const checkMobile = () => {
      const isMobileWidth = window.innerWidth < 768;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      setIsMobileDevice(isMobileWidth || isMobileUserAgent);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Настраиваем время ожидания загрузки в зависимости от устройства
  const suspenseTimeout = isMobileDevice ? 1000 : 300;
  
  // Оптимизированная загрузка компонентов с таймаутом
  const optimizedLazyLoad = (Component: React.ComponentType<any>) => {
    return (props: any) => (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };
  
  return (
    <LanguageProvider>
      <Router>
        {/* Кастомный курсор только для десктопов */}
        <CustomCursor />
        
        {/* Используем оптимизированную загрузку для маршрутов */}
        <Routes>
          <Route path="/" element={optimizedLazyLoad(Index)({})} />
          <Route path="/about" element={optimizedLazyLoad(About)({})} />
          <Route path="/projects" element={optimizedLazyLoad(Projects)({})} />
          <Route path="/posts" element={optimizedLazyLoad(Posts)({})} />
          <Route path="/blog" element={optimizedLazyLoad(Blog)({})} />
          <Route path="/blog/:id" element={optimizedLazyLoad(BlogPost)({})} />
          <Route path="/price-list" element={optimizedLazyLoad(PriceList)({})} />
          <Route path="/404" element={optimizedLazyLoad(NotFound)({})} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App
