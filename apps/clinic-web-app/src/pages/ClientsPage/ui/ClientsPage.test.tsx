import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { afterEach, describe, it } from 'vitest';

import apiUrls from '@/shared/api/apiUrls';
import { server } from '@/shared/tests/mocks/node';
import { clientsData } from '@/shared/tests/mocks/clientsData';

import { expectH1Text } from '@/shared/UiKit/H1/H1.expectations';
import { expectPageContentVisible } from '@/shared/UiKit/PageContent/PageContent.expectations';
import {
  expectErrorAlertAbsent,
  expectErrorAlertVisible,
} from '@/shared/UiKit/ErrorAlert/ErrorAlert.expectations';
import {
  expectClientsTableSkeletonAbsent,
  expectClientsTableSkeletonVisible,
} from '@/entities/client/ui/ClientsTableSkeleton/ClientsTableSkeleton.expectations';
import {
  expectClientsTableAbsent,
  expectClientsTableHasRows,
} from '@/entities/client/ui/ClientsTable/ClientsTable.expectations';

import ClientsPage from './ClientsPage';

const renderClientsPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ClientsPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('ClientsPage', () => {
  afterEach(() => server.resetHandlers());

  it('shows skeleton initially, then renders the table with clients', async () => {
    renderClientsPage();

    expectPageContentVisible();
    expectH1Text('Clients');
    expectClientsTableSkeletonVisible();
    expectClientsTableAbsent();
    expectErrorAlertAbsent();

    await waitFor(() => expectClientsTableSkeletonAbsent());
    expectClientsTableHasRows(clientsData.map((c) => c.name));
    expectErrorAlertAbsent();
  });

  it('shows ErrorAlert when the request fails', async () => {
    server.use(
      http.get(apiUrls.clients, () => HttpResponse.json(null, { status: 500 })),
    );

    renderClientsPage();

    await waitFor(() =>
      expectErrorAlertVisible('500', 'Failed to load clients'),
    );
    expectClientsTableSkeletonAbsent();
    expectClientsTableAbsent();
  });
});
