# MyApp — Vanilla HTML/CSS/JS Template

A production-ready, zero-dependency template for building modern web applications with pure HTML, CSS, and JavaScript. No build tools, no frameworks — just the platform.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | CSS Cascade Layers + Custom Properties (Design Tokens) |
| JavaScript | ES Modules (native `import/export`) |
| Components | Web Components (Custom Elements + Shadow DOM) |
| State | Pub/sub store (`createStore`) |
| i18n | JSON-based translations (`createI18n`) |
| Testing | Vitest + jsdom |
| Serving | Nginx (Docker) or any static server |

## Project Structure

```
src/
├── css/
│   ├── tokens.css      ← Design tokens (colors, spacing, typography)
│   ├── reset.css       ← Modern CSS reset
│   ├── layouts.css     ← Layout primitives (container, stack, grid, card)
│   ├── utilities.css   ← Utility classes (text, spacing, buttons)
│   └── main.css        ← Entry point with @layer declarations
├── js/
│   ├── main.js         ← App entry — registers components, exports libs
│   ├── components/
│   │   ├── base-component.js  ← Base class for all Web Components
│   │   ├── app-header.js      ← Site header with nav
│   │   ├── app-footer.js      ← Site footer
│   │   └── theme-toggle.js    ← Dark/light theme switcher
│   └── lib/
│       ├── state.js    ← Pub/sub state management
│       ├── i18n.js     ← JSON-based internationalization
│       └── dom.js      ← DOM utility helpers ($, $$, on, createElement)
├── i18n/
│   ├── en.json         ← English translations
│   └── tr.json         ← Turkish translations
├── pages/
│   ├── about.html      ← About page
│   └── 404.html        ← Not found page
├── assets/             ← Static assets (icons, images)
└── index.html          ← Home page
```

## Quick Start

```bash
# Development (any static server works)
npx serve src --listen 3000 --cors
# or
npm run dev

# Run tests
npm test

# Docker
docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000).

## CSS Architecture

The stylesheet uses **Cascade Layers** for predictable specificity:

```css
@layer tokens, reset, layouts, utilities, components;
```

Layer priority (last wins): tokens → reset → layouts → utilities → components.

### Design Tokens

All visual decisions are centralized in `src/css/tokens.css` as CSS Custom Properties:

- **Colors**: `--color-primary-*`, `--color-neutral-*`, semantic (`--color-bg`, `--color-text`, `--color-accent`)
- **Typography**: `--font-sans`, `--font-mono`, `--text-sm` through `--text-4xl`
- **Spacing**: `--space-1` through `--space-20`
- **Borders/Shadows**: `--radius-*`, `--shadow-*`

### Dark Mode

Toggle via `[data-theme="dark"]` on `<html>`. The `<theme-toggle>` component handles this automatically with localStorage persistence.

## Web Components

All components extend `BaseComponent`:

```js
import { BaseComponent } from './base-component.js';

class MyWidget extends BaseComponent {
  get styles() { return `:host { display: block; }`; }
  get template() { return `<p>Hello</p>`; }
}
customElements.define('my-widget', MyWidget);
```

Built-in helpers: `this.$()`, `this.$$()` for shadow root queries.

## State Management

Minimal pub/sub store:

```js
import { createStore } from './lib/state.js';

const store = createStore({ count: 0 });
store.subscribe('count', (val) => console.log(val));
store.set('count', 1);
```

## Internationalization

JSON-based i18n with runtime loading:

```js
import { createI18n } from './lib/i18n.js';

const i18n = createI18n({ defaultLocale: 'en' });
await i18n.load('en');
i18n.t('hero.title'); // "Welcome to MyApp"
```

## Testing

```bash
npm test              # Run once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

Tests are in `tests/` using Vitest + jsdom. Test pure JS modules — state, i18n, dom utilities.

## Docker

```bash
docker compose up --build    # Start on port 3000
docker compose down          # Stop
```

Nginx serves the `src/` directory with security headers, gzip, and cache control.

## Commands

| Command | Description |
|---------|------------|
| `npm run dev` | Start dev server (port 3000) |
| `npm test` | Run tests |
| `npm run test:watch` | Watch mode |
| `npm run test:coverage` | Coverage report |
| `docker compose up --build` | Build & start Docker |
| `docker compose down` | Stop Docker |

## Adding a New Feature

1. **CSS token** → `src/css/tokens.css`
2. **Layout pattern** → `src/css/layouts.css`
3. **Web Component** → `src/js/components/`, extend `BaseComponent`, import in `main.js`
4. **Page** → `src/pages/`, copy structure from `index.html`
5. **Translation** → Add keys to ALL files in `src/i18n/`
6. **Test** → `tests/`, run `npm test`

## Browser Support

Modern browsers with support for:
- CSS Cascade Layers (`@layer`)
- CSS Custom Properties
- Custom Elements v1
- ES Modules
- Shadow DOM