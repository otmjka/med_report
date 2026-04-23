import { useQuery } from '@tanstack/react-query';

import { getReports } from '../api/getReports';

export const useReports = () => {
  const query = useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
  });
  const displayError = query.isError ? query.error : null;
  return { ...query, displayError };
};
