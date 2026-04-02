import { describe, it, expect, beforeEach } from 'vitest';
import { $, $$, on, createElement } from '../src/js/lib/dom.js';

describe('DOM utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <p class="item">One</p>
        <p class="item">Two</p>
        <p class="item">Three</p>
      </div>
    `;
  });

  describe('$()', () => {
    it('should select a single element', () => {
      const el = $('#app');
      expect(el).not.toBeNull();
      expect(el.id).toBe('app');
    });

    it('should return null if not found', () => {
      expect($('#nonexistent')).toBeNull();
    });
  });

  describe('$$()', () => {
    it('should select multiple elements as an array', () => {
      const items = $$('.item');
      expect(Array.isArray(items)).toBe(true);
      expect(items).toHaveLength(3);
    });
  });

  describe('on()', () => {
    it('should attach and detach event listeners', () => {
      const btn = createElement('button');
      document.body.appendChild(btn);

      let clicked = 0;
      const unsub = on(btn, 'click', () => { clicked++; });

      btn.click();
      expect(clicked).toBe(1);

      unsub();
      btn.click();
      expect(clicked).toBe(1); // still 1 after unsubscribe
    });
  });

  describe('createElement()', () => {
    it('should create an element with attributes', () => {
      const el = createElement('div', { id: 'test', class: 'box' });
      expect(el.tagName).toBe('DIV');
      expect(el.id).toBe('test');
      expect(el.className).toBe('box');
    });

    it('should append text and element children', () => {
      const child = createElement('span', {}, 'inner');
      const el = createElement('div', {}, 'text ', child);
      expect(el.childNodes).toHaveLength(2);
      expect(el.textContent).toBe('text inner');
    });
  });
});
