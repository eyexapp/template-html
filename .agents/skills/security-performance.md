---
name: security-performance
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - security
  - performance
  - xss
  - csp
  - lazy load
  - lighthouse
---

# Security & Performance — HTML / Vanilla JS

## Performance

### Native Lazy Loading

```html
<img src="hero.jpg" alt="Hero" loading="eager" fetchpriority="high">
<img src="photo.jpg" alt="Photo" loading="lazy" width="400" height="300">
```

### Resource Hints

```html
<head>
  <link rel="preconnect" href="https://api.example.com">
  <link rel="preload" href="/styles/tokens.css" as="style">
  <link rel="modulepreload" href="/components/app-header.js">
</head>
```

### Efficient DOM Updates

```javascript
// ✅ Use DocumentFragment for batch DOM updates
const fragment = document.createDocumentFragment();
users.forEach(user => {
  const card = document.createElement('user-card');
  card.setAttribute('name', user.name);
  fragment.appendChild(card);
});
container.replaceChildren(fragment);

// ❌ Avoid innerHTML for dynamic content (XSS risk + reflow)
container.innerHTML = users.map(u => `<div>${u.name}</div>`).join('');
```

### Debounce / Throttle

```javascript
function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

searchInput.addEventListener('input', debounce(handleSearch, 300));
```

### CSS containment

```css
.card { contain: layout style paint; }
.scrollable-list { content-visibility: auto; contain-intrinsic-size: 0 500px; }
```

## Security

### XSS Prevention

```javascript
// ✅ Use textContent for user data
element.textContent = userInput;

// ✅ Use setAttribute for attributes
el.setAttribute('data-id', userId);

// ❌ NEVER use innerHTML with user input
element.innerHTML = userInput; // XSS vulnerability
```

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https:;">
```

### Sanitize External Data

```javascript
// Sanitize HTML if you must render it
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
```

### Subresource Integrity

```html
<script src="https://cdn.example.com/lib.js"
  integrity="sha384-abc123..."
  crossorigin="anonymous"></script>
```

### HTTPS Only

```html
<meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains">
```
