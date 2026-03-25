/**
 * C05 Section Divider — dark interstitial between sections.
 *
 * data: { sectionLabel?, sectionNum, title }
 */
const G = require('../grid');

module.exports = function(slide, pptx, data, theme) {
  const contentH = 1.9;
  const startY = G.centerSlideY(contentH);

  // Accent bar
  slide.addShape(pptx.ShapeType.rect, {
    x: G.marginL, y: startY, w: 0.8, h: 0.04,
    fill: { color: theme.accent },
  });

  // Section label
  slide.addText(data.sectionLabel || 'SECTION', {
    x: G.marginL, y: startY + 0.15, w: 3, h: 0.2,
    fontSize: 9, fontFace: theme.font, color: theme.textFine, charSpacing: 3,
  });

  // Section number
  slide.addText(data.sectionNum, {
    x: G.marginL, y: startY + 0.35, w: 1.5, h: 0.5,
    fontSize: 42, fontFace: theme.fontDisplay, color: 'FFFFFF', bold: true,
  });

  // Title
  slide.addText(data.title, {
    x: G.marginL, y: startY + 1.05, w: 5, h: 0.65,
    fontSize: 24, fontFace: theme.fontDisplay, color: 'FFFFFF',
    bold: true, lineSpacingMultiple: 1.2, fit: 'shrink', valign: 'top',
  });
};
