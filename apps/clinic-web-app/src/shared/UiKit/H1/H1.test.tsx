import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import H1 from './H1';
import { expectH1Text } from './H1.expectations';

describe('H1', () => {
  it('renders text', () => {
    render(<H1>Title</H1>);
    expectH1Text('Title');
  });
});
