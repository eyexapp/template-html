import { BaseComponent } from './base-component.js';

class AppHeader extends BaseComponent {
  get styles() {
    return `
      :host {
        display: block;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-4, 1rem) var(--space-4, 1rem);
        max-width: var(--container-max, 1280px);
        margin-inline: auto;
      }
      .logo {
        font-size: var(--text-xl, 1.25rem);
        font-weight: var(--font-weight-bold, 700);
        color: var(--color-text, #171717);
        text-decoration: none;
      }
      nav {
        display: flex;
        align-items: center;
        gap: var(--space-4, 1rem);
      }
      nav a {
        color: var(--color-text-muted, #737373);
        text-decoration: none;
        font-size: var(--text-sm, 0.875rem);
        transition: color var(--duration-fast, 150ms) var(--ease-default, ease);
      }
      nav a:hover,
      nav a[aria-current="page"] {
        color: var(--color-accent, #2563eb);
      }
      ::slotted(theme-toggle) {
        margin-left: var(--space-2, 0.5rem);
      }
    `;
  }

  get template() {
    return `
      <header>
        <a href="/" class="logo">${this.getAttribute('site-name') || 'MyApp'}</a>
        <nav>
          <a href="/">Home</a>
          <a href="/pages/about.html">About</a>
          <slot></slot>
        </nav>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
