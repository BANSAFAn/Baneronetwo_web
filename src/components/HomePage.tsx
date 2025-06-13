
import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../lib/i18n';
import { Github, Mail, Shield, Code, Terminal, Cpu, Youtube } from 'lucide-react';
import TerminalWindow from './TerminalWindow';

const HomePage = () => {
  const { language } = useLanguage();

  const socialLinks = [
    { icon: Github, url: 'https://github.com/BANSAFAn', label: 'GitHub' },
    { icon: Youtube, url: 'https://www.youtube.com/@Baneronetwo', label: 'YouTube' },
    { icon: Mail, url: 'mailto:contact@baneronetwo.dev', label: 'Email' },
  ];

  const additionalLinks = [
    { name: 'Discord', url: 'https://rebrand.ly/liveone', icon: '🎮' },
    { name: 'Steam', url: 'https://steamcommunity.com/id/baneronetwo/', icon: '🎮' },
    { name: 'Telegram', url: 'https://t.me/banliveone', icon: '💬' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      {/* Hero Section */}
      <TerminalWindow title="BANNER.EXE" className="max-w-6xl mx-auto">
        <div className="p-6 md:p-8">
          <div className="space-y-4">
            <div className="font-mono text-sm md:text-base text-neon-blue">
              $ ./initialize_hacker.sh
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-6xl font-orbitron font-bold text-neon-green neon-glow animate-slide-up">
                BANERONETWO
              </h1>
              <div className="text-lg md:text-2xl text-neon-purple font-mono animate-slide-up" style={{animationDelay: '0.2s'}}>
                {getTranslation(language, 'hero.title')}
              </div>
            </div>
            
            <div className="font-mono text-sm md:text-base text-neon-green space-y-1 animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div>
                <span className="text-neon-blue">$</span> {getTranslation(language, 'hero.description')}
              </div>
              <div className="text-neon-orange">
                <span className="text-neon-blue">$</span> {getTranslation(language, 'hero.expertise')}
              </div>
            </div>
          </div>
        </div>
      </TerminalWindow>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <TerminalWindow title="CYBERSEC.SYS" className="project-card">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-neon-green" size={24} />
              <h3 className="text-lg md:text-xl font-orbitron font-bold text-neon-green">
                {getTranslation(language, 'skills.cybersecurity')}
              </h3>
            </div>
            <div className="font-mono text-xs md:text-sm space-y-2 text-neon-blue">
              <div>• Penetration Testing</div>
              <div>• Vulnerability Assessment</div>
              <div>• Security Auditing</div>
              <div>• Incident Response</div>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="FULLSTACK.APP" className="project-card">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code className="text-neon-purple" size={24} />
              <h3 className="text-lg md:text-xl font-orbitron font-bold text-neon-purple">
                {getTranslation(language, 'skills.development')}
              </h3>
            </div>
            <div className="font-mono text-xs md:text-sm space-y-2 text-neon-blue">
              <div>• React • TypeScript</div>
              <div>• Node.js • Python</div>
              <div>• PostgreSQL • Redis</div>
              <div>• Docker • Kubernetes</div>
            </div>
          </div>
        </TerminalWindow>

        <TerminalWindow title="HARDWARE.BIN" className="project-card">
          <div className="p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-neon-orange" size={24} />
              <h3 className="text-lg md:text-xl font-orbitron font-bold text-neon-orange">
                {getTranslation(language, 'skills.hardware')}
              </h3>
            </div>
            <div className="font-mono text-xs md:text-sm space-y-2 text-neon-blue">
              <div>• Hardware Hacking</div>
              <div>• IoT Security</div>
              <div>• Electronics Design</div>
              <div>• Reverse Engineering</div>
            </div>
          </div>
        </TerminalWindow>
      </div>

      {/* Contact Section */}
      <TerminalWindow title="CONTACT.TXT" className="max-w-4xl mx-auto">
        <div className="p-4 md:p-6">
          <div className="font-mono text-sm md:text-base space-y-3">
            <div className="text-neon-blue">$ cat contact_info.txt</div>
            <div className="text-neon-green">
              {getTranslation(language, 'contact.title')}
            </div>
            
            {/* Main Social Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
            
            {/* Additional Social Links */}
            <div className="mt-6 space-y-2">
              <div className="text-neon-purple text-sm">$ ls additional_contacts/</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {additionalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neon-blue hover:text-neon-green transition-colors border border-neon-blue hover:border-neon-green rounded px-3 py-2"
                  >
                    <span>{link.icon}</span>
                    <span className="font-mono text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
};

export default HomePage;
