import { Pool } from 'pg';
import winston from 'winston';

import Config from '../Config.js';
import * as clientReportsSql from '../sql/clientReports.js';
import { DbParams } from './types.js';

class Db {
  logger: winston.Logger;
  pool: Pool;
  config: Config;

  constructor({ config, logger }: DbParams) {
    this.logger = logger.child({ label: 'Db' });
    this.config = config;
    this.pool = new Pool({ connectionString: this.config.dbUrl });
  }

  async init() {
    try {
      await this.pool.query('SELECT 1');
      this.logger.info('PostgreSQL connected successfully');
    } catch (err) {
      this.logger.error('Error connecting to PostgreSQL', err);
      throw err;
    }
  }

  async setReportRunning(runId: string): Promise<void> {
    await this.pool.query(clientReportsSql.setReportRunning, [runId]);
  }

  async setReportDone(runId: string, resultUrl: string): Promise<void> {
    await this.pool.query(clientReportsSql.setReportDone, [runId, resultUrl]);
  }

  async setReportFailed(runId: string, error: string): Promise<void> {
    await this.pool.query(clientReportsSql.setReportFailed, [runId, error]);
  }

  async close() {
    await this.pool.end();
    this.logger.info('pool closed');
  }
}

export default Db;
