/**
 * Brand System — Lightweight PDF renderer
 *
 * Renders HTML to PDF via Playwright. No Tailwind, no ECharts, no vendored fonts.
 * Uses Google Fonts via CDN and plain CSS for color swatches and font specimens.
 *
 * Intermediate HTML is written to system tmp and cleaned up after rendering.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { chromium } = require('playwright');

const TMP_DIR = path.join(os.tmpdir(), 'brand-system');

function ensureTmpDir() {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }
}

async function renderPDF(html, outputPath, options = {}) {
  const { width = 1280, height = 720, slug = 'preview' } = options;

  // Write intermediate HTML to system tmp
  ensureTmpDir();
  const tmpHtml = path.join(TMP_DIR, `${slug}-preview.html`);
  fs.writeFileSync(tmpHtml, html, 'utf8');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewportSize({ width, height });
  await page.emulateMedia({ media: 'screen', colorScheme: 'light' });

  // Load from file:// so relative paths resolve if needed
  await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' });

  // Wait for Google Fonts to load
  await page.waitForTimeout(800);

  await page.pdf({
    path: outputPath,
    width: `${width}px`,
    height: `${height}px`,
    printBackground: true,
    preferCSSPageSize: false,
  });

  await browser.close();

  // Clean up intermediate HTML
  try { fs.unlinkSync(tmpHtml); } catch (_) {}
}

module.exports = { renderPDF };
