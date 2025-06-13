
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../lib/i18n';
import { Shield, Code, Cpu } from 'lucide-react';
import TerminalWindow from './TerminalWindow';

const AboutPage = () => {
  const { language } = useLanguage();

  const skills = [
    {
      category: getTranslation(language, 'about.skills.security'),
      icon: Shield,
      color: 'text-neon-green',
      items: ['Penetration Testing', 'Vulnerability Assessment', 'Incident Response', 'Security Auditing']
    },
    {
      category: getTranslation(language, 'about.skills.development'),
      icon: Code,
      color: 'text-neon-purple',
      items: ['React/TypeScript', 'Node.js/Python', 'PostgreSQL/Redis', 'Docker/Kubernetes']
    },
    {
      category: getTranslation(language, 'about.skills.hardware'),
      icon: Cpu,
      color: 'text-neon-orange',
      items: ['Hardware Hacking', 'IoT Security', 'Electronics Design', 'Reverse Engineering']
    }
  ];

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <TerminalWindow title="ABOUT_ME.TXT" id="about_header">
          <div className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="font-mono text-sm md:text-base text-neon-blue">
                $ cat personal_info.txt
              </div>
              <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-neon-green neon-glow">
                {getTranslation(language, 'about.title')}
              </h1>
              <div className="text-lg md:text-xl text-neon-purple font-mono">
                {getTranslation(language, 'about.subtitle')}
              </div>
              <div className="font-mono text-sm md:text-base text-neon-green space-y-2">
                <div>
                  <span className="text-neon-blue">$</span> {getTranslation(language, 'about.description')}
                </div>
              </div>
            </div>
          </div>
        </TerminalWindow>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <TerminalWindow 
              key={skill.category} 
              title={`${skill.category.toUpperCase()}.EXE`}
              id={`skill_${index}`}
            >
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <skill.icon className={skill.color} size={24} />
                  <h3 className={`text-lg md:text-xl font-orbitron font-bold ${skill.color}`}>
                    {skill.category}
                  </h3>
                </div>
                <div className="font-mono text-xs md:text-sm space-y-2 text-neon-blue">
                  {skill.items.map((item, idx) => (
                    <div key={idx}>• {item}</div>
                  ))}
                </div>
              </div>
            </TerminalWindow>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
