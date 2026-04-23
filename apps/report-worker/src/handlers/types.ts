import { Pool } from 'pg';

export type HandlerInput = {
  runId: string;
  artifactsDir: string;
  pool: Pool;
};

export type CosmofitHandlerInput = HandlerInput & {
  clientId: number;
};

export type HandlerResult = {
  resultUrl: string;
};

export type Handler = (input: HandlerInput) => Promise<HandlerResult>;

export type CosmofitHandler = (
  input: CosmofitHandlerInput,
) => Promise<HandlerResult>;
