import { useQuery } from '@tanstack/react-query';
import { fetchAllTypes } from '../api/typeService';
import { useFilterStore } from '../store/filterStore';
import TypeBadge from './TypeBadge';

export default function FilterPanel() {
  const { selectedType, setType } = useFilterStore();

  const { data: types = [] } = useQuery({
    queryKey: ['types'],
    queryFn: fetchAllTypes,
    staleTime: Infinity,
  });

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setType('')}
        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all
          ${selectedType === ''
            ? 'bg-white text-black border-white'
            : 'bg-transparent text-white/60 border-white/20 hover:border-white/40'
          }`}
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type}
          onClick={() => setType(selectedType === type ? '' : type)}
          className={`transition-all rounded-full border-2
            ${selectedType === type ? 'border-white scale-110' : 'border-transparent opacity-70 hover:opacity-100'}`}
        >
          <TypeBadge type={type} />
        </button>
      ))}
    </div>
  );
}