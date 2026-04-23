import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReport } from '@/shared/api';

import { useClient } from './useClient';
import { useClientId } from './useClientId';
import { useClientReports } from './useClientReports';

export const useClientPage = () => {
  const id = useClientId();
  const queryClient = useQueryClient();

  const client = useClient();
  const reports = useClientReports();

  const reportMutation = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client', id, 'reports'] });
    },
  });

  const onMakeCosmofit = () => {
    if (!client.data) return;
    reportMutation.mutate({ type: 'cosmofit', clientId: client.data.id });
  };

  return {
    client: {
      data: client.data,
      isLoading: client.isLoading,
      displayError: client.displayError,
    },
    reports: {
      data: reports.data,
      isLoading: reports.isLoading,
      displayError: reports.displayError,
    },
    onMakeCosmofit,
    makeReport: {
      isPending: reportMutation.isPending,
      isSuccess: reportMutation.isSuccess,
      isError: reportMutation.isError,
      error: reportMutation.error,
      data: reportMutation.data,
    },
  };
};
