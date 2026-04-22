import * as amqp from 'amqplib';
import winston from 'winston';

import { BrokerParams, EXCHANGE } from './types.js';

export type MessageHandler = (payload: unknown) => Promise<void> | void;

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

    // TODO: reconnect on connection.close / error events.
    // TODO: prefetch tuning per worker type.

    this.logger.info('connected');
  }

  async assertTopology() {
    if (!this.channel) throw new Error('channel not initialized');
    await this.channel.assertExchange(EXCHANGE, 'topic', { durable: true });
    this.logger.info(`exchange asserted: ${EXCHANGE} (topic, durable)`);
  }

  async publish(routingKey: string, payload: unknown) {
    if (!this.channel) throw new Error('channel not initialized');
    const body = Buffer.from(JSON.stringify(payload));
    this.channel.publish(EXCHANGE, routingKey, body, { persistent: true });
    this.logger.info(`published key=${routingKey} bytes=${body.length}`);
  }

  async subscribe(queue: string, routingKey: string, handler: MessageHandler) {
    if (!this.channel) throw new Error('channel not initialized');

    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, EXCHANGE, routingKey);
    this.logger.info(`bound queue=${queue} key=${routingKey}`);

    await this.channel.consume(queue, async (msg) => {
      if (!msg) return;
      try {
        const payload = JSON.parse(msg.content.toString());
        this.logger.info(
          `received queue=${queue} key=${msg.fields.routingKey}`,
        );
        await handler(payload);
        this.channel!.ack(msg);
      } catch (err) {
        this.logger.error(`handler failed queue=${queue}`, err);
        // TODO: dead-letter exchange + retry strategy.
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
