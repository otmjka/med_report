import { Pool } from 'pg';

export type GeneratorInput = {
  runId: string;
  clientId: number;
  artifactsDir: string;
  pool: Pool;
};

export type GeneratorResult = {
  resultUrl: string;
};

export type Generator = (input: GeneratorInput) => Promise<GeneratorResult>;
