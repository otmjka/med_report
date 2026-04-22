import { FastifyReply, FastifyRequest } from 'fastify';

const HEARTBEAT_INTERVAL_MS = 10_000;

async function streamEvents(request: FastifyRequest, reply: FastifyReply) {
  reply.raw.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });

  reply.raw.write(`event: hello\ndata: {"ok":true}\n\n`);

  const timer = setInterval(() => {
    const payload = JSON.stringify({ ts: new Date().toISOString() });
    reply.raw.write(`event: heartbeat\ndata: ${payload}\n\n`);
  }, HEARTBEAT_INTERVAL_MS);

  request.raw.on('close', () => {
    clearInterval(timer);
  });

  return reply;
}

export default streamEvents;
