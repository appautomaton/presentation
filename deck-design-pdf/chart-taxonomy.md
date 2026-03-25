# Exhibit Design — Practitioner Playbook

> The chart is never the point. The argument is the point. The chart is proof.
>
> Load this reference when designing exhibits. Don't start with "what chart?"
> Start with "what does this slide need to prove?"

## The Exhibit Principle

An exhibit is NOT a chart. An exhibit is a visual argument:

| Element | Role | Example |
|---|---|---|
| **Action title** | The conclusion you want believed | "Revenue grew 12% driven entirely by pricing power" |
| **Exhibit body** | The evidence (chart, table, visual) | Waterfall: price +14%, volume −2%, mix 0% |
| **Annotation** | The interpretation — what the data means | Callout: "Volume was flat — all growth was price" |
| **Source line** | The credibility | "Source: Company financials, team analysis" |

A chart without an action title is data. A title without evidence is assertion. Together they form proof.

---

## Exhibit Selection — Decision Tree

Given the slide's claim, follow the path to the right exhibit.

### "How big is it?" — Sizing, Comparison, Benchmarking

| You need to... | Use | Config |
|---|---|---|
| Rank items by one metric | Horizontal sorted bars | ECharts `bar` horizontal, sorted desc |
| Compare across 2–3 metrics | Clustered bars | ECharts `bar`, max 3 series |
| Show value vs. benchmark | Bars + reference line | ECharts `bar` + `markLine` |
| Land a single headline metric | KPI card (CSS) | Large number + trend + context |
| Build up a market size | Additive waterfall | Segment → segment → total |
| Show "who plays where" across segments | Marimekko | ECharts `custom`, variable-width rects |

**Practitioner note:** A single large number ($4.2B, 44px bold, centered) often hits harder than any chart. If the number is surprising, let it land alone.

### "Why did it happen?" — Decomposition, Drivers

| You need to... | Use | Config |
|---|---|---|
| Show how a KPI moved A→B | Waterfall / bridge | ECharts stacked bar (invisible base + colored delta) |
| Price/volume/mix decomposition | Labeled waterfall | Same pattern, driver labels on category axis |
| Actual vs. plan gap | Variance bridge | Green (favorable) / red (unfavorable) |
| Cumulative contribution (80/20) | Pareto | ECharts `bar` + `line` combo |
| Multiplicative drivers | Driver tree (CSS/HTML) | Revenue = Volume × Price × Mix |
| Which input moves the needle most | Tornado | ECharts horizontal diverging bars |
| Before/after impact | Split bars | Paired bars or before→after with arrow |

**Practitioner note:** The waterfall is consulting's default exhibit for any delta question. Sort deltas by magnitude (largest positive first → largest negative last) unless chronological order matters more.

### "What should we do?" — Positioning, Prioritization

| You need to... | Use | Config |
|---|---|---|
| Position items on 2 dimensions | 2×2 matrix | CSS Grid quadrants with labeled axes |
| Add size as 3rd variable | Bubble matrix | ECharts `scatter`, `symbolSize` by value |
| Rank by impact vs. feasibility | Priority matrix | Quadrant labels: Quick wins / Strategic bets / etc. |
| Multi-criteria evaluation | Eval grid or heatmap | RAG fills at 15–20% opacity. Define R/A/G. |
| Compare end states across scenarios | Scenario panel | Side-by-side bars or multiple waterfalls |
| Show what happens when | Roadmap / timeline | CSS Grid: time columns × workstream rows |

**Practitioner note:** The axis choice on a 2×2 IS the insight. The value is selecting dimensions that reveal something non-obvious.

---

## Chart Repertoire by Deck Need

Grouped by when you need them, not by abstract categories. Build templates in this order.

### Tier 1 — Foundation

Every consulting deck draws from these. Master these first.

| Chart | What it proves | Implementation |
|---|---|---|
| Horizontal sorted bars | Ranking / comparison | ECharts `bar`, horizontal, sorted desc |
| Waterfall / bridge | What drove the delta | ECharts stacked bar (invisible base + colored delta) |
| Line chart | Trend over time | ECharts `line`, `smooth: false`, label endpoints directly |
| Stacked bar | Composition | ECharts `bar`, `stack: 'total'`, max 5 segments |
| KPI cards | Headline metrics at a glance | CSS — large number + trend indicator + context label |
| Data table | Structured evidence | HTML `<table>` with styled headers, aligned columns |

