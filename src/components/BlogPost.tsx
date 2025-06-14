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
    // Process code blocks with syntax highlighting first
    markdown = markdown.replace(/```([\s\S]*?)```/g, (match, content) => {
      // Extract language if specified
      const firstLineBreak = content.indexOf('\n');
      let language = '';
      let code = content;
      
      if (firstLineBreak > 0) {
        language = content.substring(0, firstLineBreak).trim();
        code = content.substring(firstLineBreak + 1);
      }
      
      return `<pre class="bg-cyber-darker rounded p-4 my-4 overflow-x-auto"><code class="language-${language || 'text'} text-neon-orange">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
    });

    // Process tables
    markdown = markdown.replace(/\|(.+)\|\s*\n\|\s*[-:\|\s]+\|\s*\n((\|.+\|\s*\n)+)/g, (match) => {
      const rows = match.split('\n').filter(row => row.trim() !== '');
      const headerRow = rows[0];
      const separatorRow = rows[1];
      const bodyRows = rows.slice(2);
      
      const headers = headerRow.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
      
      let tableHtml = '<div class="overflow-x-auto my-4"><table class="w-full border-collapse">';
      
      // Table header
      tableHtml += '<thead><tr>';
      headers.forEach(header => {
        tableHtml += `<th class="border border-neon-blue p-2 text-neon-green">${header}</th>`;
      });
      tableHtml += '</tr></thead>';
      
      // Table body
      tableHtml += '<tbody>';
      bodyRows.forEach(row => {
        const cells = row.split('|').filter(cell => cell.trim() !== '').map(cell => cell.trim());
        tableHtml += '<tr>';
        cells.forEach(cell => {
          tableHtml += `<td class="border border-neon-blue p-2 text-neon-purple">${cell}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table></div>';
      
      return tableHtml;
    });

    // Process horizontal rules
    markdown = markdown.replace(/^---$/gm, '<hr class="border-t border-neon-blue my-6" />');

    // Process headings
    markdown = markdown
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-neon-blue mb-4">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-neon-green mb-4">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-neon-orange mb-6">$1</h1>');

    // Process blockquotes
    markdown = markdown.replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-neon-purple pl-4 py-2 my-4 text-neon-purple italic">$1</blockquote>');

    // Process lists
    markdown = markdown.replace(/^\s*\d+\.\s+(.*)$/gm, '<li class="ml-6 list-decimal text-neon-green mb-2">$1</li>');
    markdown = markdown.replace(/^\s*-\s+(.*)$/gm, '<li class="ml-6 list-disc text-neon-green mb-2">$1</li>');
    
    // Wrap adjacent list items in ul/ol tags
    markdown = markdown.replace(/(<li class="ml-6 list-decimal.*?>.*?<\/li>\s*)+/g, '<ol class="my-4">$&</ol>');
    markdown = markdown.replace(/(<li class="ml-6 list-disc.*?>.*?<\/li>\s*)+/g, '<ul class="my-4">$&</ul>');

    // Process inline elements
    markdown = markdown
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-neon-blue hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded my-4" />')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-neon-green">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-neon-purple">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-cyber-darker text-neon-orange px-2 py-1 rounded text-sm">$1</code>');

    // Process custom containers
    markdown = markdown
      .replace(/::tip\s*([\s\S]*?):::/g, '<div class="border-l-4 border-neon-green bg-cyber-darker p-4 my-4"><div class="text-neon-green font-bold mb-2">💡 TIP</div><div>$1</div></div>')
      .replace(/::warning\s*([\s\S]*?):::/g, '<div class="border-l-4 border-neon-orange bg-cyber-darker p-4 my-4"><div class="text-neon-orange font-bold mb-2">⚠️ WARNING</div><div>$1</div></div>')
      .replace(/::info\s*([\s\S]*?):::/g, '<div class="border-l-4 border-neon-blue bg-cyber-darker p-4 my-4"><div class="text-neon-blue font-bold mb-2">ℹ️ INFO</div><div>$1</div></div>');

    // Process paragraphs (replace double newlines with paragraph tags)
    markdown = markdown.replace(/\n\n/g, '</p><p class="mb-4">');
    
    // Wrap the content in a paragraph if it doesn't start with a block element
    if (!markdown.startsWith('<h1') && 
        !markdown.startsWith('<h2') && 
        !markdown.startsWith('<h3') && 
        !markdown.startsWith('<ul') && 
        !markdown.startsWith('<ol') && 
        !markdown.startsWith('<blockquote') && 
        !markdown.startsWith('<pre') && 
        !markdown.startsWith('<div') && 
        !markdown.startsWith('<p')) {
      markdown = '<p class="mb-4">' + markdown;
    }
    
    // Add closing paragraph tag if needed
    if (!markdown.endsWith('</p>') && 
        !markdown.endsWith('</h1>') && 
        !markdown.endsWith('</h2>') && 
        !markdown.endsWith('</h3>') && 
        !markdown.endsWith('</ul>') && 
        !markdown.endsWith('</ol>') && 
        !markdown.endsWith('</blockquote>') && 
        !markdown.endsWith('</pre>') && 
        !markdown.endsWith('</div>')) {
      markdown += '</p>';
    }

    // Replace remaining newlines with <br> for line breaks within paragraphs
    return markdown.replace(/\n/g, '<br>');
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
