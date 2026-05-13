import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';
import { resolveSeoKeys } from '../seo/routeSeoKeys';

const DEFAULT_OG_IMAGE_PATH = '/Images/Logo1.jpeg';

function resolveOgImagePath(): string {
  const raw = import.meta.env.VITE_OG_IMAGE_PATH?.trim();
  if (!raw) return DEFAULT_OG_IMAGE_PATH;
  return raw.startsWith('/') ? raw : `/${raw}`;
}

const OG_IMAGE_PATH = resolveOgImagePath();

function metaDescription(): HTMLElement | null {
  return document.querySelector('meta[name="description"]');
}

function setOrCreateLink(rel: string, href: string) {
  const sel = `link[rel="${rel}"]`;
  let el = document.querySelector(sel) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Oppdaterer document.title, meta description, Open Graph, Twitter Card og valgfri canonical (VITE_SITE_URL). */
export function RouteSeo() {
  const { pathname } = useLocation();
  const { t, locale } = useLanguage();

  useEffect(() => {
    const { titleKey, descKey } = resolveSeoKeys(pathname);
    const title = t(titleKey);
    const description = t(descKey);
    document.title = title;

    const md = metaDescription();
    if (md) md.setAttribute('content', description);

    setMetaProperty('og:title', title);
    setMetaProperty('og:description', description);
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', description);

    const primaryOg = locale === 'en' ? 'en_US' : 'nb_NO';
    const alternateOg = locale === 'en' ? 'nb_NO' : 'en_US';
    setMetaProperty('og:locale', primaryOg);
    setMetaProperty('og:locale:alternate', alternateOg);

    const site = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '');
    if (site) {
      const pathOnly = pathname.replace(/\/+$/, '') || '/';
      const canonical = pathOnly === '/' ? `${site}/` : `${site}${pathOnly}`;
      setOrCreateLink('canonical', canonical);
      setMetaProperty('og:url', canonical);

      const absImage = `${site}${OG_IMAGE_PATH}`;
      setMetaProperty('og:image', absImage);
      setMetaName('twitter:image', absImage);
    }
  }, [pathname, t, locale]);

  return null;
}