### Tier 2 — Strategic

Strategy, recommendation, positioning, and evaluation decks.

| Chart | What it proves | Implementation |
|---|---|---|
| 2×2 matrix | Strategic positioning on two dimensions | CSS Grid 4-quadrant with axis labels |
| Bubble scatter | Position + magnitude (3 variables) | ECharts `scatter`, `symbolSize` by value, `markLine` quadrants |
| Donut | Dominant share question (2–5 segments only) | ECharts `pie`, `radius: ['40%','70%']` |
| Evaluation grid | Multi-criteria assessment | HTML table with RAG cell background fills |
| Clustered bars | Multi-metric comparison | ECharts `bar`, multiple series, max 3 |
| 100% stacked bar | Share comparison across categories | ECharts `bar`, stacked, values as % |
| Scenario lines | Multiple forecast paths | ECharts `line`, dashed for scenario variants |

### Tier 3 — Operational

Transformation, implementation, and monitoring decks.

| Chart | What it proves | Implementation |
|---|---|---|
| Gantt / roadmap | What happens when, with dependencies | CSS Grid (time cols × workstream rows), colored spans |
| RAG status matrix | What's on/off track across workstreams | HTML table with status cell fills |
| Process flow | How work moves through stages | CSS boxes + arrows (FA icons or SVG) |
| Timeline / milestones | Key dates and markers | CSS Flex with positioned dots + labels |
| Burndown line | Progress toward target over time | ECharts `line` + target `markLine` |
| Before/after bars | Impact of intervention | Paired bars or split comparison |

### Tier 4 — Specialist

Specific analytical needs. Used when the analysis demands it, not routine.

| Chart | What it proves | Implementation |
|---|---|---|
| Tornado / sensitivity | Which variables have most impact | ECharts horizontal diverging bars from center |
| Pareto | Cumulative contribution (80/20 rule) | ECharts `bar` + `line` combo, dual axis |
| Marimekko | Market landscape — size AND composition | ECharts `custom` series, variable-width rects |
| Sankey | How value/material/flow distributes | ECharts `sankey`, max 8 nodes |
| Radar | Multi-dimensional profile (5–8 dims) | ECharts `radar` with indicator array |
| Funnel | Pipeline conversion by stage | ECharts `funnel`, label conversion rates |
| Treemap | Hierarchical breakdown (>12 items) | ECharts `treemap`, `visibleMin: 300` |
| Heatmap | Intensity across two dimensions | ECharts `heatmap` + `visualMap` |
| Driver tree | Multiplicative causal decomposition | CSS/HTML nested layout with connector lines |
| Fan chart | Forecast with widening confidence range | ECharts `line` + stacked `areaStyle` bands |
| Indexed lines | Growth rates from different bases | ECharts `line`, all series rebased to 100 |
| Swimlane | Process across organizational lanes | CSS Grid with lane rows |

### CSS-Only vs. ECharts

**CSS-only** (simpler, more reliable in PDF pipeline):
- Horizontal progress bars, simple comparisons (<5 items)
- 2×2 matrices, priority grids, evaluation grids
- Process flows, swimlanes, driver trees
- Timelines, roadmaps, Gantt
- KPI cards, data tables, RACI

**ECharts** (when you need axes, computed layouts, or complex data):
- Any chart with axes (bar, line, scatter)
- Waterfalls (stacked bar with invisible base)
- Sankey, treemap, radar, funnel, heatmap
- Pareto (dual axis bar + line)
- Any data series with >5 data points

---

## Firm Visual Identity

### Documented — What Each Firm Actually Invented

Historical facts that shape each firm's visual DNA.

**McKinsey:** Barbara Minto developed the Pyramid Principle at McKinsey (1960s–70s) — structured communication where the conclusion leads and evidence follows. This is why McKinsey-style slides open with the verdict in the action title. Every slide proves one conclusion stated upfront.

**BCG:** Bruce Henderson created the Growth-Share Matrix in 1970 — the original 2×2 matrix (Stars, Cash Cows, Dogs, Question Marks). This established two-dimensional strategic positioning as a fundamental consulting tool. BCG's analytical framework tradition descends from this: process-transparent, framework-anchored arguments.

