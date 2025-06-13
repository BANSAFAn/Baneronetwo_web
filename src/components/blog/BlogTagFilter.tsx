
import { useLanguage } from '../../hooks/useLanguage';
import { getTranslation } from '../../lib/i18n';
import TerminalWindow from '../TerminalWindow';

interface BlogTagFilterProps {
  allTags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const BlogTagFilter = ({ allTags, selectedTag, onTagSelect }: BlogTagFilterProps) => {
  const { language } = useLanguage();

  return (
    <TerminalWindow title="TAG_FILTER.EXE">
      <div className="p-3 md:p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTagSelect(null)}
            className={`nav-link text-xs ${
              !selectedTag ? 'bg-neon-green text-cyber-dark' : ''
            }`}
          >
            {getTranslation(language, 'blog.allTags')}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className={`nav-link text-xs ${
                selectedTag === tag ? 'bg-neon-green text-cyber-dark' : ''
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </TerminalWindow>
  );
};

export default BlogTagFilter;
