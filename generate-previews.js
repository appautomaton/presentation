/**
 * Generate JPG previews for all deck-design-pdf example exhibits.
 *
 * Each example is self-contained: it exports renderExhibit({ tokens }) where
 * tokens = { width, height }, and returns a full HTML string (markup + inline
 * ECharts init script). No shared token module is required.
 *
 * For each example, renders:
 *   {id}.jpg       — at reference size (540×540)
 *   {id}-min.jpg   — at floor size (300×300)      (--all only)
 *   {id}-large.jpg — at 720×720                    (--all only)
 *
 * Output goes next to the .js files in the skill's examples/ folder.
 *
 * Usage: node generate-previews.js [--all] [example-id]
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
const PREVIEW_DIR = EXAMPLES_DIR;

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

// ── Main ─────────────────────────────────────────────────────────────

async function generatePreviews(filterId, generateAll) {
  const exampleFiles = fs.readdirSync(EXAMPLES_DIR)
    .filter(f => f.endsWith('.js'))
    .sort();

  const allSizes = [
    { suffix: '-large', width: 720, height: 720 },
    { suffix: '', width: 540, height: 540 },
    { suffix: '-min', width: 300, height: 300 },
  ];
  const defaultSizes = [
    { suffix: '', width: 540, height: 540 },
  ];
  const sizes = generateAll ? allSizes : defaultSizes;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-preview-'));
  const browser = await chromium.launch();
  let count = 0;

  try {
    const page = await browser.newPage();
    await page.emulateMedia({ media: 'screen' });

    for (const file of exampleFiles) {
      const example = require(path.join(EXAMPLES_DIR, file));
      if (filterId && example.id !== filterId) continue;
      if (typeof example.renderExhibit !== 'function') continue;

      const effectiveSizes = sizes.filter(s => !example.minSize || s.width >= example.minSize);
      for (const size of effectiveSizes) {
        const tokens = { width: size.width, height: size.height };
        const exhibitHTML = example.renderExhibit({ tokens });
        const html = buildPreviewHTML(exhibitHTML, size.width, size.height);

        const tmpFile = path.join(tmpDir, 'preview.html');
        fs.writeFileSync(tmpFile, html, 'utf8');

        await page.setViewportSize({ width: size.width, height: size.height });
        await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);

        const outFile = path.join(PREVIEW_DIR, `${example.id}${size.suffix}.jpg`);
        await page.screenshot({
          path: outFile,
          type: 'jpeg',
          quality: 80,
          clip: { x: 0, y: 0, width: size.width, height: size.height },
        });
        count++;
        process.stdout.write(`  ${example.id}${size.suffix}.jpg\n`);
      }
    }
  } finally {
    await browser.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
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
