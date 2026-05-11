import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { OpeningCalendar } from '../components/OpeningCalendar';
import { OrderForm } from '../components/OrderForm';
import { OrderQrAside } from '../components/OrderQrAside';
import { MenuLiquidHero } from '../components/MenuLiquidHero';
import { OsloLatteLogo } from '../components/OsloLatteLogo';
import { VippsPayment } from '../components/VippsPayment';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP_WA_ME,
} from '../config/contact';
import { useLanguage } from '../i18n/LanguageContext';

export function OmOssPanel() {
  const { t } = useLanguage();

  return (
    <section className="section section--story section--panel panel--bolt-omoss">
      <div className="section__inner">
        <h1 className="panel-title">{t('panels.omOss.title')}</h1>
        <h2 className="panel-subtitle">{t('panels.omOss.subtitle')}</h2>
        <p>{t('panels.omOss.p1')}</p>
        <p>{t('panels.omOss.p2')}</p>
        <figure className="omoss-gate">
          <img
            src="/Images/thereses-gate.png"
            alt={t('panels.omOss.gateAlt')}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{t('panels.omOss.gateCaption')}</figcaption>
        </figure>
        <p className="omoss-dedication">{t('panels.omOss.p3')}</p>
        <p className="muted panel-tip">
          {t('panels.omOss.tipBefore')}
          <Link to="/">{t('panels.omOss.tipHome')}</Link>
          {t('panels.omOss.tipMid')}
          <Link to="/side/bestill">{t('panels.omOss.tipOrder')}</Link>
          {t('panels.omOss.tipEnd')}
        </p>
      </div>
    </section>
  );
}

