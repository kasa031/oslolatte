import { useLanguage } from '../i18n/useLanguage';

export function ShareOsloLatteButton() {
  const { t } = useLanguage();

  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
    return null;
  }

  const site = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '');
  const url = site && /^https?:\/\//i.test(site) ? `${site}/` : window.location.origin + '/';

  return (
    <p className="footer__share">
      <button
        type="button"
        className="btn btn--ghost share-oslolatte-btn"
        aria-label={t('home.shareAria')}
        onClick={() => {
          void navigator.share({
            title: 'OsloLatte',
            text: t('home.heroTitle'),
            url,
          });
        }}
      >
        {t('home.shareLabel')}
      </button>
    </p>
  );
}
