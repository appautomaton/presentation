# Density Adaptation — L1 / L2 / L3

How the same argument structure compresses or expands across density levels.

## What Changes Between Levels

| Dimension | L1 Show Deck | L2 Working Deck | L3 Dense / Appendix |
|---|---|---|---|
| **Audience** | Board / SteerCo / CEO | Project team / working session | Technical reviewers / analysts |
| **Purpose** | Assert conclusions, get decisions | Expose machinery, invite interrogation | Full audit trail |
| **Slide count** | 60–70% of L2 | Baseline | 120–150% of L2 |
| **Action titles** | Conversational claim | Quantified claim | Chained claim with exhibit refs |
| **Evidence layers** | 1 | 1–2 | 2–4 |
| **Transitions** | Full pivot slides (dedicated, no data) | Embedded in section openers | In title chains only |
| **Methodology** | Hidden — appendix only | Architecture + key assumptions | Full model specification |
| **Annotations per chart** | 0 | 1–2 | 2–4 (required) |

## L2 → L1 Compression (Show Deck)

1. **Collapse methodology slides** → move to appendix. Show deck shows WHAT, not how.
2. **Merge diagnostic detail** — 3 analytical slides building one insight → 1 slide stating the insight with supporting evidence.
3. **Promote action titles** — title alone must carry the argument. If you need to read the chart, the title is too weak.
4. **Add explicit pivot slides** — between pillars, insert a transition slide (no data). Net effect: remove analytical slides, add transitions. Count drops 30–40%.
5. **Curate evidence** — each slide gets ONE layer. Choose strongest proof point.

> L1 compression is NOT "delete slides." It is "restructure the argument for an audience that spends 3 seconds per slide."

## L2 → L3 Expansion (Dense / Appendix)

1. **Expose model architecture** — value driver tree structure, assumption tables, data source maps.
2. **Add sensitivity analysis** — for every quantified claim, show how conclusions change under different assumptions.
3. **Chain exhibit references** — number every exhibit. Titles reference prior exhibits.
4. **Expand data tables** — complete data, not curated subsets. Segment-level, time-series, statistical confidence.
5. **Remove transition slides** — transitions happen in title chains only.

## Selection Heuristic

```
Board / SteerCo / CEO-only  →  L1 show deck + L2 appendix
Project team / working session  →  L2 working deck
Technical review / due diligence  →  L3 dense
Unsure  →  Default to L2
```

Most engagements produce BOTH L1 and L2. Build L2 first, compress to L1.

## Typical Slide Counts

| Engagement | L1 | L2 |
|---|---|---|
| Market Entry | 15–18 | 20–25 |
| Profitability | 18–20 | 25–32 |
| Growth Strategy | 14–17 | 20–24 |
| M&A | 12–15 | 18–22 |
| Pricing | 15–18 | 22–26 |
| Digital Transformation | 13–16 | 18–22 |
| Org Restructuring | 15–18 | 22–28 |
| Commercial Excellence | 14–17 | 20–24 |

## Firm × Density Interaction

See [firm-dna.md](firm-dna.md) for full firm-specific density behavior. Key differences:

- **McKinsey:** Methodology goes to appendix even at L2. L1 appendix can be 40–60% of main deck length.
- **BCG:** L2 is native density. Panel mini-headers and annotation arrows persist even at L1. BCG at L1 still looks denser than McKinsey at L1.
- **Bain:** Decision brief stays at every density. Facts vs Perspectives only appears at L2+. Sprint plans at L1 show milestones only; at L2 they show week-by-week detail.

## Typography Tier Mapping

Density and typography tier are related but distinct:

| Density | Typical `tier` | Rationale |
|---|---|---|
| L1 | `'presentation'` | Room-safe, projection-safe. Body ≥15pt, axis ≥14pt. |
| L2 | `'document'` or `'presentation'` | Depends on venue — working session vs. conference room. |
| L3 | `'document'` | Dense content needs smaller baselines. Body ≥12pt, axis ≥11pt. |
