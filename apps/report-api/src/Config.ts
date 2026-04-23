import { config as loadEnv } from 'dotenv';
import winston from 'winston';
import { Logger } from './logger/index.js';

enum defaultConfig {
  port = '3001',
  host = '0.0.0.0',
  amqpUrl = 'amqp://medcontrol:medcontrol@rabbitmq:5672',
  dbUrl = 'postgres://medcontrol:medcontrol@postgres:5432/medcontrol',
  artifactsDir = '/artifacts',
}

class Config {
  port: number;
  host: string;
  amqpUrl: string;
  dbUrl: string;
  artifactsDir: string;
  logger: winston.Logger;

  constructor({ logger }: { logger: Logger }) {
    this.logger = logger.child({ label: 'config' });
    loadEnv();
    this.port = parseInt(process.env.PORT || defaultConfig.port, 10);
    this.host = process.env.HOST || defaultConfig.host;
    this.amqpUrl = process.env.AMQP_URL || defaultConfig.amqpUrl;
    this.dbUrl = process.env.DATABASE_URL || defaultConfig.dbUrl;
    this.artifactsDir = process.env.ARTIFACTS_DIR || defaultConfig.artifactsDir;
    this.logger.info(`config loaded port=${this.port} host=${this.host}`);
  }
}

export default Config;
