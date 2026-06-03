import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { fetchPokemonDetail } from '../api/pokemonService';

vi.mock('axios');

describe('fetchPokemonDetail', () => {
  it('returns pokemon data by name', async () => {
    const mock = { id: 1, name: 'bulbasaur', types: [], stats: [], sprites: {} };
    (axios.get as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mock });
    const result = await fetchPokemonDetail('bulbasaur');
    expect(result.name).toBe('bulbasaur');
  });
});