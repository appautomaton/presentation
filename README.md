# Presentation Skills

**A business question goes in. A consulting-grade deck comes out.**

Four composable agent skills covering the full arc of deck production: the argument, the identity, and the artifact. Built for Claude Code, readable by any agent that understands `SKILL.md` and `AGENTS.md`.

![skills](https://img.shields.io/badge/skills-4-123A63) ![output](https://img.shields.io/badge/output-PDF%20%2B%20PPTX-0F6B4F) ![pptxgenjs](https://img.shields.io/badge/pptxgenjs-4.0.1-CC0000) ![echarts](https://img.shields.io/badge/ECharts-6.1-C6613F) ![playwright](https://img.shields.io/badge/Playwright-1.61-4285F4) ![offline](https://img.shields.io/badge/build-zero%20network-141413) ![agents](https://img.shields.io/badge/AGENTS.md-unified-5E5D59) ![license](https://img.shields.io/badge/license-MIT-87867F)

## Pipeline

Two producers feed two renderers. Every handoff is a plain file in your working directory, not a framework.

```
┌──────────────────────┐          ┌──────────────────────┐
│      consultant      │          │     brand-system     │
│  argument architect  │          │  identity designer   │
└──────────┬───────────┘          └──────────┬───────────┘
           │                                 │
           │  storyboard                     │  identity.js
           │  what each slide must prove     │  palette, fonts, style
           │                                 │
           ▼                                 ▼
┌─────────────────────────────────────────────────────────┐
│                     deck production                     │
│                                                         │
│   deck-design-pdf              deck-design-ppt          │
│   pixel-perfect PDF            native editable PPTX     │
│   HTML + Playwright            pptxgenjs                │
└─────────────────────────────────────────────────────────┘
```

Run the full chain, or point a deck skill at any storyboard and identity you already have. Every skill also works standalone.

## The skills

| Skill | Consumes | Produces | Core discipline |
|---|---|---|---|
| [consultant](consultant/) | a business question, your data | storyboard (markdown) | Hypothesis-driven decomposition. McKinsey, BCG, or Bain methodology. Forcing-function quality gates. |
| [brand-system](brand-system/) | brand context, or a blank slate | `brand-brief.md`, `identity.js`, preview PDF | Research-first palettes. Typography pairing. Style vocabulary that downstream skills interpret. |
| [deck-design-pdf](deck-design-pdf/) | brief or storyboard, plus identity | pixel-perfect PDF | Ghost-deck argument gates. 46 self-contained exhibit patterns. Fill-first layout. |
| [deck-design-ppt](deck-design-ppt/) | brief or storyboard, plus identity | native editable PPTX | 21 slide patterns on one grid contract. Slot budgets as the overflow defense. |

## Install

Clone anywhere you keep skills, then symlink each skill into your agent's skills directory.

```sh
git clone <repo-url> ~/skills/presentation
cd ~/skills/presentation

# Claude Code
for s in consultant brand-system deck-design-pdf deck-design-ppt; do
  ln -s "$(pwd)/$s" ~/.claude/skills/$s
done

# Codex
for s in consultant brand-system deck-design-pdf deck-design-ppt; do
  ln -s "$(pwd)/$s" ~/.codex/skills/$s
done
```

Three skills carry rendering engines with their own dependencies. Install once per skill:

```sh
cd brand-system && npm install
cd ../deck-design-pdf && npm install
cd ../deck-design-ppt && npm install
```

Fonts, icons, and chart libraries are vendored inside each skill. After `npm install`, builds run with zero network dependency.

## Why the decks do not look generated

- Action titles are full-sentence conclusions, tested by reading them in sequence with every exhibit hidden. If the titles alone fail to persuade, the argument gets fixed before any pixel exists.
- Every slide must be load-bearing. If removing it leaves the argument intact, it goes.
- Charts follow firm visual DNA: restrained palettes, direct labels over legends, annotation as interpretation. No chartjunk.
- PPTX output stays fully editable. Every element is a native PowerPoint object, no image-of-a-slide shortcuts.

## Repo map

```
presentation/
├── AGENTS.md               unified agent guide (CLAUDE.md symlinks to it)
├── consultant/             analysis and storyboarding, no build engine
├── brand-system/           identity engine, renders preview PDFs
├── deck-design-pdf/        HTML-to-PDF engine, 46 exhibit examples, 7 palettes
├── deck-design-ppt/        PPTX engine, 21 patterns, slot budgets
├── docs/                   GitHub Pages landing
├── generate-previews.js    exhibit preview QA bench
└── verify.js               behavior journal, 26 executable checks
```

## For agents and maintainers

Root `AGENTS.md` is the single maintainer guide: repository rules, cross-skill contracts, per-skill notes. Skill folders contain only their runtime surface. Per-skill backlogs live in `TODO.md` where present.

`node verify.js` runs the behavior journal: executable checks that lock current behavior, from doc-link integrity and handoff round trips to two real deck builds. Run it before and after changes. Regenerate exhibit previews with `node generate-previews.js` after touching examples or vendored chart libraries.

## License

MIT
