
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
// Временно отключаем компоненты, которые могут вызывать проблемы
// import { Toaster } from './components/ui/toaster';
// import { SmoothCursor } from './components/ui/smooth-cursor';

// Lazy load pages
const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Posts = lazy(() => import('./pages/Posts'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PriceList = lazy(() => import('./pages/PriceList'));
const NotFound = lazy(() => import('./pages/NotFound'));

import { LoadingScreen } from './components/LoadingScreen';

function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Временно отключаем компоненты, которые могут вызывать проблемы */}
        {/* <SmoothCursor /> */}
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Suspense>
        {/* <Toaster /> */}
      </Router>
    </LanguageProvider>
  )
}

export default App
