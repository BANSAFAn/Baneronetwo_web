
import { MessageCircle, Github, Youtube, Twitter, GamepadIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Функция для создания частиц при клике
const createParticles = (event: React.MouseEvent, color: string) => {
  const numParticles = 10;
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = `${event.clientX}px`;
  container.style.top = `${event.clientY}px`;
  container.style.pointerEvents = 'none';
  container.style.zIndex = '100';
  
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    
    const angle = (Math.random() * Math.PI * 2);
    const velocity = 2 + Math.random() * 3;
    const tx = Math.cos(angle) * 100;
    const ty = Math.sin(angle) * 100;
    
    particle.style.transform = 'translate(-50%, -50%)';
    particle.animate([
      { 
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 1 
      },
      { 
        transform: `translate(${tx}px, ${ty}px) scale(0)`,
        opacity: 0 
      }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });
    
    container.appendChild(particle);
  }
  
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 1000);
};

// Функция для создания потока частиц
const createParticleStream = (event: React.MouseEvent, color: string, icon: string) => {
  const numParticles = 15;
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '100';
  
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.left = `${event.clientX}px`;
    particle.style.top = `${event.clientY}px`;
    particle.style.color = color;
    particle.style.fontSize = `${12 + Math.random() * 16}px`;
    particle.textContent = icon;
    particle.style.opacity = '1';
    particle.style.textShadow = `0 0 5px ${color}`;
    
    const angle = (Math.random() * Math.PI * 2);
    const distance = 50 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.animate([
      { 
        transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
        opacity: 1 
      },
      { 
        transform: `translate(${tx}px, ${ty}px) scale(0.5) rotate(${Math.random() * 360}deg)`,
        opacity: 0 
      }
    ], {
      duration: 1500,
      delay: i * 50,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });
    
    container.appendChild(particle);
  }
  
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 2000);
};

export const SocialLinks = () => {
  const isMobile = useIsMobile();

  const socials = [
    { 
      icon: MessageCircle,
      emoji: '💬',
      color: '#5865F2',
      href: 'https://rebrand.ly/liveone',
      glowColor: 'rgba(88, 101, 242, 0.6)',
      animation: 'animate-bounce',
      label: 'Discord'
    },
    { 
      icon: Github,
      emoji: '🐙',
      color: '#fff',
      href: 'https://github.com/BANSAFAn',
      glowColor: 'rgba(255, 255, 255, 0.6)',
      animation: 'animate-spin',
      label: 'GitHub'
    },
    { 
      icon: Youtube,
      emoji: '📹',
      color: '#FF0000',
      href: 'https://www.youtube.com/@Baneronetwo',
      glowColor: 'rgba(255, 0, 0, 0.6)',
      animation: 'animate-pulse',
      label: 'YouTube'
    },
    { 
      icon: Twitter,
      emoji: '🐦',
      color: '#1DA1F2',
      href: 'https://x.com/BanLive1',
      glowColor: 'rgba(29, 161, 242, 0.6)',
      animation: 'animate-ping',
      label: 'Twitter'
    },
    { 
      icon: GamepadIcon,
      emoji: '🎮',
      color: '#00adee',
      href: 'https://steamcommunity.com/id/baneronetwo/',
      glowColor: 'rgba(0, 173, 238, 0.6)',
      animation: 'animate-bounce',
      label: 'Steam'
    },
    { 
      icon: MessageCircle,
      emoji: '✈️',
      color: '#0088cc',
      href: 'https://t.me/banliveone',
      glowColor: 'rgba(0, 136, 204, 0.6)',
      animation: 'animate-pulse',
      label: 'Telegram'
    },
  ];

  return (
    <div className={`flex gap-6 ${isMobile ? 'flex-wrap justify-center' : 'justify-center'} mt-8 px-4`}>
      {socials.map((social, index) => {
        const Icon = social.icon;
        return (
          <a
            key={index}
            href={social.href}
            className="relative group"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              createParticles(e, social.color);
              createParticleStream(e, social.color, social.emoji);
              
              // Имитация задержки перед переходом по ссылке для показа анимации
              setTimeout(() => {
                window.open(social.href, '_blank');
              }, 300);
            }}
            aria-label={social.label}
          >
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ 
                backgroundColor: social.glowColor,
                transform: 'scale(1.5)'
              }}
            />
            <div className="relative p-3 bg-black/30 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300 hover:scale-110">
              <Icon
                className={`w-6 h-6 transition-all duration-500 hover:scale-110 group-hover:${social.animation}`}
                style={{ color: social.color }}
              />
              
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {social.label}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};
