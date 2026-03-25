# Typography Guide

How to choose and pair fonts for a visual identity system.

## The decision process

1. Identify the subject's typeface family from research (geometric, humanist, serif, mono)
2. Find the closest Google Font that echoes that DNA
3. Decide whether heading and body should be the same family or different
4. Select weights: 400 (regular), 600 (semibold), 700 (bold) — load only what you need
5. Optionally add a monospace for data and metrics

## Pairing lookup table

From the subject's brand typeface to a Google Fonts recommendation:

| Their typeface feels like... | Google Fonts to try | Why this pairing works |
|---|---|---|
| **Geometric sans** (Product Sans, Roboto, Circular, Futura) | Inter, Manrope | Same geometric DNA — circular 'o', even stroke width, neutral personality |
| **Humanist sans** (Söhne, Helvetica Now, Gill Sans, Frutiger) | DM Sans, Source Sans 3 | Warmer, more approachable. Open apertures, slight stroke contrast |
| **Neo-grotesque** (Suisse, Aktiv Grotesk, SF Pro) | Inter, Plus Jakarta Sans | Clean, contemporary, slightly geometric. Good at many weights. |
| **Slab serif** (Roboto Slab, Zilla Slab) | Roboto Slab + Inter | Authoritative headlines with clean body text |
| **Serif / editorial** (Canela, GT Sectra, Tiempos) | Instrument Serif + DM Sans | Premium gravitas. Serif heading creates instant editorial tone. |
| **Monospace-forward** (SF Mono, JetBrains Mono, Fira Code) | JetBrains Mono + Inter | Technical identity. Mono for data/metrics, sans for narrative. |
| **No clear reference** (new project, no existing brand) | Inter | The universal default. Works for every context. Add a second family only if the project needs more personality. |

## Font roles

| Role | What it controls | Weight guidance |
|---|---|---|
| **Heading** | Cover titles, action titles, section headers, card metric values | 600 (semibold) for action titles, 700 (bold) for cover titles and big metrics |
| **Body** | Paragraphs, bullet text, table cells, callout content, card labels | 400 (regular) for body copy, 600 (semibold) for emphasis and labels |
| **Mono** (optional) | Data tables, KPI numbers, code blocks, technical annotations | 400 or 500 (medium). Used sparingly — only when tabular alignment or technical tone matters. |

## Heading + body: same or different?

**Same family** (e.g., Inter for both):
- Simpler, more cohesive
- Hierarchy comes from size and weight, not font contrast
- Best default for most projects
- Works for: consulting, corporate, technical

**Different families** (e.g., Instrument Serif heading + DM Sans body):
- More distinctive, more editorial
- Creates stronger visual hierarchy through typographic contrast
- Requires careful pairing — the families must share proportions (x-height, cap height)
- Works for: premium advisory, annual reports, thought leadership, brand-forward decks

**Rule of thumb:** start with one family. Add a second only if the project needs more personality than size/weight variation can provide.

## Google Fonts availability

Fonts commonly vendored in deck engines (available offline):
- Inter
- DM Sans
- Plus Jakarta Sans
- Source Sans 3

Fonts available via CDN only (require network at render time):
- Manrope
- Instrument Serif
- Playfair Display
- JetBrains Mono
- IBM Plex Mono
- Crimson Pro
- Any other Google Font

When using CDN fonts, add the link via `headExtra` in the build script or in the engine's HTML generation.

## Weight loading discipline

Load only the weights you use. Every extra weight adds network latency and render time.

| Project type | Typical weights needed |
|---|---|
| Single-family (Inter) | 400, 600, 700 |
| Serif + sans pairing | Heading: 400, 700. Body: 400, 600 |
| With mono | Add mono at 400 or 500 only |

Never load italic weights unless the design specifically uses italics (rare in presentations).

## Anti-patterns

- Loading 8+ weights "just in case" → slow renders, wasted bandwidth
- Serif body with sans heading → feels inverted, hard to read at body sizes
- Decorative/display fonts for body text → poor readability at 13-15px
- Mixing 3+ font families → looks chaotic, not intentional
- Using the brand's proprietary font directly → licensing issues; find the Google Fonts equivalent instead
