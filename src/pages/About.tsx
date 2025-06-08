import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, Users, Cloud, Code, Youtube, MessageCircle, DollarSign, Briefcase, Laptop, Heart, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const About = () => {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  // Инициализируем активную вкладку с явным значением по умолчанию
  const [activeTab, setActiveTab] = useState<string>('skills');
  
  // Добавляем эффект для отслеживания изменений activeTab
  useEffect(() => {
    console.log('Активная вкладка изменена на:', activeTab);
  }, [activeTab]);
  const { t } = useLanguage();
  
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
  
  // Определяем стили для мобильных устройств
  const mobileStyles = {
    cardPadding: "p-3 md:p-4",
    textSize: "text-sm md:text-base",
    headingSize: "text-xl md:text-2xl",
    iconSize: "w-5 h-5 md:w-6 md:h-6",
    gridGap: "gap-2 md:gap-3",
    sectionSpacing: "space-y-6 md:space-y-8",
    buttonPadding: "px-2 py-1 md:px-3 md:py-2",
    imageSize: "w-6 h-6 md:w-8 md:h-8",
    borderRadius: "rounded-lg md:rounded-xl",
    margin: "mb-2 md:mb-4"
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

  // Языки программирования с описаниями
  const programmingLanguages = [
    { 
      name: 'C++', 
      logo: '/src/assets/logos/cpp-logo.svg', 
      color: '#9b87f5',
      level: 90,
      description: t('cpp_description')
    },
    { 
      name: 'C#', 
      logo: '/src/assets/logos/csharp-logo.svg', 
      color: '#7E69AB',
      level: 85,
      description: t('csharp_description')
    },
    { 
      name: 'C', 
      logo: '/src/assets/logos/c-logo.svg', 
      color: '#6E59A5',
      level: 80,
      description: t('c_description')
    },
    { 
      name: 'Rust', 
      logo: 'https://rustacean.net/assets/rustacean-flat-happy.svg', 
      color: '#F97316',
      level: 75,
      description: t('rust_description')
    },
    { 
      name: 'Swift', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', 
      color: '#D946EF',
      level: 70,
      description: t('swift_description')
    },
    { 
      name: 'TypeScript', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 
      color: '#0EA5E9',
      level: 95,
      description: t('typescript_description')
    },
    { 
      name: 'JavaScript', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 
      color: '#1EAEDB',
      level: 95,
      description: t('javascript_description')
    },
    { 
      name: 'Vue', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', 
      color: '#33C3F0',
      level: 85,
      description: t('vue_description')
    },
    { 
      name: 'CSS', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 
      color: '#E5DEFF',
      level: 90,
      description: t('css_description')
    },
    { 
      name: 'Lua', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg', 
      color: '#FFDEE2',
      level: 80,
      description: t('lua_description')
    },
    { 
      name: 'Go', 
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', 
      color: '#FDE1D3',
      level: 65,
      description: t('go_description')
    }
  ];
  
  // Анимации для логотипов языков программирования
  const logoAnimations = {
    hover: (color: string) => ({
      scale: 1.2,
      rotate: 10,
      filter: `drop-shadow(0 0 0.5rem ${color})`,
      transition: { duration: 0.3, type: 'spring' }
    }),
    tap: {
      scale: 0.9,
      rotate: -10,
      transition: { duration: 0.1 }
    }
  };

  // Прайс-лист
  const prices = [
    {
      title: 'web_development',
      price: 1500,
      description: t('web_development_desc'),
      icon: <Laptop className="w-8 h-8 text-blue-400" />
    },
    {
      title: 'localization',
      price: 500,
      description: t('localization_desc'),
      icon: <Globe className="w-8 h-8 text-purple-400" />
    },
    {
      title: 'youtube_promotion',
      price: 600,
      description: t('youtube_promotion_desc'),
      icon: <Youtube className="w-8 h-8 text-red-400" />
    },
    {
      title: 'community_moderation',
      price: 500,
      description: t('community_moderation_desc'),
      icon: <Users className="w-8 h-8 text-orange-400" />
    }
  ];

  // Константы для конвертации валют
  const USD_RATE = 0.026;
  const EUR_RATE = 0.024;

  // Форматирование валюты (гривны)
  const formatCurrency = (amount: number, currency: string) => {
    if (currency === 'UAH') {
      return new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH'
      }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Навыки
  const skills = [
    { name: 'web_dev_service', level: 90, color: "#0EA5E9", icon: <Code className="w-6 h-6" /> },
    { name: 'cybersecurity', level: 85, color: "#8B5CF6", icon: <Shield className="w-6 h-6" /> },
    { name: 'localization_service', level: 95, color: "#D946EF", icon: <Globe className="w-6 h-6" /> },
    { name: 'community_management', level: 80, color: "#F97316", icon: <Users className="w-6 h-6" /> },
    { name: 'cloud_services', level: 75, color: "#10B981", icon: <Cloud className="w-6 h-6" /> },
  ];

  // Услуги
  const services = [
    {
      name: 'web_development',
      icon: <Code className="w-8 h-8 text-blue-400" />,
      description: t('web_development_desc')
    },
    {
      name: 'localization',
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      description: t('localization_desc')
    },
    {
      name: 'community_management',
      icon: <Users className="w-8 h-8 text-green-400" />,
      description: t('community_moderation_desc')
    },
    {
      name: 'content_creation',
      icon: <Youtube className="w-8 h-8 text-red-400" />,
      description: t('youtube_promotion_desc')
    }
  ];

  // Функция для создания эффекта частиц
  const createParticleEffect = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const particles = [];
    const colors = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];
    
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 5 + 2;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 3 + 1;
      const tx = Math.cos(angle) * velocity * 20;
      const ty = Math.sin(angle) * velocity * 20;
      
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none animate-float';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      
      document.body.appendChild(particle);
      particles.push(particle);
    }
    
    setTimeout(() => {
      particles.forEach(p => p.remove());
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black dark:bg-gray-950 text-white dark:text-gray-100 relative overflow-hidden">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      
      <div className="fixed top-4 left-4 z-50">
        <Link to="/" className="flex items-center space-x-2 text-white dark:text-gray-200 hover:text-purple-400 dark:hover:text-purple-300 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>{t('back')}</span>
        </Link>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-6"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
          >
            {t('about_me_title')}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative group max-w-3xl mx-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient bg-[length:200%_auto]"></div>
            <div className="relative bg-black/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 md:p-6 rounded-xl">
              <p className="text-lg md:text-xl leading-relaxed">
                {t('about_greeting')}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Табы для переключения между секциями */}
        <div className="flex flex-col items-center space-y-12 mt-12">
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 p-1 bg-white/5 dark:bg-white/10 backdrop-blur-md rounded-lg">
            {['skills', 'services', 'prices'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${mobileStyles.buttonPadding} rounded-md transition-all duration-300 ${activeTab === tab 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white dark:text-white shadow-lg shadow-purple-600/20' 
                  : 'text-white/70 dark:text-gray-300/70 hover:text-white dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/20'} min-w-[60px] md:min-w-[80px] text-center ${mobileStyles.textSize} relative overflow-hidden`}
              >
                {activeTab === tab && (
                  <motion.div 
                    layoutId="tabHighlight"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-md"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {t(tab)}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Секция навыков */}
          {activeTab === 'skills' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${mobileStyles.gridGap} w-full max-w-4xl mx-auto ${mobileStyles.sectionSpacing}`}
            >
              {/* Карточки языков программирования */}
              {programmingLanguages.map((lang, index) => (
                <motion.div
                  key={lang.name}
                  variants={itemVariants}
                  custom={index}
                  className={`${mobileStyles.cardPadding} bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-300 relative overflow-hidden group`}
                  onMouseEnter={() => setHoveredSkill(lang.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={lang.logo} 
                        alt={lang.name} 
                        className={`${mobileStyles.imageSize} object-contain transition-all duration-300 group-hover:scale-110`} 
                      />
                      <h3 className={`${mobileStyles.headingSize} font-bold text-white dark:text-gray-100`}>{lang.name}</h3>
                    </div>
                    <div className="w-24 bg-gray-700 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                  
                  {/* Описание языка программирования */}
                  {hoveredSkill === lang.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`mt-3 ${mobileStyles.textSize} text-white/80 dark:text-gray-300/80`}
                    >
                      {lang.description}
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Карточки навыков */}
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  custom={index + programmingLanguages.length}
                  className={`${mobileStyles.cardPadding} bg-white/5 dark:bg-white/10 backdrop-blur-sm ${mobileStyles.borderRadius} hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-300`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${mobileStyles.iconSize} text-white dark:text-gray-200`}>{skill.icon}</div>
                    <h3 className={`${mobileStyles.headingSize} font-bold text-white dark:text-gray-100`}>{t(skill.name)}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Секция услуг */}
          {activeTab === 'services' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className={`grid grid-cols-1 sm:grid-cols-2 ${mobileStyles.gridGap} w-full max-w-4xl mx-auto ${mobileStyles.sectionSpacing}`}
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  variants={itemVariants}
                  custom={index}
                  className={`${mobileStyles.cardPadding} bg-white/5 dark:bg-white/10 backdrop-blur-sm ${mobileStyles.borderRadius} hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-300 border border-white/10 dark:border-white/20`}
                >
                  <div className="flex items-center space-x-3 ${mobileStyles.margin}">
                    <div className={`${mobileStyles.iconSize} text-white dark:text-gray-200`}>{service.icon}</div>
                    <h3 className={`${mobileStyles.headingSize} font-bold text-white dark:text-gray-100`}>{t(service.name)}</h3>
                  </div>
                  <p className={`mt-2 ${mobileStyles.textSize} text-white/80 dark:text-gray-300/80`}>{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Секция прайс-листа */}
          {activeTab === 'prices' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${mobileStyles.gridGap} w-full max-w-4xl mx-auto ${mobileStyles.sectionSpacing}`}
            >
              {prices.map((price, index) => (
                <motion.div
                  key={price.title}
                  variants={itemVariants}
                  custom={index}
                  className={`${mobileStyles.cardPadding} bg-white/5 dark:bg-white/10 backdrop-blur-sm ${mobileStyles.borderRadius} hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-300 border border-white/10 dark:border-white/20 relative overflow-hidden`}
                  onMouseEnter={() => setHoveredPrice(index)}
                  onMouseLeave={() => setHoveredPrice(null)}
                >
                  <div className="flex items-center space-x-3 ${mobileStyles.margin}">
                    <div className={`${mobileStyles.iconSize} text-white dark:text-gray-200`}>{price.icon}</div>
                    <h3 className={`${mobileStyles.headingSize} font-bold text-white dark:text-gray-100`}>{t(price.title)}</h3>
                  </div>
                  
                  <div className={`${mobileStyles.margin} flex items-baseline`}>
                    <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                      {formatCurrency(price.price, 'USD')}
                    </span>
                    <span className={`${mobileStyles.textSize} text-white/60 dark:text-gray-300/60 ml-2`}>USD</span>
                  </div>
                  
                  <p className={`${mobileStyles.textSize} text-white/80 dark:text-gray-300/80 ${mobileStyles.margin}`}>
                    {price.description}
                  </p>
                  
                  {/* Дополнительная информация при наведении */}
                  {hoveredPrice === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <span className={`${mobileStyles.textSize} text-white/60 dark:text-gray-300/60`}>EUR:</span>
                        <span className={`${mobileStyles.textSize} font-medium text-white dark:text-gray-200`}>
                          {formatCurrency(price.price * EUR_RATE, 'EUR')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`${mobileStyles.textSize} text-white/60 dark:text-gray-300/60`}>UAH:</span>
                        <span className={`${mobileStyles.textSize} font-medium text-white dark:text-gray-200`}>
                          {formatCurrency(price.price / USD_RATE, 'UAH')}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Секция поддержки */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            {t('support_work')}
          </h2>
          <p className="text-white/70 dark:text-gray-300/70 max-w-2xl mx-auto mb-8">
            {t('support_description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://ko-fi.com/baneronetwo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 py-2 px-4 bg-[#FF5E5B]/20 dark:bg-[#FF5E5B]/10 rounded-lg hover:bg-[#FF5E5B]/30 dark:hover:bg-[#FF5E5B]/20 transition-all duration-300 border border-[#FF5E5B]/30 dark:border-[#FF5E5B]/20"
              onMouseEnter={createParticleEffect}
            >
              <Heart className="w-5 h-5 text-[#FF5E5B]" />
              <span>Ko-fi</span>
            </a>
            <a 
              href="https://www.youtube.com/@baneronetwo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 py-2 px-4 bg-[#FF0000]/20 dark:bg-[#FF0000]/10 rounded-lg hover:bg-[#FF0000]/30 dark:hover:bg-[#FF0000]/20 transition-all duration-300 border border-[#FF0000]/30 dark:border-[#FF0000]/20"
              onMouseEnter={createParticleEffect}
            >
              <Youtube className="w-5 h-5 text-[#FF0000]" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
