
import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getTranslation } from '../lib/i18n';
import { Github, ExternalLink, Shield, Code, Zap, Star, GitFork } from 'lucide-react';
import TerminalWindow from './TerminalWindow';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

const ProjectsPage = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/BANSAFAn/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const getCategoryFromRepo = (repo: GitHubRepo) => {
    const topics = repo.topics || [];
    const description = repo.description?.toLowerCase() || '';
    const name = repo.name.toLowerCase();

    if (topics.includes('security') || description.includes('security') || 
        description.includes('hack') || name.includes('security')) {
      return 'security';
    }
    if (topics.includes('hardware') || description.includes('iot') || 
        description.includes('arduino') || name.includes('hardware')) {
      return 'hardware';
    }
    return 'development';
  };

  const categories = [
    { id: 'all', name: 'ALL', icon: Code },
    { id: 'security', name: 'SECURITY', icon: Shield },
    { id: 'development', name: 'DEVELOPMENT', icon: Code },
    { id: 'hardware', name: 'HARDWARE', icon: Zap }
  ];

  const filteredRepos = selectedCategory === 'all' 
    ? repos 
    : repos.filter(repo => getCategoryFromRepo(repo) === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <TerminalWindow title="LOADING.SYS" id="loading">
            <div className="p-6 text-center">
              <div className="text-neon-green font-mono animate-pulse">
                Loading repositories from GitHub...
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <TerminalWindow title="ERROR.LOG" id="error">
            <div className="p-6 text-center">
              <div className="text-neon-orange font-mono">
                Error loading repositories: {error}
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <TerminalWindow title="PROJECTS.EXE" id="projects_header">
          <div className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="font-mono text-sm md:text-base text-neon-blue">
                $ curl -s https://api.github.com/users/BANSAFAn/repos
              </div>
              <h1 className="text-3xl md:text-5xl font-orbitron font-bold text-neon-green neon-glow">
                {getTranslation(language, 'projects.title')}
              </h1>
              <div className="text-lg md:text-xl text-neon-purple font-mono">
                Found {repos.length} repositories
              </div>
            </div>
          </div>
        </TerminalWindow>

        {/* Category Filter */}
        <TerminalWindow title="FILTER.SYS" id="projects_filter">
          <div className="p-4 md:p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`nav-link text-xs flex items-center gap-2 ${
                    selectedCategory === category.id ? 'bg-neon-green text-cyber-dark' : ''
                  }`}
                >
                  <category.icon size={16} />
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </TerminalWindow>

        {/* Projects Grid */}
        <div className="space-y-6">
          {filteredRepos.map((repo) => (
            <TerminalWindow 
              key={repo.id} 
              title={`${repo.name.toUpperCase()}.REPO`}
              id={`repo_${repo.id}`}
            >
              <div className="p-6 md:p-8">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-orbitron font-bold text-neon-green mb-2">
                        {repo.name}
                      </h3>
                      <div className="text-sm font-mono text-neon-purple mb-4">
                        Updated: {formatDate(repo.updated_at)}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link w-8 h-8"
                        title="GitHub"
                      >
                        <Github size={16} />
                      </a>
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link w-8 h-8"
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-neon-blue font-mono text-sm md:text-base">
                    {repo.description || 'No description available'}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-neon-orange font-mono">
                    {repo.language && (
                      <span className="px-2 py-1 bg-cyber-gray border border-neon-purple text-neon-purple rounded">
                        {repo.language}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <Star size={12} />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={12} />
                      {repo.forks_count}
                    </div>
                  </div>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-cyber-gray border border-neon-green text-neon-green text-xs font-mono rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TerminalWindow>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <TerminalWindow title="NO_RESULTS.TXT" id="no_results">
            <div className="p-6 text-center">
              <div className="text-neon-orange font-mono">
                No repositories found in category: {selectedCategory}
              </div>
            </div>
          </TerminalWindow>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
