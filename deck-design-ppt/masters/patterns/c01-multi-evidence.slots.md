# C01 — Multi-evidence — Slot Budgets (Consulting-only)

- **For:** dense "exhibit + metrics + sidebar" consulting page.
- **Slots (budgets):**
  - `h2` action title: <= 140 chars (this layout can carry a longer title).
  - `.subtitle`: <= 90 chars.
  - Exhibit kicker/title: kicker is fixed; title <= 110 chars.
  - Chart groups: 3–5. `xlab` <= 10 chars.
  - Metrics: exactly 3 cards.
    - `.metric-value`: <= 12 chars.
    - `.metric-label`: <= 60 chars (2 lines max).
  - Sidebar bullets: 3–5 per box; each <= 80 chars.
- **Computed (from data):** bar heights.
  - Choose a y-axis max (`Ymax`) matching the top tick.
  - `height_pt = round((value / Ymax) * 150)`.
  - Values up to ~80% of Ymax fit without clipping.

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  chart: { type, series, colors, ... },
  metrics?: [{ label, value }],
  sidebar: { drivers: [string], implications?: [string] },
  source?
}
```
