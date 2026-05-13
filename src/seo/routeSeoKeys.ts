const SIDE_SEGMENTS = new Set([
  'om-oss',
  'meny',
  'priser',
  'kalender',
  'bestill',
  'kontakt',
  'historie',
]);

export type SeoKeyPair = { titleKey: string; descKey: string };

/** Brukes av RouteSeo og enhetstester — map rute til oversettelsesnøkler. */
export function resolveSeoKeys(pathname: string): SeoKeyPair {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') {
    return { titleKey: 'seo.titleHome', descKey: 'seo.descHome' };
  }
  if (path === '/side') {
    return { titleKey: 'seo.titleOmOss', descKey: 'seo.descOmOss' };
  }
  const m = /^\/side\/([^/]+)$/.exec(path);
  if (m) {
    const seg = m[1];
    if (SIDE_SEGMENTS.has(seg)) {
      if (seg === 'om-oss' || seg === 'historie') {
        return { titleKey: 'seo.titleOmOss', descKey: 'seo.descOmOss' };
      }
      if (seg === 'meny' || seg === 'priser') {
        return { titleKey: 'seo.titleMeny', descKey: 'seo.descMeny' };
      }
      if (seg === 'kalender') return { titleKey: 'seo.titleKalender', descKey: 'seo.descKalender' };
      if (seg === 'bestill') return { titleKey: 'seo.titleBestill', descKey: 'seo.descBestill' };
      if (seg === 'kontakt') return { titleKey: 'seo.titleKontakt', descKey: 'seo.descKontakt' };
    }
    return { titleKey: 'seo.titleNotFound', descKey: 'seo.descNotFound' };
  }
  return { titleKey: 'seo.titleNotFound', descKey: 'seo.descNotFound' };
}
