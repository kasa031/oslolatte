import { FormEvent, useMemo, useState } from 'react';
import { CONTACT_EMAIL } from '../config/contact';
import { useLanguage } from '../i18n/LanguageContext';

const DRINK_IDS = ['oslolatte-varm', 'oslokakao-varm', 'oslolatte-is', 'oslokakao-is'] as const;

export function OrderForm() {
  const { t, locale } = useLanguage();
  const orderApiUrl = import.meta.env.VITE_ORDER_API_URL?.trim();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState<(typeof DRINK_IDS)[number]>('oslolatte-varm');
  const [qty, setQty] = useState(1);
  const [allergies, setAllergies] = useState('');
  const [notes, setNotes] = useState('');
  const [sentHint, setSentHint] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [telegramOk, setTelegramOk] = useState(false);

  const drinkKeys = useMemo(
    () =>
      ({
        'oslolatte-varm': 'order.drinkOslolatteVarm',
        'oslokakao-varm': 'order.drinkOslokakaoVarm',
        'oslolatte-is': 'order.drinkOslolatteIs',
        'oslokakao-is': 'order.drinkOslokakaoIs',
      }) as const,
    [],
  );

  function drinkLabel(id: (typeof DRINK_IDS)[number]) {
    return t(drinkKeys[id]);
  }

  function buildMailtoHref() {
    const subject = encodeURIComponent(
      `${t('order.mailSubject')}${name || t('order.mailCustomer')}`,
    );
    const body = encodeURIComponent(
      [
        `${t('order.mailName')} ${name}`,
        `${t('order.mailPhone')} ${phone}`,
        `${t('order.mailEmail')} ${email}`,
        `${t('order.mailDrink')} ${drinkLabel(product)}`,
        `${t('order.qty')}: ${qty}`,
        `${t('order.mailAllergies')} ${allergies || t('order.mailAllergiesNone')}`,
        `${t('order.mailMsg')} ${notes || t('order.mailMsgNone')}`,
      ].join('\n'),
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (orderApiUrl) {
      setSubmitting(true);
      setSubmitError(null);
      setTelegramOk(false);
      try {
        const res = await fetch(orderApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email,
            productId: product,
            productLabel: drinkLabel(product),
            qty,
            allergies,
            notes,
            locale,
            submittedAt: new Date().toISOString(),
          }),
        });

        const raw = await res.text();
        const trimmed = raw.trim();
        const looksLikeHtml =
          trimmed.startsWith('<!') || trimmed.startsWith('<html') || trimmed.startsWith('<HTML');

        function handleSuccess() {
          setTelegramOk(true);
          setName('');
          setPhone('');
          setEmail('');
          setAllergies('');
          setNotes('');
          setQty(1);
          setProduct('oslolatte-varm');
        }

        if (res.ok) {
          if (looksLikeHtml || trimmed === '') {
            setSubmitError(t('order.errorApiGotHtml'));
          } else {
            try {
              const okBody = JSON.parse(raw) as { ok?: boolean };
              if (okBody && okBody.ok === true) {
                handleSuccess();
              } else {
                setSubmitError(t('order.errorApiUnexpected'));
              }
            } catch {
              setSubmitError(t('order.errorApiGotHtml'));
            }
          }
        } else if (looksLikeHtml) {
          setSubmitError(t('order.errorApiGotHtml'));
        } else if (res.status === 404) {
          setSubmitError(t('order.errorApiNotFound'));
        } else {
          let apiError = '';
          let telegramCode = '';
          try {
            const data = JSON.parse(raw) as { error?: string; telegramCode?: string };
            if (typeof data.error === 'string') apiError = data.error;
            if (typeof data.telegramCode === 'string') telegramCode = data.telegramCode;
          } catch {
            /* ikke JSON */
          }
          if (!apiError && res.status === 503) {
            apiError = 'missing_env';
          }

          if (apiError === 'missing_env') {
            setSubmitError(t('order.errorMissingEnv'));
          } else if (apiError === 'required' || apiError === 'qty' || apiError === 'json') {
            setSubmitError(t('order.errorInvalidForm'));
          } else if (apiError === 'telegram') {
            if (telegramCode === 'chat_not_found') {
              setSubmitError(t('order.errorTelegramChatNotFound'));
            } else if (telegramCode === 'blocked') {
              setSubmitError(t('order.errorTelegramBlocked'));
            } else if (telegramCode === 'kicked') {
              setSubmitError(t('order.errorTelegramKicked'));
            } else if (telegramCode === 'too_long') {
              setSubmitError(t('order.errorTelegramTooLong'));
            } else {
              setSubmitError(t('order.errorTelegramRejected'));
            }
          } else {
            setSubmitError(
              res.status >= 500 ? t('order.errorServerOrNetlify') : t('order.telegramError'),
            );
          }
        }
      } catch {
        setSubmitError(t('order.errorNetwork'));
      } finally {
        setSubmitting(false);
      }
      return;
    }

    window.location.href = buildMailtoHref();
    setSentHint(true);
  }

  function handleOpenMail() {
    window.location.href = buildMailtoHref();
    setSentHint(true);
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <p className="order-form__note">
        {orderApiUrl ? t('order.noteTelegram') : t('order.note')}
      </p>
      {import.meta.env.DEV && !orderApiUrl && (
        <p className="order-form__dev-api-hint" role="note">
          {t('order.devMailtoOnly')}
        </p>
      )}
      <label className="order-form__field">
        <span>{t('order.name')}</span>
        <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
      </label>
      <label className="order-form__field">
        <span>{t('order.phone')}</span>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required inputMode="tel" autoComplete="tel" />
      </label>
      <label className="order-form__field">
        <span>{t('order.email')}</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" />
      </label>
      <label className="order-form__field">
        <span>{t('order.drink')}</span>
        <select value={product} onChange={(e) => setProduct(e.target.value as (typeof DRINK_IDS)[number])}>
          {DRINK_IDS.map((id) => (
            <option key={id} value={id}>
              {drinkLabel(id)}
            </option>
          ))}
        </select>
      </label>
      <label className="order-form__field">
        <span>{t('order.qty')}</span>
        <input
          type="number"
          min={1}
          max={50}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          required
        />
      </label>
      <label className="order-form__field">
        <span>{t('order.allergy')}</span>
        <textarea
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          rows={3}
          placeholder={t('order.allergyPh')}
          required
        />
      </label>
      <label className="order-form__field">
        <span>{t('order.notes')}</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder={t('order.notesPh')}
        />
      </label>
      <button type="submit" className="order-form__submit" disabled={submitting}>
        {submitting ? t('order.submitting') : t('order.submit')}
      </button>

      {telegramOk && (
        <p className="order-form__success" role="status">
          {t('order.telegramOk')}
        </p>
      )}
      {submitError && (
        <p className="order-form__error" role="alert">
          {submitError}
        </p>
      )}
      {orderApiUrl && (
        <p className="order-form__mailto-wrap">
          <button type="button" className="order-form__mailto-link" onClick={handleOpenMail}>
            {t('order.openMail')}
          </button>
        </p>
      )}
      {sentHint && !orderApiUrl && (
        <p className="order-form__hint" role="status">
          {t('order.hint')}
        </p>
      )}
    </form>
  );
}
