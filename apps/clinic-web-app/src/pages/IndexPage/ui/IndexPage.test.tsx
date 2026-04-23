import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { afterEach, describe, expect, it } from 'vitest';

import apiUrls from '@/shared/api/apiUrls';
import { server } from '@/shared/tests/mocks/node';
import { clientsData } from '@/shared/tests/mocks/clientsData';

import { expectH1Text } from '@/shared/UiKit/H1/H1.expectations';
import { expectH2Text } from '@/shared/UiKit/H2/H2.expectations';
import { expectSectionVisible } from '@/shared/UiKit/Section/Section.expectations';
import { expectPageContentVisible } from '@/shared/UiKit/PageContent/PageContent.expectations';
import {
  expectClientsTableSkeletonAbsent,
  expectClientsTableSkeletonVisible,
} from '@/entities/client/ui/ClientsTableSkeleton/ClientsTableSkeleton.expectations';
import { expectClientsTableHasRows } from '@/entities/client/ui/ClientsTable/ClientsTable.expectations';
import {
  expectErrorAlertVisible,
} from '@/shared/UiKit/ErrorAlert/ErrorAlert.expectations';
import { expectInlineErrorText } from '@/shared/UiKit/InlineError/InlineError.expectations';

import IndexPage from './IndexPage';
import {
  clickMakeClientsReport,
  expectMakeClientsReportEnabled,
} from './MakeClientsReportButton.expectations';

const renderIndexPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('IndexPage (Dashboard)', () => {
  afterEach(() => server.resetHandlers());

  it('renders Dashboard layout with Clients section and table', async () => {
    renderIndexPage();

    expectPageContentVisible();
    expectH1Text('Dashboard');
    expectSectionVisible();
    expectH2Text('Clients');
    expectMakeClientsReportEnabled();
    expectClientsTableSkeletonVisible();

    await waitFor(() => expectClientsTableSkeletonAbsent());
    expectClientsTableHasRows(clientsData.map((c) => c.name));
  });

  it('sends POST /reports without clientId on click', async () => {
    let receivedBody: unknown = null;
    server.use(
      http.post(apiUrls.reports, async ({ request }) => {
        receivedBody = await request.json();
        return HttpResponse.json({ runId: 'r1', status: 'pending' });
      }),
    );

    renderIndexPage();
    await waitFor(() => expectClientsTableSkeletonAbsent());

    await clickMakeClientsReport();

    await waitFor(() =>
      expect(receivedBody).toEqual({ type: 'clients-summary' }),
    );
  });

  it('shows ErrorAlert when GET /clients fails', async () => {
    server.use(
      http.get(apiUrls.clients, () => HttpResponse.json(null, { status: 500 })),
    );

    renderIndexPage();

    await waitFor(() =>
      expectErrorAlertVisible('500', 'Failed to load clients'),
    );
    expectClientsTableSkeletonAbsent();
  });

  it('shows InlineError when POST /reports fails', async () => {
    server.use(
      http.post(apiUrls.reports, () =>
        HttpResponse.json(null, { status: 500 }),
      ),
    );

    renderIndexPage();
    await waitFor(() => expectClientsTableSkeletonAbsent());

    await clickMakeClientsReport();

    await waitFor(() =>
      expectInlineErrorText('500', 'make-clients-report-error'),
    );
  });
});
