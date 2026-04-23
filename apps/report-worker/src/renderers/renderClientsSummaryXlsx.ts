import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import ExcelJS from 'exceljs';

import { Renderer } from './types.js';

export type ClientSummaryRow = {
  clientId: number;
  name: string;
  totalReports: number;
  lastReportDate: string | null;
  lastStatus: string | null;
};

export const renderClientsSummaryXlsx: Renderer<ClientSummaryRow[]> = async ({
  runId,
  data,
  artifactsDir,
}) => {
  await mkdir(artifactsDir, { recursive: true });
  const fileName = `${runId}.xlsx`;
  const filePath = path.join(artifactsDir, fileName);

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Clients summary');

  sheet.columns = [
    { header: 'Client ID', key: 'clientId', width: 12 },
    { header: 'Client Name', key: 'name', width: 32 },
    { header: 'Total reports', key: 'totalReports', width: 14 },
    { header: 'Last report date', key: 'lastReportDate', width: 24 },
    { header: 'Last status', key: 'lastStatus', width: 14 },
  ];
  sheet.getRow(1).font = { bold: true };

  for (const row of data) {
    sheet.addRow(row);
  }

  await workbook.xlsx.writeFile(filePath);

  return { filePath, publicUrl: `/artifacts/${fileName}` };
};
