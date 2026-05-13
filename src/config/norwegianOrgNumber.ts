/**
 * Norsk organisasjonsnummer (9 siffer) med kontrollsiffer (modulus 11).
 * Brukes av Vite ved build for JSON-LD — ikke hardkod nummer i kildekode.
 */

/** Returnerer 9 siffer uten mellomrom, eller null. */
export function normalizeNorwegianOrgDigits(input: string | undefined): string | null {
  if (!input?.trim()) return null;
  const d = input.replace(/\D/g, '');
  return d.length === 9 ? d : null;
}

/** Modulus 11, vekt 3-2-7-6-5-4-3-2 på de åtte første sifrene. */
export function isValidNorwegianOrgNumber9(digits: string): boolean {
  if (!/^\d{9}$/.test(digits)) return false;
  const weights = [3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(digits[i], 10) * weights[i];
  }
  let ctrl = (11 - (sum % 11)) % 11;
  if (ctrl === 10) return false;
  if (ctrl === 11) ctrl = 0;
  return ctrl === parseInt(digits[8], 10);
}

/** Normaliser og valider — klar for JSON-LD / miljøvariabel. */
export function parseNorwegianOrgNumberForJsonLd(input: string | undefined): string | null {
  const d = normalizeNorwegianOrgDigits(input);
  if (!d) return null;
  return isValidNorwegianOrgNumber9(d) ? d : null;
}
