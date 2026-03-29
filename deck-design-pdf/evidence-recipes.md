# Evidence Recipes — Data-Shape Compositions

Standard exhibit compositions for consulting slides. Each recipe answers: "When I need to prove [X], what chart combination should I use?"

## Quick Lookup

| You need to prove… | Recipe | Pattern reference |
|---|---|---|
| Value changed through sequential steps | **Waterfall Bridge** | `waterfall` example |
| One option is best among alternatives | **Evaluation Grid** | `eval-grid` example |
| Opportunity concentrated in segments | **Market Sizing Stack** | `stacked-bar` example |
| Items prioritized on two dimensions | **Priority Matrix** | `bubble-scatter` / `matrix-2x2` |
| Activities sequenced in time | **Timeline / Phasing** | `gantt` / `timeline` example |
| Performance across multiple metrics | **KPI Scorecard** | `kpi-cards` example |
| Facts vs. interpretation separated | **Facts vs. Perspectives** | `facts-perspectives` example |
| Multiple futures / scenarios | **Scenario Fan** | `fan-chart` / `scenario-lines` |
| Mechanism or process visible | **Process Diagram** | `process-flow` example |
| Client vs. peers on a metric | **Benchmark Comparison** | `bar-horizontal` / dumbbell |

## Layering Rules

One evidence layer = one distinct visual element (chart, table, metric cards, callout stack).

| Density | Layers | Composition |
|---|---|---|
| **L1 Narrative** | 1 | One exhibit, scaled up to fill the body zone. Title carries 80% of argument. |
| **L2 Structured** | 1–2 | Primary + supporting (sidebar, metric cards, or callout). |
| **L3 Dense** | 2–4 | Primary + supporting + annotation stack. Body convinces a skeptic alone. |

**Hard ceiling: 4 layers per slide.** More = you haven't made the editorial choice.

## Recipe Details

### 1. Waterfall Bridge
**Proves:** "The gap/change is driven by these specific factors, in this order of magnitude."
- Primary: waterfall chart (5–8 bars: start anchor, 3–6 deltas, end anchor)
- Supporting: sidebar with 2–3 interpretation bullets explaining WHY largest deltas exist
- Annotation: delta labels on each bar, variance share row beneath

### 2. Evaluation Grid
**Proves:** "Among all options, [this one] is strongest across [these criteria]."
- Primary: matrix with criteria rows (4–8) × option columns (3–5), RAG-coded cells
- Supporting: summary row or recommendation highlight (bold border on winner)
- Annotation: "Key finding" bullets summarizing the pattern

### 3. Market Sizing Stack
**Proves:** "The addressable opportunity is $X, concentrated in [segments]."
- Primary: stacked bar or nested waterfall (total → segments → addressable)
- Supporting: segment callout sidebar with growth rates and fit scores
- Annotation: CAGR labels, segment boundary labels

### 4. Priority Matrix
**Proves:** "Given [dim 1] and [dim 2], these items are in the priority zone."
- Primary: scatter/bubble plot with named items (size = 3rd dimension)
- Supporting: quadrant labels ("Quick wins", "Strategic bets", etc.)
- Annotation: highlight zone or callout for recommended cluster

### 5. Timeline / Phasing
**Proves:** "Implementation follows N phases, with these milestones as gates."
- Primary: Gantt bars or phase blocks on time axis
- Supporting: milestone markers at decision points
- Annotation: dependency arrows, value realization markers

### 6. KPI Scorecard
**Proves:** "Across N dimensions, performance is [strong/mixed/weak]."
- Primary: 4–6 metric cards with KPI number + trend + context
- Supporting: RAG status indicators
- Annotation: assessment summary connecting scorecard to next action

### 7. Facts vs. Perspectives
**Proves:** "Here's what we know (facts) and what we recommend (perspectives)."
- Left column (~57%): "KEY FACTS & DATA" — 3–6 quantified bullets + optional mini-exhibit
- Right column (~43%): "PERSPECTIVES" — action-oriented recommendation bullets
- Annotation: implication callout band at bottom

### 8. Scenario Fan
**Proves:** "Under N scenarios, outcome ranges from X to Y, base case at Z."
- Primary: line chart with 3 paths (base, upside, downside) diverging from common point
- Supporting: scenario labels with key assumptions
- Annotation: decision-relevant threshold line (breakeven, hurdle rate)

### 9. Process Diagram
**Proves:** "This is how the system works, and [this step] is the leverage point."
- Primary: process steps (boxes/nodes) connected by arrows, one step highlighted
- Supporting: feedback loops or reinforcing connections
- Annotation: callout at leverage point explaining WHY it matters

### 10. Benchmark Comparison
**Proves:** "[Client] is at X on [metric], [above/below] peer median by Y."
- Primary: horizontal bars with peers in gray, client highlighted in accent
- Supporting: peer median line (dashed)
- Annotation: gap annotation converted to dollar/percentage impact

## Recipe × Engagement Type

| Engagement | Primary Recipes | Count |
|---|---|---|
| Market Entry | Market Sizing (2×), Eval Grid (2×), Priority Matrix, Scenario Fan | 6–8 |
| Profitability | Waterfall (3–4×), Benchmark (2×), KPI Scorecard | 6–7 |
| Growth | Market Sizing (2×), Priority Matrix (2×), Waterfall, Timeline | 6–7 |
| M&A | Scenario Fan (2×), Eval Grid (2×), Waterfall (1–2×), Timeline | 6–8 |
| Pricing | Waterfall (2×), Priority Matrix, Scenario Fan, Benchmark | 5–6 |
| Digital | Priority Matrix (2×), KPI Scorecard (2×), Timeline, Process | 6–7 |
| Org Restructure | Process (2×), Facts vs Perspectives (2×), KPI, Timeline | 6–7 |
| Commercial Excellence | Benchmark (2×), KPI (2×), Priority Matrix, Facts vs Perspectives | 6–7 |
