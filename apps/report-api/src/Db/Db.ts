import { Pool } from 'pg';
import winston from 'winston';

import Config from '../Config.js';
import * as clientsSql from '../sql/clients.js';
import * as clientReportsSql from '../sql/clientReports.js';
import {
  DbParams,
  Client,
  ClientReport,
  InsertClientReportParams,
} from './types.js';

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

  async selectAllClients(): Promise<Client[]> {
    const result = await this.pool.query<Client>(clientsSql.selectAllClients);
    return result.rows;
  }

  async selectClientById(id: number): Promise<Client | null> {
    const result = await this.pool.query<Client>(clientsSql.selectClientById, [
      id,
    ]);
    return result.rows[0] ?? null;
  }

  async selectReportsByClientId(clientId: number): Promise<ClientReport[]> {
    const result = await this.pool.query<ClientReport>(
      clientReportsSql.selectReportsByClientId,
      [clientId],
    );
    return result.rows;
  }

  async insertClientReport({
    id,
    type,
    clientId,
  }: InsertClientReportParams): Promise<void> {
    await this.pool.query(clientReportsSql.insertClientReport, [
      id,
      type,
      clientId,
    ]);
  }

  async close() {
    await this.pool.end();
    this.logger.info('pool closed');
  }
}

export default Db;
