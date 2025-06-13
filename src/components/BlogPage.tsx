
import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../lib/i18n';
import BlogPost from './BlogPost';
import BlogHeader from './blog/BlogHeader';
import BlogStats from './blog/BlogStats';
import BlogTagFilter from './blog/BlogTagFilter';
import BlogPostCard from './blog/BlogPostCard';

interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: string;
}

const BlogPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        // Define the available blog posts
        const availablePosts = [
          {
            slug: 'brave',
            title: 'Brave Browser: Privacy Champion or Ethical Gray Zone?',
            excerpt: 'A deep dive into what Brave says vs. what they\'ve actually done.',
            date: '2024-01-15',
            tags: ['Privacy', 'Security', 'Browser'],
            readTime: getTranslation(language, 'blog.readTime.medium')
          },
          {
            slug: 'open-source-announcement',
            title: 'Open Source Announcement',
            excerpt: 'Announcing our commitment to open source software.',
            date: '2024-01-10',
            tags: ['Open Source', 'Announcement'],
            readTime: getTranslation(language, 'blog.readTime.short')
          },
          {
            slug: 'virustotal',
            title: 'VirusTotal Analysis',
            excerpt: 'A comprehensive analysis of VirusTotal scanning capabilities.',
            date: '2024-01-05',
            tags: ['Security', 'Analysis', 'Tools'],
            readTime: getTranslation(language, 'blog.readTime.medium')
          }
        ];

        setPosts(availablePosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [language]);

  if (selectedPost) {
    return <BlogPost slug={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts;

  if (loading) {
    return (
      <div className="min-h-screen py-16 md:py-20 px-4 flex items-center justify-center">
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

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <BlogHeader />
        <BlogStats postsCount={posts.length} tagsCount={allTags.length} />
        <BlogTagFilter 
          allTags={allTags} 
          selectedTag={selectedTag} 
          onTagSelect={setSelectedTag} 
        />

        <div className="space-y-4 md:space-y-6">
          {filteredPosts.map((post, index) => (
            <BlogPostCard
              key={post.slug}
              post={post}
              index={index}
              onPostSelect={setSelectedPost}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="terminal-window max-w-md mx-auto">
            <div className="p-6 text-center">
              <div className="text-neon-orange font-mono">
                <div>{getTranslation(language, 'blog.noPostsFound')} #{selectedTag}</div>
                <div className="text-sm text-neon-purple mt-2">
                  {getTranslation(language, 'blog.tryDifferentFilter')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
