# Ghost Deck — Narrative Architecture

> Load this reference for **consulting engagements** — strategy, cost, M&A, pricing, digital, org, commercial. For general decks (pitches, board updates, conference talks), the universal quality gates in SKILL.md are sufficient.

A ghost deck is not a template. It's a **parameterized argument** — a hypothesis about what the final deck will say, built through five interdependent layers. ~60% of action titles survive unchanged to the final output.

## How to think about the layers

Five layers compose a ghost deck. They have real dependencies — you can't write good action titles without solid pillars, and you can't assign exhibits until the argument holds — but the working order depends on what the brief gives you. A brief with strong data might start from what the data proves and work backward to the governing thought. A brief with a clear strategic question starts top-down. Work the problem until the argument holds; don't follow a fixed sequence.

**Layer 1 — Governing thought.** One sentence that states the deck's answer. If you can't write this sentence, the analysis isn't done. Everything in the deck either supports this sentence or doesn't belong.

**Layer 2 — Pillar architecture.** 3–5 MECE pillars that support the governing thought. Work backward: "What must be true for the governing thought to hold?" Each pillar answers one of those conditions. Classify the engagement using [engagement-archetypes.md](engagement-archetypes.md) and load the matching skeleton from `skeletons/` — it provides a starting pillar architecture to customize, not to copy.

**Layer 3 — Slide sequence.** A full-sentence action title for every slide, written before any chart is selected. Each title is a claim that advances the argument: "Revenue grew 12% driven by pricing power in mid-tier" — not "Revenue Overview." Read all titles in sequence (the helicopter test). If they don't tell a complete, persuasive story in 2 minutes, the problem is upstream — the pillars are weak, not the titles.

**Layer 4 — Transition architecture.** At each pillar boundary, select a transition type from [engagement-archetypes.md](engagement-archetypes.md): Pivot, Narrowing, Escalation, Synthesis, or Decision Gate. Verify rising-stakes progression — each pillar must raise the emotional temperature: Recognition → Clarity → Conviction → Urgency. Flat stakes make a dead deck.

**Layer 5 — Evidence composition.** Assigned last — only after the argument structure is stable. For each slide: which exhibit type from [chart-taxonomy.md](chart-taxonomy.md), which recipe from [evidence-recipes.md](evidence-recipes.md), and how many evidence layers (governed by density level — see [density-adaptation.md](density-adaptation.md)). Each exhibit must be sufficient proof of its title's claim and minimal — no extra elements.

## Dependencies

Not all layers can be worked in any order. These constraints are real:

- Governing thought must exist before pillars can be designed
- Pillars must be stable before action titles are meaningful
- The helicopter test must pass before exhibits are assigned — visualizing a broken argument wastes effort
- Transitions depend on pillars being in their final order
- Evidence composition depends on exhibit types being selected

Within these constraints, the agent decides the working order. Firm overlay can happen anytime after style is known. Density tier can be revised at any point. The dead slide test can run multiple times.

## Quality gates

These are the invariants that must hold before the ghost deck is handed to the production outline. If any gate fails, the fix is upstream — backtrack to where the argument breaks, don't patch.

**Helicopter test** — read all action titles in sequence. Do they tell the complete recommendation in 2 minutes without any exhibit bodies? If not, the pillars don't support the governing thought. Return to Layer 2.

**MECE test** — cover any one pillar. Does the argument have a hole? If yes, add the missing pillar or merge overlapping ones. Return to Layer 2.

**Kill condition test** — what findings would restructure the deck? Are they defined? If you can't name what would falsify the governing thought, it's too vague. Return to Layer 1.

**Transition test** — read the last slide of Pillar N and the first slide of Pillar N+1. Is there a logical bridge? If the shift feels abrupt, the transition type is wrong. Return to Layer 4.

**Rising-stakes test** — does each pillar raise the bar from the previous one? If two pillars feel interchangeable in urgency, reorder or merge them.

**Dead slide test** — can any slide be removed without breaking the argument? If yes, remove it. If you can't bring yourself to cut it, the governing thought may be too broad. Return to Layer 1.

**Backtracking, not patching.** When a gate fails, don't adjust the failing layer in isolation. The symptom is downstream, but the cause is upstream. A helicopter test failure means the pillar architecture doesn't support the governing thought — fixing individual titles won't solve it.

## Anti-patterns

| Pattern | Symptom | Fix |
|---|---|---|
| **Bottom-Up Assembly** | "Made 15 slides, now need a story" | Write governing thought first. Kill slides that don't serve it. |
| **Frankenstein Deck** | Pillars feel disconnected | Return to Layer 2. Redesign for THIS governing thought. |
| **Symmetric Pillars** | Every pillar has exactly 4 slides | Allocate by evidence weight. 6 + 2 is better than 4 + 4. |
| **Data Dump** | 40+ slides, no editorial discipline | Main deck = argument. Appendix = evidence locker. |

## Golden trace — Profitability example

**Brief:** "Acme Corp's EBITDA margins declined 420bps over 3 years. The CEO wants a cost transformation plan for the board."

**Governing thought:** "Acme can improve EBITDA margin by 340bps through 5 cost levers across procurement and operations, capturing $180M in annualized savings within 18 months, because structural cost gap to peers creates addressable opportunity."

**Archetype:** Profitability → load `skeletons/profitability.md`

**Pillars** (customized from skeleton):
1. Benchmark the Gap — "How does Acme's cost structure compare?"
2. Explain the Gap — "What root causes drive the disparity?"
3. Size the Prize — "Which levers, how much each?"
4. Prove the P&L Math — "Phased financial impact"

**Action titles** (sample):
- S2: "Margin improvement of 340bps ($180M) achievable through 5 levers over 18 months"
- S4: "Acme trails peer median by 420bps on EBITDA, ranking 9th of 12 peers"
- S7: "Procurement drives 45% of addressable gap — supplier consolidation is primary mechanism"
- S10: "Total addressable opportunity is $180M across 5 levers, with procurement at $82M"

**Helicopter test:** Read S2, S4, S7, S10, S16, S19 titles in sequence → complete cost story in 90 seconds. Pass.

**Transitions:** Pivot (P1→P2) → Narrowing (P2→P3) → Escalation (P3→P4)

**Exhibits:** S4 = benchmark bars, S7 = driver tree, S10 = waterfall bridge, S11 = priority matrix

**Firm overlay:** McKinsey palette. Verdict-first titles. Exhibit numbering. Methodology to appendix.
