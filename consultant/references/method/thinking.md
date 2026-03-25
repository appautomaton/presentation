# Analytical Thinking Method

Behavioral steering only. Everything below targets specific failure modes — it does not teach consulting basics.

---

## 1. Problem Definition

**Format**: verb-led objective + quantified target + time horizon + explicit boundary.

- "Identify actions to close the $45M EBITDA gap within 18 months, focusing on North American operations only."
- "Determine whether to acquire TargetCo at $120M valuation, with board decision by Q3."

Before proceeding, answer: What happens if the client takes no action? (Quantify the cost of inaction.) What specific executive decision will this analysis inform?

---

## 2. MECE Anti-Patterns

- **Overlapping categories**: "Organic growth" and "New products" overlap — new products ARE organic growth. Test boundaries.
- **Missing categories**: "Cost reduction" and "Revenue growth" miss balance sheet optimization. Test exhaustiveness.
- **Uneven granularity**: "North America," "Europe," "Japan" — Japan is within APAC. Pick one level.
- **Residual bucket abuse**: "Other" should be <15% of the total. If larger, the structure is wrong.
- **Lopsided split**: If one group contains 80%+ of the content, granularity is wrong. Split the dominant group.

---

## 3. Issue Tree Types

Three types, chosen by problem structure:
- **Logic tree** (exploratory): problem → drivers → root causes. Use when decomposing an open-ended problem.
- **Hypothesis tree** (directed): hypothesis → what must be true → how to test each condition. Use when you have a day-one answer to validate.
- **Kill-condition tree** (go/no-go): conditions that would terminate the recommendation. Use for binary decisions. Detailed below.

### Kill-Condition Tree

Structure around conditions that would terminate the entire recommendation. Any single branch, if falsified, ends the analysis. Early-exit optimization: test the most lethal question first.

```
Should we acquire TargetCo at $2B?
├── Does core technology have defensible barriers?
│   └── If no → STOP. No basis for premium valuation.
├── Will integration retain ≥90% of key technical staff?
│   └── If no → STOP. Asset walks out the door.
└── Do quantified synergies cover the acquisition premium?
    └── If no → STOP. Deal destroys value on day one.
```

Use when the decision is binary and the cost of a wrong positive vastly exceeds the cost of a wrong negative. Sequence branches by testability — fastest-to-falsify at top. 3-5 branches at the first level.

---

## 4. Leaf-Node Hypothesis Template

Every leaf in an issue tree gets a falsifiable, directional hypothesis:

> "[Observed gap] is driven by [specific cause], evidenced by [early signal], expected magnitude [range]."

Example: "The 3pp margin decline is driven by raw material cost inflation, evidenced by 12% YoY increase in resin prices, expected magnitude $8-12M annually."

---

## 5. Hypothesis Discipline

**Kill at 30%.** If 30% of the evidence contradicts a hypothesis, kill it. Don't accumulate confirming evidence to compensate. Replace with an alternative hypothesis and test that.

---

## 6. Synthesis

When synthesizing multiple analyses, classify each pair of findings as convergence (same direction → high confidence), contradiction (different directions → choose a position, defend it), or blind spot (what you didn't analyze that could flip the answer).

Never average contradictions. Never ignore blind spots — flag them as risks.

**Triangulation rule.** For any finding that drives the recommendation, bring at least 3 independent evidence sources. No single source is dispositive — the synthesis across sources is where the insight lives. If you can only find one source, flag the finding as low-confidence.

For synthesis patterns with worked examples, see frameworks.md §3.
