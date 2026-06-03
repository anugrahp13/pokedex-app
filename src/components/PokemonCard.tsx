import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../api/pokemonService';
import TypeBadge from './TypeBadge';
import { getTypeAccent, getTypeGlow } from '../utils/typeColors';

interface Props { name: string }

export default function PokemonCard({ name }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonDetail(name),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div style={{
        borderRadius: 16,
        height: 192,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        animation: 'pulse 2s infinite',
      }} />
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
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background   = 'rgba(255,255,255,0.08)';
        el.style.borderColor  = 'rgba(255,255,255,0.15)';
        el.style.boxShadow    = `0 8px 32px ${glow}`;
        el.style.transform    = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background   = 'rgba(255,255,255,0.04)';
        el.style.borderColor  = 'rgba(255,255,255,0.07)';
        el.style.boxShadow    = 'none';
        el.style.transform    = 'translateY(0)';
      }}
    >
      {/* Accent corner */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 64, height: 64,
        borderRadius: '0 16px 0 100%',
        background: accent,
        opacity: 0.12,
        pointerEvents: 'none',
      }} />

      {/* ID */}
      <span style={{
        alignSelf: 'flex-start',
        fontSize: 10,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.25)',
        marginBottom: 6,
        letterSpacing: 1,
      }}>
        #{String(data.id).padStart(4, '0')}
      </span>

      {/* Image with glow */}
      <div style={{ position: 'relative', width: 88, height: 88, marginBottom: 12 }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: accent,
          filter: 'blur(16px)',
          opacity: 0.25,
        }} />
        <img
          src={image}
          alt={data.name}
          style={{
            position: 'relative',
            width: '100%', height: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease',
          }}
          loading="lazy"
        />
      </div>

      {/* Name */}
      <p style={{
        fontSize: 13,
        fontWeight: 600,
        textTransform: 'capitalize',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
      }}>
        {data.name}
      </p>

      {/* Badges */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {types.map(t => <TypeBadge key={t} type={t} />)}
      </div>
    </Link>
  );
}