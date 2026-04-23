import { logger } from '../logger/index.js';
import {
  ClientSummaryRow,
  renderClientsSummaryXlsx,
} from '../renderers/index.js';
import { Handler } from './types.js';

const handlerLogger = logger.child({ label: 'handlerClientsSummaryReport' });

type SummaryQueryRow = {
  client_id: number;
  name: string;
  total_reports: string;
  last_report_date: Date | null;
  last_status: string | null;
};

const summarySql = `
  SELECT
    c.id AS client_id,
    c.name AS name,
    COUNT(r.id)::text AS total_reports,
    MAX(r.created_at) AS last_report_date,
    (
      SELECT r2.status
      FROM client_reports r2
      WHERE r2.client_id = c.id
      ORDER BY r2.created_at DESC
      LIMIT 1
    ) AS last_status
  FROM clients c
  LEFT JOIN client_reports r ON r.client_id = c.id
  GROUP BY c.id, c.name
  ORDER BY c.id ASC
`;

export const handlerClientsSummaryReport: Handler = async ({
  runId,
  artifactsDir,
  pool,
}) => {
  const result = await pool.query<SummaryQueryRow>(summarySql);
  handlerLogger.info('fetched clients summary', {
    runId,
    rowCount: result.rows.length,
  });

  const data: ClientSummaryRow[] = result.rows.map((row) => ({
    clientId: row.client_id,
    name: row.name,
    totalReports: Number(row.total_reports),
    lastReportDate: row.last_report_date
      ? row.last_report_date.toISOString()
      : null,
    lastStatus: row.last_status,
  }));

  const { publicUrl } = await renderClientsSummaryXlsx({
    runId,
    data,
    artifactsDir,
  });
  return { resultUrl: publicUrl };
};
