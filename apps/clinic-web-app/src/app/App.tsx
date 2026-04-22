import { type FC, StrictMode } from 'react';
import { RouterProvider } from 'react-router';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { queryClient, localStoragePersister } from '@/shared/queryClient';

const App: FC<{
  appRouter: Parameters<typeof RouterProvider>[0]['router'];
}> = ({ appRouter }) => {
  return (
    <StrictMode>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: localStoragePersister }}
      >
        <RouterProvider router={appRouter} />
      </PersistQueryClientProvider>
    </StrictMode>
  );
};

export default App;
