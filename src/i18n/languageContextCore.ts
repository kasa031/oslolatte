import { createContext } from 'react';
import type { Locale } from './translations';

export type TranslationFn = (key: string, vars?: Record<string, string | number>) => string;

export type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationFn;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
