import { lazy, Suspense } from 'react';
import { useLanguage } from '../i18n/useLanguage';

const MenyPanel = lazy(() => import('./MenyPanel').then((m) => ({ default: m.MenyPanel })));

function MenyFallback() {
  const { t } = useLanguage();
  return (
    <section className="section section--menus section--panel" aria-busy="true">
      <div className="section__inner">
        <p className="panel-title menu-page-title">{t('panels.meny.loading')}</p>
      </div>
    </section>
  );
}

export function MenyPanelRoute() {
  return (
    <Suspense fallback={<MenyFallback />}>
      <MenyPanel />
    </Suspense>
  );
}
