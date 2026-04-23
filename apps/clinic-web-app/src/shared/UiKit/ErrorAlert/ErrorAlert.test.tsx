import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import ErrorAlert from './ErrorAlert';
import {
  expectErrorAlertAbsent,
  expectErrorAlertVisible,
} from './ErrorAlert.expectations';

describe('ErrorAlert', () => {
  it('renders nothing when error is null', () => {
    render(<ErrorAlert error={null} />);
    expectErrorAlertAbsent();
  });

  it('renders Error message and default title', () => {
    render(<ErrorAlert error={new Error('boom')} />);
    expectErrorAlertVisible('boom', 'Error');
  });

  it('renders custom title and stringifies non-Error values', () => {
    render(<ErrorAlert error="oops" title="Failed" />);
    expectErrorAlertVisible('oops', 'Failed');
  });
});
