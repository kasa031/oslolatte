import { Link, NavLink, Outlet } from 'react-router-dom';
import { LanguageToggle } from '../components/LanguageToggle';
import { flagOpenNowOverride } from '../data/opening';
import { useLanguage } from '../i18n/LanguageContext';
import '../App.css';

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav__link nav__link--active' : 'nav__link';
}

export default function SideLayout() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <div className="page page--side-tabs">
      <a className="skip-link" href="#main-content">
        {t('skip.side')}
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
          <nav className="nav nav--tabs" aria-label={t('side.navAria')}>
            <NavLink to="/side/om-oss" className={navClass} end>
              {t('side.omOss')}
            </NavLink>
            <NavLink to="/side/meny" className={navClass}>
              {t('side.meny')}
            </NavLink>
            <NavLink to="/side/kalender" className={navClass}>
              {t('side.kalender')}
            </NavLink>
            <NavLink to="/side/bestill" className={navClass}>
              {t('side.bestill')}
            </NavLink>
            <NavLink to="/side/kontakt" className={navClass}>
              {t('side.kontakt')}
            </NavLink>
          </nav>
          <LanguageToggle />
        </div>
      </header>

      {flagOpenNowOverride && (
        <div className="banner banner--open" role="status">
          <strong>{t('common.bannerStrong')}</strong> {t('common.bannerRest')}
        </div>
      )}

      <main id="main-content" className="main--single-panel">
        <Outlet />
      </main>

      <footer className="footer">
        <p>
          {t('side.footerTag', { year })}
          <Link to="/side/kontakt">{t('side.footerContact')}</Link>
          {' · '}
          <Link to="/">{t('side.footerHomeOrder')}</Link>
        </p>
      </footer>
    </div>
  );
}
