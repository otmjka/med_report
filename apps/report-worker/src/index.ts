import { validatePayload } from './App/schemas.js';
import { Broker } from './Broker/index.js';
import Config from './Config.js';
import { Db } from './Db/index.js';
import { getGenerator } from './generators/index.js';
import { logger } from './logger/index.js';

const rootLogger = logger.child({ label: 'root' });

const start = async () => {
  rootLogger.info('start worker');

  const config = new Config({ logger });
  const db = new Db({ config, logger });
  const broker = new Broker({ logger, config });

  await db.init();
  await broker.connect();
  await broker.assertTopology();

  await broker.subscribe('q.validate', 'report.*.validate', async (raw) => {
    const payload = validatePayload.parse(raw);
    const { runId, type, clientId } = payload;

    rootLogger.info(`run=${runId} type=${type} clientId=${clientId} start`);

    try {
      await db.setReportRunning(runId);
      const generator = getGenerator(type);
      const { resultUrl } = await generator({ runId, clientId });
      await db.setReportDone(runId, resultUrl);
      rootLogger.info(`run=${runId} done resultUrl=${resultUrl}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      rootLogger.error(`run=${runId} failed: ${message}`);
      await db.setReportFailed(runId, message);
      throw err;
    }
  });

  rootLogger.info('worker ready');

  const shutdown = async (signal: string) => {
    rootLogger.info(`received ${signal}, shutting down`);
    try {
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
