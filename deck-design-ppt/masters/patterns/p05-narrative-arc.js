/**
 * P05 Narrative Arc — timeline / progression.
 *
 * data: {
 *   sectionTag?, title,
 *   milestones: [{ label, year, description, highlight? }],
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const items = data.milestones || [];
  const count = items.length;
  const lineY = frame.centerY(0) + 0.2;
  const startX = G.marginL + 0.5;
  const endX = G.marginL + G.contentW - 0.5;
  const span = endX - startX;

  // Timeline line
  slide.addShape(pptx.ShapeType.rect, {
    x: startX, y: lineY, w: span, h: 0.025, fill: { color: theme.border },
  });

  items.forEach((m, i) => {
    const x = startX + (i / (count - 1)) * span;

    // Dot
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x - 0.08, y: lineY - 0.06, w: 0.16, h: 0.16,
      fill: { color: m.highlight ? theme.accent : theme.border },
    });

    // Year above
    slide.addText(m.year || '', {
      x: x - 0.5, y: lineY - 0.4, w: 1, h: 0.25,
      fontSize: 10, fontFace: theme.font, color: m.highlight ? theme.accent : theme.textSec,
      bold: true, align: 'center',
    });

    // Label + description below
    slide.addText(m.label, {
      x: x - 0.7, y: lineY + 0.25, w: 1.4, h: 0.2,
      fontSize: 10, fontFace: theme.font, color: m.highlight ? theme.accent : theme.text,
      bold: true, align: 'center', fit: 'shrink',
    });
    if (m.description) {
      slide.addText(m.description, {
        x: x - 0.7, y: lineY + 0.48, w: 1.4, h: 0.5,
        fontSize: 9, fontFace: theme.font, color: theme.textSec,
        align: 'center', valign: 'top', lineSpacingMultiple: 1.15, fit: 'shrink',
      });
    }
  });

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
