# Build Reference — Slide Construction

> Load this reference during **Phase 2 (Build)** when writing slide HTML, configuring ECharts, or structuring the build script. Not needed during planning or ghost deck construction.

## Build script

For decks with more than 5 slides, define a CSS class system in `headExtra` rather than repeating inline Tailwind on every slide.

```javascript
const { createDeck } = require('./skills/deck-design-pdf/engine');

createDeck({
  palette: 'consulting-mckinsey',
  title: 'Strategy Update Q1 2026',
  output: 'strategy-update.pdf',
  tier: 'document',  // 'document' (default) or 'presentation' for show decks
  width: 1280,       // optional
  height: 720,       // optional
  headExtra: `<style>
    /* Slide shell — CSS Grid prevents footer overflow */
    .deck-shell { height: 100%; display: grid; grid-template-rows: auto minmax(0,1fr) 48px; }
    .deck-header { padding: 28px 56px 8px 56px; border-top: 4px solid var(--accent); }
    .deck-body { min-height: 0; overflow: hidden; padding: 12px 56px 8px 56px; }
    .deck-footer { display: flex; align-items: center; justify-content: space-between;
                   padding: 0 56px; font-size: 12px; color: var(--text-fine);
                   border-top: 1px solid rgba(0,0,0,0.06); font-family: var(--font-body); }
    .deck-section { margin: 0 0 4px; font-size: 12px; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--accent); font-weight: 700; }
    .deck-title { margin: 0 0 8px; font-size: 30px; line-height: 1.15; letter-spacing: -0.03em;
                  color: var(--text); font-family: var(--font-heading); font-weight: 700; }
    .deck-rule { height: 3px; border-radius: 2px; background: var(--accent); margin-top: 4px; }
  </style>`,
  slides: [
    // Each string is the inner HTML of one slide.
    // The engine wraps each in <section class="slide">.
    `<div class="deck-shell">
       <div class="deck-header">
         <p class="deck-section">Section Label</p>
         <h2 class="deck-title">Action title — full sentence conclusion</h2>
         <div class="deck-rule"></div>
       </div>
       <div class="deck-body">
         <!-- content -->
       </div>
       <div class="deck-footer">
         <span>Source: Analysis, 2026</span>
         <span>Confidential</span>
       </div>
     </div>`,
  ],
});
```

Run: `node build-{slug}.js` → produces the PDF directly.

**Why `headExtra` CSS classes over inline Tailwind for the shell:**
- One change to `.deck-title` fixes all 20+ slides — vs editing each slide's `text-3xl font-semibold leading-snug tracking-tight`
- The grid shell guarantees footer placement structurally
- Token-efficient: a class name is ~15 chars vs ~80 chars of Tailwind utilities per slide
- Tailwind is still used for body content layout (grids, gaps, cards) — only the shell is CSS classes

**ECharts formatter warning:** Inside JavaScript template literals (backtick strings), `'${value}'` is interpreted as JS interpolation. Use `function(v) { return '$' + v + 'B'; }` instead. This applies to all `formatter`, `axisLabel.formatter`, and `label.formatter` properties.

## Modular authoring for large decks

For decks with more than ~10 slides, consider authoring each slide as a separate module file. The `createDeck()` API is unchanged — the convention only affects how the slide strings are assembled.

**Recommended structure:**

```
build-deck-name/
  slides/
    s01-cover.js
    s02-context.js
    s04-investment.js
    ...
    s17-flywheel.js
  shared/
    head-extra.js     ← palette tokens, CSS classes
  build.js            ← imports slides, calls createDeck()
```

Each slide module exports exactly two things:

```javascript
// s04-investment.js
module.exports = {
  html: `<div class="deck-shell">...</div>`,
  script: `(function() { /* echarts init for this slide */ })();`
};
```

`build.js` assembles and calls `createDeck()`:

```javascript
const slides = require('./slides/s04-investment');
// ...
createDeck({
  slides: [s01, s02, s04, ...].map(s => s.html + (s.script ? '<script>' + s.script + '</script>' : '')),
  headExtra,
  // ...
});
```

