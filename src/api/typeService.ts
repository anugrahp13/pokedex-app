import axios from 'axios';

export const fetchAllTypes = async (): Promise<string[]> => {
  const { data } = await axios.get<{ results: { name: string }[] }>(
    'https://pokeapi.co/api/v2/type?limit=18'
  );
  return data.results.map((t) => t.name);
};