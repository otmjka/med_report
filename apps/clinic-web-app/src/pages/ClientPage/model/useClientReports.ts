import { useQuery } from '@tanstack/react-query';

import { getClientReports } from '@/entities/client';

import { useClientId } from './useClientId';

export const useClientReports = () => {
  const id = useClientId();
  const query = useQuery({
    queryKey: ['client', id, 'reports'],
    queryFn: () => getClientReports(id),
  });
  const displayError = query.isError ? query.error : null;
  return { ...query, displayError };
};
