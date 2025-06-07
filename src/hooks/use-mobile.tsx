import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Инициализируем с false вместо undefined для предотвращения проблем с гидратацией
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    // Функция для определения мобильного устройства
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Проверяем сразу при монтировании
    checkIsMobile()
    
    // Используем и resize, и matchMedia для более надежного отслеживания
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Обработчик для matchMedia
    const handleMediaChange = () => checkIsMobile()
    
    // Обработчик для resize
    const handleResize = () => checkIsMobile()
    
    // Добавляем оба слушателя
    mql.addEventListener("change", handleMediaChange)
    window.addEventListener("resize", handleResize, { passive: true })
    
    // Очищаем оба слушателя при размонтировании
    return () => {
      mql.removeEventListener("change", handleMediaChange)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return isMobile
}
