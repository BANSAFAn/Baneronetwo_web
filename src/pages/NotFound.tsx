
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="text-center bg-black/30 backdrop-blur-md p-8 rounded-lg border border-white/10">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">404</h1>
        <p className="text-xl text-white/70 mb-6">Oops! Page not found</p>
        <Link to="/" className="inline-block py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
          {t('home')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
