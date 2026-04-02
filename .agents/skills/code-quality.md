---
name: code-quality
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - code quality
  - naming
  - accessibility
  - semantic
  - css
---

# Code Quality — HTML / Vanilla JS

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Custom Element | kebab-case (2+ words) | `<user-card>`, `<app-header>` |
| CSS Custom Property | --kebab-case | `--color-primary` |
| CSS Class | kebab-case | `.card-title` |
| JS Variable | camelCase | `userName` |
| JS Function | camelCase | `handleClick()` |
| JS Constant | UPPER_SNAKE | `MAX_RETRIES` |
| File | kebab-case | `user-card.js` |
| CSS Layer | lowercase | `@layer components` |

## Semantic HTML

```html
<!-- ✅ Semantic -->
<header>
  <nav aria-label="Main navigation">
    <ul><li><a href="#/">Home</a></li></ul>
  </nav>
</header>
<main>
  <article>
    <h2>Title</h2>
    <p>Content</p>
  </article>
</main>
<footer>...</footer>

<!-- ❌ Div soup -->
<div class="header"><div class="nav">...</div></div>
```

## Accessibility

```html
<!-- ARIA attributes -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<nav id="menu" aria-hidden="true">...</nav>

<!-- Image alt text -->
<img src="photo.jpg" alt="User profile photo" width="100" height="100">

<!-- Form labels -->
<label for="email">Email</label>
<input id="email" type="email" required aria-describedby="email-help">
<span id="email-help">Enter your work email</span>
```

## Modern CSS

```css
/* Container queries */
.card-container {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .card { display: grid; grid-template-columns: 1fr 2fr; }
}

/* Logical properties */
.card { margin-inline: auto; padding-block: 1rem; }

/* :has() selector */
.form:has(:invalid) .submit { opacity: 0.5; pointer-events: none; }
```

## Module Pattern

```html
<!-- index.html -->
<script type="module">
  import './components/app-header.js';
  import './components/user-card.js';
  import { addRoute } from './utils/router.js';
  import store from './store/store.js';

  addRoute('/', () => { /* render home */ });
  addRoute('/about', () => { /* render about */ });
</script>
```

## Fetch API

```javascript
// services/api.js
const BASE_URL = '/api';

export async function fetchJSON(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export const getUsers = () => fetchJSON('/users');
export const createUser = (data) => fetchJSON('/users', {
  method: 'POST',
  body: JSON.stringify(data),
});
```
