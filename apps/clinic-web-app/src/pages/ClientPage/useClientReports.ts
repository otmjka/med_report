import { useQuery } from '@tanstack/react-query';

import { getClientReports } from '@/shared/api';

import { useClientId } from './useClientId';

export const useClientReports = () => {
  const id = useClientId();

  return useQuery({
    queryKey: ['client', id, 'reports'],
    queryFn: () => getClientReports(id),
  });
};
