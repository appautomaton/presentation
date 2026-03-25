/**
 * Layouts — defines slide masters using grid + theme.
 *
 * One function, parameterized by theme. Produces different masters
 * depending on firm style (header bar yes/no, colors, etc.).
 *
 * Masters defined:
 *   COVER   — cover/title slide
 *   CONTENT — workhorse content slide (section tag + title + body zone)
 *   DIVIDER — section break (dark background)
 *   CLOSER  — recommendation / closing slide
 */

const G = require('./grid');

/**
 * Define all slide masters on the given presentation instance.
 * @param {object} pptx - pptxgenjs presentation instance
 * @param {object} theme - theme object from theme.js
 */
function defineLayouts(pptx, theme) {

  // ── Shared chrome builders ──

  const footerChrome = [
    // Footer rule
    { rect: { x: G.marginL, y: G.footerRuleY, w: G.contentW, h: 0.007,
      fill: { color: theme.border } } },
    // Logo
    { text: { text: theme.org || '{org-name}', options: {
      x: G.marginL, y: G.footerTextY, w: 2, h: 0.18,
      fontSize: 10, fontFace: theme.font, color: theme.accent, bold: true
    } } },
  ];

  const headerBar = theme.headerBar !== false
    ? [{ rect: { x: 0, y: 0, w: G.slideW, h: G.headerH, fill: { color: theme.accent } } }]
    : [];

  const slideNumber = {
    x: G.slideW - G.marginR - 0.6, y: G.footerTextY, w: 0.6, h: 0.18,
    fontSize: 9, fontFace: theme.font, color: theme.textFine, align: 'right'
  };

  // ── COVER ──
  pptx.defineSlideMaster({
    title: 'COVER',
    background: { color: theme.canvas },
    objects: [
      ...headerBar,
      // Cover footer rule (lower than content slides)
      { rect: { x: G.marginL, y: 4.95, w: G.contentW, h: 0.007,
        fill: { color: theme.border } } },
    ],
  });

  // ── CONTENT (workhorse) ──
  pptx.defineSlideMaster({
    title: 'CONTENT',
    background: { color: theme.canvas },
    objects: [
      ...headerBar,
      ...footerChrome,
    ],
    slideNumber,
  });

  // ── DIVIDER ──
  pptx.defineSlideMaster({
    title: 'DIVIDER',
    background: { color: theme.midnight },
    objects: [],
  });

  // ── CLOSER ──
  pptx.defineSlideMaster({
    title: 'CLOSER',
    background: { color: theme.canvas },
    objects: [
      ...headerBar,
      ...footerChrome,
    ],
  });
}

module.exports = { defineLayouts };
