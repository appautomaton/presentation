# P01 — Anchor — Slot Budgets

## Consulting

- **For:** cover slide for consulting/board deliverables.
- **Slots (budgets):**
  - `h1` deck title: <= 40 chars; 1 line preferred (2 max).
  - `.subtitle` positioning line: <= 90 chars; 2 lines max.
  - `.scope` scope sentence: <= 220 chars; 3 lines max.
  - Footer: `{org-name}`, `{location}`, `{date}`, `{confidentiality-notice}`, `{document-id}` (keep each on one line).
  - **Layout:** Centered content-wrap (60pt side padding). Footer rule separator above two-column footer.

## Founder

- **For:** pitch cover slide (company + tagline).
- **Slots (budgets):**
  - `h1` company name: <= 24 chars; 1 line preferred.
  - `.tagline`: <= 80 chars; 2 lines max.
  - `.detail`: <= 180 chars; 3 lines max.
  - Footer lines: `{address}`, `{website}` (1 line each), `{founder-names}` (<= 60 chars), `{founding-date}`.

## Sequoia

- **For:** dramatic opener (high stakes / urgent tone).
- **Slots (budgets):**
  - `h1`: <= 18 chars; 1 line (large serif).
  - `.subtitle`: <= 90 chars; 2 lines max.
  - `.context`: <= 220 chars; 4 short lines max.
  - `.date-line`: `{location} • {date}` (1 line).

**Data schema:**
```js
{ title, subtitle?, scope?, org?, location?, date?, confidentiality? }
```
