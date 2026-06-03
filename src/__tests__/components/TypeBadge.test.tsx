import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TypeBadge from '../../components/TypeBadge';

describe('TypeBadge', () => {
  it('renders type name', () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText('fire')).toBeInTheDocument();
  });

  it('applies fire color class', () => {
    render(<TypeBadge type="fire" />);
    const badge = screen.getByText('fire');
    expect(badge.className).toContain('bg-orange-400');
  });

  it('applies water color class', () => {
    render(<TypeBadge type="water" />);
    const badge = screen.getByText('water');
    expect(badge.className).toContain('bg-blue-400');
  });

  it('falls back to gray for unknown type', () => {
    render(<TypeBadge type="unknown-type" />);
    const badge = screen.getByText('unknown-type');
    expect(badge.className).toContain('bg-gray-300');
  });
});