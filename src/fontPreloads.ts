import cormorantLatinWoff2 from '@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2?url';
import dmSansLatinWoff2 from '@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2?url';
import frauncesLatinWoff2 from '@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2?url';

const FONT_PRELOAD_URLS = [cormorantLatinWoff2, dmSansLatinWoff2, frauncesLatinWoff2] as const;

if (typeof document !== 'undefined') {
  for (const href of FONT_PRELOAD_URLS) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = href;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }
}
