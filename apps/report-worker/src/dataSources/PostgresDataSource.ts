import { Pool } from 'pg';

import {
  DataSource,
  PostgresClientRow,
  PostgresFetchParams,
} from './types.js';

export class PostgresDataSource
  implements DataSource<PostgresFetchParams, PostgresClientRow>
{
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async fetch({ clientId }: PostgresFetchParams): Promise<PostgresClientRow> {
    const result = await this.pool.query<PostgresClientRow>(
      'SELECT id, name FROM clients WHERE id = $1',
      [clientId],
    );
    const row = result.rows[0];
    if (!row) {
      throw new Error(`client not found: id=${clientId}`);
    }
    return row;
  }

  async query<T extends Record<string, unknown>>(
    sql: string,
    params: unknown[] = [],
  ): Promise<T[]> {
    const result = await this.pool.query<T>(sql, params);
    return result.rows;
  }
}
