# P04 — Scorecard — Slot Budgets

**Styles:** consulting (6 cards) · founder (5 cards) · sequoia (6 cards)
**For:** KPI dashboard — health check (consulting), traction metrics (founder), damage assessment (sequoia).

**Slots (per card):**
- `.section-tag`: <= 40 chars. Uppercase exhibit label.
- `h2`: <= 90 chars.
- `.title-context`: <= 120 chars (consulting).
- `.card-label`: <= 22 chars.
- `.card-number`: <= 10 chars.
- `.card-trend`: <= 55 chars.
- `.card-benchmark`: <= 55 chars (italic).
- `.summary-text`: <= 240 chars (consulting only).
- Status dots: `.status-green` / `.status-amber` / `.status-red`.

**Layout:** Flex-wrap grid, 3 cards per row. Cards use `flex: 1 1 calc(33.33% - 6pt)` — add or remove cards freely, rows rebalance automatically.

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  cards: [{ label, value, trend?, benchmark?, statusColor? }],
  assessment?, source?
}
```
