# Presentation Skills: Agent Guide

Repo-level context for agents working ON this codebase: maintenance, refactoring, prompt/content engineering. This is the single unified agent guide. Per-skill runtime instructions live in each skill's SKILL.md and load only when that skill is invoked; nothing in this file is needed to *use* a skill.

## What this repo is

Four composable skills forming a deck-production pipeline:

| Skill | Role | Output |
|---|---|---|
| `consultant` | Argument architecture: analysis, storyboards | Markdown content |
| `brand-system` | Visual identity: palette, fonts, style direction | `brand-brief.md` + `identity.js` + preview PDF |
| `deck-design-pdf` | High-fidelity web-rendered decks | PDF via HTML/CSS/Playwright |
| `deck-design-ppt` | Native editable decks | PPTX via pptxgenjs |

`consultant` and `brand-system` are producers; the two deck skills consume both.

## Repository rules

1. **Skill folders are runtime surfaces only.** Contents: SKILL.md (entry point), progressive references, engine code, vendored assets, plus inert human docs (README.md, TODO.md). Never put agent meta-context (CLAUDE.md / AGENTS.md) inside a skill folder, magic-name files auto-load into production sessions and ship inside the distributable unit. All maintainer context lives in this file.
2. **Progressive disclosure.** SKILL.md stays lean and always loads; depth goes in references loaded per phase. Output contracts and quality gates sit at the END of SKILL.md for recency advantage.
3. **Forcing functions over descriptions.** Don't tell the model "synthesize well": make it answer a specific question ("Remove your strongest finding. Does the recommendation change?"). Descriptions waste tokens on judgment the model already has.
4. **Heuristics over data.** No perishable content: dated trend catalogs, static benchmarks, blog-post source lists. Encode timeless judgment rules and direct the model to web-search current data at runtime.
5. **Contracts change on both sides in one commit.** Every cross-skill handoff below has a producer and consumers; a change to the shape must land in the same commit as the intake updates. (The identity handoff once shipped with zero consumers; a deleted helper module stayed taught in five docs. Both were silent failures.)
6. **`<this-skill>` require convention.** Build-script examples resolve from the skill's base directory, never the working directory. Each skill is self-contained: `package.json` + `node_modules/` inside the folder.
7. **Version claims match vendored reality.** A library version stated in a prompt is a promise about which API docs apply: check `vendor/` before writing one.
8. **Fill-first doctrine, repo-wide.** Content fills the body zone; breathing room comes from fewer elements scaled up, not smaller content. Both deck skills state this; do not let them drift apart.
9. **Exemplar hygiene.** Literal output examples in prompts are imitated verbatim: keep AI-tell copy (em-dash action titles, attractor fonts) out of them. Open sweep, see backlog.

## Cross-skill contracts: single source of truth

**Storyboard handoff** (`consultant` → deck skills). Ships: governing thought, MECE pillars, density level, firm overlay, per-slide action title + content description, structured data. NEVER data shapes or chart types. Shape extraction and visual routing belong to the delivery skill. Canonical definition: `consultant/SKILL.md` §10.

**Identity handoff** (`brand-system` → deck skills). `identity.js` shape: `style` enum (`institutional | modern | dark | bento | editorial | data-forward`), palette roles, `fonts`, optional `firm`, `toCSS()`. Consumers: `deck-design-pdf` SKILL.md § Brand identity intake (`toCSS()` → `palettes/{name}.css`), `deck-design-ppt` SKILL.md § Identity intake (`THEMES` registration, bare hex).

**Example module contract** (`deck-design-pdf` internal). `examples/*.js` export metadata + `renderExhibit({ tokens })` with `tokens = { width, height }`, fully self-contained, no shared helper module (`_shared.js` was removed deliberately; do not reintroduce one). Validated visually by the preview bench, not by contract metadata.

**QA handoff** (`deck-design-ppt` → `pptx` skill). Thumbnail grid for visual review; artifacts go to temp, never the workspace.

## Per-skill notes

### consultant
MBB-grade argument architecture. Produces content, never visuals: content descriptions name the analytical question (compare, decompose, evaluate), never the chart type. **`references/firms/` is the moat: never compress.** Those six files hold private domain knowledge (proprietary engagement workflows, named artifacts, firm quality gates) that cannot be derived from training data; the "does Claude already know this?" compression test does not apply to them. Don't add textbook definitions or static benchmarks; one canonical location per concept. Load tiers: SKILL.md always → method refs most tasks → firm process in firm mode → domains/examples on demand. Status: mature; next is live-test calibration of the examples layer. (The full historical change ledger was retired with `consultant/CLAUDE.md`, see git history.)

### deck-design-pdf
Argument before pixels: the ghost deck precedes HTML, quality gates operate on titles, never visuals. Examples teach and are never imported: the agent reads one self-contained file and writes original HTML against `engine/index.js` only. Two typography systems with a hard boundary: Tailwind type roles for slide HTML, computed `[min, max]` interpolation for ECharts JS numbers. The CSS Grid shell (`auto minmax(0,1fr) 48px`) prevents footer overflow structurally. Prefer constraints that make failure impossible over instructions that describe it. A new palette file requires a routing row in SKILL.md's style table (an agent cannot select what its prompt never names). Backlog lives in `deck-design-pdf/TODO.md`, reconcile it after refactors. After touching `examples/` or vendored ECharts, regenerate previews and eyeball the JPGs.

### deck-design-ppt
Editability is the product: every element PPTX-native, rasterization only for assets PPTX cannot express. The harness carries the quality, not the library: pptxgenjs is stable but stagnant (single maintainer, 4.0.1, long gaps); compensate in the pattern layer, don't wait upstream. One grid, all patterns: pattern functions place content in the body zone only, never touch master chrome. Slot budgets (`*.slots.md`, loaded just-in-time) are the overflow defense for absolute positioning, and a token-economics pattern worth copying. Never estimate text heights manually; anchor to zone boundaries with `valign` + `fit:'shrink'`. Known free capability: `textDirection` for rotated gantt/matrix labels.

### brand-system
Defines the vocabulary, not the implementation: downstream skills interpret the style direction for their own medium. The brief is the source of truth; `identity.js` is an extraction; the preview confirms decisions, never explores them. Open weaknesses (highest-value backlog in the repo): typography-guide.md routes toward AI-attractor fonts (Inter, Instrument Serif, Playfair) and needs a veto list plus a deeper catalog; design-landscape.md is a perishable 2025–26 snapshot that should become timeless heuristics plus a search-at-runtime directive (rule 4).

## Commands

- **Behavior journal: `node verify.js` from the repo root.** 26 checks locking current behavior: doc-link integrity, example/palette/pattern inventories and contracts, router visibility, version-claim-vs-vendor match, identity handoff round trips, and two real deck builds. `--quick` skips the builds. Run it before and after any change to engines, examples, palettes, patterns, or contract-bearing docs. A failing check means the behavior regressed (fix the code) or deliberately changed (update the check in the same commit).
- Preview QA bench: `node generate-previews.js [--all] [example-id]` from the repo root
- Per-skill dependencies: `npm install` inside the skill folder
- PPT thumbnail QA: via the `pptx` skill (Python + Pillow + python-pptx through `uv`)
