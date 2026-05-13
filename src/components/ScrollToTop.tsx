import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll til topp ved rutebytte (SPA) — bedre UX på mobil etter fanebytte. */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
