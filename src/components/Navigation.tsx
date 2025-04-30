
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export const Navigation = () => {
  const { t } = useLanguage();

  return (
    <div className="flex justify-center space-x-4 mb-8">
      <Link to="/">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {t('home')}
        </NavigationMenuLink>
      </Link>
      <Link to="/about">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {t('about')}
        </NavigationMenuLink>
      </Link>
      <Link to="/projects">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {t('projects')}
        </NavigationMenuLink>
      </Link>
      <Link to="/posts">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {t('posts')}
        </NavigationMenuLink>
      </Link>
      <Link to="/blog">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {t('blog')}
        </NavigationMenuLink>
      </Link>
    </div>
  );
};
