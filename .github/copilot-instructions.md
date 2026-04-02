# Project: Vanilla HTML/CSS/JS Master Template

## Architecture

Pure vanilla multi-page application (MPA) — zero build tools, zero frameworks.

```
src/
├── css/          → Cascade Layers: tokens → reset → layouts → utilities → components
├── js/
│   ├── components/  → Web Components (Custom Elements + Shadow DOM)
│   └── lib/         → Pure modules: state (pub/sub), i18n, dom utilities
├── i18n/         → JSON translation files
├── pages/        → Additional HTML pages (about, 404, etc.)
├── assets/       → Static files (icons, images)
└── index.html    → Home page
```

## Key Conventions

### CSS
- ALL design decisions go in `src/css/tokens.css` as CSS Custom Properties
- Use `@layer` for specificity control — layer order: tokens, reset, layouts, utilities, components
- Dark theme via `[data-theme="dark"]` selector overriding semantic color tokens
- NEVER use `!important` (layers eliminate the need)
- NEVER hardcode colors/spacing — always use tokens (`var(--color-accent)`, `var(--space-4)`)

### JavaScript
- ES Modules only (`type="module"` in script tags, `import/export` in JS)
- No bundler, no transpiler — code must run natively in modern browsers
- Web Components extend `BaseComponent` from `src/js/components/base-component.js`
- State management via `createStore()` from `src/js/lib/state.js` (pub/sub pattern)
- i18n via `createI18n()` from `src/js/lib/i18n.js` (JSON-based translations)

### Web Components
- Every component extends `BaseComponent`
- Use Shadow DOM for style encapsulation
- Override `get styles()` for CSS and `get template()` for HTML
- Use `this.$()` and `this.$$()` for shadow root queries
- Register with `customElements.define('prefix-name', ClassName)`
- Use kebab-case for element names (must contain a hyphen)

### HTML Pages
- Every page includes: `<link rel="stylesheet" href="/css/main.css">` and `<script type="module" src="/js/main.js">`
- Use semantic HTML: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- Use layout classes: `.page` (sticky footer), `.container`, `.stack`, `.grid`, `.card`
- Use `app-header` and `app-footer` Web Components for consistent layout

### Adding a New Feature Checklist
1. **New CSS token?** → Add to `src/css/tokens.css`
2. **New layout pattern?** → Add to `src/css/layouts.css`
3. **New component?** → Create in `src/js/components/`, extend `BaseComponent`, register in `src/js/main.js`
4. **New page?** → Create in `src/pages/`, include standard head/body structure
5. **New translation?** → Add key to ALL locale files in `src/i18n/`
6. **New utility module?** → Add to `src/js/lib/`, export from `src/js/main.js`
7. **Tests?** → Add to `tests/` directory, run `npm test`

### Code Patterns

```js
// ✅ Creating a Web Component
import { BaseComponent } from './base-component.js';

class MyWidget extends BaseComponent {
  get styles() {
    return `:host { display: block; }`;
  }
  get template() {
    return `<div class="widget">Content</div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    // Setup event listeners here
  }
}
customElements.define('my-widget', MyWidget);
```

```js
// ✅ Using state store
import { createStore } from './lib/state.js';
const store = createStore({ count: 0 });
store.subscribe('count', (val) => console.log('Count:', val));
store.set('count', 1);
```

```css
/* ✅ Adding component styles via @layer */
@layer components {
  .my-widget { /* ... */ }
}
```

### Testing
- Framework: Vitest with jsdom environment
- Tests live in `tests/` directory
- Test pure JS modules (state, i18n, dom) — not Web Components directly in jsdom
- Run: `npm test` or `npm run test:watch`

### Docker
- Nginx serves the `src/` directory as static files
- Build: `docker compose up --build`
- Config in `nginx.conf` — includes security headers, gzip, caching
