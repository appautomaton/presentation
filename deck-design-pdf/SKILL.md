---
name: deck-design-pdf
description: >
  Create presentation decks as high-fidelity PDF files using web technology
  (HTML, CSS, Tailwind, Font Awesome). Use when the user wants a polished,
  pixel-perfect deck with responsive layouts, rich typography, icons, and
  modern design. For editable PPTX output, use deck-design-ppt instead.
---

# Deck Design PDF — Operational Playbook

## What This Skill Does

- **Input:** a deck brief + any structured data the user provides.
- **Output:** a **PDF file** — pixel-perfect slides rendered from HTML/CSS via Playwright. Not editable in PowerPoint. This is the high-fidelity, print-ready format.

### When to use this vs deck-design-ppt

| Need | Skill |
|---|---|
| Editable slides (PowerPoint/Keynote/Slides) | `deck-design-ppt` |
| Pixel-perfect PDF — web typography, icons, gradients, CSS layouts | `deck-design-pdf` (this) |

### What the web stack unlocks (beyond pptx)

- CSS Grid and Flexbox — responsive layouts instead of coordinate math
- Google Fonts with optical sizing and variable weights
- Font Awesome 6 icons inline with text
- Gradient backgrounds, box shadows, rounded corners, opacity
- ECharts 5 (SVG renderer) — 21 chart types: bar, line, pie, scatter, waterfall, gauge, sankey, treemap, radar, funnel, heatmap, and more
- Tailwind utility classes — rapid, consistent styling

## Phase 1 — Understand

### 1. Extract the brief

| Signal | Examples | Defaults if absent |
|---|---|---|
| **Objective** | "pitch to Series A investors", "board strategy update" | General presentation |
| **Audience** | "DoD program managers", "VC partners", "internal team" | General professional |
| **Brand identity** | Logo colors, company name, client palette | Palette defaults |
| **Tone / firm style** | "McKinsey-style", "clean and modern", "urgent/high-stakes" | Infer from audience + objective |
| **Density** | "dense and evidence-heavy", "keep it simple", specific L1/L2/L3 | Infer from audience + objective |
| **Data** | Tables, metrics, timelines, comparisons, evaluations | Build from research or request more |

Extract what's there, infer what you can, use defaults for the rest. Do not ask the user to fill out a checklist.

### 2. Pick style

| If the deck is… | Palette | Surface | Font |
|---|---|---|---|
| Consulting / board / engagement deliverable | `consulting-mckinsey` | Light | Inter |
| Framework evaluation, process-transparent | `consulting-bcg` | Light | DM Sans |
| Diagnostic, decision support, facts-vs-perspectives | `consulting-bain` | Light | Source Sans 3 |
| Startup pitch / product narrative / growth story | `founder` | Light | Plus Jakarta Sans |
| Crisis / urgency / downturn memo / high-stakes | `sequoia` | Dark | Georgia + Inter |

### 3. Pick density

| Context | Level | What changes |
|---|---|---|
| Startup pitch, roadshow, board update | **L1 Narrative** | 1 message per slide. Generous whitespace. Large text. |
| Corporate strategy, business review | **L2 Structured** | Multi-panel layouts. Evidence density moderate. |
| MBB engagement, due diligence, deep analysis | **L3 Dense** | Multi-evidence composites. Chained arguments. |

**Show deck vs. working deck** — use the `tier` option to shift all text baselines:

| Purpose | Density | `tier` | Text floor (in PDF pt) | When |
|---|---|---|---|---|
| **Show deck** — the client sees this | L1–L2 | `'presentation'` | Body ≥15pt, axis ≥14pt. Room-safe. | Board meetings, steering committees, final recommendations |
| **Working deck** — the team uses this | L2–L3 | `'document'` (default) | Body ≥12pt, axis ≥11pt. Dense but legible. | Working sessions, due diligence backup, internal analysis |

Infer show vs. working from the audience and objective. Don't ask the user — "board update" → `presentation`, "due diligence data room" → `document`. The tier shifts ALL text tokens automatically — you don't adjust individual font sizes.

