export type ReportFormat = 'pdf' | 'xlsx';

export type ReportTypeDescriptor = {
  type: string;
  label: string;
  format: ReportFormat;
  requiresClient: boolean;
  description: string;
};

export type GetReportTypesResponse = ReportTypeDescriptor[];
