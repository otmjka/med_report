import { z } from 'zod';

export const createReportBody = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('cosmofit'),
    clientId: z.number().int().positive(),
  }),
  z.object({
    type: z.literal('clients-summary'),
  }),
]);
