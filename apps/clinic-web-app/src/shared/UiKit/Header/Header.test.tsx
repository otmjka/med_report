import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Header from './Header';
import { expectHeaderVisible } from './Header.expectations';

describe('Header', () => {
  it('renders children inside the header', () => {
    render(
      <Header>
        <span data-testid="header-child">child</span>
      </Header>,
    );
    expectHeaderVisible();
    expect(screen.getByTestId('header-child')).toBeInTheDocument();
  });
});
