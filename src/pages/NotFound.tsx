import { Link } from 'react-router-dom';
import { FooterCredit } from '../components/FooterCredit';
import { LanguageToggle } from '../components/LanguageToggle';
import { ThemeToggle } from '../components/ThemeToggle';
import { SiteNav } from '../components/SiteNav';
import { useLanguage } from '../i18n/useLanguage';
import '../App.css';

/** Ukjent toppnivå-URL (utenfor / og /side/…). */
export function NotFoundPage() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <div className="page page--not-found">
      <a className="skip-link" href="#nf-main">
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

      <main id="nf-main" className="not-found-main">
        <div className="section__inner not-found-main__inner">
          <p className="not-found-main__code" aria-hidden="true">
            404
          </p>
          <h1 className="not-found-main__title">{t('common.notFoundTitle')}</h1>
          <p className="not-found-main__lead">{t('common.notFoundLead')}</p>
          <p className="not-found-main__links">
            <Link to="/" viewTransition>
              {t('common.notFoundHome')}
            </Link>
            {' · '}
            <Link to="/side/kontakt" viewTransition>
              {t('common.notFoundContact')}
            </Link>
            {' · '}
            <Link to="/side/om-oss" viewTransition>
              {t('common.notFoundSide')}
            </Link>
          </p>
        </div>
      </main>

      <footer className="footer">
        <p>
          {t('home.footerCopyright', { year })}
          <Link to="/side/kontakt" viewTransition>
            {t('home.footerContact')}
          </Link>
        </p>
        <FooterCredit />
      </footer>
    </div>
  );
}

/** Ukjent side under /side/… — vises i SideLayout sin main. */
export function NotFoundSidePanel() {
  const { t } = useLanguage();

  return (
    <section
      className="section section--panel section--not-found-panel"
      aria-labelledby="nf-side-title"
    >
      <div className="section__inner">
        <p className="not-found-panel__code" aria-hidden="true">
          404
        </p>
        <h1 id="nf-side-title" className="panel-title">
          {t('common.notFoundTitle')}
        </h1>
        <p>{t('common.notFoundLead')}</p>
        <p className="not-found-panel__links">
          <Link to="/" viewTransition>
            {t('common.notFoundHome')}
          </Link>
          {' · '}
          <Link to="/side/kontakt" viewTransition>
            {t('common.notFoundContact')}
          </Link>
          {' · '}
          <Link to="/side/om-oss" viewTransition>
            {t('common.notFoundSide')}
          </Link>
        </p>
      </div>
    </section>
  );
}
