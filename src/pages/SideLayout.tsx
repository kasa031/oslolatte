import { Suspense } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LanguageToggle } from '../components/LanguageToggle';
import { ThemeToggle } from '../components/ThemeToggle';
import { FooterCredit } from '../components/FooterCredit';
import { SiteLastUpdated } from '../components/SiteLastUpdated';
import { SiteNav } from '../components/SiteNav';
import { flagOpenNowOverride, preLaunch } from '../data/opening';
import { useLanguage } from '../i18n/useLanguage';
import '../App.css';

export default function SideLayout() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <div className="page page--side-tabs">
      <a className="skip-link" href="#main-content">
        {t('skip.side')}
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
          <SiteNav ariaLabel={t('side.navAria')} />
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

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

      <main id="main-content" className="main--single-panel">
        <Suspense
          fallback={
            <div className="section section--panel" role="status" aria-live="polite">
              <div className="section__inner">
                <p className="muted">{t('side.panelLoading')}</p>
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <footer className="footer">
        <p>
          {t('side.footerTag', { year })}
          <Link to="/side/kontakt" viewTransition>
            {t('side.footerContact')}
          </Link>
          {' · '}
          <Link to="/" viewTransition>
            {t('side.footerHomeOrder')}
          </Link>
        </p>
        <SiteLastUpdated />
        <FooterCredit />
      </footer>
    </div>
  );
}
