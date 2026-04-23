import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';

import { server } from './mocks/node';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

class LocalStorageMock {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = value.toString();
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

global.localStorage = new LocalStorageMock() as unknown as Storage;

class EventSourceMock {
  url: string;
  readyState = 0;
  onopen: ((ev: Event) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;

  constructor(url: string) {
    this.url = url;
  }

  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() {
    return true;
  }
  close() {
    this.readyState = 2;
  }
}

global.EventSource = EventSourceMock as unknown as typeof EventSource;
