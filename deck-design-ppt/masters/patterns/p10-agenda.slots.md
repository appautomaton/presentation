# P10 — Agenda — Slot Budgets

**Styles:** consulting · founder · sequoia
**For:** Navigation / orientation — section map (consulting), pitch outline (founder), ominous chaptering (sequoia).

**Slots:**
- `h2`: <= 20 chars. Usually "Agenda" or equivalent.
- `.section-title`: <= 32 chars.
- `.section-page`: <= 2 digits.
- Section count: 4–6 (sequoia: <= 5).
- Exactly one `.section-item` gets the `.active` class.

**Layout:** Flex row per section-item: fixed `.section-num` (36pt) + flexible `.section-title` + flex-fill `.section-dots` + fixed `.section-page` (30pt). Add or remove rows freely.

**Data schema:**
```js
{
  title?,
  items: [{ num, title, page?, active? }],
}
```
