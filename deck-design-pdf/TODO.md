# deck-design-pdf — Improvement Plan

Evaluated 2026-03-27. The consulting path is production-ready; the general path is structurally present but operationally thin.

## P1 — General path parity

- [ ] **General deck skeletons** — Add skeletons for pitch deck, board update, conference talk, internal update. Same structure as consulting skeletons: governing thought template, pillar architecture, slide index, quality gates. Put in `skeletons/`.
- [ ] **Unscope density-adaptation.md** — Remove "consulting only" framing. L1/L2/L3 is a density system, not a consulting system. Any deck has a density.
- [x] **Fix stale L1 language in evidence-recipes.md** — ~~Line 26 still says "generous whitespace."~~ Fixed: "scaled up to fill the body zone."

## P2 — Consistency and typography

- [x] **Native Tailwind typography scale** — Rebuilt both tables + all code examples + headExtra template to native classes. Added two-system boundary note (Tailwind for HTML, `_shared.js` tokens for ECharts).
- [ ] **Clean up Deck Archetypes in chart-taxonomy.md** — Consulting archetypes (Diagnostic, Strategic Recommendation, Transformation) are redundant with engagement-archetypes.md. Keep general archetypes (Investor/Roadshow, Board/SteerCo), expand them, and cross-reference consulting ones.
- [ ] **Generalize consultant handoff** — SKILL.md § Consultant handoff assumes MBB storyboards. Rewrite to handle any storyboard (pitch deck, board update, etc.).

## P2.5 — Example exhibit responsiveness

- [x] **Square-neutral reference canvas** — `REFERENCE_EXHIBIT` 540×540, `DEFAULT_CHART_RANGE.floor` 300×300, layout-context preview samples (three-col, sidebar, split-col, full-width). Updated in `_shared.js`.
- [x] **JPG preview generation** — `presentation/generate-previews.js` renders {id}.jpg (540×540) and {id}-min.jpg (300×300) for all 46 examples. Previews sit next to .js files.
- [x] **ECharts grid: containLabel fix** — Obsolete as written: the self-contained template refactor removed `tokens.adapt()` grid offsets entirely; axis-based templates use tight grids with `containLabel: true` where needed. Validated via full preview regeneration on ECharts 6.1 (2026-07-08).
- [x] **Legend and data label collision** — Radar legend overlap and bubble-scatter label collisions resolved by the ECharts 6.1 upgrade (axis-label overflow prevention) + template refactor. Confirmed in regenerated previews (2026-07-08).
- [ ] **Pareto cumulative label** — Residual from the 2026-07-08 preview run: the cumulative-line percentage label sits on a dark bar at 540×540, low contrast. Fix label position/offset in `examples/pareto.js` and regenerate its preview.

## P3 — Polish

- [ ] **Fix firm-dna.md circular reference** — Line 64 sends the agent back to SKILL.md § Firm Style. Make firm-dna.md self-contained or remove the back-reference.
- [ ] **Add slide count ranges for general deck types** — Pitch deck: 10–14, Board update: 8–12, Conference talk: 12–18, Internal update: 6–10. Put in density-adaptation.md or the new general skeletons.
