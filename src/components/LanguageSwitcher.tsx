
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-full bg-black/50 dark:bg-gray-800/50 hover:bg-white/10 dark:hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10 dark:border-white/20">
        <Globe className="w-5 h-5 text-white dark:text-gray-200" />
        <span className="text-sm font-medium text-white dark:text-gray-200">{t('language')}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/80 dark:bg-gray-800/80 backdrop-blur-lg border border-white/10 dark:border-white/20 text-white dark:text-gray-200">
        <DropdownMenuItem 
          className={`${language === 'en' ? 'bg-white/10' : ''} hover:bg-white/20 dark:hover:bg-white/30`}
          onClick={() => setLanguage('en')}
        >
          {t('english')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`${language === 'ru' ? 'bg-white/10' : ''} hover:bg-white/20 dark:hover:bg-white/30`}
          onClick={() => setLanguage('ru')}
        >
          {t('russian')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`${language === 'uk' ? 'bg-white/10' : ''} hover:bg-white/20 dark:hover:bg-white/30`}
          onClick={() => setLanguage('uk')}
        >
          {t('ukrainian')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
