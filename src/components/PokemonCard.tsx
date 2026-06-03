import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../api/pokemonService';
import TypeBadge from './TypeBadge';

interface Props {
  name: string;
}

export default function PokemonCard({ name }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonDetail(name),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white/5 border border-white/10 h-44 animate-pulse" />
    );
  }

  if (!data) return null;

  const image =
    data.sprites.other['official-artwork'].front_default ??
    data.sprites.front_default;

  return (
    <Link
      to={`/pokemon/${data.name}`}
      className="group rounded-2xl bg-white/5 border border-white/10 p-4
                 hover:bg-white/10 hover:border-white/20 transition-all
                 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-white/40 self-start">
        #{String(data.id).padStart(4, '0')}
      </span>
      <img
        src={image}
        alt={data.name}
        className="w-24 h-24 object-contain drop-shadow-md
                   group-hover:scale-110 transition-transform"
        loading="lazy"
      />
      <p className="text-sm font-semibold capitalize text-white/90">{data.name}</p>
      <div className="flex gap-1 flex-wrap justify-center">
        {data.types.map(({ type }) => (
          <TypeBadge key={type.name} type={type.name} />
        ))}
      </div>
    </Link>
  );
}