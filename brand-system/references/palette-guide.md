# Palette Guide

How to build a color palette for a visual identity system.

## Starting positions

The palette always grows from an anchor color. Three ways to find it:

**User provides a color** — build around it directly. Derive dark, light, muted, and text variants by adjusting lightness and saturation. Pick harmonious signal colors that don't clash.

**Known brand** — extract the primary brand color from research (their website, press kit, brand page). Mute it 10-15% for slide density — brand colors are designed for screens, not data-dense slides.

**Starting fresh** — choose a color that fits the project's tone. Research what colors dominate the space (tech → blues, health → greens/teals, finance → navies, creative → warm/bold). Avoid choosing a color that makes the project look like a competitor.

## The eight palette roles

Every palette needs exactly these eight roles. No more, no fewer.

| Role | Purpose | How to derive |
|---|---|---|
| **Surface Dark** | Cover backgrounds, section dividers, dark-mode slides | Darken the accent to ~15-20% lightness. Or use a neutral navy (#1A2744) / charcoal (#0A0E14). Must pass WCAG contrast ≥ 4.5:1 against white text. |
| **Accent** | Headers, highlights, chart primary, action elements, brand marker | The anchor color — the brand's primary or the user's chosen color. Mute saturation 10-15% from the pure brand version for print legibility. |
| **Accent Light** | Borders, gridlines, subtle tints, hover states | Lighten accent to 40-50% lightness. Should feel like a whisper of the accent, not a second accent. |
| **Surface Muted** | Card fills, evidence panels, alternate row backgrounds | Lighten accent to 90-95% lightness — nearly white but with a perceptible tint. Should be distinguishable from pure white on screen. |
| **Surface** | Default slide background | White (#FFFFFF) or off-white (#F8F9FA). Off-white is warmer and reduces eye strain; pure white is crisper and more institutional. |
| **Positive** | Growth indicators, favorable deltas, success states | A green that harmonizes with the accent. Avoid traffic-light green — use muted, natural greens (#0D9D58, #2E9E5A, #788C5D). |
| **Warning** | Attention callouts, neutral caution, in-progress states | Amber or gold (#F4B400, #E6A800). Never pure yellow — poor contrast on white backgrounds. |
| **Negative** | Risk indicators, unfavorable deltas, error states | Red or coral (#DB4437, #C46686, #A43C35). Should feel serious but not alarming. Must not clash with the accent. |

## Text colors

Derived from the palette, not chosen independently:

| Role | How to derive |
|---|---|
| **Text** (primary) | A dark variant of the accent or surface-dark color. Never pure #000000 — use #1A2744 or #141413 or similar. |
| **Text Muted** (secondary) | 40-50% lightness, neutral or slightly warm. For annotations, labels, secondary copy. |
| **Text Fine** (tertiary) | 55-65% lightness. For footnotes, source lines, metadata. Should be readable but recessive. |
| **Text on Dark** | White (#FFFFFF) or near-white. Used on surface-dark backgrounds. |
| **Chart Primary** | Usually the same as accent. |
| **Chart Secondary** | A neutral gray (#999999 or #9AA0A6). For comparator series, secondary data. |

## Derivation from a single anchor color

Given one hex value (the anchor), derive the full palette:

1. **Accent** = the anchor, muted 10-15% if needed
2. **Surface Dark** = anchor at 15-20% lightness (darken dramatically)
3. **Accent Light** = anchor at 70-80% lightness (lighten significantly)
4. **Surface Muted** = anchor at 95% lightness (barely tinted white)
5. **Text** = anchor at 10-15% lightness (very dark variant)
6. **Text Muted** = neutral at 35-40% lightness
7. **Text Fine** = neutral at 55-60% lightness
8. **Positive/Warning/Negative** = choose signal colors that harmonize (check they don't clash with accent in a chart context)

## Anti-patterns

- Full-saturation brand colors on dense slides → mute them
- More than one accent color → dilutes authority
- Pure black (#000000) text → harsh, use a dark variant instead
- Signal colors that match consumer UI (traffic-light bright) → too loud for analytical slides
- Accent and negative colors that are too close in hue → confusing in charts

## Contrast testing

Before finalizing, mentally test the palette in three contexts:

1. **KPI card**: accent metric number + text label + positive/negative trend arrow on surface-muted background. Is it readable?
2. **Chart**: accent bars + chart-secondary bars + positive/negative delta indicators on white. Do the colors separate clearly?
3. **Cover slide**: white title + accent-light subtitle on surface-dark background. Does the contrast work?
