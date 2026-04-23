import eventsUrl from './eventsUrl';
import type { SseEvent, SseEventName, SseListener } from './types';

const EVENT_NAMES: SseEventName[] = [
  'hello',
  'heartbeat',
  'report.done',
  'report.failed',
];

let eventSource: EventSource | null = null;
const listeners = new Set<SseListener>();

function handleNamedEvent(name: SseEventName, raw: MessageEvent) {
  let data: unknown = null;
  try {
    data = JSON.parse(raw.data);
  } catch {
    data = raw.data;
  }
  const event = { name, data } as SseEvent;
  for (const listener of listeners) {
    listener(event);
  }
}

function ensureConnected() {
  if (eventSource) return;
  eventSource = new EventSource(eventsUrl);
  for (const name of EVENT_NAMES) {
    eventSource.addEventListener(name, (raw) =>
      handleNamedEvent(name, raw as MessageEvent),
    );
  }
}

function disconnectIfIdle() {
  if (listeners.size > 0) return;
  eventSource?.close();
  eventSource = null;
}

export function subscribeSse(listener: SseListener) {
  listeners.add(listener);
  ensureConnected();
  return () => {
    listeners.delete(listener);
    disconnectIfIdle();
  };
}
