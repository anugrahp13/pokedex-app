import { useEffect, useRef, useState } from 'react';
import { useFilteredPokemons } from '../hooks/useFilteredPokemons';
import PokemonCard from '../components/PokemonCard';
import FilterPanel from '../components/FilterPanel';
import { useFilterStore } from '../store/filterStore';

export default function HomePage() {
  const { selectedType } = useFilterStore();
  const [search, setSearch]   = useState('');

  const {
    pokemons,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFilteredPokemons();

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
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-10 px-6 pt-5 pb-0"
        style={{
          background: 'rgba(10,10,15,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Top row: logo + search */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {/* Pokéball icon */}
              <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white/20
                              relative overflow-hidden shrink-0">
                <div className="absolute inset-0 top-1/2 bg-gray-900" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-900 z-10" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Pokédex</h1>
            </div>

            {/* Search */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 max-w-xs"
              style={{ background: 'rgba(255,255,255,0.06)',
                       border: '1px solid var(--border)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                   style={{ color: 'var(--text-faint)', shrink: 0 }}>
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search pokémon..."
                className="bg-transparent outline-none text-sm w-full"
                style={{ color: 'var(--text-primary)' }}
              />
              {search && (
                <button onClick={() => setSearch('')}
                        style={{ color: 'var(--text-faint)' }}
                        className="text-xs hover:text-white transition-colors">✕</button>
              )}
            </div>
          </div>

          {/* Filter row */}
          <div className="pb-4">
            <FilterPanel />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Count bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-medium" style={{ color: 'var(--text-faint)' }}>
            {isLoading
              ? 'Loading...'
              : `${displayed.length} pokémon${selectedType ? ` · ${selectedType}` : ''}`}
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="rounded-2xl h-48 animate-pulse"
                   style={{ background: 'var(--bg-card)',
                            border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <span className="text-5xl opacity-20">◉</span>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              No pokémon found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayed.map(p => (
              <PokemonCard key={p.name} name={p.name} />
            ))}
          </div>
        )}

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="h-10 mt-8" />
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="w-6 h-6 rounded-full border-2 border-white/20
                            border-t-white animate-spin" />
          </div>
        )}
      </main>
    </div>
  );
}