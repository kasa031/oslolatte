import { Link } from 'react-router-dom';
import { TheresesgateSlideshow } from '../../components/TheresesgateSlideshow';
import { THERESESGATE_SLIDES } from '../../generated/theresesgateSlides';
import { useLanguage } from '../../i18n/useLanguage';

export default function OmOssPanel() {
  const { t } = useLanguage();

  return (
    <section className="section section--story section--panel panel--bolt-omoss">
      <div className="section__inner">
        <h1 className="panel-title">{t('panels.omOss.title')}</h1>
        <h2 className="panel-subtitle">{t('panels.omOss.subtitle')}</h2>
        <p>{t('panels.omOss.p1')}</p>
        <p>{t('panels.omOss.p2')}</p>
        {THERESESGATE_SLIDES.length > 0 ? (
          <TheresesgateSlideshow slides={THERESESGATE_SLIDES} />
        ) : (
          <figure className="omoss-gate">
            <img
              src="/Images/thereses-gate.png"
              alt={t('panels.omOss.gateAlt')}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{t('panels.omOss.gateCaption')}</figcaption>
          </figure>
        )}
        <p className="omoss-dedication">{t('panels.omOss.p3')}</p>
        <figure className="omoss-maia">
          <img
            src="/Images/Maia.jpeg"
            alt={t('panels.omOss.maiaAlt')}
            loading="lazy"
            decoding="async"
            width={750}
            height={1000}
          />
        </figure>
        <p className="muted panel-tip">
          {t('panels.omOss.tipBefore')}
          <Link to="/" viewTransition>
            {t('panels.omOss.tipHome')}
          </Link>
          {t('panels.omOss.tipMid')}
          <Link to="/side/bestill" viewTransition>
            {t('panels.omOss.tipOrder')}
          </Link>
          {t('panels.omOss.tipEnd')}
        </p>
      </div>
    </section>
  );
}
