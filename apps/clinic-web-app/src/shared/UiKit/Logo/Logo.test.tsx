import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it } from 'vitest';

import Logo from './Logo';
import { expectLogoVisible } from './Logo.expectations';

const renderLogo = () =>
  render(
    <MemoryRouter>
      <Logo />
    </MemoryRouter>,
  );

describe('Logo', () => {
  it('renders brand link to home', () => {
    renderLogo();
    expectLogoVisible();
  });
});
