import { NavLink } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav__link nav__link--active' : 'nav__link';
}

type Props = { ariaLabel: string };

export function SiteNav({ ariaLabel }: Props) {
  const { t } = useLanguage();

  return (
    <nav className="nav nav--tabs" aria-label={ariaLabel}>
      <NavLink to="/side/om-oss" className={navClass} end viewTransition>
        {t('side.omOss')}
      </NavLink>

      <NavLink to="/side/meny" className={navClass} viewTransition>
        {t('side.meny')}
      </NavLink>

      <NavLink to="/side/kalender" className={navClass} viewTransition>
        {t('side.kalender')}
      </NavLink>
      <NavLink to="/side/bestill" className={navClass} viewTransition>
        {t('side.bestill')}
      </NavLink>
      <NavLink to="/side/kontakt" className={navClass} viewTransition>
        {t('side.kontakt')}
      </NavLink>
    </nav>
  );
}
