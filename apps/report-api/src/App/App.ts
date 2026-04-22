import { randomUUID } from 'node:crypto';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import winston from 'winston';
import { z } from 'zod';
import Config from '../Config.js';
import { Broker } from '../Broker/index.js';
import { AppParams, CreateReportBody } from './types.js';
import { createReportBody } from './requestSchemas.js';

class App {
  logger: winston.Logger;
  server: FastifyInstance;
  config: Config;
  broker: Broker;

  constructor(params: AppParams) {
    this.logger = params.logger.child({ label: 'App' });
    this.logger.info('init app');
    this.config = params.config;
    this.server = params.server.getServer();
    this.broker = params.broker;

    this.createReport = this.createReport.bind(this);
  }

  initRoutes() {
    this.server.post('/reports', this.createReport);
  }

  async createReport(
    request: FastifyRequest<{ Body: CreateReportBody }>,
    reply: FastifyReply,
  ) {
    try {
      const { type, userId } = createReportBody.parse(request.body);
      const runId = randomUUID();

      this.logger.info(
        `create report run=${runId} type=${type} userId=${userId}`,
      );

      // TODO: persist run in postgres (report_runs) in the same transaction
      // as an outbox row; a publisher worker would then ship events to the
      // broker. Direct publish below is a shortcut for the MVP.
      await this.broker.publish(`report.${type}.validate`, { runId, userId });

      reply.code(202).send({ runId, status: 'pending' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        reply
          .code(400)
          .send({ error: 'Invalid request body', details: error.errors });
        return;
      }
      this.logger.error('createReport failed', error);
      reply.code(500).send({ error: 'Failed to create report run' });
    }
  }
}

export default App;
