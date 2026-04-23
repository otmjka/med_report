import type { RouteObject } from 'react-router';

import ClientPage from '../ui/ClientPage';

export const clientPageRoute: RouteObject = {
  path: 'clients/:id',
  Component: ClientPage,
};
