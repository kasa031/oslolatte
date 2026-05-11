import { useId } from 'react';

/** Merkebanner — kun Bolteløkka-palett (CSS-variabler), reflekterer kaffe/kakao i koppen */
type Props = {
  /** Til skjermleser */
  ariaLabel: string;
  ribbon: string;
};

export function OsloLatteLogo({ ariaLabel, ribbon }: Props) {
  const gradId = useId().replace(/:/g, '');

  return (
    <div className="oslolatte-logo" role="img" aria-label={ariaLabel}>
      <svg
        className="oslolatte-logo__icon"
        width={92}
        height={92}
        viewBox="0 0 64 64"
        aria-hidden
      >
        <defs>
          <linearGradient id={`oslolatte-cup-${gradId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--bolt-cream)" />
            <stop offset="100%" stopColor="var(--bolt-beige)" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30.5" fill="var(--bolt-sage)" stroke="var(--bolt-pine)" strokeWidth="1.25" />
        <ellipse cx="30" cy="33" rx="13" ry="3.5" fill="none" stroke="var(--bolt-brown)" strokeOpacity="0.35" strokeWidth="1" />
        <path
          d="M17 34 L17 46 Q17 50 21 50 L37 50 Q41 50 41 46 L41 34 Q41 30 37 30 L21 30 Q17 30 17 34 Z"
          fill={`url(#oslolatte-cup-${gradId})`}
          stroke="var(--bolt-brown)"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
        <path
          d="M41 36 Q49 36 49 41 Q49 46 41 46"
          fill="none"
          stroke="var(--bolt-brown)"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M24 26 Q24 16 26 10"
          stroke="var(--bolt-mustard)"
          strokeWidth="1.75"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M31 28 Q31 16 31 8" stroke="var(--bolt-sand)" strokeWidth="1.75" fill="none" strokeLinecap="round" />
        <path
          d="M38 26 Q38 16 36 10"
          stroke="var(--bolt-mustard)"
          strokeWidth="1.75"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="oslolatte-logo__wordmark">
        <div className="oslolatte-logo__brand">
          <span className="oslolatte-logo__oslo">Oslo</span>
          <span className="oslolatte-logo__latte">Latte</span>
        </div>
        <p className="oslolatte-logo__ribbon">{ribbon}</p>
      </div>
    </div>
  );
}
