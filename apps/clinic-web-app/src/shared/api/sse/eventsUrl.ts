const EVENTS_BASE_URL = import.meta.env.VITE_EVENTS_URL;

if (!EVENTS_BASE_URL) {
  throw new Error('VITE_EVENTS_URL is not set');
}

const eventsUrl = `${EVENTS_BASE_URL}/events`;

export default eventsUrl;
