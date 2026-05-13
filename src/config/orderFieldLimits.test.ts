import { describe, expect, it } from 'vitest';
import { ORDER_FIELD_LIMITS, orderFieldsExceedLimits } from './orderFieldLimits';

function payload(over: Partial<Record<keyof typeof ORDER_FIELD_LIMITS, string>> = {}) {
  return {
    name: 'A',
    phone: '1',
    email: '',
    allergies: 'none',
    notes: '',
    productLabel: 'x',
    locale: 'nb',
    pickupSlot: 'none',
    ...over,
  };
}

describe('orderFieldsExceedLimits', () => {
  it('returnerer null når alt er innenfor grenser', () => {
    expect(orderFieldsExceedLimits(payload())).toBeNull();
  });

  it('returnerer feltnøkkel når navn er for langt', () => {
    expect(
      orderFieldsExceedLimits(payload({ name: 'x'.repeat(ORDER_FIELD_LIMITS.name + 1) })),
    ).toBe('name');
  });

  it('returnerer feltnøkkel når telefon overstiger grense', () => {
    expect(
      orderFieldsExceedLimits(payload({ phone: '0'.repeat(ORDER_FIELD_LIMITS.phone + 1) })),
    ).toBe('phone');
  });
});
