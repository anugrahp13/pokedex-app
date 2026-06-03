import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../api/pokemonService';

export const useInfinitePokemons = () =>
  useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam),
    getNextPageParam: (last, pages) =>
      last.results.length === 20 ? pages.length * 20 : undefined,
    initialPageParam: 0,
  });