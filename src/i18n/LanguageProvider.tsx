import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, type Locale } from './translations';
import {
  LanguageContext,
  type LanguageContextValue,
  type TranslationFn,
} from './languageContextCore';

const STORAGE_KEY = 'oslolatte-lang';

type Dict = Record<string, unknown>;

function readStoredLocale(): Locale | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'nb' || v === 'en') return v;
  } catch {
    /* ignore */
  }
  return null;
}

function lookup(dict: Dict, key: string): string | undefined {
  let cur: unknown = dict;
  for (const part of key.split('.')) {
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = (cur as Dict)[part];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale() ?? 'nb');

  useEffect(() => {
    document.documentElement.lang = locale === 'nb' ? 'no' : 'en';
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);

  const t = useMemo<TranslationFn>(() => {
    return (key, vars) => {
      const raw = lookup(translations[locale] as Dict, key);
      if (raw === undefined) return key;
      if (!vars) return raw;
      let out = raw;
      for (const [k, v] of Object.entries(vars)) {
        out = out.split(`{${k}}`).join(String(v));
      }
      return out;
    };
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