**Why this matters for quality:**
- Each slide file is 80–120 lines — readable in one pass; the agent can fix S11 without scrolling through 1,500 lines
- Slide-level isolation: changing S11's chart height cannot accidentally touch S14
- The space budget comment at the top of each module makes sizing decisions auditable
- One file = one argument = one layout decision — matches the ghost deck's one-slide-one-claim rule

This is a convention, not a requirement. For decks under 10 slides, a single build script is fine.

## Slide shell

The shell uses **CSS Grid with fixed row heights** — this structurally prevents footer overflow, which is the most common layout failure in deck production.

```html
<div style="height: 100%; display: grid; grid-template-rows: auto minmax(0, 1fr) 48px;">
  <!-- HEADER ZONE — action title with accent bar -->
  <div class="px-14 pt-8 pb-2 border-t-4 border-[var(--accent)]">
    <p class="text-xs font-semibold tracking-widest uppercase text-[var(--accent)] mb-1">
      Section Label
    </p>
    <h2 class="text-3xl font-semibold leading-snug tracking-tight text-[var(--text)]"
        style="font-family: var(--font-heading)">
      Action title — full sentence conclusion
    </h2>
  </div>

  <!-- BODY ZONE — all content lives here; overflow is clipped, never pushes footer -->
  <div class="px-14 py-3" style="min-height: 0; overflow: hidden;">
    <!-- Layout primitives go here (grids, cards, charts, etc.) -->
  </div>

  <!-- FOOTER ZONE — fixed 48px row, cannot be displaced -->
  <div class="px-14 flex items-center justify-between
              text-xs text-[var(--text-fine)]"
       style="font-family: var(--font-body); border-top: 1px solid var(--accent-light, #ccc)33;">
    <span>Source: Analysis team, 2026</span>
    <span>Confidential</span>
  </div>
</div>
```

**Why grid, not flex:** The `grid-template-rows: auto minmax(0, 1fr) 48px` layout guarantees three things:
1. Header takes its natural height (`auto`)
2. Body fills remaining space but **cannot push the footer off-slide** (`minmax(0, 1fr)`)
3. Footer is always exactly 48px from the bottom, regardless of body content

The older `flex flex-col h-full` + `flex-1` approach allowed body overflow to push the footer off the slide — a failure that required manual QA to catch.

