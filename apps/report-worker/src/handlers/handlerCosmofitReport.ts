import { logger } from '../logger/index.js';
import {
  CosmofitSource,
  renderCosmofitPdf,
} from '../renderers/index.js';
import { CosmofitHandler } from './types.js';

const handlerLogger = logger.child({ label: 'handlerCosmofitReport' });
const SOURCE_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const handlerCosmofitReport: CosmofitHandler = async ({
  runId,
  clientId,
  artifactsDir,
}) => {
  const url = `${SOURCE_BASE_URL}/users/${clientId}`;
  const response = await globalThis.fetch(url);
  if (!response.ok) {
    throw new Error(
      `cosmofit source fetch failed: ${response.status} ${response.statusText} (${url})`,
    );
  }
  const data = (await response.json()) as CosmofitSource;
  handlerLogger.info('fetched cosmofit source', { runId, clientId });

  const { publicUrl } = await renderCosmofitPdf({ runId, data, artifactsDir });
  return { resultUrl: publicUrl };
};
