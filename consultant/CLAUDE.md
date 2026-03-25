# Consultant Skill — Agent Guide

## What this skill is

MBB-grade consulting skill — structured analysis, problem decomposition, executive deliverables. Produces content (markdown), not visuals. Hands off to delivery skills for production (slides, documents, spreadsheets).

**Core intent:** Prompt engineering elegance (tight instructions, forcing functions, zero wasted tokens) combined with private domain MBB craft (firm-specific patterns, engagement workflows, judgment heuristics from actually doing the work). This is NOT an MBA textbook or a framework encyclopedia from the 2000s — it's a practical guide for 2026 that makes Claude produce output a real partner would recognize as their firm's way of thinking.

**End-to-end deliverables.** The consultant skill is the strategic brain that produces argument architecture — governing thoughts, pillar structures, action titles, evidence chains, and structured data. It composes with delivery skills for production. The consultant provides WHAT to say and prove; delivery skills decide HOW it looks — including chart types, layouts, and visual patterns. This separation ensures the same storyboard artifact can feed into different production pipelines.

**Visualization boundary.** The consultant skill must NOT specify chart types, visual patterns, or exhibit selections. Content descriptions should describe the analytical question (compare, decompose, evaluate, rank) not the visual form (bar chart, waterfall, bubble). Each delivery skill has its own taxonomy for translating analytical intent into visuals.

## Design principles

1. **Heuristics over data.** Skill files contain consulting judgment rules and thresholds (timeless), not static benchmarks or definitions (perishable or already in Claude's training data). For current-year benchmarks, the skill directs Claude to web search at runtime.

2. **Forcing functions over descriptions.** Don't tell Claude "synthesize well." Force it to answer a specific question: "What changes if you remove your strongest finding?" Forcing functions activate judgment Claude already has. Descriptions waste tokens on things Claude already knows.

3. **Firm files are the moat.** The 6 files under `references/firms/` contain private domain knowledge — proprietary engagement workflows, named artifacts, firm-specific quality gates — sourced from anecdotal evidence in a private domain. Claude CANNOT derive this from training data. Never compress these files using the "does Claude already know this?" test. The answer is no — that's the point.

4. **Progressive disclosure.** SKILL.md is always loaded (~400 lines). Method refs load for most tasks (~300 lines). Firm process loads for firm-mode engagements (~350 lines). Domain refs and examples load on demand. One file per concern. Context budget matters.

5. **Tail position for quality.** Output contracts (§13) and quality gates (§14) are at the END of SKILL.md so they have recency advantage when the model generates the final deliverable.

## File architecture

```
SKILL.md                        ← Always loaded. Orchestrator + forcing functions.
references/
  method/
    thinking.md                 ← Analytical tools (kill-condition trees, hypothesis templates, MECE anti-patterns)
    communication.md            ← Delivery patterns (vertical logic, SCR rules, action titles, narrative arc)
    frameworks.md               ← Framework selection table + pairing rules + synthesis patterns
    engagements.md              ← 8 consulting archetypes (cost, growth, M&A, pricing, digital, org, commercial, market entry)
  contexts.md                   ← Non-consulting audience packaging (investor pitch, internal strategy, public talk)
  firms/                        ← PRIVATE DOMAIN KNOWLEDGE — do not compress
    mckinsey/process.md + catalog.md
    bcg/process.md + catalog.md
    bain/process.md + catalog.md
  domains/                      ← Consulting-specific heuristics only (not textbook definitions)
    pricing.md                    Strong (A) — tier design framework, EVE walkthrough
    industry-context.md           Strong (A) — analytical traps per industry
    m-and-a.md                    Solid (B+) — deal thesis archetypes, integration planning
    due-diligence.md              Solid (B+) — DD templates, red flags
    customer-insights.md          Solid (B) — churn framework, JTBD protocol
    change-management.md          Solid (B+) — resistance management, communication planning
    risk.md                       Solid (B+) — tolerance calibration, reverse stress test, interdependency, quantification discipline
    kpi-reference.md              Compressed — selection discipline + benchmark sources only
    financial-analysis.md         Compressed — decision rules + discount rates only
examples/                       ← Few-shot calibrators loaded at generation time
```

## What NOT to do

- Don't add textbook definitions Claude already knows (MECE, Pyramid Principle, DCF, Porter's)
- Don't add static benchmark numbers — they go stale. Direct to web search instead.
- Don't compress or refactor firm process/catalog files without understanding they contain private domain knowledge
- Don't duplicate content across files — each concept has ONE canonical location
- Don't add safety disclaimers or hedging language — users know this is an AI tool, not a real MBB engagement

## Current status

**Done:**
- SKILL.md: compressed instincts, forcing functions in algorithm, quality gates as self-checks, anti-pattern #8 (generic analysis), reordered §13-§14 to tail
- Method refs: compressed to novel-only content (thinking.md, communication.md), fixed frameworks.md contradiction, added narrative arc guidance, added L1/L2/L3 argument architecture (§6), triangulation rule, framework cascading
- Firm refs: added argumentative signatures (McKinsey: outside-in anchor, scenario brackets, recommend the infrastructure; BCG: positive-sum reframe, self-financing proof, optionality, phased incrementalism; Bain: options funnel, realization haircut, decision confidence threshold)
- Weak domain refs: compressed 80%+ (risk.md, kpi-reference.md, financial-analysis.md)
- Examples layer: replaced 5 fictional framework cases with 4 real MBB cases (BCG Australia Post, McKinsey NDIS, BCG NZ Electricity, Bain SARS), added kill-condition and hypothesis tree types, expanded anti-pattern #5 with worked synthesis, added decision memo example, added User: prompts to all files
- §4 ANALYZE: added research planning and parallelism (scan hypotheses, group independent questions)
- §8 routing table: added 3 context rows (investor pitch, internal strategy, public talk) + loading rule
- §11 artifact persistence: rewritten from rigid manifest to principle-based (organize by topic, persist immediately)
- New file: references/contexts.md — non-consulting delivery contexts (70 lines)
- Decoupled hardwired delivery skill names from SKILL.md (5 locations) and CLAUDE.md (3 locations) — concept-level handoff language
- frameworks.md: compressed MECE templates from 25→8 lines, added "non-standard structure" forcing function
- engagements.md: added cross-archetype composition note (lead/support, kill condition interaction)
- risk.md: expanded from compressed to Solid (B+) — added stated vs. revealed appetite, risk interdependency, quantification discipline
- SKILL.md §9: added hierarchy sentence — §9 for mode selection, firm process files authoritative for execution
- Domain refs audit complete: pricing (A), industry-context (A-), m-and-a (B+), due-diligence (B+), customer-insights (B), change-management (B+) — no compression needed

**Next:**
- Live testing against real consulting tasks — calibrate examples based on observed failure modes
