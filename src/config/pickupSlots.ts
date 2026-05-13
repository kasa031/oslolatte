/**
 * Valgfrie hentetider — id sendes til API; tekst i Telegram kommer fra server.
 * Oppdater listen her og i `netlify/functions/order.mjs` (PICKUP_KEYS + PICKUP_LINE_NB).
 */
export const PICKUP_SLOT_IDS = [
  'none',
  'weekday-am',
  'weekday-pm',
  'weekend',
  'flex-call',
] as const;

export type PickupSlotId = (typeof PICKUP_SLOT_IDS)[number];
