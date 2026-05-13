import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from '../config/contact';
import { ORDER_FIELD_LIMITS, orderFieldsExceedLimits } from '../config/orderFieldLimits';
import { PICKUP_SLOT_IDS, type PickupSlotId } from '../config/pickupSlots';
import { preLaunch } from '../data/opening';
import { useLanguage } from '../i18n/useLanguage';

const DRINK_IDS = ['oslolatte-varm', 'oslokakao-varm', 'oslolatte-is', 'oslokakao-is'] as const;

export function OrderForm() {
  const { t, locale } = useLanguage();
  const [searchParams] = useSearchParams();
  const orderApiUrl = import.meta.env.VITE_ORDER_API_URL?.trim();
  const hasOrderApi = Boolean(orderApiUrl);
  const bypassPrelaunch = searchParams.get('e2eBypassPrelaunch') === '1';
  const ordersOpen = !preLaunch || bypassPrelaunch;
  const canSubmit = hasOrderApi && ordersOpen;
  const openedAtRef = useRef(Date.now());

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState<(typeof DRINK_IDS)[number]>('oslolatte-varm');
  const [qty, setQty] = useState(1);
  const [pickupSlot, setPickupSlot] = useState<PickupSlotId>('none');
  const [allergies, setAllergies] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [telegramOk, setTelegramOk] = useState(false);
  const submitStatusRef = useRef<HTMLParagraphElement>(null);
  const submitAbortRef = useRef<AbortController | null>(null);
  const submitSeqRef = useRef(0);
  /** Honeypot — skal være tom; fylles ofte av bots. */
  const [hpCompany, setHpCompany] = useState('');

  useEffect(() => {
    return () => {
      submitAbortRef.current?.abort();
    };
  }, []);

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

  const pickupKeys = useMemo(
    () =>
      ({
        none: 'order.pickupNone',
        'weekday-am': 'order.pickupWeekdayAm',
        'weekday-pm': 'order.pickupWeekdayPm',
        weekend: 'order.pickupWeekend',
        'flex-call': 'order.pickupFlexCall',
      }) as const,
    [],
  );

  function drinkLabel(id: (typeof DRINK_IDS)[number]) {
    return t(drinkKeys[id]);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (hpCompany.trim()) {
      return;
    }

    if (!orderApiUrl || !ordersOpen) {
      return;
    }

    if (Date.now() - openedAtRef.current < 2000) {
      setSubmitError(t('order.errorTooFast'));
      return;
    }

    const productLabel = drinkLabel(product);
    const fields = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      allergies: allergies.trim(),
      notes: notes.trim(),
      productLabel,
      locale,
      pickupSlot,
    };
    if (orderFieldsExceedLimits(fields)) {
      setSubmitError(t('order.errorFieldTooLong'));
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setTelegramOk(false);
    const seq = ++submitSeqRef.current;
    submitAbortRef.current?.abort();
    const ac = new AbortController();
    submitAbortRef.current = ac;
    const idempotencyKey =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : undefined;
    try {
      const res = await fetch(orderApiUrl, {
        method: 'POST',
        credentials: 'omit',
        signal: ac.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
        },
        body: JSON.stringify({
          name: fields.name,
          phone: fields.phone,
          email: fields.email,
          productId: product,
          productLabel: fields.productLabel,
          qty,
          allergies: fields.allergies,
          notes: fields.notes,
          locale: fields.locale,
          pickupSlot: fields.pickupSlot,
          submittedAt: new Date().toISOString(),
          company: hpCompany,
        }),
      });

      if (submitSeqRef.current !== seq) {
        return;
      }

      const raw = await res.text();
      if (submitSeqRef.current !== seq) {
        return;
      }

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
        setPickupSlot('none');
        queueMicrotask(() => submitStatusRef.current?.focus());
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
        } else if (apiError === 'preview_disabled') {
          setSubmitError(t('order.errorPreviewDisabled'));
        } else if (apiError === 'idempotency_conflict' || res.status === 409) {
          setSubmitError(t('order.errorIdempotencyConflict'));
        } else if (apiError === 'cors') {
          setSubmitError(t('order.errorCors'));
        } else if (apiError === 'payload_too_large') {
          setSubmitError(t('order.errorPayloadTooLarge'));
        } else if (apiError === 'rate_limit' || res.status === 429) {
          setSubmitError(t('order.errorRateLimit'));
        } else if (apiError === 'telegram_timeout') {
          setSubmitError(t('order.errorTelegramTimeout'));
        } else if (
          apiError === 'required' ||
          apiError === 'qty' ||
          apiError === 'json' ||
          apiError === 'product' ||
          apiError === 'pickup'
        ) {
          setSubmitError(t('order.errorInvalidForm'));
        } else if (apiError === 'field_too_long') {
          setSubmitError(t('order.errorFieldTooLong'));
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
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      setSubmitError(
        import.meta.env.DEV ? t('order.errorNetworkDev') : t('order.errorNetworkProd'),
      );
    } finally {
      if (submitSeqRef.current === seq) {
        setSubmitting(false);
      }
    }
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      {hasOrderApi && !ordersOpen ? (
        <div className="order-form__note order-form__note--disabled" role="alert">
          <p>{t('order.notePausedPreLaunch')}</p>
          <p className="order-form__phone-fallback">
            <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
          </p>
        </div>
      ) : canSubmit ? (
        <p className="order-form__note">{t('order.noteTelegram')}</p>
      ) : (
        <div className="order-form__note order-form__note--disabled" role="alert">
          <p>{t('order.noteDisabled')}</p>
          <p className="order-form__phone-fallback">
            <a href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE_DISPLAY}</a>
          </p>
          {import.meta.env.DEV && (
            <p className="order-form__dev-api-hint" role="note">
              {t('order.devNeedApiUrl')}
            </p>
          )}
        </div>
      )}
      <div className="visually-hidden" aria-hidden="true">
        <label className="order-form__field">
          <span>Company</span>
          <input
            name="company"
            value={hpCompany}
            onChange={(e) => setHpCompany(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            disabled={!canSubmit}
          />
        </label>
      </div>
      <label className="order-form__field">
        <span>
          {t('order.name')}
          <abbr className="order-form__required" title={t('order.requiredMark')}>
            *
          </abbr>
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          maxLength={ORDER_FIELD_LIMITS.name}
          disabled={!canSubmit}
        />
      </label>
      <label className="order-form__field">
        <span>
          {t('order.phone')}
          <abbr className="order-form__required" title={t('order.requiredMark')}>
            *
          </abbr>
        </span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          inputMode="tel"
          autoComplete="tel"
          maxLength={ORDER_FIELD_LIMITS.phone}
          disabled={!canSubmit}
        />
      </label>
      <label className="order-form__field">
        <span>{t('order.email')}</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          autoComplete="email"
          maxLength={ORDER_FIELD_LIMITS.email}
          disabled={!canSubmit}
        />
      </label>
      <label className="order-form__field">
        <span>{t('order.drink')}</span>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value as (typeof DRINK_IDS)[number])}
          disabled={!canSubmit}
        >
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
          disabled={!canSubmit}
        />
      </label>
      <label className="order-form__field">
        <span>{t('order.pickupLabel')}</span>
        <select
          value={pickupSlot}
          onChange={(e) => setPickupSlot(e.target.value as PickupSlotId)}
          disabled={!canSubmit}
        >
          {PICKUP_SLOT_IDS.map((id) => (
            <option key={id} value={id}>
              {t(pickupKeys[id])}
            </option>
          ))}
        </select>
      </label>
      <label className="order-form__field">
        <span>{t('order.allergy')}</span>
        <textarea
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          rows={3}
          maxLength={ORDER_FIELD_LIMITS.allergies}
          placeholder={t('order.allergyPh')}
          required
          disabled={!canSubmit}
        />
      </label>
      <label className="order-form__field">
        <span>{t('order.notes')}</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          maxLength={ORDER_FIELD_LIMITS.notes}
          placeholder={t('order.notesPh')}
          disabled={!canSubmit}
        />
      </label>
      <button type="submit" className="order-form__submit" disabled={submitting || !canSubmit}>
        {submitting ? t('order.submitting') : t('order.submit')}
      </button>

      {telegramOk && (
        <p
          ref={submitStatusRef}
          className="order-form__success"
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          {t('order.telegramOk')}
        </p>
      )}
      {submitError && (
        <p className="order-form__error" role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}
