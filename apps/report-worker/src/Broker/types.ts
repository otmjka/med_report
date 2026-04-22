import { Logger } from '../logger/index.js';
import Config from '../Config.js';

export type BrokerParams = {
  logger: Logger;
  config: Config;
};

export const EXCHANGE = 'reports';

// TODO: extract Broker to a shared package (packages/shared)
// to avoid duplication with report-api.
