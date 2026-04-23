import { Broker } from './Broker/index.js';
import Config from './Config.js';
import { logger } from './logger/index.js';
import Server from './Server.js';
import { SseHub, subscribeReportEvents } from './Sse/index.js';
import { makeStreamEvents } from './App/index.js';

const rootLogger = logger.child({ label: 'root' });

const start = async () => {
  rootLogger.info('start events-api');

  const config = new Config({ logger });
  const broker = new Broker({ logger, config });
  await broker.connect();
  await broker.assertTopology();

  const server = new Server({ config, logger });
  const sseHub = new SseHub({ logger });

  server.getServer().get('/events', makeStreamEvents(sseHub));

  await subscribeReportEvents(broker, sseHub);
  await server.startServer();

  const shutdown = async (signal: string) => {
    rootLogger.info(`received ${signal}, shutting down`);
    try {
      await server.stopServer();
      await broker.close();
      process.exit(0);
    } catch (err) {
      rootLogger.error('shutdown failed', err);
      process.exit(1);
    }
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

start().catch((err) => {
  rootLogger.error('fatal start error', err);
  process.exit(1);
});
