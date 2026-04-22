import type { RouteObject } from 'react-router';

import ClientsPage from './ClientsPage';

export const clientsPageRoute: RouteObject = {
  path: 'clients',
  Component: ClientsPage,
};
