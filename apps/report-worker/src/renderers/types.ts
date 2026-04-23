export type RendererOutput = {
  filePath: string;
  publicUrl: string;
};

export type Renderer<TData> = (input: {
  runId: string;
  data: TData;
  artifactsDir: string;
}) => Promise<RendererOutput>;
