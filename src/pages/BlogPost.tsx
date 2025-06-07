
import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Calendar, TagIcon, Table, Code, Copy, Youtube, Image, File, Video, Home } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Table as UITable, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  path: string;
}

interface BlogsData {
  blogs: BlogPost[];
}

// Custom renderers for enhanced Markdown features
const renderers = {
  // Table renderer
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-6 w-full overflow-y-auto">
      <UITable>
        {children}
      </UITable>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <TableHeader>{children}</TableHeader>
  ),
  tbody: ({ children }: { children?: React.ReactNode }) => (
    <TableBody>{children}</TableBody>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => (
    <TableRow>{children}</TableRow>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <TableHead className="font-bold">{children}</TableHead>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <TableCell>{children}</TableCell>
  ),
  
  // Code block renderer with copy button and language display
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'text';
    
    if (inline) {
      return <code className="bg-black/30 px-1 py-0.5 rounded text-sm" {...props}>{children}</code>;
    }
    
    const copyToClipboard = () => {
      navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
    };
    
    return (
      <div className="relative my-6 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-black/50 px-4 py-2 text-xs text-gray-300 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span>{language}</span>
          </div>
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-1 hover:text-white transition-colors"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </button>
        </div>
        <pre className="p-4 overflow-x-auto bg-black/30 backdrop-blur-sm text-sm">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
  
  // Custom paragraph parser for special blocks and media
  p: ({ children }: { children?: React.ReactNode }) => {
    const childText = children?.toString() || '';
    
    // Handle warning, note, tip blocks
    if (childText.startsWith('::warning')) {
      const content = childText.replace('::warning', '').trim();
      return (
        <div className="my-6 p-4 bg-amber-950/30 border-l-4 border-amber-500 rounded-r-lg">
          <div className="flex items-center gap-2 font-bold text-amber-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v4m0 4h.01M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"></path>
            </svg>
            Warning
          </div>
          <p>{content}</p>
        </div>
      );
    }
    
    if (childText.startsWith('::note')) {
      const content = childText.replace('::note', '').trim();
      return (
        <div className="my-6 p-4 bg-blue-950/30 border-l-4 border-blue-500 rounded-r-lg">
          <div className="flex items-center gap-2 font-bold text-blue-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8h.01M12 12v8"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            Note
          </div>
          <p>{content}</p>
        </div>
      );
    }
    
    if (childText.startsWith('::tip')) {
      const content = childText.replace('::tip', '').trim();
      return (
        <div className="my-6 p-4 bg-green-950/30 border-l-4 border-green-500 rounded-r-lg">
          <div className="flex items-center gap-2 font-bold text-green-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6-4h6m2 8H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2"></path>
              <path d="m8 16 4 4 4-4"></path>
            </svg>
            Tip
          </div>
          <p>{content}</p>
        </div>
      );
    }
    
    // YouTube embed
    const youtubeRegex = /\[youtube:([a-zA-Z0-9_-]+)\]/;
    const youtubeMatch = childText.match(youtubeRegex);
    if (youtubeMatch && youtubeMatch[1]) {
      const videoId = youtubeMatch[1];
      return (
        <div className="my-6">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
            <Youtube className="w-4 h-4 text-red-500" />
            <span>YouTube Video</span>
          </div>
          <div className="relative overflow-hidden rounded-lg pt-[56.25%] w-full bg-black/20">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`} 
              title="YouTube video player" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    }
    
    // Image preview
    const imageRegex = /\[image:([^\]]+)\]/;
    const imageMatch = childText.match(imageRegex);
    if (imageMatch && imageMatch[1]) {
      const imagePath = imageMatch[1];
      return (
        <div className="my-6">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
            <Image className="w-4 h-4 text-blue-500" />
            <span>Image</span>
          </div>
          <img 
            src={imagePath} 
            alt="Blog image" 
            className="rounded-lg max-w-full hover:scale-[1.01] transition-transform cursor-zoom-in"
            onClick={() => window.open(imagePath, '_blank')}
          />
        </div>
      );
    }
    
    // Video preview
    const videoRegex = /\[video:([^\]]+)\]/;
    const videoMatch = childText.match(videoRegex);
    if (videoMatch && videoMatch[1]) {
      const videoPath = videoMatch[1];
      return (
        <div className="my-6">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
            <Video className="w-4 h-4 text-purple-500" />
            <span>Video</span>
          </div>
          <video 
            controls 
            className="w-full rounded-lg bg-black/30"
            src={videoPath}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    
    // File preview
    const fileRegex = /\[file:([^\]]+)\]/;
    const fileMatch = childText.match(fileRegex);
    if (fileMatch && fileMatch[1]) {
      const filePath = fileMatch[1];
      const fileName = filePath.split('/').pop() || 'file';
      return (
        <div className="my-6">
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-300">
            <File className="w-4 h-4 text-gray-500" />
            <span>File: {fileName}</span>
          </div>
          <div className="bg-black/30 border border-white/10 rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <File className="w-6 h-6" />
              <span>{fileName}</span>
            </div>
            <a 
              href={filePath} 
              download
              className="py-2 px-4 bg-white/10 hover:bg-white/20 transition-colors rounded-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <path d="M7 10l5 5 5-5"></path>
                <path d="M12 15V3"></path>
              </svg>
              Download
            </a>
          </div>
        </div>
      );
    }
    
    // Default paragraph behavior
    return <p className="my-4">{children}</p>;
  }
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // First, get the blog metadata from blogs.json
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        
        // Проверяем, есть ли кэшированные данные в localStorage
        const cachedMetadata = localStorage.getItem('blogsData');
        const cacheTimestamp = localStorage.getItem('blogsDataTimestamp');
        const now = Date.now();
        const cacheAge = cacheTimestamp ? now - parseInt(cacheTimestamp) : Infinity;
        
        let foundBlog: BlogPost | undefined;
        
        // Используем кэш для метаданных, если он существует и не старше 1 часа (3600000 мс)
        if (cachedMetadata && cacheAge < 3600000) {
          try {
            const parsedData = JSON.parse(cachedMetadata);
            foundBlog = parsedData.blogs.find((blog: BlogPost) => blog.id === id);
            
            if (foundBlog) {
              setBlog(foundBlog);
              console.log('Используются кэшированные метаданные блога');
            }
          } catch (parseError) {
            console.error('Ошибка при разборе кэшированных данных блогов:', parseError);
            // Если ошибка парсинга, продолжаем загрузку с сервера
          }
        }
        
        // Если блог не найден в кэше, загружаем метаданные с сервера
        if (!foundBlog) {
          // Добавляем обработку ошибок сети и ограничение времени запроса
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут
          
          const response = await fetch('/blogs.json', {
            signal: controller.signal,
            cache: 'no-store' // Отключаем кэширование браузера для получения свежих данных
          });
          
          clearTimeout(timeoutId); // Очищаем таймаут
          
          if (!response.ok) {
            throw new Error(`Failed to fetch blog metadata: ${response.status}`);
          }
          
          const data: BlogsData = await response.json();
          
          // Кэшируем результаты
          try {
            localStorage.setItem('blogsData', JSON.stringify(data));
            localStorage.setItem('blogsDataTimestamp', now.toString());
          } catch (cacheError) {
            console.error('Ошибка при кэшировании данных блогов:', cacheError);
          }
          
          foundBlog = data.blogs.find(blog => blog.id === id);
          
          if (foundBlog) {
            setBlog(foundBlog);
          } else {
            setError('Blog post not found');
            setIsLoading(false);
            return;
          }
        }
        
        // Проверяем кэш для содержимого блога
        const contentCacheKey = `blogContent_${id}`;
        const cachedContent = localStorage.getItem(contentCacheKey);
        const contentTimestamp = localStorage.getItem(`${contentCacheKey}_timestamp`);
        const contentAge = contentTimestamp ? now - parseInt(contentTimestamp) : Infinity;
        
        // Используем кэш для содержимого, если он существует и не старше 1 дня (86400000 мс)
        if (cachedContent && contentAge < 86400000) {
          try {
            setContent(cachedContent);
            setIsLoading(false);
            console.log('Используется кэшированное содержимое блога');
            return;
          } catch (contentError) {
            console.error('Ошибка при использовании кэшированного содержимого:', contentError);
          }
        }
        
        // Загружаем содержимое блога
        const contentController = new AbortController();
        const contentTimeoutId = setTimeout(() => contentController.abort(), 10000); // 10 секунд таймаут
        
        try {
          const contentResponse = await fetch(`/blogs/${foundBlog.path}`, {
            signal: contentController.signal,
            cache: 'no-store'
          });
          
          clearTimeout(contentTimeoutId);
          
          if (!contentResponse.ok) {
            throw new Error(`Failed to fetch blog content: ${contentResponse.status}`);
          }
          
          const contentText = await contentResponse.text();
          
          // Кэшируем содержимое блога
          try {
            localStorage.setItem(contentCacheKey, contentText);
            localStorage.setItem(`${contentCacheKey}_timestamp`, now.toString());
          } catch (contentCacheError) {
            console.error('Ошибка при кэшировании содержимого блога:', contentCacheError);
          }
          
          setContent(contentText);
        } catch (contentError) {
          if (contentError.name === 'AbortError') {
            console.error('Таймаут при загрузке содержимого блога');
            setError('Timeout loading blog content');
          } else {
            console.error('Ошибка при загрузке содержимого блога:', contentError);
            setError('Failed to load blog content');
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('Таймаут при загрузке данных блога');
          setError('Timeout loading blog data');
        } else {
          console.error('Ошибка при загрузке блога:', error);
          setError('Failed to load blog post');
        }
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  // Apply glitch effect class when entering the page
  useEffect(() => {
    const contentElement = document.getElementById('blog-content');
    if (contentElement && !isLoading && blog) {
      contentElement.classList.add('glitch-effect');
      
      // Remove the class after animation completes
      const timer = setTimeout(() => {
        contentElement.classList.remove('glitch-effect');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, blog]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-screen">
        <div className="flex justify-start mb-6">
          <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-purple-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full hover:translate-y-[-1px]">
            <Home className="w-5 h-5" />
            <span>{t('home')}</span>
          </Link>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-3/4 bg-gray-700 rounded"></div>
            <div className="h-6 w-1/3 bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-full bg-gray-700 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto py-12 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="mb-6">{error || 'Blog post not found'}</p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2" />
              {t('back_to_blog')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-block mb-6">
          <Button variant="outline" className="glass-morphism hover:bg-purple-400/20 border-purple-400/30 hover:border-purple-400/70 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_0_8px_rgba(168,85,247,0.4)]">
            <ArrowLeft className="mr-2" />
            {t('back_to_blog')}
          </Button>
        </Link>
        
        <div id="blog-content" className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient">{blog.title}</h1>
          
          <div className="flex flex-wrap gap-4 items-center text-gray-300 mb-8">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-1" />
              {blog.date}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-white/5 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  <TagIcon className="w-4 h-4" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none prose-pre:bg-black/50 prose-pre:backdrop-blur-md prose-pre:border prose-pre:border-white/10 prose-img:rounded-lg prose-headings:text-gradient prose-a:text-purple-400 prose-a:font-medium prose-a:no-underline prose-a:relative prose-a:border-b-2 prose-a:border-purple-500 hover:prose-a:border-purple-300 prose-a:transition-all prose-a:duration-300 hover:prose-a:text-purple-200 hover:prose-a:translate-y-[-2px] prose-a:after:content-[''] prose-a:after:absolute prose-a:after:w-0 prose-a:after:h-full prose-a:after:bg-purple-400/30 prose-a:after:left-0 prose-a:after:top-0 prose-a:after:transition-all prose-a:after:duration-300 hover:prose-a:after:w-full prose-a:px-1 prose-a:mx-0.5 prose-a:py-0.5 hover:prose-a:shadow-[0_0_15px_rgba(192,132,252,0.8)] prose-a:bg-purple-500/20 blog-content">            <ReactMarkdown 
              components={renderers}
              rehypePlugins={[rehypeRaw]} 
              remarkPlugins={[remarkGfm]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