**Bain:** Fred Reichheld (Bain Fellow) created the Net Promoter Score in 2003. Bain positions around "Results Delivery" — every analysis connects to a specific decision and measurable outcome. This action-orientation shapes their visual language: always tie the exhibit to "what should the CEO do?"

### Observable — What's Visible in Public Materials

From published reports, brand guidelines, and public presentations:

| Firm | Primary color | Design character | Observable in published materials |
|---|---|---|---|
| McKinsey | Navy / blue | Institutional, minimal | Exhibit numbering, restrained blues + grays, data-forward, little decoration |
| BCG | Green / teal | Framework-rich | More framework-heavy layouts, green accent system, analytical transparency |
| Bain | Red accent | Concise, direct | Red as focal accent, shorter documents, decision-oriented framing |

### Practitioner Conventions — Honest Assessment

These are real patterns but they vary by partner, office, and engagement. Treat as useful defaults, not hard rules.

**Communication style is the real differentiator — more than chart selection:**

| Firm | Slide structure | Action title style |
|---|---|---|
| McKinsey | **Verdict-first.** Conclusion in title, evidence below. | Full-sentence conclusions: "Revenue grew 12% driven by pricing power in mid-tier" |
| BCG | **Framework-first.** Show the analytical structure, then the conclusion it produces. | Framework-anchored claims: "Three of five capability dimensions exceed peer median" |
| Bain | **Decision-first.** Facts separated from interpretation. Data vs. judgment is always explicit. | Decision-oriented: "Cost structure supports 15% price reduction without margin erosion" |

**What's universal (NOT firm-specific):**
- Waterfalls, bars, lines, stacked bars — foundational exhibits used identically across all three firms
- Marimekko charts for market landscape — used across firms, not proprietary to any one
- 2×2 matrices — universal despite BCG's historical association
- Data tables, KPI cards — universal

**What's genuinely firm-specific:**
- Bain's **Facts-vs-Perspectives layout** — slides split into facts (left, ~55%, data/evidence) and perspectives (right, ~45%, interpretation/recommendation). This separates what the data shows from what the firm recommends. I've not seen this used systematically at McKinsey or BCG. This is the ONE clearly differentiating visual convention.

**What varies by partner more than by firm:**
- Annotation density (minimal vs. liberal) — some partners at any firm want callout boxes, some kill them
- Chart type tolerance (radar love/hate, pie chart acceptance) — partner-specific
- Color accent system details — each firm has brand colors, but individual engagements vary

**Practical guidance for the skill:**
- McKinsey palette → navy primary, minimal annotation, two-tier header (section label + action title), clean exhibits that prove the title without additional interpretation
- BCG palette → green primary, annotation welcomed, panel mini-headers on multi-panel slides, green rule below action title as visual signature
- Bain palette → grayscale + red accent on focal element, simpler header (title + red rule), facts-vs-perspectives on analytic slides

---

## Deck Archetypes

By what the deck needs to DO. Exhibit mixes below are approximate guidelines — actual decks vary.

### Diagnostic / Current State

**Purpose:** "Here's what we found."
**Arc:** Performance context → Gap analysis → Root causes → Value at stake → Implications

| Exhibit type | Approx. share | Proves |
|---|---|---|
| Benchmark bars (client vs. peers) | ~30% | "We rank 7th of 12 on cost efficiency" |
| Variance bridges | ~25% | "Margin declined 400bps: 200 cost, 200 mix" |
| Heatmap / assessment grid | ~20% | "Capabilities lag in 3 of 7 dimensions" |
| Process flow (pain points marked) | ~15% | "Bottleneck at Stage 3 adds 14 days" |
| KPI cards | ~10% | Headline context |

### Strategic Recommendation

**Purpose:** "Here's what you should do."
**Arc:** Strategic context → Options assessed → Recommended path → Value at stake → Roadmap → Next steps

| Exhibit type | Approx. share | Proves |
|---|---|---|
| 2×2 / positioning matrices | ~25% | "Target the underserved high-growth quadrant" |
| Scenario comparisons | ~20% | "Path B delivers 2.3× more value" |
| Initiative waterfalls | ~20% | "Five initiatives generate $340M total" |
| Priority matrices | ~15% | "Three quick wins, two strategic bets" |
| Roadmap / timeline | ~10% | "Phase 1: 90 days, Phase 2: 6 months" |
| KPI targets | ~10% | Target-state metrics |