Cover slides and dividers replace this shell with a full-bleed layout (see [Layout primitives](#layout-primitives) below).

## Atomic exhibits vs wrapped slides

The reusable production unit is the **atomic exhibit**: graph/table/visual only, with no header or footer baked into the template. Examples under `examples/*.js` export:

```javascript
{
  id,
  title,
  tier,
  proves,
  data,
  sectionLabel,
  actionTitle,
  source,
  exhibitId,
  responsiveSpec,  // optional: chart ranges or layout QA samples
  renderExhibit({ checkpoint, width, height, tokens }) { ... }
}
```

Use the shared helpers in `examples/_shared.js` to render:

- an exhibit-only QA artifact
- a wrapped slide reference artifact

Treat `examples/_shared.js` as the internal standards layer. Share only reusable typography, text roles, chart chrome, and repeated semantic colors. Keep exhibit geometry, data mapping, label placement, and one-off visual emphasis inside each template.

## Layout anti-patterns

Common failures in deck production. Avoid these:

| Anti-pattern | What happens | Fix |
|---|---|---|
| **`flex-1` on cards inside a grid** | Cards stretch to fill the grid cell height, leaving huge empty zones | Don't use `flex-1` on cards. Let cards be `auto`-height. Use `items-start` on the grid. |
| **`flex-1` on body zone** | Short content expands with whitespace; long content pushes footer off-slide. | Use the CSS Grid shell. The `minmax(0, 1fr)` body row handles both cases. |
| **`absolute` positioning for diagrams** | Elements float at hardcoded pixel offsets, break at different content sizes. | Use CSS Grid or Flexbox for all diagrams. |
| **Template literal `${value}` in ECharts formatters** | Inside a JS backtick string, evaluates as JavaScript, not ECharts template. | Use `function(v) { return v + '%'; }` for formatters. |
| **`mt-auto` on card metadata** | Pushes metadata to card bottom, leaving visual gap after content. | Use `mt-4` (fixed margin). Metadata should follow the content. |
| **Rounded corners everywhere** | Excessive `rounded-xl` creates a product/SaaS aesthetic, not consulting. | Use `rounded-lg` (8px) max. MBB decks prefer `rounded` (4px) or sharp corners. |
| **`align-items:center` on mismatched columns** | Unequal content heights float to vertical midpoint, leaving blank space. | Use `align-items:start` when columns differ in height. |
| **Landscape-only chart sizing** | Copying example heights (200–300px) on a 600px body zone leaves 300+px blank. | Start from body height, subtract surrounding elements, set chart to remainder. Portrait is valid. |
| **Newline characters inside ECharts script blocks** | Literal `\n` in single-quoted JS strings causes SyntaxError — chart renders blank, no visible error. | Use `\n` escape sequences. Wrap ECharts init in an IIFE `(function(){ ... })();`. |

## Design tokens

Every palette provides these CSS custom properties. Use via Tailwind arbitrary values.

| Token | Purpose | Tailwind |
|---|---|---|
| `--surface` | Default slide background | `bg-[var(--surface)]` |
| `--surface-dark` | Cover / divider background | `bg-[var(--surface-dark)]` |
| `--surface-muted` | Cards, evidence panels | `bg-[var(--surface-muted)]` |
| `--accent` | Brand color, header bars, highlights | `text-[var(--accent)]` / `border-[var(--accent)]` |
| `--accent-light` | Borders, light tint | `border-[var(--accent-light)]` |
| `--text` | Primary text | `text-[var(--text)]` |
| `--text-muted` | Secondary text, annotations | `text-[var(--text-muted)]` |
| `--text-fine` | Footnotes, sources | `text-[var(--text-fine)]` |
| `--text-on-dark` | Text on dark surfaces | `text-[var(--text-on-dark)]` |
| `--font-heading` | Heading font family | `style="font-family: var(--font-heading)"` |
| `--font-body` | Body font family | `style="font-family: var(--font-body)"` |
| `--chart-primary` | Primary chart/data color | For inline SVG fills |
| `--chart-secondary` | Secondary chart color | For inline SVG fills |

## Typography scale

Two systems exist for typography sizing. They serve different contexts — don't mix them.

1. **Slide HTML** — use the Tailwind class table below. Pick a role, use its class. No programmatic tokens.
2. **ECharts exhibits** — use the responsive tokens from `examples/_shared.js`. ECharts takes `fontSize` as a JS number, so Tailwind classes don't apply inside chart config.

### Tailwind type roles — slide HTML

Every text element in slide HTML must use one of these roles. All roles use native Tailwind classes — no arbitrary pixel values except tag/badge.

| Role | Tailwind class | Rendered | Weight | Extras | Use for |
|---|---|---|---|---|---|
| **Cover title** | `text-5xl` | 48px / 36pt | `font-bold` | `tracking-tight` | Title slide headline |
| **Action title** | `text-3xl` | 30px / 22.5pt | `font-semibold` | `tracking-tight leading-snug` | Slide conclusion sentence |
| **Card metric** | `text-2xl` | 24px / 18pt | `font-bold` | `tracking-tight leading-none` | "$240B", "200%+", large KPI numbers |
| **Subtitle** | `text-lg` | 18px / 13.5pt | `font-normal` | — | Cover subtitle, context line |
| **Body** | `text-base` | 16px / 12pt | `font-normal` | `leading-relaxed` | Paragraphs, bullet descriptions, card body text |
| **Body small** | `text-sm` | 14px / 10.5pt | `font-normal` | `leading-relaxed` | Secondary descriptions, table cells, annotations |
| **Card label** | `text-sm` | 14px / 10.5pt | `font-semibold` | — | Metric name below the number |
| **Callout body** | `text-sm` | 14px / 10.5pt | `font-normal` | `leading-relaxed` | Text inside insight/callout boxes |
| **Card detail** | `text-xs` | 12px / 9pt | `font-normal` | — | Trend indicators, supplementary data |
| **Section label** | `text-xs` | 12px / 9pt | `font-semibold` | `tracking-widest uppercase` | "MOMENTUM DIAGNOSTIC" above title |
| **Panel header** | `text-xs` | 12px / 9pt | `font-bold` | `tracking-widest uppercase` | "KEY METRICS" — mini-headers |
| **Data label** | `text-xs` | 12px / 9pt | `font-medium` | — | Chart annotations, axis labels in HTML |
| **Footer / source** | `text-xs` | 12px / 9pt | `font-normal` | — | Source line, confidentiality notice |
| **Tag / badge** | `text-[10px]` | 10px / 7.5pt | `font-medium` | `px-2 py-0.5 rounded-full` | Pill labels inside cards |

**Legibility floor:** No text below `text-xs` (12px) except tags/badges. Body-readable text must be ≥`text-sm` (14px).

**L1 density adaptation:** Bump each role up one Tailwind step. See [density-adaptation.md](density-adaptation.md) § L1 Sizing for the full mapping.

**Tailwind ↔ px reference** (default theme):

| Class | px | pt |
|---|---|---|
| `text-xs` | 12px | 9pt |
| `text-sm` | 14px | 10.5pt |
| `text-base` | 16px | 12pt |
| `text-lg` | 18px | 13.5pt |
| `text-xl` | 20px | 15pt |
| `text-2xl` | 24px | 18pt |
| `text-3xl` | 30px | 22.5pt |
| `text-4xl` | 36px | 27pt |
| `text-5xl` | 48px | 36pt |
| `text-6xl` | 60px | 45pt |

### ECharts exhibit tokens

For chart/exhibit JavaScript, use the responsive token system from `examples/_shared.js`:

- `tokens.bodyText` / `tokens.smallText` / `tokens.microText` — text sizes that scale with canvas
- `tokens.adapt(compact, preferred, wide)` — continuous interpolation for geometry
- `tokens.textAdapt(compact, preferred, wide)` — slower compression for text legibility
- `getFigureTypography(tokens)` — axis, legend, label, annotation, metric role presets
- `getChartChrome(tokens)` — shared axis/gridline/legend config fragments

Use token roles wherever the styling is standard. Do not abstract geometry, chart-specific layout, or exhibit-specific emphasis into shared helpers.

## Spatial constants

| Zone | Value | Note |
|---|---|---|
| Horizontal padding | `px-14` (56px) | Content never touches slide edges |
| Header top padding | `pt-10` (40px) | Space above section label / title |
| Header accent bar | `border-t-4` (4px) | Top border in accent color |
| Body vertical padding | `py-4` (16px) | Breathing room in body zone |
| Column gap | `gap-6` – `gap-8` | Between grid columns (24–32px) |
| Card gap | `gap-3` – `gap-4` | Between card items (12–16px) |
| Card border radius | `rounded-lg` | Consistent card rounding |
| Footer height | `py-2` (~40px) | Compact, fine text |

## Icons — Font Awesome 6

Font Awesome 6 Free is vendored locally. Use `<i>` tags inline with text or as standalone decorators only when the glyph is render-stable in PDF output.

**Common icons for consulting slides:**

| Category | Icons |
|---|---|
| Trends | `fa-arrow-trend-up`, `fa-arrow-trend-down`, `fa-arrow-right` |
| Status | `fa-circle-check`, `fa-circle-xmark`, `fa-triangle-exclamation` |
| Metrics | `fa-chart-line`, `fa-chart-bar`, `fa-chart-pie`, `fa-percent` |
| Financial | `fa-dollar-sign`, `fa-coins`, `fa-money-bill-trend-up` |
| Org | `fa-building`, `fa-users`, `fa-user-tie`, `fa-sitemap` |
| Strategy | `fa-bullseye`, `fa-lightbulb`, `fa-rocket`, `fa-chess` |
| Process | `fa-gears`, `fa-arrows-spin`, `fa-diagram-project` |
| Risk | `fa-shield-halved`, `fa-lock`, `fa-bug` |
| Time | `fa-clock`, `fa-calendar`, `fa-hourglass-half` |
| Data | `fa-database`, `fa-server`, `fa-cloud` |

**Usage pattern:**
```html
<!-- Inline with text -->
<span class="text-[var(--accent)]"><i class="fa-solid fa-arrow-trend-up mr-2"></i>12% YoY</span>

<!-- Card decorator (large) -->
<i class="fa-solid fa-chart-line text-3xl text-[var(--accent)] mb-3"></i>

<!-- Status indicator -->
<i class="fa-solid fa-circle-check text-emerald-500 mr-1"></i>
<i class="fa-solid fa-triangle-exclamation text-amber-500 mr-1"></i>
<i class="fa-solid fa-circle-xmark text-red-500 mr-1"></i>
```

Icons work best as visual anchors on KPI cards, process steps, and list items. Do not over-decorate.

## Data Visualization — ECharts 5

ECharts 5 is vendored locally with **SVG renderer** (mandatory — `<canvas>` blanks in Playwright PDF). For exhibit selection, use [chart-taxonomy.md](chart-taxonomy.md).

**Chart container pattern:**
```html
<!-- In the slide HTML, place a div with explicit dimensions -->
<div id="chart-1" style="width: 100%; height: 340px;"></div>

<!-- After ALL slides, add a <script> block that initializes charts -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  const chart1 = echarts.init(document.getElementById('chart-1'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,   // mandatory for static PDF
    // ... option config
  });
});
</script>
```

**Important:** The `<script>` block goes **inside the slide HTML string** (after the layout HTML but before the closing backtick). For **multi-chart slides**, use unique IDs and initialize all charts in a single `<script>` block.

**MBB chart aesthetics — the configuration that makes charts look consulting-quality:**

```javascript
{
  animation: false,
  grid: { left: 48, right: 24, top: 32, bottom: 40, containLabel: true },
  textStyle: { fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, color: '#4E6176' },
  title: { show: false },
  tooltip: { show: false },
  legend: { bottom: 0, textStyle: { fontSize: 11, color: '#4E6176' }, itemWidth: 12, itemHeight: 12, itemGap: 16 },
  xAxis: { axisLine: { lineStyle: { color: '#C7D5E5' } }, axisTick: { show: false },
           axisLabel: { fontSize: 11, color: '#4E6176' }, splitLine: { show: false } },
  yAxis: { axisLine: { show: false }, axisTick: { show: false },
           axisLabel: { fontSize: 11, color: '#4E6176' },
           splitLine: { lineStyle: { color: '#E4EDF7', type: 'dashed' } } },
}
```

**Chart type routing:**

| Use case | ECharts type | Key config |
|---|---|---|
| Revenue/metric comparison | `type: 'bar'` | Vertical bars, accent primary, gray secondary |
| Trend over time | `type: 'line'` | `smooth: false` for MBB, `areaStyle` for area |
| Market share / composition | `type: 'pie'` | `radius: ['40%', '70%']` for donut |
| Scatter / positioning | `type: 'scatter'` | `symbolSize` by value for bubble |
| Revenue bridge / delta | `type: 'bar'` (stacked) | Invisible base + colored delta — waterfall |
| Performance meter | `type: 'gauge'` | `detail.formatter`, clean arc |
| Flow / allocation | `type: 'sankey'` | `orient: 'horizontal'`, `nodeWidth: 20` |
| Hierarchy / budget | `type: 'treemap'` | `visibleMin: 300`, `label.fontSize: 12` |
| Multi-criteria radar | `type: 'radar'` | `indicator` array, filled area |
| Pipeline / conversion | `type: 'funnel'` | `sort: 'descending'`, label inside |
| Correlation matrix | `type: 'heatmap'` | With `visualMap` for color mapping |

**Waterfall chart pattern (MBB signature):**
```javascript
series: [
  { name: 'base', type: 'bar', stack: 'waterfall',
    data: [0, 3800, 3800, 4100, 3900],
    itemStyle: { color: 'transparent' },
    emphasis: { itemStyle: { color: 'transparent' } },
  },
  { name: 'delta', type: 'bar', stack: 'waterfall',
    data: [3800, 500, 300, -200, 300],
    itemStyle: { color: (params) => params.data >= 0 ? '#123A63' : '#CC4444' },
    label: { show: true, position: 'top',
      formatter: (p) => (p.data >= 0 ? '+' : '') + p.data,
      fontSize: 11, fontWeight: 'bold' },
  },
]
```

**Color discipline for charts:**
- Primary series: `var(--chart-primary)` or the hex value from the palette
- Secondary series: `var(--chart-secondary)` — always gray
- Positive delta: accent color or `#2E9E5A` (green)
- Negative delta: `#CC4444` (red)
- Never more than 4 colors in one chart. MBB charts are restrained.

**CSS-only bar charts (no ECharts needed for simple bars):**
```html
<div class="flex items-center gap-3 mb-2">
  <span class="w-24 text-sm text-[var(--text)] text-right shrink-0">Revenue</span>
  <div class="flex-1 bg-[var(--surface-muted)] rounded-full h-6 overflow-hidden">
    <div class="h-full bg-[var(--accent)] rounded-full" style="width: 78%"></div>
  </div>
  <span class="text-sm font-semibold text-[var(--text)] w-12">78%</span>
</div>
```

Use CSS-only bars for simple progress/comparison visuals. Use ECharts for anything with axes, legends, or complex data.

## Responsive support model

Do not author examples against hardwired `sm/md/lg` buckets. The reference canvas remains `1280×720`, but responsiveness follows the actual target `width` and `height`.

Use one of two contracts:

1. **Chart / figure templates**

```javascript
responsiveSpec: {
  templateClass: 'chart',
  exhibitRange: {
    min: { width: 960, height: 540 },
    preferred: { width: 1280, height: 720 },
    max: { width: 1600, height: 900 },
  },
  slideRange: {
    min: { width: 1024, height: 576 },
    preferred: { width: 1280, height: 720 },
    max: { width: 1600, height: 900 },
  },
  rationale: 'end labels become unreadable below the declared minimum',
}
```

2. **Layout / content templates**

```javascript
responsiveSpec: {
  templateClass: 'layout',
  previewSamples: [
    { label: 'compact', width: 1024, height: 576 },
    { label: 'preferred', width: 1280, height: 720 },
    { label: 'wide', width: 1440, height: 810 },
  ],
  agentSizingNotes: 'agent should split or simplify if width falls below the compact QA sample',
}
```

## Layout primitives

Six layout structures for the body zone. Combine with the [slide shell](#slide-shell) above.

| Layout | Grid | Use when |
|---|---|---|
| **Single column** | `flex flex-col gap-4` | Narrative text, ordered list, simple argument |
| **Two-column** | `grid grid-cols-2 gap-8` | Chart + bullets, comparison, evidence + sidebar |
| **Asymmetric split** | `grid grid-cols-[3fr_2fr] gap-8` | Main exhibit + sidebar (55/45) |
| **Three-column** | `grid grid-cols-3 gap-6` | KPI cards, feature comparison, triple evidence |
| **Card grid** | `grid grid-cols-3 gap-4` (or 2/4) | Scorecards, team, feature tiles |
| **Full bleed** | No shell — direct child of `<section>` | Cover, divider, hero image |

## Content primitives

Small HTML components to compose inside layout primitives.

**KPI Metric Card:**
```html
<div class="bg-[var(--surface-muted)] rounded-lg p-5 flex flex-col">
  <i class="fa-solid fa-chart-line text-2xl text-[var(--accent)] mb-3"></i>
  <span class="text-2xl font-bold tracking-tight text-[var(--text)]">$4.2B</span>
  <span class="text-sm font-semibold text-[var(--text)] mt-1">Revenue</span>
  <span class="text-xs text-[var(--text-muted)] mt-1">
    <i class="fa-solid fa-arrow-trend-up text-emerald-500 mr-1"></i>↑ 12% YoY
  </span>
</div>
```

**Evidence Panel (bordered):**
```html
<div class="border border-[var(--accent-light)]/40 rounded-lg p-5">
  <h3 class="text-xs font-bold tracking-widest uppercase text-[var(--accent)] mb-3">
    Key Drivers
  </h3>
  <ul class="space-y-2 text-sm text-[var(--text)]" style="font-family: var(--font-body)">
    <li class="flex items-start gap-2">
      <i class="fa-solid fa-chevron-right text-[10px] text-[var(--accent)] mt-1.5 shrink-0"></i>
      <span>Market share grew 3pp driven by pricing advantage in mid-tier segment</span>
    </li>
  </ul>
</div>
```

**Data Table:**
```html
<table class="w-full text-sm" style="font-family: var(--font-body)">
  <thead>
    <tr class="border-b-2 border-[var(--accent)]">
      <th class="text-left py-2 font-semibold text-[var(--text)]">Metric</th>
      <th class="text-right py-2 font-semibold text-[var(--text)]">2024</th>
      <th class="text-right py-2 font-semibold text-[var(--text)]">2025</th>
      <th class="text-right py-2 font-semibold text-[var(--text)]">Delta</th>
    </tr>
  </thead>
  <tbody class="text-[var(--text)]">
    <tr class="border-b border-[var(--accent-light)]/30">
      <td class="py-2">Revenue</td>
      <td class="text-right py-2 tabular-nums">$3.8B</td>
      <td class="text-right py-2 tabular-nums">$4.2B</td>
      <td class="text-right py-2 font-semibold text-emerald-600">+11%</td>
    </tr>
  </tbody>
</table>
```

**Callout Box:**
```html
<div class="bg-[var(--accent)]/5 border-l-4 border-[var(--accent)] px-5 py-4 rounded-r-lg">
  <p class="text-sm font-medium text-[var(--text)]">
    <i class="fa-solid fa-lightbulb text-[var(--accent)] mr-2"></i>
    Key insight or recommendation text here
  </p>
</div>
```

## Composition routing

Map each slide's communication move to a layout composition.

| User intent / data shape | Layout | Content primitives | Notes |
|---|---|---|---|
| Cover / title page | Full bleed | Centered title + subtitle on dark surface | No shell — full `h-full` |
| Section divider | Full bleed | Section number (large) + title on dark | Page break rhythm |
| Agenda / TOC | Single column | Numbered list items, active item highlighted | Accent color on active |
| 4–6 KPIs / metrics | Card grid (3-col or 2×3) | KPI metric cards | Icons + trend indicators |
| Claim + chart evidence | Asymmetric split | Chart (left) + evidence panel (right) | SVG chart or CSS bars |
| Binary choice (A vs B) | Two-column | Comparison cards with criteria rows | Highlight recommended |
| Process / mechanism | Single column | Numbered step cards with icons | Horizontal or vertical |
| Data comparison table | Single column | Data table + optional callout box | Color-coded deltas |
| Timeline / milestones | Single column | Horizontal timeline with markers | CSS flex with dots |
| Waterfall / bridge | Single column | CSS bar chart + interpretation panels | Start → deltas → end |
| Evaluation matrix | Single column | Grid table with RAG cell fills | Color-coded ratings |
| Facts vs perspectives | Two-column | Left: fact bullets + chart. Right: perspective bullets | Bain signature |
| Multi-evidence composite | Asymmetric split | Main chart + metric cards below + sidebar | L3 density |
| Team / founders | Card grid (4-col) | Name + role + bio cards | Optional photo/icon |
| Closing / recommendation | Full bleed or single | Centered recommendation + next steps list | Clean, authoritative |
| Workplan / Gantt | Single column | CSS grid calendar with colored spans | Time periods as columns |
