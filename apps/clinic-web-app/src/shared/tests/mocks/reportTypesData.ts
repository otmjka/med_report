import type { GetReportTypesResponse } from '@/entities/reportType';

export const reportTypesData: GetReportTypesResponse = [
  {
    type: 'cosmofit',
    label: 'Cosmofit',
    format: 'pdf',
    requiresClient: true,
    description: 'Per-client PDF report based on external source.',
  },
  {
    type: 'clients-summary',
    label: 'Clients summary',
    format: 'xlsx',
    requiresClient: false,
    description: 'Aggregate XLSX report across all clients.',
  },
];
