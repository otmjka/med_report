import apiUrls from '../apiUrls';
import type { GetClientsResponse } from './types';

export const getClients = async (): Promise<GetClientsResponse> => {
  const response = await fetch(apiUrls.clients);
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return (await response.json()) as GetClientsResponse;
};
