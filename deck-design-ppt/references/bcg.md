# BCG Reference — Firm-Specific Conventions

> Loaded when the brief specifies BCG philosophy or consulting style at L2+.
> Use alongside [craft.md](craft.md) — this file covers only what is **BCG-specific**.
> General density rules, exhibit threading, annotation budgets, and callout quality live in craft.md.

**Design disposition:** Process-transparent. BCG makes the analytical machinery visible — frameworks, matrices, annotated exhibits — so the reader can audit the reasoning, not just receive the conclusion. Charts carry interpretation layers: data + callout boxes + annotation arrows explaining what each data point means. Visually the "fullest" of the three firms because annotation sits on top of data. The intellectual rigor IS the aesthetic — "trust us because you can see exactly how we got here."

## Contents

- [§1 The Reader Contract](#1-the-reader-contract) — five promises every BCG deck makes
- [§2 Slide Grammar](#2-slide-grammar) — green rule header, panel mini-headers, footer system
- [§3 Action Title Templates](#3-action-title-templates) — four sentence patterns with examples
- [§4 Body Text Rules](#4-body-text-rules) — prose style, bullet grammar, evidence language
- [§5 Composition Patterns](#5-composition-patterns) — 10 layouts with ratios
- [§6 Exhibit Conventions](#6-exhibit-conventions) — green-anchored color system, panel framing, annotation devices
- [§7 Navigation System](#7-navigation-system) — repeating agenda as divider, section numbering
- [§8 Deck Modes](#8-deck-modes) — classic program book vs modern impact report vs working binder
- [§9 Anti-Patterns](#9-anti-patterns) — what breaks the illusion

Sourced from 4 BCG decks: NYCHA Key Findings 2015 (112pp, classic program book), OER Ecosystem (23pp, classic research deck), Ford Economic Impact (29pp, modern impact report), Dallas Loose Dogs 2016 (406pp, working binder).

---

## §1 The Reader Contract

Every BCG deck implicitly promises five things. If any fail, the output stops reading as BCG regardless of typography.

1. **A structured model, not just findings.** BCG builds frameworks — maturity stages, ecosystem maps, evaluation matrices. Every exhibit fits into an analytic structure that the reader can trace. The framework is not decoration; it's the primary intellectual product.
2. **Interpretation layered onto data.** Charts carry annotation callout boxes explaining what each data point means. McKinsey lets data speak for itself; Bain separates facts from perspectives in columns; BCG puts the interpretation directly on top of the exhibit. This is why BCG slides are visually the "fullest" — annotation layer + data layer.
3. **Evidence with traceable provenance.** Source and Note lines are explicit and frequent. Every quantitative claim cites an organization, dataset, or methodology.
4. **Benchmark-relative interpretation.** Metrics are scored against quartile ranges, peer groups, or prior states. Standalone numbers without context are unacceptable.
5. **Panel-level clarity on dense slides.** When a slide has multiple exhibits, each panel has its own mini-header and local framing. The reader never has to guess what a chart is showing.

Document-control signals (when contextually appropriate):
- Status banners: "PRELIMINARY", "DRAFT FOR DISCUSSION", "WORKING MATERIALS"
- Confidentiality: "Confidential" or copyright lines in footer
- Sequence markers: "(I/IV)", "3.3.2" — enabling fast facilitator referencing

---

## §2 Slide Grammar

BCG's slide grammar is defined by the green rule header and the panel mini-header system. The green rule is the single most recognizable BCG visual signature.

### Header zone (green rule)

```
[Section label — small, dark green, bold, left-aligned]     [Status tag — right-aligned, optional]
[Action title — large, bold, BLACK, full-sentence conclusion]
──────────────────────────────────────────────────────────── (green rule, ~2pt, full content width)
```

- **Section label** (line 1): Section name with optional Roman numeral or hierarchical number (e.g., "I. Current State", "II. Quality and Efficacy", "3.3.2"). Font: ~9–11pt, BCG dark green (`#006A4E` to `#2D6D3F`), bold. ALL CAPS or title case.
- **Action title** (line 2): Full-sentence conclusion. Font: Arial Bold, ~16–20pt, **black** (not green — the title is always black, contrasting with the green label above). Max 2 lines.
- **Green rule**: BCG green (`#5CA34A` to `#6AB648`), ~2pt thick, full content width. Sits immediately below the action title with ~4–6pt gap above, ~8–12pt below. This rule is the definitive BCG header boundary marker.
- **Status tag** (top-right, optional): "Preliminary", "Exhibit 3", "Non-exhaustive". ~8–9pt, gray or green.

Note the structural difference from McKinsey: BCG uses section labels ABOVE the action title (green label → black title → green rule), while McKinsey uses a section tag → action title → subtitle structure. The BCG green rule sits BELOW the entire header block.

### Body zone

The body is always left-aligned with generous left/right margins (~36pt each side = ~5% of 720pt width). Content varies by composition pattern (§5).

### Panel mini-header system (BCG signature)

BCG's core mechanism for keeping dense multi-panel slides scannable. Each panel within the body zone gets:

```
[Panel title — bold, ~11–13pt, dark green or black]
[Optional local green underline — thinner than the header rule]
[Optional unit/base line — ~9pt, gray]
```

This local framing makes it possible to have 2–3 exhibits on one slide without visual collapse. If a panel lacks its mini-header, the slide feels unfinished.

### Footer zone

```
Source: [citation]; Note: [context]                    THE BOSTON CONSULTING GROUP     [page#]
[Optional: copyright line, very small]
```

- **Source/Note**: Left-aligned, ~7–8pt, medium gray, often italic. "Source:" followed by citation. "Note:" for methodology or abbreviation definitions. Multiple sources separated by semicolons.
- **Firm mark**: "THE BOSTON CONSULTING GROUP" centered or center-right. In program books, this is rendered as the full text; in modern reports, it may be the BCG logo mark.
- **Page number**: Right-aligned, ~8–9pt, gray. Arabic numeral, no prefix.
- **Copyright**: Optional, very small (~6–7pt), light gray. Typically on cover, dividers, and select content pages.
- **No horizontal rule** above the footer — the footer is distinguished by position and small font alone.

---

## §3 Action Title Templates

BCG action titles use two headline registers, depending on deck mode.

### Insight sentence register (research decks, impact reports)

| Pattern | Template | Example |
|---|---|---|
| **Finding + comparator** | [Subject] [verb] [magnitude] relative to [baseline] | "OER adoption lags commercial textbook markets by 5–7 years in most disciplines" |
| **Finding + consequence** | [Observation], which [implication] | "Sensor dropout degrades detection by 40%, which forces manual review of high-priority tracks" |

### Sequenced section register (program books, working decks)

| Pattern | Template | Example |
|---|---|---|
| **Location + message** | [Section context]: [core finding] | "Executive summary (I/IV): NYCHA's physical infrastructure requires $17B in capital investment over 5 years" |
| **Evaluation verdict** | [Subject] is [rating] on [criteria] but [qualification] | "Cross-attention fusion is the strongest end-state but requires phased adoption to manage latency risk" |

### Grammar rules

- Always includes a verb.
- Numbers appear when quantitative data is available — percentages, dollar amounts, time horizons, multiplicative phrasing (~, ranges).
- Max 2 lines on slide. If longer, split the slide.
- BCG titles include comparators or consequences more often than McKinsey titles, which tend toward decomposition.
- No terminal period on single-line titles.

---

## §4 Body Text Rules

### Prose style

- **Lead-in concept, then evidence payload.** Each bullet opens with the what, then delivers the proof.
- **Recommendation bullets use implementation verbs.** Shift, centralize, streamline, redesign, outsource, align, instrument. Never "consider" or "explore."
- **Explicit bases on survey and operational bullets.** Always include "Q:", "n=", period definitions, or population scope.
- **Bold for structural emphasis.** Key terms and metrics bolded inline. Italic is rare — reserved for source labels and foreign terms.
- **ALL CAPS for structural labels only.** Panel headers like "KEY FINDINGS", "RECOMMENDATIONS", "EXHIBIT 3" may use ALL CAPS. Never in body text.

### Evidence language

Every quantitative claim must be bounded:
- Scope: "n=200 districts" or "across 5 metropolitan areas"
- Time: "FY2014", "2010–2015 average", "as of September 2015"
- Units: "$ millions", "per FTE", "percentage points"
- Provenance: "Source: BCG analysis" or "Source: Expert interviews; [Organization] data"

---

## §5 Composition Patterns

Ten compositions observed across the source decks. Ratios are approximate width splits.

| # | Composition | Split | Pattern | Use when |
|---|---|---|---|---|
| 1 | **Three-panel comparison** | 33/33/33 | custom (extend `c01-multi-evidence`) | Comparing three scenarios, dimensions, or time periods |
| 2 | **Two-panel compare (chart + interpretation)** | 50/50 | `c01-multi-evidence` | Chart left + bullet interpretation right |
| 3 | **Table + benchmark bar block** | 55/45 | custom (`p09` + `p14`) | Structured data with quartile-range visualization |
| 4 | **Full-width table with grouped bands** | 100% | `p09-data-table` | Large data table where every row matters |
| 5 | **Primary exhibit + sidebar callout** | 70/30 | `p03-evidence` | Main chart with pull-quote or insight box |
| 6 | **Maturity-stage map** | 100% | custom | Framework with numbered rows and positioned callout boxes |
| 7 | **Scorecard / evaluation matrix** | 100% | `c03-eval-grid` | RAG-coded grid — the color pattern IS the visualization |
| 8 | **Big-number equation + side cards** | 70/30 | `p04-scorecard` | Hero statistic with supporting context |
| 9 | **Photo + text split** | 50/50 | `p11-product-showcase` (adapted) | Qualitative narrative with full-panel photography |
| 10 | **Multi-stat grid** | equal cards (3–6) | `p04-scorecard` | 3–6 metric cards in a whitespace-delimited grid |

### When to use multi-panel

At L2, compositions 2 and 4 dominate. At L3, composition 1 (three-panel) and 7 (scorecard) provide BCG-characteristic density. If a BCG deck lacks panel mini-headers on multi-panel slides, it fails the reader contract.

---

## §6 Exhibit Conventions

### The green-anchored color system

BCG's color identity starts with green but uses a broader palette than Bain's monochrome system. Colors are assigned by ROLE, not by series index.

| Role | Purpose | Typical rendering |
|---|---|---|
| **Structural / brand** | Headers, section labels, rules, key accent boxes | BCG dark green (`#006A4E` to `#2D6D3F`) |
| **Rule / separator** | Header rule, panel mini-rules | Bright green (`#5CA34A`) |
| **Primary data** | Default bar/line/series fill | Dark teal or dark green (`#00857C`, `#4C8C2B`) |
| **Secondary data** | Comparison or baseline series | Medium gray or light teal |
| **Positive / favorable** | Good outcome, on-track | Green (RAG context: `#4CAF50`) |
| **Caution / workable** | Mixed outcome, trade-offs | Amber / gold (`#F5A623`) |
| **Negative / constraint** | Bad outcome, off-track | Red / coral (`#D0021B`) |
| **Emphasis / focus** | The row, bar, or panel the title refers to | Accent color at 20–30% opacity (background fill) |
| **Muted / supporting** | Context data, non-focus elements | Gray (#808080 to #CCCCCC) |

Key rule: **one primary emphasis target per exhibit.** Additional colors are semantic (RAG, positive/negative), not decorative.

### Evaluation matrices (BCG signature exhibit)

The scorecard matrix is BCG's equivalent of McKinsey's waterfall. It appears on ~20% of analytic slides in program books.

- **Structure**: 2D grid with criteria rows and entity/option columns.
- **Cell fills**: RAG colors at ~20–30% opacity as background washes (pale green `#D4EDDA`, pale yellow `#FFF3CD`, pale red `#F8D7DA`).
- **Grid lines**: Thin (~0.5pt), medium gray. Clean, open feel.
- **Row headers**: Bold, ~11pt, left column ~25–30% width.
- **Column headers**: Bold, ~10–11pt, centered, dark green or black.
- **Summary column**: Far right, with overall rating per row.
- **No charts inside the matrix.** The color pattern across the grid IS the visualization.

### Chart styling

- **Flat 2D always.** No 3D, no gradients, no drop shadows.
- **Minimal chart chrome.** No chart borders, no background fills inside chart area. Gridlines only when essential (very light gray, dashed).
- **Bar fills**: solid, no outlines. Teal, green, gray rotation. Max 3–4 series colors.
- **Legend**: small, positioned top-right or bottom. Horizontal layout.
- **Annotation**: key inflection points get small callout labels (~8pt) connected by thin leader lines.

### Annotation devices (BCG-specific)

| Device | What it looks like | When |
|---|---|---|
| **Panel mini-header + local rule** | Bold title + thin green underline above each exhibit | Every multi-panel slide |
| **Pull-quote box** | Light gray fill, 4pt dark green left border, ~12–14pt italic text | Key quotes or implications within analytic slides |
| **Section-ID bubble** | "3.3.2" or "(I/IV)" in the header section label | Traceable discussion referencing |
| **Yellow caveat banner** | Yellow fill, methodology limits text | Working decks only |
| **Circled total** | Circled value in a full-width cost table | Total emphasis in financial summaries |
| **RAG indicator** | Filled circle (~8–10pt) in green/yellow/red | Status ratings in scorecards |

---

## §7 Navigation System

### Repeating agenda as section divider

BCG's most distinctive navigation pattern: the **same agenda slide is reused as both contents page and section divider**. It reappears at each section transition with the active section highlighted.

**Agenda slide structure:**
- Header: "Contents" or deck title, dark green bold, ~18–20pt. Green rule below.
- Numbered list of 4–6 sections.
- **Active section**: dark green text, bold. May have a left-aligned green bar indicator or dark green background band with white text.
- **Inactive sections**: medium gray text, regular weight.
- Section numbers: Roman numerals (I, II, III, IV), bold, dark green.
- Consistent footer.

This contrasts with McKinsey (distinct full-bleed dividers) and Bain (dark background dividers separate from agenda pages).

### Section numbering

BCG uses hierarchical numbering as a **traceability device** — enabling facilitators to say "go to section 3.3.2" without ambiguity.

| Convention | Example | When |
|---|---|---|
| **Roman numerals** | I, II, III, IV | Major sections |
| **Hierarchical numbers** | 3.3.2 | Sub-sections in large program books |
| **Sequence markers** | (I/IV), (II/IV) | Tracking position within a section |

Numbers appear in the section label (first line of the header), not in the action title.

### Section dividers (classic mode)

- Full-bleed dark green background (`#1F5C2E` to `#2D6D3F`).
- Large white text, 24–28pt bold, ALL CAPS or title case.
- Roman numeral preceding the section title.
- No body content, no green rule (the entire slide IS the section marker).
- BCG logo in white at bottom-right (optional).

### Section dividers (modern mode)

- Full-bleed photograph with dark teal semi-transparent overlay.
- Large section number in two-digit format (`01`, `02`), ~60–80pt, bold, white.
- Section title below, ~24–30pt, bold, white.
- No footer, no source line, no body text.

---

## §8 Deck Modes

BCG produces three distinct document types. Pick mode first — most quality failures come from mixing mode cues.

| Dimension | Classic Program Book | Modern Impact Report | Working Binder |
|---|---|---|---|
| **Canonical deck** | NYCHA, OER | Ford | Dallas |
| **Header** | Green section label → black title → green rule | Short headline, optional accent line, no persistent section tag | Same as Classic + yellow caveat bands + status stamps |
| **Footer** | Source + Note + "THE BOSTON CONSULTING GROUP" + page# | Source + BCG logo + page# (minimal) | Same as Classic + extra-long note chains + status stamps |
| **Signature layout** | Multi-panel with mini-headers; scorecard matrices | Hero stat + full-bleed photo; stat card grids | Classic slides mixed with memo pages; heavy caveats |
| **Color system** | Green structural + teal/gray data + RAG for scorecards | Muted, desaturated; photography-harmonized | Same as Classic |
| **Photography** | None — data only | Heavy — 40% of pages use full-bleed or panel photos | Minimal |
| **Density** | L2–L3 | L1–L2 | L2–L3 (on slide pages) |
| **Font** | Arial | Arial (or Henderson BCG Sans) | Arial |
| **Dividers** | Repeating agenda (green highlight) | Full-bleed photo + dark overlay + section number | Repeating agenda + status overlays |

### Mode-lock rule

- A slide can use only one family at a time.
- If the deck switches family, switch at section boundaries only.
- Do not apply Classic panel mini-headers inside Modern photo-overlay slides.
- Do not apply Modern hero-stat layouts in a Classic program book.

### Working binder filtering

When generating content inspired by working binders (like Dallas), only learn style from **slide pages**, not prose/memo pages. A page is a slide reference when at least two of these are true:
1. Header has BCG green title plus top rule or a slide-native title block.
2. Page has chart/table/framework panels with slide-like spacing.
3. Footer includes Source/Note and BCG copyright/page treatment.

---

## §9 Anti-Patterns

These break the BCG illusion immediately:

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| **Missing panel mini-headers** | Dense slide without local framing → unreadable | Add bold title + local rule above each exhibit |
| **Topic titles** ("Quality Assessment") | Not a conclusion — BCG titles state a finding | Rewrite as insight: "OER quality lags commercial content by 5–7 years" |
| **Multiple competing emphasis targets** | More than one bright-colored element per exhibit → visual noise | One highlight per exhibit; demote others to gray |
| **Comparative claims without bases** | No n, peer set, period, or source → unverifiable | Define scope and provenance explicitly |
| **Mixed mode cues** | Hero-stat card on a Classic program book slide → visual confusion | Pick one mode and commit for the entire section |
| **Dense slide without panel boundaries** | Bullets, charts, and tables colliding without structure | Use a composition from §5; obey panel framing |
| **Decorative icons or clip art** | BCG uses data visualizations and framework diagrams, not clip art | Replace with structured exhibits or remove |
| **Gradients or rounded corners on charts** | BCG is flat and institutional (rounded corners OK on framework diagram boxes) | Sharp corners, solid fills, no effects |
| **Learning style from prose pages** | Working binders mix slide pages with memo pages — memo typography is wrong for slides | Apply the filtering rule from §8 |
