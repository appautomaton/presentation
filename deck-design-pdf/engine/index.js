/**
 * Deck Design PDF — Master Builder
 *
 * All assets are vendored locally — no CDN, no network dependency.
 *
 * Usage:
 *   const { createDeck } = require('./skills/deck-design-pdf/engine');
 *
 *   createDeck({
 *     palette: 'consulting-mckinsey',
 *     slides: [`<div>...</div>`, `<div>...</div>`],
 *     output: 'output/deck.pdf',
 *     title: 'Strategy Presentation',
 *   });
 */

const fs = require('fs');
const path = require('path');
const { renderPDF } = require('./render');

// ── Paths ────────────────────────────────────────────────────────────
const SKILL_ROOT   = path.join(__dirname, '..');
const VENDOR_DIR   = path.join(SKILL_ROOT, 'vendor');
const PALETTES_DIR = path.join(SKILL_ROOT, 'palettes');
const FONTS_DIR    = path.join(VENDOR_DIR, 'fonts');

// ── Static assets (read once at require time) ────────────────────────
const CANVAS_CSS   = fs.readFileSync(path.join(__dirname, 'canvas.css'), 'utf8');

// JS — referenced via file:// in <script src>
const ECHARTS_FILE  = path.join(VENDOR_DIR, 'echarts', 'echarts.min.js');
const TAILWIND_FILE = path.join(VENDOR_DIR, 'tailwindcss', 'tailwind.min.js');

// Font Awesome — CSS inlined with rewritten font paths
const FA_DIR = path.join(VENDOR_DIR, 'fontawesome');

// ── Font loading ─────────────────────────────────────────────────────

/**
 * Load @fontsource CSS for a font family at specified weights.
 * Rewrites relative url() paths to absolute file:// so Playwright can resolve them.
 */
function loadFontCSS(packageName, weights = [300, 400, 500, 600, 700, 800]) {
  const fontDir = path.join(FONTS_DIR, packageName);
  if (!fs.existsSync(fontDir)) return '';
  let css = '';
  for (const w of weights) {
    const file = path.join(fontDir, `${w}.css`);
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      // Rewrite url(./files/...) → url(file:///absolute/path/files/...)
      content = content.replace(/url\(\.\//g, `url(file://${fontDir}/`);
      css += content + '\n';
    }
  }
  return css;
}

/**
 * Load Font Awesome CSS with rewritten webfont paths.
 */
function loadFontAwesomeCSS() {
  const cssFile = path.join(FA_DIR, 'css', 'all.min.css');
  if (!fs.existsSync(cssFile)) return '';
  let css = fs.readFileSync(cssFile, 'utf8');
  // Rewrite ../webfonts/ → file:///absolute/path/webfonts/
  css = css.replace(/\.\.\/webfonts\//g, `file://${FA_DIR}/webfonts/`);
  return css;
}

// ── Preload all font CSS at require time ─────────────────────────────
const FONTS_CSS = [
  loadFontCSS('inter'),
  loadFontCSS('plus-jakarta-sans'),
  loadFontCSS('dm-sans'),
  loadFontCSS('source-sans-3', [300, 400, 500, 600, 700, 800, 900]),
].join('\n');

const FA_CSS = loadFontAwesomeCSS();

// ── Palette loading ──────────────────────────────────────────────────

function loadPalette(name) {
  const file = path.join(PALETTES_DIR, `${name}.css`);
  if (!fs.existsSync(file)) {
    const available = fs.readdirSync(PALETTES_DIR)
      .filter(f => f.endsWith('.css'))
      .map(f => f.replace('.css', ''));
    throw new Error(
      `Unknown palette "${name}". Available: ${available.join(', ')}`
    );
  }
  return fs.readFileSync(file, 'utf8');
}

// ── HTML assembly ────────────────────────────────────────────────────

function buildHTML(options) {
  const {
    palette,
    slides,
    title = 'Presentation',
    headExtra = '',
    width = 1280,
    height = 720,
    tier = 'document',
  } = options;

  const paletteCss = loadPalette(palette);
  const sizeCss = `:root { --slide-width: ${width}px; --slide-height: ${height}px; } @page { size: ${width}px ${height}px; margin: 0; }`;

  const slideHTML = slides
    .map((html, i) =>
      `<section class="slide" id="slide-${i + 1}">\n${html}\n</section>`
    )
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en" data-palette="${palette}" data-tier="${tier}">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>${FONTS_CSS}</style>
  <style>${FA_CSS}</style>
  <script src="file://${ECHARTS_FILE}"></script>
  <script src="file://${TAILWIND_FILE}"></script>
  <style>${sizeCss}</style>
  <style>${CANVAS_CSS}</style>
  <style>${paletteCss}</style>
  ${headExtra}
</head>
<body>
${slideHTML}
</body>
</html>`;
}

// ── Public API ───────────────────────────────────────────────────────

async function createDeck(options) {
  const { output = 'deck.pdf', slides, width = 1280, height = 720 } = options;
  const html = buildHTML(options);
  await renderPDF(html, output, { width, height });
  console.log(`Wrote: ${output} (${slides.length} slides, ${options.palette}, ${width}x${height})`);
  return output;
}

module.exports = { createDeck, buildHTML, loadPalette };
