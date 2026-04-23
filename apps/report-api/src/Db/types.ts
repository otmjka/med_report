import { Logger } from '../logger/index.js';
import Config from '../Config.js';

export type DbParams = {
  config: Config;
  logger: Logger;
};

export type Client = {
  id: number;
  name: string;
};

export type InsertClientReportParams = {
  id: string;
  type: string;
  clientId?: number;
};

export type ClientReport = {
  id: string;
  type: string;
  status: string;
  result_url: string | null;
  error: string | null;
  created_at: Date;
  finished_at: Date | null;
};
