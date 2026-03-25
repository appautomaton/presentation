# P03 — Evidence — Slot Budgets

**Styles:** consulting · founder · sequoia
**For:** Claim + chart proof — exhibit-driven (consulting), traction proof (founder), macro deterioration (sequoia).

**Slots:**
- `h2`: <= 120 chars.
- `.chart-axis-note`: <= 120 chars.
- `.chart-annotation`: <= 140 chars.
- Callouts: up to 3 (founder: 1–2). Each `.callout-secondary-text` <= 140 chars.
- Key takeaway: `.callout-text` <= 180 chars.
- **Note:** chart is a native PowerPoint chart via `addChart()`. Use thumbnail QA for visual review.

**Data schema:**
```js
{
  sectionTag?, title,
  chart: { type, series, colors, yMin?, yMax?, yStep?, yTitle? },
  callouts: [{ label, text }],
  source?
}
```
