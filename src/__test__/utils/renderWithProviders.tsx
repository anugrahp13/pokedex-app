import { ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// QueryClient khusus test: retry off, no logging
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
    logger: {
      log:   () => {},
      warn:  () => {},
      error: () => {},
    },
  });

interface WrapperOptions extends RenderOptions {
  initialEntries?: string[];
  routePath?: string;
}

export function renderWithProviders(
  ui: ReactNode,
  {
    initialEntries = ['/'],
    routePath = '/',
    ...options
  }: WrapperOptions = {}
) {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path={routePath} element={children} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient,
  };
}