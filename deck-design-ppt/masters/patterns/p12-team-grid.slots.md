# P12 — Team Grid — Slot Budgets

**Styles:** consulting · founder · sequoia
**For:** Team introduction — engagement team (consulting), founding team (founder), wartime leaders (sequoia).

**Slots:**
- `h2`: <= 110 chars.
- `.subtitle`: <= 120 chars.
- Team cards: exactly 4.
  - Avatar: replace image URL. Consulting = rectangular with green border; Founder = circular with teal border; Sequoia = rectangular grayscale.
  - `.t-name`: <= 20 chars.
  - `.t-role`: <= 24 chars.
  - `.t-bio`: <= 90 chars (2 lines max).

**Data schema:**
```js
{
  sectionTag?, title, subtitle?,
  members: [{ name, role, bio }],
  source?
}
```
