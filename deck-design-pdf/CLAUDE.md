# Deck Design PDF — Agent Guide

## What this skill is

HTML/CSS slide decks rendered to pixel-perfect PDF via Playwright. Two-path routing: a deep consulting path (ghost deck, archetypes, firm DNA) and a lighter general path (universal quality gates only). The web stack is the differentiator vs `deck-design-ppt` — CSS Grid, web fonts, ECharts, Tailwind — at the cost of editability.

**Core intent:** Argument before pixels. The ghost deck (governing thought → pillars → action titles → exhibits) is the thinking; HTML is execution. Quality gates operate on titles and argument structure, never on visual polish.

## Design principles

1. **Examples teach, they are never imported.** The 46 modules under `examples/` are read-only pattern references. The agent reads one, learns the approach, writes original HTML. The build script touches only `engine/index.js`.

2. **Every example is self-contained.** One file shows the complete pattern: brand variables, sample data, sizing limits, computed responsive sizing, and the ECharts gotchas that pattern already solved (header comment). A shared helper module (`_shared.js`) existed once and was removed — abstraction hid the pattern from the reader and let docs drift from code. Do not reintroduce one.

3. **Two typography systems, one boundary.** Slide HTML uses Tailwind type roles (build-reference.md § Typography scale). ECharts config takes JS numbers, so exhibits compute sizes from actual `width`/`height` with clamped `[min, max]` interpolation. Never mix the systems.

4. **Progressive disclosure.** SKILL.md always loads (~5.5k tokens). build-reference.md loads at build time, chart-taxonomy.md at exhibit selection. The six consulting references load only on the consulting path. Keep it that way — the general path must stay cheap.

5. **Structural correctness over QA.** The CSS Grid shell (`auto minmax(0,1fr) 48px`) makes footer overflow impossible rather than detectable. Prefer constraints that prevent failure classes to instructions that describe them.

6. **Fill-first orientation.** Content fills the body zone; whitespace comes from having fewer elements, not smaller content. This is the repo-wide stance (shared with deck-design-ppt's craft.md) — do not let the two skills drift apart on it.

## Contracts this skill participates in

| Contract | Producer → Consumer | Where documented |
|---|---|---|
| Storyboard handoff | `consultant` → this skill | SKILL.md § Consultant handoff; consultant SKILL.md §10 |
| Identity handoff | `brand-system` → this skill | SKILL.md § Brand identity intake (`toCSS()` → palette file) |
| Example module shape | `examples/*.js` → preview bench + agent | build-reference.md § Atomic exhibits; repo-root `generate-previews.js` |

When any contract changes shape, update BOTH sides in the same commit. The `_shared.js` removal taught prompt content a phantom API for a while because docs lagged the refactor; the identity handoff had a producer and no consumer for months because nothing tracked the pairing.

## What NOT to do

- Don't teach `require()` paths relative to the working directory. Use the `<this-skill>` base-directory convention everywhere a build script is shown.
- Don't add a palette file without adding a routing row in SKILL.md's style table. An agent cannot select a capability its prompt never names.
- Don't put library version claims in prompts unless they match `vendor/` reality (the "ECharts 5" claims survived a major-version upgrade once).
- Don't copy example data, dimensions, or hex colors into real decks — palette tokens and the user's actual numbers only.
- Don't author examples against `sm/md/lg` buckets or contract metadata. Declared limits + visual validation via the preview bench.

## Maintenance

- Improvement backlog lives in [TODO.md](TODO.md). Reconcile it after refactors — checked-off reality drifts fast (two P2.5 items sat open after their premise was deleted).
- After any change to `examples/` or the vendored ECharts, regenerate previews: `node generate-previews.js` from the repo root, then eyeball the JPGs (gitignored QA artifacts).
- `npm install` inside this folder if `node_modules/` is missing. Playwright + vendored assets only; zero network at build time.
