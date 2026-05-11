import { useMemo, useState } from 'react';
import type { DayStatus } from '../data/opening';
import { openingSchedule } from '../data/opening';
import { useLanguage } from '../i18n/LanguageContext';

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

/** Mandag–søndag, mandag først (matcher kalendergitteret). */
function mondayFirstWeekdayLabels(localeTag: string) {
  const base = new Date(2024, 0, 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    return new Intl.DateTimeFormat(localeTag, { weekday: 'short' }).format(d);
  });
}

export function OpeningCalendar() {
  const { locale, t } = useLanguage();
  const localeTag = locale === 'en' ? 'en' : 'nb-NO';

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const weekdays = useMemo(() => mondayFirstWeekdayLabels(localeTag), [localeTag]);

  const grid = useMemo(() => {
    const first = new Date(year, month, 1);
    const startWeekday = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: ({ day: number; key: string; status: DayStatus | undefined } | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${pad(month + 1)}-${pad(d)}`;
      cells.push({ day: d, key, status: openingSchedule[key] });
    }
    return cells;
  }, [year, month]);

  const monthName = new Intl.DateTimeFormat(localeTag, { month: 'long', year: 'numeric' }).format(
    new Date(year, month, 1),
  );

  function statusLabel(s: DayStatus | undefined) {
    if (s === 'open') return t('calendar.statusOpen');
    if (s === 'closed') return t('calendar.statusClosed');
    if (s === 'special') return t('calendar.statusSpecial');
    return t('calendar.statusNeutral');
  }

  function prev() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  }

  function next() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  }

  return (
    <div className="calendar">
      <div className="calendar__toolbar">
        <button type="button" className="calendar__btn" onClick={prev} aria-label={t('calendar.prev')}>
          ‹
        </button>
        <h3 className="calendar__title">{monthName}</h3>
        <button type="button" className="calendar__btn" onClick={next} aria-label={t('calendar.next')}>
          ›
        </button>
      </div>
      <div className="calendar__weekdays">
        {weekdays.map((w, i) => (
          <span key={`${w}-${i}`} className="calendar__weekday">
            {w}
          </span>
        ))}
      </div>
      <div className="calendar__grid">
        {grid.map((cell, i) =>
          cell ? (
            <div
              key={cell.key}
              className={`calendar__cell calendar__cell--${cell.status ?? 'neutral'}`}
              title={`${cell.key}: ${statusLabel(cell.status)}`}
            >
              <span className="calendar__daynum">{cell.day}</span>
            </div>
          ) : (
            <div key={`empty-${i}`} className="calendar__cell calendar__cell--empty" />
          ),
        )}
      </div>
      <ul className="calendar__legend">
        <li>
          <span className="calendar__dot calendar__dot--open" /> {t('calendar.legendOpen')}
        </li>
        <li>
          <span className="calendar__dot calendar__dot--closed" /> {t('calendar.legendClosed')}
        </li>
        <li>
          <span className="calendar__dot calendar__dot--special" /> {t('calendar.legendSpecial')}
        </li>
      </ul>
      <p className="calendar__hint">{t('calendar.hint')}</p>
    </div>
  );
}
