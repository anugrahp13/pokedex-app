import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Fix: gunakan vi.stubGlobal instead of global.IntersectionObserver
vi.stubGlobal(
  'IntersectionObserver',
  vi.fn().mockImplementation(() => ({
    observe:    vi.fn(),
    unobserve:  vi.fn(),
    disconnect: vi.fn(),
  }))
);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches:            false,
    media:              query,
    onchange:           null,
    addListener:        vi.fn(),
    removeListener:     vi.fn(),
    addEventListener:   vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent:      vi.fn(),
  })),
});