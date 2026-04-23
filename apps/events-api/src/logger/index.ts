import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.printf(({ timestamp, level, label, message, ...meta }) => {
      const rest = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
      return `${timestamp} [${label ?? 'app'}] ${level}: ${message}${rest}`;
    }),
  ),
  transports: [new winston.transports.Console()],
});

export type Logger = winston.Logger;
