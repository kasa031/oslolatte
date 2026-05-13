import { describe, expect, it } from 'vitest';
import { openingSchedule } from './opening';

const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/;
const STATUSES = ['open', 'closed', 'special'] as const;

describe('openingSchedule', () => {
  it('bruker kun ISO-dato-nøkler og gyldige statusverdier', () => {
    for (const [key, status] of Object.entries(openingSchedule)) {
      expect(key).toMatch(DAY_KEY);
      expect(STATUSES).toContain(status as (typeof STATUSES)[number]);
    }
  });
});
