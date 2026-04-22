import { createBrowserRouter } from 'react-router';

import { Layout } from '@/shared/UiKit';

import { indexPageRoute } from '@/pages/IndexPage';
import { clientsPageRoute } from '@/pages/ClientsPage';
import { clientPageRoute } from '@/pages/ClientPage';

export const appRoutes = [
  {
    path: '/',
    Component: Layout,
    children: [indexPageRoute, clientsPageRoute, clientPageRoute],
  },
];

const appRouter = createBrowserRouter(appRoutes, {
  basename: import.meta.env.BASE_URL,
});

export default appRouter;
