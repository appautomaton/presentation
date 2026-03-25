/**
 * Deck Design — Master Builder
 *
 * Usage:
 *   const { createDeck } = require('./skills/deck-design-ppt/masters');
 *
 *   createDeck('consulting-mckinsey', [
 *     { pattern: 'p01-cover', data: { title: '...', subtitle: '...' } },
 *     { pattern: 'p04-scorecard', data: { title: '...', cards: [...] } },
 *     { pattern: 'c05-divider', data: { sectionNum: '02', title: '...' } },
 *   ], 'output/deck.pptx');
 */

const pptxgen = require('pptxgenjs');
const { loadTheme } = require('./theme');
const { defineLayouts } = require('./layouts');
const G = require('./grid');

// Pattern registry — maps pattern names to layout master names
const LAYOUT_MAP = {
  'p01-cover':     'COVER',
  'p08-closer':    'CLOSER',
  'c05-divider':   'DIVIDER',
  // Everything else uses CONTENT
};

// Lazy-load pattern functions
const patternCache = {};
function getPattern(name) {
  if (!patternCache[name]) {
    try {
      patternCache[name] = require(`./patterns/${name}`);
    } catch (e) {
      throw new Error(`Unknown pattern "${name}". Check masters/patterns/${name}.js exists.`);
    }
  }
  return patternCache[name];
}

/**
 * Create a deck from a palette name and slide definitions.
 *
 * @param {string} paletteName - e.g., 'consulting-mckinsey'
 * @param {Array} slides - [{ pattern: string, data: object }]
 * @param {string} outputPath - e.g., 'output/deck.pptx'
 * @returns {Promise<string>} - resolves with output path
 */
async function createDeck(paletteName, slides, outputPath) {
  const theme = loadTheme(paletteName);

  // Propagate org name from cover slide data to theme (for footer chrome)
  const coverSlide = slides.find(s => s.pattern === 'p01-cover');
  if (coverSlide && coverSlide.data && coverSlide.data.org) {
    theme.org = coverSlide.data.org;
  }

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = theme.author || 'appcubic';
  pptx.subject = theme.name ? `${theme.name} Deck` : 'Presentation';

  // Define masters
  defineLayouts(pptx, theme);

  // Build slides
  for (const slideDef of slides) {
    const masterName = LAYOUT_MAP[slideDef.pattern] || 'CONTENT';
    const slide = pptx.addSlide({ masterName });
    const patternFn = getPattern(slideDef.pattern);
    patternFn(slide, pptx, slideDef.data, theme);
  }

  // Write
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Wrote: ${outputPath} (${slides.length} slides, ${paletteName})`);
  return outputPath;
}

module.exports = { createDeck, loadTheme, G };
