# P14 Horizontal Bar — Slot Budgets

## Title zone
- **Section tag**: ≤ 40 chars
- **Action title**: ≤ 90 chars; 2 lines max
- **Subtitle**: ≤ 80 chars; 1 line

## Bar data
- **Bars**: 4–12 rows (ranked list)
- **Label**: ≤ 35 chars (left of bar); truncates visually beyond ~30 chars
- **Value**: numeric + optional unit suffix (e.g., "79%", "12.3M")
- **Highlight**: boolean; at most 1–2 bars highlighted per slide

## Layout
- Labels fixed at 2.8" width; bars fill remaining space proportionally
- Bar width = value / maxValue × 4.5"
- Alternating row backgrounds for readability

## Source
- **Source line**: ≤ 80 chars

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  bars: [{ label, value, unit?, color?, highlight? }],
  maxValue?,       // auto-derived if omitted
  source?
}
```
