# McKinsey Process Reference

Updated: 2026-03-03
Companion: [catalog.md](catalog.md) — per-framework intent, inputs, outputs, and deck expression.

## Agentic usage contract

When this file is loaded, follow these rules:

1. Treat tier workflows as default execution order.
2. Enforce quality gates before tier handoff.
3. Emit named artifacts for each framework run.
4. Use the companion catalog for framework intent and decision context.

## Operating system overview (4-tier stack)

The workflow is organized into four linked tiers. In practice, teams loop across tiers, but this ordering is the default execution backbone.

1. Tier 1 - Diagnostic Frameworks
   - Define problem space, scope, and workstream priorities.
2. Tier 2 - Analytical Engines
   - Quantify hypotheses, size value pools, and identify drivers.
3. Tier 3 - Strategic Lenses
   - Convert analysis into strategic choices and portfolio logic.
4. Tier 4 - Implementation Architecture
   - Translate strategy into initiatives, sequencing, and governance.

Core dependency rule: output of each tier is input to the next tier.

### Relationship between Tier 1 and Tier 2 tools

Two tools look similar but serve different purposes:

- **Issue Tree** (Tier 1) is qualitative problem decomposition — it breaks an ambiguous concern into testable sub-problems. Nodes are questions and hypotheses. The output is a work plan.
- **Value Driver Tree** (Tier 2) is quantitative performance decomposition — it breaks a financial KPI into arithmetic components down to operational drivers. Nodes are numbers with formulas connecting them. The output is a sensitivity map.

The Issue Tree asks "why is margin declining?" The Value Driver Tree asks "which operational lever moves EBITDA most per unit of effort?" The first defines the analytical lanes; the second quantifies them.

## Tier 1: Diagnostic frameworks

### 1) Issue Tree workflow

Objective: turn a vague executive concern into a testable problem architecture.

Step T1.1 - Problem statement crafting (day 1 to day 2)
- Produce one action-oriented sentence with:
  - Verb-led objective.
  - Quantified target.
  - Time horizon.
  - Explicit boundary (in scope and out of scope).

Step T1.2 - First-level decomposition
- Split into 3 to 5 MECE first-level branches.
- Use decomposition path by problem type:
  - Profitability-heavy: profit tree logic.
  - Operations-heavy: value chain logic.
- If uncertain, run both quickly and choose higher explanatory power.

Step T1.3 - Leaf-node hypothesis generation
- Each leaf node gets a falsifiable, directional hypothesis.
- Hypothesis template:
  - "[Observed gap] is driven by [specific cause], evidenced by [early signal], expected magnitude [range]."

Step T1.4 - Validation planning
- For each hypothesis define:
  - Required analyses.
  - Required data sources.
  - Owner.
  - Completion window.

Primary artifacts
- Issue Tree overview.
- Hypothesis tracker.

Quality gates
- No overlap, no gaps in first-level decomposition.
- Every hypothesis is falsifiable.
- Every hypothesis has at least one named data source and owner.

### 2) CEO Agenda alignment overlay

Objective: align analytical work with sponsor priority while preserving analytical rigor.

The Issue Tree defines the objective function. The CEO Agenda defines the boundary conditions. A recommendation that optimizes the analysis but violates the sponsor's strategic commitments is infeasible — it will not survive the politics regardless of its analytical merit.

Step T1.A - Sponsor agenda interview
- Extract top priorities, top concerns, and single most important outcome.

Step T1.B - Priority mapping
- Map workstreams to two axes:
  - Analytical impact.
  - Sponsor alignment.

Step T1.C - Resource weighting
- High impact + high alignment: priority workstreams.
- High impact + low alignment: educate and elevate.
- Low impact + high alignment: expectation management.
- Low impact + low alignment: deprioritize.

Primary artifact
- Priority alignment matrix.

## Tier 2: Analytical engines

### 1) Benchmark Analysis

Objective: quantify performance gaps and translate them into value at stake.

Step T2.1 - Benchmark universe definition
- Build two benchmark sets:
  - Broad peer set.
  - Aspirational best-in-class set.

Step T2.2 - Metric normalization
- Normalize for comparability (currency basis, unit basis, accounting conventions).
- Normalize down to the unit at which a manager can take action. Aggregate benchmarks produce interesting charts; unit-economics benchmarks produce workstreams. Compare "warehousing cost per ton per hundred kilometers," not "total logistics cost."

