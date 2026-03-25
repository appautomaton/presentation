/**
 * P04 Scorecard — 4–6 KPI metric cards in a grid.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   cards: [{ label, value, trend?, benchmark?, statusColor? }],
 *   assessment?, source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  // Cards
  const cards = data.cards || [];
  const cols = Math.min(cards.length, 3);
  const rows = Math.ceil(cards.length / cols);
  const cardW = 2.8, cardH = 1.55, gapX = 0.1, gapY = 0.12;
  const gridW = cols * cardW + (cols - 1) * gapX;
  const gridH = rows * cardH + (rows - 1) * gapY;
  const assessTextH = data.assessment
    ? estimateTextHeight(data.assessment, {
        charsPerLine: 118,
        lineH: 0.15,
        padding: 0.04,
        minH: 0.22,
      })
    : 0;
  const assessH = data.assessment ? assessTextH + 0.16 : 0;
  const startY = Math.max(frame.bodyY + 0.05, frame.centerY(gridH + assessH));
  const startX = G.marginL + (G.contentW - gridW) / 2;

  cards.forEach((card, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = startX + col * (cardW + gapX);
    const y = startY + row * (cardH + gapY);

    // Card background
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: cardW, h: cardH, fill: { color: theme.mist }, rectRadius: 0.02,
    });

    // Status dot
    if (card.statusColor) {
      slide.addShape(pptx.ShapeType.ellipse, {
        x: x + 0.12, y: y + 0.12, w: 0.1, h: 0.1,
        fill: { color: card.statusColor },
      });
    }

    // Label
    slide.addText(card.label, {
      x: x + (card.statusColor ? 0.3 : 0.12), y: y + 0.08, w: cardW - 0.42, h: 0.2,
      fontSize: 11, fontFace: theme.font, color: theme.text, bold: true,
      margin: 0, fit: 'shrink',
    });

    // Value
    slide.addText(card.value, {
      x: x + 0.12, y: y + 0.35, w: cardW - 0.24, h: 0.4,
      fontSize: 28, fontFace: theme.fontDisplay, color: theme.accent, bold: true,
      margin: 0, fit: 'shrink',
    });

    // Trend
    if (card.trend) {
      slide.addText(card.trend, {
        x: x + 0.12, y: y + 0.8, w: cardW - 0.24, h: 0.2,
        fontSize: 10, fontFace: theme.font, color: theme.textSec,
        margin: 0, fit: 'shrink',
      });
    }

    // Benchmark
    if (card.benchmark) {
      slide.addText(card.benchmark, {
        x: x + 0.12, y: y + 1.02, w: cardW - 0.24, h: 0.2,
        fontSize: 9, fontFace: theme.font, color: theme.textFine, italic: true,
        margin: 0, fit: 'shrink',
      });
    }
  });

  // Assessment
  if (data.assessment) {
    const assessY = startY + gridH + 0.15;
    slide.addShape(pptx.ShapeType.rect, {
      x: G.marginL, y: assessY, w: G.contentW, h: 0.007,
      fill: { color: theme.border },
    });
    slide.addText(data.assessment, {
      x: G.marginL, y: assessY + 0.08, w: G.contentW, h: assessTextH,
      fontSize: 10, fontFace: theme.font, color: theme.text, valign: 'top',
      margin: 0, fit: 'shrink',
    });
  }

  // Source
  if (data.source) {
    slide.addText(data.source, {
      x: 2.8, y: G.footerTextY, w: 5, h: 0.18,
      fontSize: 8, fontFace: theme.font, color: theme.textFine,
    });
  }
};
