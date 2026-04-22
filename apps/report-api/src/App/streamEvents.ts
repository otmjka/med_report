import { FastifyReply, FastifyRequest } from 'fastify';

import { SseHub } from '../Sse/index.js';

const HEARTBEAT_INTERVAL_MS = 10_000;

function makeStreamEvents(hub: SseHub) {
  return async function streamEvents(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const origin = request.headers.origin ?? '*';
    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': 'true',
      Vary: 'Origin',
    });

    reply.raw.write(`event: hello\ndata: {"ok":true}\n\n`);
    hub.add(reply.raw);

    const timer = setInterval(() => {
      const payload = JSON.stringify({ ts: new Date().toISOString() });
      reply.raw.write(`event: heartbeat\ndata: ${payload}\n\n`);
    }, HEARTBEAT_INTERVAL_MS);

    request.raw.on('close', () => {
      clearInterval(timer);
      hub.remove(reply.raw);
    });

    return reply;
  };
}

export default makeStreamEvents;
