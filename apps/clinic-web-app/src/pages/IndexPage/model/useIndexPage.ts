import { useMutation } from '@tanstack/react-query';

import { createReport } from '@/shared/api';
import { useClients } from '@/entities/client';

export const useIndexPage = () => {
  const clients = useClients();

  const reportMutation = useMutation({
    mutationFn: createReport,
  });

  const onMakeClientsReport = () => {
    reportMutation.mutate({ type: 'clients-summary' });
  };

  return {
    clients: {
      data: clients.data,
      isLoading: clients.isLoading,
      displayError: clients.displayError,
    },
    onMakeClientsReport,
    makeReport: {
      isPending: reportMutation.isPending,
      isSuccess: reportMutation.isSuccess,
      isError: reportMutation.isError,
      error: reportMutation.error,
      data: reportMutation.data,
    },
  };
};
