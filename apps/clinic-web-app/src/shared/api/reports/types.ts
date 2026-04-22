export type ReportType = 'cosmofit';

export type CreateReportRequest = {
  type: ReportType;
  clientId: number;
};

export type CreateReportResponse = {
  runId: string;
  status: 'pending';
};
