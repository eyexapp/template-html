---
name: testing
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - test
  - web test runner
  - component test
  - accessibility test
---

# Testing — HTML / Vanilla JS

## Web Test Runner

```javascript
// test/user-card.test.js
import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/user-card.js';

describe('user-card', () => {
  it('renders name and email', async () => {
    const el = await fixture(html`
      <user-card name="Alice" email="alice@test.com"></user-card>
    `);
    const shadow = el.shadowRoot;
    expect(shadow.querySelector('.name').textContent).to.equal('Alice');
    expect(shadow.querySelector('.email').textContent).to.equal('alice@test.com');
  });

  it('updates on attribute change', async () => {
    const el = await fixture(html`<user-card name="Alice"></user-card>`);
    el.setAttribute('name', 'Bob');
    await el.updateComplete;
    expect(el.shadowRoot.querySelector('.name').textContent).to.equal('Bob');
  });
});
```

## Store Tests

```javascript
// test/store.test.js
import store from '../src/store/store.js';

describe('store', () => {
  it('notifies subscribers on state change', () => {
    let received = null;
    store.subscribe(state => { received = state; });
    store.setState({ users: [{ id: 1 }] });
    expect(received.users).to.have.lengthOf(1);
  });

  it('unsubscribes correctly', () => {
    let callCount = 0;
    const unsub = store.subscribe(() => { callCount++; });
    store.setState({ loading: true });
    unsub();
    store.setState({ loading: false });
    expect(callCount).to.equal(1);
  });
});
```

## Accessibility Testing

```javascript
import { expect, fixture, html } from '@open-wc/testing';
import { a11yAudit } from '@open-wc/testing';

it('passes a11y audit', async () => {
  const el = await fixture(html`<user-card name="Alice" email="a@b.com"></user-card>`);
  await expect(el).to.be.accessible();
});
```

## Manual Browser Tests

```html
<!-- test/manual.html — open in browser -->
<script type="module">
  import '../src/components/user-card.js';
</script>
<user-card name="Test User" email="test@example.com"></user-card>
```

## Running Tests

```bash
npx @web/test-runner "test/**/*.test.js" --node-resolve
npx @web/test-runner --watch  # Development mode
```