### Transformation Roadmap

**Purpose:** "Here's how we'll execute."
**Arc:** Initiative portfolio → Sequencing → Governance → Quick wins → Milestones

| Exhibit type | Approx. share | Proves |
|---|---|---|
| Gantt / workplan | ~25% | Workstreams × time with dependencies |
| Initiative waterfall | ~20% | Value contribution by initiative |
| RAG status matrix | ~20% | Status across workstreams |
| Milestone timeline | ~15% | 30-60-90 day markers |
| RACI / org | ~10% | Ownership and accountability |
| KPI targets | ~10% | How we'll measure success |

### Board / Steering Committee

**Purpose:** "Here's where we are."
**Arc:** Headlines → KPIs → Progress vs. plan → Risks → Decisions needed

| Exhibit type | Approx. share | Proves |
|---|---|---|
| KPI dashboard cards | ~30% | 4–6 metrics with RAG indicators |
| RAG status matrix | ~25% | All initiatives at a glance |
| Variance bridges | ~20% | Plan vs. actual deltas |
| Burndown / progress lines | ~15% | On track or not |
| Decision tables | ~10% | Options requiring board input |

### Due Diligence / Investment Memo

**Purpose:** "Here's what this asset is worth."
**Arc:** Market → Competitive position → Financial performance → Growth → Risks → Valuation → Recommendation

| Exhibit type | Approx. share | Proves |
|---|---|---|
| P&L bridges / waterfalls | ~20% | Margin decomposition, cost structure |
| Competitive positioning | ~20% | Where target sits vs. peers |
| Market sizing waterfall | ~15% | TAM build-up by segment |
| Growth projection lines | ~15% | Scenario-based revenue paths |
| Synergy waterfall | ~15% | Synergy by type (revenue, cost, capex) |
| Risk heatmap | ~10% | Probability × impact matrix |
| Target KPIs | ~5% | Key operating metrics |

### Investor / Roadshow

**Purpose:** "Here's why you should invest."
**Arc:** Problem → Solution → Traction → Market → Model → Competition → Team → Ask

| Exhibit type | Approx. share | Proves |
|---|---|---|
| Growth metrics (line, bar) | ~25% | MRR, users, retention, cohort curves |
| Market sizing | ~20% | TAM/SAM/SOM, waterfall build-up |
| KPI cards | ~20% | Headline traction (ARR, NRR, DAU, etc.) |
| Competitive positioning | ~15% | Where we sit vs. alternatives |
| Team cards | ~10% | Founder/exec bios |
| Financial projections | ~10% | Revenue/burn/runway scenario lines |

---

## Annotation Grammar

Annotations turn data into insight. The chart shows what happened; annotations show what it means.

| Type | Implementation | When |
|---|---|---|
| **Value label** | ECharts `label: { show: true }` | Always. Every bar/line endpoint. Non-negotiable. |
| **Reference line** | ECharts `markLine` with inline label | Benchmark, target, average. Label ON the line. |
| **Callout box** | CSS positioned div, border, near data point | Key interpretation. One per exhibit max. |
| **Delta label** | "+12%" formatted, color-coded green/red | Show change. Always include sign. |
| **Highlight region** | CSS absolute div, dashed border or circle | Circle a cluster on scatter/2×2. |
| **Movement arrow** | SVG path or CSS pseudo-element | Show direction over time on positioning charts. |

### Annotation Rules

1. **Every data point gets a direct label.** Never force the reader to estimate from an axis. Most common correction in deck reviews.
2. **Reference lines get text ON the line.** "Target: $4.2B" sitting on the line — not in a legend.
3. **One callout per exhibit.** Two means the exhibit is trying to say two things — split it.
4. **Callout = interpretation, not description.** Wrong: "Revenue grew 12%." Right: "Growth was entirely price-driven — volume was flat."
5. **Number formatting:** "$4.2B" not "$4,234M". "23%" not "0.23". "3.2×" not "320%". Use the unit that makes comparison intuitive.
6. **Delta formatting:** Always include sign. "+12%" green, "−8%" red. Exception: when positive is bad (cost growth → red "+12%").

### Callout Box Implementation

