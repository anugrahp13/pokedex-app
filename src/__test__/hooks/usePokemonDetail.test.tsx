import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { usePokemonDetail } from '../../hooks/usePokemonDetail';
import * as pokemonService from '../../api/pokemonService';
import { mockBulbasaur } from '../utils/mockData';

vi.mock('../../api/pokemonService');
const mockedService = vi.mocked(pokemonService);

// Wrapper minimal untuk renderHook
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('usePokemonDetail', () => {
  it('starts in loading state', () => {
    mockedService.fetchPokemonDetail.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(
      () => usePokemonDetail('bulbasaur'),
      { wrapper: createWrapper() }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
  });

  it('returns pokemon data on success', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(mockBulbasaur);

    const { result } = renderHook(
      () => usePokemonDetail('bulbasaur'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.name).toBe('bulbasaur');
    expect(result.current.data?.id).toBe(1);
    expect(result.current.data?.types).toHaveLength(2);
  });

  it('sets isError on API failure', async () => {
    mockedService.fetchPokemonDetail.mockRejectedValueOnce(
      new Error('404 Not Found')
    );

    const { result } = renderHook(
      () => usePokemonDetail('invalidname'),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
  });

  it('does not fetch when name is empty', () => {
    const { result } = renderHook(
      () => usePokemonDetail(''),
      { wrapper: createWrapper() }
    );

    // enabled: false → query tidak dijalankan
    expect(result.current.isLoading).toBe(false);
    expect(result.current.fetchStatus).toBe('idle');
    expect(mockedService.fetchPokemonDetail).not.toHaveBeenCalled();
  });

  it('calls fetchPokemonDetail with correct name', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(mockBulbasaur);

    renderHook(
      () => usePokemonDetail('bulbasaur'),
      { wrapper: createWrapper() }
    );

    await waitFor(() =>
      expect(mockedService.fetchPokemonDetail).toHaveBeenCalledWith('bulbasaur')
    );
  });

  it('uses staleTime Infinity (no refetch on remount)', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValue(mockBulbasaur);

    const wrapper = createWrapper();

    const { unmount } = renderHook(
      () => usePokemonDetail('bulbasaur'),
      { wrapper }
    );

    await waitFor(() =>
      expect(mockedService.fetchPokemonDetail).toHaveBeenCalledTimes(1)
    );

    unmount();

    renderHook(() => usePokemonDetail('bulbasaur'), { wrapper });

    // Tidak fetch ulang karena staleTime Infinity + cache masih ada
    await waitFor(() =>
      expect(mockedService.fetchPokemonDetail).toHaveBeenCalledTimes(1)
    );
  });
});