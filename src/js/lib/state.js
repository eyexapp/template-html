/**
 * Minimal pub/sub state management.
 * Usage:
 *   const store = createStore({ count: 0 });
 *   store.subscribe('count', (val) => console.log(val));
 *   store.set('count', 1);
 */

/**
 * @template {Record<string, unknown>} T
 * @param {T} initialState
 */
export function createStore(initialState) {
  const state = { ...initialState };
  /** @type {Map<string, Set<Function>>} */
  const listeners = new Map();

  return {
    /**
     * Get a value from the store.
     * @param {keyof T} key
     */
    get(key) {
      return state[key];
    },

    /**
     * Set a value and notify subscribers.
     * @param {keyof T} key
     * @param {*} value
     */
    set(key, value) {
      if (state[key] === value) return;
      state[key] = value;
      const subs = listeners.get(/** @type {string} */ (key));
      if (subs) {
        subs.forEach((fn) => fn(value));
      }
    },

    /**
     * Subscribe to changes on a key.
     * @param {keyof T} key
     * @param {Function} fn
     * @returns {Function} unsubscribe function
     */
    subscribe(key, fn) {
      const k = /** @type {string} */ (key);
      if (!listeners.has(k)) {
        listeners.set(k, new Set());
      }
      listeners.get(k).add(fn);
      return () => listeners.get(k).delete(fn);
    },

    /** Get a snapshot of entire state (shallow copy). */
    getState() {
      return { ...state };
    },
  };
}
