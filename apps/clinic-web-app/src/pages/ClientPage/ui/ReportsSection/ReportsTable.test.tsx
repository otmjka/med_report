import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import {
  expectErrorAlertAbsent,
  expectErrorAlertVisible,
} from '@/shared/UiKit/ErrorAlert/ErrorAlert.expectations';

import ReportsTable from './ReportsTable';
import {
  expectReportsTableAbsent,
  expectReportsTableEmpty,
  expectReportsTableHasRow,
} from './ReportsTable.expectations';
import {
  expectReportsTableSkeletonAbsent,
  expectReportsTableSkeletonVisible,
} from './ReportsTableSkeleton.expectations';
import type { ReportsTableState } from './types';

const renderWith = (state: ReportsTableState) =>
  render(<ReportsTable state={state} />);

describe('ReportsTable (smart)', () => {
  it('shows skeleton while loading', () => {
    renderWith({ data: undefined, isLoading: true, displayError: null });
    expectReportsTableSkeletonVisible();
    expectReportsTableAbsent();
    expectErrorAlertAbsent();
  });

  it('shows error alert on error', () => {
    renderWith({
      data: undefined,
      isLoading: false,
      displayError: new Error('boom'),
    });
    expectErrorAlertVisible('boom', 'Failed to load reports');
    expectReportsTableSkeletonAbsent();
    expectReportsTableAbsent();
  });

  it('shows empty placeholder when data is empty', () => {
    renderWith({ data: [], isLoading: false, displayError: null });
    expectReportsTableEmpty();
  });

  it('renders rows when data is present', () => {
    renderWith({
      data: [
        {
          id: 'r-42',
          type: 'cosmofit',
          status: 'done',
          result_url: null,
          error: null,
          created_at: '2026-04-01T10:00:00Z',
          finished_at: '2026-04-01T10:01:00Z',
        },
      ],
      isLoading: false,
      displayError: null,
    });
    expectReportsTableHasRow('r-42');
    expectErrorAlertAbsent();
    expectReportsTableSkeletonAbsent();
  });
});
