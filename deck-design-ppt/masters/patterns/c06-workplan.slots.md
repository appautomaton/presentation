# C06 Workplan — Slot Budgets

## Title zone
- **Section tag**: ≤ 40 chars
- **Action title**: ≤ 90 chars; 2 lines max
- **Subtitle**: ≤ 80 chars; 1 line

## Grid dimensions
- **Columns**: 4–8 time periods (e.g., "Day 1–15", "Week 1", "Q1")
- **Column label**: ≤ 12 chars
- **Rows**: 4–12 activities/requirements
- **Row ID**: ≤ 3 chars (e.g., "1a", "2b"); displayed in circle badge
- **Row label**: ≤ 40 chars; single line preferred

## Gantt bars
- **Start**: column index (0-based)
- **Span**: number of columns; minimum 1
- Bars are semi-transparent with accent border

## Milestones (optional)
- 1–4 milestone markers below the grid
- **Milestone label**: ≤ 15 chars
- **Column**: can be fractional (e.g., 1.5 = between columns 1 and 2)

## Source
- **Source line**: ≤ 80 chars

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  columns: [string],                          // time period labels (e.g., ['Week 1','Week 2',...])
  rows: [{ id?, label, start, span, color? }], // start = column index, span = column count
  milestones?: [{ label, column, icon? }],     // markers at specific columns
  source?
}
```
