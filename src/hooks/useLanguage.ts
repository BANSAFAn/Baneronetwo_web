
import { useState, useEffect } from 'react';
import { Language } from '../lib/i18n';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && ['ru', 'en', 'uk'].includes(saved)) {
      setLanguage(saved);
    }

    // Listen for language changes
    const handleLanguageChange = () => {
      const currentLang = localStorage.getItem('language') as Language;
      if (currentLang && currentLang !== language) {
        setLanguage(currentLang);
        setForceRender(prev => prev + 1);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // Force immediate re-render
    setForceRender(prev => prev + 1);
    window.dispatchEvent(new Event('languageChanged'));
  };

  return { language, changeLanguage, forceRender };
};
