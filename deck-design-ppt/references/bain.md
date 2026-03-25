# Bain Reference — Firm-Specific Conventions

> Loaded when the brief specifies Bain philosophy or consulting style at L2+.
> Use alongside [craft.md](craft.md) — this file covers only what is **Bain-specific**.
> General density rules, exhibit threading, annotation budgets, and callout quality live in craft.md.

**Design disposition:** Decision-driven. Every slide — or module — exists to help the client make a specific yes/no decision. Bain separates facts from perspectives so the client knows what's ground truth vs. what's Bain's judgment. Visual restraint (monochrome + one accent) keeps attention on the data, not the design. Working decks are modular: a case team builds a library of 100+ slides organized by workstream, then the partner pulls and recombines modules for different audiences. Show decks are the cleaned-up, linearized artifact; working decks are the LEGO set. Speed of insight delivery beats formatting beauty — "results, not reports."

> **Source note:** The visual conventions below are derived from published Bain show decks. Working decks follow the same color system and header grammar but run denser, with looser formatting and higher tolerance for mixed fonts. The structural principles (modularity, facts-vs-perspectives separation, decision-utility test) apply to both.

## Contents

- [§1 The Reader Contract](#1-the-reader-contract) — five promises every Bain deck makes
- [§2 Slide Grammar](#2-slide-grammar) — red rule header, facts-vs-perspectives frame, footer system
- [§3 Action Title Templates](#3-action-title-templates) — four sentence patterns with examples
- [§4 Body Text Rules](#4-body-text-rules) — benchmark language, bullet grammar, evidence style
- [§5 Composition Patterns](#5-composition-patterns) — 10 layouts with ratios
- [§6 Exhibit Conventions](#6-exhibit-conventions) — monochrome-plus-one-accent color system, annotation devices
- [§7 Navigation System](#7-navigation-system) — recurring agenda, section dividers
- [§8 Deck Modes](#8-deck-modes) — diagnostic vs publication vs legacy
- [§9 Anti-Patterns](#9-anti-patterns) — what breaks the illusion

Sourced from 3 Bain decks: Global PE Report 2023 (17pp, publication chart-run), Syracuse Innovation Diagnostic 2014 (38pp, diagnostic program book), UNC Cost Diagnostic 2009 (15pp, legacy option summary).

---

## §1 The Reader Contract

Every Bain deck implicitly promises five things. If any fail, the output stops reading as Bain regardless of typography.

1. **Fact base separated from interpretation.** The reader can always tell which content is observed data and which is Bain's perspective. In diagnostic decks this is literal — left column vs. right column. This is an epistemological commitment, not just a layout.
2. **Decision utility.** Every module answers a specific question the client's leadership needs to decide. If a slide can't pass the "so what should the CEO do differently on Monday morning?" test, it gets reworked or cut.
3. **Benchmark-relative judgment.** Metrics are positioned against peers, averages, or targets — never presented in isolation. "Trails peers by 12%" not just "scored 68."
4. **Visual restraint with deliberate emphasis.** The baseline is monochrome. Color draws the eye to exactly one thing per exhibit. The restraint is intentional — the container doesn't compete with the contents.
5. **Modular composability.** Slides (and slide groups) are designed to work as independent modules. A diagnostic section can be pulled from the master deck and handed to a different audience without losing coherence. This is why Bain page numbers are sometimes non-sequential in excerpted materials.

Document-control signals (when contextually appropriate):
- Scope frames: "THIS REPORT DOES / THIS REPORT DOES NOT" binary
- Disclaimer footers on institutional or pro bono work
- Source and Note lines on every analytic slide

---

## §2 Slide Grammar

Bain's slide grammar varies by mode (see §8), but the diagnostic program book is the primary Bain signature. The red rule header is the single most reproducible Bain convention.

### Typography

Bain's brand typeface is **Graphik** (Christian Schwartz, Commercial Type) — a paid neo-grotesque used on bain.com and internal brand materials. In practice, Bain slide decks embed system fonts (Arial, Verdana) because Graphik is not universally installed on client machines.

For this skill, use **Source Sans 3** consistently across all Bain-style slides. It is a professional humanist sans-serif with a large x-height, low stroke contrast, and generous weight range (200–900 variable) — a step up from Arial while remaining free and embeddable.

The theme sets `font: 'Source Sans 3'` with `fontFallback: 'Arial'`. Variable TTF files (weights 200–900, normal + italic) are vendored at `libs/source-sans-3/`.

### Header zone (red rule)

```
[Action title — bold, black, full sentence conclusion, 18–20pt]
──────────────────────────────────────────────────────────── (red rule, ~2–3pt, full content width)
```

- **Action title**: Full-sentence conclusion in bold black, 18–20pt. States the "so what" — not a topic label. Sentence case. Max 2 lines.
- **Red rule**: Bain red (`#CC0000`), ~2–3pt thick, spans the full content width (margin to margin). Sits immediately below the action title with ~8–10pt gap above, ~12–16pt below.
- **No section tag above the title** (contrast with McKinsey's two-tier header). Section identity is carried by agenda interstitials, not by per-slide tags.

Publication mode (Global PE) omits the red rule and uses a lighter, magazine-style header — see §8.

### Body zone

Two dominant patterns:

**Facts-vs-Perspectives frame** (diagnostic mode, ~50% of analytic slides):

```
+---------------------------+  +-------------------------------+
| KEY FACTS AND DATA        |  | PERSPECTIVES                  |
| (gray header band, CAPS)  |  | (gray header band, CAPS)      |
|                           |  |                               |
| 3–6 quantified bullets    |  | Action-oriented               |
| + optional mini-exhibit   |  | recommendation bullets        |
+---------------------------+  +-------------------------------+
```

- Left column ~57%, right column ~43%, gap ~14pt.
- Header bands: light warm gray fill (`#E8E5E2`), ALL CAPS bold label, ~9–10pt.
- Column bodies: white background.

**Single-exhibit full-width** (used in all modes):
- One dominant chart occupying ~65–75% of slide height.

### Interpretation zone

- **Callout band** (diagnostic): Full-width horizontal band at bottom of body area.
  - Red variant: Bain red fill, white bold text. For the primary takeaway.
  - Gray variant: light gray fill with 4pt red left border. For secondary implications or next steps.
- **Callout text** (publication): Sparse — the title carries most of the argument.

### Footer zone

```
Source: [citation]; [second source]                    [Bain & Company logo]    [page#]
Note: [methodological context]
```

- **Source/Note**: Left-aligned, ~8–9pt, medium gray. "Source:" in italic, citation in regular.
- **Bain logo**: Small wordmark, bottom-center or bottom-right. Grayscale in publication mode, red in diagnostic mode. ~60–80pt wide.
- **Page number**: Right-aligned, ~8–9pt, gray. Plain Arabic numeral.
- **No horizontal rule** above the footer — position and small font separate it from body content.
- Source attribution is never skipped on analytic slides.

---

## §3 Action Title Templates

Bain action titles are assertion-based — like McKinsey, they state a conclusion. But Bain titles are typically shorter and more direct, often leading with the metric.

| Pattern | Template | Example |
|---|---|---|
| **Metric + direction** | [Metric] [verb] [magnitude] in [period] | "Deal value fell 35% in 2022 as the market recalibrated" |
| **Peer comparison** | [Subject] trails [comparator] by [gap] in [dimension] | "Syracuse trails peer median by 23% in research expenditure per faculty member" |
| **Scope assertion** | [Programs/policies] that [condition] are the ones that [outcome] | "Programs that combine benchmark evidence with disciplined field validation are the ones that move from pilots to operational impact" |
| **Operational directive** | [Action verb] [specific process] to [measurable outcome] | "Restructure procurement organization to capture $40–45M in annual savings" |

### Grammar rules

- Always a complete sentence with a verb.
- Numbers and comparators appear whenever data supports them.
- Shorter than McKinsey — typically 10–20 words. Bain trusts the exhibit to carry detail.
- No terminal period on single-line titles.
- Causality is direct ("fell 35%", "trails by 23%") rather than elaborated ("driven primarily by X, Y, and Z").

---

## §4 Body Text Rules

### Prose style

- **Benchmark-first.** Every claim positions the subject relative to a comparator — peers, averages, targets, or prior periods.
- **Observation → comparator → implication.** Bullet logic follows this three-beat rhythm. Example: "Research expenditure is $32M (observation) — bottom third among peers (comparator) — limiting competitiveness for federal grants (implication)."
- **Implementation verbs for recommendations.** Restructure, centralize, streamline, gate, instrument, outsource, align. Never abstract ("consider", "explore", "leverage").
- **Bold for emphasis.** Key terms and numbers are bolded inline. Italic is reserved for "Source:" and "Note:" labels.

### Evidence language

Every quantitative claim must be bounded:
- Peer set: "vs. peer median (n=12)" or "among AAU institutions"
- Time: "FY2023", "2019–2022", "as of Q3 2022"
- Units: "$B", "percentage points", "CAGR"
- Provenance: "Source: Preqin; Bain analysis" or "Source: university financial reports"

---

## §5 Composition Patterns

Ten compositions observed across the source decks. Ratios are approximate width splits.

| # | Composition | Split | Pattern | Use when |
|---|---|---|---|---|
| 1 | **Facts-vs-Perspectives frame** | 57/43 | `c04-facts-perspectives` | Diagnostic argument: data left, interpretation right |
| 2 | **Single chart story** | 100% | `p03-evidence` | One exhibit IS the argument |
| 3 | **Scope binary (Does / Does Not)** | 50/50 + band | `p06-fork` | Defining project boundaries |
| 4 | **Peer comparison grid** | 100% (table) | `p09-data-table` | Multi-metric benchmark with highlighted subject |
| 5 | **Option rollout table** | 100% (table) | `p09-data-table` | Structured options with value and timing |
| 6 | **Chart + sidebar callout** | 65/35 | `p03-evidence` or `c01-multi-evidence` | Chart with large KPI number sidebar |
| 7 | **Metric dashboard row** | equal cards | `p04-scorecard` | 2–4 large-format number callouts |
| 8 | **Methodology / process flow** | horizontal | `p07-machine` | Phase boxes with arrows |
| 9 | **Dual-panel chart** | 50/50 | custom (extend `c01-multi-evidence`) | Two charts reinforcing one claim |
| 10 | **Agenda checkpoint** | 100% | `p10-agenda` | Section transition with active item |

### When to use multi-panel

At L2, compositions 1 and 2 dominate (~80% of slides). At L3, compositions 4 and 5 add structured density. If a diagnostic deck has fewer than 40% facts-vs-perspectives slides, it is not reading as Bain.

---

## §6 Exhibit Conventions

### The monochrome-plus-one-accent color system

This is Bain's most distinctive visual trait. The baseline palette is monochrome (gray + white + black). Exactly one accent color carries all emphasis.

| Mode | Accent | Baseline | Chart palette |
|---|---|---|---|
| **Diagnostic** | Bain red (`#CC0000`) | Gray bars, gray text, white backgrounds | Primary bars in red, secondary in gray, tertiary in dark charcoal |
| **Publication** | Bain red (`#CC0000`) | Gray bars, gray text, white backgrounds | Same — but even more restrained. Entire pages may be gray-only with one red bar |
| **Legacy** | Institutional blue (`#4A7FB5`) | Same gray/white baseline | Blue replaces red as the structural color (client-branded) |

Key rule: **one red emphasis target per exhibit.** If a slide has two red elements competing for attention, one must be demoted to gray.

### Chart styling

- **Flat 2D always.** No 3D, no gradients, no drop shadows, no rounded corners on bars.
- **Horizontal gridlines only.** Extremely subtle (~0.5pt, `#E0E0E0`). No vertical gridlines.
- **No chart borders.** No bounding rectangle around the chart area.
- **Bar fills are solid** with no outlines. Segments distinguished by fill color alone.
- **Data labels above bars** (outside) for single bars; inside segments for stacked bars.
- **Legend above chart**, horizontal layout, small colored squares + labels.
- **Y-axis descriptor** placed at top of y-axis, not rotated ("$B" or "%").

### Annotation devices (Bain-specific)

| Device | What it looks like | When |
|---|---|---|
| **Large red KPI number** | 28–36pt bold, Bain red, with descriptor below in ~11pt gray | Sidebar callout or inline metric emphasis |
| **CAGR bracket** | Thin bracket spanning a bar range with percentage label above | Time-series showing compound growth |
| **Reference line** | Horizontal dashed, medium gray, labeled at right end | Long-term averages or thresholds |
| **Directional arrow** | Small red arrow (up/down) next to a number | Year-over-year direction |
| **Highlighted bar** | Single bar in red, all others gray | Drawing focus to one data point in a series |
| **Red-border flag box** | Gray fill, 4pt red left border, bold text inside | Inline callout within the body zone |

---

## §7 Navigation System

### Recurring agenda

Bain's primary navigation device is the **repeating agenda interstitial** — the same agenda slide reappears before each section with the active item highlighted.

**Agenda slide structure:**
- Title "Agenda" with red rule below (diagnostic) or dark charcoal background (publication).
- Vertical stacked list of 4–6 section items.
- Roman numerals (I, II, III, IV, V) prefix each item.
- **Active item**: solid red fill (`#CC0000`) with white bold text.
- **Inactive items**: plain black or dark gray text, regular weight.
- Each item occupies its own row, ~32–40pt tall.
- No connecting lines, no chevrons, no arrows between items.

### Section dividers (diagnostic)

- Dark charcoal or near-black background (`#2B2B2B`).
- White centered title text, 24–28pt bold.
- Optional thin red horizontal rule centered below the title (~40–50% of slide width).
- No body content, no footer.
- Minimal — the divider is a visual rest, not a content carrier.

### No breadcrumbs

Bain does not use persistent section tabs, top-bar navigation, or breadcrumb trails on content slides. Section context comes from the repeating agenda interstitial and the distinctive facts-vs-perspectives frame (which itself signals "you are in the diagnostic body").

---

## §8 Deck Modes

Bain produces three distinct document types. Choose based on the deck's purpose and audience.

| Dimension | Diagnostic Program Book | Publication Chart-Run | Legacy Option Summary |
|---|---|---|---|
| **Canonical deck** | Syracuse 2014 | Global PE 2023 | UNC 2009 |
| **Header** | Bold black title + red rule | Short headline, no rule | Blue filled band, white text |
| **Signature layout** | Facts-vs-Perspectives (60/40) | Single chart per slide | Option rollout table (repeated) |
| **Color system** | Red accent on gray/white | Red accent on gray/white (more restrained) | Blue structural, yellow emphasis |
| **Body density** | High — two columns, 3–6 bullets per column | Low — chart dominates, minimal prose | Medium — table rows with bullets |
| **Navigation** | Recurring agenda with red active item | Photo-style dividers or title sequence | Sequence markers "(1 of 4)" in header |
| **Footer** | Source + Note + Bain logo + page# | Source + Bain logo + page# (minimal) | Source + legal disclaimer + page# |
| **Branding** | Bain red rule and identity visible | Subtle — small Bain wordmark only | Client-branded (no Bain identity) |
| **Density level** | L2–L3 | L1–L2 | L2 |
| **Font** | Source Sans 3 (fallback: Arial) | Source Sans 3 (fallback: Arial / Helvetica Neue) | Verdana |

### Mode-lock rule

Do not mix register cues on a single slide. For example:
- No "PERSPECTIVES" box on a publication chart slide.
- No photo-style section dividers in a diagnostic program book.
- Switch registers only at section boundaries.

---

## §9 Anti-Patterns

These break the Bain illusion immediately:

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| **Multiple red highlights per exhibit** | Violates the one-accent-target rule; reader can't find the focus | Demote all but one to gray |
| **Topic titles** ("Investment Overview") | Not a conclusion — Bain titles are assertions | Rewrite as verdict: "Deal value fell 35% in 2022" |
| **Benchmark claims without peer set** | Bain's credibility rests on transparent comparisons | Define n, peer set, period, and source |
| **Mixed registers on one slide** | Facts-vs-perspectives box inside a publication chart → visual collision | Pick one register and commit |
| **Colorful chart palettes** | Bain uses gray + one accent. Rainbow bars read as generic | Gray baseline, single red highlight |
| **Perspectives without fact base** | Recommendations must be earned by data in the left column | Pair every perspective with supporting evidence |
| **Rounded corners, gradients, shadows** | Bain's aesthetic is flat, crisp, and institutional | Square corners, solid fills, no effects |
| **Verbose titles** (>25 words) | Bain titles are shorter than McKinsey — trust the exhibit | Compress to 10–20 words |
