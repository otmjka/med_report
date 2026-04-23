import apiUrls from '@/shared/api/apiUrls';

import type { GetReportTypesResponse } from './types';

export const getReportTypes = async (): Promise<GetReportTypesResponse> => {
  const response = await fetch(apiUrls.reportTypes);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return (await response.json()) as GetReportTypesResponse;
};
