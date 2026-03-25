# Deck Design — Native PPTX Builder

A modular JS build kit that generates professional slide decks as native editable PowerPoint files. Five style families (McKinsey, BCG, Bain, Founder, Sequoia) share one set of pattern functions — the palette controls the visual identity.

**Entry point:** `SKILL.md` — routing, composition rules, algorithm.

## Structure

```
skills/deck-design-ppt/
├── SKILL.md                           ← operational playbook (agent reads this first)
├── masters/                           ← JS build kit (the core)
│   ├── index.js                       ← createDeck(palette, slides, output) orchestrator
│   ├── grid.js                        ← spatial constants (margins, body zone, footer)
│   ├── theme.js                       ← palette → theme object (colors, fonts, flags)
│   ├── layouts.js                     ← slide masters parameterized by theme
│   ├── patterns/                      ← 21 pattern functions + slot budgets
│   │   ├── p01-cover.js … p15-bubble-matrix.js
│   │   ├── c01-multi-evidence.js … c06-workplan.js
│   │   └── *.slots.md                 ← character budgets per pattern
│   └── examples/                      ← advanced visual reference scripts
│       ├── dumbbell-chart.js          ← before→after paired dots
│       ├── gauge-arcs.js              ← circular gauge indicators
│       ├── process-flow-diagram.js    ← node relationship diagram
│       ├── multi-zone-composite.js    ← icon cropping, coordinate scaling
│       └── scenario-cards.js          ← multi-column scenario comparison
├── palettes/                          ← pre-built color + typography systems
│   ├── consulting-mckinsey.md
│   ├── consulting-bcg.md
│   ├── consulting-bain.md
│   ├── founder.md
│   └── sequoia.md
├── references/                        ← quality layer + firm style guides
│   ├── craft.md                       ← density levels, typography, evidence layering
│   ├── mckinsey.md
│   ├── bcg.md
│   └── bain.md
├── composite-reference-decks/         ← 3 worked example decks (HTML — narrative arc reference only, not used at runtime)
│   ├── bain-spatial-defense/
│   ├── bcg-spatial-intelligence-command/
│   └── mckinsey-visual-reasoning/
└── libs/                              ← Vendored fonts and icons (FontAwesome, Source Sans, Arimo, etc.)
```

## Quick Start

```javascript
const { createDeck } = require('./skills/deck-design-ppt/masters');

createDeck('consulting-mckinsey', [
  { pattern: 'p01-cover', data: { title: 'Deck Title', subtitle: '...' } },
  { pattern: 'p04-scorecard', data: { title: '...', cards: [...] } },
  { pattern: 'p03-evidence', data: { title: '...', chart: {...} } },
  { pattern: 'p08-closer', data: { title: '...', nextSteps: [...] } },
], 'output/deck.pptx');
```

Change `'consulting-mckinsey'` to `'consulting-bcg'`, `'consulting-bain'`, `'founder'`, or `'sequoia'` — same patterns, different visual identity.

## Prerequisites

- Node.js (deps vendored in skill-local `node_modules/` — run `npm install` inside this folder if missing)
- Python + `Pillow` + `python-pptx` (for thumbnail QA only, via `uv`)

## Key Concepts

- **Pattern**: a named communication move (p01–p15) or consulting composition (c01–c06)
- **Palette**: color + typography system that controls the visual identity
- **Theme**: runtime object derived from palette — passed to masters and pattern functions
- **Grid**: shared spatial constants — all 21 patterns use the same margins and body zone
- **Slot budget**: character limits per text element in a pattern (loaded just-in-time)
- **Density level**: L1 Narrative → L2 Structured → L3 Dense (governs composition rules)
