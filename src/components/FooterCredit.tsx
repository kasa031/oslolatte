import { useLanguage } from '../i18n/useLanguage';

/** Kreditering nederst i footer (alle hovedlayouter). */
export function FooterCredit() {
  const { t } = useLanguage();
  return <p className="footer__credit">{t('common.footerCredit')}</p>;
}
