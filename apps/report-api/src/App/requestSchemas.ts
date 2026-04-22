import { z } from 'zod';
import { reportTypes } from '../reportTypes.js';

export const createReportBody = z.object({
  type: z.enum(reportTypes),
  clientId: z.number().int().positive(),
});
