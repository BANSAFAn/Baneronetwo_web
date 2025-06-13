
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../lib/i18n';

const BlogHeader = () => {
  const { language } = useLanguage();

  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl lg:text-6xl font-orbitron font-bold text-neon-green neon-glow mb-4">
        {getTranslation(language, 'blog.title')}
      </h1>
      <div className="w-32 h-0.5 bg-neon-green mx-auto animate-pulse-neon"></div>
    </div>
  );
};

export default BlogHeader;
