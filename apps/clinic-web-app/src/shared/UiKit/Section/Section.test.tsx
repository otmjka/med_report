import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Section from './Section';
import { expectSectionVisible } from './Section.expectations';

describe('Section', () => {
  it('renders children inside section', () => {
    render(
      <Section>
        <span data-testid="section-child">child</span>
      </Section>,
    );
    expectSectionVisible();
    expect(screen.getByTestId('section-child')).toBeInTheDocument();
  });
});
