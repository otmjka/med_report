import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DataSource,
  MockCosmofitSample,
  MockFetchParams,
} from './types.js';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.resolve(currentDir, '..', '..', 'fixtures');

export class MockDataSource
  implements DataSource<MockFetchParams, MockCosmofitSample>
{
  async fetch({ fixtureName }: MockFetchParams): Promise<MockCosmofitSample> {
    const filePath = path.join(fixturesDir, fixtureName);
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw) as MockCosmofitSample;
  }
}
