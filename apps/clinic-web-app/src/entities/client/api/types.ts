export type Client = {
  id: number;
  name: string;
};

export type GetClientsResponse = Client[];

export type GetClientResponse = Client;

export type Report = {
  id: string;
  type: string;
  status: string;
  result_url: string | null;
  error: string | null;
  created_at: string;
  finished_at: string | null;
};

export type GetClientReportsResponse = Report[];
