import { useLanguage } from '../i18n/useLanguage';

export function LanguageToggle() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="lang-toggle" role="group" aria-label={t('lang.aria')}>
      <button
        type="button"
        className={`lang-toggle__btn ${locale === 'nb' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => setLocale('nb')}
        aria-pressed={locale === 'nb'}
        aria-label={t('lang.nb')}
        title={t('lang.nb')}
      >
        <span className="lang-toggle__label" lang="nb">
          NO
        </span>
      </button>
      <button
        type="button"
        className={`lang-toggle__btn ${locale === 'en' ? 'lang-toggle__btn--active' : ''}`}
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        aria-label={t('lang.en')}
        title={t('lang.en')}
      >
        <span className="lang-toggle__label" lang="en">
          ENG
        </span>
      </button>
    </div>
  );
}
