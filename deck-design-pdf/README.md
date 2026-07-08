# Deck Design PDF: Web-Native Slide Builder

High-fidelity PDF slide decks built with HTML/CSS and rendered via Playwright. Same palette system as `deck-design-ppt`, but with the full expressiveness of web layout (CSS Grid, Tailwind utilities, web fonts).

**Entry point:** `SKILL.md`: operational playbook (agent reads this first).

## Structure

```
deck-design-pdf/
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
│   └── *.js                    ← 46 self-contained atomic exhibit modules
└── palettes/                   ← CSS custom property files
    ├── consulting-mckinsey.css
    ├── consulting-bcg.css
    ├── consulting-bain.css
    ├── founder.css
    ├── sequoia.css
    ├── anthropic-consulting.css
    └── meridian-google.css
```

## How It Works

1. Claude writes a build script that imports `createDeck` from `engine/`
2. Slides are plain HTML strings using local Tailwind, CSS custom properties, and optional ECharts SVG charts
3. The engine wraps slides in a full HTML document with vendored fonts, Font Awesome, palette CSS, and render-size CSS variables
4. Playwright renders the HTML to PDF at the requested slide size; default is `1280×720`

## Quick Example

```js
// <this-skill> = the skill's base directory (e.g. ~/.claude/skills/deck-design-pdf)
const { createDeck } = require('<this-skill>/engine');

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
- optional `minSize`: smallest canvas width the pattern supports
- `renderExhibit({ tokens })`: `tokens = { width, height }`; returns a full HTML string (markup + inline ECharts init script)

Every module is **self-contained**: there is no shared helper module. Each template marks three edit zones (brand variables, data, sizing limits), computes its responsive sizing inline from the actual width and height, and records the ECharts gotchas it already solved in its header comment. Layout geometry, data mapping, label placement, and one-off emphasis stay local to each template by design.

## Responsive Support Model

The reference canvas is `1280x720`, but each exhibit adapts to the actual target size rather than hardwired `sm/md/lg` buckets:

- Text interpolates linearly across the supported width range (300–1120px), clamped to declared `[min, max]` ranges.
- Bar/row thickness derives from the vertical budget: height ÷ item count × fill ratio, clamped.
- Width thresholds drive structural switches (label wrapping, legend position).

`generate-previews.js` (repo root) renders every example at 540×540 for visual QA: plus 300×300 and 720×720 with `--all`.
