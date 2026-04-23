import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { afterEach, describe, expect, it } from 'vitest';

import apiUrls from '@/shared/api/apiUrls';
import { server } from '@/shared/tests/mocks/node';
import { clientsData } from '@/shared/tests/mocks/clientsData';

import { expectErrorAlertVisible } from '@/shared/UiKit/ErrorAlert/ErrorAlert.expectations';

import ClientPage from './ClientPage';
import {
  clickMakeCosmofit,
  expectMakeCosmofitEnabled,
} from './MakeCosmofitButton.expectations';
import {
  expectClientCardAbsent,
  expectClientCardShows,
  expectClientCardVisible,
} from './ClientCard.expectations';

const renderClientPage = (id: number | string = 1) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/clients/${id}`]}>
        <Routes>
          <Route path="/clients/:id" element={<ClientPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('ClientPage', () => {
  afterEach(() => server.resetHandlers());

  it('renders the client card and reports table after load', async () => {
    renderClientPage(1);

    await waitFor(() => expectClientCardVisible());
    const client = clientsData.find((c) => c.id === 1)!;
    expectClientCardShows(client.id, client.name);
    expectMakeCosmofitEnabled();
    expect(screen.getByTestId('back-to-clients')).toHaveAttribute(
      'href',
      '/clients',
    );
  });

  it('does NOT render the "Make clients summary" button', async () => {
    renderClientPage(1);
    await waitFor(() => expectClientCardVisible());
    expect(screen.queryByTestId('make-clients-report')).not.toBeInTheDocument();
  });

  it('sends POST /reports with type=cosmofit and clientId on click', async () => {
    let receivedBody: unknown = null;
    server.use(
      http.post(apiUrls.reports, async ({ request }) => {
        receivedBody = await request.json();
        return HttpResponse.json({ runId: 'r-new', status: 'pending' });
      }),
    );

    renderClientPage(1);
    await waitFor(() => expectClientCardVisible());

    await clickMakeCosmofit();

    await waitFor(() =>
      expect(receivedBody).toEqual({ type: 'cosmofit', clientId: 1 }),
    );
  });

  it('shows ErrorAlert when GET /clients/:id fails', async () => {
    server.use(
      http.get(`${apiUrls.clients}/:id`, () =>
        HttpResponse.json(null, { status: 500 }),
      ),
    );

    renderClientPage(1);

    await waitFor(() =>
      expectErrorAlertVisible('500', 'Failed to load client'),
    );
    expectClientCardAbsent();
  });

  it('shows ErrorAlert when GET /clients/:id/reports fails', async () => {
    server.use(
      http.get(`${apiUrls.clients}/:id/reports`, () =>
        HttpResponse.json(null, { status: 500 }),
      ),
    );

    renderClientPage(1);
    await waitFor(() => expectClientCardVisible());

    await waitFor(() =>
      expectErrorAlertVisible('500', 'Failed to load reports'),
    );
  });

  it('shows MakeReportError when POST /reports fails', async () => {
    server.use(
      http.post(apiUrls.reports, () =>
        HttpResponse.json(null, { status: 500 }),
      ),
    );

    renderClientPage(1);
    await waitFor(() => expectClientCardVisible());

    await clickMakeCosmofit();

    await waitFor(() =>
      expect(screen.getByTestId('make-report-error')).toHaveTextContent('500'),
    );
  });
});
