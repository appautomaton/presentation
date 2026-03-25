/**
 * P01 Cover — title slide.
 *
 * data: { title, subtitle?, scope?, org?, location?, date?, confidentiality? }
 */
const G = require('../grid');

module.exports = function(slide, pptx, data, theme) {
  const contentH = 2.4;
  const zoneH = 4.55; // 4.95 footer - 0.4 top
  const startY = 0.4 + (zoneH - contentH) / 2;

  // Title
  slide.addText(data.title, {
    x: G.marginL, y: startY, w: G.contentW, h: 1.1,
    fontSize: 32, fontFace: theme.fontDisplay, color: theme.accent,
    bold: true, lineSpacingMultiple: 1.4, fit: 'shrink', valign: 'top',
  });

  // Subtitle
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: G.marginL, y: startY + 1.3, w: G.contentW, h: 0.3,
      fontSize: 16, fontFace: theme.font, color: theme.text, fit: 'shrink',
    });
  }

  // Scope
  if (data.scope) {
    slide.addText(data.scope, {
      x: G.marginL, y: startY + 1.75, w: 7, h: 0.25,
      fontSize: 11, fontFace: theme.font, color: theme.textSec, fit: 'shrink',
    });
  }

  // Footer
  slide.addText(data.org || '{org-name}', {
    x: G.marginL, y: 5.05, w: 2, h: 0.2,
    fontSize: 11, fontFace: theme.font, color: theme.accent, bold: true,
  });
  if (data.location || data.date) {
    const loc = [data.location, data.date].filter(Boolean).join(' — ');
    slide.addText(loc, {
      x: G.marginL, y: 5.25, w: 3, h: 0.18,
      fontSize: 9, fontFace: theme.font, color: theme.textFine,
    });
  }
  if (data.confidentiality) {
    slide.addText(data.confidentiality, {
      x: 7.5, y: 5.05, w: 2, h: 0.2,
      fontSize: 8, fontFace: theme.font, color: theme.textFine,
      align: 'right', charSpacing: 1.5,
    });
  }
};
