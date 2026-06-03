import type { PokemonDetail } from '../../types/pokemon';

export const mockBulbasaur: PokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://example.com/bulbasaur.png',
    other: {
      'official-artwork': {
        front_default: 'https://example.com/bulbasaur-official.png',
      },
    },
  },
  types: [
    { type: { name: 'grass' } },
    { type: { name: 'poison' } },
  ],
  stats: [
    { base_stat: 45,  stat: { name: 'hp' } },
    { base_stat: 49,  stat: { name: 'attack' } },
    { base_stat: 49,  stat: { name: 'defense' } },
    { base_stat: 65,  stat: { name: 'special-attack' } },
    { base_stat: 65,  stat: { name: 'special-defense' } },
    { base_stat: 45,  stat: { name: 'speed' } },
  ],
  abilities: [
    { ability: { name: 'overgrow' },     is_hidden: false },
    { ability: { name: 'chlorophyll' },  is_hidden: true  },
  ],
  height: 7,
  weight: 69,
};

export const mockCharizard: PokemonDetail = {
  id: 6,
  name: 'charizard',
  sprites: {
    front_default: 'https://example.com/charizard.png',
    other: {
      'official-artwork': {
        front_default: 'https://example.com/charizard-official.png',
      },
    },
  },
  types: [
    { type: { name: 'fire' } },
    { type: { name: 'flying' } },
  ],
  stats: [
    { base_stat: 78,  stat: { name: 'hp' } },
    { base_stat: 84,  stat: { name: 'attack' } },
    { base_stat: 78,  stat: { name: 'defense' } },
    { base_stat: 109, stat: { name: 'special-attack' } },
    { base_stat: 85,  stat: { name: 'special-defense' } },
    { base_stat: 100, stat: { name: 'speed' } },
  ],
  abilities: [
    { ability: { name: 'blaze' },        is_hidden: false },
    { ability: { name: 'solar-power' },  is_hidden: true  },
  ],
  height: 17,
  weight: 905,
};