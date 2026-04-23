import { HttpDataSource } from '../dataSources/index.js';
import { logger } from '../logger/index.js';
import { renderCosmofitPdf } from '../renderers/index.js';
import { Generator } from './types.js';

const cosmofitLogger = logger.child({ label: 'generateCosmofit' });

const httpDataSource = new HttpDataSource('https://jsonplaceholder.typicode.com');

export const generateCosmofit: Generator = async ({
  runId,
  clientId,
  artifactsDir,
}) => {
  const data = await httpDataSource.fetch({ userId: clientId });
  cosmofitLogger.info('fetched cosmofit source data', { runId, clientId });
  const { publicUrl } = await renderCosmofitPdf({ runId, data, artifactsDir });
  return { resultUrl: publicUrl };
};
