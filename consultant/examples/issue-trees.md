# Issue Tree Decompositions

Three worked issue trees, each demonstrating a different tree type. See thinking.md §3 for type definitions.

---

## 1. Profitability Decline (Logic Tree)

**User:** "Our EBITDA margins dropped 3 percentage points. Find out why and how to fix it."

*This is a **logic tree** — exploratory decomposition of an open-ended problem. Use when the problem space is broad and you need to identify which branch contains the root cause.*

**Problem statement**: Identify the drivers of IndustrialCo's 3pp EBITDA margin decline ($45M) over the past two years and recommend actions to recover at least 200bp within 12 months.

### Issue tree

```
Why have EBITDA margins declined 3pp ($45M)?
│
├── Revenue per unit declining? [$15M estimated impact]
│   ├── Price erosion from competitive pressure?
│   │   Hypothesis: Average selling price declined 5%+ due to 2 new
│   │   entrants in the mid-tier segment.
│   │   Signal: Win/loss data shows increased price concessions.
│   │
│   ├── Mix shift toward lower-margin products?
│   │   Hypothesis: Product mix shifted 8pp toward commodity SKUs as
│   │   premium demand softened.
│   │   Signal: Premium SKU volume flat while commodity SKUs grew 15%.
│   │
│   └── Volume discount escalation?
│       Hypothesis: Top-10 accounts renegotiated to 12%+ discounts,
│       up from 8%, eroding 2pp of realized price.
│       Signal: Contract renewal terms vs. prior year.
│
├── COGS per unit increasing? [$20M estimated impact]
│   ├── Raw material cost inflation?
│   │   Hypothesis: Resin and steel input costs rose 12% YoY,
│   │   accounting for $12M of the gap.
│   │   Signal: Commodity index vs. contract pricing.
│   │
│   ├── Manufacturing yield declining?
│   │   Hypothesis: Yield dropped from 94% to 91% after the plant
│   │   expansion, adding $5M in waste cost.
│   │   Signal: Scrap rate by production line, pre- vs. post-expansion.
│   │
│   └── Supply chain cost increasing?
│       Hypothesis: Freight costs rose 18% due to carrier consolidation,
│       adding $3M.
│       Signal: Per-unit logistics cost trend by lane.
│
└── SG&A growing faster than revenue? [$10M estimated impact]
    ├── Headcount growing faster than output?
    │   Hypothesis: Headcount grew 15% while revenue grew 4%,
    │   adding $6M in personnel cost without proportional output.
    │   Signal: Revenue per FTE trend.
    │
    └── Overhead cost inflation?
        Hypothesis: Facility and IT costs rose $4M from new office
        lease and ERP implementation, partially one-time.
        Signal: Fixed cost breakdown, recurring vs. one-time.
```

### Validation plan

| Priority | Hypothesis | Analysis | Data source |
|---|---|---|---|
| 1 | Raw material inflation | Commodity cost bridge, contract vs. spot comparison | Procurement data, commodity indices |
| 2 | Product mix shift | SKU-level margin and volume trend, 24-month | Product P&L, ERP |
| 3 | Headcount productivity | Revenue per FTE trend, department-level | HR data, financial reports |
| 4 | Price erosion | Win/loss analysis, ASP trend by segment | CRM, pricing database |
| 5 | Manufacturing yield | Scrap rate by line, pre/post expansion | MES system, quality reports |

---

## 2. Growth Strategy (Hypothesis Tree)

**User:** "Our core mid-market segment is saturating. We think enterprise is the answer — validate or redirect us."

*This is a **hypothesis tree** — the team has a day-one answer ("enterprise expansion is the best growth vector"). Each branch tests a condition that must be true for the governing hypothesis to hold. Unlike a logic tree (which explores alternatives), a hypothesis tree validates or kills a specific bet.*

**Problem statement**: Validate whether enterprise expansion can deliver $25M+ ARR for CloudStack within 24 months, or redirect to alternative growth vectors.

### Hypothesis tree

```
Governing hypothesis: Enterprise expansion is the highest-ROI
growth vector and can deliver $25M+ ARR within 24 months.
│
├── C1: Are product capabilities sufficient for enterprise?
│   [Must be true] 3 capability gaps (SSO, audit logging, custom
│   workflows) block 80% of enterprise deals.
│   Test: Lost-deal feature analysis + engineering build estimate.
│   Hypothesis: Gaps are closeable in 6 months at <$2M investment.
│   Signal: Lost-deal analysis citing missing features, eng estimates.
│
├── C2: Do enterprise unit economics justify the shift?
│   [Must be true] Enterprise ACV must exceed mid-market ACV enough
│   to justify longer sales cycles and higher CAC.
│   Test: Pricing research + early enterprise deal analysis.
│   Hypothesis: Enterprise ACV of $120K+ vs. mid-market $35K
│   yields CAC payback <18 months despite 2x longer sales cycle.
│   Signal: Early enterprise deal ACV, cycle length, CAC.
│
├── C3: Can the sales motion adapt to enterprise?
│   [Must be true] Enterprise requires solutions selling, not PLG.
│   Current team has zero enterprise experience.
│   Test: Pilot with 2 enterprise AEs over 6 months.
│   Hypothesis: Hiring 8 enterprise AEs generates $15M pipeline in Y1.
│   Signal: Pilot pipeline generation rate, win rate, cycle length.
│
└── Resolution:
    If C1-C3 hold → enterprise expansion validated ($20-25M ARR).
    Remaining $35M from existing market upsell ($15-20M) + adjacent
    products ($15-20M) as complementary, not alternative, vectors.
    If any Cx fails → redirect: adjacent products become the primary
    growth vector, enterprise deprioritized until conditions change.
```

