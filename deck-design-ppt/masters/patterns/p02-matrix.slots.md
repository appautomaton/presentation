# P02 — Matrix — Slot Budgets

**Styles:** consulting · founder · sequoia
**For:** 2×2 positioning — strategic (consulting), product (founder), "what survives" (sequoia).

**Slots:**
- `h2`: <= 120 chars; 1 sentence.
- `.subtitle`: <= 90 chars.
- Quadrants: `.q-label` 1–2 words; `.q-desc` <= 45 chars.
- Dots: 4–8 (sequoia: <= 6). `.dot-label` 1 char; `.dot-name` <= 18 chars.
- Axis labels: fixed; 9pt.

**Data schema:**
```js
{
  sectionTag?, title,
  xAxis: { low, high }, yAxis: { low, high },
  items: [{ label, x, y, size? }],  // x,y in 0–100 range
  source?
}
```
