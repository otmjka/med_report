import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import MakeCosmofitButton from './MakeCosmofitButton';
import {
  clickMakeCosmofit,
  expectMakeCosmofitEnabled,
  expectMakeCosmofitPending,
} from './MakeCosmofitButton.expectations';

describe('MakeCosmofitButton', () => {
  it('renders enabled with default text', () => {
    render(<MakeCosmofitButton onClick={() => {}} isPending={false} />);
    expectMakeCosmofitEnabled();
  });

  it('renders pending state', () => {
    render(<MakeCosmofitButton onClick={() => {}} isPending />);
    expectMakeCosmofitPending();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<MakeCosmofitButton onClick={onClick} isPending={false} />);
    await clickMakeCosmofit();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
