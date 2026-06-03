import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils/renderWithProviders';
import PokemonCard from '../../components/PokemonCard';
import * as pokemonService from '../../api/pokemonService';
import { mockBulbasaur, mockCharizard } from '../utils/mockData';

vi.mock('../../api/pokemonService');
const mockedService = vi.mocked(pokemonService);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PokemonCard', () => {
  it('shows skeleton while loading', () => {
    mockedService.fetchPokemonDetail.mockReturnValue(new Promise(() => {}));

    const { container } = renderWithProviders(<PokemonCard name="bulbasaur" />);

    // Component uses inline style animation, not a CSS class
    const skeleton = container.querySelector('[style*="animation"]') as HTMLElement;
    expect(skeleton).toBeInTheDocument();
    expect(skeleton.style.animation).toContain('pulse');
  });

  it('renders pokemon name after load', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(mockBulbasaur);

    renderWithProviders(<PokemonCard name="bulbasaur" />);

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
  });

  it('renders pokemon id with padding', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(mockBulbasaur);

    renderWithProviders(<PokemonCard name="bulbasaur" />);

    await waitFor(() => {
      expect(screen.getByText('#0001')).toBeInTheDocument();
    });
  });

  it('renders all type badges', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(mockBulbasaur);

    renderWithProviders(<PokemonCard name="bulbasaur" />);

    await waitFor(() => {
      expect(screen.getByText('grass')).toBeInTheDocument();
      expect(screen.getByText('poison')).toBeInTheDocument();
    });
  });

  it('renders official artwork image with alt text', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(mockBulbasaur);

    renderWithProviders(<PokemonCard name="bulbasaur" />);

    await waitFor(() => {
      const img = screen.getByRole('img', { name: 'bulbasaur' });
      expect(img).toHaveAttribute(
        'src',
        'https://example.com/bulbasaur-official.png'
      );
    });
  });

  it('renders link to detail page', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(mockBulbasaur);

    renderWithProviders(<PokemonCard name="bulbasaur" />);

    await waitFor(() => {
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/pokemon/bulbasaur');
    });
  });

  it('renders charizard id correctly', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(mockCharizard);

    renderWithProviders(<PokemonCard name="charizard" />);

    await waitFor(() => {
      expect(screen.getByText('#0006')).toBeInTheDocument();
      expect(screen.getByText('fire')).toBeInTheDocument();
      expect(screen.getByText('flying')).toBeInTheDocument();
    });
  });

  it('returns null when data is undefined after load', async () => {
    mockedService.fetchPokemonDetail.mockResolvedValueOnce(undefined as any);

    const { container } = renderWithProviders(<PokemonCard name="missingno" />);

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});