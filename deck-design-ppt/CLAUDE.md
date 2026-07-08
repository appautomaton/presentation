# Deck Design PPT — Agent Guide

## What this skill is

Native editable PPTX decks built with pptxgenjs. A pattern library (15 P-series communication moves + 6 C-series consulting compositions) fills content into theme-parameterized slide masters over one shared grid contract. Every element stays individually editable in PowerPoint — that editability is the entire value proposition against `deck-design-pdf`.

**Core intent:** The harness carries the quality, not the library. pptxgenjs is a stable but stagnant low-level placement API (single maintainer, long release gaps, primitive native chart styling). The pattern library, grid contract, slot budgets, and thumbnail QA loop are the compensation layer. Better PowerPoint comes from improving these, not from waiting on upstream.

## Design principles

1. **Editability is the product.** All slide content is native PPTX objects. Rasterization (via `sharp`) is a deliberate, per-asset trade for things PPTX cannot express — SVG gradients, icon fonts — never a shortcut for layout.

2. **One grid, all patterns.** `masters/grid.js` is the spatial contract. Pattern functions place content only in the body zone; the slide master owns header, footer, and margins. A pattern that touches chrome is a bug.

3. **Themes parameterize, patterns compose.** One set of master definitions serves all five built-in styles. The exported `THEMES` map accepts runtime registration — that is how `identity.js` from brand-system enters (SKILL.md § Identity intake). Theme keys are bare hex, no `#`.

4. **Slot budgets are the overflow defense.** PPTX is absolute positioning with no reflow. Character budgets per pattern (`*.slots.md`) are loaded just-in-time, one pattern at a time — both an overflow guard and a token-economics pattern worth copying elsewhere.

5. **Patterns are vocabulary, not ceiling.** When no pattern fits, build custom with pptxgenjs directly — grid constants, theme tokens, and master chrome still apply. `masters/examples/` holds the advanced techniques (rasterization, arc math, node graphs).

6. **Fill-first, same as the sibling.** Craft doctrine (references/craft.md) matches deck-design-pdf's density-adaptation stance: breathing room comes from fewer elements scaled up, not from shrinking content. Keep the two skills reconciled.

## Contracts this skill participates in

| Contract | Producer → Consumer | Notes |
|---|---|---|
| Storyboard handoff | `consultant` → this skill | Ships content descriptions + structured data, NEVER data shapes or chart types. Shape extraction and pattern routing are this skill's job (Phase 1 steps 5–6 always run). |
| Identity handoff | `brand-system` → this skill | Register on `THEMES` before `createDeck`. PPTX embeds no fonts — unusual identity fonts need the viewer's machine or a system fallback. |
| Thumbnail QA | this skill → `pptx` skill | Phase 3 uses the pptx skill's thumbnail script; QA artifacts go to temp, never the workspace. |

## What NOT to do

- Don't introduce HTML or browser rendering into the slide path — that's `deck-design-pdf`'s territory.
- Don't map handoff fields the producing contract doesn't emit. Verify against consultant SKILL.md §10 before extending the intake table (a phantom "per-slide data shape" mapping lived here once).
- Don't manually estimate text heights for Y positioning — anchor to zone boundaries, use `valign` + `fit:'shrink'`.
- Don't teach `require()` paths relative to the working directory. Use the `<this-skill>` convention.
- Don't wait for upstream. Known-unused pptxgenjs 4.x capability worth adopting: `textDirection` for rotated labels in gantt/matrix patterns.

## Maintenance

- pptxgenjs pinned at latest (4.0.1). Watch, don't wait — 4.x fixed table auto-paging corruption and slide-master config reuse, both load-bearing here.
- `npm install` inside this folder if `node_modules/` is missing (pptxgenjs, playwright-core, sharp).
- Fonts and icons are vendored in `libs/`; thumbnail QA needs Python + Pillow + python-pptx via `uv`.
