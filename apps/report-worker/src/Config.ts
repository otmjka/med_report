import { config as loadEnv } from 'dotenv';
import winston from 'winston';
import { Logger } from './logger/index.js';

enum defaultConfig {
  amqpUrl = 'amqp://medcontrol:medcontrol@rabbitmq:5672',
  dbUrl = 'postgres://medcontrol:medcontrol@postgres:5432/medcontrol',
}

class Config {
  amqpUrl: string;
  dbUrl: string;
  logger: winston.Logger;

  constructor({ logger }: { logger: Logger }) {
    this.logger = logger.child({ label: 'config' });
    loadEnv();
    this.amqpUrl = process.env.AMQP_URL || defaultConfig.amqpUrl;
    this.dbUrl = process.env.DATABASE_URL || defaultConfig.dbUrl;
    this.logger.info(`config loaded amqpUrl=${this.amqpUrl} dbUrl=${this.dbUrl}`);
  }
}

export default Config;
