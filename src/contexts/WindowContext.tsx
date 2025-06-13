
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WindowState {
  id: string;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  isClosed: boolean;
}

interface WindowContextType {
  windows: WindowState[];
  registerWindow: (id: string, title: string) => void;
  updateWindow: (id: string, updates: Partial<WindowState>) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  closeWindow: (id: string) => void;
}

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const useWindowContext = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindowContext must be used within a WindowProvider');
  }
  return context;
};

export const WindowProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);

  const registerWindow = (id: string, title: string) => {
    setWindows(prev => {
      if (prev.find(w => w.id === id)) return prev;
      return [...prev, { id, title, isMinimized: false, isMaximized: false, isClosed: false }];
    });
  };

  const updateWindow = (id: string, updates: Partial<WindowState>) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const minimizeWindow = (id: string) => {
    updateWindow(id, { isMinimized: true, isMaximized: false });
  };

  const maximizeWindow = (id: string) => {
    updateWindow(id, { isMaximized: true, isMinimized: false });
  };

  const restoreWindow = (id: string) => {
    updateWindow(id, { isMinimized: false, isMaximized: false });
  };

  const closeWindow = (id: string) => {
    updateWindow(id, { isClosed: true });
  };

  return (
    <WindowContext.Provider value={{
      windows,
      registerWindow,
      updateWindow,
      minimizeWindow,
      maximizeWindow,
      restoreWindow,
      closeWindow,
    }}>
      {children}
    </WindowContext.Provider>
  );
};
