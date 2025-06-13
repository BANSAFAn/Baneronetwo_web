
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoadingScreen from './components/LoadingScreen';
import MatrixBackground from './components/MatrixBackground';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ProjectsPage from './components/ProjectsPage';
import BlogPage from './components/BlogPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import MusicPlayer from './components/MusicPlayer';
import WindowTaskbar from './components/WindowTaskbar';
import CustomCursor from './components/CustomCursor';
import { WindowProvider } from './contexts/WindowContext';

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    // Detect OS and show appropriate loading screen
    const userAgent = navigator.userAgent.toLowerCase();
    const isWindows = userAgent.includes('win');
    const isMac = userAgent.includes('mac');
    const isLinux = userAgent.includes('linux');

    console.log(`Detected OS: ${isWindows ? 'Windows' : isMac ? 'macOS' : isLinux ? 'Linux' : 'Unknown'}`);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'blog':
        return <BlogPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WindowProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <div className="min-h-screen bg-cyber-dark text-neon-green font-mono relative overflow-x-hidden">
            {/* Custom Cursor */}
            <CustomCursor />
            
            {isLoading ? (
              <LoadingScreen onComplete={handleLoadingComplete} />
            ) : (
              <>
                <MatrixBackground />
                <LanguageSwitcher />
                <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
                <main className="relative z-10 scan-lines">
                  {renderCurrentPage()}
                </main>
                
                {/* Music Player */}
                <MusicPlayer />
                
                {/* Window Taskbar */}
                <WindowTaskbar />
                
                {/* Footer */}
                <footer className="relative z-10 border-t border-neon-green bg-cyber-dark">
                  <div className="max-w-6xl mx-auto p-4 md:p-6">
                    <div className="terminal-window">
                      <div className="terminal-header">
                        <div className="terminal-button bg-red-500"></div>
                        <div className="terminal-button bg-yellow-500"></div>
                        <div className="terminal-button bg-green-500"></div>
                        <span className="text-neon-green ml-4 font-orbitron text-xs md:text-sm">FOOTER.SYS</span>
                      </div>
                      
                      <div className="p-3 md:p-4 text-center">
                        <div className="font-mono text-xs md:text-sm space-y-2">
                          <div className="text-neon-blue">$ whoami && date</div>
                          <div className="text-neon-green">
                            Baneronetwo © {new Date().getFullYear()} • Coded with ❤️ and lots of ☕
                          </div>
                          <div className="text-neon-purple text-xs">
                            "In code we trust, in security we verify"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </>
            )}
          </div>
        </TooltipProvider>
      </WindowProvider>
    </QueryClientProvider>
  );
}

export default App;
