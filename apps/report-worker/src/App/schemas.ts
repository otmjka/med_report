import { z } from 'zod';

export const validatePayload = z.discriminatedUnion('type', [
  z.object({
    runId: z.string().uuid(),
    type: z.literal('cosmofit'),
    clientId: z.number().int().positive(),
  }),
  z.object({
    runId: z.string().uuid(),
    type: z.literal('clients-summary'),
  }),
]);

export type ValidatePayload = z.infer<typeof validatePayload>;
