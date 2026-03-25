# C04 — Facts vs Perspectives — Slot Budgets (Consulting-only)

- **For:** left column = facts/data; right column = implications/recommendations.
- **Slots (budgets):**
  - `h2`: <= 140 chars.
  - Left bullets: 3–5; <= 90 chars.
  - Right bullets: 3–5; <= 90 chars.
  - Mini-exhibit bars (3 rows): label <= 10 chars; value <= 4 chars.
  - Callouts: <= 120 chars each.
- **Computed (from data):** horizontal fill widths.
  - Choose `max_value` and a `max_fill_pt` (template uses ~150pt at the high end).
  - `fill_pt = round((value / max_value) * max_fill_pt)`.
  - Note: the reference template uses visually adjusted (non-linear) widths for readability. Linear scaling is acceptable; adjust individual bars if the proportions look off at small values.

**Data schema:**
```js
{
  sectionTag?, title,
  facts: { bullets: [string], chart?: { type, series, colors, ... } },
  perspectives: { bullets: [string], implication?, nextStep? },
  source?
}
```
