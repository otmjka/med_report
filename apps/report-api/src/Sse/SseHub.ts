import { ServerResponse } from 'node:http';
import winston from 'winston';

import { Logger } from '../logger/index.js';

class SseHub {
  logger: winston.Logger;
  private clients = new Set<ServerResponse>();

  constructor({ logger }: { logger: Logger }) {
    this.logger = logger.child({ label: 'SseHub' });
  }

  add(res: ServerResponse) {
    this.clients.add(res);
    this.logger.info(`client added, total=${this.clients.size}`);
  }

  remove(res: ServerResponse) {
    this.clients.delete(res);
    this.logger.info(`client removed, total=${this.clients.size}`);
  }

  broadcast(event: string, data: unknown) {
    const frame = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const res of this.clients) {
      res.write(frame);
    }
    this.logger.info(`broadcast event=${event} clients=${this.clients.size}`);
  }
}

export default SseHub;
