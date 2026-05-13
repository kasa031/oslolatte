import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/useLanguage';

export function AppErrorBoundaryFallback({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  const { t } = useLanguage();
  return (
    <main className="error-boundary" role="alert">
      <div className="error-boundary__inner">
        <h1 className="error-boundary__title">{t('errorUi.boundaryTitle')}</h1>
        <p className="error-boundary__body">{t('errorUi.boundaryBody')}</p>
        <div className="error-boundary__actions">
          <button type="button" className="btn btn--primary" onClick={onRetry}>
            {t('errorUi.boundaryRetry')}
          </button>
          <Link className="btn btn--ghost" to="/" viewTransition>
            {t('errorUi.boundaryHome')}
          </Link>
        </div>
        {import.meta.env.DEV ? (
          <pre className="error-boundary__tech" tabIndex={0}>
            {error.message}
          </pre>
        ) : null}
      </div>
    </main>
  );
}
