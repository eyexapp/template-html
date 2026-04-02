import { BaseComponent } from './base-component.js';

class ThemeToggle extends BaseComponent {
  get styles() {
    return `
      button {
        background: none;
        border: 1px solid var(--color-border, #e5e5e5);
        border-radius: var(--radius-md, 0.375rem);
        padding: var(--space-2, 0.5rem);
        cursor: pointer;
        font-size: var(--text-lg, 1.125rem);
        line-height: 1;
        color: var(--color-text, #171717);
        transition: background-color var(--duration-fast, 150ms) var(--ease-default, ease);
      }
      button:hover {
        background-color: var(--color-bg-muted, #f5f5f5);
      }
    `;
  }

  get template() {
    return `<button type="button" aria-label="Toggle theme"><span class="icon">🌙</span></button>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this._applyInitialTheme();
    this.$('button').addEventListener('click', () => this._toggle());
  }

  _applyInitialTheme() {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    this._setTheme(theme);
  }

  _toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this._setTheme(next);
    localStorage.setItem('theme', next);
  }

  _setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.$('.icon').textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

customElements.define('theme-toggle', ThemeToggle);
