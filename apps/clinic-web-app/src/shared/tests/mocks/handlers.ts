import { http, HttpResponse, type HttpHandler } from 'msw';

import apiUrls from '@/shared/api/apiUrls';

import { clientsData } from './clientsData';
import { clientReportsData } from './clientReportsData';

export const handlers: HttpHandler[] = [
  http.get(apiUrls.clients, () => HttpResponse.json(clientsData)),
  http.get(`${apiUrls.clients}/:id`, ({ params }) => {
    const id = Number(params.id);
    const found = clientsData.find((c) => c.id === id);
    if (!found) return HttpResponse.json(null, { status: 404 });
    return HttpResponse.json(found);
  }),
  http.get(`${apiUrls.clients}/:id/reports`, () =>
    HttpResponse.json(clientReportsData),
  ),
];
