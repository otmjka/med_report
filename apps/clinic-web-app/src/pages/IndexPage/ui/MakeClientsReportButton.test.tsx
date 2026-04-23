import { render } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';

import MakeClientsReportButton from './MakeClientsReportButton';
import {
  clickMakeClientsReport,
  expectMakeClientsReportEnabled,
  expectMakeClientsReportPending,
} from './MakeClientsReportButton.expectations';

describe('MakeClientsReportButton', () => {
  it('renders enabled with default text', () => {
    render(<MakeClientsReportButton onClick={() => {}} isPending={false} />);
    expectMakeClientsReportEnabled();
  });

  it('renders pending state', () => {
    render(<MakeClientsReportButton onClick={() => {}} isPending />);
    expectMakeClientsReportPending();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<MakeClientsReportButton onClick={onClick} isPending={false} />);
    await clickMakeClientsReport();
    expect(onClick).toHaveBeenCalledOnce();
  });
});
