# P11 — Product Showcase — Slot Budgets

**Styles:** consulting · founder · sequoia
**For:** Platform demo with feature list — capability evidence (consulting), product-led storytelling (founder), crisis dashboard (sequoia).

**Slots:**
- `h2`: <= 110 chars.
- `.subtitle`: <= 120 chars.
- Product frame: screenshot image (replace URL). Consulting = clean flat frame; Founder = browser mockup with dots; Sequoia = dark frame with dimmed image.
- Features: 2–3 cards. `.feat-title` <= 24 chars; `.feat-desc` <= 100 chars.

**Data schema:**
```js
{
  sectionTag?, title,
  productTitle, productDescription?,
  features: [{ icon?, title, description }],
  source?
}
```
