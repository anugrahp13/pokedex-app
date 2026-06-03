import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TypeBadge from '../../components/TypeBadge';

describe('TypeBadge', () => {
  it('renders type name', () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText('fire')).toBeInTheDocument();
  });

  it('applies fire color style', () => {
    render(<TypeBadge type="fire" />);
    const badge = screen.getByText('fire');
    // Browser converts hex to rgb() format
    expect(badge.style.color).toBe('rgb(239, 159, 39)');
    expect(badge.style.background).toContain('rgba(239, 159, 39');
  });

  it('applies water color style', () => {
    render(<TypeBadge type="water" />);
    const badge = screen.getByText('water');
    expect(badge.style.color).toBe('rgb(133, 183, 235)');
    expect(badge.style.background).toContain('rgba(133, 183, 235');
  });

  it('falls back to default for unknown type', () => {
    render(<TypeBadge type="unknown-type" />);
    const badge = screen.getByText('unknown-type');
    expect(badge.style.color).toBe('rgb(136, 135, 128)');
    expect(badge.style.background).toContain('rgba(136, 135, 128');
  });
});