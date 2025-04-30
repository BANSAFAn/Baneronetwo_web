
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define supported languages
export type Language = 'en' | 'ru' | 'uk';

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import translation files
import en from '../translations/en';
import ru from '../translations/ru';
import uk from '../translations/uk';

// Translations mapping
const translations = {
  en,
  ru,
  uk,
};

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Try to get language from localStorage, default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || getBrowserLanguage() || 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language] || translations.en;
    return currentTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to get browser language
function getBrowserLanguage(): Language | null {
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'ru', 'uk'].includes(browserLang)) {
    return browserLang as Language;
  }
  return null;
}
