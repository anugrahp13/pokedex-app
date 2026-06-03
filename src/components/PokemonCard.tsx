import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../api/pokemonService';
import TypeBadge from './TypeBadge';
import { getTypeAccent, getTypeGlow } from '../utils/typeColors';

interface Props { name: string }

export default function PokemonCard({ name }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn:  () => fetchPokemonDetail(name),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl h-48 animate-pulse"
           style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
    );
  }

  if (!data) return null;

  const types  = data.types.map(t => t.type.name);
  const accent = getTypeAccent(types);
  const glow   = getTypeGlow(types);
  const image  =
    data.sprites.other['official-artwork'].front_default ??
    data.sprites.front_default;

  return (
    <Link
      to={`/pokemon/${data.name}`}
      className="group relative rounded-2xl overflow-hidden flex flex-col
                 items-center p-4 transition-all duration-300"
      style={{
        background:  'var(--bg-card)',
        border:      '1px solid var(--border)',
        boxShadow:   `0 0 0 0 ${glow}`,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.background   = 'var(--bg-card-hover)';
        (e.currentTarget as HTMLElement).style.borderColor  = 'var(--border-hover)';
        (e.currentTarget as HTMLElement).style.boxShadow    = `0 8px 32px ${glow}`;
        (e.currentTarget as HTMLElement).style.transform    = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.background   = 'var(--bg-card)';
        (e.currentTarget as HTMLElement).style.borderColor  = 'var(--border)';
        (e.currentTarget as HTMLElement).style.boxShadow    = `0 0 0 0 ${glow}`;
        (e.currentTarget as HTMLElement).style.transform    = 'translateY(0)';
      }}
    >
      {/* Accent corner */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10
                   transition-opacity duration-300 group-hover:opacity-20"
        style={{ background: accent }}
      />

      {/* ID */}
      <span className="self-start text-[10px] font-semibold mb-2"
            style={{ color: 'var(--text-faint)' }}>
        #{String(data.id).padStart(4, '0')}
      </span>

      {/* Image */}
      <div className="relative w-24 h-24 mb-3">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30
                     group-hover:opacity-50 transition-opacity"
          style={{ background: accent }}
        />
        <img
          src={image}
          alt={data.name}
          className="relative w-full h-full object-contain drop-shadow-lg
                     group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <p className="text-sm font-semibold capitalize mb-2 text-center"
         style={{ color: 'var(--text-primary)' }}>
        {data.name}
      </p>

      {/* Types */}
      <div className="flex gap-1.5 flex-wrap justify-center">
        {types.map(t => <TypeBadge key={t} type={t} />)}
      </div>
    </Link>
  );
}