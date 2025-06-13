
import React, { useEffect } from 'react';
import { useWindowContext } from '../contexts/WindowContext';

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  defaultMinimized?: boolean;
  id?: string;
}

const TerminalWindow = ({ 
  title, 
  children, 
  className = "", 
  defaultMinimized = false,
  id = title.replace(/\s+/g, '_').toLowerCase()
}: TerminalWindowProps) => {
  const { windows, registerWindow, minimizeWindow, maximizeWindow, restoreWindow, closeWindow } = useWindowContext();

  useEffect(() => {
    registerWindow(id, title);
  }, [id, title, registerWindow]);

  const windowState = windows.find(w => w.id === id);
  const isMinimized = windowState?.isMinimized || defaultMinimized;
  const isMaximized = windowState?.isMaximized || false;
  const isClosed = windowState?.isClosed || false;

  if (isClosed) {
    return null;
  }

  if (isMinimized) {
    return null; // Completely hide minimized windows
  }

  return (
    <div className={`terminal-window ${className} ${isMaximized ? 'fixed inset-4 z-50' : ''} transition-all duration-300`}>
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          {/* Close button - Red */}
          <button
            onClick={() => closeWindow(id)}
            className="terminal-button bg-red-500 hover:bg-red-600 transition-colors group relative"
            title="Close window"
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-xs text-white font-bold">
              ×
            </span>
          </button>
          
          {/* Minimize button - Yellow */}
          <button
            onClick={() => minimizeWindow(id)}
            className="terminal-button bg-yellow-500 hover:bg-yellow-600 transition-colors group relative"
            title="Minimize window"
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-xs text-black font-bold">
              −
            </span>
          </button>
          
          {/* Maximize button - Green */}
          <button
            onClick={() => isMaximized ? restoreWindow(id) : maximizeWindow(id)}
            className="terminal-button bg-green-500 hover:bg-green-600 transition-colors group relative"
            title={isMaximized ? "Restore window" : "Maximize window"}
          >
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-xs text-white font-bold">
              {isMaximized ? '□' : '□'}
            </span>
          </button>
        </div>
        
        <span className="text-neon-green ml-4 font-orbitron text-xs md:text-sm">{title}</span>
      </div>
      
      <div>
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
