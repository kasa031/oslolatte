import { describe, expect, it } from 'vitest';
import { resolveSeoKeys } from './routeSeoKeys';

describe('resolveSeoKeys', () => {
  it('mapper forsiden', () => {
    expect(resolveSeoKeys('/')).toEqual({
      titleKey: 'seo.titleHome',
      descKey: 'seo.descHome',
    });
    expect(resolveSeoKeys('//')).toEqual({
      titleKey: 'seo.titleHome',
      descKey: 'seo.descHome',
    });
  });

  it('mapper /side til om oss', () => {
    expect(resolveSeoKeys('/side')).toEqual({
      titleKey: 'seo.titleOmOss',
      descKey: 'seo.descOmOss',
    });
    expect(resolveSeoKeys('/side/')).toEqual({
      titleKey: 'seo.titleOmOss',
      descKey: 'seo.descOmOss',
    });
  });

  it('mapper kjente sidepaneler', () => {
    expect(resolveSeoKeys('/side/meny')).toEqual({
      titleKey: 'seo.titleMeny',
      descKey: 'seo.descMeny',
    });
    expect(resolveSeoKeys('/side/historie')).toEqual({
      titleKey: 'seo.titleOmOss',
      descKey: 'seo.descOmOss',
    });
    expect(resolveSeoKeys('/side/kontakt')).toEqual({
      titleKey: 'seo.titleKontakt',
      descKey: 'seo.descKontakt',
    });
    expect(resolveSeoKeys('/side/priser')).toEqual({
      titleKey: 'seo.titleMeny',
      descKey: 'seo.descMeny',
    });
  });

  it('mapper ukjent side-segment til 404-SEO', () => {
    expect(resolveSeoKeys('/side/ukjent')).toEqual({
      titleKey: 'seo.titleNotFound',
      descKey: 'seo.descNotFound',
    });
  });

  it('mapper ukjent toppnivå-rute til 404-SEO', () => {
    expect(resolveSeoKeys('/foo')).toEqual({
      titleKey: 'seo.titleNotFound',
      descKey: 'seo.descNotFound',
    });
  });
});
