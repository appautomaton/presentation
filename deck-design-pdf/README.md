# Deck Design PDF — Web-Native Slide Builder

High-fidelity PDF slide decks built with HTML/CSS and rendered via Playwright. Same palette system as `deck-design-ppt`, but with the full expressiveness of web layout (CSS Grid, Tailwind utilities, web fonts).

**Entry point:** `SKILL.md` — operational playbook (agent reads this first).

## Structure

```
skills/deck-design-pdf/
├── SKILL.md                    ← operational playbook (start here)
├── build-reference.md          ← slide construction: shell, typography, ECharts, layouts
├── ghost-deck.md               ← consulting ghost deck: layers, dependencies, quality gates
├── engagement-archetypes.md    ← 8 archetypes, transitions, rising-stakes
├── evidence-recipes.md         ← 10 data-shape compositions
├── chart-taxonomy.md           ← exhibit decision tree, firm visual DNA
├── firm-dna.md                 ← McKinsey/BCG/Bain conventions
├── density-adaptation.md       ← L1/L2/L3 compression/expansion
├── skeletons/                  ← pillar architecture per engagement type
├── engine/
│   ├── index.js                ← createDeck(options) orchestrator
│   ├── render.js               ← Playwright HTML → PDF pipeline
│   └── canvas.css              ← base slide CSS (@page, overflow, print fixes)
├── examples/
│   ├── _shared.js              ← responsive helpers + exhibit/slide wrappers
│   └── *.js                    ← atomic exhibit modules
└── palettes/                   ← CSS custom property files
    ├── consulting-mckinsey.css
    ├── consulting-bcg.css
    ├── consulting-bain.css
    ├── founder.css
    └── sequoia.css
```

## How It Works

1. Claude writes a build script that imports `createDeck` from `engine/`
2. Slides are plain HTML strings using local Tailwind, CSS custom properties, and optional ECharts SVG charts
3. The engine wraps slides in a full HTML document with vendored fonts, Font Awesome, palette CSS, and render-size CSS variables
4. Playwright renders the HTML to PDF at the requested slide size; default is `1280×720`

## Quick Example

```js
const { createDeck } = require('./skills/deck-design-pdf/engine');

createDeck({
  palette: 'consulting-mckinsey',
  title: 'Strategy Update',
  output: 'output/strategy.pdf',
  width: 1024,
  height: 576,
  slides: [
    `<div class="flex flex-col items-center justify-center h-full bg-[var(--surface-dark)]">
       <h1 class="text-5xl font-bold text-white tracking-tight">Strategy Update</h1>
       <p class="text-xl text-[var(--accent-light)] mt-4">Q1 2026 Review</p>
     </div>`,

    `<div class="flex flex-col h-full">
       <div class="px-14 pt-10 pb-4 border-t-4 border-[var(--accent)]">
         <h2 class="text-3xl font-semibold text-[var(--text)]">Key Finding</h2>
       </div>
       <div class="flex-1 px-14 grid grid-cols-2 gap-8">
         <div><!-- left column --></div>
         <div><!-- right column --></div>
       </div>
     </div>`,
  ],
});
```

## Example Contract

`examples/*.js` are atomic exhibit modules, not full-slide examples. Each module exports:

- metadata: `id`, `title`, `tier`, `proves`, `data`
- shell metadata: `sectionLabel`, `actionTitle`, `source`, `exhibitId`
- optional responsive spec:
  - chart templates: `responsiveSpec = { templateClass: 'chart', exhibitRange, slideRange, rationale }`
  - layout templates: `responsiveSpec = { templateClass: 'layout', previewSamples, agentSizingNotes }`
- `renderExhibit({ checkpoint, width, height, tokens })`

Use `examples/_shared.js` to wrap an exhibit for QA as either:

- exhibit only
- wrapped slide

`examples/_shared.js` is also the internal standards layer for reusable styling. Centralize only the pieces that should stay invariant across templates:

- figure typography roles via `getFigureTypography(tokens)`
- reusable chart chrome via `getChartChrome(tokens)`
- HTML text roles via `getTemplateTextStyles(tokens)`
- inline style serialization via `cssText(styleMap)`

Keep exhibit geometry, grid choices, label placement logic, and one-off emphasis local to each template.

## Responsive Support Model

- Chart templates declare supported canvas ranges for exhibit-only and wrapped-slide rendering.
- The preview bench renders chart checkpoints at `min`, `preferred`, and `max`.
- Layout templates are agent-sized. They publish representative QA samples rather than a fixed supported-size matrix.

The reference canvas remains `1280x720`, but responsiveness is driven by the actual target `width` and `height`, not hardwired `sm/md/lg` buckets. Shared tokens expose:

- `tokens.adapt(compact, preferred, wide)` for continuous scaling
- `tokens.choose(compact, regular, wide)` for structural breakpoints
- `tokens.compact` / `tokens.wide` for layout decisions

## Standards Layer

Use the shared standards layer for consistency, not abstraction for its own sake.

- Must be shared: figure typography roles, standard chart chrome, recurring template text roles, repeated semantic colors.
- Must stay local: layout geometry, data mapping, series construction, label formatters, breakpoint-specific structural decisions, and exhibit-specific emphasis treatments.
- Non-goal for this pass: no shared geometry or layout framework across templates.
