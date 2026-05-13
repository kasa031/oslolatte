/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Tom = skjema deaktivert + beskjed om å ringe. På Netlify typisk `/api/order` */
  readonly VITE_ORDER_API_URL?: string;
  /** Kanonisk https-rot (uten trailing slash), f.eks. https://oslolatte.no — RouteSeo og sitemap ved build. */
  readonly VITE_SITE_URL?: string;
  /** Valgfritt token til `<meta name="google-site-verification">` (injiseres i `index.html` ved build). */
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  /** Valgfritt relativ sti til OG/Twitter-delingsbilde (fra rot), f.eks. `/Images/og-share.jpg` — må ligge under `public/`. */
  readonly VITE_OG_IMAGE_PATH?: string;
  /** Valgfritt: Sentry DSN (kun aktiv i produksjonsbygg). Personvern: ikke send PII uten avtale. */
  readonly VITE_SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
