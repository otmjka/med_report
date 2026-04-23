import type { GetClientReportsResponse } from '@/entities/client';

export const clientReportsData: GetClientReportsResponse = [
  {
    id: 'r-1',
    type: 'cosmofit',
    status: 'done',
    result_url: '/files/r-1.pdf',
    error: null,
    created_at: '2026-04-01T10:00:00Z',
    finished_at: '2026-04-01T10:01:00Z',
  },
];
