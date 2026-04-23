import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import H2 from './H2';
import { expectH2Text } from './H2.expectations';

describe('H2', () => {
  it('renders text', () => {
    render(<H2>Subtitle</H2>);
    expectH2Text('Subtitle');
  });
});
