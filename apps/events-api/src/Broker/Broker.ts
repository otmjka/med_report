import * as amqp from 'amqplib';
import winston from 'winston';

import { BrokerParams, EXCHANGE, MessageHandler } from './types.js';

class Broker {
  logger: winston.Logger;
  amqpUrl: string;
  connection?: amqp.ChannelModel;
  channel?: amqp.Channel;

  constructor({ logger, config }: BrokerParams) {
    this.logger = logger.child({ label: 'Broker' });
    this.amqpUrl = config.amqpUrl;
  }

  async connect() {
    this.logger.info(`connecting to ${this.amqpUrl}`);
    this.connection = await amqp.connect(this.amqpUrl);
    this.channel = await this.connection.createChannel();
    this.logger.info('connected');
  }

  async assertTopology() {
    if (!this.channel) throw new Error('channel not initialized');
    await this.channel.assertExchange(EXCHANGE, 'topic', { durable: true });
    this.logger.info(`exchange asserted: ${EXCHANGE} (topic, durable)`);
  }

  async subscribeExclusive(routingKeys: string[], handler: MessageHandler) {
    if (!this.channel) throw new Error('channel not initialized');

    const { queue } = await this.channel.assertQueue('', {
      exclusive: true,
      autoDelete: true,
    });
    for (const key of routingKeys) {
      await this.channel.bindQueue(queue, EXCHANGE, key);
    }
    this.logger.info(
      `bound exclusive queue=${queue} keys=${routingKeys.join(',')}`,
    );

    await this.channel.consume(queue, async (msg) => {
      if (!msg) return;
      try {
        const payload = JSON.parse(msg.content.toString());
        await handler(payload, msg.fields.routingKey);
        this.channel!.ack(msg);
      } catch (err) {
        this.logger.error(`handler failed queue=${queue}`, err);
        this.channel!.nack(msg, false, false);
      }
    });
  }

  async close() {
    try {
      await this.channel?.close();
      await this.connection?.close();
      this.logger.info('closed');
    } catch (err) {
      this.logger.error('close failed', err);
    }
  }
}

export default Broker;
