import type { RouteObject } from 'react-router';

import ClientsPage from '../ui/ClientsPage';

export const clientsPageRoute: RouteObject = {
  path: 'clients',
  Component: ClientsPage,
};
