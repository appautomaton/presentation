# Framework Selection Guide

When to use which framework. Not an encyclopedia — the model already knows what SWOT and Porter's Five Forces ARE. This file teaches WHEN and HOW to select and combine them.

---

## 1. Selection by Question

Match the business question to the right framework combination. Default to two frameworks — but if one framework fully answers the question, one is sufficient. Don't add a second to check a box.

| Question | Primary framework | Pairing |
|---|---|---|
| "Why are margins declining?" | Value Driver Tree | Benchmark Analysis + Cost Decomposition |
| "Should we enter this market?" | Market Sizing (TAM/SAM/SOM) | Five Forces + Competitive Positioning |
| "How do we grow?" | Ansoff Matrix | GGD (Granular Growth Decomposition) + Customer Segmentation |
| "Is this acquisition worth it?" | DCF / Scenario Modeling | VRIO + Competitive Response Simulation |
| "How do we beat the competition?" | Five Forces + VRIO | Value Curve Analysis + Positioning Map |
| "Where should we cut costs?" | Value Chain Analysis | Benchmark Analysis + Process Mapping |
| "Is our strategy working?" | Balanced Scorecard | Three Horizons + Portfolio Analysis |
| "How do we transform digitally?" | Digital Maturity Assessment | AI Impact-Feasibility Matrix + Value Chain |
| "What's our competitive advantage?" | VRIO | Advantage Stack (BCG) + Five Forces |
| "Should we diversify?" | Ansoff + BCG Growth-Share | Profit Pool Mapping + Repeatable Model Diagnostic |
| "How do we organize for execution?" | McKinsey 7S | RAPID Decision Map + Capability Assessment |
| "What's the industry trajectory?" | PESTEL + Five Forces | Profit Pool Mapping + Scenario Analysis |
| "How do we price?" | Price-Volume-Mix Analysis | Competitive Positioning + Customer Willingness-to-Pay |
| "How do we prioritize initiatives?" | Impact-Effort Matrix | Three Horizons + Dependency Mapping |

---

## 2. Framework Pairing Rules

For non-trivial questions, pairing frameworks creates triangulation. Use these rules to pair well.

### Pair by perspective

| Pair type | What it does | Example |
|---|---|---|
| External + Internal | Tests market attractiveness AND client capability | Five Forces + VRIO |
| Diagnostic + Prescriptive | Identifies the problem AND recommends the solution | Value Driver Tree + Impact Blueprint |
| Quantitative + Qualitative | Provides numbers AND strategic context | DCF + Scenario Analysis |
| Static + Dynamic | Shows current state AND trajectory | Benchmark + Advantage Trajectory Map |

### Outward + inward check

If using two or more frameworks, include at least one that looks OUTWARD (market, competition, macro) and one that looks INWARD (capabilities, economics, organization). A purely external analysis misses "can we actually do this?" A purely internal analysis misses "does the market want this?"

### Maximum framework count

Cap at 4 frameworks per question. If 4 don't converge, the problem definition is wrong — go back to the issue tree.

---

## 3. Framework Synthesis

Frameworks are inputs to synthesis, not outputs to the client. Never present framework-by-framework. Present insight-by-insight.

### Synthesis patterns

**Convergence**: Multiple frameworks point the same direction.
- "Five Forces shows low competitive intensity, VRIO confirms our sustainable advantage, market sizing shows 12% growth — entry is attractive across all lenses."
- → High confidence. State the converging insight. Cite which frameworks support it.

**Contradiction**: Frameworks point different directions.
- "Market sizing shows $5B opportunity, but Five Forces reveals intense rivalry and low barriers to entry."
- → Judgment call. State the trade-off explicitly. Explain which lens you weigh more and why. Never average contradictions — choose a position and defend it.

**Blind spots**: What the frameworks DON'T cover.
- "Neither Five Forces nor VRIO addresses the regulatory risk of pending legislation."
- → Acknowledge the gap. Assess whether it could change the recommendation. If yes, flag it as a key risk.

**Cascading**: Layer 3-5 frameworks at different levels of abstraction, each narrowing the solution space. Layer 1 classifies the environment. Layer 2 identifies options. Layer 3 evaluates options against criteria. Each layer eliminates possibilities until the recommendation emerges from the filtering. The craft is choosing frameworks whose filtering criteria lead to robust answers.

**Self-test**: Delete your conclusion and hand someone the evidence. Can a smart reader independently derive the same answer? If yes, the chain is strong. If they derive a different answer, your synthesis is adding bias, not insight.

### Output format

Framework synthesis produces an integrated assessment, not a framework recap:

```
## Market entry assessment

Entry is attractive with manageable risk. [Governing thought]

- **Market opportunity**: $5B addressable market growing at 12%, with our target
  segments ($1.2B) growing at 18%. [Market sizing + segmentation]
- **Competitive position**: We hold 2 of 4 VRIO-qualifying capabilities; the third
  (distribution) is acquirable. [VRIO + Five Forces]
- **Economic case**: Base-case NPV of $45M with 22% IRR, downside-protected
  above 15% IRR. [DCF + Scenario]
- **Key risk**: Pending regulation could reduce addressable market by 30%.
  Mitigation: phased entry with regulatory trigger gates. [Gap identified]
```

---

## 4. Reusable MECE Structures

Starting scaffolds for recurring decompositions — adapt to the client's specific structure.

- **Revenue**: Price × Volume × Mix (each decomposes further: price into list × discount × terms; volume into addressable × penetration × retention)
- **Profitability**: Revenue − COGS − SG&A − D&A (decompose each as rate × volume or fixed + variable)
- **Growth**: Market growth + Share gain + New markets + New products
- **Customer economics**: Acquire → Activate → Retain → Monetize → Refer (each stage has conversion rate + cost)

If the client's business doesn't map cleanly to these, that's a signal — the non-standard structure is often where the insight lives.

---

## 5. Application Discipline — Internal Assessment

The model knows the framework structures. These notes teach what goes wrong when applying them.

**VRIO:** Apply to 8-12 resources. Common error: labeling everything valuable and rare. Most capabilities are parity. The power of VRIO is identifying the 2-3 that actually matter.

**7S:** Map interdependencies — which misalignments cause downstream problems? Strategy changes that ignore systems/skills fail. The diagnosis isn't seven independent assessments; it's the friction map between them.

**Balanced Scorecard:** Causal logic flows upward: learning → process → customer → financial. If the chain breaks, fix the lowest broken link first. A financial target without a supporting process improvement is wishful thinking.

---

## 6. Application Discipline — Strategy Formulation

**Blue Ocean / Value Curve:** A differentiated value curve is the visual test. If your curve overlaps competitors, you're competing on the same terms. The goal is a curve with a distinct shape — not marginal improvement on existing factors.

**Business Model Canvas:** Coherence test: do the blocks reinforce each other? A high-touch value proposition with a low-cost channel is a contradiction. A subscription revenue model with a one-time-use product creates friction.

---

## 7. Worked Examples

For four case studies derived from real MBB engagements — service model reform, pricing review, sector decarbonization, and organizational restructuring — demonstrating contradiction, convergence, cascading, and blind spot synthesis, see [framework-application.md](../../examples/framework-application.md).

For market sizing worked examples with top-down/bottom-up triangulation and sensitivity analysis, see [market-sizing.md](../../examples/market-sizing.md).
