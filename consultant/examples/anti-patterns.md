# Anti-Patterns: Failed Consulting Output

Incorrect outputs with diagnosis and correction. Load this file to calibrate against common mistakes.

---

## 1. Bad SCR (Buried Lead, Vague Complication)

### Incorrect

> **Situation:** Our company has been operating in the enterprise software market for 15 years. We have a strong brand and loyal customer base. The market has been growing steadily. We recently completed a reorganization of our sales team and invested in new product features.
>
> **Complication:** There are various challenges facing the business, including competitive pressures, evolving customer needs, and some headwinds in certain segments.
>
> **Resolution:** We recommend conducting a comprehensive strategic review to identify opportunities for growth and develop a roadmap for the next 3-5 years.

### Diagnosis

- **Situation** is too long and buries the relevant context in background noise. The reader doesn't know which facts matter.
- **Complication** is vague — "various challenges" and "some headwinds" name nothing specific. The reader can't assess severity.
- **Resolution** is a recommendation to do more work, not an answer. "Conduct a strategic review" is a process step, not a strategy.

### Corrected

> **Situation:** Enterprise revenue grew 4% in FY25, but the core mid-market segment — 60% of revenue — declined 8% as two competitors launched lower-priced alternatives.
>
> **Complication:** At current trajectory, mid-market share erosion will reduce total revenue by $45-60M within 18 months, eliminating the growth from the enterprise segment and compressing EBITDA margin by 3-4 pp.
>
> **Resolution:** Defend mid-market through a targeted pricing restructure (Good/Better/Best tiers) and accelerate enterprise expansion to shift revenue mix — expected to recover $30-40M of the at-risk revenue within 12 months at an investment of $8M.

### Why the correction works

- Situation states only the facts that set up the complication (one sentence, quantified).
- Complication creates tension with a specific, quantified risk and time horizon.
- Resolution is an actionable recommendation with expected impact and cost, not a suggestion to study the problem.

---

## 2. Non-MECE Issue Tree (Overlapping Branches)

### Incorrect

```
Why is customer satisfaction declining?
├── Product quality issues
├── Customer service problems
├── Poor user experience
├── Technical bugs and downtime
└── Competitor offerings are better
```

### Diagnosis

- "Product quality" and "technical bugs" overlap — bugs ARE a quality issue. Items are not mutually exclusive.
- "Poor user experience" overlaps with both product quality and customer service. Where does a confusing onboarding flow go?
- "Competitor offerings are better" is an external explanation mixed into an internal decomposition. It's a different cut of the problem.
- Missing: pricing/value perception, expectation-setting gaps (marketing over-promises).

### Corrected

```
Why is customer satisfaction declining?
├── Product experience (features, UX, reliability)
│   ├── H: Uptime dropped from 99.9% to 99.2%, causing workflow disruption
│   └── H: v4.0 UI redesign increased task completion time by 20%
├── Service experience (support, onboarding, account management)
│   ├── H: Avg. ticket resolution time increased 40% after support team reduction
│   └── H: Onboarding completion rate fell from 85% to 60%
├── Value perception (price vs. delivered value vs. alternatives)
│   ├── H: 15% price increase without visible feature additions
│   └── H: Competitor X launched comparable product at 30% lower price point
└── Expectation gap (promise vs. delivery)
    └── H: Marketing emphasizes features still in beta, creating adoption disappointment
```

### Why the correction works

- Four branches are MECE: every satisfaction driver falls into exactly one bucket.
- Internal and external factors are properly integrated (competitor pricing lives under "value perception," not as a standalone branch).
- Each leaf has a falsifiable hypothesis with a directional signal.

---

## 3. Topic Titles vs. Action Titles

### Incorrect slide titles

| Slide | Topic title |
|---|---|
| 3 | Market Overview |
| 5 | Competitive Landscape |
| 8 | Financial Analysis |
| 11 | Recommendations |

### Why they fail

Topic titles describe the CATEGORY of content on the slide but communicate zero insight. A reader scanning only titles learns nothing. "Market Overview" could mean the market is thriving, collapsing, or stagnant. The decision-maker has to read every slide to find the answer.

