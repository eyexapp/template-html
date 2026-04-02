import { BaseComponent } from './base-component.js';

class AppFooter extends BaseComponent {
  get styles() {
    return `
      :host {
        display: block;
      }
      footer {
        padding: var(--space-6, 1.5rem) var(--space-4, 1rem);
        text-align: center;
        font-size: var(--text-sm, 0.875rem);
        color: var(--color-text-muted, #737373);
        border-top: 1px solid var(--color-border, #e5e5e5);
        max-width: var(--container-max, 1280px);
        margin-inline: auto;
      }
    `;
  }

  get template() {
    const year = new Date().getFullYear();
    return `
      <footer>
        <p>&copy; ${year} ${this.getAttribute('site-name') || 'MyApp'}. All rights reserved.</p>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
