import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { subscribeSse, type SseEvent } from '@/shared/api/sse';

function useSseDispatcher() {
  const queryClient = useQueryClient();

  useEffect(() => {
    function handleSseEvent(event: SseEvent) {
      switch (event.name) {
        case 'hello':
          toast.success('SSE connected');
          return;
        case 'heartbeat':
          return;
        case 'report.done':
          toast.success(`Report ${event.data.runId} is ready`);
          queryClient.invalidateQueries({
            queryKey: ['client', event.data.clientId, 'reports'],
          });
          return;
        case 'report.failed':
          toast.error(
            `Report ${event.data.runId} failed: ${event.data.error}`,
          );
          queryClient.invalidateQueries({
            queryKey: ['client', event.data.clientId, 'reports'],
          });
          return;
      }
    }

    return subscribeSse(handleSseEvent);
  }, [queryClient]);
}

export default useSseDispatcher;
