import { useCallback, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuLiquidHero } from '../components/MenuLiquidHero';
import { OsloLatteLogo } from '../components/OsloLatteLogo';
import { useLanguage } from '../i18n/useLanguage';

export function MenyPanel() {
  const { t } = useLanguage();
  const { pathname, hash } = useLocation();
  const [showSummer, setShowSummer] = useState(false);

  useLayoutEffect(() => {
    if (pathname !== '/side/meny' || hash !== '#priser') return;
    const el = document.getElementById('priser');
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, [pathname, hash]);

  const toggleMenuFace = useCallback(() => {
    setShowSummer((v) => !v);
  }, []);

  return (
    <section className="section section--menus section--panel">
      <div className="section__inner">
        <header className="menu-masthead" aria-labelledby="menu-main-heading">
          <div className="menu-masthead__crest">
            <OsloLatteLogo
              ariaLabel={t('panels.meny.logoAlt')}
              ribbon={t('panels.meny.logoRibbon')}
            />
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
            aria-label={
              showSummer ? t('panels.meny.flipAriaSummer') : t('panels.meny.flipAriaWinter')
            }
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
                    <p className="menu-product__compose-label">
                      {t('panels.meny.latteWinterComposeLabel')}
                    </p>
                    <p className="menu-product__compose">{t('panels.meny.latteWinterCompose')}</p>
                  </div>
                  <div className="menu-product menu-product--kakao">
                    <h4 className="menu-product__name">{t('panels.meny.kakaoWinterName')}</h4>
                    <p className="menu-product__badge">{t('panels.meny.kakaoWinterBadge')}</p>
                    <p className="menu-product__desc">{t('panels.meny.kakaoWinterDesc')}</p>
                    <p className="menu-product__compose-label">
                      {t('panels.meny.kakaoWinterComposeLabel')}
                    </p>
                    <p className="menu-product__compose">{t('panels.meny.kakaoWinterCompose')}</p>
                  </div>
                </div>
                <figure className="menu-card__fig">
                  <img
                    src="/Images/Meny_winter_kort.jpeg"
                    alt={t('panels.meny.imgWinterAlt')}
                    width={979}
                    height={1024}
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
                    <p className="menu-product__compose-label">
                      {t('panels.meny.latteSummerComposeLabel')}
                    </p>
                    <p className="menu-product__compose">{t('panels.meny.latteSummerCompose')}</p>
                  </div>
                  <div className="menu-product menu-product--kakao">
                    <h4 className="menu-product__name">{t('panels.meny.kakaoSummerName')}</h4>
                    <p className="menu-product__badge">{t('panels.meny.kakaoSummerBadge')}</p>
                    <p className="menu-product__desc">{t('panels.meny.kakaoSummerDesc')}</p>
                    <p className="menu-product__compose-label">
                      {t('panels.meny.kakaoSummerComposeLabel')}
                    </p>
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

        <div className="menu-prices" id="priser">
          <h2 className="menu-prices__title">{t('panels.priser.title')}</h2>
          <p className="section__intro menu-prices__intro">{t('panels.priser.intro')}</p>
          <figure className="menu-prices__fig">
            <img
              src="/Images/priser.png"
              alt={t('panels.priser.imgAlt')}
              width={1187}
              height={1040}
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
