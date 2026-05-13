import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'oslolatte-theme';

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function readInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === 'dark' || raw === 'light') return raw;
  return systemPrefersDark() ? 'dark' : 'light';
}

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(readInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return;
      setThemeState(mq.matches ? 'dark' : 'light');
    };
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY, mode);
    setThemeState(mode);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme må brukes innenfor ThemeProvider');
  return ctx;
}
