import { useQuery } from '@tanstack/react-query';

import { getClients } from '../api/getClients';

export const useClients = () => {
  const query = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });
  const displayError = query.isError ? query.error : null;
  return { ...query, displayError };
};
