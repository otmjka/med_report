import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import winston from 'winston';

import { Logger } from './logger/index.js';
import Config from './Config.js';

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

    this.server.get('/health', async () => ({ status: 'ok' }));
  }

  getServer() {
    return this.server;
  }

  async startServer() {
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
