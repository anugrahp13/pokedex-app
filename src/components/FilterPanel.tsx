import { useQuery } from '@tanstack/react-query';
import { fetchAllTypes } from '../api/typeService';
import { useFilterStore } from '../store/filterStore';
import { TYPE_STYLES } from '../utils/typeColors';

export default function FilterPanel() {
  const { selectedType, setType } = useFilterStore();

  const { data: types = [] } = useQuery({
    queryKey: ['types'],
    queryFn:  fetchAllTypes,
    staleTime: Infinity,
  });

  return (
    <div className="flex gap-2 scrollbar-hide overflow-x-auto pb-1">
      {/* All */}
      <button
        onClick={() => setType('')}
        className="shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold
                   transition-all duration-200 border"
        style={
          selectedType === ''
            ? { background: '#fff', color: '#0a0a0f', borderColor: '#fff' }
            : { background: 'transparent', color: 'var(--text-muted)',
                borderColor: 'var(--border-hover)' }
        }
      >
        All
      </button>

      {types.map(type => {
        const style   = TYPE_STYLES[type];
        const active  = selectedType === type;
        const accent  = style?.accent ?? '#888';

        return (
          <button
            key={type}
            onClick={() => setType(active ? '' : type)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold
                       capitalize transition-all duration-200 border"
            style={
              active
                ? { background: `${accent}25`, color: accent,
                    borderColor: accent, transform: 'scale(1.05)' }
                : { background: 'transparent', color: 'var(--text-muted)',
                    borderColor: 'var(--border)' }
            }
            onMouseEnter={e => {
              if (!active) {
                (e.currentTarget as HTMLElement).style.color       = accent;
                (e.currentTarget as HTMLElement).style.borderColor = accent;
                (e.currentTarget as HTMLElement).style.background  = `${accent}15`;
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                (e.currentTarget as HTMLElement).style.color       = 'var(--text-muted)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.background  = 'transparent';
              }
            }}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}