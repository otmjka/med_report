export type ReportType = 'cosmofit' | 'clients-summary';

export type CreateReportRequest = {
  type: ReportType;
  clientId?: number;
};

export type CreateReportResponse = {
  runId: string;
  status: 'pending';
};
