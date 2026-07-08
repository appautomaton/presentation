# Brand System — Agent Guide

## What this skill is

The upstream identity producer for the whole pipeline. A conversational design process (research → propose → refine) yields three artifacts: `brand-brief.md` (the human-readable source of truth), `identity.js` (the machine-readable extraction), and `brand-preview.pdf` (a 3-slide rendered proof). Downstream deck skills consume `identity.js` through their own intake sections.

**Core intent:** Define the vocabulary, not the implementation. The style direction is un-opinionated in application — each consumer interprets it for its own medium. This skill decides *what the visual language is*, never *how a slide should look*.

## Design principles

1. **The brief is the source of truth.** `identity.js` is an extraction of an approved brief; the preview confirms decisions already made. Never generate the config or render the preview before the brief is finalized, and never treat the preview as a design exploration tool.

2. **The config is a published contract.** `identity.js`'s shape is load-bearing downstream: the `style` enum (`institutional | modern | dark | bento | editorial | data-forward`), the palette role names, `fonts`, and `toCSS()` all have consumers. Both deck skills define identity-intake sections that parse this exact shape — `toCSS()` output is engine-compatible palette CSS for the PDF renderer; the palette roles map onto the PPTX theme keys. Change the shape only with both intakes in the same commit. (This contract shipped with zero consumers once; nothing failed loudly, decks just silently ignored the identity.)

3. **Research before choosing.** Known brand → extract actual colors, typeface, tone. New project → search the space for peer palettes and conventions. Every color traces to a reason; a second font family must earn its place.

4. **Decide, don't survey.** Recommend one style with 1–2 alternatives filtered by context — never all six. Ask the user only the questions the request doesn't already answer, surfaced by uncertainty, not by checklist.

5. **Progressive disclosure.** SKILL.md is small (~1.7k tokens) and always loaded. The three references load per phase: palette-guide at palette time, typography-guide at font time, design-landscape at style time.

## Known weaknesses (open work)

- **Attractor fonts.** typography-guide.md routes toward the highest-frequency AI-output fonts (Inter as universal default, Instrument Serif, Playfair Display). For a skill whose job is distinctive identity, this is mode collapse. Fix direction: an attractor veto list plus a deeper catalog beyond page-1 Google Fonts.
- **Perishable trends.** design-landscape.md is a dated (2025–2026) snapshot with a source list of blog posts, contradicting the repo's heuristics-over-data principle. Fix direction: convert to timeless selection heuristics plus a "search current trends at runtime" directive, the same pattern consultant uses for benchmarks.

## What NOT to do

- Don't change `identity.js`'s exported shape without updating both deck skills' intake sections in the same commit.
- Don't generate `identity.js` or the preview before the user approves the brief.
- Don't add dated trend content or perishable source lists — heuristics only, search at runtime for anything with a shelf life.
- Don't leak SaaS defaults into professional identities: rounded cards with shadows, nested cards, gradient fills on content, inconsistent radius.

## Maintenance

- `npm install` inside this folder if `node_modules/` is missing (playwright only).
- Intermediate HTML renders to temp and is cleaned up; only the three artifacts land in the user's working directory.
