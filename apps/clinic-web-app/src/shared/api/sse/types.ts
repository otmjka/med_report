export type SseEventName =
  | 'hello'
  | 'heartbeat'
  | 'report.done'
  | 'report.failed';

export type HelloPayload = { ok: boolean };

export type HeartbeatPayload = { ts: string };

export type ReportDonePayload = {
  runId: string;
  clientId: number;
  type: string;
  resultUrl: string;
};

export type ReportFailedPayload = {
  runId: string;
  clientId: number;
  type: string;
  error: string;
};

export type SseEvent =
  | { name: 'hello'; data: HelloPayload }
  | { name: 'heartbeat'; data: HeartbeatPayload }
  | { name: 'report.done'; data: ReportDonePayload }
  | { name: 'report.failed'; data: ReportFailedPayload };

export type SseListener = (event: SseEvent) => void;
