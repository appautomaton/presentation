# P13 Stacked Bar — Slot Budgets

## Title zone
- **Section tag**: ≤ 40 chars (e.g., "EXHIBIT 5 | ATTRITION ANALYSIS")
- **Action title**: ≤ 90 chars; 2 lines max
- **Subtitle**: ≤ 80 chars; 1 line

## Bar data
- **Bars**: 4–10 bars (one per time period or category)
- **Bar label**: ≤ 12 chars (appears below x-axis)
- **Segments per bar**: 2–4 (more than 4 becomes unreadable)
- **Segment name**: ≤ 20 chars (appears in legend)
- **Segment value**: numeric, displayed inside segment if bar height allows

## Legend
- Auto-derived from first bar's segment names
- 2–4 entries; horizontal layout below chart

## Annotations (sidebar, optional)
- 1–3 annotation blocks
- **Annotation text**: ≤ 120 chars per block

## Source
- **Source line**: ≤ 80 chars

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  bars: [{ label, segments: [{ name, value, color? }] }],
  legend?: [{ name, color }],       // auto-derived from first bar if omitted
  annotations?: [{ text }],
  source?
}
```
