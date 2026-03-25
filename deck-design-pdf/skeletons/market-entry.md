# Market Entry — Skeleton

## Governing Thought

**Affirmative:**
```
"[Company] should enter [target market] via [entry mode] targeting [priority segment]
 to capture [SAM: $XB] growing at [X% CAGR], achieving [financial target] by [year],
 because [external rationale] and [internal rationale]."
```

**Negative:**
```
"[Company] should not enter [target market] because [dealbreaker],
 despite [attractive feature]. [Alternative] offers better risk-adjusted returns."
```

## Pillar Architecture

| # | Pillar | Sub-Question | Must-Be-True | Transition Out |
|---|--------|-------------|-------------|----------------|
| 1 | **Market Opportunity** | Is the market large, growing, and structurally attractive? | SAM > threshold, CAGR > minimum, no prohibitive barriers | Pivot → "market is real, how do we enter?" |
| 2 | **Entry Mode** | What is the right way to enter? | One mode dominates on speed, cost, risk-adjusted return | Narrowing → "these alternatives fail because..." |
| 3 | **Target & Segment** | Which segments/targets to prioritize? | Clear priority segment with identifiable targets | Escalation → "opportunity real, does the math work?" |
| 4 | **Financial Case & Risks** | Does the math work? What could kill it? | NPV positive base case, risks mitigable, downside survivable | Closes to recommendation |

## Slide Index (~20 slides, L2)

| # | Title Template | Recipe |
|---|---|---|
| 1 | "[Company] has the opportunity to enter [market] — a $[X]B market at [Y]% CAGR" | Situation context |
| 2 | "[Company] should [enter/not enter] via [mode] targeting [segment] to achieve [target] by [year]" | Facts vs. Perspectives |
| 3 | "Analysis evaluated [N] scenarios across market/mode/target/financial dimensions" | Process Diagram |
| **P1** | | |
| 4 | "The [market] is $[X]B today, projected to reach $[Y]B by [year]" | Market Sizing Stack |
| 5 | "Growth concentrated in [segment] at [X]% CAGR; [declining segment] contracts at [Y]%" | Horizontal bars |
| 6 | "Competitive landscape is [fragmented/consolidated] — top-3 hold [X]% share" | Benchmark Comparison |
| 7 | "[N] structural barriers exist — [barrier with longest timeline] requires [X] months" | Eval Grid |
| 8 | "Market opportunity confirmed at $[X]B — question shifts to 'how to enter'" | Pivot synthesis |
| **P2** | | |
| 9 | "[N] entry modes evaluated against [criteria]" | Eval Grid |
| 10 | "[Winning mode] outperforms on [decisive criterion] — [X] months vs. [Y] months" | Eval Grid (deep) |
| 11 | "[Winning mode] carries [primary risk] — historical success rate [X]%" | Priority Matrix |
| 12 | "Of [N] modes, [winner] is the path forward" | Narrowing synthesis |
| **P3** | | |
| 13 | "Of [N] segments, [M] account for [X]% of the profit pool" | Bubble scatter |
| 14 | "Screening funnel: [N] targets → [M] pass financial → [K] pass strategic → [J] shortlisted" | Screening Funnel |
| 15 | "[Primary target] is strongest — [key strength] with [financial metric]" | KPI Scorecard |
| 16 | "[Target/segment] confirmed — binding question is whether financials withstand scrutiny" | Escalation synthesis |
| **P4** | | |
| 17 | "Total investment of $[X]M yields [X]% IRR / $[Y]M NPV over [N] years" | Waterfall Bridge |
| 18 | "Base case delivers $[X]M by Year [N]; downside still achieves [breakeven metric]" | Scenario Fan |
| 19 | "[N] critical risks — [top risk] has highest impact at $[X]M value-at-risk" | Priority Matrix |
| 20 | "Proceed with [mode] in [quarter] — competitive window closes by [date]" | Timeline |

## Kill Conditions

| # | Trigger | Pivot To |
|---|---------|---------|
| KC-1 | SAM < minimum viable threshold | "Market too small" — conditional entry or monitor |
| KC-2 | All entry modes score red on ≥2 critical criteria | "No viable mode" — staged option strategy |
| KC-3 | Top-3 incumbents > 70% share + price warfare history | Beachhead niche strategy |
| KC-4 | NPV negative under base case | Renegotiate or walk away |
| KC-5 | Regulatory prohibition or >36-month approval | Pre-positioning recommendation |

## Quality Gates

- [ ] Market sizing uses ≥2 independent methods (top-down + bottom-up), variance <25%
- [ ] Every rejected entry mode has a specific, quantified kill reason
- [ ] Competitive response modeled (what do incumbents do when we enter?)
- [ ] Downside case stays above covenant thresholds / avoids distress
- [ ] Timeline benchmarked against comparable entries (≥50th percentile)
- [ ] SAM-to-revenue bridge has explicit conversion chain
- [ ] Slides 1, 2, 20 alone enable go/no-go decision
- [ ] Kill conditions checked — any trigger within 20% flagged
