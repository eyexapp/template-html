/**
 * DOM utility helpers — thin wrappers to reduce boilerplate.
 */

/**
 * Select a single element.
 * @param {string} selector
 * @param {Element|Document} [root=document]
 * @returns {Element|null}
 */
export function $(selector, root = document) {
  return root.querySelector(selector);
}

/**
 * Select multiple elements as an array.
 * @param {string} selector
 * @param {Element|Document} [root=document]
 * @returns {Element[]}
 */
export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

/**
 * Add an event listener and return an unsubscribe function.
 * @param {EventTarget} target
 * @param {string} event
 * @param {EventListener} handler
 * @param {AddEventListenerOptions} [options]
 * @returns {Function}
 */
export function on(target, event, handler, options) {
  target.addEventListener(event, handler, options);
  return () => target.removeEventListener(event, handler, options);
}

/**
 * Create an element with optional attributes and children.
 * @param {string} tag
 * @param {Record<string, string>} [attrs]
 * @param  {...(string|Node)} children
 * @returns {HTMLElement}
 */
export function createElement(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  for (const child of children) {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  }
  return el;
}