```html
<!-- Position relative to chart container -->
<div class="relative">
  <div id="chart-1" style="width: 100%; height: 340px;"></div>
  <!-- Callout — positioned over chart area -->
  <div class="absolute top-4 right-4 max-w-[200px] bg-white border border-[var(--accent)]
              rounded px-3 py-2 text-xs text-[var(--text)] shadow-sm">
    <span class="font-semibold text-[var(--accent)]">Key insight:</span>
    Growth was entirely price-driven — volume was flat
  </div>
</div>
```

---

## Consulting Compositions

These are NOT charts — they are structural layouts that no charting library produces. They answer organizational, governance, and synthesis questions where the visual is a system, not a data series.

### When to use a composition instead of a chart

| The slide needs to show… | Use | Example file |
|---|---|---|
| Facts separated from interpretation | **Facts vs. Perspectives** | `facts-perspectives.js` |
| Decision-rights mapping (RAPID) | **RAPID Decision Map** | `rapid-map.js` |
| Value-driver decomposition with algebra (×, +) | **Driver Tree** | `driver-tree.js` |
| Target operating model / org structure | **Org Model** | `org-model.js` |
| Client vs. peer gap across multiple metrics | **Dumbbell Benchmark** | `dumbbell-benchmark.js` |
| Influence × alignment stakeholder positioning | **Stakeholder Map** | `stakeholder-map.js` |
| Activity → pipeline → outcome causal chain | **KPI Cascade** | `kpi-cascade.js` |
| Cross-team process with bottleneck identification | **Swimlane** | `swimlane.js` |
| Systematic option elimination logic | **Screening Funnel** | `screening-funnel.js` |
| Current vs. recommended resource allocation | **Coverage Matrix** | `coverage-matrix.js` |
| Sequenced stakeholder messaging plan | **Communication Cascade** | `communication-cascade.js` |
| Capability risk assessment with mitigations | **Capability Matrix** | `capability-matrix.js` |
| Approval-path bottleneck with cycle times | **Decision Flow** | `decision-flow.js` |
| Formal vs. informal collaboration structure | **Network Map** | `network-map.js` |
| Retention decay patterns across cohorts | **Cohort Retention** | `cohort-retention.js` |
| Total economic value decomposition for pricing | **Economic Value Stack** | `economic-value-stack.js` |
| Growth initiatives across time horizons | **Three Horizons** | `three-horizons.js` |

### Composition characteristics

- **CSS-only:** facts-perspectives, rapid-map, driver-tree, org-model, kpi-cascade, swimlane, screening-funnel, coverage-matrix, communication-cascade, capability-matrix, decision-flow, three-horizons.
- **ECharts:** dumbbell-benchmark (scatter), stakeholder-map (scatter), network-map (graph), cohort-retention (heatmap), economic-value-stack (stacked bar).
- **Firm affinity:** Facts-vs-Perspectives is Bain's signature. RAPID maps are Bain-originated. Driver trees are McKinsey's signature. Economic value stacks are BCG-originated (EVE). Three horizons is McKinsey-originated. Others are universal.
- **Density:** All compositions work at L2 and L3. At L1, Facts-vs-Perspectives, Driver Tree, and Three Horizons adapt well; RAPID maps, Swimlanes, Capability matrices, and Decision flows are inherently L2+.
- **Token-driven:** All use `_shared.js` tokens for responsive text and spacing. No hardcoded font sizes.

---

## Aesthetic Rules

Apply regardless of chart type, firm, or archetype.

1. **No chartjunk.** No 3D, gradients, shadows, decorative elements.
2. **Direct label > legend.** Label data directly. Legend only when labeling would clutter (4+ overlapping series).
3. **Max 4 colors per exhibit.** Primary + gray + 1–2 semantic. Never rainbow.
4. **Title in the slide header.** `title: { show: false }` in ECharts. The action title IS the chart title.
5. **No tooltips.** `tooltip: { show: false }`. Static PDF.
6. **No animation.** `animation: false`.
7. **Y-axis gridlines only.** Dashed, light. No X gridlines.
8. **Axis labels:** Muted color, 11–12px. Reference, not content.
9. **Color discipline:** Use palette tokens. Primary accent + gray + 1–2 semantic colors max.
10. **Spend visual budget on interpretation.** If you can afford one extra element, make it a callout — not a gradient.