export function MenyPanel() {
  const { t } = useLanguage();
  const [showSummer, setShowSummer] = useState(false);

  const toggleMenuFace = useCallback(() => {
    setShowSummer((v) => !v);
  }, []);

  return (
    <section className="section section--menus section--panel">
      <div className="section__inner">
        <header className="menu-masthead" aria-labelledby="menu-main-heading">
          <div className="menu-masthead__crest">
            <OsloLatteLogo ariaLabel={t('panels.meny.logoAlt')} ribbon={t('panels.meny.logoRibbon')} />
          </div>
          <p className="menu-masthead__eyebrow">{t('panels.meny.mastheadEyebrow')}</p>
          <p className="menu-masthead__tagline">{t('panels.meny.mastheadTagline')}</p>
        </header>

        <div className="menu-slogan-band">
          <MenuLiquidHero />
          <div className="menu-slogan-band__overlay">
            <p className="menu-slogan-band__line">{t('panels.meny.sloganLine')}</p>
            <p className="menu-slogan-band__sub">{t('panels.meny.sloganSub')}</p>
          </div>
        </div>

        <h1 id="menu-main-heading" className="panel-title menu-page-title">
          {t('panels.meny.title')}
        </h1>
        <p className="section__intro menu-page-intro">{t('panels.meny.intro')}</p>

        <p className="menu-flip-hint">{t('panels.meny.flipHint')}</p>

        <div className="menu-flip-wrap">
          <button
            type="button"
            className="menu-flip-scene"
            aria-label={showSummer ? t('panels.meny.flipAriaSummer') : t('panels.meny.flipAriaWinter')}
            aria-pressed={showSummer}
            onClick={toggleMenuFace}
          >
            <div className={`menu-flip__inner${showSummer ? ' menu-flip__inner--summer' : ''}`}>
              <article className="menu-card menu-card--winter menu-flip__face menu-flip__face--front">
                <div className="menu-card__body">
                  <h3>{t('panels.meny.winterH3')}</h3>
                  <div className="menu-product">
                    <h4 className="menu-product__name">{t('panels.meny.latteWinterName')}</h4>
                    <p className="menu-product__badge">{t('panels.meny.latteWinterBadge')}</p>
                    <p className="menu-product__desc">{t('panels.meny.latteWinterDesc')}</p>
                    <p className="menu-product__compose-label">{t('panels.meny.latteWinterComposeLabel')}</p>
                    <p className="menu-product__compose">{t('panels.meny.latteWinterCompose')}</p>
                  </div>
                  <div className="menu-product menu-product--kakao">
                    <h4 className="menu-product__name">{t('panels.meny.kakaoWinterName')}</h4>
                    <p className="menu-product__badge">{t('panels.meny.kakaoWinterBadge')}</p>
                    <p className="menu-product__desc">{t('panels.meny.kakaoWinterDesc')}</p>
                    <p className="menu-product__compose-label">{t('panels.meny.kakaoWinterComposeLabel')}</p>
                    <p className="menu-product__compose">{t('panels.meny.kakaoWinterCompose')}</p>
                  </div>
                </div>
                <figure className="menu-card__fig">
                  <img
                    src="/Images/Meny_winter.jpeg"
                    alt={t('panels.meny.imgWinterAlt')}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{t('panels.meny.capWinter')}</figcaption>
                </figure>
              </article>

              <article className="menu-card menu-card--summer menu-flip__face menu-flip__face--back">
                <div className="menu-card__body">
                  <h3>{t('panels.meny.summerH3')}</h3>
                  <div className="menu-product">
                    <h4 className="menu-product__name">{t('panels.meny.latteSummerName')}</h4>
                    <p className="menu-product__badge">{t('panels.meny.latteSummerBadge')}</p>
                    <p className="menu-product__desc">{t('panels.meny.latteSummerDesc')}</p>
                    <p className="menu-product__compose-label">{t('panels.meny.latteSummerComposeLabel')}</p>
                    <p className="menu-product__compose">{t('panels.meny.latteSummerCompose')}</p>
                  </div>
                  <div className="menu-product menu-product--kakao">
                    <h4 className="menu-product__name">{t('panels.meny.kakaoSummerName')}</h4>
                    <p className="menu-product__badge">{t('panels.meny.kakaoSummerBadge')}</p>
                    <p className="menu-product__desc">{t('panels.meny.kakaoSummerDesc')}</p>
                    <p className="menu-product__compose-label">{t('panels.meny.kakaoSummerComposeLabel')}</p>
                    <p className="menu-product__compose">{t('panels.meny.kakaoSummerCompose')}</p>
                  </div>
                </div>
                <figure className="menu-card__fig">
                  <img
                    src="/Images/Meny_summer.jpeg"
                    alt={t('panels.meny.imgSummerAlt')}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{t('panels.meny.capSummer')}</figcaption>
                </figure>
              </article>
            </div>
          </button>
        </div>

        <div className="menu-allergy" id="allergener" aria-labelledby="allergener-heading">
          <h3 id="allergener-heading">{t('panels.meny.allergyH3')}</h3>
          <p className="menu-allergy__lead">{t('panels.meny.allergyLead')}</p>
          <p className="menu-allergy__chips-label">{t('panels.meny.allergyChipsLabel')}</p>
          <ul className="menu-allergy__chips">
            <li>{t('panels.meny.allergyChip1')}</li>
            <li>{t('panels.meny.allergyChip2')}</li>
            <li>{t('panels.meny.allergyChip3')}</li>
          </ul>
          <p className="menu-allergy__trace">{t('panels.meny.allergyTraceNote')}</p>
          <p className="menu-allergy__action">{t('panels.meny.allergyAction')}</p>
          <p className="muted menu-allergy__fineprint">{t('panels.meny.allergyP2')}</p>
        </div>
      </div>
    </section>
  );
}

export function KalenderPanel() {
  const { t } = useLanguage();

  return (
    <section className="section section--hours section--panel panel--bolt-kalender">
      <div className="section__inner section__inner--split">
        <div>
          <h1 className="panel-title">{t('panels.kalender.title')}</h1>
          <p>{t('panels.kalender.p1')}</p>
          <p className="muted">
            {t('panels.kalender.p2Before')}
            <strong>{t('panels.kalender.p2Street')}</strong>
            {t('panels.kalender.p2After')}
          </p>
        </div>
        <OpeningCalendar />
      </div>
    </section>
  );
}

export function BestillPanel() {
  const { t } = useLanguage();

  return (
    <section className="section section--order section--panel">
      <div className="section__inner section__inner--order-wide">
        <h1 className="panel-title">{t('panels.bestill.title')}</h1>
        <p>{t('panels.bestill.p1')}</p>
        <p className="muted">
          {t('panels.bestill.tip')}
          <Link to="/">{t('panels.bestill.tipHome')}</Link>
          {t('panels.bestill.tipEnd')}
        </p>
        <div className="order-split">
          <div className="order-split__form">
            <OrderForm />
          </div>
          <OrderQrAside />
        </div>
        <VippsPayment />
      </div>
    </section>
  );
}

export function KontaktPanel() {
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
                <a href={`https://wa.me/${CONTACT_WHATSAPP_WA_ME}`}>{t('panels.kontakt.whatsappChat')}</a>
              </>
            ) : null}
          </p>
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
