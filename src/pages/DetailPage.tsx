import { useParams, Link } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import { getTypeAccent } from '../utils/typeColors';

export default function DetailPage() {
  const { name = '' } = useParams<{ name: string }>();
  const { data, isLoading, isError } = usePokemonDetail(name);

  if (isLoading) return <DetailSkeleton />;

  if (isError || !data) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0a0a0f',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <span style={{ fontSize: 48, opacity: 0.15 }}>◉</span>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
          Pokémon not found.
        </p>
        <Link to="/" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
          ← Back to Pokédex
        </Link>
      </div>
    );
  }

  const types  = data.types.map(t => t.type.name);
  const accent = getTypeAccent(types);
  const image  =
    data.sprites.other['official-artwork'].front_default ??
    data.sprites.front_default;
  const total  = data.stats.reduce((s, x) => s + x.base_stat, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff' }}>

      {/* ── Hero ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '40px 24px 0',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: -60, left: '50%',
          transform: 'translateX(-50%)',
          width: 400, height: 300, borderRadius: '50%',
          background: accent,
          filter: 'blur(80px)', opacity: 0.15,
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 768, margin: '0 auto', position: 'relative' }}>
          {/* Back */}
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none', marginBottom: 32,
          }}>
            ← Pokédex
          </Link>

          <div style={{
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', gap: 40, paddingBottom: 40,
          }}>
            {/* Image */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                position: 'absolute', inset: -16,
                borderRadius: '50%',
                background: accent,
                filter: 'blur(32px)', opacity: 0.3,
              }} />
              <img
                src={image}
                alt={data.name}
                style={{
                  position: 'relative',
                  width: 176, height: 176,
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
                }}
              />
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: accent, letterSpacing: 1,
              }}>
                #{String(data.id).padStart(4, '0')}
              </span>
              <h1 style={{
                fontSize: 40, fontWeight: 700, margin: 0,
                textTransform: 'capitalize', letterSpacing: -1,
              }}>
                {data.name}
              </h1>
              <div style={{ display: 'flex', gap: 8 }}>
                {types.map(t => <TypeBadge key={t} type={t} size="md" />)}
              </div>
              <div style={{ display: 'flex', gap: 32, marginTop: 4 }}>
                {[
                  { label: 'Height', value: `${(data.height / 10).toFixed(1)} m` },
                  { label: 'Weight', value: `${(data.weight / 10).toFixed(1)} kg` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{
                      fontSize: 10, textTransform: 'uppercase',
                      letterSpacing: 1.5, fontWeight: 600,
                      color: 'rgba(255,255,255,0.25)',
                    }}>{label}</span>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <main style={{ maxWidth: 768, margin: '0 auto', padding: '40px 24px' }}>

        <Section title="Base Stats" accent={accent}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.stats.map(s => (
              <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} accent={accent} />
            ))}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              paddingTop: 12,
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
              <span style={{
                width: 56, textAlign: 'right', fontSize: 10,
                textTransform: 'uppercase', letterSpacing: 1.5,
                fontWeight: 600, color: 'rgba(255,255,255,0.25)', flexShrink: 0,
              }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: accent }}>
                {total}
              </span>
            </div>
          </div>
        </Section>

        <Section title="Abilities" accent={accent}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {data.abilities.map(({ ability, is_hidden }) => (
              <div key={ability.name} style={{
                padding: '10px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', flexDirection: 'column', gap: 2,
              }}>
                <span style={{
                  fontSize: 13, fontWeight: 600, textTransform: 'capitalize',
                }}>
                  {ability.name.replace('-', ' ')}
                </span>
                {is_hidden && (
                  <span style={{
                    fontSize: 10, textTransform: 'uppercase',
                    letterSpacing: 1.5, fontWeight: 600, color: accent,
                  }}>Hidden</span>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Sprites" accent={accent}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {[
              { label: 'Default',      src: data.sprites.front_default },
              { label: 'Official art', src: data.sprites.other['official-artwork'].front_default },
            ].filter(s => !!s.src).map(({ label, src }) => (
              <div key={label} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 8,
                padding: 16, borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <img src={src} alt={label}
                     style={{ width: 80, height: 80, objectFit: 'contain' }} />
                <span style={{
                  fontSize: 10, textTransform: 'uppercase',
                  letterSpacing: 1.5, fontWeight: 600,
                  color: 'rgba(255,255,255,0.25)',
                }}>{label}</span>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, accent, children }: {
  title: string; accent: string; children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: 40 }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 10, marginBottom: 20,
      }}>
        <div style={{
          width: 3, height: 16, borderRadius: 4,
          background: accent, flexShrink: 0,
        }} />
        <h2 style={{
          fontSize: 11, fontWeight: 700, margin: 0,
          textTransform: 'uppercase', letterSpacing: 2,
          color: 'rgba(255,255,255,0.35)',
        }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function DetailSkeleton() {
  const pulse = {
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 8,
    animation: 'pulse 1.5s ease-in-out infinite',
  } as React.CSSProperties;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', padding: '40px 24px' }}>
      <div style={{ maxWidth: 768, margin: '0 auto' }}>
        <div style={{ ...pulse, width: 80, height: 14, marginBottom: 32 }} />
        <div style={{ display: 'flex', gap: 40, marginBottom: 40 }}>
          <div style={{ ...pulse, width: 176, height: 176, borderRadius: '50%', flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, paddingTop: 16 }}>
            <div style={{ ...pulse, width: 48, height: 12 }} />
            <div style={{ ...pulse, width: 200, height: 36 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ ...pulse, width: 64, height: 24, borderRadius: 20 }} />
              <div style={{ ...pulse, width: 64, height: 24, borderRadius: 20 }} />
            </div>
          </div>
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ ...pulse, width: 56, height: 12 }} />
            <div style={{ ...pulse, width: 32, height: 12 }} />
            <div style={{ ...pulse, flex: 1, height: 6, borderRadius: 4 }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}