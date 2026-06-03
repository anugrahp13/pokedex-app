import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchPokemonList, fetchPokemonByType } from '../api/pokemonService';
import { useFilterStore } from '../store/filterStore';

export const useFilteredPokemons = () => {
  const { selectedType } = useFilterStore();

  const infinite = useInfiniteQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam),
    getNextPageParam: (last, pages) =>
      last.results.length === 20 ? pages.length * 20 : undefined,
    initialPageParam: 0,
    enabled: !selectedType,
  });

  const filtered = useQuery({
    queryKey: ['pokemons', 'type', selectedType],
    queryFn: () => fetchPokemonByType(selectedType),
    enabled: !!selectedType,
    staleTime: Infinity,
  });

  if (selectedType) {
    return {
      pokemons: filtered.data ?? [],
      isLoading: filtered.isLoading,
      hasNextPage: false,
      fetchNextPage: () => {},
      isFetchingNextPage: false,
    };
  }

  const pokemons =
    infinite.data?.pages.flatMap((page) => page.results) ?? [];

  return {
    pokemons,
    isLoading: infinite.isLoading,
    hasNextPage: !!infinite.hasNextPage,
    fetchNextPage: infinite.fetchNextPage,
    isFetchingNextPage: infinite.isFetchingNextPage,
  };
};