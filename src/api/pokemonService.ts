import axios from 'axios';
import type { PokemonDetail, PokemonListItem } from '../types/pokemon';

const BASE = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (offset: number, limit = 20) => {
  const { data } = await axios.get<{ results: PokemonListItem[]; count: number }>(
    `${BASE}/pokemon?offset=${offset}&limit=${limit}`
  );
  return data;
};

export const fetchPokemonDetail = async (nameOrId: string | number) => {
  const { data } = await axios.get<PokemonDetail>(`${BASE}/pokemon/${nameOrId}`);
  return data;
};

export const fetchPokemonByType = async (type: string) => {
  const { data } = await axios.get<{ pokemon: Array<{ pokemon: PokemonListItem }> }>(
    `${BASE}/type/${type}`
  );
  return data.pokemon.map((p) => p.pokemon);
};