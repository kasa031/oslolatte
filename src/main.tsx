import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './fontPreloads';
import '@fontsource-variable/cormorant-garamond/wght.css';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource-variable/dm-sans/wght-italic.css';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource/great-vibes/index.css';
import './index.css';
import App from './App.tsx';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './theme/ThemeContext';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN?.trim();
if (import.meta.env.PROD && sentryDsn) {
  void import('@sentry/react').then((Sentry) => {
    Sentry.init({
      dsn: sentryDsn,
      sendDefaultPii: false,
      /** Unngå støy / misbruk fra andre domener som skulle laste samme bundle. */
      allowUrls: [
        /oslolatte\.no/i,
        /\.netlify\.app/i,
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//i,
      ],
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 0.05,
    });
  });
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js').catch(() => {
      /* f.eks. usikker kontekst eller blokkert — ikke kritisk */
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
