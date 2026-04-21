import { z } from 'zod';
import { Logger } from '../logger/index.js';
import Config from '../Config.js';
import Server from '../Server.js';
import { createReportBody } from './requestSchemas.js';

export type AppParams = {
  logger: Logger;
  config: Config;
  server: Server;
};

export type CreateReportBody = z.infer<typeof createReportBody>;
