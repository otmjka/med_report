import { Logger } from '../logger/index.js';
import Config from '../Config.js';

export type BrokerParams = {
  logger: Logger;
  config: Config;
};

export const EXCHANGE = 'reports';
