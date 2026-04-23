import { describe, expect, it } from 'vitest';

import { parseClientId } from './parseClientId';

describe('parseClientId', () => {
  it('parses a positive integer string', () => {
    expect(parseClientId('42')).toBe(42);
  });

  it.each(['abc', '0', '-1', '1.5', undefined])(
    'throws Response 400 for invalid input %p',
    (input) => {
      try {
        parseClientId(input);
        throw new Error('Expected parseClientId to throw');
      } catch (err) {
        expect(err).toBeInstanceOf(Response);
        expect((err as Response).status).toBe(400);
      }
    },
  );
});
