import { describe, expect, it } from 'vitest';
import { PICKUP_SLOT_IDS } from './pickupSlots';

describe('PICKUP_SLOT_IDS', () => {
  it('inneholder forventede id-er i rekkefølge', () => {
    expect([...PICKUP_SLOT_IDS]).toEqual([
      'none',
      'weekday-am',
      'weekday-pm',
      'weekend',
      'flex-call',
    ]);
  });

  it('har ingen duplikater', () => {
    const set = new Set(PICKUP_SLOT_IDS);
    expect(set.size).toBe(PICKUP_SLOT_IDS.length);
  });
});
