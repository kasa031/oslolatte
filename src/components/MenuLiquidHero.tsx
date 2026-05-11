/** Dekorativ hero — ren visuell effekt (ingen meningsbærende tekst). */
export function MenuLiquidHero() {
  return (
    <div className="menu-liquid-hero" aria-hidden="true">
      <div className="menu-liquid-hero__pool" />
      <div className="menu-liquid-hero__gloss" />
      <div className="menu-liquid-hero__rim" />
      <div className="menu-liquid-hero__steam">
        <span className="menu-liquid-hero__wisp menu-liquid-hero__wisp--1" />
        <span className="menu-liquid-hero__wisp menu-liquid-hero__wisp--2" />
        <span className="menu-liquid-hero__wisp menu-liquid-hero__wisp--3" />
        <span className="menu-liquid-hero__wisp menu-liquid-hero__wisp--4" />
      </div>
    </div>
  );
}
