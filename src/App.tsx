
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

// Lazy load pages
const Index = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Projects = lazy(() => import('@/pages/Projects'));
const Posts = lazy(() => import('@/pages/Posts'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const PriceList = lazy(() => import('@/pages/PriceList'));
const NotFound = lazy(() => import('@/pages/NotFound'));

import { LoadingScreen } from '@/components/LoadingScreen';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <SmoothCursor />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/price-list" element={<PriceList />} />
            
            {/* Дополнительные маршруты для прямого перехода */}
            <Route path="/blogs" element={<Navigate to="/blog" replace />} />
            <Route path="/blogs/:id" element={<Navigate to="/blog/:id" replace />} />
            <Route path="/project" element={<Navigate to="/projects" replace />} />
            <Route path="/post" element={<Navigate to="/posts" replace />} />
            <Route path="/about-me" element={<Navigate to="/about" replace />} />
            
            {/* Обработка всех остальных маршрутов */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster />
      </Router>
    </LanguageProvider>
  )
}

export default App
