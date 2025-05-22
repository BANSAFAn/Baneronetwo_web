import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, Users, Cloud, Code, Youtube, MessageCircle, DollarSign, Briefcase, Laptop, Heart, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const About = () => {
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('skills');
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

  // Языки программирования
  const programmingLanguages = [
    { value: 'C++', logo: '/src/assets/logos/cpp-logo.svg', color: '#9b87f5' },
    { value: 'C#', logo: '/src/assets/logos/csharp-logo.svg', color: '#7E69AB' },
    { value: 'C', logo: '/src/assets/logos/c-logo.svg', color: '#6E59A5' },
    { value: 'Rust', logo: 'https://rustacean.net/assets/rustacean-flat-happy.svg', color: '#F97316' },
    { value: 'Swift', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg', color: '#D946EF' },
    { value: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#0EA5E9' },
    { value: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#1EAEDB' },
    { value: 'Vue', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: '#33C3F0' },
    { value: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#E5DEFF' },
    { value: 'Lua', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg', color: '#FFDEE2' },
    { value: 'Go', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', color: '#FDE1D3' }
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
  const priceList = [
    {
      title: t('web_development'),
      price: 1500,
      description: t('web_development_desc'),
      icon: <Laptop className="w-8 h-8 text-blue-400" />
    },
    {
      title: t('localization'),
      price: 500,
      description: t('localization_desc'),
      icon: <Globe className="w-8 h-8 text-purple-400" />
    },
    {
      title: t('youtube_promotion'),
      price: 600,
      description: t('youtube_promotion_desc'),
      icon: <Youtube className="w-8 h-8 text-red-400" />
    },
    {
      title: t('community_moderation'),
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
    { name: "Веб-разработка", level: 90, color: "#0EA5E9" },
    { name: "Кибербезопасность", level: 85, color: "#8B5CF6" },
    { name: "Локализация", level: 95, color: "#D946EF" },
    { name: "Управление сообществом", level: 80, color: "#F97316" },
    { name: "Разработка игр", level: 75, color: "#10B981" },
  ];

  // Услуги
  const services = [
    {
      title: "Кибербезопасность",
      description: "Защита систем и данных от угроз, аудит безопасности, консультации по лучшим практикам защиты информации.",
      icon: <Shield className="w-10 h-10 text-[#8B5CF6]" />,
      gradient: "from-[#8B5CF6] via-[#D946EF] to-[#F97316]"
    },
    {
      title: "Локализация",
      description: "Профессиональный перевод и адаптация веб-сайтов, приложений и игр для различных языков и культур.",
      icon: <Globe className="w-10 h-10 text-[#0EA5E9]" />,
      gradient: "from-[#0EA5E9] via-[#8B5CF6] to-[#D946EF]"
    },
    {
      title: "Управление сообществом",
      description: "Модерация и развитие онлайн-сообществ на различных платформах, включая Discord, Reddit и YouTube.",
      icon: <Users className="w-10 h-10 text-[#F97316]" />,
      gradient: "from-[#F97316] via-[#D946EF] to-[#0EA5E9]"
    },
    {
      title: "Веб-разработка",
      description: "Создание современных, отзывчивых веб-сайтов и приложений с использованием передовых технологий и фреймворков.",
      icon: <Laptop className="w-10 h-10 text-[#10B981]" />,
      gradient: "from-[#10B981] via-[#0EA5E9] to-[#8B5CF6]"
    }
  ];

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
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
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

      <div className="max-w-5xl mx-auto space-y-20 pt-16">
        {/* Герой-секция */}
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
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
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
            <div className="relative bg-black/80 backdrop-blur-sm p-6 md:p-8 rounded-xl">
              <p className="text-lg md:text-xl leading-relaxed">
                Привет! Я опытный разработчик и создатель контента, специализирующийся на веб-разработке, кибербезопасности и локализации. Моя страсть — создавать инновационные цифровые решения и делиться знаниями с сообществом. Я активно участвую в различных технологических проектах и управляю несколькими онлайн-сообществами.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Табы для переключения между секциями */}
        <div className="flex flex-col items-center space-y-12">
          <div className="flex justify-center space-x-2 p-1 bg-white/5 backdrop-blur-md rounded-lg">
            {['skills', 'services', 'prices'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  createParticles(event as React.MouseEvent<HTMLElement>);
                }}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === tab 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                {tab === 'skills' && 'Навыки'}
                {tab === 'services' && 'Услуги'}
                {tab === 'prices' && 'Прайс-лист'}
              </button>
            ))}
          </div>

          {/* Секция навыков */}
          {activeTab === 'skills' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="w-full space-y-12"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
              >
                Мои навыки
              </motion.h2>
              
              {/* Языки программирования */}
              <motion.div variants={itemVariants} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#D946EF] rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
                <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-6 text-center">Языки программирования</h3>
                  <div className="flex flex-wrap justify-center gap-6 py-4">
                    {programmingLanguages.map((lang) => (
                      <motion.div
                        key={lang.value}
                        whileHover={{ scale: 1.1 }}
                        className="flex flex-col items-center"
                        onMouseEnter={() => setHoveredSkill(lang.value)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <motion.div 
                          className="w-16 h-16 flex items-center justify-center mb-2 transition-all duration-300"
                          style={{
                            filter: hoveredSkill === lang.value 
                              ? `drop-shadow(0 0 12px ${lang.color})` 
                              : 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))'
                          }}
                          whileHover={logoAnimations.hover(lang.color)}
                          whileTap={logoAnimations.tap}
                        >
                          <img 
                            src={lang.logo} 
                            alt={lang.value}
                            className="w-12 h-12 object-contain"
                          />
                        </motion.div>
                        <span className="text-sm font-medium">{lang.value}</span>
                        <span className="text-xs text-white/60">{t('projects_count').replace('{count}', lang.count.toString())}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Шкалы навыков */}
              <motion.div variants={itemVariants} className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-white/60">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.7, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Секция услуг */}
          {activeTab === 'services' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="w-full space-y-12"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                Мои услуги
              </motion.h2>
              
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {services.map((service, index) => (
                  <motion.div 
                    key={service.title}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]`}></div>
                    <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl h-full">
                      {service.icon}
                      <h3 className={`text-xl font-bold my-3 bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.title}
                      </h3>
                      <p className="text-white/70">
                        {service.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Секция прайс-листа */}
          {activeTab === 'prices' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="w-full space-y-12"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-center bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"
              >
                Прайс-лист
              </motion.h2>
              
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {priceList.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="relative group"
                    onMouseEnter={() => setHoveredPrice(index)}
                    onMouseLeave={() => setHoveredPrice(null)}
                    onClick={createParticles}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
                    <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl">
                      <div className="flex items-start gap-4">
                        {item.icon}
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white/90">{item.title}</h3>
                            <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                              {formatCurrency(item.price, 'UAH')}
                            </span>
                          </div>
                          <p className="text-white/70">{item.description}</p>
                          {hoveredPrice === index && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-4 text-sm space-y-1"
                            >
                              <p className="text-green-400">{formatCurrency(item.price * USD_RATE, 'USD')}</p>
                              <p className="text-blue-400">{formatCurrency(item.price * EUR_RATE, 'EUR')}</p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Секция поддержки */}
              <motion.div 
                variants={itemVariants}
                className="relative group mt-12"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-500 animate-gradient bg-[length:200%_auto]"></div>
                <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        Поддержите мою работу
                      </h3>
                      <p className="text-white/70 max-w-md">
                        Ваша поддержка помогает мне продолжать создавать качественный контент и разрабатывать новые проекты. Каждое пожертвование имеет значение!
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
