# C02 — Waterfall/Bridge — Slot Budgets (Consulting-only)

- **For:** start/end bridge with intermediate deltas.
- **Slots (budgets):**
  - `h2`: <= 140 chars.
  - `.subtitle`: <= 120 chars.
  - Exhibit title: <= 120 chars.
  - Step labels under the bridge: <= 16 chars each (2 lines max).
  - Callout bullets: 2–3 each; <= 80 chars.
- **Arithmetic constraint:** `end_total = start_total + sum(deltas)`.
- **Computed (from data):** bar heights/tops and connector `top`.
  - Use a consistent scale (e.g., `2pt per $1`).
  - Totals and deltas must visually match the same scale.

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  bars: [{ label, value, delta?, color? }],  // first=start, last=end, middle=steps
  panels?: [{ title, bullets: [string] }],
  source?
}
```
