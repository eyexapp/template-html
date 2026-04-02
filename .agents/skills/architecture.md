---
name: architecture
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - architecture
  - html
  - web components
  - shadow dom
  - vanilla
---

# Architecture — HTML (Zero Build, Web Components)

## Project Structure

```
src/
├── index.html                  ← Entry point
├── components/                 ← Web Components
│   ├── app-header.js
│   ├── app-nav.js
│   ├── user-card.js
│   └── modal-dialog.js
├── pages/                      ← Page modules
│   ├── home.js
│   └── about.js
├── store/                      ← Pub/Sub state
│   └── store.js
├── services/                   ← API calls
│   └── api.js
├── styles/                     ← CSS Layers
│   ├── reset.css
│   ├── tokens.css              ← Design tokens (custom properties)
│   ├── base.css
│   └── utilities.css
└── utils/
    └── router.js               ← Hash-based SPA router
```

## Web Component

```javascript
class UserCard extends HTMLElement {
  static observedAttributes = ['name', 'email'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; padding: 1rem; border: 1px solid var(--border); border-radius: 8px; }
        .name { font-weight: 600; }
      </style>
      <div class="name">${this.getAttribute('name') ?? ''}</div>
      <div class="email">${this.getAttribute('email') ?? ''}</div>
    `;
  }
}
customElements.define('user-card', UserCard);
```

## Pub/Sub Store

```javascript
// store/store.js
const store = {
  _state: { users: [], loading: false },
  _listeners: new Set(),

  getState() { return structuredClone(this._state); },

  setState(partial) {
    Object.assign(this._state, partial);
    this._listeners.forEach(fn => fn(this._state));
  },

  subscribe(fn) {
    this._listeners.add(fn);
    return () => this._listeners.delete(fn);
  },
};
export default store;
```

## Hash Router

```javascript
// utils/router.js
const routes = new Map();

export function addRoute(path, handler) {
  routes.set(path, handler);
}

function handleRoute() {
  const path = location.hash.slice(1) || '/';
  const handler = routes.get(path);
  if (handler) handler();
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);
```

## CSS Layers

```css
/* styles/base.css */
@layer reset, tokens, base, components, utilities;

@layer tokens {
  :root {
    --color-primary: #3b82f6;
    --color-bg: #ffffff;
    --border: #e5e7eb;
    --radius: 8px;
    --font-sans: system-ui, sans-serif;
  }
}

@layer base {
  body { font-family: var(--font-sans); background: var(--color-bg); }
}
```

## Rules

- Zero build tools — no bundler, no transpiler.
- Web Components with Shadow DOM for encapsulation.
- Native ES Modules (import/export) with `<script type="module">`.
- CSS custom properties for theming, CSS Layers for specificity.
- Pub/Sub store for cross-component state.
- No frameworks, no dependencies.
