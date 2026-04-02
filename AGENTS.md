# AGENTS.md — Vanilla HTML/CSS/JS (Zero Build, Zero Framework)

## Project Identity

| Key | Value |
|-----|-------|
| Runtime | Modern browsers (native ES Modules) |
| Language | Vanilla JavaScript (ES2022+) |
| Category | Static MPA (Multi-Page Application) |
| Build Tool | **None** — zero build, zero transpiler |
| CSS | CSS Custom Properties + `@layer` cascade |
| Components | Web Components (Custom Elements + Shadow DOM) |
| State | Pub/Sub store (`createStore()`) |
| Testing | Vitest (jsdom) |
| Serving | Nginx (Docker) or any static server |

> **Zero build tools, zero frameworks.** Code runs directly in the browser as-is.

---

## Architecture — CSS Layers + Web Components

```
src/
├── css/
│   ├── main.css        ← Imports all layers in order
│   ├── tokens.css      ← @layer tokens — ALL design decisions (Custom Properties)
│   ├── reset.css       ← @layer reset — normalize
│   ├── layouts.css     ← @layer layouts — .page, .container, .stack, .grid
│   ├── utilities.css   ← @layer utilities — utility classes
│   └── components.css  ← @layer components — component-specific styles
├── js/
│   ├── main.js         ← Entry: register Web Components, init app
│   ├── components/
│   │   ├── base-component.js  ← BaseComponent (Shadow DOM base class)
│   │   ├── app-header.js      ← Header Web Component
│   │   └── app-footer.js      ← Footer Web Component
│   └── lib/
│       ├── state.js    ← createStore() pub/sub
│       ├── i18n.js     ← createI18n() JSON translations
│       └── dom.js      ← DOM utility helpers
├── i18n/
│   ├── en.json
│   └── tr.json
├── pages/              ← Additional HTML pages
│   ├── about.html
│   └── 404.html
├── assets/             ← Static files (icons, images)
└── index.html          ← Home page
```

### CSS Layer Order (STRICT)
```css
/* tokens → reset → layouts → utilities → components */
@layer tokens, reset, layouts, utilities, components;
```

---

## Adding New Code — Where Things Go

### New Feature Checklist
1. **CSS token?** → `src/css/tokens.css` (Custom Property)
2. **Layout pattern?** → `src/css/layouts.css` (`@layer layouts`)
3. **Component?** → `src/js/components/`, extend `BaseComponent`, register in `main.js`
4. **Page?** → `src/pages/`, include standard `<head>` + `<body>`
5. **Translation?** → Add key to ALL locale files in `src/i18n/`
6. **Utility module?** → `src/js/lib/`, import in `main.js`
7. **Tests?** → `tests/` directory

### Web Component Pattern
```javascript
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
    // Setup event listeners
  }
}
customElements.define('my-widget', MyWidget);
```

### Page Pattern
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="stylesheet" href="/css/main.css">
</head>
<body class="page">
  <app-header></app-header>
  <main class="container stack">
    <!-- Content -->
  </main>
  <app-footer></app-footer>
  <script type="module" src="/js/main.js"></script>
</body>
</html>
```

---

## Design & Architecture Principles

### CSS Custom Properties — Single Source of Truth
```css
/* ✅ ALL design decisions in tokens.css */
@layer tokens {
  :root {
    --color-accent: #3b82f6;
    --space-4: 1rem;
    --radius-md: 0.5rem;
  }
}

/* ❌ NEVER hardcode values */
.card { border-radius: 8px; } /* Wrong! Use var(--radius-md) */
```

### @layer — No `!important` Needed
```css
/* ✅ Specificity controlled by layer order */
@layer components {
  .card { background: var(--color-surface); }
}

/* ❌ NEVER use !important — layers handle specificity */
```

### Dark Theme
```css
/* Theme toggle via data attribute */
[data-theme="dark"] {
  --color-surface: #1a1a1a;
  --color-text: #e5e5e5;
}
```

### ES Modules — No Bundler
```javascript
// ✅ Native ES modules — type="module" in HTML
import { createStore } from './lib/state.js';

// ❌ NEVER use CommonJS (require/module.exports)
// ❌ NEVER use import maps or bundlers
```

### State — Pub/Sub Store
```javascript
import { createStore } from './lib/state.js';
const store = createStore({ count: 0, theme: 'light' });
store.subscribe('count', (val) => console.log('Count:', val));
store.set('count', 1);
```

---

## Error Handling

- Web Components: `connectedCallback` / `disconnectedCallback` for lifecycle
- State store: subscribe/unsubscribe pattern prevents memory leaks
- Graceful degradation: pages work without JS (CSS-only layout)
- Semantic HTML ensures accessibility even if JS fails

---

## Code Quality

### Naming Conventions
| Artifact | Convention | Example |
|----------|-----------|---------|
| Web Component | `kebab-case` tag | `<my-widget>` |
| Component JS | `kebab-case.js` | `app-header.js` |
| CSS class | `kebab-case` | `.card-header` |
| CSS token | `--category-name` | `--color-accent` |
| Module | `kebab-case.js` | `state.js` |
| Layout class | `.name` | `.page`, `.container`, `.stack` |

### HTML Standards
- Semantic elements: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- Layout classes: `.page` (sticky footer), `.container`, `.stack`, `.grid`, `.card`
- `<app-header>` / `<app-footer>` Web Components for consistent layout
- Every page: `<link>` to `main.css` + `<script type="module">` to `main.js`

---

## Testing Strategy

| Level | What | Where | Tool |
|-------|------|-------|------|
| Unit | State store, i18n, DOM utils | `tests/` | Vitest (jsdom) |

### What to Test
- Pure JS modules: `createStore()`, `createI18n()`, DOM helpers
- NOT Web Components in jsdom (Shadow DOM limitations)

---

## Security & Performance

### Security
- Nginx security headers (CSP, X-Frame-Options, etc.)
- No inline scripts — all `type="module"`
- No user-generated HTML rendering without sanitization

### Performance
- Zero bundle size — no build tool overhead
- Native browser module loading with caching
- CSS `@layer` — no specificity wars, smaller stylesheets
- Gzip + caching via Nginx config
- Images in `assets/` — optimize manually

---

## Commands

| Action | Command |
|--------|---------|
| Dev | Open `src/index.html` in browser (or `npx serve src/`) |
| Test | `npm test` |
| Test watch | `npm run test:watch` |
| Docker | `docker compose up --build` |

---

## Prohibitions — NEVER Do These

1. **NEVER** add a build tool / bundler / transpiler
2. **NEVER** add a JS framework (React, Vue, Angular, etc.)
3. **NEVER** use `!important` — CSS `@layer` handles specificity
4. **NEVER** hardcode colors/spacing — CSS Custom Properties always
5. **NEVER** use CommonJS (`require` / `module.exports`)
6. **NEVER** skip Shadow DOM in Web Components — use `BaseComponent`
7. **NEVER** use inline `<style>` or `<script>` blocks
8. **NEVER** skip semantic HTML elements (`<div>` soup)
9. **NEVER** use `var`, `let` when `const` suffices
10. **NEVER** skip i18n keys for user-visible text
