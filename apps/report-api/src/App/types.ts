import { z } from 'zod';
import { Logger } from '../logger/index.js';
import Config from '../Config.js';
import Server from '../Server.js';
import { Broker } from '../Broker/index.js';
import { Db } from '../Db/index.js';
import { createReportBody } from './requestSchemas.js';

export type AppParams = {
  logger: Logger;
  config: Config;
  server: Server;
  broker: Broker;
  db: Db;
};

export type CreateReportBody = z.infer<typeof createReportBody>;

export type IdParams = {
  id: number;
};
