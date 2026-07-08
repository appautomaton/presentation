/**
 * Generate JPG previews for all deck-design-pdf example exhibits.
 *
 * For each example, renders two images:
 *   {id}.jpg       — at reference size (540×540)
 *   {id}-min.jpg   — at floor size (300×300)
 *
 * Output goes next to the .js files in the skill's examples/ folder.
 *
 * Usage: node presentation/generate-previews.js [--all] [example-id]
 *   No args       = all examples at reference size (540×540)
 *   --all         = generate all sizes (720, 540, 300)
 *   example-id    = regenerate one example only
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_ROOT = path.join(os.homedir(), '.claude', 'skills', 'deck-design-pdf');
const { chromium } = require(path.join(SKILL_ROOT, 'node_modules', 'playwright'));
const EXAMPLES_DIR = path.join(SKILL_ROOT, 'examples');
const ENGINE_ROOT = path.join(SKILL_ROOT, 'engine');
const VENDOR_DIR = path.join(SKILL_ROOT, 'vendor');
const PALETTES_DIR = path.join(SKILL_ROOT, 'palettes');
const FONTS_DIR = path.join(VENDOR_DIR, 'fonts');
const FA_DIR = path.join(VENDOR_DIR, 'fontawesome');
const PREVIEW_DIR = EXAMPLES_DIR;

const {
  DEFAULT_CHART_RANGE,
  REFERENCE_EXHIBIT,
  getSizeTokens,
  renderStandaloneExhibit,
} = require(path.join(EXAMPLES_DIR, '_shared'));

// ── Asset loading (mirrors engine/index.js) ──────────────────────────

const CANVAS_CSS = fs.readFileSync(path.join(ENGINE_ROOT, 'canvas.css'), 'utf8');
const ECHARTS_FILE = path.join(VENDOR_DIR, 'echarts', 'echarts.min.js');
const TAILWIND_FILE = path.join(VENDOR_DIR, 'tailwindcss', 'tailwind.min.js');

// ── HTML builder ─────────────────────────────────────────────────────

function buildPreviewHTML(exhibitHTML, width, height) {
  const sizeCss = `:root { --slide-width: ${width}px; --slide-height: ${height}px; }`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <script src="file://${ECHARTS_FILE}"></script>
  <script src="file://${TAILWIND_FILE}"></script>
  <style>${sizeCss}</style>
  <style>${CANVAS_CSS}</style>
</head>
<body style="margin:0;padding:0;width:${width}px;height:${height}px;overflow:hidden;">
  <section style="width:${width}px;height:${height}px;">
    ${exhibitHTML}
  </section>
</body>
</html>`;
}

// ── Render to JPG ────────────────────────────────────────────────────

async function renderJPG(html, outputPath, width, height) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-preview-'));
  const tmpFile = path.join(tmpDir, 'preview.html');
  fs.writeFileSync(tmpFile, html, 'utf8');

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ media: 'screen' });
    await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 80,
      clip: { x: 0, y: 0, width, height },
    });
  } finally {
    await browser.close();
  }

  try { fs.unlinkSync(tmpFile); } catch {}
  try { fs.rmdirSync(tmpDir); } catch {}
}

// ── Main ─────────────────────────────────────────────────────────────

async function generatePreviews(filterId, generateAll) {
  // Discover all example files
  const exampleFiles = fs.readdirSync(EXAMPLES_DIR)
    .filter(f => f.endsWith('.js') && f !== '_shared.js')
    .sort();

  const allSizes = [
    { suffix: '-large', width: 720, height: 720 },      // 720×720
    { suffix: '',     ...REFERENCE_EXHIBIT },            // 540×540
    { suffix: '-min', ...DEFAULT_CHART_RANGE.floor },    // 300×300
  ];
  const defaultSizes = [
    { suffix: '',     ...REFERENCE_EXHIBIT },            // 540×540
  ];
  const sizes = generateAll ? allSizes : defaultSizes;

  let count = 0;
  for (const file of exampleFiles) {
    const example = require(path.join(EXAMPLES_DIR, file));
    if (filterId && example.id !== filterId) continue;

    const effectiveSizes = sizes.filter(s => !example.minSize || s.width >= example.minSize);
    for (const size of effectiveSizes) {
      const tier = example.tier === 1 ? 'presentation' : 'document';
      const tokens = getSizeTokens(size.width, size.height, tier);
      const context = { checkpoint: size.suffix ? 'floor' : 'reference', width: size.width, height: size.height, tokens };
      const exhibitHTML = renderStandaloneExhibit(example, context);
      const html = buildPreviewHTML(exhibitHTML, size.width, size.height);
      const outFile = path.join(PREVIEW_DIR, `${example.id}${size.suffix}.jpg`);
      await renderJPG(html, outFile, size.width, size.height);
      count++;
      process.stdout.write(`  ${example.id}${size.suffix}.jpg\n`);
    }
  }

  console.log(`\nGenerated ${count} previews in ${PREVIEW_DIR}`);
}

const args = process.argv.slice(2);
const generateAll = args.includes('--all');
const filterArg = args.find(a => a !== '--all') || null;
generatePreviews(filterArg, generateAll).catch(err => {
  console.error(err);
  process.exit(1);
});
