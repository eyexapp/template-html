/**
 * Lightweight i18n — JSON-based translations.
 * Usage:
 *   const i18n = createI18n({ defaultLocale: 'en' });
 *   await i18n.load('en');
 *   i18n.t('hero.title'); // "Welcome"
 */

/**
 * @param {{ defaultLocale?: string, basePath?: string }} options
 */
export function createI18n(options = {}) {
  const { defaultLocale = 'en', basePath = '/i18n' } = options;
  let currentLocale = defaultLocale;
  /** @type {Map<string, Record<string, string>>} */
  const translations = new Map();
  /** @type {Set<Function>} */
  const listeners = new Set();

  /**
   * Resolve a dot-notated key from a flat or nested object.
   * @param {Record<string, unknown>} obj
   * @param {string} path
   * @returns {string}
   */
  function resolve(obj, path) {
    // Try flat key first
    if (typeof obj[path] === 'string') return obj[path];
    // Try dot-notation walk
    const parts = path.split('.');
    let current = obj;
    for (const part of parts) {
      if (current == null || typeof current !== 'object') return path;
      current = current[part];
    }
    return typeof current === 'string' ? current : path;
  }

  return {
    /** Current locale string. */
    get locale() {
      return currentLocale;
    },

    /**
     * Load a locale's JSON file and cache it.
     * @param {string} locale
     */
    async load(locale) {
      if (translations.has(locale)) {
        currentLocale = locale;
        listeners.forEach((fn) => fn(locale));
        return;
      }
      const url = `${basePath}/${locale}.json`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load locale: ${locale}`);
      const data = await res.json();
      translations.set(locale, data);
      currentLocale = locale;
      document.documentElement.setAttribute('lang', locale);
      listeners.forEach((fn) => fn(locale));
    },

    /**
     * Translate a key. Returns the key itself if not found.
     * @param {string} key
     * @param {string} [locale]
     * @returns {string}
     */
    t(key, locale) {
      const dict = translations.get(locale || currentLocale) || {};
      return resolve(dict, key);
    },

    /**
     * Listen for locale changes.
     * @param {Function} fn
     * @returns {Function} unsubscribe
     */
    onChange(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
