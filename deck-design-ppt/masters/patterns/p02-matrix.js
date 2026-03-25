/**
 * P02 Matrix — 2×2 quadrant positioning chart.
 *
 * data: {
 *   sectionTag?, title,
 *   xAxis: { low, high }, yAxis: { low, high },
 *   items: [{ label, x, y, size? }],  // x,y in 0–100 range
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  // Matrix area
  const mW = 6.5, mH = 3.5;
  const mX = G.marginL + (G.contentW - mW) / 2;
  const mY = frame.centerY(mH + 0.4); // +0.4 for axis labels

  // Quadrant backgrounds
  const halfW = mW / 2, halfH = mH / 2;
  slide.addShape(pptx.ShapeType.rect, { x: mX, y: mY, w: halfW, h: halfH, fill: { color: theme.mist } });
  slide.addShape(pptx.ShapeType.rect, { x: mX + halfW, y: mY, w: halfW, h: halfH, fill: { color: theme.canvas } });
  slide.addShape(pptx.ShapeType.rect, { x: mX, y: mY + halfH, w: halfW, h: halfH, fill: { color: theme.canvas } });
  slide.addShape(pptx.ShapeType.rect, { x: mX + halfW, y: mY + halfH, w: halfW, h: halfH, fill: { color: theme.mist } });

  // Grid lines
  slide.addShape(pptx.ShapeType.rect, { x: mX, y: mY + halfH - 0.003, w: mW, h: 0.007, fill: { color: theme.border } });
  slide.addShape(pptx.ShapeType.rect, { x: mX + halfW - 0.003, y: mY, w: 0.007, h: mH, fill: { color: theme.border } });
  // Border
  slide.addShape(pptx.ShapeType.rect, { x: mX, y: mY, w: mW, h: mH, line: { color: theme.border, width: 0.5 } });

  // Axis labels
  const ax = data.xAxis || { low: 'Low', high: 'High' };
  const ay = data.yAxis || { low: 'Low', high: 'High' };
  slide.addText(ax.low, { x: mX, y: mY + mH + 0.05, w: halfW, h: 0.2, fontSize: 9, fontFace: theme.font, color: theme.textSec, align: 'center', fit: 'shrink' });
  slide.addText(ax.high, { x: mX + halfW, y: mY + mH + 0.05, w: halfW, h: 0.2, fontSize: 9, fontFace: theme.font, color: theme.textSec, align: 'center', fit: 'shrink' });
  slide.addText(ay.high, { x: mX - 0.6, y: mY, w: 0.55, h: halfH, fontSize: 9, fontFace: theme.font, color: theme.textSec, align: 'right', valign: 'middle', fit: 'shrink' });
  slide.addText(ay.low, { x: mX - 0.6, y: mY + halfH, w: 0.55, h: halfH, fontSize: 9, fontFace: theme.font, color: theme.textSec, align: 'right', valign: 'middle', fit: 'shrink' });

  // Plot items
  (data.items || []).forEach(item => {
    const ix = mX + (item.x / 100) * mW;
    const iy = mY + (1 - item.y / 100) * mH;
    const sz = item.size || 0.22;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: ix - sz / 2, y: iy - sz / 2, w: sz, h: sz,
      fill: { color: theme.accent, transparency: 20 },
      line: { color: theme.accent, width: 1.5 },
    });
    slide.addText(item.label, {
      x: ix + sz / 2 + 0.05, y: iy - 0.1, w: 1.5, h: 0.2,
      fontSize: 9, fontFace: theme.font, color: theme.text, bold: true, fit: 'shrink',
    });
  });

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
