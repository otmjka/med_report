import { z } from 'zod';

export const createReportBody = z.object({
  type: z.enum(['cosmofit']),
  userId: z.string().min(1),
});
