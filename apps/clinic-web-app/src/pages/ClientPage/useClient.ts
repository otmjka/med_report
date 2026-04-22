import { useQuery } from '@tanstack/react-query';

import { getClient } from '@/shared/api';

import { useClientId } from './useClientId';

export const useClient = () => {
  const id = useClientId();

  return useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
  });
};
