#!/usr/bin/env node
/**
 * verify.js — behavior journal for the presentation skills repo.
 *
 * Every check asserts something the system does TODAY. When a check fails,
 * either the behavior regressed (fix the code) or the behavior deliberately
 * changed (update the check in the same commit). Checks include the exact
 * regression classes found in the 2026-07 audit: dead-API references in docs,
 * palettes invisible to the router, version claims drifting from vendor
 * reality, and handoff contracts with a producer but no consumer.
 *
 * Usage:
 *   node verify.js            all checks, including two real deck builds
 *   node verify.js --quick    skip the Playwright/pptxgenjs build checks
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const QUICK = process.argv.includes('--quick');

// Expected inventory. Update these constants when deliberately adding
// examples, palettes, or patterns. A mismatch means either an unregistered
// addition or an accidental deletion.
const EXPECTED = {
  pdfExamples: 46,
  pdfPalettes: 7,
  pptPatterns: 21,
  identityStyles: ['institutional', 'modern', 'dark', 'bento', 'editorial', 'data-forward'],
  pptThemes: ['consulting-mckinsey', 'consulting-bcg', 'consulting-bain', 'founder', 'sequoia'],
  pptThemeKeys: ['accent', 'canvas', 'text', 'textSec', 'textFine', 'font', 'fontDisplay'],
};

let pass = 0;
let fail = 0;

function group(title) {
  console.log(`\n${title}`);
}

function check(name, fn) {
  try {
    const detail = fn();
    pass++;
    console.log(`  ok   ${name}${detail ? `  (${detail})` : ''}`);
  } catch (e) {
    fail++;
    console.log(`  FAIL ${name}`);
    console.log(`       ${e.message}`);
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function read(p) {
  return fs.readFileSync(path.join(ROOT, p), 'utf8');
}

// ── 1. Doc integrity: every relative link in every SKILL.md resolves ──

group('doc integrity');

const SKILLS = ['consultant', 'brand-system', 'deck-design-pdf', 'deck-design-ppt'];

for (const skill of SKILLS) {
  check(`${skill}/SKILL.md relative links resolve`, () => {
    const text = read(`${skill}/SKILL.md`);
    const links = [...text.matchAll(/\]\(([^)]+)\)/g)]
      .map(m => m[1])
      .filter(l => !l.startsWith('http') && !l.startsWith('#') && !l.startsWith('mailto'));
    const broken = links.filter(l => {
      const target = l.split('#')[0];
      return target && !fs.existsSync(path.join(ROOT, skill, target));
    });
    assert(broken.length === 0, `broken links: ${broken.join(', ')}`);
    return `${links.length} links`;
  });
}

check('AGENTS.md exists and CLAUDE.md symlinks to it', () => {
  assert(fs.existsSync(path.join(ROOT, 'AGENTS.md')), 'AGENTS.md missing');
  const link = fs.lstatSync(path.join(ROOT, 'CLAUDE.md'));
  assert(link.isSymbolicLink(), 'CLAUDE.md is not a symlink');
  assert(fs.readlinkSync(path.join(ROOT, 'CLAUDE.md')) === 'AGENTS.md', 'CLAUDE.md points elsewhere');
});

check('no CLAUDE.md or AGENTS.md inside skill folders', () => {
  const offenders = SKILLS.flatMap(s =>
    ['CLAUDE.md', 'AGENTS.md'].filter(f => fs.existsSync(path.join(ROOT, s, f))).map(f => `${s}/${f}`)
  );
  assert(offenders.length === 0, `found: ${offenders.join(', ')}`);
});

// ── 2. deck-design-pdf: example module contract ──────────────────────

group('deck-design-pdf: examples');

const EXAMPLES_DIR = path.join(ROOT, 'deck-design-pdf', 'examples');
const exampleFiles = fs.readdirSync(EXAMPLES_DIR).filter(f => f.endsWith('.js')).sort();

check(`example count matches inventory`, () => {
  assert(exampleFiles.length === EXPECTED.pdfExamples,
    `expected ${EXPECTED.pdfExamples}, found ${exampleFiles.length}`);
  return `${exampleFiles.length} modules`;
});

check('no shared helper module (self-contained doctrine)', () => {
  assert(!fs.existsSync(path.join(EXAMPLES_DIR, '_shared.js')), '_shared.js exists again');
});

check('every example exports the contract and renders', () => {
  const bad = [];
  for (const file of exampleFiles) {
    try {
      const ex = require(path.join(EXAMPLES_DIR, file));
      if (!ex.id || !ex.title || typeof ex.renderExhibit !== 'function') {
        bad.push(`${file}: missing id/title/renderExhibit`);
        continue;
      }
      const width = Math.max(540, ex.minSize || 0);
      const html = ex.renderExhibit({ tokens: { width, height: 540 } });
      if (typeof html !== 'string' || html.length < 100) bad.push(`${file}: render too small`);
    } catch (e) {
      bad.push(`${file}: ${e.message}`);
    }
  }
  assert(bad.length === 0, bad.slice(0, 5).join(' | '));
  return `${exampleFiles.length} rendered`;
});

check('docs do not teach the dead _shared.js API', () => {
  const docs = ['SKILL.md', 'build-reference.md', 'chart-taxonomy.md', 'README.md'];
  const offenders = docs.filter(d => {
    const t = read(`deck-design-pdf/${d}`);
    return /_shared|tokens\.adapt|getFigureTypography|getChartChrome|responsiveSpec/.test(t);
  });
  assert(offenders.length === 0, `stale API taught in: ${offenders.join(', ')}`);
});

// ── 3. deck-design-pdf: palettes and router visibility ────────────────

group('deck-design-pdf: palettes');

const PALETTES_DIR = path.join(ROOT, 'deck-design-pdf', 'palettes');
const paletteNames = fs.readdirSync(PALETTES_DIR)
  .filter(f => f.endsWith('.css'))
  .map(f => f.replace('.css', ''))
  .sort();

check('palette count matches inventory', () => {
  assert(paletteNames.length === EXPECTED.pdfPalettes,
    `expected ${EXPECTED.pdfPalettes}, found ${paletteNames.length}: ${paletteNames.join(', ')}`);
  return paletteNames.length + ' palettes';
});

check('every palette loads and defines the core tokens', () => {
  const { loadPalette } = require(path.join(ROOT, 'deck-design-pdf', 'engine'));
  const required = ['--accent', '--surface', '--text', '--font-heading', '--font-body'];
  const bad = [];
  for (const name of paletteNames) {
    const css = loadPalette(name);
    const missing = required.filter(t => !css.includes(t));
    if (missing.length) bad.push(`${name}: missing ${missing.join(', ')}`);
  }
  assert(bad.length === 0, bad.join(' | '));
});

check('every palette on disk is routed in SKILL.md (router visibility)', () => {
  const skillmd = read('deck-design-pdf/SKILL.md');
  const invisible = paletteNames.filter(n => !skillmd.includes(n));
  assert(invisible.length === 0, `not routed: ${invisible.join(', ')}`);
});

check('version claims match vendored ECharts', () => {
  const vendored = read('deck-design-pdf/vendor/echarts/echarts.min.js');
  const m = vendored.match(/version\s*[:=]\s*["']([\d.]+)["']/);
  assert(m, 'cannot find version string in vendored echarts');
  const major = m[1].split('.')[0];
  for (const doc of ['SKILL.md', 'build-reference.md']) {
    const t = read(`deck-design-pdf/${doc}`);
    assert(t.includes(`ECharts ${major}`), `${doc} does not claim ECharts ${major}`);
    assert(!/ECharts [0-9]/.test(t.replace(new RegExp(`ECharts ${major}`, 'g'), '')),
      `${doc} claims a different ECharts major`);
  }
  return `vendored ${m[1]}`;
});

// ── 4. Identity handoff: brand-system → both deck skills ─────────────

group('identity handoff (brand-system → deck skills)');

check('pdf intake: toCSS output round-trips through loadPalette', () => {
  const { loadPalette } = require(path.join(ROOT, 'deck-design-pdf', 'engine'));
  const name = 'verify-smoke-identity';
  const css = `[data-palette="${name}"] { --accent: #C6613F; --surface: #FAF9F5; --text: #141413; }`;
  const file = path.join(PALETTES_DIR, `${name}.css`);
  fs.writeFileSync(file, css);
  try {
    assert(loadPalette(name).includes('#C6613F'), 'loaded palette missing identity value');
  } finally {
    fs.unlinkSync(file);
  }
});

check('ppt intake: THEMES registration round-trips through loadTheme', () => {
  const { THEMES, loadTheme } = require(path.join(ROOT, 'deck-design-ppt', 'masters', 'theme'));
  const name = 'verify-smoke-identity';
  THEMES[name] = {
    name: 'Smoke', accent: 'C6613F', canvas: 'FAF9F5', mist: 'F0EEE6', midnight: '141413',
    text: '141413', textSec: '5E5D59', textFine: '87867F', border: 'E3DACC',
    positive: '788C5D', caution: 'D4A843', negative: 'B66A5C',
    font: 'Arial', fontDisplay: 'Arial', headerBar: true,
  };
  try {
    const t = loadTheme(name);
    assert(t.accent === 'C6613F', 'registered theme not returned');
    t.accent = 'MUTATED';
    assert(THEMES[name].accent === 'C6613F', 'loadTheme does not return a copy');
  } finally {
    delete THEMES[name];
  }
});

check('style enum is consistent across producer and consumers', () => {
  const brand = read('brand-system/SKILL.md');
  const pdf = read('deck-design-pdf/SKILL.md');
  const ppt = read('deck-design-ppt/SKILL.md');
  for (const style of EXPECTED.identityStyles) {
    assert(brand.includes(style), `brand-system SKILL.md missing style "${style}"`);
    assert(pdf.includes(style), `deck-design-pdf SKILL.md missing style "${style}"`);
    assert(ppt.includes(style), `deck-design-ppt SKILL.md missing style "${style}"`);
  }
  return `${EXPECTED.identityStyles.length} styles`;
});

check('both deck skills document an identity intake', () => {
  assert(/identity intake/i.test(read('deck-design-pdf/SKILL.md')), 'pdf intake section missing');
  assert(/identity intake/i.test(read('deck-design-ppt/SKILL.md')), 'ppt intake section missing');
});

// ── 5. deck-design-ppt: themes, patterns, router visibility ──────────

group('deck-design-ppt: themes and patterns');

check('built-in themes present with core keys', () => {
  const { THEMES } = require(path.join(ROOT, 'deck-design-ppt', 'masters', 'theme'));
  for (const name of EXPECTED.pptThemes) {
    assert(THEMES[name], `theme missing: ${name}`);
    const missing = EXPECTED.pptThemeKeys.filter(k => !(k in THEMES[name]));
    assert(missing.length === 0, `${name} missing keys: ${missing.join(', ')}`);
  }
  return `${EXPECTED.pptThemes.length} themes`;
});

const PATTERNS_DIR = path.join(ROOT, 'deck-design-ppt', 'masters', 'patterns');
const patternNames = fs.readdirSync(PATTERNS_DIR)
  .filter(f => f.endsWith('.js'))
  .map(f => f.replace('.js', ''))
  .sort();

check('pattern count matches inventory', () => {
  assert(patternNames.length === EXPECTED.pptPatterns,
    `expected ${EXPECTED.pptPatterns}, found ${patternNames.length}`);
  return `${patternNames.length} patterns`;
});

check('every pattern is a function with a slot budget file', () => {
  const bad = [];
  for (const name of patternNames) {
    const fn = require(path.join(PATTERNS_DIR, name));
    if (typeof fn !== 'function') bad.push(`${name}: not a function`);
    if (!fs.existsSync(path.join(PATTERNS_DIR, `${name}.slots.md`))) bad.push(`${name}: no slots.md`);
  }
  assert(bad.length === 0, bad.join(' | '));
});

check('every pattern on disk is routed in SKILL.md (router visibility)', () => {
  const skillmd = read('deck-design-ppt/SKILL.md');
  const invisible = patternNames.filter(n => !skillmd.includes(n));
  assert(invisible.length === 0, `not routed: ${invisible.join(', ')}`);
});

// ── 6. brand-system: engine and style token contract ─────────────────

group('brand-system: engine');

check('engine exports createPreview', () => {
  const engine = require(path.join(ROOT, 'brand-system', 'engine'));
  assert(typeof engine.createPreview === 'function', 'createPreview not exported');
});

check('style tokens exist for every enum value', () => {
  const { getStyleTokens } = require(path.join(ROOT, 'brand-system', 'engine', 'styles'));
  for (const style of EXPECTED.identityStyles) {
    const tokens = getStyleTokens(style);
    assert(tokens && tokens['--radius'] !== undefined, `no tokens for style "${style}"`);
  }
  return `${EXPECTED.identityStyles.length} styles`;
});

// ── 7. Full builds (skipped with --quick) ────────────────────────────

async function checkAsync(name, fn) {
  try {
    const detail = await fn();
    pass++;
    console.log(`  ok   ${name}${detail ? `  (${detail})` : ''}`);
  } catch (e) {
    fail++;
    console.log(`  FAIL ${name}`);
    console.log(`       ${e.message}`);
  }
}

async function builds() {
  group(QUICK ? 'builds (skipped: --quick)' : 'builds');
  if (QUICK) return;

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'verify-'));

  await checkAsync('deck-design-pdf builds a real PDF', async () => {
    const { createDeck } = require(path.join(ROOT, 'deck-design-pdf', 'engine'));
    const out = path.join(tmp, 'verify.pdf');
    await createDeck({
      palette: 'consulting-mckinsey',
      title: 'Verify',
      output: out,
      slides: [
        `<div class="flex items-center justify-center h-full"><h1 class="text-5xl font-bold text-[var(--text)]">Verify</h1></div>`,
        `<div class="flex items-center justify-center h-full"><p class="text-base text-[var(--text-muted)]">Behavior journal build check</p></div>`,
      ],
    });
    const head = fs.readFileSync(out).subarray(0, 5).toString();
    assert(head === '%PDF-', `output is not a PDF (starts "${head}")`);
  });

  await checkAsync('deck-design-ppt builds a real PPTX', async () => {
    const { createDeck } = require(path.join(ROOT, 'deck-design-ppt', 'masters'));
    const out = path.join(tmp, 'verify.pptx');
    await createDeck('consulting-mckinsey', [
      { pattern: 'p01-cover', data: { title: 'Verify', subtitle: 'Behavior journal', org: 'Verify' } },
      { pattern: 'p08-closer', data: { title: 'Done', body: 'Build check complete.', nextSteps: ['Ship it'] } },
    ], out);
    const head = fs.readFileSync(out).subarray(0, 2).toString();
    assert(head === 'PK', `output is not a PPTX/zip (starts "${head}")`);
  });

  fs.rmSync(tmp, { recursive: true, force: true });
}

builds().then(() => {
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
});
