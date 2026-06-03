import type { PokemonDetail } from '../../types/pokemon';
import TypeBadge from '../TypeBadge';

interface HeroProps {
  data: PokemonDetail;
  image: string;
}

function HeroSection({ data, image }: HeroProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      {/* Image */}
      <div className="shrink-0 w-48 h-48 rounded-2xl bg-white/5 border border-white/10
                      flex items-center justify-center p-4">
        <img
          src={image}
          alt={data.name}
          className="w-full h-full object-contain drop-shadow-xl"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 text-center sm:text-left">
        <span className="text-sm text-white/40">
          #{String(data.id).padStart(4, '0')}
        </span>
        <h1 className="text-4xl font-bold capitalize">{data.name}</h1>

        <div className="flex gap-2 justify-center sm:justify-start">
          {data.types.map(({ type }) => (
            <TypeBadge key={type.name} type={type.name} />
          ))}
        </div>

        {/* Physical info */}
        <div className="flex gap-6 justify-center sm:justify-start mt-1">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-xs text-white/40">Height</span>
            <span className="text-sm font-semibold">
              {(data.height / 10).toFixed(1)} m
            </span>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-xs text-white/40">Weight</span>
            <span className="text-sm font-semibold">
              {(data.weight / 10).toFixed(1)} kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}