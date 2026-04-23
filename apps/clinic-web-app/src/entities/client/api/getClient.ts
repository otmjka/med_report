import apiUrls from '@/shared/api/apiUrls';

import type { GetClientResponse } from './types';

export const getClient = async (id: number): Promise<GetClientResponse> => {
  const response = await fetch(`${apiUrls.clients}/${id}`);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return (await response.json()) as GetClientResponse;
};
