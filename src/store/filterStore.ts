import { create } from 'zustand';

interface FilterStore {
  selectedType: string;
  setType: (type: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedType: '',
  setType: (type) => set({ selectedType: type }),
}));