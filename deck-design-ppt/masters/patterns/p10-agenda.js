/**
 * P10 Agenda — section list with active highlight.
 *
 * data: {
 *   title?,
 *   items: [{ num, title, page?, active? }],
 * }
 */
const G = require('../grid');
const { drawContentHeader } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, { title: data.title || 'Agenda' }, theme, {
    titleFontSize: 22,
    titleLineH: 0.28,
    titleMinH: 0.4,
  });

  // Items
  const items = data.items || [];
  const itemH = 0.52;
  const totalH = items.length * itemH;
  const startY = frame.centerY(totalH);

  items.forEach((item, i) => {
    const y = startY + i * itemH;

    // Active highlight
    if (item.active) {
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y, w: G.contentW, h: itemH,
        fill: { color: theme.mist },
      });
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y, w: 0.05, h: itemH,
        fill: { color: theme.accent },
      });
    }

    // Bottom rule
    slide.addShape(pptx.ShapeType.rect, {
      x: G.marginL, y: y + itemH - 0.007, w: G.contentW, h: 0.007,
      fill: { color: theme.border },
    });

    // Number
    slide.addText(item.num, {
      x: G.marginL + 0.15, y, w: 0.5, h: itemH,
      fontSize: 14, fontFace: theme.font,
      color: item.active ? theme.accent : theme.textFine,
      bold: true, valign: 'middle', fit: 'shrink',
    });

    // Title
    slide.addText(item.title, {
      x: G.marginL + 0.7, y, w: 6, h: itemH,
      fontSize: 14, fontFace: theme.font,
      color: item.active ? theme.accent : theme.textSec,
      bold: item.active, valign: 'middle', fit: 'shrink',
    });

    // Page number
    if (item.page) {
      slide.addText(item.page, {
        x: G.marginL + G.contentW - 0.8, y, w: 0.8, h: itemH,
        fontSize: 12, fontFace: theme.font,
        color: item.active ? theme.accent : theme.textFine,
        bold: item.active, align: 'right', valign: 'middle', fit: 'shrink',
      });
    }
  });
};