Step T2.3 - Gap identification and sizing
- Compute absolute and relative gaps per metric.
- Convert each material gap into value terms.

Step T2.4 - Root-cause drill-down
- Apply evidence-backed causal chain (no unsupported causal claims).

Step T2.5 - Opportunity prioritization
- Rank by value at stake and feasibility.

Primary artifacts
- Benchmark comparison chart set.
- Benchmark bridge / waterfall.

Quality gates
- Every gap has transparent math.
- Every root-cause claim has supporting evidence.
- Value pool roll-up reconciles to top metric delta.

### 2) Value Driver Tree Quantification

Objective: decompose a top KPI into operational drivers and identify highest-leverage interventions.

Step T2.V1 - KPI decomposition
- Start from root KPI (for example ROIC, EBITDA, FCF, revenue).
- Decompose via arithmetic relationships to operational leaves.

Step T2.V2 - Data population
- Fill actuals and benchmarks at each node.

Step T2.V3 - Sensitivity analysis
- Estimate impact of 1 percent change per driver on root KPI.
- Standard approach: sequential perturbation (one driver at a time, others held constant).
- High-precision variant (PE due diligence, board-level): full Monte Carlo simulation with copula functions to capture inter-driver correlation. Report sensitivity as distributions (P10/P90) rather than point estimates.

Step T2.V4 - Cross-reference with benchmark gaps
- Prioritize interventions where both leverage and gap are high.

Primary artifact
- Driver cascade with sensitivity markers.

Quality gates
- Tree formulas reconcile top to bottom.
- Sensitivity method is documented.
- Priority list tied to both leverage and gap.

### 3) Granular Growth Decomposition (GGD)

Objective: find where growth came from, where future growth exists, and where to reallocate resources.

Step T2.G1 - Segmentation architecture
- Define 3 to 4 segmentation dimensions.
- Keep cell count manageable; pre-cluster if needed.

Step T2.G2 - Historical attribution
- Decompose growth into three components: portfolio momentum (market tailwinds), M&A (inorganic), and market share gain (competitive capture). This attribution reveals whether growth was earned or inherited — a company riding portfolio momentum alone is exposed when the cycle turns.

Step T2.G3 - Forward potential scoring
- Score future potential by weighted factors such as:
  - Market growth outlook.
  - Competitive intensity.
  - Headroom from current share.
  - Capability fit / right to win.
  - Structural tailwinds and headwinds.

Step T2.G4 - Heat map construction
- Plot historical contribution vs future potential.
- Use bubble size for current revenue scale.

Step T2.G5 - Resource reallocation plan
- Recommend budget, capacity, and headcount shifts across cells.

Primary artifacts
- Growth heat map.
- Reallocation flow view.

Quality gates
- Decomposition reconciles to reported growth.
- Scoring weights are explicit and auditable.
- Reallocation impacts are quantified.

## Tier 3: Strategic lenses

### 1) Where-to-Play / How-to-Win

Objective: convert analysis into concrete strategic choices and required capability system.

Module T3.W1 - Where to play
- Decide across three granularity levels:
  - Arena.
  - Segment.
  - Battleground.

Module T3.W2 - How to win
- For each battleground define:
  - Winning aspiration with measurable target and timeline.
  - Capability system map (interdependent capabilities, not isolated actions).

Primary artifacts
- Where-to-play cascade.
- Battleground scorecard.
- Capability system map.

### 2) Horizon portfolio refresh

Objective: balance near-term performance with medium and long-term bets using a dynamic portfolio view.

2025 horizon definitions (compressed from original model):
- Horizon 1 (0-18 months): protect and extend the core.
- Horizon 2 (18 months - 3 years): build emerging businesses.
- Horizon 3 (3-5 years): create options for future growth.

Resource allocation benchmarks (from top-quartile S&P 500 study):
- Mature industries: H1 70% / H2 20% / H3 10%.
- High-growth industries: H1 60% / H2 25% / H3 15%.
- These are reference anchors, not prescriptions.

Process
- Classify initiatives into horizons.
- Set resource envelope using benchmarks as starting point, adjusted for client context.
- Enforce bidirectional feedback: H3 bets must generate near-term signal (revenue, data, capability) that strengthens H1, not merely promise future optionality. Horizons that only consume without feeding back are venture capital, not corporate strategy.
- Track migration of initiatives across horizons over time.
- Monitor horizon fluidity: successful initiatives migrate H3 → H2 → H1; failing ones fall back or are killed.

