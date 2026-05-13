import { useMemo } from 'react';
import { SITE_CONTENT_UPDATED_ISO } from '../config/siteMeta';
import { useLanguage } from '../i18n/useLanguage';

export function SiteLastUpdated() {
  const { t, locale } = useLanguage();
  const dateLabel = useMemo(
    () =>
      new Date(`${SITE_CONTENT_UPDATED_ISO}T12:00:00`).toLocaleDateString(
        locale === 'nb' ? 'nb-NO' : 'en-GB',
        { year: 'numeric', month: 'long', day: 'numeric' },
      ),
    [locale],
  );

  return (
    <p className="footer__meta" role="note">
      {t('common.siteLastUpdated', { date: dateLabel })}
    </p>
  );
}
