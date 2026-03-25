# C03 — Evaluation Grid — Slot Budgets (Consulting-only)

- **For:** criteria × options matrix with RAG color fills.
- **Slots (budgets):**
  - `h2`: <= 140 chars.
  - `.subtitle`: <= 110 chars.
  - Criteria (rows): 6–9; each criterion label <= 24 chars.
  - Options (cols): 3–5; option header <= 12 chars.
  - Score cells: **9pt**. Use a constrained vocabulary:
    - Recommended labels: `Strong`, `Mixed`, `Weak`, `High`, `Low`.
    - Max 7 characters per score cell.
  - Sidebar bullets: 3–5; <= 80 chars.

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  columns: [string],                          // option names
  rows: [{ criteria, ratings: [string] }],     // rating text per column
  ratingColors?: { Strong: hex, Mixed: hex, Weak: hex },
  sidebar?: { title, bullets: [string] },
  source?
}
```
