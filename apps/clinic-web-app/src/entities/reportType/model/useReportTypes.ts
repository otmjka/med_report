import { useQuery } from '@tanstack/react-query';

import { getReportTypes } from '../api/getReportTypes';

export const useReportTypes = () => {
  const query = useQuery({
    queryKey: ['report-types'],
    queryFn: getReportTypes,
  });
  const displayError = query.isError ? query.error : null;
  return { ...query, displayError };
};
