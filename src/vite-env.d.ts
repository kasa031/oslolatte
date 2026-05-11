/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Tom = mailto. På Netlify typisk `/api/order` */
  readonly VITE_ORDER_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
