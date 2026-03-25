# McKinsey Reference — Firm-Specific Conventions

> Loaded when the brief specifies McKinsey philosophy or consulting style at L2+.
> Use alongside [craft.md](craft.md) — this file covers only what is **McKinsey-specific**.
> General density rules, exhibit threading, annotation budgets, and callout quality live in craft.md.

**Design disposition:** Conclusion-driven. Every slide exists to prove one governing thought stated in the title — read just the titles and you get the full argument (the "helicopter test"). Charts are clean and self-evident; the data speaks for itself without annotation layers. Formatting consistency is itself a trust signal: the institutional look is so rigid that even a draft reads as authoritative. McKinsey's ego is in the pixels — "we don't need to show our work because our conclusions are that good."

## Contents

- [§1 The Reader Contract](#1-the-reader-contract) — five promises every McKinsey deck makes
- [§2 Slide Grammar](#2-slide-grammar) — two-tier header, body zones, footer system
- [§3 Action Title Templates](#3-action-title-templates) — five sentence patterns with examples
- [§4 Body Text Rules](#4-body-text-rules) — prose style, bullet grammar, evidence language
- [§5 Composition Patterns](#5-composition-patterns) — 10 multi-panel layouts with ratios
- [§6 Exhibit Conventions](#6-exhibit-conventions) — waterfall grammar, color semantics, annotation devices
- [§7 Navigation System](#7-navigation-system) — section numbering, contents/agenda formats, dividers
- [§8 Deck Modes](#8-deck-modes) — working vs polished vs presentation
- [§9 Anti-Patterns](#9-anti-patterns) — what breaks the illusion

Sourced from 6 McKinsey decks: USPS Envisioning Future (2010), USPS Future Business Model (2010), AI & Automation (2017), UNCTAD Investment Policy (2018), NCDOT Review (2019), Transportation DC (2020).

---

## §1 The Reader Contract

Every McKinsey deck implicitly promises five things. If any fail, the output stops reading as McKinsey regardless of typography.

1. **Verdict-first.** The slide title states the conclusion. The body proves it. BCG layers interpretation onto charts; Bain separates facts from perspectives in columns. McKinsey puts the conclusion in the title and lets the evidence below be clean and self-evident.
2. **Evidence over ornament.** Visuals exist to support a claim, not to decorate. Charts are minimal — no annotation callout boxes cluttering the data. The data speaks for itself.
3. **Executive scan works.** Read only titles (+ section dividers) and you still get the whole argument — the "helicopter test." This is the defining quality test: if the title sequence doesn't tell a complete story, the deck is broken.
4. **Self-contained slides.** Units, time windows, definitions, and sources appear on-slide when they matter. No chasing appendices.
5. **Institutional formatting consistency.** Every slide looks like it came from the same machine regardless of author, time zone, or deadline pressure. This rigidity is itself a trust signal — "we don't need to show our work because our quality filter is that good."

Document-control signals shape the vibe and should appear when contextually appropriate:

- Confidentiality: "CONFIDENTIAL AND PROPRIETARY" or "DRAFT AND CONFIDENTIAL"
- Status tags: "Preliminary", "Non-exhaustive", "Pre-decisional"
- Timestamps: "Last modified [date]" on working materials

---

## §2 Slide Grammar

Every analytic slide follows the same four-zone structure. The header system — specifically the two-tier title — is the single most reproducible McKinsey convention.

### Header zone (two-tier)

```
[Section tag — small, muted or colored]     [Status tag — right-aligned, optional]
[Action title — large, bold, dark, full sentence conclusion]
[Subtitle — metric, unit, time window, or exhibit label — optional]
```

- **Section tag** (line 1): Section name, optionally with a hierarchical number (`2a`, `2b`). Font: ~10–12pt, muted gray or accent color. Purpose: orientation — tells the reader where they are in the story.
- **Status tag** (top-right, optional): "Preliminary, proprietary, pre-decisional" or "Non-exhaustive". Font: ~8–9pt italic.
- **Action title** (line 2): Full-sentence conclusion. Font: Arial Bold, ~16–20pt. This IS the argument. If the title is a topic label ("Overview"), the slide fails.
- **Subtitle** (line 3, optional): Sets the exhibit context — what is measured, over what period, in what unit. Font: ~10–12pt, muted. Example: "Net income bridge, FY2006–FY2009, $ billions"

### Body zone

The exhibit area occupies ~60–70% of the slide height. Composition varies by data shape — see §5 for the 10 observed patterns.

### Interpretation zone

A **boxed callout** carrying the inference. Appears as a horizontal band below the exhibit, often with a light accent fill or left-border stripe. Contains:
- Bolded keywords and key numbers
- 1–3 short bullets that explain what the evidence *means* (not what it shows)
- On working decks: explicit forward-references ("Deep dive to follow", "See appendix slide 14")

### Footer zone

```
[Footnotes — numbered, left-aligned]
SOURCE: [Organization]; [Dataset/Report]              McKinsey & Company | [page#]
```

- Footnotes: numbered superscripts in text, matching numbers in footer. Up to 4 per slide.
- Source format: caps "SOURCE:" followed by organization and dataset. Always present on analytic exhibits.
- Firm mark: `McKinsey & Company | [page#]` — ampersand (not "and"), pipe separator.
- Layout: source far-left, firm mark far-right.
- Font: Arial, ~8pt, gray.

---

## §3 Action Title Templates

McKinsey action titles follow five recurring sentence patterns. Each is a full sentence — comparative, quantified, and causal.

| Pattern | Template | Example |
|---|---|---|
| **Trend + implication** | After [period], [metric] has [direction] relative to [baseline], implying [impact] | "After a decade of flat volumes, first-class mail declined 13% in FY2009, putting $3.8B of contribution margin at risk" |
| **Contrast** | [X] is [direction]… but [Y] is [direction], creating [tension] | "Package volume is growing 8% annually, but it covers only 12% of the revenue gap from declining mail" |
| **Decomposition** | [Outcome] is driven primarily by [A], [B], and [C] | "The $8.5B net loss is driven primarily by volume decline ($5.2B), the RHBF mandate ($3.4B), and partially offset by cost savings ($2.1B)" |
| **Constraint** | [Goal] requires [capability], but [constraint] limits current performance | "Achieving cost parity requires automated sortation, but 40% of facilities predate 1970 and lack floor-load capacity" |
| **Options** | To close the remaining gap, [actor] must pursue [categories] | "To close the remaining $4B gap, USPS must pursue revenue growth, network optimization, and legislative reform simultaneously" |

### Grammar rules

- Always includes a verb (is/are/has/declines/increases/requires/represents).
- Numbers appear when quantitative data is available — percentages, multiples, dollar amounts, time horizons.
- Causality is explicit (because/driven by/therefore) or implied through decomposition.
- Max 2 lines on slide (~25 words). If longer, the title is trying to do too much — split the slide.

---

## §4 Body Text Rules

### Prose style

- **Low adjective density.** Nouns, verbs, and numbers carry the weight. No hype.
- **Short, information-bearing bullets.** Each bullet adds a NEW fact or logic step. Never restate the title.
- **Terminology is defined once, then reused.** Abbreviations and key constructs (indices, segments, categories) become stable objects across the deck.
- **Hedging is rare and explicit.** When uncertainty appears: "arguably", "as of [date]", "non-exhaustive". Never vague hedging ("might", "could possibly").

### Evidence language (audit-ready)

Every quantitative claim must be bounded:
- Time: "FY2009", "2009–2019", "as of October 2020"
- Units: "$ billions", "Gbps", "% of GDP", "CAGR"
- Provenance: "Source: [organization / dataset]"
- Rounding: "Note: numbers may not sum due to rounding"

---

## §5 Composition Patterns

Ten multi-panel compositions observed across the source decks. Ratios are approximate width splits.

| # | Composition | Split | Pattern | Use when |
|---|---|---|---|---|
| 1 | **Chart + Right Sidebar** | 65/35 | `p03-evidence` or `c01-multi-evidence` (L3) | Chart carries the data; sidebar carries interpretation bullets |
| 2 | **Waterfall + Below-Chart Callouts** | 70/30 | `c02-waterfall` | Variance decomposition with step-by-step explanation |
| 3 | **Dual Exhibit (stacked)** | 50/50 vertical | custom (extend `c04-facts-perspectives`) | Two related series that share an x-axis or theme |
| 4 | **Chart + Chart Side-by-Side** | 55/45 | custom (extend `c01-multi-evidence`) | Two different chart types reinforcing one argument |
| 5 | **Scatter/Bubble + Bullet Grid** | 50/50 | `p15-bubble-matrix` | Landscape positioning with supporting facts |
| 6 | **Full-Width Data Table** | 100% | `p09-data-table` | Structured comparison where every row matters |
| 7 | **Table + Stacked H-Bar Hybrid** | text + bar cols | custom (`p09` + `p14`) | Numeric data with visual breakdown |
| 8 | **Small-Multiple Maps** | equal panels | custom | Geographic comparison across variables or time |
| 9 | **Small-Multiple Charts + Bullets** | 4 charts + sidebar | custom (extend `c01-multi-evidence`) | Multi-dimensional breakdown (peak L3 density) |
| 10 | **Process Flow + Sidebar** | 60/40 | `p07-machine` | Mechanism/workflow with interpretation |

### When to use multi-panel

At L2, compositions 1 and 6 are most common. At L3, all 10 are available — slides should average 2–3 panels. If a slide has only one element and the deck is targeting L3, the slide is under-built.

---

## §6 Exhibit Conventions

### The waterfall is a first-class pattern

The waterfall chart appears on ~30% of analytic slides in the USPS deck. It is McKinsey's primary variance decomposition device — not just "a chart type."

Waterfall grammar:
- **Start bar**: baseline value + year label (e.g., "FY2006: $0.9B")
- **Step bars**: each labeled with delta value; negative bars in a contrasting color
- **End bar**: result value + year label (e.g., "FY2009: –$3.8B")
- **Below-chart callout boxes**: positioned explanation blocks connected to specific steps — each box explains WHY that step happened
- **Variance share row** (optional): percentage row beneath showing each step's share of total absolute variance
- **Right sidebar**: 2–3 interpretation bullets
- **"Deep dive to follow"** tag on exhibits that preview deeper analysis in later sections

### Color semantics

McKinsey assigns ROLES to colors — not just "one accent." The specific palette varies by deck, but the role structure is constant:

| Role | Purpose | Typical rendering |
|---|---|---|
| **Primary data** | Default bar/line/series fill | Navy or dark blue-gray |
| **Positive/above target** | Good outcome, growth, on-track | Green or teal |
| **Negative/below target** | Bad outcome, decline, off-track | Red, coral, or orange |
| **Focus/highlight** | The row, bar, or region the title refers to | Accent color at 15–30% opacity (background fill) or full accent (border/outline) |
| **Navigation** | Section dividers, header bands | Bright aqua or accent color (full saturation) |
| **Muted/supporting** | Context data, non-focus elements | Gray (#666–#999) |

Key rule: the reader should be able to decode color meaning without a legend for the primary exhibit. Green = good, red = bad, highlighted = focus.

### Annotation devices (McKinsey-specific)

Beyond craft.md's general annotation types, McKinsey decks use these signature devices:

| Device | What it looks like | Observed in |
|---|---|---|
| **Positioned callout box** | Bordered rectangle with 1–2 line explanation, connector arrow to chart region | USPS p3: "No rate increase 2003–2006" box pointing to flat period |
| **CAGR diagonal** | Thin diagonal line across bar tops with slope label ("+25% p.a.") | NCDOT p9 |
| **Event marker** | Dashed vertical line spanning chart height with positioned label | Transportation DC p9: "Initial regional lockdown" |
| **Variance share row** | Percentage labels beneath waterfall bars, aligned to each step | NCDOT p8: "22%, 17%, 24%, 31%, 6%" |
| **Threshold band** | Horizontal dashed line with right-aligned label | NCDOT p6: "Maximum cash balance (FY19)" |

---

## §7 Navigation System

### Section numbering

McKinsey uses hierarchical section numbers as **traceability devices** — they let the audience cross-reference in discussion ("On slide 2b, you showed...").

| Convention | Example | When |
|---|---|---|
| **Numbered circles** | ①, ②, ③ | Main section headers (working decks) |
| **Number + letter suffix** | 2a, 2b, 4a | Sub-sections within a numbered section |
| **Simple page numbers** | 1, 2, 3 | Polished deliverables |

Numbers appear in the section tag (first line of the two-tier header), not in the action title.

### Contents/agenda formats

Three formats observed, correlated with deck mode:

**Format A — Polished deliverable** (USPS 2010):
- Left-aligned bullet list, "Contents" title
- Active section: light-blue background band
- Decorative left color stripe
- Statement-style items ("Recent context", "Base case", "Addressing the challenge")

**Format B — Working discussion** (NCDOT 2019):
- "Contents for discussion today" title
- Items phrased as QUESTIONS with key verb bolded
- Filled numbered circles (dark accent)
- Inquiry framing: "How do NCDOT's **spending patterns** compare to peers?"

**Format C — Modern presentation** (Transportation DC 2020):
- Full-bleed bright aqua (#00B0F0), white text
- Active section boxed or outlined
- Minimal text, large negative space
- Cinematic feel

### Section dividers

Full-bleed color or image. Minimal text — section name only. Resets attention between major arguments. In modern decks (2018+), dividers use the navigation accent color at full saturation.

---

## §8 Deck Modes

McKinsey produces three distinct document types. Each adjusts composition choices:

| Dimension | Working | Semi-polished | Polished |
|---|---|---|---|
| **Status tags** | "DRAFT AND CONFIDENTIAL" | "Preliminary, pre-decisional" | None |
| **Agenda framing** | Questions | Statements | Statements |
| **Background imagery** | Faded photos behind charts | None | Clean white or hero photos |
| **Process diagrams** | Yes (flowcharts, mechanisms) | Rare | No |
| **Forward references** | "Deep dive to follow" | Occasional | No |
| **Density** | Moderate (L2) | Very high (L3) | Moderate to high (L2–L3) |
| **Footnote volume** | 2–4 per slide | 3–6 per slide | 1–2 per slide |
| **Observed example** | NCDOT 2019 | Transportation DC 2020 | USPS Business Model 2010 |

Choose mode based on the audience relationship:
- **Working**: internal team or close client relationship; collaborative, questions welcome
- **Semi-polished**: stakeholder briefing; dense evidence, status-tagged, read-ahead distribution
- **Polished**: board or public; clean, high-signal, no working signals

---

## §9 Anti-Patterns

These break the McKinsey illusion immediately:

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| **Topic titles** ("Automation Overview") | Not a conclusion — it's a section label | Rewrite as verdict: "Automation could add $X to GDP by Y" |
| **Charts without bounds** | No unit, time window, base, or source → unverifiable | Add subtitle with metric + window; add source line |
| **Rainbow palettes** | Multiple saturated colors with no semantic meaning | One accent for focus, gray for everything else |
| **Bullets that restate the title** | Adds zero information; wastes reader's time | Each bullet must add a NEW fact, number, or logic step |
| **Unstructured density** | Too many elements, weak alignment, no hierarchy | Use a composition pattern from §5; respect the grid |
| **No "so what"** | Evidence without interpretation reads academic, not consultative | Add a callout band below the exhibit with the inference |
| **Meta-references** | "McKinsey-style analysis", "As shown below" | Describe the CONTENT, not the deck structure |
| **Orphan exhibits** | Data on slide with no connection to the title or callout | The title must reference what the exhibit proves |
