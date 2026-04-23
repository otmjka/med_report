import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createReport } from '@/shared/api';
import { useClients } from '@/entities/client';
import { useReports } from '@/entities/report';
import { useReportTypes } from '@/entities/reportType';

export const useIndexPage = () => {
  const clients = useClients();
  const reports = useReports();
  const reportTypes = useReportTypes();
  const queryClient = useQueryClient();

  const reportMutation = useMutation({
    mutationFn: createReport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
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
    reports: {
      data: reports.data,
      isLoading: reports.isLoading,
      displayError: reports.displayError,
    },
    reportTypes: {
      data: reportTypes.data,
      isLoading: reportTypes.isLoading,
      displayError: reportTypes.displayError,
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
