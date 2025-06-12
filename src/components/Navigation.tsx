
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  return (
    <nav className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 shadow-lg">
      <ul className="flex items-center space-x-1 md:space-x-2">
        <li>
          <Link 
            to="/about" 
            className="px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {t('about_me') || 'About'}
          </Link>
        </li>
        <li>
          <Link 
            to="/projects" 
            className="px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {t('my_projects') || 'Projects'}
          </Link>
        </li>
        <li>
          <Link 
            to="/posts" 
            className="px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {t('my_posts') || 'Posts'}
          </Link>
        </li>
        <li>
          <Link 
            to="/blog" 
            className="px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            {t('blog') || 'Blog'}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
