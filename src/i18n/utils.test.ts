import { describe, it, expect } from 'vitest';
import { getLangFromUrl, useTranslations } from './utils';

describe('getLangFromUrl', () => {
  it('returns "en" for /en/ paths', () => {
    expect(getLangFromUrl(new URL('https://markuskollers.de/en/'))).toBe('en');
  });

  it('falls back to "de" for the default route', () => {
    expect(getLangFromUrl(new URL('https://markuskollers.de/'))).toBe('de');
  });
});

describe('useTranslations', () => {
  it('translates a known key for en', () => {
    const t = useTranslations('en');
    expect(t('hero.tagline')).toBe('Relaunch in progress.');
  });

  it('translates a known key for de', () => {
    const t = useTranslations('de');
    expect(t('hero.tagline')).toBe('Relaunch in Arbeit.');
  });
});
