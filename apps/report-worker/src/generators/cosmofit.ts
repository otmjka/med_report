import { sleep } from './sleep.js';
import { Generator } from './types.js';

export const generateCosmofit: Generator = async ({ runId }) => {
  await sleep(2000);
  return { resultUrl: `/artifacts/${runId}.pdf` };
};