### Validation plan

| Priority | Condition | Analysis | Data source |
|---|---|---|---|
| 1 | C1: Product capability gaps | Lost-deal feature analysis, engineering build estimate | CRM loss reasons, engineering team |
| 2 | C2: Enterprise unit economics | ACV modeling, CAC/LTV comparison by segment | Pricing research, early deal data |
| 3 | C3: Sales motion adaptability | Enterprise AE pilot (2 reps, 6 months) | Pilot pipeline and conversion data |

---

## 3. Organizational Restructuring (Kill-Condition Tree)

**User:** "We've been asked to assess whether a $200M organizational restructuring should proceed. Give us a go/no-go framework."

*This is a **kill-condition tree** — any single branch, if falsified, terminates the analysis. Use for binary go/no-go decisions where the cost of a wrong positive vastly exceeds a wrong negative. Branches are sequenced fastest-to-falsify first. Grounded in patterns from real restructuring failures (see Bain SARS quality benchmark).*

**Problem statement**: Determine whether to proceed with the proposed $200M organizational restructuring of a 14,000-person government agency.

### Kill-condition tree

```
Should we proceed with this organizational restructuring?
│
├── K1: Does a documented strategy exist that the new structure serves?
│   Test: Request strategy document from sponsor.
│   → If no strategy exists → KILL.
│   "An operating model is a strategy upon which a structure is built.
│    There was no new strategy upon which the structure was rebuilt."
│
│   *** K1 TRIGGERED — no strategy document exists. ***
│   *** Analysis stops. Remaining conditions not tested. ***
│
├── K2: Has the diagnostic consulted operational staff, not just leadership?
│   Test: Interview coverage ratio.
│   → If <10% of affected staff consulted → KILL.
│   33 interviews out of 14,000 staff is not a diagnostic.
│
├── K3: Does restructuring preserve end-to-end value chain visibility?
│   Test: Map current E2E flows for complex cases.
│   → If any critical flow loses single-owner visibility → KILL.
│   Functional reorganization (lawyers to legal, auditors to audit)
│   fragments integrated case management.
│
├── K4: Does a change management plan exist beyond executive announcement?
│   Test: Review transition plan.
│   → If plan = "announce and implement" → KILL.
│   Staff discovering their units no longer exist through HR system
│   changes is not change management.
│
└── K5: Are operational baselines measured pre-restructuring?
    Test: Request pre-restructuring metrics.
    → If no baselines for processing times, approval turnaround,
      revenue collection → KILL.
    You cannot measure restructuring impact without a baseline.
    (After: customs inspection went from 2 days to 23 days.)
```

### Outcome

K1 triggers immediately. Recommendation: "Develop the strategy that the new structure must serve before proceeding with structural design. The restructuring is not rejected — it is premature. Address K1, then re-evaluate K2-K5 in sequence."

This saved the cost of testing K2-K5. In the real case, all five conditions were violated. Estimated impact: R100 billion in lost revenue collection over 3 years.

---

## Pattern Notes

Each tree type serves a different problem structure:

- **Logic tree** (Tree 1 — Profitability): Exploratory. Branches are ALTERNATIVES — "which driver is causing this?" Open-ended decomposition when you don't know where the problem lives.
- **Hypothesis tree** (Tree 2 — Growth): Directed. Branches are CONDITIONS — "what must be true for this bet to work?" Validates a specific day-one answer. If any condition fails, the hypothesis is redirected.
- **Kill-condition tree** (Tree 3 — Restructuring): Binary go/no-go. Branches are DEAL-BREAKERS — any single one kills the recommendation. Sequenced fastest-to-falsify first. Saves analytical cost by stopping early.

The structural difference: logic tree branches are mutually exclusive explanations. Hypothesis tree branches are simultaneously required conditions. Kill-condition tree branches are independently sufficient to terminate.

For logic and hypothesis trees:
- **Every leaf has a directional hypothesis** with expected magnitude. Not "costs might be high" but "resin costs rose 12%, accounting for $12M."
- **Validation is prioritized by impact.** The biggest-lever hypotheses get tested first, not the easiest-to-prove ones.
- **The tree sizes the problem before solving it.** Estimated impact at the branch level tells you where to spend your analytical time.

For kill-condition trees:
- **Every leaf has a binary pass/fail test** with a clear termination criterion and specific test method.
- **Validation is prioritized by speed-to-falsify.** The fastest-to-test condition comes first — saving the cost of testing all subsequent branches.
