import { z } from 'zod';

import { reportTypes } from '../reportTypes.js';

export const validatePayload = z.object({
  runId: z.string().uuid(),
  type: z.enum(reportTypes),
  clientId: z.number().int().positive(),
});

export type ValidatePayload = z.infer<typeof validatePayload>;
