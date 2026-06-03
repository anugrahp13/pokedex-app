import { useEffect, useRef } from 'react';
import { useFilteredPokemons } from '../hooks/useFilteredPokemons';
import PokemonCard from '../components/PokemonCard';
import FilterPanel from '../components/FilterPanel';

export default function HomePage() {
  const {
    pokemons,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFilteredPokemons();

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold tracking-tight mb-3">
            Pokédex
          </h1>
          <FilterPanel />
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 h-44 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-white/40 mb-4">
              {pokemons.length} pokemon
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pokemons.map((p) => (
                <PokemonCard key={p.name} name={p.name} />
              ))}
            </div>

            {/* Sentinel untuk infinite scroll */}
            <div ref={sentinelRef} className="h-10 mt-8" />

            {isFetchingNextPage && (
              <p className="text-center text-white/40 text-sm py-4">
                Loading more...
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}