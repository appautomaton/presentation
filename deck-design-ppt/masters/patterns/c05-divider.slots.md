# C05 — Section Divider — Slot Budgets (Consulting-only)

- **For:** section breaks in consulting decks.
- **Slots (budgets):**
  - `.band-num`: 2 digits.
  - `.band-sub` and `.band-sub-line`: <= 18 chars each.
  - `.panel-title`: <= 60 chars (2 lines max).
  - `.panel-context`: <= 180 chars.
  - Meta chips: 2–3; each <= 40 chars.

**Data schema:**
```js
{ sectionLabel?, sectionNum, title }
```
