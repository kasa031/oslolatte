import { useLanguage } from '../i18n/LanguageContext';

/** QR til samme nettside — for plakat og rask tilgang fra mobil. */
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
          src="/Images/QRkode_bestilling.png"
          alt={t('home.qrAlt')}
          width={220}
          height={220}
          decoding="async"
        />
        <figcaption className="order-qr__caption">{t('home.qrCaption')}</figcaption>
      </figure>
    </aside>
  );
}
