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
  const cardHeight = isMobile ? '400px' : '540px';
  
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
            name={t('developer_name') || 'Baneronetwo'}
            title={t('developer_title') || 'Software Engineer'}
            handle="baneronetwo"
            status={t('status_online') || 'Online'}
            contactText={t('contact_me') || 'Contact'}
            showUserInfo={true}
            enableTilt={!isMobile} // Отключаем эффект наклона на мобильных устройствах
            className="w-full max-w-md mx-auto"
            onContactClick={() => window.open('https://github.com/baneronetwo', '_blank')}
          />
        </div>
      </Suspense>
    </div>
  );
};

export default ProfileCardComponent;