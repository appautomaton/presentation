/**
 * Deck Design PDF — Playwright Renderer
 *
 * Takes an HTML string, writes to temp file, renders to PDF via Chromium.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { chromium } = require('playwright');

/**
 * Render an HTML string to a PDF file.
 *
 * @param {string} html       - Full HTML document string
 * @param {string} outputPath - Where to write the PDF
 * @param {object} [options]
 * @param {number} [options.width=1280]   - Slide width in px
 * @param {number} [options.height=720]   - Slide height in px
 * @returns {Promise<string>} - Resolved output path
 */
async function renderPDF(html, outputPath, options = {}) {
  const { width = 1280, height = 720 } = options;

  // Write HTML to a temp file so Playwright can load it as file://
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'deck-pdf-'));
  const tmpFile = path.join(tmpDir, 'deck.html');
  fs.writeFileSync(tmpFile, html, 'utf8');

  // Ensure output directory exists
  const outDir = path.dirname(path.resolve(outputPath));
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ media: 'screen' });
    await page.goto(`file://${tmpFile}`, { waitUntil: 'networkidle' });

    // Wait for web fonts to finish loading
    await page.evaluate(() => document.fonts.ready);

    await page.pdf({
      path: path.resolve(outputPath),
      width: `${width}px`,
      height: `${height}px`,
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      scale: 1,
    });
  } finally {
    await browser.close();
  }

  // Cleanup temp files
  try { fs.unlinkSync(tmpFile); } catch {}
  try { fs.rmdirSync(tmpDir); } catch {}

  return outputPath;
}

module.exports = { renderPDF };
