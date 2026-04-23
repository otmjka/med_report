import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import InlineError from './InlineError';
import {
  expectInlineErrorAbsent,
  expectInlineErrorText,
} from './InlineError.expectations';

describe('InlineError', () => {
  it('renders nothing when isError is false', () => {
    render(<InlineError isError={false} error={new Error('boom')} />);
    expectInlineErrorAbsent();
  });

  it('renders Error message when isError is true', () => {
    render(<InlineError isError error={new Error('boom')} />);
    expectInlineErrorText('boom');
  });

  it('stringifies non-Error values', () => {
    render(<InlineError isError error="oops" testId="custom" />);
    expectInlineErrorText('oops', 'custom');
  });
});
