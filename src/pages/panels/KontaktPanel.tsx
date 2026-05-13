import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_WA_ME,
} from '../../config/contact';
import { useLanguage } from '../../i18n/useLanguage';

export default function KontaktPanel() {
  const { t } = useLanguage();

  return (
    <section className="section section--contact section--panel">
      <div className="section__inner section__inner--contact">
        <div className="contact-hero">
          <h1 className="panel-title">{t('panels.kontakt.title')}</h1>
          <p>{t('panels.kontakt.intro')}</p>
          <p>
            <strong>{t('panels.kontakt.email')}</strong>{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <br />
            <strong>{t('panels.kontakt.phone')}</strong>{' '}
            <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
            {CONTACT_WHATSAPP_WA_ME ? (
              <>
                <br />
                <strong>{t('panels.kontakt.whatsapp')}</strong>{' '}
                <a href={`https://wa.me/${CONTACT_WHATSAPP_WA_ME}`}>
                  {t('panels.kontakt.whatsappChat')}
                </a>
              </>
            ) : null}
          </p>
        </div>
        <div className="contact-faq" aria-labelledby="contact-faq-title">
          <h2 id="contact-faq-title" className="contact-faq__title">
            {t('panels.kontakt.faqTitle')}
          </h2>
          <dl className="contact-faq__list">
            <div className="contact-faq__item">
              <dt>{t('panels.kontakt.faq1q')}</dt>
              <dd>{t('panels.kontakt.faq1a')}</dd>
            </div>
            <div className="contact-faq__item">
              <dt>{t('panels.kontakt.faq2q')}</dt>
              <dd>{t('panels.kontakt.faq2a')}</dd>
            </div>
            <div className="contact-faq__item">
              <dt>{t('panels.kontakt.faq3q')}</dt>
              <dd>{t('panels.kontakt.faq3a')}</dd>
            </div>
            <div className="contact-faq__item">
              <dt>{t('panels.kontakt.faq4q')}</dt>
              <dd>{t('panels.kontakt.faq4a')}</dd>
            </div>
          </dl>
        </div>
        <div className="contact-privacy" id="personvern">
          <h3>{t('panels.kontakt.privacyH3')}</h3>
          <p>{t('panels.kontakt.privacyP1')}</p>
          <p className="muted">{t('panels.kontakt.privacyP2')}</p>
          <p className="muted">{t('panels.kontakt.privacyCookies')}</p>
        </div>
      </div>
    </section>
  );
}
