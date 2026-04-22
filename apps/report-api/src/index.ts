import { App } from './App/index.js';
import { Broker } from './Broker/index.js';
import Config from './Config.js';
import { Db } from './Db/index.js';
import { logger } from './logger/index.js';
import Server from './Server.js';

const rootLogger = logger.child({ label: 'root' });

const start = async () => {
  rootLogger.info('start app');

  const config = new Config({ logger });
  const broker = new Broker({ logger, config });
  await broker.connect();
  await broker.assertTopology();

  const db = new Db({ config, logger });
  await db.init();

  const server = new Server({ config, logger });
  await server.registerSwagger();
  const app = new App({ logger, config, server, broker, db });

  app.initRoutes();
  await server.startServer();

  const shutdown = async (signal: string) => {
    rootLogger.info(`received ${signal}, shutting down`);
    try {
      await server.stopServer();
      await broker.close();
      await db.close();
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
