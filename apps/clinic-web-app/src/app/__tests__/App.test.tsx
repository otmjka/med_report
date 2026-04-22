import { act } from 'react';
import { createMemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';

import { App } from '@/app';
import { appRoutes } from '../appRouter';

describe('App', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders', async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    await act(async () => {
      render(<App appRouter={router} />);
    });

    expect(screen.getByTestId('app-root')).toBeInTheDocument();
  });
});
