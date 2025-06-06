
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, TagIcon, Home } from 'lucide-react';

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

export default function Blog() {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Проверяем, есть ли кэшированные данные в localStorage
        const cachedData = localStorage.getItem('blogsData');
        const cacheTimestamp = localStorage.getItem('blogsDataTimestamp');
        const now = Date.now();
        const cacheAge = cacheTimestamp ? now - parseInt(cacheTimestamp) : Infinity;
        
        // Используем кэш, если он существует и не старше 1 часа (3600000 мс)
        if (cachedData && cacheAge < 3600000) {
          try {
            const parsedData = JSON.parse(cachedData);
            setBlogs(parsedData.blogs);
            
            // Extract unique tags
            const tags = parsedData.blogs.flatMap(blog => blog.tags);
            setAllTags([...new Set(tags)]);
            
            setIsLoading(false);
            console.log('Используются кэшированные данные блогов');
            return;
          } catch (parseError) {
            console.error('Ошибка при разборе кэшированных данных блогов:', parseError);
            // Если ошибка парсинга, продолжаем загрузку с сервера
          }
        }
        
        // Добавляем обработку ошибок сети и ограничение времени запроса
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут
        
        const response = await fetch('/blogs.json', {
          signal: controller.signal,
          cache: 'no-store' // Отключаем кэширование браузера для получения свежих данных
        });
        
        clearTimeout(timeoutId); // Очищаем таймаут
        
        if (response.ok) {
          const data: BlogsData = await response.json();
          
          // Кэшируем результаты
          try {
            localStorage.setItem('blogsData', JSON.stringify(data));
            localStorage.setItem('blogsDataTimestamp', now.toString());
          } catch (cacheError) {
            console.error('Ошибка при кэшировании данных блогов:', cacheError);
          }
          
          setBlogs(data.blogs);
          
          // Extract unique tags
          const tags = data.blogs.flatMap(blog => blog.tags);
          setAllTags([...new Set(tags)]);
        } else {
          console.error('Ошибка при загрузке блогов:', response.status, response.statusText);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('Таймаут при загрузке блогов');
        } else {
          console.error('Ошибка при загрузке блогов:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  const filteredBlogs = selectedTag 
    ? blogs.filter(blog => blog.tags.includes(selectedTag))
    : blogs;

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen">
      <div className="flex justify-start mb-6">
        <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-purple-400 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full hover:translate-y-[-1px]">
          <Home className="w-5 h-5" />
          <span>{t('home')}</span>
        </Link>
      </div>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">{t('blog')}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">{t('blog_description')}</p>
        </div>
        
        <div className="glitch-effect">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="glass-morphism">
                <TabsTrigger value="all" onClick={() => setSelectedTag(null)} className="data-[state=active]:bg-white/10 data-[state=active]:text-white">
                  {t('all_posts')}
                </TabsTrigger>
                {allTags.map(tag => (
                  <TabsTrigger 
                    key={tag} 
                    value={tag}
                    onClick={() => setSelectedTag(tag)}
                    className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                  >
                    {tag}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <Link 
                    to={`/blog/${blog.id}`} 
                    key={blog.id} 
                    className="transition-all hover:scale-105 duration-300 group"
                  >
                    <Card className="h-full neo-blur border-white/5 group-hover:border-white/20 overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                          {blog.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-400">
                          <Calendar className="w-4 h-4 mr-1" />
                          {blog.date}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-300">{blog.summary}</p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="bg-white/5 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                            >
                              <TagIcon className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
            
            {allTags.map(tag => (
              <TabsContent key={tag} value={tag} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs
                    .filter(blog => blog.tags.includes(tag))
                    .map((blog) => (
                      <Link 
                        to={`/blog/${blog.id}`} 
                        key={blog.id} 
                        className="transition-all hover:scale-105 duration-300 group"
                      >
                        <Card className="h-full neo-blur border-white/5 group-hover:border-white/20">
                          <CardHeader>
                            <CardTitle className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                              {blog.title}
                            </CardTitle>
                            <div className="flex items-center text-sm text-gray-400">
                              <Calendar className="w-4 h-4 mr-1" />
                              {blog.date}
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-300">{blog.summary}</p>
                          </CardContent>
                          <CardFooter>
                            <div className="flex flex-wrap gap-2">
                              {blog.tags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="bg-white/5 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                                >
                                  <TagIcon className="w-3 h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-64 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
            </div>
          </div>
        )}
        
        {!isLoading && filteredBlogs.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl">{t('no_posts_found')}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
