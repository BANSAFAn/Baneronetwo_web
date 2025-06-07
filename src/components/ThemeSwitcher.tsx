import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/LanguageContext';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-full bg-black/50 hover:bg-white/10 transition-colors backdrop-blur-sm border border-white/10">
        {theme === 'dark' ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
        <span className="text-sm font-medium">{t('theme')}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-lg border border-white/10">
        <DropdownMenuItem 
          className={`${theme === 'light' ? 'bg-white/10' : ''} hover:bg-white/20`}
          onClick={() => setTheme('light')}
        >
          <Sun className="w-4 h-4 mr-2" />
          {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`${theme === 'dark' ? 'bg-white/10' : ''} hover:bg-white/20`}
          onClick={() => setTheme('dark')}
        >
          <Moon className="w-4 h-4 mr-2" />
          {t('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`${theme === 'system' ? 'bg-white/10' : ''} hover:bg-white/20`}
          onClick={() => setTheme('system')}
        >
          <span className="w-4 h-4 mr-2 flex items-center justify-center">💻</span>
          {t('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};