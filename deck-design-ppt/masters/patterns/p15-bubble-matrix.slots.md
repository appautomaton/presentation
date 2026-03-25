# P15 Bubble Matrix — Slot Budgets

## Title zone
- **Section tag**: ≤ 40 chars
- **Action title**: ≤ 90 chars; 2 lines max
- **Subtitle**: ≤ 80 chars; 1 line

## Matrix dimensions
- **Columns**: 3–7 (each with label + optional color)
- **Column label**: ≤ 15 chars
- **Rows**: 2–5
- **Row label**: ≤ 15 chars

## Bubble sizing
- Area-proportional: diameter = refDiam × √(value / refValue)
- Default reference: value 10 → 0.45" diameter
- Values of 0 produce no bubble (skipped)
- Values inside bubble displayed if diameter > 0.35"

## Sidebar (optional)
- **Title**: ≤ 20 chars (e.g., "KEY INSIGHT")
- **Bullets**: 2–4 items, ≤ 60 chars each

## Source
- **Source line**: ≤ 80 chars

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  columns: [{ key, label, color? }],
  rows: [{ key, label }],
  values: { [rowKey]: { [colKey]: number } },  // value drives bubble size
  referenceValue?: number,        // value that produces the reference diameter (default: 10)
  referenceDiameter?: number,     // diameter in inches at referenceValue (default: 0.45)
  sidebar?: { title, bullets: [string] },
  source?
}
```
