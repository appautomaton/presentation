# Ghost Deck — Narrative Architecture

The production system for turning a brief into a structured argument before writing any HTML.

A ghost deck is NOT a template. It's a **parameterized argument** — a hypothesis about what the final deck will say, built top-down through five layers. ~60% of action titles survive unchanged to the final output.

## The Five-Layer Model

```
Layer 1: Governing Thought     ← One sentence. The deck's answer.
Layer 2: Pillar Architecture   ← 3–5 MECE pillars supporting it.
Layer 3: Slide Sequence        ← Every slide with an action title.
Layer 4: Transition Architecture ← Pivot points between pillars.
Layer 5: Evidence Composition  ← Exhibit type + evidence layers per slide.
```

Layers 1–2 are analytical (for methodology, see the consultant skill). Layers 3–5 are where deck production begins — this doc focuses there.

### Layer 3: Slide Sequence

Write an action title for every slide before selecting any exhibit:

```
"[Segment] [verb] [quantified finding], [implication or comparison]"
```

Each title includes typed placeholders: `[market size: $XB]`, `[growth rate: X%]`.

**Helicopter test:** Read all titles in sequence. Can you understand the complete recommendation in 2 minutes? If not, fix the titles before touching any charts.

### Layer 4: Transition Architecture

Five canonical transition types at pillar boundaries (see [engagement-archetypes.md](engagement-archetypes.md)):

1. **Pivot** — "Found the problem → here's the prize"
2. **Narrowing** — "Many options → these survived"
3. **Escalation** — "Opportunity confirmed → execution risk?"
4. **Synthesis** — "Multiple analyses → integrated answer"
5. **Decision Gate** — "Analysis complete → choose"

Rising-stakes progression: Recognition → Clarity → Conviction → Urgency. Each pillar must raise the emotional temperature from the previous one.

### Layer 5: Evidence Composition

Assigned last — only after Layers 1–4 are stable. For each slide:
- Which recipe from [evidence-recipes.md](evidence-recipes.md) applies
- How many evidence layers (governed by density level — see [density-adaptation.md](density-adaptation.md))
- Which exhibit type from [chart-taxonomy.md](chart-taxonomy.md)

## Quality Gates

Every ghost deck must pass ALL of these before HTML authoring begins:

- [ ] **Helicopter test:** Read only action titles → complete recommendation in 2 minutes?
- [ ] **MECE test:** Cover any one pillar → does the argument have a hole?
- [ ] **Kill condition test:** What findings would restructure the deck? Are they defined?
- [ ] **Transition test:** Last slide of Pillar N + first slide of Pillar N+1 → logical bridge?
- [ ] **Rising-stakes test:** Does each pillar raise the bar?
- [ ] **Dead slide test:** Can any slide be removed without breaking the argument?

**If a gate fails — backtrack, don't patch:**
- Helicopter test fails → return to **Layer 2**. The pillars don't support the governing thought.
- MECE test fails → return to **Layer 2**. Add the missing pillar or merge overlapping ones.
- Transition test fails → return to **Layer 4**. The transition type is wrong for the emotional shift needed.
- Rising-stakes test fails → reorder pillars. The sequence should build, not plateau.
- Dead slide test fails → delete the slide. If you can't, the governing thought may be too broad — return to **Layer 1**.

## Anti-Patterns

| Pattern | Symptom | Fix |
|---|---|---|
| **Bottom-Up Assembly** | "Made 15 slides, now need a story" | Write governing thought first. Kill slides that don't serve it. |
| **Frankenstein Deck** | Pillars feel disconnected | Go back to Layer 2. Redesign for THIS governing thought. |
| **Symmetric Pillars** | Every pillar has exactly 4 slides | Allocate by evidence weight. 6 + 2 is better than 4 + 4. |
| **Data Dump** | 40+ slides, no editorial discipline | Main deck = argument. Appendix = evidence locker. |
