import { Link } from 'react-router-dom';
import { LanguageToggle } from '../components/LanguageToggle';
import { ThemeToggle } from '../components/ThemeToggle';
import { FooterCredit } from '../components/FooterCredit';
import { SiteLastUpdated } from '../components/SiteLastUpdated';
import { SiteNav } from '../components/SiteNav';
import { OrderForm } from '../components/OrderForm';
import { OrderQrAside } from '../components/OrderQrAside';
import { ShareOsloLatteButton } from '../components/ShareOsloLatteButton';
import { VippsPayment } from '../components/VippsPayment';
import { flagOpenNowOverride, preLaunch } from '../data/opening';
import { useLanguage } from '../i18n/useLanguage';
import '../App.css';

/** Forside: kun bestilling. Full innhold ligger på /side */
export default function HomeOrder() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <div className="page page--home-order">
      <a className="skip-link" href="#bestill">
        {t('skip.home')}
      </a>
      <header className="topbar">
        <Link to="/" className="topbar__brand" viewTransition>
          <img
            src="/Images/Logo1.jpeg"
            alt=""
            className="topbar__logo"
            width={80}
            height={80}
            decoding="async"
          />
          <span>OsloLatte</span>
        </Link>
        <div className="topbar__nav-wrap">
          <SiteNav ariaLabel={t('home.navAria')} />
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      <main id="top">
        {flagOpenNowOverride ? (
          <div className="banner banner--open" role="status">
            <strong>{t('common.bannerStrong')}</strong> {t('common.bannerRest')}
          </div>
        ) : (
          preLaunch && (
            <div className="banner banner--prelaunch" role="status">
              {t('home.preLaunchBanner')}
            </div>
          )
        )}

        <section className="hero hero--compact">
          <div className="hero__inner">
            <img
              className="hero__logo hero__logo--small"
              src="/Images/Logo1.jpeg"
              alt="OsloLatte logo"
              width={96}
              height={96}
              fetchPriority="high"
            />
            <p className="hero__eyebrow">{t('home.heroEyebrow')}</p>
            <h1 className="hero__title hero__title--compact">{t('home.heroTitle')}</h1>
            <p className="hero__lead hero__lead--compact">
              {t('home.heroLead')}
              <Link to="/side/om-oss" viewTransition>
                {t('home.heroLeadLink')}
              </Link>
              {t('home.heroLeadEnd')}
            </p>
          </div>
        </section>

        <section id="bestill" className="section section--order">
          <div className="section__inner section__inner--order-wide">
            <h2 className="visually-hidden">{t('home.orderSr')}</h2>
            <div className="order-how" aria-labelledby="order-how-title">
              <h3 id="order-how-title" className="order-how__title">
                {t('home.orderHowTitle')}
              </h3>
              <ol className="order-how__list">
                <li>{t('home.orderHow1')}</li>
                <li>{t('home.orderHow2')}</li>
                <li>{t('home.orderHow3')}</li>
                <li>{t('home.orderHow4')}</li>
              </ol>
            </div>
            <div className="order-two-ways" role="region" aria-labelledby="order-two-ways-heading">
              <h3 id="order-two-ways-heading" className="order-two-ways__title">
                {t('panels.bestill.twoWaysTitle')}
              </h3>
              <ol className="order-two-ways__list">
                <li>
                  <span className="order-two-ways__option-title">
                    {t('panels.bestill.option1Title')}
                  </span>
                  {' — '}
                  <span className="order-two-ways__option-body">
                    {t('panels.bestill.option1Body')}
                  </span>
                </li>
                <li>
                  <span className="order-two-ways__option-title">
                    {t('panels.bestill.option2Title')}
                  </span>
                  {' — '}
                  <span className="order-two-ways__option-body">
                    {t('panels.bestill.option2Body')}
                  </span>
                </li>
              </ol>
            </div>
            <div className="order-split">
              <div className="order-split__form">
                <OrderForm />
              </div>
              <OrderQrAside />
            </div>
            <VippsPayment />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          {t('home.footerCopyright', { year })}
          <Link to="/side/kontakt" viewTransition>
            {t('home.footerContact')}
          </Link>
          {' · '}
          <Link to="/side/kalender" viewTransition>
            {t('home.footerCalendar')}
          </Link>
        </p>
        <SiteLastUpdated />
        <ShareOsloLatteButton />
        <FooterCredit />
      </footer>
    </div>
  );
}
