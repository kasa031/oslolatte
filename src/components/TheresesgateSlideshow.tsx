import { useCallback, useEffect, useId, useState, type KeyboardEvent } from 'react';
import type { TheresesgateSlide } from '../generated/theresesgateSlides';
import { useLanguage } from '../i18n/useLanguage';

type Props = {
  slides: readonly TheresesgateSlide[];
};

const AUTO_MS = 6500;

export function TheresesgateSlideshow({ slides }: Props) {
  const { t } = useLanguage();
  const labelId = useId();
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const goFirst = useCallback(() => {
    setIndex(0);
  }, []);

  const goLast = useCallback(() => {
    setIndex(n > 0 ? n - 1 : 0);
  }, [n]);

  const onCarouselKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (n <= 1) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
        setPaused(true);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
        setPaused(true);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goFirst();
        setPaused(true);
      } else if (e.key === 'End') {
        e.preventDefault();
        goLast();
        setPaused(true);
      }
    },
    [n, goPrev, goNext, goFirst, goLast],
  );

  useEffect(() => {
    if (n <= 1 || paused) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [n, paused]);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, n - 1)));
  }, [n]);

  if (n === 0) return null;

  const current = slides[index] ?? slides[0];
  const srcSet = `${current.src} ${current.width}w`;
  const imgKey = current.webp ? `${current.src}|${current.webp}` : current.src;

  return (
    <figure
      className="theresesgate-slideshow"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      tabIndex={n > 1 ? 0 : undefined}
      onKeyDown={n > 1 ? onCarouselKeyDown : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p id={labelId} className="visually-hidden">
        {t('panels.omOss.slideshowAria')}
      </p>
      <div className="theresesgate-slideshow__viewport">
        <picture key={imgKey}>
          {current.webp ? (
            <source
              type="image/webp"
              srcSet={`${current.webp} ${current.width}w`}
              sizes="(max-width: 900px) 100vw, min(720px, 90vw)"
            />
          ) : null}
          <img
            className="theresesgate-slideshow__img"
            src={current.src}
            srcSet={current.webp ? undefined : srcSet}
            width={current.width}
            height={current.height}
            alt={t('panels.omOss.slideAlt', { current: index + 1, total: n })}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            sizes="(max-width: 900px) 100vw, min(720px, 90vw)"
          />
        </picture>
        {n > 1 && (
          <>
            <button
              type="button"
              className="theresesgate-slideshow__btn theresesgate-slideshow__btn--prev"
              aria-label={t('panels.omOss.slideshowPrev')}
              onClick={() => {
                goPrev();
                setPaused(true);
              }}
            />
            <button
              type="button"
              className="theresesgate-slideshow__btn theresesgate-slideshow__btn--next"
              aria-label={t('panels.omOss.slideshowNext')}
              onClick={() => {
                goNext();
                setPaused(true);
              }}
            />
          </>
        )}
      </div>
      {n > 1 && (
        <div
          className="theresesgate-slideshow__dots"
          role="group"
          aria-label={t('panels.omOss.slideshowDots')}
        >
          {slides.map((slide, i) => (
            <button
              key={`dot-${i}-${slide.src}`}
              type="button"
              aria-current={i === index ? 'true' : undefined}
              aria-label={t('panels.omOss.slideAlt', { current: i + 1, total: n })}
              className={`theresesgate-slideshow__dot${i === index ? ' theresesgate-slideshow__dot--active' : ''}`}
              onClick={() => {
                setIndex(i);
                setPaused(true);
              }}
            />
          ))}
        </div>
      )}
      {n > 1 && <p className="theresesgate-slideshow__hint">{t('panels.omOss.slideshowHint')}</p>}
      <figcaption>{t('panels.omOss.gateCaption')}</figcaption>
    </figure>
  );
}