### Corrected action titles

| Slide | Action title |
|---|---|
| 3 | The addressable market will grow 12% annually to $8.2B by 2028, driven by regulatory tailwinds in three key segments |
| 5 | Two well-funded competitors are converging on our mid-market position, but neither has our integration depth |
| 8 | The base case delivers 22% IRR with payback in 2.4 years; downside is protected above 15% IRR |
| 11 | Enter via acquisition of a regional player ($40-60M range), then expand organically into adjacent segments |

### The test

Read only the action titles in sequence. They should tell the complete story: attractive market → manageable competition → strong economics → recommended path. If the title sequence doesn't tell a story, the storyboard structure is wrong.

---

## 4. Over-Decomposed Simple Problem

### The question

"Should we renew our office lease at the current rate, or renegotiate?"

### Incorrect response

A full issue tree decomposition with five branches (Real Estate Strategy, Financial Impact, Workforce Planning, Market Conditions, Negotiation Approach), each with three levels of sub-branches, leaf hypotheses, and a validation plan requiring market research, employee surveys, and financial modeling.

### Why it fails

This is a bounded decision with clear parameters — not an ambiguous strategic problem. The decision-maker needs a direct answer with supporting logic, not an analytical architecture. Over-decomposition signals that the consultant doesn't know how to match analytical intensity to problem complexity.

### Correct response

> **Recommendation:** Renegotiate. Current rate is $52/sqft; comparable Class B space in the submarket is $44-48/sqft (CoStar, Q1 2026). The 3-year renewal at market rate saves $180-240K annually. Leverage: 18 months remaining on lease, landlord has 15% vacancy in the building.
>
> **Risk:** If renegotiation fails, our BATNA is relocating to [specific building] at $45/sqft with 6 months of overlap costs ($90K). The expected value of renegotiating still exceeds accepting the current rate.

### The principle

Not every question needs an issue tree. Match the tool to the problem. A direct answer with quantified logic IS consulting-quality output when the problem is bounded.

---

## 5. Framework Tourism

### The question

"What's our competitive position in the cloud infrastructure market?"

### Incorrect response

Applies Porter's Five Forces, then SWOT, then PESTEL, then VRIO, then Value Chain Analysis — presenting each framework sequentially with full write-ups, producing 3,000 words of analysis that restates commonly available information about cloud markets.

### Why it fails

Five frameworks applied to one question violates the maximum of 4 (§2 of frameworks.md), and more importantly, most of these frameworks are not testing a hypothesis or changing a decision. The output is an encyclopedia of cloud market facts organized by framework, not an integrated insight.

### Correct response

**Hypothesis:** "Our competitive position is weakening because we're losing enterprise customers to AWS/Azure integrated offerings."

**Frameworks:** VRIO (do we still have defensible advantages?) + Competitive Positioning Map (where are we vs. rivals on the dimensions that matter?)

**Integrated assessment:**

> Our competitive position is bifurcating. In pure compute, we hold no VRIO-qualifying advantages — AWS matches our scale, Azure matches our enterprise relationships, and both are integrating adjacent services faster than we are. Our position here will continue to erode 2-3pp share annually.
>
> However, in hybrid/multi-cloud orchestration, we hold a sustained advantage: our orchestration IP is valuable, rare, and costly to imitate (VRIO-qualifying), and we are the only vendor positioned as cloud-neutral on the competitive map. This is the dimension enterprise buyers increasingly weight — 68% of enterprise RFPs now require multi-cloud support.
>
> **The implication:** Stop defending pure compute share (losing battle). Double down on hybrid orchestration where we have a structural advantage competitors cannot replicate without abandoning their own cloud platforms. Shift 60% of R&D budget from compute to orchestration within 12 months.

### Why the correction works

No sentence is attributed to a single framework. Each insight integrates VRIO evidence with competitive positioning evidence. The synthesis product — "bifurcating position with one defensible segment" — could not come from either framework alone. VRIO alone would say "we have one advantage." Competitive positioning alone would say "we're losing share." Together they reveal: lose where you can't win, double down where you can't be followed.
