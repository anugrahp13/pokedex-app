import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import DetailSkeleton from '../components/DetailSkeleton';
import type { PokemonDetail } from '../types/pokemon';

// ─── Section wrapper ──────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest">
        {title}
      </h2>
      {children}
    </section>
  );
}

// ─── HeroSection ──────────────────────────────────────────────
function HeroSection({ data, image }: { data: PokemonDetail; image: string }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-8">
      <div className="shrink-0 w-48 h-48 rounded-2xl bg-white/5 border border-white/10
                      flex items-center justify-center p-4">
        <img
          src={image}
          alt={data.name}
          className="w-full h-full object-contain drop-shadow-xl"
        />
      </div>
      <div className="flex flex-col gap-3 text-center sm:text-left">
        <span className="text-sm text-white/40">#{String(data.id).padStart(4, '0')}</span>
        <h1 className="text-4xl font-bold capitalize">{data.name}</h1>
        <div className="flex gap-2 justify-center sm:justify-start">
          {data.types.map(({ type }) => (
            <TypeBadge key={type.name} type={type.name} />
          ))}
        </div>
        <div className="flex gap-6 justify-center sm:justify-start mt-1">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-xs text-white/40">Height</span>
            <span className="text-sm font-semibold">{(data.height / 10).toFixed(1)} m</span>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-xs text-white/40">Weight</span>
            <span className="text-sm font-semibold">{(data.weight / 10).toFixed(1)} kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AbilitiesSection ─────────────────────────────────────────
function AbilitiesSection({ data }: { data: PokemonDetail }) {
  return (
    <div className="flex flex-wrap gap-3">
      {data.abilities.map(({ ability, is_hidden }) => (
        <div
          key={ability.name}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10
                     flex flex-col items-start gap-0.5"
        >
          <span className="text-sm font-semibold capitalize">{ability.name}</span>
          {is_hidden && (
            <span className="text-xs text-white/40">Hidden ability</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SpritesSection ───────────────────────────────────────────
function SpritesSection({ sprites }: { sprites: PokemonDetail['sprites'] }) {
  const list = [
    { label: 'Default',      src: sprites.front_default },
    { label: 'Official art', src: sprites.other['official-artwork'].front_default },
  ].filter((s) => !!s.src);

  return (
    <div className="flex flex-wrap gap-4">
      {list.map(({ label, src }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 rounded-xl bg-white/5
                     border border-white/10 p-3"
        >
          <img src={src} alt={label} className="w-20 h-20 object-contain" />
          <span className="text-xs text-white/40">{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function DetailPage() {
  const { name = '' } = useParams<{ name: string }>();
  const { data, isLoading, isError } = usePokemonDetail(name);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-white/60">Pokemon tidak ditemukan.</p>
        <Link to="/" className="text-sm underline text-white/40 hover:text-white">
          ← Kembali
        </Link>
      </div>
    );
  }

  const image =
    data.sprites.other['official-artwork'].front_default ??
    data.sprites.front_default;

  const totalStats = data.stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors">
          ← Pokédex
        </Link>
      </div>
      <main className="max-w-3xl mx-auto px-6 py-6 flex flex-col gap-8">
        <HeroSection data={data} image={image} />

        <Section title="Base Stats">
          <div className="flex flex-col gap-3">
            {data.stats.map((s) => (
              <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
            ))}
            <div className="border-t border-white/10 pt-3 flex items-center gap-3">
              <span className="w-16 text-xs text-white/40 text-right shrink-0">Total</span>
              <span className="text-sm font-bold text-white">{totalStats}</span>
            </div>
          </div>
        </Section>

        <Section title="Abilities">
          <AbilitiesSection data={data} />
        </Section>

        <Section title="Sprites">
          <SpritesSection sprites={data.sprites} />
        </Section>
      </main>
    </div>
  );
}