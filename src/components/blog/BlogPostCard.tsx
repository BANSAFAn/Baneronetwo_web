
import { Calendar, Clock, Share, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../lib/i18n';

interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
}

interface BlogPostCardProps {
  post: BlogPostMeta;
  index: number;
  onPostSelect: (slug: string) => void;
}

const BlogPostCard = ({ post, index, onPostSelect }: BlogPostCardProps) => {
  const { language } = useLanguage();

  const getTagColor = (tag: string) => {
    const colors = ['neon-green', 'neon-blue', 'neon-purple', 'neon-orange', 'neon-pink'];
    const index = tag.length % colors.length;
    return colors[index];
  };

  const sharePost = () => {
    const url = `${window.location.origin}/${post.slug}`;
    const title = post.title;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      }).catch(console.error);
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        // Fallback to opening share dialog
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      });
    }
  };

  return (
    <article className="project-card">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
          <div className="space-y-2">
            <h2 
              className="text-lg md:text-xl lg:text-2xl font-orbitron font-bold text-neon-green hover:text-neon-blue transition-colors cursor-pointer"
              onClick={() => onPostSelect(post.slug)}
            >
              {post.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm font-mono">
              <span className="text-neon-purple flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="text-neon-blue flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
          </div>
          <div className="text-neon-orange font-mono text-sm md:text-base">#{index + 1}</div>
        </div>

        <p className="text-neon-purple font-mono text-xs md:text-sm leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded bg-cyber-darker border border-current text-${getTagColor(tag)}`}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
          <button 
            onClick={() => onPostSelect(post.slug)}
            className="nav-link text-xs flex items-center gap-1"
          >
            {getTranslation(language, 'blog.readMore')}
            <ArrowRight className="w-3 h-3" />
          </button>
          <button 
            onClick={sharePost}
            className="nav-link text-xs flex items-center gap-1 hover:bg-neon-blue hover:text-cyber-dark transition-colors"
          >
            <Share className="w-3 h-3" />
            {getTranslation(language, 'blog.share')}
          </button>
        </div>

        <div className="border-t border-neon-green opacity-30 pt-2">
          <div className="font-mono text-xs text-neon-blue">
            $ echo "--- End of post #{index + 1} ---"
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
