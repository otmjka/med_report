import { Pool } from 'pg';

export type HandlerInput = {
  runId: string;
  clientId: number;
  artifactsDir: string;
  pool: Pool;
};

export type HandlerResult = {
  resultUrl: string;
};

export type Handler = (input: HandlerInput) => Promise<HandlerResult>;
