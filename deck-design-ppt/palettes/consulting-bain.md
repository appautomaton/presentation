# Bain — Monochrome + Red Accent

Decision-driven, facts-vs-perspectives. Red rule below action title (signature). Gray is the default; red marks the one thing that matters. "Results, not reports."

## Core Palette

Monochrome baseline + one accent. Warm grays (not cool blue-gray). No pure black. The restraint is the point.

| Hex | Token | L | Use |
|---|---|---|---|
| `#2B2B2B` | Midnight | 17% | Section divider background |
| `#CC0000` | Accent | — | Red rule, one focal highlight per exhibit, active agenda item |
| `#E8E5E2` | Warm gray | 90% | Column header bands (KEY FACTS / PERSPECTIVES), alternate fills |
| `#F5F4F2` | Canvas | 96% | Default slide background |

## Text

| Hex | Token | L | Use |
|---|---|---|---|
| `#1A1A1A` | Text | 10% | Body copy, action titles |
| `#666666` | Gray | 40% | Secondary text, annotations |
| `#888888` | Fine | 53% | Footnotes, source lines |

## Text Pairing

- On Canvas: Text headlines (bold), Text body.
- On Midnight: `#FFFFFF` first, Warm gray second.
- Fine for source lines and footnotes only.
- Accent for header rule and one focal metric only — never body text.
- Facts-vs-Perspectives header bands: Warm gray background, ALL CAPS bold labels in Text.

## Charts

**One red element per exhibit. No exceptions.** The focus bar gets Accent (`#CC0000`). Everything else is gray (`#999999`). If a chart needs a third series, use charcoal (`#333333`). No gradients, no shadows, no rounded corners. Flat, solid bar fills. Horizontal gridlines only (`#E0E0E0`, ~0.5pt).

## Typography

| Font | Role | Use |
|---|---|---|
| Source Sans 3 | Display + body | Action titles, body copy, bullets, tables, source lines |
| Arial | Fallback | When Source Sans 3 unavailable |

Source Sans 3 loads from `libs/source-sans-3/`. Variable weights 200–900.

## Mode Variations

| Mode | Accent | What changes |
|---|---|---|
| **Diagnostic** | Bain red (`#CC0000`) | Recurring agenda with red active item. High body density. L2–L3. |
| **Publication** | Bain red (restrained) | Entire pages may be gray-only with one red bar. L1–L2. |
| **Legacy** | Institutional blue (`#4A7FB5`) | Blue replaces red as accent. Client-branded, no Bain identity. |
