
import React from 'react';
import { useWindowContext } from '../contexts/WindowContext';

const WindowTaskbar = () => {
  const { windows, restoreWindow } = useWindowContext();

  const minimizedWindows = windows.filter(w => w.isMinimized && !w.isClosed);

  if (minimizedWindows.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-wrap gap-2 max-w-md">
      {minimizedWindows.map((window) => (
        <button
          key={window.id}
          onClick={() => restoreWindow(window.id)}
          className="terminal-window p-2 text-xs hover:scale-105 transition-transform"
          title={`Restore ${window.title}`}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-neon-green rounded-full"></div>
            <span className="text-neon-green font-mono truncate max-w-20">
              {window.title}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default WindowTaskbar;
