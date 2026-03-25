/**
 * P06 Fork — binary comparison (A vs B) with criteria grid.
 *
 * data: {
 *   sectionTag?, title,
 *   optionA: { title, metric? },
 *   optionB: { title, metric?, recommended? },
 *   criteria: [{ label, a, b }],
 *   recommendation?,
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const critW = 2.0, optW = (G.contentW - critW) / 2;
  const rows = data.criteria || [];
  const rowH = 0.38, headH = 0.6;
  const recoTextH = data.recommendation
    ? estimateTextHeight(data.recommendation, { charsPerLine: 90, lineH: 0.16, padding: 0.08, minH: 0.35 })
    : 0;
  const recoH = data.recommendation ? recoTextH + 0.1 : 0;
  const gridH = headH + rows.length * rowH + recoH;
  const startY = frame.centerY(gridH);

  // Column headers
  slide.addText('CRITERIA', {
    x: G.marginL, y: startY, w: critW, h: headH,
    fontSize: 10, fontFace: theme.font, color: theme.textFine,
    bold: true, charSpacing: 0.5, valign: 'bottom',
  });

  // Option A header
  const aX = G.marginL + critW;
  slide.addShape(pptx.ShapeType.rect, { x: aX, y: startY, w: optW, h: headH, fill: { color: theme.canvas } });
  slide.addShape(pptx.ShapeType.rect, { x: aX, y: startY, w: optW, h: 0.015, fill: { color: theme.border } });
  slide.addText(data.optionA.title, { x: aX + G.cellPad, y: startY + 0.08, w: optW - G.cellPad * 2, h: 0.2, fontSize: 11, fontFace: theme.font, color: theme.textSec, bold: true, fit: 'shrink' });
  if (data.optionA.metric) {
    slide.addText(data.optionA.metric, { x: aX + G.cellPad, y: startY + 0.28, w: optW - G.cellPad * 2, h: 0.25, fontSize: 18, fontFace: theme.fontDisplay, color: theme.textSec, bold: true, fit: 'shrink' });
  }

  // Option B header (recommended)
  const bX = aX + optW;
  const isReco = data.optionB.recommended;
  slide.addShape(pptx.ShapeType.rect, { x: bX, y: startY, w: optW, h: headH, fill: { color: isReco ? theme.mist : theme.canvas } });
  slide.addShape(pptx.ShapeType.rect, { x: bX, y: startY, w: optW, h: 0.04, fill: { color: isReco ? theme.accent : theme.border } });
  slide.addText(data.optionB.title, { x: bX + G.cellPad, y: startY + 0.1, w: optW - G.cellPad * 2, h: 0.2, fontSize: 11, fontFace: theme.font, color: isReco ? theme.accent : theme.textSec, bold: true, fit: 'shrink' });
  if (data.optionB.metric) {
    slide.addText(data.optionB.metric, { x: bX + G.cellPad, y: startY + 0.3, w: optW - G.cellPad * 2, h: 0.25, fontSize: 18, fontFace: theme.fontDisplay, color: isReco ? theme.accent : theme.textSec, bold: true, fit: 'shrink' });
  }

  // Criteria rows
  rows.forEach((row, i) => {
    const ry = startY + headH + i * rowH;
    slide.addShape(pptx.ShapeType.rect, { x: G.marginL, y: ry + rowH - 0.005, w: G.contentW, h: 0.005, fill: { color: 'E8E8E8' } });

    slide.addText(row.label, { x: G.marginL + G.cellPad, y: ry, w: critW - G.cellPad, h: rowH, fontSize: 10, fontFace: theme.font, color: theme.textSec, bold: true, valign: 'middle', fit: 'shrink' });
    slide.addText(row.a, { x: aX + G.cellPad, y: ry, w: optW - G.cellPad * 2, h: rowH, fontSize: 10, fontFace: theme.font, color: theme.text, valign: 'middle', fit: 'shrink' });

    // B column with recommended background
    if (isReco) {
      slide.addShape(pptx.ShapeType.rect, { x: bX, y: ry, w: optW, h: rowH, fill: { color: theme.mist } });
    }
    slide.addText(row.b, { x: bX + G.cellPad, y: ry, w: optW - G.cellPad * 2, h: rowH, fontSize: 10, fontFace: theme.font, color: theme.text, valign: 'middle', fit: 'shrink' });
  });

  // Recommendation band
  if (data.recommendation) {
    const recoY = startY + headH + rows.length * rowH + 0.1;
    slide.addShape(pptx.ShapeType.rect, { x: G.marginL, y: recoY, w: G.contentW, h: recoTextH, fill: { color: theme.mist } });
    slide.addShape(pptx.ShapeType.rect, { x: G.marginL, y: recoY, w: 0.04, h: recoTextH, fill: { color: theme.accent } });
    slide.addText(data.recommendation, {
      x: G.marginL + G.cellPad + 0.1, y: recoY, w: G.contentW - 0.4, h: recoTextH,
      fontSize: 11, fontFace: theme.font, color: theme.accent, bold: true, valign: 'middle', fit: 'shrink',
    });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
