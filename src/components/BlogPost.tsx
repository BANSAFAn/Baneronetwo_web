import { useState, useEffect } from 'react';
import { ArrowLeft, Share, MessageCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../lib/i18n';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

const BlogPost = ({ slug, onBack }: BlogPostProps) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { language } = useLanguage();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/blog/${slug}.md`);
        if (!response.ok) throw new Error('Post not found');
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError('Failed to load post');
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const renderMarkdown = (markdown: string) => {
    return markdown
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-neon-blue mb-4">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-neon-green mb-4">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-neon-orange mb-6">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-neon-green">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-neon-purple">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-cyber-darker text-neon-orange px-2 py-1 rounded text-sm">$1</code>')
      .replace(/::tip\s*([\s\S]*?):::/g, '<div class="border-l-4 border-neon-green bg-cyber-darker p-4 my-4"><div class="text-neon-green font-bold mb-2">💡 TIP</div><div>$1</div></div>')
      .replace(/::warning\s*([\s\S]*?):::/g, '<div class="border-l-4 border-neon-orange bg-cyber-darker p-4 my-4"><div class="text-neon-orange font-bold mb-2">⚠️ WARNING</div><div>$1</div></div>')
      .replace(/::info\s*([\s\S]*?):::/g, '<div class="border-l-4 border-neon-blue bg-cyber-darker p-4 my-4"><div class="text-neon-blue font-bold mb-2">ℹ️ INFO</div><div>$1</div></div>')
      .replace(/\n/g, '<br>');
  };

  const sharePost = (platform: 'twitter' | 'telegram' | 'facebook') => {
    const url = window.location.href;
    const title = slug.replace(/-/g, ' ');
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="terminal-window">
          <div className="p-6 text-center">
            <div className="text-neon-green font-mono animate-pulse">
              {getTranslation(language, 'blog.loading')}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="terminal-window">
          <div className="p-6 text-center">
            <div className="text-neon-orange font-mono">{error}</div>
            <button onClick={onBack} className="nav-link mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {getTranslation(language, 'blog.backToBlog')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="nav-link text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {getTranslation(language, 'blog.backToBlog')}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => sharePost('twitter')}
              className="nav-link text-xs hover:bg-neon-blue hover:text-cyber-dark transition-colors"
              title={`${getTranslation(language, 'blog.shareOn')} X`}
            >
              <Share className="w-4 h-4 mr-1" />
              X
            </button>
            <button
              onClick={() => sharePost('telegram')}
              className="nav-link text-xs hover:bg-neon-blue hover:text-cyber-dark transition-colors"
              title={`${getTranslation(language, 'blog.shareOn')} Telegram`}
            >
              <Share className="w-4 h-4 mr-1" />
              TG
            </button>
            <button
              onClick={() => sharePost('facebook')}
              className="nav-link text-xs hover:bg-neon-blue hover:text-cyber-dark transition-colors"
              title={`${getTranslation(language, 'blog.shareOn')} Facebook`}
            >
              <Share className="w-4 h-4 mr-1" />
              FB
            </button>
          </div>
        </div>

        {/* Content */}
        <article className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-button bg-red-500"></div>
            <div className="terminal-button bg-yellow-500"></div>
            <div className="terminal-button bg-green-500"></div>
            <span className="text-neon-green ml-4 font-orbitron text-sm">{slug.toUpperCase()}.MD</span>
          </div>
          
          <div className="p-6 prose prose-invert max-w-none">
            <div 
              className="text-neon-green font-mono leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
