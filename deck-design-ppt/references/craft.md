# Craft Reference — Composition Quality Rules

> Loaded by density level. L1 decks skip this file entirely.
> L2 decks read §1–§4. L3 decks read §1–§7.

## Contents

- [§1 Density Levels](#1-density-levels) — targets per level (L2+)
- [§2 Evidence Layering](#2-evidence-layering) — what counts, how to stack (L2+)
- [§3 Exhibit Threading](#3-exhibit-threading) — numbering and cross-referencing (L2+)
- [§4 Chart Annotations](#4-chart-annotations) — inline annotation patterns (L2+)
- [§5 Callout Quality](#5-callout-quality) — advisory vs evidential (L3)
- [§6 Action Title Ladder](#6-action-title-ladder) — label → claim → chained claim (L3)
- [§7 Multi-Panel Recipes](#7-multi-panel-recipes) — layout patterns for dense slides (L3)

---

## §1 Density Levels

Pick one level before generating. It constrains every downstream decision.

| Dimension | L1 Narrative | L2 Structured | L3 Dense |
|---|---|---|---|
| Evidence layers / slide | 1 | 1–2 | 2–4 |
| Panel composition | Single | Occasional multi-panel | Multi-panel expected |
| Data table rows | 3–5 | 5–8 | 8–12+ |
| Exhibit numbering | None | Sequential (optional) | Sequential + cross-referenced |
| Callout style | Advisory | Data-supported | Evidential (cite exhibit + data) |
| Cross-referencing | None | Light (in action titles) | Heavy (every 2–3 slides) |
| Chart annotations | None | 1–2 per chart | 2–4 per chart; required |
| Action title form | Conversational claim | Quantified claim | Chained quantified claim |
| Template scope | P-series only | P + selective C-series | Full library; C-series expected |
| Typography profile | Projected | Document | Document |

**L1 Narrative** — each slide stands alone. One message per slide. Generous whitespace. The title carries the argument; the body just anchors it.

**L2 Structured** — slides build on each other loosely. Occasional exhibit references. Moderate evidence density. The body supports the title with data.

**L3 Dense** — slides form a chained argument. Every exhibit has a number. Action titles reference prior evidence. A partner reads only the titles and gets the whole argument — the "helicopter test."

### Typography profiles

Density level selects a typography profile. The profile constrains all font sizing decisions.

**Projected** (L1) — slides will be projected in a room. Readability at distance.

| Element | Floor |
|---------|-------|
| Action title | 16–20pt |
| Body text, bullets | 12–14pt |
| Sidebar text | 11–12pt |
| Annotations, chart labels | 10pt |
| Source, footnotes | 9pt |
| **Absolute floor** | **9pt** |

**Document** (L2–L3) — slides will be read on screen or print. Density over projection readability.

| Element | L2 | L3 |
|---------|----|----|
| Action title | 15–17pt | 14–16pt |
| Body text, sidebar bullets | 11pt | 10–11pt |
| Table headers | 10–11pt | 10–11pt |
| Table data cells | 10–11pt | 9–10pt |
| Annotations, chart labels | 9pt | 8–9pt |
| Source, footnotes | 8pt | 8pt |
| **Absolute floor** | **8pt** | **8pt** |

At L3, the tighter floors enable 10–12 row data tables and 3–4 annotation layers per chart — matching real MBB density. At L1, the generous floors ensure readability when projected on a wall.

---

## §2 Evidence Layering

An "evidence layer" is one distinct visual element that carries data or structured information:

| Layer type | Examples | Counts as |
|---|---|---|
| Primary exhibit | Bar chart, line chart, scatter, waterfall | 1 layer |
| Supporting exhibit | Mini h-bar, sparkline inset, compact table | 1 layer |
| Metric card row | 3+ KPI cards with labeled values and sources | 1 layer |
| Structured callout stack | 2+ callouts each citing specific data | 1 layer |

### Stacking targets

| Level | Composition |
|---|---|
| L2 | 1 primary + 1 supporting, OR 1 primary + metric cards |
| L3 | 1 primary + 1 supporting + callout stack, OR 2 primaries with shared annotation |

Never exceed 4 layers on one slide — beyond that, split into two slides.

C01 (multi-evidence) is built for 3-layer compositions. Use it as the base for L3 slides. C04 (facts vs perspectives) naturally supports 2 layers per column.

### The density test

After building a slide, ask: *"If I removed the action title, would the body alone convince a skeptic?"*

At L3, the answer must be yes — the evidence is self-sufficient. At L1, the title carries most of the weight and the body anchors it. At L2, you're somewhere in between — the body needs at least one strong piece of evidence.

---

## §3 Exhibit Threading

### Numbering rules

- Number exhibits sequentially across the entire deck: EXHIBIT 1, EXHIBIT 2, ...
- Place the label in the subtitle or annotation line, not the action title.
- Skip numbering on: P01 (cover), P08 (closer), P10 (agenda), C05 (divider).

### Cross-referencing rules

| Level | Rule |
|---|---|
| L2 | Reference a prior exhibit when the connection is direct: *"Building on the cost drivers in Exhibit 3..."* |
| L3 | Every 2–3 slides, the action title must reference a prior exhibit by number. No orphan evidence. |

### The title-chain test

Read only the action titles in sequence, ignoring slide bodies. At L3, the titles alone must form a coherent executive summary — a complete argument you could present in 60 seconds. If a title doesn't advance the argument or connect to prior evidence, it fails the test.

This is what McKinsey calls the "helicopter test" and what BCG calls "reading the spines." If your title sequence reads like a table of contents instead of an argument, you're at L1 quality regardless of how much data is on each slide.

### Anti-patterns

- **Jumping numbers**: EXHIBIT 5 → EXHIBIT 15 — signals copy-paste.
- **Phantom references**: citing "Exhibit 12" in a 6-slide deck.
- **Numbering decoration**: labeling icons or divider graphics as exhibits.

---

## §4 Chart Annotations

Charts without annotations force the reader to find the insight themselves. At L2+, annotate the "so what" directly on the chart.

### Annotation types

| Type | Purpose | PPTX implementation |
|---|---|---|
| **Delta label** | Change between two points | `addText()` with arrow character (↑/↓) + value, positioned between bars |
| **Threshold line** | Meaningful boundary | `addShape(rect)` as thin dashed rule + `addText()` label at right end |
| **Highlight region** | Insight zone | `addShape(rect)` with fill transparency (15–30%) spanning the data range |
| **Point callout** | Label a specific data point | `addShape(rect)` border box + `addText()` inside, positioned near the data point |

### Implementation

Annotations are native PPTX shapes (`addShape` + `addText`) positioned using grid coordinates. Place them after the chart so they render on top. Use theme colors for consistency.

### Budget per level

| Level | Annotations per chart |
|---|---|
| L2 | 1–2 (the single most impactful delta or threshold) |
| L3 | 2–4; every chart must have at least one directing the reader's eye |

---

## §5 Callout Quality

> L3 only. At L1–L2, advisory callouts are acceptable.

### Two callout types

| Type | Structure | When |
|---|---|---|
| **Advisory** | [Insight]. [Implication]. | L1–L2, or no exhibit on slide |
| **Evidential** | [Exhibit ref + data]. [So what — do math]. [Therefore — connect forward]. | L3, whenever an exhibit is present |

### Examples

**Advisory** (L1–L2):
> Mid-market pricing is under pressure from two new entrants; a tiered response may protect margins without triggering a price war.

**Evidential** (L3):
> Exhibit 3 shows revenue per FTE declining from $320K to $245K (–23%) while headcount grew 18%. Adding 200 heads without proportional revenue means the new hires are diluting productivity — which explains why EBITDA margin compressed 4pp despite top-line growth (Exhibit 5).

### The evidential callout test

Delete the exhibit number and data point from the callout. If the sentence still reads the same, it's advisory wearing evidential clothing. Real evidential callouts break when you remove the numbers — the argument collapses without the specific data.

### The "so what" rule

The middle clause of an evidential callout must do math or make a comparison — not restate the data. "Revenue per FTE declined 23%" is restating. "New hires are diluting productivity" is a so-what. The reader already has the chart; the callout must tell them what it *means*.

---

## §6 Action Title Ladder

> L3 only. L1 uses conversational claims. L2 uses quantified claims.

### Three tiers

| Tier | Pattern | Example |
|---|---|---|
| **Label** | [Topic word] | "Recommendation" |
| **Claim** | [Conclusion sentence] | "Headcount growth is outpacing revenue, compressing margins" |
| **Chained claim** | [Conclusion + exhibit ref + quantification] | "The 23% decline in revenue per FTE (Exhibit 3) confirms that headcount growth is outpacing revenue, requiring immediate productivity intervention" |

Labels are never acceptable — even P10 (agenda) should have a descriptive title, not just "Agenda."

### L3 chaining rules

1. Every title includes at least one number when the slide carries quantitative data.
2. Every 2–3 slides, the title references a prior exhibit by number.
3. The title sequence alone passes the title-chain test (§3).

### Anti-patterns

- **Labels as titles**: "Recommendation", "Architecture", "Summary" — these are section names, not arguments.
- **Meta-references**: "McKinsey-style analysis", "As shown below" — these describe the deck, not the content.
- **Unsupported opinion**: "We believe the restructuring is the right approach" — a claim with no number or exhibit reference.
- **Restating the chart**: "Revenue per FTE declines as headcount grows" — the chart already shows this. The title should say *why it matters*.

---

## §7 Multi-Panel Recipes

> L3 only. L1–L2 use single-panel compositions from the template as-is.

Four layout patterns for dense slides. All extend existing pattern functions.

### Recipe 1: Chart + Supporting Table

```
┌────────────────────┬──────────────┐
│  Primary chart     │  Data table  │
│  (addChart)        │  (addText)   │
│                    │              │
├────────────────────┴──────────────┤
│  Callout bar                      │
└───────────────────────────────────┘
```

**When**: The chart summarizes what the table breaks down.
**Base**: Extend C01. Replace sidebar bullets with compact table (4–6 rows, 2–3 cols).

### Recipe 2: Dual Exhibit

```
┌─────────────────┬─────────────────┐
│  Exhibit A      │  Exhibit B      │
│                 │                 │
├─────────────────┴─────────────────┤
│  Shared caption + callout         │
└───────────────────────────────────┘
```

**When**: Before/after or by-segment comparison.
**Base**: Extend C04. Both columns get chart containers instead of bullet lists.

### Recipe 3: Chart + Mini-exhibit + Callouts

```
┌────────────────────┬──────────────┐
│  Primary chart     │  Callout 1   │
│                    ├──────────────┤
├────────────────────┤  Callout 2   │
│  Mini h-bar        ├──────────────┤
│                    │  Callout 3   │
└────────────────────┴──────────────┘
```

**When**: Multiple evidence types needed to make the argument.
**Base**: C01 as-is — this is its native composition.

### Recipe 4: Table + Highlight + Sidebar

```
┌────────────────────────┬──────────┐
│  Full data table       │  Insight │
│  (highlighted row)     │  sidebar │
│                        │          │
└────────────────────────┴──────────┘
```

**When**: One row in the table tells the main story.
**Base**: Extend P09. Add right sidebar (25–30% width) with 2–3 callouts on the highlighted row.

### Recipe selection

| Data shape | Recipe |
|---|---|
| Chart + breakdown details | 1: Chart + Table |
| Two time periods or segments | 2: Dual Exhibit |
| Multiple evidence types | 3: Chart + Mini + Callouts |
| One standout row in a table | 4: Table + Highlight + Sidebar |

---

## Firm-Specific References

Every consulting deck uses one firm style as its design vocabulary. Load the matching file alongside craft.md. See SKILL.md § Firm Style for selection guidance.

| File | Covers |
|---|---|
| [mckinsey.md](mckinsey.md) | Two-tier headers, composition patterns, waterfall grammar, color semantics, navigation system, deck modes (270 lines) |
| [bcg.md](bcg.md) | Green rule header, panel mini-headers, scorecard matrices, green-anchored color system, three deck modes (307 lines) |
| [bain.md](bain.md) | Red rule header, facts-vs-perspectives frame, monochrome-plus-one-accent color system, three deck modes (290 lines) |
