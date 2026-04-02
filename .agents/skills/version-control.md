---
name: version-control
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - git
  - commit
  - serve
  - deploy
---

# Version Control — HTML / Vanilla JS

## Commits

- `feat(components): add modal-dialog web component`
- `fix(router): handle missing hash routes gracefully`
- `style(tokens): update color palette custom properties`

## Development Server

```bash
# Simple local server (no build needed)
npx serve src
# or
python3 -m http.server 8080 --directory src
```

## Deployment

```bash
# Just copy the src/ folder — no build step
rsync -av src/ dist/
# Or use any static hosting (Netlify, Vercel, GitHub Pages)
```

## .gitignore

```
node_modules/
.DS_Store
```

## Project Setup

```bash
# Minimal setup — only dev dependencies for testing
npm init -y
npm install -D @web/test-runner @open-wc/testing
```

## File Organization

```
# Keep it flat and simple
src/
├── index.html         ← Single entry point
├── components/        ← All web components
├── store/             ← State management  
├── services/          ← API layer
├── styles/            ← CSS files
└── utils/             ← Helpers
```
