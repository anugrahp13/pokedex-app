import { useEffect, useRef, useState } from 'react';
import { useFilteredPokemons } from '../hooks/useFilteredPokemons';
import PokemonCard from '../components/PokemonCard';
import FilterPanel from '../components/FilterPanel';
import { useFilterStore } from '../store/filterStore';

export default function HomePage() {
  const { selectedType } = useFilterStore();
  const [search, setSearch] = useState('');
  const { pokemons, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFilteredPokemons();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage)
          fetchNextPage();
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const displayed = search.trim()
    ? pokemons.filter(p => p.name.includes(search.trim().toLowerCase()))
    : pokemons;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f' }}>

      {/* ── Header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        padding: '20px 24px 0',
        background: 'rgba(10,10,15,0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>

          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: '#e63946',
                border: '2px solid rgba(255,255,255,0.3)',
                position: 'relative', overflow: 'hidden', flexShrink: 0,
              }}>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '50%', background: '#1a1a2e',
                  borderTop: '2px solid rgba(255,255,255,0.3)',
                }} />
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #1a1a2e',
                  zIndex: 1,
                }} />
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0,
                           letterSpacing: -0.5, color: '#fff' }}>
                Pokédex
              </h1>
            </div>

            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', borderRadius: 12, flex: 1, maxWidth: 320,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search pokémon..."
                style={{
                  background: 'none', border: 'none', outline: 'none',
                  color: '#fff', fontSize: 13, width: '100%',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.3)', fontSize: 12, padding: 0,
                  }}
                >✕</button>
              )}
            </div>
          </div>

          {/* Filter row */}
          <div style={{ paddingBottom: 16 }}>
            <FilterPanel />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main style={{ maxWidth: 1152, margin: '0 auto', padding: '32px 24px' }}>

        {/* Count */}
        <p style={{
          fontSize: 12, color: 'rgba(255,255,255,0.3)',
          marginBottom: 24, fontWeight: 500,
        }}>
          {isLoading
            ? 'Loading...'
            : `${displayed.length} pokémon${selectedType ? ` · ${selectedType}` : ''}`}
        </p>

        {/* Grid */}
        {isLoading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 16,
          }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} style={{
                borderRadius: 16, height: 192,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '120px 0', gap: 12,
          }}>
            <span style={{ fontSize: 48, opacity: 0.15 }}>◉</span>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              No pokémon found
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 16,
          }}>
            {displayed.map(p => (
              <PokemonCard key={p.name} name={p.name} />
            ))}
          </div>
        )}

        <div ref={sentinelRef} style={{ height: 40, marginTop: 32 }} />

        {isFetchingNextPage && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.15)',
              borderTopColor: '#fff',
              animation: 'spin 0.8s linear infinite',
            }} />
          </div>
        )}
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        input::placeholder { color: rgba(255,255,255,0.25); }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}