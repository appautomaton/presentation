# P05 — Narrative Arc — Slot Budgets

**Styles:** consulting · founder · sequoia
**For:** Time series / progression — deconstructed chart (consulting), product growth (founder), market cycles (sequoia).

**Slots:**
- `h2`: <= 120 chars.
- `.subtitle`: <= 120 chars.
- Bar labels: numeric <= 6 chars.
- Callout: `.callout-text` <= 200 chars.
- **Computed geometry:** bar heights scale proportionally to values. The pattern JS handles this automatically.

**Data schema:**
```js
{
  sectionTag?, title,
  milestones: [{ label, year, description, highlight? }],
  source?
}
```
