/**
 * BaseComponent — Lightweight base class for Web Components.
 * Provides Shadow DOM setup, template rendering, and lifecycle helpers.
 */
export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  /**
   * Override in subclass to return CSS string.
   * @returns {string}
   */
  get styles() {
    return '';
  }

  /**
   * Override in subclass to return HTML template string.
   * @returns {string}
   */
  get template() {
    return '';
  }

  /** Render styles + template into Shadow DOM. */
  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.styles}</style>
      ${this.template}
    `;
  }

  connectedCallback() {
    this.render();
  }

  /**
   * Helper: query inside shadow root.
   * @param {string} selector
   * @returns {Element|null}
   */
  $(selector) {
    return this.shadowRoot.querySelector(selector);
  }

  /**
   * Helper: query all inside shadow root.
   * @param {string} selector
   * @returns {NodeListOf<Element>}
   */
  $$(selector) {
    return this.shadowRoot.querySelectorAll(selector);
  }
}
