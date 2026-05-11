import { Link } from 'react-router-dom';
import { LanguageToggle } from '../components/LanguageToggle';
import { OrderForm } from '../components/OrderForm';
import { OrderQrAside } from '../components/OrderQrAside';
import { VippsPayment } from '../components/VippsPayment';
import { flagOpenNowOverride } from '../data/opening';
import { useLanguage } from '../i18n/LanguageContext';
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
        <Link to="/" className="topbar__brand">
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
          <nav className="nav" aria-label={t('home.navAria')}>
            <Link to="/side/om-oss">{t('home.navOmOss')}</Link>
          </nav>
          <LanguageToggle />
        </div>
      </header>

      <main id="top">
        {flagOpenNowOverride && (
          <div className="banner banner--open" role="status">
            <strong>{t('common.bannerStrong')}</strong> {t('common.bannerRest')}
          </div>
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
              <Link to="/side/om-oss">{t('home.heroLeadLink')}</Link>
              {t('home.heroLeadEnd')}
            </p>
          </div>
        </section>

        <section id="bestill" className="section section--order">
          <div className="section__inner section__inner--order-wide">
            <h2 className="visually-hidden">{t('home.orderSr')}</h2>
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
          <Link to="/side/kontakt">{t('home.footerContact')}</Link>
          {' · '}
          <Link to="/side/kalender">{t('home.footerCalendar')}</Link>
        </p>
      </footer>
    </div>
  );
}