Primary artifacts
- Three-horizon portfolio view.
- Horizon migration tracker (per-initiative classification with migration direction and key milestones).

### 3) Digital Value at Scale

Objective: move from scattered pilots to enterprise-level digital value capture.

Step T3.D1 - Digital ambition setting
- Choose ambition archetype(s) and target outcomes.

Step T3.D2 - Use-case factory and prioritization
- Inventory use cases and score on value and feasibility.

Step T3.D3 - Transformation architecture
- Define enabling stack across data, technology, operating model, and talent.

Step T3.D4 - Value tracking cockpit
- Establish KPI and governance mechanism for realized value.

Primary artifacts
- Use-case prioritization matrix.
- Digital transformation blueprint.
- Value cockpit mockup.

Quality gates
- Use-case value math is explicit.
- Feasibility criteria are transparent.
- Value capture KPIs have clear owners and cadence.

## Tier 4: Implementation architecture

### Impact Blueprint workflow

Objective: make strategy executable and governable.

Step T4.1 - Initiative design
- Convert strategic recommendations into initiative charters.

Initiative charter required fields
- Initiative name.
- Strategic objective served.
- Key deliverables.
- Success metrics.
- Named owner.
- Timeline and milestones.
- Resource requirement.
- Dependencies.
- Top risks and mitigations.

Step T4.2 - Sequencing and interdependency mapping
- Build initiative network map.
- Distinguish:
  - Hard dependencies.
  - Resource competition links.
- Identify critical path and bottlenecks.

Step T4.3 - Transformation office design
- Define governance structure, cadence, escalation protocol, and dashboard.

Step T4.4 - Value assurance
- Bind every dollar-value commitment from Tier 2 to a named business owner's performance targets. Strategy that lives in a slide deck but not in someone's annual review is strategy that will not happen.

Step T4.5 - Capability building
- Design a knowledge-transfer mechanism (Center of Excellence, internal academy, or embedded coaching program) so the client can sustain execution after the engagement ends. The test: could the client repeat this analysis in 12 months without consultants?

Step T4.6 - Change architecture
- Apply the Influence Model: change sticks only when four conditions hold simultaneously: (1) a compelling change story people understand and believe, (2) visible role modeling by senior leaders, (3) skill-building so people can perform the new behaviors, (4) reinforcing mechanisms — metrics, incentives, and processes — aligned to the new way. If any one is missing, the other three are insufficient. See [change-management.md](../../domains/change-management.md) for the full adoption and resistance methodology.

Primary artifacts
- Initiative portfolio overview.
- Initiative network map.
- TMO blueprint.

Quality gates
- Every initiative has a single accountable owner.
- Critical path is explicit.
- Governance cadence is fixed and staffed.
- Every Tier 2 value commitment is traceable to a named owner's performance targets.
- Knowledge-transfer plan exists for any capability the client cannot yet perform independently.

## Argumentative Signatures

**Outside-in anchor.** Every McKinsey argument establishes an external benchmark before discussing the client's position. The client's current state is one point on a distribution — never presented as an isolated fact. Global peers, comparable markets, or cross-sector benchmarks come first. This makes the gap between current and possible viscerally clear without directly criticizing the client.

**Scenario brackets.** Never present point forecasts. Every projection is a range with named scenarios (base/upside/downside or slow/mid/rapid). This makes the recommendation robust across scenarios — the discussion becomes "which scenario to plan for" rather than "is this forecast right?"

**Recommend the infrastructure.** Where possible, recommend building ongoing decision-making capability, not just making a one-time decision. A market monitoring cycle, a pricing review process, a workforce planning capability. This embeds the analytical approach into the client's operations.

---

## Cross-tier engagement cadence (default)

Typical cycle: 8 to 12 weeks

Week 1 to 2
- Tier 1 completion with initial Tier 2 planning.

Week 2 to 6
- Tier 2 engines executed in parallel where possible.

Week 5 to 8
- Tier 3 option synthesis and executive decision package.

Week 7 to 12
- Tier 4 implementation architecture and handover.

## Standard deck mapping

Each framework should output one anchor slide plus supporting pages.

Required anchors
- Issue tree overview.
- Hypothesis tracker.
- Benchmark bridge.
- Value driver cascade.
- Growth heat map.
- WtP/HtW package.
- Horizon portfolio and migration tracker.
- Digital blueprint and value cockpit.
- Initiative network and TMO operating model.

Governing-thought rule
- Every anchor slide starts with one sentence that states the decision-relevant insight, not the method.
