import { z } from 'zod';

const clientIdSchema = z.coerce.number().int().positive();

export const parseClientId = (raw: string | undefined): number => {
  const result = clientIdSchema.safeParse(raw);

  if (!result.success) {
    throw new Response('Invalid client ID', { status: 400 });
  }

  return result.data;
};
