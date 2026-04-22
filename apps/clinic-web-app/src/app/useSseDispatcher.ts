import { useEffect } from 'react';
import { toast } from 'sonner';

import { subscribeSse, type SseEvent } from '@/shared/api/sse';

function handleSseEvent(event: SseEvent) {
  switch (event.name) {
    case 'heartbeat':
      toast.info(`heartbeat ${event.data.ts}`);
      return;
    case 'hello':
      toast.success('SSE connected');
      return;
    case 'report.done':
      toast.success(`Report ${event.data.runId} is ready`);
      return;
    case 'report.failed':
      toast.error(`Report ${event.data.runId} failed: ${event.data.error}`);
      return;
  }
}

function useSseDispatcher() {
  useEffect(() => subscribeSse(handleSseEvent), []);
}

export default useSseDispatcher;
