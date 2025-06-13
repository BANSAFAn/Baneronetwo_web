
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../lib/i18n';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  const languages: { code: Language; flag: string; name: string }[] = [
    { code: 'ru', flag: '🇷🇺', name: 'RU' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'uk', flag: '🇺🇦', name: 'UA' },
  ];

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-button bg-red-500"></div>
          <div className="terminal-button bg-yellow-500"></div>
          <div className="terminal-button bg-green-500"></div>
          <span className="text-neon-green ml-4 font-orbitron text-xs">LANG.SYS</span>
        </div>
        
        <div className="flex p-2 gap-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`nav-link text-xs px-2 py-1 ${
                language === lang.code ? 'bg-neon-green text-cyber-dark' : ''
              }`}
            >
              <span className="mr-1">{lang.flag}</span>
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
