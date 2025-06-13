
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../lib/i18n';
import { useIsMobile } from '../hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation = ({ currentPage, onNavigate }: NavigationProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const navItems = [
    { id: 'home', label: getTranslation(language, 'nav.home'), icon: '>' },
    { id: 'about', label: getTranslation(language, 'nav.about'), icon: '#' },
    { id: 'projects', label: getTranslation(language, 'nav.projects'), icon: '[]' },
    { id: 'blog', label: getTranslation(language, 'nav.blog'), icon: '//' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <nav className="fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="terminal-window p-4 bg-cyber-gray border border-neon-green rounded-lg">
              <Menu className="w-6 h-6 text-neon-green" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-cyber-dark border-neon-green w-80 p-0">
            <div className="terminal-window h-full border-0 rounded-none">
              <div className="terminal-header">
                <div className="terminal-button bg-red-500"></div>
                <div className="terminal-button bg-yellow-500"></div>
                <div className="terminal-button bg-green-500"></div>
                <span className="text-neon-green ml-4 font-orbitron text-sm">MOBILE_NAV.EXE</span>
              </div>
              
              <div className="p-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full text-left nav-link p-4 text-base font-mono ${
                      currentPage === item.id 
                        ? 'bg-neon-green text-cyber-dark' 
                        : ''
                    }`}
                  >
                    <span className="text-neon-purple mr-3 text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    );
  }

  return (
    <nav className="fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-40 px-4">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-button bg-red-500"></div>
          <div className="terminal-button bg-yellow-500"></div>
          <div className="terminal-button bg-green-500"></div>
          <span className="text-neon-green ml-4 font-orbitron text-xs md:text-sm">NAVIGATION.EXE</span>
        </div>
        
        <div className="flex flex-wrap items-center p-2 gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`nav-link mx-0.5 text-xs md:text-sm font-mono px-2 md:px-3 py-1 ${
                currentPage === item.id 
                  ? 'bg-neon-green text-cyber-dark' 
                  : ''
              }`}
            >
              <span className="text-neon-purple mr-1">{item.icon}</span>
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden">{item.label.split('_').join('')}</span>
              {hoveredItem === item.id && (
                <span className="ml-1 animate-terminal-cursor">_</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
