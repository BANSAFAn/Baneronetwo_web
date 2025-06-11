import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Удаляем импорт ThemeProvider из next-themes
import { LanguageProvider } from './context/LanguageContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Временно убираем ThemeProvider */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
