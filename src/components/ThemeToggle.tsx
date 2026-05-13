import { useTheme } from '../theme/ThemeContext';
import { useLanguage } from '../i18n/useLanguage';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="theme-toggle" role="group" aria-label={t('common.themeAria')}>
      <button
        type="button"
        className={`theme-toggle__btn ${theme === 'light' ? 'theme-toggle__btn--active' : ''}`}
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        aria-label={t('common.themeLight')}
        title={t('common.themeLight')}
      >
        <span className="theme-toggle__label" aria-hidden>
          {t('common.themeLightShort')}
        </span>
      </button>
      <button
        type="button"
        className={`theme-toggle__btn ${theme === 'dark' ? 'theme-toggle__btn--active' : ''}`}
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        aria-label={t('common.themeDark')}
        title={t('common.themeDark')}
      >
        <span className="theme-toggle__label" aria-hidden>
          {t('common.themeDarkShort')}
        </span>
      </button>
    </div>
  );
}
