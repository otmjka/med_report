import apiUrls from '../apiUrls';
import type { CreateReportRequest, CreateReportResponse } from './types';

export const createReport = async (
  body: CreateReportRequest,
): Promise<CreateReportResponse> => {
  const response = await fetch(apiUrls.reports, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return (await response.json()) as CreateReportResponse;
};
