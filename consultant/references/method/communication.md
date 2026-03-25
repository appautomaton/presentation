# Communication Method

Behavioral steering only. Targets the specific patterns that differentiate consulting-grade communication from Claude's defaults.

---

## 1. Vertical Logic

Children must PROVE the parent — not just relate to it.

**Test**: Cover the parent and read only the children. Do they independently force the parent conclusion? If they merely "discuss the topic," the vertical logic is broken.

**Bad**:
- Parent: "We should enter Europe."
- Child 1: "The European market is large." (Relates, doesn't prove entry is right.)
- Child 2: "We have experience in international markets." (Relates, doesn't prove Europe specifically.)

**Good**:
- Parent: "We should enter Europe via acquisition of EuroDistributor."
- Child 1: "Europe offers $12B addressable market growing at 8%, 2x the US rate."
- Child 2: "Acquisition delivers market access in 12 months vs. 5 years organic, at lower total cost."
- Child 3: "EuroDistributor: 12-country network, 15% EBITDA, $45M valuation (6x)."

**Anti-pattern — circular logic**: Parent: "The acquisition is attractive." Child: "The deal offers significant value." This restates the parent, it doesn't prove it. Each child must add new, independent information.

---

## 2. SCR Construction Rules

- S and C should take <15 seconds to read. Longer = you're burying the lead.
- C must create genuine tension. If the audience reads S and C without feeling "we need to act," rewrite C.
- R must be specific enough to be debatable. "We recommend improving operations" is not a resolution. "We recommend a $120M three-phase cost program targeting 300bp margin recovery in 18 months" is.
- R becomes the governing thought for everything that follows.

See [examples/scr-worked.md](../examples/scr-worked.md) for calibration.

---

## 3. Action Titles

Every slide/section title is a complete sentence stating the conclusion, not the topic. If a reader reads ONLY the titles, they should understand the complete argument.

| Topic title (bad) | Action title (good) |
|---|---|
| "Revenue by Segment" | "Enterprise segment drove 80% of revenue growth, offsetting SMB decline" |
| "Customer Satisfaction Results" | "NPS improved from 22 to 38 after service redesign, now above industry median" |
| "Cost Structure Breakdown" | "Labor costs at 45% of revenue are 8pp above peer median, the largest savings opportunity" |
| "Competitive Market Share" | "We lost 3pp share to Competitor A, primarily in the mid-market segment" |
| "Employee Headcount Trend" | "Headcount grew 25% while revenue grew 8%, widening the productivity gap" |
| "Technology Spend Overview" | "70% of IT budget goes to maintenance, leaving insufficient investment for growth" |

**Flow test**: Read all action titles in sequence. Do they tell a complete story? If not, the argument structure is wrong — fix the structure, not the titles.

---

## 4. Storyboarding Sequence

Build in this order:
1. **Governing thought** (1 sentence): the single most important message.
2. **MECE pillars** (3-4): major argument sections. Test: do they collectively prove the governing thought?
3. **Action title per slide**: write every conclusion sentence. No body content yet.
4. **Flow test**: read titles aloud in sequence. Any logical gaps?
5. **Content last**: only now specify charts, data, supporting text.

Starting from data produces data-driven decks. Starting from the answer produces argument-driven decks.

---

## 5. Narrative Arc — Pillar Transitions

Individual slides can be perfect and the deck still fails. The failure point is between MECE pillars — where the argument hands off from one section to the next.

**The "therefore" vs. "and" test.** Read your pillar summaries in sequence. Do they connect with "therefore" (deductive chain) or merely "and" (list of topics)?

- **Bad**: The market is attractive AND here are entry modes AND here is a target AND here are the financials.
- **Good**: The market is attractive, THEREFORE entry mode is the critical choice, THEREFORE we evaluated targets against [criteria derived from market analysis], THEREFORE this specific deal creates value.

**Pivot slides.** Between each pillar, the audience needs a bridge that converts their state of mind. After "the market is attractive," they're thinking "interesting." Before "three entry modes exist," they need to feel "the HOW matters more than the WHETHER." A pivot slide does this: "Given regulatory complexity and distribution requirements, the entry mode choice is the critical strategic variable — the wrong entry mode is more dangerous than no entry at all."

**Rising stakes.** A great deck escalates — the audience should feel increasing conviction as they progress. The first pillar establishes the opportunity. The second narrows the path. The third proves the economics. The fourth locks in the action plan. Each pillar raises the bar from "worth considering" to "we must act."

---

## 6. Document Type Determines Argument Architecture

The argument structure changes fundamentally by deliverable type — not just the visual template.

**Show decks** assert conclusions. Each slide exists to prove its action title. Evidence is curated to support a single point per slide. The analytical machinery is hidden — the audience receives the answer, not the process.

**Working decks** expose the analytical machinery. Model architecture diagrams, methodology disclaimers, and data distributions come first. Slide titles are topic-descriptive, not assertive. The audience is expected to interrogate the analysis, not just receive it.

**Reports** build evidence chains. Structure: methodology statement → evidence collection → findings (organized by source) → recommendations (each traced to a finding). Every recommendation must trace back to evidence. Reports include "by way of contrast" patterns — presenting both sides before concluding.

**The implication for storyboarding:** An L1 storyboard has action titles that tell the complete story. An L2 storyboard has topic titles on the agenda but action titles on analytical slides. An L3 appendix needs only descriptive labels. Choosing the wrong architecture for the audience degrades the work regardless of analytical quality.

---

## Ghost Deck Bridge

How to take a governing thought + pillars and produce the slide-level argument for deck handoff (see §10).

**Layer 3 — Slide sequence.** Write an action title for every slide BEFORE selecting any exhibit. Each title is a full-sentence conclusion: "[Segment] [verb] [quantified finding], [implication]." Read all titles in sequence — they must tell the complete recommendation in 2 minutes (helicopter test). If the test fails, fix the pillars (Layer 2), not the titles.

**Layer 4 — Transitions.** Every pillar boundary needs one of five transition types:
- **Pivot** — diagnostic → opportunity: "Given [finding], the prize is [quantified]"
- **Narrowing** — broad → focused: "Of [N] options, [M] pass [criteria]"
- **Escalation** — confirmed → risk: "Opportunity is real; binding constraint is [risk]"
- **Synthesis** — multiple analyses → unified: "[A1] shows X, [A2] confirms Y → together [Z]"
- **Decision Gate** — evaluation → choose: "Analysis narrows to [N] paths; decision turns on [factor]"

Rising-stakes progression: Recognition → Clarity → Conviction → Urgency. Each pillar must escalate. Flat stakes = dead deck.

**Layer 5 — Evidence composition.** Assigned last. For each slide: what evidence proves the title's claim? One evidence layer at L1, 1-2 at L2, 2-4 at L3. Describe the analytical question (compare, decompose, rank, evaluate) — the delivery skill selects the visual form.
