/**
 * html2pptx — render an HTML file to a slide background image.
 *
 * Takes an HTML file, screenshots it via playwright-core + system Chrome,
 * and places the screenshot as a background image on a new pptx slide.
 * Returns { slide } so native pptx elements can be layered on top.
 *
 * Usage:
 *   const { slide } = await html2pptx(htmlPath, pptx, { tmpDir });
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

async function html2pptx(htmlPath, pptx, options = {}) {
  const tmpDir = options.tmpDir || require('os').tmpdir();
  const screenshotPath = path.join(tmpDir, 'slide-bg.png');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });

  const fileUrl = `file://${path.resolve(htmlPath)}`;
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  await page.screenshot({ path: screenshotPath, fullPage: false });
  await browser.close();

  const slide = pptx.addSlide();
  slide.addImage({
    path: screenshotPath,
    x: 0, y: 0, w: 10, h: 5.625,
  });

  return { slide };
}

module.exports = html2pptx;
