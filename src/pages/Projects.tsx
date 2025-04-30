
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, GitFork, Github, LoaderCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import ParticlesBg from 'particles-bg';
import { useIsMobile } from '@/hooks/use-mobile';
import { SocialLinks } from '@/components/SocialLinks';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

interface Repository {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

const Projects = () => {
  const [showContent, setShowContent] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [contributedRepos, setContributedRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const username = 'BANSAFAn';

  // List of contributed repositories
  const contributedRepoUrls = [
    'NightWorldTeam/Lexplosion',
    'Voxelum/x-minecraft-launcher',
    'Xcube-Studio/Natsurainko.FluentLauncher',
    'Xcube-Studio/FluentLauncher.Infra.Localization',
    'Seeroy/FrogLauncher2',
    'Voxelum/xmcl-commuity-content-i18n',
    'Voxelum/xmcl-page',
    'BANSAFAn/xmcl-website-NOT-OFFICIAL'
  ];

  useEffect(() => {
    // Show content with a slight delay for animation
    setTimeout(() => setShowContent(true), 100);

    // Fetch user's repositories
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (response.ok) {
          const data = await response.json();
          setRepositories(data);
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    // Fetch contributed repositories
    const fetchContributedRepos = async () => {
      try {
        const fetchPromises = contributedRepoUrls.map(async (repoPath) => {
          try {
            const response = await fetch(`https://api.github.com/repos/${repoPath}`);
            if (response.ok) {
              return await response.json();
            }
            return null;
          } catch (error) {
            console.error(`Error fetching repo ${repoPath}:`, error);
            return null;
          }
        });

        const results = await Promise.all(fetchPromises);
        setContributedRepos(results.filter(repo => repo !== null));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contributed repositories:', error);
        setLoading(false);
      }
    };

    fetchRepos();
    fetchContributedRepos();
  }, []);

  // Function to render repository cards
  const renderRepoCard = (repo: Repository) => (
    <div 
      key={repo.html_url} 
      className="glass-morphism rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 animate-fade-in"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Github className="w-5 h-5 mr-2 text-white/70" />
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xl font-bold text-white hover:text-purple-300 transition-colors"
          >
            {repo.name}
          </a>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            <span className="text-sm text-white/70">{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="w-4 h-4 mr-1 text-blue-400" />
            <span className="text-sm text-white/70">{repo.forks_count}</span>
          </div>
        </div>
      </div>
      
      {repo.description && (
        <p className="text-white/70 mb-3 line-clamp-2">{repo.description}</p>
      )}
      
      {repo.language && (
        <div className="inline-flex items-center">
          <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
          <span className="text-sm text-white/70">{repo.language}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-[3px] opacity-80">
        <ParticlesBg 
          type="cobweb" 
          bg={true} 
          color="#111111" 
          num={isMobile ? 80 : 150}
        />
      </div>
      
      <div className={`w-full min-h-screen flex flex-col transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <header className="container mx-auto px-4 pt-8 md:pt-16 relative z-10">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Baneronetwo
            </Link>
            
            <LanguageSwitcher />
          </div>
          
          <NavigationMenu className="mt-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  {t('home')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={navigationMenuTriggerStyle()}>
                  {t('about')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/projects" className={navigationMenuTriggerStyle() + " bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10"}>
                  {t('projects')}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/posts" className={navigationMenuTriggerStyle()}>
                  {t('posts')}
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <h1 className="text-4xl md:text-5xl font-bold mt-10 mb-6 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {t('my_projects')}
          </h1>
          
          <SocialLinks />
        </header>
        
        <main className="container mx-auto px-4 py-12 relative z-10 flex-grow">
          <div className="mb-8">
            <Tabs defaultValue="contributed" className="w-full">
              <TabsList className="mb-6 bg-black/30 backdrop-blur-md border border-white/10 w-full md:w-auto flex justify-center">
                <TabsTrigger value="contributed" className="data-[state=active]:bg-white/10">
                  {t('contributed_projects')}
                </TabsTrigger>
                <TabsTrigger value="personal" className="data-[state=active]:bg-white/10">
                  {t('personal_repositories')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="contributed" className="animate-fade-in">
                {loading ? (
                  <div className="flex justify-center items-center py-16">
                    <LoaderCircle className="w-8 h-8 animate-spin text-purple-500" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contributedRepos.map(renderRepoCard)}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="personal" className="animate-fade-in">
                {loading ? (
                  <div className="flex justify-center items-center py-16">
                    <LoaderCircle className="w-8 h-8 animate-spin text-purple-500" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repositories.map(renderRepoCard)}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