L2+ consulting decks: apply the firm-specific conventions from [Firm Style](#firm-style) below and [firm-dna.md](firm-dna.md). For full density adaptation rules, see [density-adaptation.md](density-adaptation.md).

### 4. Route each slide

For each slide, determine:
1. **Layout** — from the [Composition Routing](#composition-routing) table
2. **Exhibit type** — from [chart-taxonomy.md](chart-taxonomy.md), using the decision tree: what does this slide need to prove? → "How big?" / "Why?" / "What to do?" → specific exhibit
3. **Firm visual treatment** — the taxonomy's Firm Visual DNA section specifies what each firm tolerates: McKinsey minimal annotation, BCG liberal annotation, Bain one-red-element discipline
4. **Data needed** — determined by the exhibit type and the action title's claim

## Phase 1.5 — Ghost Deck

Before writing any HTML, build the **ghost deck** — the narrative skeleton that precedes all data and visualization. This is where strategic value gets created. Charts and code are execution. The ghost deck is the thinking.

**Routing:**
- **Consulting engagement** (strategy, cost, M&A, pricing, digital, org, commercial) → full ghost deck pipeline below. Load the matching skeleton from `skeletons/`.
- **Non-consulting deck** (startup pitch, board update, investor roadshow, product launch) → skip to Phase 2. Use [chart-taxonomy.md](chart-taxonomy.md) § Deck Archetypes for exhibit mix guidance. Write action titles and apply the helicopter test, but don't force the 8-archetype classification or skeleton structure.

The ghost deck methodology (governing thought, pillars, transitions, rising-stakes) is always valuable thinking. For non-consulting decks, apply the principles without requiring a skeleton match.

**Reference docs** (all self-contained inside this skill):

| Doc | When to load | Purpose |
|---|---|---|
| [ghost-deck.md](ghost-deck.md) | Always | 5-layer model, governing thought template, quality gates |
| [engagement-archetypes.md](engagement-archetypes.md) | Archetype selection + transition design | 8 archetypes, 5 transition types, rising-stakes progression |
| `skeletons/*.md` | After archetype is classified | Governing thought template, pillar architecture, slide-by-slide index, kill conditions, quality gates |
| [firm-dna.md](firm-dna.md) | Firm overlay (McKinsey/BCG/Bain style) | Epistemology, deck structure, communication signatures |
| [evidence-recipes.md](evidence-recipes.md) | Exhibit assignment (Layer 5) | 10 data-shape recipes, layering rules, engagement × recipe mapping |
| [density-adaptation.md](density-adaptation.md) | Density selection + L1↔L2 adaptation | Compression/expansion rules, slide counts, tier mapping |
| [chart-taxonomy.md](chart-taxonomy.md) | Exhibit type selection | Decision tree, firm visual DNA, annotation grammar |

**When receiving a consultant artifact:**

If a storyboard from the consultant skill is provided (governing thought, pillars, action titles, content descriptions, structured data), this skill inherits the argument architecture and focuses on production:

1. **Validate the argument** — run the helicopter test on the provided action titles. If titles read as topic labels rather than conclusions, strengthen them.
2. **Classify the archetype** — load the matching skeleton from `skeletons/` to verify pillar coverage and identify missing analytical slides.
3. **Run exhibit selection** — for each slide, use the content description + [chart-taxonomy.md](chart-taxonomy.md) decision tree to select exhibit types. The consultant describes WHAT each slide proves; this skill decides HOW to visualize it.
4. **Complete the production outline** — add Layout, Exhibit, and Evidence layers to each slide entry per the [Outline format](#outline-format) Path A spec. Then proceed to Phase 2 (Build).

This skill may strengthen the consultant's artifact: tightening action titles, adding transition slides, adjusting slide count for density, or restructuring for visual rhythm. The consultant's governing thought and pillar architecture are authoritative; exhibit selection and layout composition belong to this skill.

**Build sequence** (when constructing the ghost deck independently):

1. **Governing thought** — one sentence stating the deck's answer (see [ghost-deck.md](ghost-deck.md) Layer 1). If you can't write this sentence, the analysis isn't done.
2. **Deck archetype** — classify using [engagement-archetypes.md](engagement-archetypes.md) selection logic. Then **load the skeleton** from `skeletons/` for that archetype — it provides the governing thought template, pillar architecture, slide-by-slide index with action title templates, kill conditions, and quality gates.
3. **Pillar architecture** — use the skeleton's pillar table as starting point. Customize pillars to the specific brief. Work backward from the governing thought: "What must be true?" (Layer 2).
4. **Action titles** — write a full-sentence title for every slide BEFORE selecting any charts. Each title is a claim that advances the argument. "Revenue grew 12% driven by pricing power in mid-tier" — not "Revenue Overview."
5. **Helicopter test** — read all action titles in sequence. Do they tell a complete, persuasive story? If not, fix the titles. Don't touch charts until this passes.
6. **Transition architecture** — select transition types from [engagement-archetypes.md](engagement-archetypes.md) for each pillar boundary. Verify rising-stakes progression: Recognition → Clarity → Conviction → Urgency.
7. **Exhibit assignment** — select exhibit types using [chart-taxonomy.md](chart-taxonomy.md)'s decision tree + [evidence-recipes.md](evidence-recipes.md) for data-shape composition. Each exhibit must be SUFFICIENT proof of its title's claim and MINIMAL — no extra elements.
8. **Firm overlay** — if McKinsey/BCG/Bain style, apply conventions from [firm-dna.md](firm-dna.md): opening/closing sequence, communication signature, density preference.
9. **Dead slide test** — can any slide be removed without breaking the argument? If yes, remove it.
10. **Density check** — does the content fill each slide without overflow or sparseness? Apply [density-adaptation.md](density-adaptation.md) rules for the target level.

Save as `{slug}-outline.md` alongside the build script.

### Outline format

The outline is the contract between the thinking layer and the production layer. Two input paths lead to the same production-ready outline:

**Path A — Self-generated** (this skill builds the ghost deck independently):

Every slide entry has the full production spec:

```
N. **Action title — full sentence conclusion**
   - Layout: [composition type from § Composition Routing]
   - Exhibit: [chart type from chart-taxonomy.md decision tree]
   - Data: [specific data points needed, with sources if known]
   - Evidence layers: [1 for L1, 1-2 for L2, 2-4 for L3]
```

**Path B — Consultant handoff** (receiving a storyboard from the consultant skill):

The consultant provides argument architecture without visualization decisions:

```
N. **Action title — full sentence conclusion**
   - Content: [what the slide argues, what it proves, the analytical question]
   - Data: [structured data in markdown tables/lists]
```

When receiving a consultant artifact, run **exhibit selection** before building:
1. For each slide, read the action title and content description
2. Map to [chart-taxonomy.md](chart-taxonomy.md)'s decision tree: "What does this slide need to prove?" → exhibit type
3. Select layout from [§ Composition Routing](#composition-routing) based on exhibit + density
4. Determine evidence layers from density level
5. Produce the full production outline (Path A format), then proceed to build

The consultant's content description tells you WHAT to prove. This skill's taxonomy tells you HOW to visualize it.

**Example** (production-ready, from a real Bain engagement):
```
1. **OpenAI should choose a 2027 IPO path and shift 2026 investment toward enterprise monetization.**
   - Layout: decision brief (full-bleed hero)
   - Exhibit: recommendation card + why-now KPI trio
   - Data: $157B valuation, $12.7B ARR, 3 strategic options
   - Evidence layers: 2

5. **Anthropic's coding dominance (54% share) poses the most immediate competitive threat to enterprise positioning.**
   - Layout: asymmetric split (3fr + 2fr)
   - Exhibit: clustered bars (market share by segment) + horizontal bars (benchmark scores)
   - Data: SWE-bench scores, coding market share, Cursor/Copilot adoption figures
   - Evidence layers: 2
```

**Outlines that omit exhibit types** produce decks dominated by KPI cards and text bullets — the most common quality failure. Whether self-generated or received from consultant, the production outline must have Layout + Exhibit before the build starts.

### Golden Trace — Profitability Example

**Brief:** "Acme Corp's EBITDA margins declined 420bps over 3 years. The CEO wants a cost transformation plan for the board."

**Step 1 — Governing thought:**
"Acme can improve EBITDA margin by 340bps through 5 cost levers across procurement and operations, capturing $180M in annualized savings within 18 months, because structural cost gap to peers creates addressable opportunity."

**Step 2 — Archetype:** Profitability → load `skeletons/profitability.md`

**Step 3 — Pillars** (customized from skeleton):
1. Benchmark the Gap — "How does Acme's cost structure compare?"
2. Explain the Gap — "What root causes drive the disparity?"
3. Size the Prize — "Which levers, how much each?"
4. Prove the P&L Math — "Phased financial impact"

**Step 4 — Action titles** (sample):
- S2: "Margin improvement of 340bps ($180M) achievable through 5 levers over 18 months"
- S4: "Acme trails peer median by 420bps on EBITDA, ranking 9th of 12 peers"
- S7: "Procurement drives 45% of addressable gap — supplier consolidation is primary mechanism"
- S10: "Total addressable opportunity is $180M across 5 levers, with procurement at $82M"

**Step 5 — Helicopter test:** Read S2, S4, S7, S10, S16, S19 titles in sequence → complete cost story in 90 seconds. Pass.

**Step 6 — Transitions:** Pivot (P1→P2) → Narrowing (P2→P3) → Escalation (P3→P4)

**Step 7 — Exhibits:** S4 = benchmark bars, S7 = driver tree, S10 = waterfall bridge, S11 = priority matrix

**Step 8 — Firm overlay:** McKinsey palette. Verdict-first titles. Exhibit numbering. Methodology to appendix.

## Phase 2 — Build

### How to build slides

You are composing **custom HTML for each slide** based on the user's actual data and the ghost deck's argument. You are NOT filling in a template. The examples under `examples/*.js` are visual pattern references — study their approach, then write original HTML that serves the specific argument.

**For each slide in the ghost deck:**

1. **Set the tier** — `'presentation'` for any deck projected in a room or read by executives. `'document'` (default) for working sessions and analysis. The tier shifts all text baselines automatically. Do not adjust individual font sizes.
2. The action title tells you **what to prove**. The exhibit type tells you **how to prove it**.
3. Read the relevant example file to learn the visual pattern — the ECharts config structure, the CSS layout approach, the annotation placement. Do not copy its data or dimensions.
4. Compose the slide HTML with the user's real data. Use the slide shell (header → body → footer). Apply palette CSS custom properties — never hardcode brand colors.
5. Size text and spacing through the token system (`tokens.adapt()`, `getFigureTypography()`, `getChartChrome()`), not hardcoded pixels. This ensures consistency across the deck and responsiveness across canvas sizes.

**What to learn from each example:**

| Look at | To understand |
|---|---|
| ECharts `setOption({...})` structure | Which config keys produce this chart type |
| `tokens.adapt(compact, preferred, wide)` calls | How geometry responds to canvas size |
| `getFigureTypography(tokens)` roles | Axis labels, data labels, annotations — what size/weight/color |
| `getChartChrome(tokens)` fragments | Axis lines, gridlines, legends — the shared chrome |
| Semantic color usage | Accent for focus, gray for context, green/red for deltas |
| The `proves` field | What analytical question this pattern answers |

**What NOT to copy from examples:**

- Sample data ("$4.2B", "12.4M units") — use the user's actual numbers
- Action titles and section labels — write new ones from the ghost deck
- Hardcoded hex colors for palette roles — use `var(--accent)`, `var(--text)`, etc.
- Fixed dimensions — adapt to the content density and slide count

**Choosing between visual patterns:**

When two exhibit types could work, choose based on the **argument**, not the visual appeal:

- Waterfall answers "what drove the change?" — use when the audience needs to see sequential drivers
- Driver tree answers "what multiplies into what?" — use when the audience needs to see the structural decomposition
- Horizontal bars answer "who is ahead?" — use when ranking is the point
- Distribution answers "how spread out?" — use when the variance is the insight, not the average

If the taxonomy's decision tree doesn't clearly route to one pattern, default to the simplest exhibit that proves the title's claim. A single bold number is often more powerful than a chart. Simplicity is not laziness — it's restraint.

### Build script template

For decks with more than 5 slides, define a CSS class system in `headExtra` rather than repeating inline Tailwind on every slide. This is more token-efficient, more consistent, and easier to fix globally.

```javascript
const { createDeck } = require('./skills/deck-design-pdf/engine');

createDeck({
  palette: 'consulting-mckinsey',
  title: 'Strategy Update Q1 2026',
  output: 'strategy-update.pdf',
  tier: 'document',  // 'document' (default) or 'presentation' for show decks
  width: 1280,       // optional
  height: 720,       // optional
  headExtra: `<style>
    /* Slide shell — CSS Grid prevents footer overflow */
    .deck-shell { height: 100%; display: grid; grid-template-rows: auto minmax(0,1fr) 48px; }
    .deck-header { padding: 28px 56px 8px 56px; border-top: 4px solid var(--accent); }
    .deck-body { min-height: 0; overflow: hidden; padding: 12px 56px 8px 56px; }
    .deck-footer { display: flex; align-items: center; justify-content: space-between;
                   padding: 0 56px; font-size: 11px; color: var(--text-fine);
                   border-top: 1px solid rgba(0,0,0,0.06); font-family: var(--font-body); }
    .deck-section { margin: 0 0 4px; font-size: 11px; letter-spacing: 0.2em;
                    text-transform: uppercase; color: var(--accent); font-weight: 700; }
    .deck-title { margin: 0 0 8px; font-size: 28px; line-height: 1.15; letter-spacing: -0.03em;
                  color: var(--text); font-family: var(--font-heading); font-weight: 700; }
    .deck-rule { height: 3px; border-radius: 2px; background: var(--accent); margin-top: 4px; }
  </style>`,
  slides: [
    // Each string is the inner HTML of one slide.
    // The engine wraps each in <section class="slide">.
    `<div class="deck-shell">
       <div class="deck-header">
         <p class="deck-section">Section Label</p>
         <h2 class="deck-title">Action title — full sentence conclusion</h2>
         <div class="deck-rule"></div>
       </div>
       <div class="deck-body">
         <!-- content -->
       </div>
       <div class="deck-footer">
         <span>Source: Analysis, 2026</span>
         <span>Confidential</span>
       </div>
     </div>`,
  ],
});
```

Run: `node build-{slug}.js` → produces the PDF directly.

**Why `headExtra` CSS classes over inline Tailwind for the shell:**
- One change to `.deck-title` fixes all 20+ slides — vs editing each slide's `text-[28px] font-semibold leading-snug tracking-tight`
- The grid shell guarantees footer placement structurally
- Token-efficient: a class name is ~15 chars vs ~80 chars of Tailwind utilities per slide
- Tailwind is still used for body content layout (grids, gaps, cards) — only the shell is CSS classes

**ECharts formatter warning:** Inside JavaScript template literals (backtick strings), `'${value}'` is interpreted as JS interpolation. Use `function(v) { return '$' + v + 'B'; }` instead. This applies to all `formatter`, `axisLabel.formatter`, and `label.formatter` properties.

### Atomic exhibits vs wrapped slides

The reusable production unit is the **atomic exhibit**: graph/table/visual only, with no header or footer baked into the template. Examples under `examples/*.js` export:

```javascript
{
  id,
  title,
  tier,
  proves,
  data,
  sectionLabel,
  actionTitle,
  source,
  exhibitId,
  responsiveSpec,  // optional: chart ranges or layout QA samples
  renderExhibit({ checkpoint, width, height, tokens }) { ... }
}
```

Use the shared helpers in `examples/_shared.js` to render:

- an exhibit-only QA artifact
- a wrapped slide reference artifact

Treat `examples/_shared.js` as the internal standards layer. Share only reusable typography, text roles, chart chrome, and repeated semantic colors. Keep exhibit geometry, data mapping, label placement, and one-off visual emphasis inside each template.

### Wrapped slide shell

When a full slide is required, wrap the exhibit with the shell below. The shell uses **CSS Grid with fixed row heights** — this structurally prevents footer overflow, which is the most common layout failure in deck production.

```html
<div style="height: 100%; display: grid; grid-template-rows: auto minmax(0, 1fr) 48px;">
  <!-- HEADER ZONE — action title with accent bar -->
  <div class="px-14 pt-8 pb-2 border-t-4 border-[var(--accent)]">
    <p class="text-[11px] font-semibold tracking-widest uppercase text-[var(--accent)] mb-1">
      Section Label
    </p>
    <h2 class="text-[28px] font-semibold leading-snug tracking-tight text-[var(--text)]"
        style="font-family: var(--font-heading)">
      Action title — full sentence conclusion
    </h2>
  </div>

  <!-- BODY ZONE — all content lives here; overflow is clipped, never pushes footer -->
  <div class="px-14 py-3" style="min-height: 0; overflow: hidden;">
    <!-- Layout primitives go here (grids, cards, charts, etc.) -->
  </div>

  <!-- FOOTER ZONE — fixed 48px row, cannot be displaced -->
  <div class="px-14 flex items-center justify-between
              text-[11px] text-[var(--text-fine)]"
       style="font-family: var(--font-body); border-top: 1px solid var(--accent-light, #ccc)33;">
    <span>Source: Analysis team, 2026</span>
    <span>Confidential</span>
  </div>
</div>
```

**Why grid, not flex:** The `grid-template-rows: auto minmax(0, 1fr) 48px` layout guarantees three things:
1. Header takes its natural height (`auto`)
2. Body fills remaining space but **cannot push the footer off-slide** (`minmax(0, 1fr)`)
3. Footer is always exactly 48px from the bottom, regardless of body content

The older `flex flex-col h-full` + `flex-1` approach allowed body overflow to push the footer off the slide — a failure that required manual QA to catch.

Cover slides and dividers replace this shell with a full-bleed layout (see [Compositions](#compositions)).

### Slide layout anti-patterns

Common failures in deck production. Avoid these:

| Anti-pattern | What happens | Fix |
|---|---|---|
| **`flex-1` on cards inside a grid** | Cards stretch to fill the grid cell height, leaving huge empty zones between content and metadata | Don't use `flex-1` on cards. Let cards be `auto`-height. Use `items-start` on the grid. |
| **`flex-1` on body zone** | If body content is short, it expands with whitespace. If content is long, it pushes the footer off-slide. | Use the CSS Grid shell above. The `minmax(0, 1fr)` body row handles both cases. |
| **`absolute` positioning for diagrams** | Elements float at hardcoded pixel offsets, break at different content sizes, don't respond to overflow. | Use CSS Grid or Flexbox for all diagrams. The flywheel, process flows, and relationship maps should use `grid-cols-3 grid-rows-3`. |
| **Template literal `${value}` in ECharts formatters** | Inside a JS backtick string, `'${value}'` evaluates as JavaScript (returning empty string or variable value), not as an ECharts template. | Use `function(v) { return v + '%'; }` for formatters, never `'${value}'` or `'{value}'` inside template literals. |
| **`mt-auto` on card metadata** | Pushes metadata to the absolute bottom of a stretched card, leaving a visual gap between the last bullet and the metadata section. | Use `mt-4` (fixed margin). The metadata should follow the content, not float to the card bottom. |
| **Rounded corners everywhere** | Excessive `rounded-xl` and `rounded-2xl` creates a product/SaaS aesthetic, not a consulting aesthetic. | Use `rounded-lg` (8px) maximum for cards. For MBB-style decks, prefer `rounded` (4px) or sharp corners. |
| **ECharts chart too small in its container** | Chart div has `flex-1` but the container has excessive padding, leaving the chart cramped. | Give chart divs explicit minimum heights or use `style="min-height: 0"` to allow proper flex shrinking. |

### Responsive Support Model

Do not author examples against hardwired `sm/md/lg` buckets. The reference canvas remains `1280×720`, but responsiveness should follow the actual target `width` and `height`.

Use one of two contracts:

1. **Chart / figure templates**

```javascript
responsiveSpec: {
  templateClass: 'chart',
  exhibitRange: {
    min: { width: 960, height: 540 },
    preferred: { width: 1280, height: 720 },
    max: { width: 1600, height: 900 },
  },
  slideRange: {
    min: { width: 1024, height: 576 },
    preferred: { width: 1280, height: 720 },
    max: { width: 1600, height: 900 },
  },
  rationale: 'end labels become unreadable below the declared minimum',
}
```

Use this when the exhibit has a real legibility floor.

2. **Layout / content templates**

```javascript
responsiveSpec: {
  templateClass: 'layout',
  previewSamples: [
    { label: 'compact', width: 1024, height: 576 },
    { label: 'preferred', width: 1280, height: 720 },
    { label: 'wide', width: 1440, height: 810 },
  ],
  agentSizingNotes: 'agent should split or simplify if width falls below the compact QA sample',
}
```

Use this for tables, roadmaps, flows, and card grids where the agent should determine the best composition on the fly rather than inherit a rigid supported-size matrix.

The preview bench should:

- render `min / preferred / max` checkpoints for chart templates
- render representative QA samples for layout templates
- verify text remains legible at the compact checkpoint for both tiers

### Design tokens

Every palette provides these CSS custom properties. Use via Tailwind arbitrary values.

| Token | Purpose | Tailwind |
|---|---|---|
| `--surface` | Default slide background | `bg-[var(--surface)]` |
| `--surface-dark` | Cover / divider background | `bg-[var(--surface-dark)]` |
| `--surface-muted` | Cards, evidence panels | `bg-[var(--surface-muted)]` |
| `--accent` | Brand color, header bars, highlights | `text-[var(--accent)]` / `border-[var(--accent)]` |
| `--accent-light` | Borders, light tint | `border-[var(--accent-light)]` |
| `--text` | Primary text | `text-[var(--text)]` |
| `--text-muted` | Secondary text, annotations | `text-[var(--text-muted)]` |
| `--text-fine` | Footnotes, sources | `text-[var(--text-fine)]` |
| `--text-on-dark` | Text on dark surfaces | `text-[var(--text-on-dark)]` |
| `--font-heading` | Heading font family | `style="font-family: var(--font-heading)"` |
| `--font-body` | Body font family | `style="font-family: var(--font-body)"` |
| `--chart-primary` | Primary chart/data color | For inline SVG fills |
| `--chart-secondary` | Secondary chart color | For inline SVG fills |

### Typography scale

Two systems exist for typography sizing:

1. **Slide HTML** — use the Tailwind lookup table below. Pick a role, use its class. No guessing.
2. **ECharts exhibits** — use the responsive tokens from `examples/_shared.js` (`tokens.bodyText`, `tokens.smallText`, etc.). These scale with canvas size automatically.

#### Tailwind type roles — slide HTML

Every text element in slide HTML must use one of these roles. The table gives both the **Tailwind class** (what you write) and the **rendered px** (what you get) at 1280×720.

| Role | Tailwind class | Rendered | Weight | Extras | Use for |
|---|---|---|---|---|---|
| **Cover title** | `text-[44px]` | 44px / 33pt | `font-bold` | `tracking-tight` | Title slide headline |
| **Action title** | `text-[28px]` | 28px / 21pt | `font-semibold` | `tracking-tight leading-snug` | Slide conclusion sentence |
| **Section label** | `text-[11px]` | 11px / 8pt | `font-semibold` | `tracking-widest uppercase` | "MOMENTUM DIAGNOSTIC" above title |
| **Subtitle** | `text-lg` | 18px / 13.5pt | `font-normal` | — | Cover subtitle, context line |
| **Body** | `text-[15px]` | 15px / 11pt | `font-normal` | `leading-relaxed` | Paragraphs, bullet descriptions, card body text |
| **Body small** | `text-[13px]` | 13px / 10pt | `font-normal` | `leading-relaxed` | Secondary descriptions, table cells, annotations |
| **Card metric** | `text-[26px]` | 26px / 19.5pt | `font-bold` | `tracking-tight leading-none` | "$240B", "200%+", large KPI numbers |
| **Card label** | `text-[13px]` | 13px / 10pt | `font-semibold` | — | Metric name below the number |
| **Card detail** | `text-[12px]` | 12px / 9pt | `font-normal` | — | Trend indicators, supplementary data below label |
| **Panel header** | `text-[11px]` | 11px / 8pt | `font-bold` | `tracking-widest uppercase` | "KEY METRICS", "PERSPECTIVES" — mini-headers |
| **Callout body** | `text-[13px]` | 13px / 10pt | `font-normal` | `leading-relaxed` | Text inside insight/callout boxes |
| **Data label** | `text-xs` | 12px / 9pt | `font-medium` | — | Chart annotations, axis labels in HTML |
| **Footer / source** | `text-[11px]` | 11px / 8pt | `font-normal` | — | Source line, confidentiality notice |
| **Tag / badge** | `text-[10px]` | 10px / 7.5pt | `font-medium` | `px-2 py-0.5 rounded-full` | Pill labels inside cards |

**Legibility floor:** No text below `text-[11px]` except tags/badges. Body-readable text (anything the audience is expected to *read*, not just *see*) must be ≥`text-[13px]` (13px / 10pt). Below that, text serves as a label or decoration, not content.

**Tailwind ↔ px mapping for reference** (Tailwind CDN defaults):

| Class | px | pt |
|---|---|---|
| `text-xs` | 12px | 9pt |
| `text-sm` | 14px | 10.5pt |
| `text-base` | 16px | 12pt |
| `text-lg` | 18px | 13.5pt |
| `text-xl` | 20px | 15pt |
| `text-2xl` | 24px | 18pt |
| `text-3xl` | 30px | 22.5pt |

When a role falls between Tailwind breakpoints (e.g., 13px, 15px, 26px, 28px), use `text-[Npx]` arbitrary value syntax. This is intentional — the consulting typography scale doesn't align with Tailwind's default ramp.

#### ECharts exhibit tokens

For chart/exhibit JavaScript (inside `<script>` blocks or example files), use the responsive token system from `examples/_shared.js`:

- `tokens.bodyText` / `tokens.smallText` / `tokens.microText` — text sizes that scale with canvas
- `tokens.adapt(compact, preferred, wide)` — continuous interpolation for geometry
- `tokens.textAdapt(compact, preferred, wide)` — slower compression for text legibility
- `getFigureTypography(tokens)` — axis, legend, label, annotation, metric role presets
- `getChartChrome(tokens)` — shared axis/gridline/legend config fragments

Use token roles wherever the styling is standard. Do not abstract geometry, chart-specific layout, or exhibit-specific emphasis into shared helpers.

### Spatial constants

| Zone | Value | Note |
|---|---|---|
| Horizontal padding | `px-14` (56px) | Content never touches slide edges |
| Header top padding | `pt-10` (40px) | Space above section label / title |
| Header accent bar | `border-t-4` (4px) | Top border in accent color |
| Body vertical padding | `py-4` (16px) | Breathing room in body zone |
| Column gap | `gap-6` – `gap-8` | Between grid columns (24–32px) |
| Card gap | `gap-3` – `gap-4` | Between card items (12–16px) |
| Card border radius | `rounded-lg` | Consistent card rounding |
| Footer height | `py-2` (~40px) | Compact, fine text |

### Icons — Font Awesome 6

Font Awesome 6 Free is vendored locally. Use `<i>` tags inline with text or as standalone decorators only when the glyph is render-stable in PDF output.

**Common icons for consulting slides:**

| Category | Icons |
|---|---|
| Trends | `fa-arrow-trend-up`, `fa-arrow-trend-down`, `fa-arrow-right` |
| Status | `fa-circle-check`, `fa-circle-xmark`, `fa-triangle-exclamation` |
| Metrics | `fa-chart-line`, `fa-chart-bar`, `fa-chart-pie`, `fa-percent` |
| Financial | `fa-dollar-sign`, `fa-coins`, `fa-money-bill-trend-up` |
| Org | `fa-building`, `fa-users`, `fa-user-tie`, `fa-sitemap` |
| Strategy | `fa-bullseye`, `fa-lightbulb`, `fa-rocket`, `fa-chess` |
| Process | `fa-gears`, `fa-arrows-spin`, `fa-diagram-project` |
| Risk | `fa-shield-halved`, `fa-lock`, `fa-bug` |
| Time | `fa-clock`, `fa-calendar`, `fa-hourglass-half` |
| Data | `fa-database`, `fa-server`, `fa-cloud` |

**Usage pattern:**
```html
<!-- Inline with text -->
<span class="text-[var(--accent)]"><i class="fa-solid fa-arrow-trend-up mr-2"></i>12% YoY</span>

<!-- Card decorator (large) -->
<i class="fa-solid fa-chart-line text-3xl text-[var(--accent)] mb-3"></i>

<!-- Status indicator -->
<i class="fa-solid fa-circle-check text-emerald-500 mr-1"></i>
<i class="fa-solid fa-triangle-exclamation text-amber-500 mr-1"></i>
<i class="fa-solid fa-circle-xmark text-red-500 mr-1"></i>
```

Icons work best as visual anchors on KPI cards, process steps, and list items. Do not over-decorate. If a glyph is unstable in PDF output, replace it with a text badge or inline SVG.

### Data Visualization — ECharts 5

ECharts 5 is vendored locally with **SVG renderer** (mandatory — `<canvas>` blanks in Playwright PDF). It provides 21 chart types with consulting-quality aesthetics when configured correctly.

For exhibit selection, load [chart-taxonomy.md](chart-taxonomy.md) — it provides a decision tree (what does this slide prove? → exhibit type), firm-specific visual DNA (what each firm tolerates on charts), deck archetypes (exhibit mix by deck purpose), and annotation grammar. Use it BEFORE choosing any chart type.

**Chart container pattern:**
```html
<!-- In the slide HTML, place a div with explicit dimensions -->
<div id="chart-1" style="width: 100%; height: 340px;"></div>

<!-- After ALL slides, add a <script> block that initializes charts -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  // Bar chart
  const chart1 = echarts.init(document.getElementById('chart-1'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,   // mandatory for static PDF
    // ... option config
  });
});
</script>
```

**Important:** The `<script>` block goes **inside the slide HTML string** (after the layout HTML but before the closing backtick). The engine wraps each slide in a `<section>`, so scripts within a slide will execute in the browser.

For **multi-chart slides**, use unique IDs (`chart-1`, `chart-2`, etc.) and initialize all charts in a single `<script>` block at the end of that slide's HTML.

**MBB chart aesthetics — the configuration that makes charts look consulting-quality:**

```javascript
// Universal ECharts config for MBB-quality output
{
  animation: false,                    // static PDF — no animation
  grid: {
    left: 48, right: 24, top: 32, bottom: 40,
    containLabel: true,
  },
  textStyle: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: 12,
    color: '#4E6176',                  // muted axis labels
  },
  title: {
    show: false,                       // title is in the slide header, not the chart
  },
  tooltip: { show: false },           // no interactive tooltips in PDF
  legend: {
    bottom: 0,
    textStyle: { fontSize: 11, color: '#4E6176' },
    itemWidth: 12, itemHeight: 12,
    itemGap: 16,
  },
  xAxis: {
    axisLine: { lineStyle: { color: '#C7D5E5' } },
    axisTick: { show: false },
    axisLabel: { fontSize: 11, color: '#4E6176' },
    splitLine: { show: false },
  },
  yAxis: {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { fontSize: 11, color: '#4E6176' },
    splitLine: { lineStyle: { color: '#E4EDF7', type: 'dashed' } },
  },
}
```

**Chart type routing — which ECharts type for each consulting use case:**

| Consulting use case | ECharts type | Key config |
|---|---|---|
| Revenue/metric comparison | `type: 'bar'` | Vertical bars, accent color primary, gray secondary |
| Trend over time | `type: 'line'` | `smooth: false` for MBB (no curves), `areaStyle` for area |
| Market share / composition | `type: 'pie'` | `radius: ['40%', '70%']` for donut, `label.position: 'outside'` |
| Scatter / positioning | `type: 'scatter'` | `symbolSize` by value for bubble effect |
| Revenue bridge / delta | `type: 'bar'` (stacked) | Invisible base + colored delta — waterfall pattern |
| Performance meter | `type: 'gauge'` | `detail.formatter`, clean arc, no animation |
| Flow / allocation | `type: 'sankey'` | `orient: 'horizontal'`, `nodeWidth: 20` |
| Hierarchy / budget | `type: 'treemap'` | `visibleMin: 300`, `label.fontSize: 12` |
| Multi-criteria radar | `type: 'radar'` | `indicator` array, filled area |
| Pipeline / conversion | `type: 'funnel'` | `sort: 'descending'`, label inside |
| Correlation matrix | `type: 'heatmap'` | With `visualMap` for color mapping |

**Waterfall chart pattern (MBB signature):**
```javascript
// Waterfall = stacked bar with invisible base
series: [
  { name: 'base', type: 'bar', stack: 'waterfall',
    data: [0, 3800, 3800, 4100, 3900],           // running base
    itemStyle: { color: 'transparent' },
    emphasis: { itemStyle: { color: 'transparent' } },
  },
  { name: 'delta', type: 'bar', stack: 'waterfall',
    data: [3800, 500, 300, -200, 300],            // deltas (neg = red)
    itemStyle: {
      color: (params) => params.data >= 0 ? '#123A63' : '#CC4444',
    },
    label: {
      show: true, position: 'top',
      formatter: (p) => (p.data >= 0 ? '+' : '') + p.data,
      fontSize: 11, fontWeight: 'bold',
    },
  },
]
```

**Color discipline for charts:**
- Primary series: `var(--chart-primary)` or the hex value from the palette
- Secondary series: `var(--chart-secondary)` — always gray
- Positive delta: accent color or `#2E9E5A` (green)
- Negative delta: `#CC4444` (red)
- Never more than 4 colors in one chart. MBB charts are restrained.

**CSS-only bar charts (no ECharts needed for simple bars):**
```html
<!-- Horizontal bar — pure CSS, no JavaScript -->
<div class="flex items-center gap-3 mb-2">
  <span class="w-24 text-[13px] text-[var(--text)] text-right shrink-0">Revenue</span>
  <div class="flex-1 bg-[var(--surface-muted)] rounded-full h-6 overflow-hidden">
    <div class="h-full bg-[var(--accent)] rounded-full" style="width: 78%"></div>
  </div>
  <span class="text-[13px] font-semibold text-[var(--text)] w-12">78%</span>
</div>
```

Use CSS-only bars for simple progress/comparison visuals. Use ECharts for anything with axes, legends, or complex data.

## Firm Style

Conventions for L2+ consulting decks. These govern LAYOUT and COMPOSITION per firm. For chart-level visual treatment and firm identity details, see [chart-taxonomy.md](chart-taxonomy.md) § Firm Visual Identity.

**The real differentiator between firms is communication structure, not chart selection.** All three firms use the same foundational charts (waterfalls, bars, lines, stacked bars). What differs is how the slide is organized and how the argument flows.

### McKinsey — Verdict-First

Rooted in the Pyramid Principle (Barbara Minto, McKinsey, 1960s–70s): conclusion leads, evidence follows.

**Header:** Two-tier — section label (small, accent color, uppercase) above action title (large, bold, dark). No rule below.

**Action titles:** Full-sentence conclusions. "Revenue grew 12% driven by pricing power in mid-tier" — not "Revenue Overview". Read all titles in sequence: they must tell the complete argument (the "helicopter test").

**Composition:** Conclusion-first. Evidence is clean, minimal annotation. Navy palette, single blue hue at different lightness levels for data series. Exhibit numbering ("Exhibit 1.2") creates formal reference system.

### BCG — Framework-First

Rooted in analytical transparency (Growth-Share Matrix tradition, Bruce Henderson, 1970): show the reasoning, then the conclusion.

**Header:** Section label (dark green, uppercase) → action title (black, bold) → green rule (~3px, full width below title).

**Action titles:** Framework-anchored claims. "Three of five capability dimensions exceed peer median" — not "Capabilities Assessment".

**Composition:** Analytical structure is visible. Panel mini-headers on multi-panel slides. Evaluation matrices with RAG cell fills (green/amber/red washes at low opacity) for criteria-based assessment. Green accent system.

### Bain — Decision-First

Rooted in Results Delivery (NPS tradition, Fred Reichheld, 2003): every exhibit connects to a specific decision and measurable outcome.

**Header:** Action title (bold, black) → red rule (~3px, full width below title). No section label above. Simpler than McKinsey/BCG.

**Action titles:** Decision-oriented. "Cost structure supports 15% price reduction without margin erosion" — always answers "so what should we do?"

**Composition:** Facts-vs-perspectives split is the distinctive layout: left (~55%) shows data and evidence, right (~45%) shows interpretation and recommended action. This is the one genuinely firm-specific visual convention — it separates what the data shows from what the firm recommends. Red accent marks the focal element per slide.

## Compositions

### Layout primitives

Six layout structures for the body zone. Combine with the [three-zone shell](#slide-anatomy--the-three-zone-shell).

| Layout | Grid | Use when |
|---|---|---|
| **Single column** | `flex flex-col gap-4` | Narrative text, ordered list, simple argument |
| **Two-column** | `grid grid-cols-2 gap-8` | Chart + bullets, comparison, evidence + sidebar |
| **Asymmetric split** | `grid grid-cols-[3fr_2fr] gap-8` | Main exhibit + sidebar (55/45) |
| **Three-column** | `grid grid-cols-3 gap-6` | KPI cards, feature comparison, triple evidence |
| **Card grid** | `grid grid-cols-3 gap-4` (or 2/4) | Scorecards, team, feature tiles |
| **Full bleed** | No shell — direct child of `<section>` | Cover, divider, hero image |

### Content primitives

Small HTML components to compose inside layout primitives.

**KPI Metric Card:**
```html
<div class="bg-[var(--surface-muted)] rounded-lg p-5 flex flex-col">
  <i class="fa-solid fa-chart-line text-2xl text-[var(--accent)] mb-3"></i>
  <span class="text-[28px] font-bold tracking-tight text-[var(--text)]">$4.2B</span>
  <span class="text-[13px] font-semibold text-[var(--text)] mt-1">Revenue</span>
  <span class="text-xs text-[var(--text-muted)] mt-1">
    <i class="fa-solid fa-arrow-trend-up text-emerald-500 mr-1"></i>↑ 12% YoY
  </span>
</div>
```

**Evidence Panel (bordered):**
```html
<div class="border border-[var(--accent-light)]/40 rounded-lg p-5">
  <h3 class="text-xs font-bold tracking-widest uppercase text-[var(--accent)] mb-3">
    Key Drivers
  </h3>
  <ul class="space-y-2 text-[14px] text-[var(--text)]" style="font-family: var(--font-body)">
    <li class="flex items-start gap-2">
      <i class="fa-solid fa-chevron-right text-[10px] text-[var(--accent)] mt-1.5 shrink-0"></i>
      <span>Market share grew 3pp driven by pricing advantage in mid-tier segment</span>
    </li>
  </ul>
</div>
```

**Data Table:**
```html
<table class="w-full text-[13px]" style="font-family: var(--font-body)">
  <thead>
    <tr class="border-b-2 border-[var(--accent)]">
      <th class="text-left py-2 font-semibold text-[var(--text)]">Metric</th>
      <th class="text-right py-2 font-semibold text-[var(--text)]">2024</th>
      <th class="text-right py-2 font-semibold text-[var(--text)]">2025</th>
      <th class="text-right py-2 font-semibold text-[var(--text)]">Delta</th>
    </tr>
  </thead>
  <tbody class="text-[var(--text)]">
    <tr class="border-b border-[var(--accent-light)]/30">
      <td class="py-2">Revenue</td>
      <td class="text-right py-2 tabular-nums">$3.8B</td>
      <td class="text-right py-2 tabular-nums">$4.2B</td>
      <td class="text-right py-2 font-semibold text-emerald-600">+11%</td>
    </tr>
  </tbody>
</table>
```

**Callout Box:**
```html
<div class="bg-[var(--accent)]/5 border-l-4 border-[var(--accent)] px-5 py-4 rounded-r-lg">
  <p class="text-[14px] font-medium text-[var(--text)]">
    <i class="fa-solid fa-lightbulb text-[var(--accent)] mr-2"></i>
    Key insight or recommendation text here
  </p>
</div>
```

### Composition routing

Map each slide's communication move to a layout composition.

| User intent / data shape | Layout | Content primitives | Notes |
|---|---|---|---|
| Cover / title page | Full bleed | Centered title + subtitle on dark surface | No shell — full `h-full` |
| Section divider | Full bleed | Section number (large) + title on dark | Page break rhythm |
| Agenda / TOC | Single column | Numbered list items, active item highlighted | Accent color on active |
| 4–6 KPIs / metrics | Card grid (3-col or 2×3) | KPI metric cards | Icons + trend indicators |
| Claim + chart evidence | Asymmetric split | Chart (left) + evidence panel (right) | SVG chart or CSS bars |
| Binary choice (A vs B) | Two-column | Comparison cards with criteria rows | Highlight recommended |
| Process / mechanism | Single column | Numbered step cards with icons | Horizontal or vertical |
| Data comparison table | Single column | Data table + optional callout box | Color-coded deltas |
| Timeline / milestones | Single column | Horizontal timeline with markers | CSS flex with dots |
| Waterfall / bridge | Single column | CSS bar chart + interpretation panels | Start → deltas → end |
| Evaluation matrix | Single column | Grid table with RAG cell fills | Color-coded ratings |
| Facts vs perspectives | Two-column | Left: fact bullets + chart. Right: perspective bullets | Bain signature |
| Multi-evidence composite | Asymmetric split | Main chart + metric cards below + sidebar | L3 density |
| Team / founders | Card grid (4-col) | Name + role + bio cards | Optional photo/icon |
| Closing / recommendation | Full bleed or single | Centered recommendation + next steps list | Clean, authoritative |
| Workplan / Gantt | Single column | CSS grid calendar with colored spans | Time periods as columns |

### Firm-specific composition rules

| Firm | Layout signature | Communication signature |
|---|---|---|
| McKinsey | Two-tier header (section label + action title). Exhibit numbering. | Verdict-first — conclusion in title, evidence below. |
| BCG | Green rule below action title. Panel mini-headers on multi-panel slides. | Framework-first — analytical structure visible, then conclusion. |
| Bain | Red rule below action title. Facts-vs-perspectives split. | Decision-first — data separated from interpretation. |

## Composition Rules

- **Start** with a cover slide. Use section dividers for chapter breaks in decks >8 slides.
- **One slide = one argument.** Every action title advances a distinct claim.
- **Dead slide test.** If you can remove a slide and the argument still works, remove it. Every slide must be load-bearing.
- **Do not repeat the same layout back-to-back.** Alternate between layout types.
- **Helicopter test.** Read all action titles in sequence — they must tell a complete, persuasive story without any exhibit bodies.
- **Density level governs composition.** Do not use L3 multi-evidence composites on an L1 pitch deck.
- **Chart variety.** Do not use the same chart type on consecutive slides.
- **Icon restraint.** One icon per card or list item. No icon walls. Use accent color, not rainbow.
- **Section rhythm.** For decks >8 slides, group into 3–4 sections. Open each with agenda (active item) or divider. Close with synthesis before the next section.
- **Content fit.** Content must fill the body zone without overflow or sparseness. If a slide looks empty, add evidence layers. If it's crowded, split into two slides.
- **Visual balance.** Content is vertically centered in the body zone by Flexbox — let `flex-1` handle distribution. Do not force absolute positioning.
- **Color discipline.** Use palette tokens, not hardcoded hex. Semantic colors (emerald/amber/red) only for status indicators, never for decoration.
- **Annotation is value, not decoration.** See chart-taxonomy.md's Annotation Grammar. The callout that says "This 15% gap = $340M unrealized" is why the engagement costs what it costs.

## Output Organization

Save deliverables to the current working directory (or user-specified folder). Kebab-case naming:

- `{slug}.pdf` — the deliverable
- `build-{slug}.js` — the build script (reproducible)
- `{slug}-outline.md` — the deck outline

## Architecture

Self-contained: `package.json` + `node_modules/` are inside the skill folder. All `require()` calls resolve locally.

| File | Purpose |
|---|---|
| `engine/index.js` | `createDeck(options)` — assembles HTML document, calls renderer |
| `engine/render.js` | Playwright Chromium → `page.pdf()` at configurable dimensions |
| `engine/canvas.css` | Slide container, print-color-adjust, CSS custom property defaults |
| `palettes/*.css` | CSS custom properties per style (colors, fonts) |
| `ghost-deck.md` | Ghost deck methodology: 5-layer model, governing thought, quality gates |
| `engagement-archetypes.md` | 8 engagement archetypes + 5 transition patterns + rising-stakes progression |
| `firm-dna.md` | McKinsey/BCG/Bain epistemology, deck structure, communication signatures |
| `evidence-recipes.md` | 10 data-shape recipes, layering rules, engagement × recipe mapping |
| `density-adaptation.md` | L1/L2/L3 adaptation rules, compression/expansion, slide counts |
| `skeletons/*.md` | 8 engagement skeletons: governing thought, pillars, slide index, kill conditions, quality gates |
| `chart-taxonomy.md` | Exhibit design playbook: decision tree, firm visual DNA, annotation grammar |
| `examples/_shared.js` | Typography tokens, chart chrome, responsive sizing — the internal standards layer |
| `examples/*.js` | 46 visual pattern references covering Tier 1–4 exhibits + consulting compositions |

**How examples relate to deck building:** The agent does NOT import or call example files at runtime. Examples exist as **read-only references** — the agent reads them to learn visual patterns, then writes original HTML in the build script. The build script uses only `engine/index.js` (`createDeck`). The examples use `_shared.js` to demonstrate best practices for token usage, but the agent composes slide HTML directly.

The engine handles: HTML document assembly, vendored font loading, Font Awesome injection, ECharts (SVG renderer), Tailwind injection, palette CSS injection, Playwright launch, `page.pdf()` rendering. All assets are local — zero network dependency at build time.

## What NOT To Do

**Rendering constraints:**
- Do not use `<canvas>` for charts — canvas elements blank in Playwright's PDF pipeline. Use ECharts SVG renderer or CSS-only visuals.
- Do not add animation, transitions, or hover states. The output is static PDF.
- Do not use `@media print` overrides — the engine uses `emulateMedia('screen')`.
- Use CSS Grid (`grid-template-rows: auto minmax(0,1fr) 48px`) for the slide shell, not `flex flex-col` with `flex-1`. See § Wrapped slide shell and § Slide layout anti-patterns.

**Architecture constraints:**
- Do not create separate HTML files per slide. All slides go in one build script, one HTML document, one PDF.
- Do not generate interactive presentations (Reveal.js, Slidev). Output is always static PDF.
- Do not hardcode palette colors — use CSS custom properties (`var(--accent)`, `var(--text)`, etc.) so palette switching works.

**Design discipline:**
- Do not copy example data into real decks. Example numbers ($4.2B, 12.4M units) are illustrative — use the user's actual data.
- Do not choose exhibit types by visual appeal. Choose by what the slide's argument needs to prove. A bold number can be more powerful than a chart.
- Do not over-decorate. No icon walls, no rainbow colors, no gradients on data elements. Consulting aesthetics come from restraint, not embellishment.
- Do not use the same exhibit type on consecutive slides. Alternate to maintain visual rhythm.

**Agent behavior:**
- Do not ask the user to pick a chart type. The taxonomy's decision tree and the ghost deck's action titles determine the exhibit. You make the visual decision.
- Do not ask the user for show vs. working deck preference. Infer from audience and objective — "board presentation" is show, "diligence data room" is working.
- Do not present multiple layout options for approval. Commit to the best composition based on the content density and argument structure. The user reviews the output PDF, not a menu of choices.
