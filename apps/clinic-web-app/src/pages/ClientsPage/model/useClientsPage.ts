import { useClients } from '@/entities/client';

export const useClientsPage = () => {
  const clients = useClients();
  return {
    clients: {
      data: clients.data,
      isLoading: clients.isLoading,
      displayError: clients.displayError,
    },
  };
};
