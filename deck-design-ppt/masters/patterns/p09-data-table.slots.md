# P09 — Data Table — Slot Budgets

**Styles:** consulting · founder · sequoia
**For:** Structured numeric comparison — financials/benchmarks (consulting), pricing/cohorts (founder), burn/runway (sequoia).

**Slots:**
- `.section-tag`: <= 40 chars. Uppercase exhibit label (e.g., "EXHIBIT 3 | FINANCIAL ANALYSIS").
- `h2`: <= 110 chars.
- `.subtitle`: <= 90 chars.
- Header cells: <= 16 chars each.
- Row labels (`.t-label`): <= 24 chars.
- Numeric cells (`.t-data`): <= 10 chars.
- Delta cells (`.t-delta`): <= 10 chars. Use `.delta-neg` / `.delta-pos` for red/green coloring.
- Data rows: 6–8 + 1 summary (sequoia: <= 6 to preserve legibility).
- Callout headline (`.callout-headline`): <= 100 chars. Bold insight.
- Callout detail (`.callout-detail`): <= 170 chars. Supporting evidence.

**Layout:** Flex-based columns (`t-label` / `t-data` / `t-delta`). Add or remove data columns freely — widths rebalance automatically.

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  columns: [{ label, width, align }],   // align: 'left' | 'right'
  rows: [{ cells: [string], highlight?, total? }],
  callout?: { text },
  source?
}
```
