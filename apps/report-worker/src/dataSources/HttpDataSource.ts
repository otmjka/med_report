import { DataSource, HttpFetchParams, HttpLabResult } from './types.js';

export class HttpDataSource implements DataSource<HttpFetchParams, HttpLabResult> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async fetch({ userId }: HttpFetchParams): Promise<HttpLabResult> {
    const url = `${this.baseUrl}/users/${userId}`;
    const response = await globalThis.fetch(url);
    if (!response.ok) {
      throw new Error(
        `HttpDataSource fetch failed: ${response.status} ${response.statusText} (${url})`,
      );
    }
    return (await response.json()) as HttpLabResult;
  }
}

