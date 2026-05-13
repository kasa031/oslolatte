import type { Dict } from './translationLeaf.ts';
import { en } from './locales/en.ts';
import { nb } from './locales/nb.ts';

export type Locale = 'nb' | 'en';

/** Språkdata — én fil per locale under ./locales/. */
export const translations: Record<Locale, Dict> = {
  nb,
  en,
};
