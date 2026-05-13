import { OrderForm } from '../../components/OrderForm';
import { OrderQrAside } from '../../components/OrderQrAside';
import { VippsPayment } from '../../components/VippsPayment';
import { useLanguage } from '../../i18n/useLanguage';

export default function BestillPanel() {
  const { t } = useLanguage();

  return (
    <section className="section section--order section--panel">
      <div className="section__inner section__inner--order-wide">
        <h1 className="panel-title">{t('panels.bestill.title')}</h1>
        <p>{t('panels.bestill.p1')}</p>
        <div className="order-two-ways" role="region" aria-labelledby="order-two-ways-heading">
          <h2 id="order-two-ways-heading" className="order-two-ways__title">
            {t('panels.bestill.twoWaysTitle')}
          </h2>
          <ol className="order-two-ways__list">
            <li>
              <span className="order-two-ways__option-title">
                {t('panels.bestill.option1Title')}
              </span>
              {' — '}
              <span className="order-two-ways__option-body">{t('panels.bestill.option1Body')}</span>
            </li>
            <li>
              <span className="order-two-ways__option-title">
                {t('panels.bestill.option2Title')}
              </span>
              {' — '}
              <span className="order-two-ways__option-body">{t('panels.bestill.option2Body')}</span>
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
  );
}
