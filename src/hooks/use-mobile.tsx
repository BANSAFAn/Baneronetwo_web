import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Инициализируем с false вместо undefined для предотвращения проблем с гидратацией
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Функция для определения мобильного устройства
    const checkIsMobile = () => {
      // Проверяем ширину экрана
      const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT
      
      // Проверяем user-agent на наличие мобильных устройств
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      
      // Проверяем ориентацию экрана
      const isPortraitOrientation = window.matchMedia("(orientation: portrait)").matches
      
      // Проверяем поддержку touch событий
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      // Комбинируем все проверки
      setIsMobile(isMobileWidth || (isMobileUserAgent && (isPortraitOrientation || isTouchDevice)))
    }
    
    // Проверяем сразу при монтировании
    checkIsMobile()
    
    // Используем и resize, и matchMedia для более надежного отслеживания
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const orientationMql = window.matchMedia("(orientation: portrait)")
    
    // Обработчики для различных событий
    const handleMediaChange = () => checkIsMobile()
    const handleResize = () => checkIsMobile()
    const handleOrientationChange = () => checkIsMobile()
    
    // Добавляем все слушатели
    mql.addEventListener("change", handleMediaChange)
    orientationMql.addEventListener("change", handleOrientationChange)
    window.addEventListener("resize", handleResize, { passive: true })
    
    // Очищаем все слушатели при размонтировании
    return () => {
      mql.removeEventListener("change", handleMediaChange)
      orientationMql.removeEventListener("change", handleOrientationChange)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
