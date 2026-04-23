import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PageContent from './PageContent';
import { expectPageContentVisible } from './PageContent.expectations';

describe('PageContent', () => {
  it('renders children inside main', () => {
    render(
      <PageContent>
        <span data-testid="page-child">child</span>
      </PageContent>,
    );
    expectPageContentVisible();
    expect(screen.getByTestId('page-child')).toBeInTheDocument();
  });
});
