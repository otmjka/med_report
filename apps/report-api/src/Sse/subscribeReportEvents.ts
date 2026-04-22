import { Broker } from '../Broker/index.js';
import SseHub from './SseHub.js';

async function subscribeReportEvents(broker: Broker, hub: SseHub) {
  await broker.subscribeExclusive(
    ['report.*.done', 'report.*.failed'],
    async (payload, routingKey) => {
      const parts = routingKey.split('.');
      const verb = parts[parts.length - 1];
      const event = verb === 'done' ? 'report.done' : 'report.failed';
      hub.broadcast(event, payload);
    },
  );
}

export default subscribeReportEvents;
