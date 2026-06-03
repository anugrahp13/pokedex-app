import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';

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
      {/* Back button */}
      <div className="max-w-3xl mx-auto px-6 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-white/40
                     hover:text-white transition-colors"
        >
          ← Pokédex
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-6 flex flex-col gap-8">
        {/* Hero */}
        <HeroSection data={data} image={image} />

        {/* Stats */}
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

        {/* Abilities */}
        <Section title="Abilities">
          <AbilitiesSection data={data} />
        </Section>

        {/* Sprites gallery */}
        <Section title="Sprites">
          <SpritesSection sprites={data.sprites} />
        </Section>
      </main>
    </div>
  );
}