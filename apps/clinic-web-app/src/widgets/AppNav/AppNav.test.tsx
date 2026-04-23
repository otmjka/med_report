import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it } from 'vitest';

import AppNav from './AppNav';
import { expectAppNavVisible } from './AppNav.expectations';

const renderAppNav = () =>
  render(
    <MemoryRouter>
      <AppNav />
    </MemoryRouter>,
  );

describe('AppNav', () => {
  it('renders navigation links', () => {
    renderAppNav();
    expectAppNavVisible();
  });
});
