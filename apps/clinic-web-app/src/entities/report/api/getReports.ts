import apiUrls from '@/shared/api/apiUrls';

import type { GetReportsResponse } from './types';

export const getReports = async (): Promise<GetReportsResponse> => {
  const response = await fetch(apiUrls.reports);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return (await response.json()) as GetReportsResponse;
};
