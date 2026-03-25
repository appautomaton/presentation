# P06 — Fork — Slot Budgets

## Consulting

- **For:** option comparison (criteria grid + recommendation band).
- **Slots (budgets):**
  - `.section-tag`: <= 40 chars. Uppercase exhibit label.
  - `h2`: <= 90 chars.
  - Option headers: `.opt-title` <= 40 chars.
  - Option metrics: `.opt-metric` <= 18 chars.
  - Criteria rows: 4–6 max.
    - `.crit-text` <= 22 chars.
    - `.val-text` <= 48 chars (1 line preferred). Use `.val-weak` / `.val-strong` for emphasis.
  - Recommendation band `.reco-text`: <= 140 chars.
  - **Layout:** Criteria column fixed (150pt), option columns flex equally. Add options by duplicating `.opt-head` + `.cell-a`/`.cell-b` — widths rebalance.

## Founder

- **For:** product vs incumbent (two panels + VS chip).
- **Slots (budgets):**
  - `h2`: <= 70 chars.
  - Panel titles `h3`: <= 22 chars.
  - Prices: <= 10 chars.
  - Bullets: 3–5 per side; each <= 55 chars.
  - Chips: 2–4; each chip text <= 18 chars.
  - Verdict line: <= 120 chars.

## Sequoia

- **For:** asymmetric "bad path vs good path" rhetoric.
- **Slots (budgets):**
  - `h2`: <= 90 chars.
  - Bullets: 4–6 per side; each <= 55 chars.
  - Outcome band: 2 outcomes; metric <= 16 chars; subtext <= 28 chars.
  - Verdict line: <= 40 chars.

**Data schema:**
```js
{
  sectionTag?, title,
  optionA: { title, metric? },
  optionB: { title, metric?, recommended? },
  criteria: [{ label, a, b }],
  recommendation?,
  source?
}
```
