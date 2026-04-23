import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it } from 'vitest';

import {
  expectErrorAlertAbsent,
  expectErrorAlertVisible,
} from '@/shared/UiKit/ErrorAlert/ErrorAlert.expectations';

import ClientsTable from './ClientsTable';
import {
  expectClientsTableAbsent,
  expectClientsTableEmpty,
  expectClientsTableHasRows,
} from './ClientsTable.expectations';
import {
  expectClientsTableSkeletonAbsent,
  expectClientsTableSkeletonVisible,
} from '../ClientsTableSkeleton/ClientsTableSkeleton.expectations';

import type { ClientsTableState } from './types';

const renderWith = (state: ClientsTableState) =>
  render(
    <MemoryRouter>
      <ClientsTable state={state} />
    </MemoryRouter>,
  );

describe('ClientsTable (smart)', () => {
  it('shows skeleton while loading', () => {
    renderWith({ data: undefined, isLoading: true, displayError: null });
    expectClientsTableSkeletonVisible();
    expectClientsTableAbsent();
    expectErrorAlertAbsent();
  });

  it('shows error alert on error', () => {
    renderWith({
      data: undefined,
      isLoading: false,
      displayError: new Error('boom'),
    });
    expectErrorAlertVisible('boom', 'Failed to load clients');
    expectClientsTableSkeletonAbsent();
    expectClientsTableAbsent();
  });

  it('renders rows when data is present', () => {
    renderWith({
      data: [
        { id: 1, name: 'Acme Clinic' },
        { id: 2, name: 'Wellness Center' },
      ],
      isLoading: false,
      displayError: null,
    });
    expectClientsTableHasRows(['Acme Clinic', 'Wellness Center']);
    expectClientsTableSkeletonAbsent();
    expectErrorAlertAbsent();
  });

  it('shows empty placeholder when data is empty', () => {
    renderWith({ data: [], isLoading: false, displayError: null });
    expectClientsTableEmpty();
  });
});
