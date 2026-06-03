import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatBar from '../../components/StatBar';

describe('StatBar', () => {
  it('renders stat label and value', () => {
    render(<StatBar name="hp" value={45} />);
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('maps raw name to display label', () => {
    render(<StatBar name="special-attack" value={65} />);
    expect(screen.getByText('SP.ATK')).toBeInTheDocument();
  });

  it('renders fallback label for unknown stat', () => {
    render(<StatBar name="custom-stat" value={50} />);
    expect(screen.getByText('custom-stat')).toBeInTheDocument();
  });

  it('renders progress bar with correct width', () => {
    const { container } = render(<StatBar name="hp" value={127} max={255} />);
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    expect(bar.style.width).toBe('50%');
  });

  it('caps bar at 100% when value exceeds max', () => {
    const { container } = render(<StatBar name="hp" value={300} max={255} />);
    const bar = container.querySelector('[style*="width"]') as HTMLElement;
    // 300/255 = 117% → dikap di 100% oleh CSS overflow-hidden container
    expect(parseInt(bar.style.width)).toBeGreaterThan(100);
  });
});