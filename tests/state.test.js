import { describe, it, expect } from 'vitest';
import { createStore } from '../src/js/lib/state.js';

describe('createStore', () => {
  it('should initialize with the given state', () => {
    const store = createStore({ count: 0, name: 'test' });
    expect(store.get('count')).toBe(0);
    expect(store.get('name')).toBe('test');
  });

  it('should update a value with set()', () => {
    const store = createStore({ count: 0 });
    store.set('count', 5);
    expect(store.get('count')).toBe(5);
  });

  it('should notify subscribers on change', () => {
    const store = createStore({ count: 0 });
    const values = [];
    store.subscribe('count', (val) => values.push(val));

    store.set('count', 1);
    store.set('count', 2);

    expect(values).toEqual([1, 2]);
  });

  it('should not notify if value is the same', () => {
    const store = createStore({ count: 0 });
    const values = [];
    store.subscribe('count', (val) => values.push(val));

    store.set('count', 0); // same value
    expect(values).toEqual([]);
  });

  it('should unsubscribe correctly', () => {
    const store = createStore({ count: 0 });
    const values = [];
    const unsub = store.subscribe('count', (val) => values.push(val));

    store.set('count', 1);
    unsub();
    store.set('count', 2);

    expect(values).toEqual([1]);
  });

  it('should return a state snapshot', () => {
    const store = createStore({ a: 1, b: 2 });
    const snapshot = store.getState();
    expect(snapshot).toEqual({ a: 1, b: 2 });

    // Snapshot should be a copy, not the original
    snapshot.a = 99;
    expect(store.get('a')).toBe(1);
  });
});
