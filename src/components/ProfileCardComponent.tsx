import React, { Suspense } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Импортируем ProfileCard из установленной библиотеки
const ProfileCard = React.lazy(() => import('../../CP/ProfileCard/ProfileCard'));

interface ProfileCardComponentProps {
  transparent?: boolean;
}

const ProfileCardComponent: React.FC<ProfileCardComponentProps> = ({ transparent = false }) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  
  // Адаптивные настройки для мобильных устройств
  const cardHeight = isMobile ? '450px' : '600px';
  
  return (
    <div 
      className={`w-full relative ${transparent ? 'bg-transparent' : 'bg-black/30 backdrop-blur-md'}`}
      style={{ height: cardHeight }}
    >
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
        <div className="w-full h-full flex items-center justify-center">
          <ProfileCard
            avatarUrl="/avatar.svg"
            iconUrl="/icon.svg"
            grainUrl="/grain.svg"
            name="Baneronetwo"
            title="Meow"
            handle="baneronetwo"
            status={t('Hmmmmm') || 'Online'}
            contactText={t('contact_me') || 'Visit Website'}
            showUserInfo={true}
            enableTilt={!isMobile} // Отключаем эффект наклона на мобильных устройствах
            className="w-full max-w-md mx-auto"
            onContactClick={() => window.open('https://baneronetwo.vercel.app', '_blank')}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ProfileCardComponent;