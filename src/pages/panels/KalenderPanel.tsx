import { OpeningCalendar } from '../../components/OpeningCalendar';
import { preLaunch } from '../../data/opening';
import { useLanguage } from '../../i18n/useLanguage';

export default function KalenderPanel() {
  const { t } = useLanguage();

  return (
    <section className="section section--hours section--panel panel--bolt-kalender">
      <div className="section__inner section__inner--split">
        <div>
          <h1 className="panel-title">{t('panels.kalender.title')}</h1>
          <p>{t(preLaunch ? 'panels.kalender.p1PreLaunch' : 'panels.kalender.p1')}</p>
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
