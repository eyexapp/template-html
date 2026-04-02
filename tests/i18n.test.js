import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createI18n } from '../src/js/lib/i18n.js';

describe('createI18n', () => {
  beforeEach(() => {
    // Mock fetch to return translation JSON
    vi.stubGlobal('fetch', vi.fn((url) => {
      const translations = {
        '/i18n/en.json': {
          'hero.title': 'Welcome',
          'nav.home': 'Home',
        },
        '/i18n/tr.json': {
          'hero.title': 'Hoş Geldiniz',
          'nav.home': 'Ana Sayfa',
        },
      };

      const path = new URL(url, 'http://localhost').pathname;
      const data = translations[path];

      if (data) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(data),
        });
      }
      return Promise.resolve({ ok: false });
    }));
  });

  it('should default to "en" locale', () => {
    const i18n = createI18n();
    expect(i18n.locale).toBe('en');
  });

  it('should load and translate keys', async () => {
    const i18n = createI18n();
    await i18n.load('en');
    expect(i18n.t('hero.title')).toBe('Welcome');
    expect(i18n.t('nav.home')).toBe('Home');
  });

  it('should return key if translation missing', async () => {
    const i18n = createI18n();
    await i18n.load('en');
    expect(i18n.t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('should switch locales', async () => {
    const i18n = createI18n();
    await i18n.load('en');
    expect(i18n.t('hero.title')).toBe('Welcome');

    await i18n.load('tr');
    expect(i18n.t('hero.title')).toBe('Hoş Geldiniz');
    expect(i18n.locale).toBe('tr');
  });

  it('should notify on locale change', async () => {
    const i18n = createI18n();
    const locales = [];
    i18n.onChange((locale) => locales.push(locale));

    await i18n.load('en');
    await i18n.load('tr');

    expect(locales).toEqual(['en', 'tr']);
  });

  it('should throw on fetch failure', async () => {
    const i18n = createI18n();
    await expect(i18n.load('xx')).rejects.toThrow('Failed to load locale: xx');
  });
});
