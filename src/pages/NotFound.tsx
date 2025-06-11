
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Home, AlertTriangle, RefreshCw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Активируем эффект глитча периодически
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient bg-[length:200%_auto]"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 animate-gradient bg-[length:200%_auto]"></div>
        <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 animate-gradient bg-[length:auto_200%]"></div>
        <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-blue-500 via-pink-500 to-purple-500 animate-gradient bg-[length:auto_200%]"></div>
        
        {/* Декоративные элементы */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <LanguageSwitcher />
      </div>

      <div className={`relative z-10 text-center glass-morphism p-10 rounded-lg border border-white/10 max-w-md mx-auto ${glitchActive ? 'glitch-effect' : ''}`}>
        <div className="relative mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            404
          </h1>
          <AlertTriangle className="absolute -top-4 -right-4 w-12 h-12 text-yellow-500 animate-pulse" />
        </div>
        
        <p className="text-xl text-white/70 mb-8">
          Похоже, вы попали в цифровое пространство, которое еще не существует.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            {t('home')}
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center justify-center gap-2 py-3 px-6 bg-black/50 border border-white/20 rounded-md text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            {t('back')}
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-white/30 text-sm">
        {location.pathname}
      </div>
    </div>
  );
};

export default NotFound;
