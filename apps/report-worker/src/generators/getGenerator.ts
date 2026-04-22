import { ReportType } from '../reportTypes.js';
import { generateCosmofit } from './cosmofit.js';
import { Generator } from './types.js';

export const getGenerator = (type: ReportType): Generator => {
  switch (type) {
    case 'cosmofit':
      return generateCosmofit;
    default: {
      const exhaustive: never = type;
      throw new Error(`no generator for type=${exhaustive}`);
    }
  }
};
