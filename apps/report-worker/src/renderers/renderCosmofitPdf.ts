import { createWriteStream } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import PDFDocument from 'pdfkit';

import { Renderer } from './types.js';

export type CosmofitSource = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const renderCosmofitPdf: Renderer<CosmofitSource> = async ({
  runId,
  data,
  artifactsDir,
}) => {
  await mkdir(artifactsDir, { recursive: true });
  const fileName = `${runId}.pdf`;
  const filePath = path.join(artifactsDir, fileName);

  await new Promise<void>((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 48 });
    const stream = createWriteStream(filePath);
    stream.on('finish', resolve);
    stream.on('error', reject);
    doc.on('error', reject);
    doc.pipe(stream);

    doc.fontSize(20).text('Cosmofit report', { align: 'left' });
    doc.moveDown(0.5);
    doc.fontSize(10).fillColor('#666').text(`run: ${runId}`);
    doc.fillColor('#000').moveDown();

    doc.fontSize(14).text('Client');
    doc.moveDown(0.3);
    doc.fontSize(11);
    doc.text(`id: ${data.id}`);
    doc.text(`name: ${data.name}`);
    doc.text(`username: ${data.username}`);
    doc.text(`email: ${data.email}`);

    doc.moveDown();
    doc.fontSize(10).fillColor('#888').text(
      `generated at ${new Date().toISOString()}`,
    );

    doc.end();
  });

  return { filePath, publicUrl: `/artifacts/${fileName}` };
};
