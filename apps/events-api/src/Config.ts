import { config as loadEnv } from 'dotenv';
import winston from 'winston';
import { Logger } from './logger/index.js';

enum defaultConfig {
  port = '3002',
  host = '0.0.0.0',
  amqpUrl = 'amqp://medcontrol:medcontrol@rabbitmq:5672',
}

class Config {
  port: number;
  host: string;
  amqpUrl: string;
  logger: winston.Logger;

  constructor({ logger }: { logger: Logger }) {
    this.logger = logger.child({ label: 'config' });
    loadEnv();
    this.port = parseInt(process.env.PORT || defaultConfig.port, 10);
    this.host = process.env.HOST || defaultConfig.host;
    this.amqpUrl = process.env.AMQP_URL || defaultConfig.amqpUrl;
    this.logger.info(`config loaded port=${this.port} host=${this.host}`);
  }
}

export default Config;
