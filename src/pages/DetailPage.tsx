import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import { getTypeAccent, getTypeGlow } from '../utils/typeColors';

export default function DetailPage() {
  const { name = '' } = useParams<{ name: string }>();
  const { data, isLoading, isError } = usePokemonDetail(name);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
           style={{ background: 'var(--bg-base)' }}>
        <span className="text-5xl opacity-20">◉</span>
        <p style={{ color: 'var(--text-muted)' }}>Pokémon not found.</p>
        <Link to="/" className="text-sm underline transition-colors hover:text-white"
              style={{ color: 'var(--text-faint)' }}>← Back to Pokédex</Link>
      </div>
    );
  }

  const types  = data.types.map(t => t.type.name);
  const accent = getTypeAccent(types);
  const glow   = getTypeGlow(types);
  const image  =
    data.sprites.other['official-artwork'].front_default ??
    data.sprites.front_default;
  const total  = data.stats.reduce((s, x) => s + x.base_stat, 0);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* ── Hero banner ── */}
      <div
        className="relative px-6 pt-8 pb-0 overflow-hidden"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {/* Glow background */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64
                     rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: accent }}
        />

        <div className="max-w-3xl mx-auto relative">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm mb-6
                       transition-colors hover:text-white"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Pokédex
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-8 pb-10">
            {/* Image */}
            <div className="relative shrink-0">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ background: accent }}
              />
              <img
                src={image}
                alt={data.name}
                className="relative w-44 h-44 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-3 text-center sm:text-left">
              <span className="text-sm font-semibold"
                    style={{ color: accent }}>
                #{String(data.id).padStart(4, '0')}
              </span>
              <h1 className="text-4xl font-bold capitalize tracking-tight">
                {data.name}
              </h1>
              <div className="flex gap-2 justify-center sm:justify-start">
                {types.map(t => (
                  <TypeBadge key={t} type={t} size="md" />
                ))}
              </div>
              {/* Physical */}
              <div className="flex gap-6 justify-center sm:justify-start mt-1">
                {[
                  { label: 'Height', value: `${(data.height / 10).toFixed(1)} m` },
                  { label: 'Weight', value: `${(data.weight / 10).toFixed(1)} kg` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-widest font-semibold"
                          style={{ color: 'var(--text-faint)' }}>{label}</span>
                    <span className="text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <main className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-8">

        {/* Stats */}
        <Section title="Base stats" accent={accent}>
          <div className="flex flex-col gap-3">
            {data.stats.map(s => (
              <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
            ))}
            <div className="flex items-center gap-3 pt-3"
                 style={{ borderTop: '1px solid var(--border)' }}>
              <span className="w-16 text-[10px] text-right uppercase tracking-widest font-semibold shrink-0"
                    style={{ color: 'var(--text-faint)' }}>Total</span>
              <span className="text-base font-bold" style={{ color: accent }}>
                {total}
              </span>
            </div>
          </div>
        </Section>

        {/* Abilities */}
        <Section title="Abilities" accent={accent}>
          <div className="flex flex-wrap gap-3">
            {data.abilities.map(({ ability, is_hidden }) => (
              <div
                key={ability.name}
                className="px-4 py-2.5 rounded-xl flex flex-col gap-0.5"
                style={{ background: 'var(--bg-card)',
                         border: '1px solid var(--border)' }}
              >
                <span className="text-sm font-semibold capitalize">
                  {ability.name.replace('-', ' ')}
                </span>
                {is_hidden && (
                  <span className="text-[10px] uppercase tracking-widest font-semibold"
                        style={{ color: accent }}>Hidden</span>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* Sprites */}
        <Section title="Sprites" accent={accent}>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Default',      src: data.sprites.front_default },
              { label: 'Official art', src: data.sprites.other['official-artwork'].front_default },
            ]
              .filter(s => !!s.src)
              .map(({ label, src }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl"
                  style={{ background: 'var(--bg-card)',
                           border: '1px solid var(--border)' }}
                >
                  <img src={src} alt={label} className="w-20 h-20 object-contain" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold"
                        style={{ color: 'var(--text-faint)' }}>{label}</span>
                </div>
              ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

/* ── Helpers ── */
function Section({
  title, accent, children,
}: {
  title: string; accent: string; children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span
          className="w-1 h-4 rounded-full shrink-0"
          style={{ background: accent }}
        />
        <h2 className="text-xs font-bold uppercase tracking-widest"
            style={{ color: 'var(--text-faint)' }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <div className="h-4 w-20 rounded animate-pulse mb-6"
             style={{ background: 'var(--bg-card)' }} />
        <div className="flex gap-8 pb-10">
          <div className="w-44 h-44 rounded-full animate-pulse shrink-0"
               style={{ background: 'var(--bg-card)' }} />
          <div className="flex flex-col gap-3 flex-1 pt-4">
            <div className="h-3 w-12 rounded animate-pulse" style={{ background: 'var(--bg-card)' }} />
            <div className="h-8 w-48 rounded animate-pulse" style={{ background: 'var(--bg-card)' }} />
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-full animate-pulse" style={{ background: 'var(--bg-card)' }} />
              <div className="h-6 w-16 rounded-full animate-pulse" style={{ background: 'var(--bg-card)' }} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-16 h-3 rounded animate-pulse" style={{ background: 'var(--bg-card)' }} />
              <div className="w-8 h-3 rounded animate-pulse"  style={{ background: 'var(--bg-card)' }} />
              <div className="flex-1 h-2 rounded animate-pulse" style={{ background: 'var(--bg-card)' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}