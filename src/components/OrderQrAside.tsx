import { useLanguage } from '../i18n/useLanguage';

const QR_TELEGRAM_SRC = '/Images/QRkode_bestilling.png';

/** Statisk QR til Telegram-bestilling (samme grafikk som markedsføringsmateriell). */
export function OrderQrAside() {
  const { t } = useLanguage();

  return (
    <aside className="order-qr" aria-labelledby="order-qr-title">
      <h3 id="order-qr-title" className="order-qr__title">
        {t('home.qrTitle')}
      </h3>
      <figure className="order-qr__figure">
        <img
          className="order-qr__img"
          src={QR_TELEGRAM_SRC}
          alt={t('home.qrAlt')}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="order-qr__caption">{t('home.qrCaption')}</figcaption>
      </figure>
    </aside>
  );
}
