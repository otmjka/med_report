import apiUrls from '@/shared/api/apiUrls';

import type { GetClientReportsResponse } from './types';

export const getClientReports = async (
  id: number,
): Promise<GetClientReportsResponse> => {
  const response = await fetch(`${apiUrls.clients}/${id}/reports`);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return (await response.json()) as GetClientReportsResponse;
};
