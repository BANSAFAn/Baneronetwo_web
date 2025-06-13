
import { useLanguage } from '../../hooks/useLanguage';
import TerminalWindow from '../TerminalWindow';

interface BlogStatsProps {
  postsCount: number;
  tagsCount: number;
}

const BlogStats = ({ postsCount, tagsCount }: BlogStatsProps) => {
  const { language } = useLanguage();

  return (
    <TerminalWindow title="BLOG_STATUS.TXT" className="max-w-full md:max-w-2xl mx-auto">
      <div className="p-4 md:p-6">
        <div className="font-mono text-xs md:text-sm space-y-2">
          <div className="text-neon-blue">$ cat blog_info.txt</div>
          <div className="text-neon-green">Total Posts: {postsCount}</div>
          <div className="text-neon-purple">Tags: {tagsCount}</div>
          <div className="text-neon-orange">Status: ACTIVE • UPDATING WEEKLY</div>
          <div className="text-neon-blue mt-4">
            $ echo "{language === 'ru' ? 'Делюсь знаниями о безопасности и разработке' : 
                     language === 'uk' ? 'Ділюся знаннями про безпеку та розробку' : 
                     'Sharing knowledge about security and development'}"
          </div>
        </div>
      </div>
    </TerminalWindow>
  );
};

export default BlogStats;
