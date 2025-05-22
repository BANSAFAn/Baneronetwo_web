import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Globe, Users, Youtube, Laptop, Heart, Shield, Code, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PriceList = () => {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { t } = useLanguage();
  
  // Константы для конвертации валют
  const USD_RATE = 0.026;
  const EUR_RATE = 0.024;

  // Форматирование валюты
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Категории услуг
  const categories = [
    { id: 'all', name: 'Все услуги' },
    { id: 'web', name: 'Веб-разработка' },
    { id: 'localization', name: 'Локализация' },
    { id: 'community', name: 'Сообщество' },
    { id: 'security', name: 'Безопасность' },
  ];

  // Полный прайс-лист
  const priceList = [
    {
      id: 1,
      title: "Разработка лендинга",
      price: 1500,
      description: "Создание современного одностраничного сайта с адаптивным дизайном",
      category: "web",
      icon: <Laptop className="w-8 h-8 text-blue-400" />,
      features: ["Адаптивный дизайн", "SEO-оптимизация", "Форма обратной связи", "Хостинг на 1 год"]
    },
    {
      id: 2,
      title: "Многостраничный сайт",
      price: 3000,
      description: "Разработка полноценного сайта с несколькими страницами и функционалом",
      category: "web",
      icon: <Code className="w-8 h-8 text-indigo-400" />,
      features: ["До 5 страниц", "Админ-панель", "Интеграция с CMS", "Техническая поддержка 3 месяца"]
    },
    {
      id: 3,
      title: "Локализация сайта",
      price: 500,
      description: "Профессиональный перевод и адаптация контента для различных языков",
      category: "localization",
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      features: ["Перевод до 10 страниц", "Культурная адаптация", "SEO-оптимизация для локального рынка"]
    },
    {
      id: 4,
      title: "Локализация приложения",
      price: 800,
      description: "Перевод и адаптация мобильного приложения или программы",
      category: "localization",
      icon: <Globe className="w-8 h-8 text-violet-400" />,
      features: ["Перевод интерфейса", "Адаптация графических элементов", "Тестирование локализации"]
    },
    {
      id: 5,
      title: "YouTube Продвижение",
      price: 600,
      description: "Продвижение видео для увеличения просмотров и подписчиков",
      category: "community",
      icon: <Youtube className="w-8 h-8 text-red-400" />,
      features: ["До 1,000 просмотров", "Оптимизация SEO", "Продвижение в сообществах"]
    },
    {
      id: 6,
      title: "Модерация Discord",
      price: 500,
      description: "Управление и модерация Discord сервера",
      category: "community",
      icon: <MessageCircle className="w-8 h-8 text-indigo-400" />,
      features: ["Настройка ролей и каналов", "Создание правил", "Модерация контента", "Настройка ботов"]
    },
    {
      id: 7,
      title: "Аудит безопасности",
      price: 1200,
      description: "Комплексный анализ безопасности веб-сайта или приложения",
      category: "security",
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      features: ["Проверка уязвимостей", "Анализ кода", "Рекомендации по устранению проблем", "Повторный аудит после исправлений"]
    },
    {
      id: 8,
      title: "Настройка защиты",
      price: 900,
      description: "Настройка защиты веб-сайта от основных типов атак",
      category: "security",
      icon: <Shield className="w-8 h-8 text-green-400" />,
      features: ["Защита от DDoS", "Настройка WAF", "Защита от инъекций", "Мониторинг безопасности 1 месяц"]
    },
  ];

  // Фильтрация услуг по категории
  const filteredPrices = selectedCategory === 'all' 
    ? priceList 
    : priceList.filter(item => item.category === selectedCategory);

  // Анимационные варианты
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  // Эффект для создания анимации частиц
  const [particles, setParticles] = useState<{id: number, x: number, y: number, size: number, color: string}[]>([]);
  
  const createParticles = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const newParticles = [];
    const colors = ['#9333EA', '#D946EF', '#F97316', '#0EA5E9', '#F43F5E'];
    
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setParticles(newParticles);
    
    setTimeout(() => {
      setParticles([]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
      {/* Эффект частиц */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ 
            opacity: 0, 
            scale: 2,
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            rotate: Math.random() * 360
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute rounded-full z-10"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color
          }}
        />
      ))}
      
      {/* Навигация */}
      <Link to="/" className="fixed top-4 left-4 text-white/60 hover:text-white transition-colors z-50 flex items-center gap-2 group">
        <motion.div
          whileHover={{ x: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ArrowLeft className="h-4 w-4 group-hover:text-purple-400" />
        </motion.div>
        <span className="group-hover:text-purple-400 transition-colors">{t('back')}</span>
      </Link>

      <div className="max-w-6xl mx-auto space-y-16 pt-16">
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
          >
            Прайс-лист
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Выберите услугу, которая соответствует вашим потребностям. Все цены указаны в рублях. 
            Для индивидуальных проектов и специальных требований свяжитесь со мной для получения персонального предложения.
          </motion.p>
        </motion.div>

        {/* Фильтр категорий */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 backdrop-blur-md rounded-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  createParticles(event as React.MouseEvent<HTMLElement>);
                }}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${selectedCategory === category.id 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Список услуг */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPrices.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="relative group"
              onMouseEnter={() => setHoveredPrice(item.id)}
              onMouseLeave={() => setHoveredPrice(null)}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
              <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  {item.icon}
                  <div>
                    <h3 className="text-xl font-bold text-white/90">{item.title}</h3>
                    <div className="mt-1 text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      {item.price} ₽
                    </div>
                  </div>
                </div>
                
                <p className="text-white/70 mb-4">{item.description}</p>
                
                <div className="mt-auto">
                  <h4 className="text-sm font-semibold text-white/80 mb-2">Включено:</h4>
                  <ul className="space-y-1">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                        <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {hoveredPrice === item.id && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm space-y-1 border-t border-white/10 pt-3"
                    >
                      <p className="text-green-400">{formatCurrency(item.price * USD_RATE, 'USD')}</p>
                      <p className="text-blue-400">{formatCurrency(item.price * EUR_RATE, 'EUR')}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Секция индивидуальных проектов */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative group mt-16 max-w-4xl mx-auto"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
          <div className="relative bg-black/80 backdrop-blur-sm p-8 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  Индивидуальные проекты
                </h3>
                <p className="text-white/70 max-w-xl">
                  Нужно что-то особенное? Я готов обсудить ваш уникальный проект и предложить индивидуальное решение, 
                  которое полностью соответствует вашим требованиям и бюджету.
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:contact@baneronetwo.com"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/20"
              >
                Связаться со мной
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Секция поддержки */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative group mt-16 max-w-4xl mx-auto"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
          <div className="relative bg-black/80 backdrop-blur-sm p-8 rounded-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                  Поддержите мою работу
                </h3>
                <p className="text-white/70 max-w-xl">
                  Ваша поддержка помогает мне продолжать создавать качественный контент и разрабатывать новые проекты. 
                  Каждое пожертвование имеет значение и мотивирует меня делать больше для сообщества!
                </p>
              </div>
              <div className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://ko-fi.com/baneronetwo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-purple-500/30 transition-all duration-300"
                >
                  <Heart className="w-5 h-5 text-pink-400" />
                  <span>Ko-fi</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://youtube.com/@baneronetwo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 transition-all duration-300"
                >
                  <Youtube className="w-5 h-5 text-red-400" />
                  <span>YouTube</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PriceList;