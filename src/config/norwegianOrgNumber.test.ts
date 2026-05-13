import { describe, expect, it } from 'vitest';
import {
  isValidNorwegianOrgNumber9,
  normalizeNorwegianOrgDigits,
  parseNorwegianOrgNumberForJsonLd,
} from './norwegianOrgNumber';

describe('norwegianOrgNumber', () => {
  it('normaliserer mellomrom og NO-prefix', () => {
    expect(normalizeNorwegianOrgDigits('NO 123 456 785')).toBe('123456785');
    expect(normalizeNorwegianOrgDigits('12345678')).toBeNull();
  });

  it('godkjenner kjent gyldig testnummer', () => {
    expect(isValidNorwegianOrgNumber9('123456785')).toBe(true);
  });

  it('avviser feil kontrollsiffer', () => {
    expect(isValidNorwegianOrgNumber9('123456780')).toBe(false);
  });

  it('parseNorwegianOrgNumberForJsonLd returnerer null ved ugyldig', () => {
    expect(parseNorwegianOrgNumberForJsonLd('123456780')).toBeNull();
    expect(parseNorwegianOrgNumberForJsonLd('')).toBeNull();
    expect(parseNorwegianOrgNumberForJsonLd('123456785')).toBe('123456785');
  });
});
