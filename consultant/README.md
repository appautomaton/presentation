# Consultant Skill

MBB-grade strategy analysis, problem structuring, and executive deliverables.

Produces structured analysis and deliverable **content** (markdown). Does not produce visuals — hands off to deck-design-ppt, docx, or xlsx for production.

## Capabilities

**Problem structuring** — MECE decomposition, issue trees, hypothesis generation, validation planning. Three decomposition architectures: McKinsey issue trees, BCG Strategic Prism lenses, Bain option maps.

**Strategy analysis** — Framework selection and application with synthesis. Covers market sizing, competitive positioning, financial modeling, and 8 domain specializations (pricing, M&A, due diligence, risk, customer insights, change management, KPIs, financial analysis).

**Firm-specific methodology** — Full engagement processes for McKinsey (4-tier linear stack), BCG (modular lens architecture), and Bain (3-loop decision spiral). Each with quality gates, named artifacts, and deck anchor specifications.

**Executive deliverables** — Executive summaries (SCR-framed), decision memos, deck storyboards, problem decompositions. Each with testable output contracts.

**Industry adaptation** — Analytical recalibration cues for healthcare, defense/government, financial services, SaaS, manufacturing, and energy. Targets specific traps where default methodology produces structurally wrong results.

**Composition** — Storyboard handoff to deck-design-ppt (6-field spec), document structure handoff to docx, model structure handoff to xlsx.

## Architecture

Progressive disclosure — load only what the task needs.

```
consultant/
├── SKILL.md                          ← Layer 0: always loaded (orchestrator)
├── README.md
├── examples/                         ← Layer 4: loaded for calibration
│   ├── scr-worked.md
│   ├── storyboard-walkthrough.md
│   ├── issue-trees.md
│   ├── cross-firm-comparison.md
│   ├── framework-application.md
│   ├── market-sizing.md
│   └── anti-patterns.md
└── references/
    ├── method/                       ← Layer 1: loaded for most tasks
    │   ├── thinking.md                 analytical method (MECE, issue trees, hypothesis, synthesis)
    │   ├── communication.md            delivery method (pyramid, SCR, action titles, storyboarding)
    │   └── frameworks.md               framework selection and pairing rules
    ├── firms/                        ← Layer 2: loaded when firm mode active
    │   ├── mckinsey/
    │   │   ├── process.md              4-tier engagement workflow
    │   │   └── catalog.md              per-framework specs (on-demand lookup)
    │   ├── bcg/
    │   │   ├── process.md              Strategic Prism lens architecture
    │   │   └── catalog.md
    │   └── bain/
    │       ├── process.md              3-loop decision spiral
    │       └── catalog.md
    └── domains/                      ← Layer 3: loaded on demand per routing table
        ├── financial-analysis.md
        ├── pricing.md
        ├── customer-insights.md
        ├── risk.md
        ├── change-management.md
        ├── due-diligence.md
        ├── m-and-a.md
        ├── kpi-reference.md
        └── industry-context.md
```

### Context budget

| Task type | Files loaded | ~Lines |
|---|---|---|
| Quick problem structure | SKILL.md + thinking.md | 590 |
| Strategy analysis | SKILL.md + thinking.md + frameworks.md | 740 |
| Full McKinsey engagement | SKILL.md + thinking.md + communication.md + mckinsey/process.md | 1,130 |
| Above + domain + catalog | all above + domain ref + catalog | ~1,700 |

### Layer summary

- **Layer 0** — SKILL.md (376 lines). Execution algorithm, behavioral instincts, routing table, firm epistemologies, output contracts, quality gates. Always loaded.
- **Layer 1** — Method references (545 lines across 3 files). How to think, communicate, and select frameworks. Loaded for most tasks.
- **Layer 2** — Firm process files (~1,020 lines across 3 files). Full engagement workflows with quality gates and artifacts. One firm loaded per engagement.
- **Layer 3** — Domain references (~1,200 lines across 9 files). Specialized analytical guidance per domain. Loaded on demand.
- **Layer 4** — Catalogs (~950 lines) and examples (~1,030 lines). Lookup and calibration. Loaded when producing specific output types.

## Status

Architecture and content are complete. Ready for live testing against real consulting tasks. Next improvement frontier is empirical — calibrate examples based on observed failure modes.

## Usage

The runtime discovers skills under `workspace/skills/`. This skill is stored under `wip-skills/`, so it will not load unless linked.

From workspace root:

```bash
ln -s ../wip-skills/consultant skills/consultant
```
