import { QueryCache, QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { toast } from 'sonner';

const asyncLocalStorage = {
  getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key: string, value: string) =>
    Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key: string) =>
    Promise.resolve(window.localStorage.removeItem(key)),
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error('Error while loading');
      console.error(error);
    },
  }),
});

export const localStoragePersister = createAsyncStoragePersister({
  storage: asyncLocalStorage,
});
