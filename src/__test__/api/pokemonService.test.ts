import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import {
  fetchPokemonList,
  fetchPokemonDetail,
  fetchPokemonByType,
} from '../../api/pokemonService';
import { mockBulbasaur } from '../utils/mockData';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchPokemonList', () => {
  it('returns results and count', async () => {
    const payload = {
      results: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
      count: 1302,
    };
    mockedAxios.get.mockResolvedValueOnce({ data: payload });

    const result = await fetchPokemonList(0, 20);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
    );
    expect(result.count).toBe(1302);
    expect(result.results).toHaveLength(1);
    expect(result.results[0].name).toBe('bulbasaur');
  });

  it('uses correct offset and limit params', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { results: [], count: 0 } });

    await fetchPokemonList(40, 10);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon?offset=40&limit=10'
    );
  });

  it('throws when API fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(fetchPokemonList(0)).rejects.toThrow('Network Error');
  });
});

describe('fetchPokemonDetail', () => {
  it('returns pokemon detail by name', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBulbasaur });

    const result = await fetchPokemonDetail('bulbasaur');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );
    expect(result.id).toBe(1);
    expect(result.name).toBe('bulbasaur');
    expect(result.types).toHaveLength(2);
  });

  it('returns pokemon detail by id', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockBulbasaur });

    const result = await fetchPokemonDetail(1);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/1'
    );
    expect(result.name).toBe('bulbasaur');
  });

  it('throws when pokemon not found', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Request failed with status 404'));

    await expect(fetchPokemonDetail('invalidname')).rejects.toThrow('404');
  });
});

describe('fetchPokemonByType', () => {
  it('returns flat list of pokemon for a type', async () => {
    const payload = {
      pokemon: [
        { pokemon: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' } },
        { pokemon: { name: 'ivysaur',   url: 'https://pokeapi.co/api/v2/pokemon/2/' } },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: payload });

    const result = await fetchPokemonByType('grass');

    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/type/grass'
    );
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('bulbasaur');
  });
});