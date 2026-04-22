import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReport } from '@/shared/api';

import { useClient } from './useClient';
import { useClientId } from './useClientId';
import { useClientReports } from './useClientReports';

export const useClientPage = () => {
  const id = useClientId();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useClient();
  const reports = useClientReports();

  const reportMutation = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client', id, 'reports'] });
    },
  });

  const handleMakeReport = () => {
    if (!data) return;
    reportMutation.mutate({
      type: 'cosmofit',
      clientId: data.id,
    });
  };

  return {
    clientItem: { data, isLoading, isError, error },
    reportsItem: {
      data: reports.data,
      isLoading: reports.isLoading,
      isError: reports.isError,
      error: reports.error,
    },
    makeReport: {
      onClick: handleMakeReport,
      isPending: reportMutation.isPending,
      isSuccess: reportMutation.isSuccess,
      isError: reportMutation.isError,
      error: reportMutation.error,
      data: reportMutation.data,
    },
  };
};
