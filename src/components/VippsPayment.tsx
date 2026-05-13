import { VIPPS_ENABLED, VIPPS_PAYMENT_LINK, VIPPS_RECIPIENT_MOBILE } from '../config/vipps';
import { useLanguage } from '../i18n/useLanguage';

function formatMobileDisplay(digits: string) {
  const d = digits.replace(/\D/g, '');
  if (d.length !== 8) return digits;
  return `${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5)}`;
}

export function VippsPayment() {
  const { t } = useLanguage();

  if (!VIPPS_ENABLED) return null;

  const link = VIPPS_PAYMENT_LINK.trim();
  const mobileRaw = VIPPS_RECIPIENT_MOBILE.replace(/\D/g, '');
  const hasLink = link.startsWith('http');
  const hasMobile = mobileRaw.length === 8;

  if (!hasLink && !hasMobile) {
    if (import.meta.env.DEV) {
      return <p className="muted vipps-panel__devhint">{t('vipps.devHint')}</p>;
    }
    return null;
  }

  return (
    <div className="vipps-panel" aria-labelledby="vipps-heading">
      <h3 id="vipps-heading">{t('vipps.title')}</h3>
      <p className="vipps-panel__intro">{t('vipps.intro')}</p>

      {hasLink && (
        <p>
          <a className="btn btn--vipps" href={link} target="_blank" rel="noopener noreferrer">
            {t('vipps.btn')}
          </a>
        </p>
      )}

      {hasMobile && (
        <p className="vipps-panel__manual">
          <strong>{t('vipps.manualPrefix')}</strong>{' '}
          <span className="vipps-panel__digits">{formatMobileDisplay(mobileRaw)}</span>
          {!hasLink && <span className="muted">{t('vipps.manualOnly')}</span>}
          {hasLink && <span className="muted">{t('vipps.manualAlt')}</span>}
        </p>
      )}

      <p className="muted vipps-panel__fineprint">{t('vipps.fineprint')}</p>
    </div>
  );
}
