import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../api/pokemonService';

export const usePokemonDetail = (nameOrId: string) =>
  useQuery({
    queryKey: ['pokemon', nameOrId],
    queryFn: () => fetchPokemonDetail(nameOrId),
    staleTime: Infinity,
    enabled: !!nameOrId,
  });