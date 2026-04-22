export type GeneratorInput = {
  runId: string;
  clientId: number;
};

export type GeneratorResult = {
  resultUrl: string;
};

export type Generator = (input: GeneratorInput) => Promise<GeneratorResult>;
