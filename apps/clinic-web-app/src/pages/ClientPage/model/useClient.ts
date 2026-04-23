import { useQuery } from '@tanstack/react-query';

import { getClient } from '@/entities/client';

import { useClientId } from './useClientId';

export const useClient = () => {
  const id = useClientId();
  const query = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
  });
  const displayError = query.isError ? query.error : null;
  return { ...query, displayError };
};
