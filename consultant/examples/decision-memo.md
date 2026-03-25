# Decision Memo Example

A worked decision memo in Bain decision-first style. Demonstrates the full pipeline: Decision Brief → conditional hypotheses → three-scenario economics → recommendation with evidence chain → implementation.

---

**User:** "Our board needs to decide: build a data analytics capability internally, acquire AnalyticsCo for $280M, or enter a strategic partnership. Decision in 90 days."

## Decision Brief

**The Decision:** How should we obtain enterprise data analytics capability: build, acquire AnalyticsCo, or partner?

**Decision Criteria:**
1. Time-to-capability (competitive window is 18 months)
2. Total 3-year cost (board-approved envelope: $350M)
3. Talent retention risk (analytics talent is the asset)
4. Strategic control (board requires roadmap ownership)

**Decision Timeline:** Board decision by Q3. LOI required by Q3+30 days if acquire.

**Decision Stakeholders:** CEO (decision maker), CFO (financial approval), CTO (technical validation), Board (final approval for >$200M).

## Options with Conditional Hypotheses

**Option A — Build ($150M over 3 years)**
Preferred IF: talent market allows hiring 40+ data scientists within 6 months AND competitive window exceeds 24 months AND internal IT infrastructure supports analytics workloads without $30M+ upgrade.

**Option B — Acquire AnalyticsCo ($280M)**
Preferred IF: retention of AnalyticsCo's top 20 engineers is achievable (3-year earnout) AND integration cost remains <$40M AND regulatory approval takes <6 months.

**Option C — Strategic Partnership (JV, $50M/year)**
Preferred IF: strategic control over product roadmap is not a hard requirement AND partner's technology roadmap aligns with our needs for 3+ years AND IP ownership terms are acceptable.

## Condition Testing Results

| Condition | Result | Source |
|---|---|---|
| A1: Hire 40+ data scientists in 6mo | **FAIL** — market analysis shows 12-18mo timeline at current compensation levels | Recruiting pipeline data, compensation benchmarks |
| A2: Competitive window >24mo | **FAIL** — two competitors launching analytics products in Q1 next year | Competitive intelligence, product announcements |
| B1: Top-20 engineer retention | **PASS (provisional)** — preliminary conversations show willingness with 3yr earnout + equity | HR due diligence, retention package modeling |
| B2: Integration cost <$40M | **PASS** — estimated $35M based on 3 comparable SaaS acquisitions | Integration cost model, comparable deal analysis |
| B3: Regulatory <6mo | **PASS** — no antitrust overlap, straightforward filing | Legal review |
| C1: Roadmap control not required | **FAIL** — board explicitly requires roadmap ownership (non-negotiable criterion) | Board minutes, Q2 strategy session |

**Option A eliminated:** conditions A1 and A2 both fail. Build timeline exceeds competitive window.
**Option C eliminated:** condition C1 fails against a non-negotiable decision criterion.
**Option B advances:** all conditions pass (B1 provisional, requires due diligence confirmation).

## Three-Scenario Economics (Option B — Acquire)

| Scenario | Assumptions | 3-Year Revenue Uplift | Total Cost | IRR |
|---|---|---|---|---|
| **Base** | 80% retention, 12mo integration, 60-80% synergy realization | $80M/yr by Y3 | $315M ($280M + $35M integration) | 18% |
| **Upside** | 90%+ retention, cross-sell accelerates, synergies at 80%+ | $110M/yr by Y3 | $310M | 24% |
| **Downside** | 70% retention (30% key talent leaves), 6mo integration delay | $50M/yr by Y3 | $330M ($280M + $50M higher integration) | 11% |

Realization haircut applied: 60-80% on projected synergies given integration complexity. Even downside IRR of 11% exceeds cost of capital (9%).

## Recommendation

**Acquire AnalyticsCo at $280M** with a 3-year earnout structure tied to engineer retention.

Evidence chain:
- Build fails on timeline (A1, A2). Partner fails on control (C1). Acquire passes all conditions.
- Base-case economics are attractive (18% IRR). Downside is survivable (11% IRR > 9% CoC).
- The binding risk is B1 (talent retention) — mitigated by earnout structure targeting top 20 engineers specifically.

## Implementation — 90-Day Sprint Plan

**Sprint 1 (Days 1-30):** LOI execution + confirmatory due diligence. Focus: validate B1 (retention) through direct conversations with top 20 engineers. Validate B2 (integration cost) through detailed systems assessment.

**Sprint 2 (Days 31-60):** Retention package design + regulatory filing. Named owner: CHRO. Deliverable: individualized retention offers for top 20, signed before close.

**Sprint 3 (Days 61-90):** Integration planning + Day 1 readiness. Named owner: CTO. Deliverable: 100-day integration plan with technology migration sequence, org chart, and reporting lines.

---

## Why This Works

- **Closed-form decision** (build/acquire/partner) rather than open-ended "what should we do about analytics?" — forces the analysis toward a discrete choice.
- **Conditional hypotheses** define what must be true for each option to win — then test those conditions directly. Every analytical workstream traces to a specific condition.
- **Three-scenario economics with downside focus** — the question isn't "how good could this be?" but "can we survive the worst case?" Downside IRR > cost of capital = the deal is defensible even if things go wrong.
- **Realization haircut** (60-80%) — sets realistic expectations rather than presenting maximum savings.
- **90-day sprints** — the recommendation includes the first 90 days of execution, not just the decision. Each sprint has a named owner and measurable deliverable.
