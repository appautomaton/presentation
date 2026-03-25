# P07 — Machine — Slot Budgets

**Styles:** consulting · founder · sequoia
**For:** Mechanism / process — causal chain (consulting), growth flywheel (founder), crisis transmission (sequoia).

**Slots:**
- `h2`: <= 110 chars.
- `.subtitle`: <= 90 chars.
- Steps: 4–6. `.step-title` <= 55 chars; `.step-desc` <= 80 chars.
- Callout: <= 200 chars.

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  steps: [{ num, title, description }],
  conclusion?,
  source?
}
```
