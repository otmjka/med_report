import fastify, { FastifyError, FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import winston from 'winston';
import { z } from 'zod';

import { Logger } from './logger/index.js';
import Config from './Config.js';
import { HttpError } from './errors.js';

const healthSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
      },
    },
  },
};

class Server {
  logger: winston.Logger;
  config: Config;
  server: FastifyInstance;

  constructor({ config, logger }: { config: Config; logger: Logger }) {
    this.logger = logger.child({ label: 'Server' });
    this.config = config;
    this.logger.info('init');

    this.server = fastify({
      logger: true,
      ignoreTrailingSlash: true,
    });

    this.server.register(cors, { origin: true });

    this.server.setErrorHandler((error, _request, reply) => {
      if (error instanceof z.ZodError) {
        reply
          .code(400)
          .send({ error: 'Invalid request', details: error.errors });
        return;
      }
      if (error instanceof HttpError) {
        reply.code(error.statusCode).send({ error: error.message });
        return;
      }
      const fastifyError = error as FastifyError;
      if (fastifyError.validation) {
        reply
          .code(400)
          .send({
            error: fastifyError.message,
            details: fastifyError.validation,
          });
        return;
      }
      this.logger.error('unhandled error', error);
      reply.code(500).send({ error: 'Internal server error' });
    });
  }

  async registerSwagger() {
    await this.server.register(swagger, {
      openapi: {
        info: {
          title: 'Report API',
          description: 'Report Platform API',
          version: '0.1.0',
        },
      },
    });
    await this.server.register(swaggerUi, { routePrefix: '/docs' });
    this.server.get(
      '/health',
      { schema: healthSchema },
      async () => this.checkHealth(),
    );
  }

  getServer() {
    return this.server;
  }

  async checkHealth() {
    return { status: 'ok' };
  }

  async startServer() {
    if (!this.server) {
      throw new Error('server not initialized');
    }
    await this.server.listen({
      port: this.config.port,
      host: this.config.host,
    });
    this.logger.info(`Server listening on port ${this.config.port}`);
  }

  async stopServer() {
    await this.server.close();
    this.logger.info('Server closed');
  }
}

export default Server;
