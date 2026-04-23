export type ReportListItem = {
  id: string;
  type: string;
  client_id: number | null;
  client_name: string | null;
  status: string;
  result_url: string | null;
  error: string | null;
  created_at: string;
  finished_at: string | null;
};

export type GetReportsResponse = ReportListItem[];
