/**
 * Maksfeltlengder for bestilling — hold i synk med `netlify/functions/order.mjs`.
 */
export const ORDER_FIELD_LIMITS = {
  name: 120,
  phone: 40,
  email: 254,
  allergies: 2000,
  notes: 2000,
  productLabel: 200,
  locale: 12,
  pickupSlot: 24,
} as const;

export type OrderFieldLimitKey = keyof typeof ORDER_FIELD_LIMITS;

export function orderFieldsExceedLimits(payload: {
  name: string;
  phone: string;
  email: string;
  allergies: string;
  notes: string;
  productLabel: string;
  locale: string;
  pickupSlot: string;
}): OrderFieldLimitKey | null {
  const entries = Object.entries(ORDER_FIELD_LIMITS) as [OrderFieldLimitKey, number][];
  for (const [key, max] of entries) {
    const v = payload[key];
    if (typeof v === 'string' && v.length > max) return key;
  }
  return null;
}
