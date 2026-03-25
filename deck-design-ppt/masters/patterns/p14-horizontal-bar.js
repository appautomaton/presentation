/**
 * P14 Horizontal Bar — ranked horizontal bars with labels and values.
 * Borrows from microbattle-02: bar width = value/max * fullWidth.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   bars: [{ label, value, unit?, color?, highlight? }],
 *   maxValue?,       // auto-derived if omitted
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const bars = data.bars || [];
  if (!bars.length) return;

  const maxVal = data.maxValue || Math.max(...bars.map(b => b.value));
  const labelW = 2.8;  // width for label text
  const barFullW = 4.5; // max bar width at 100%
  const barX = G.marginL + labelW + 0.15;
  const valueGap = 0.12; // gap between bar end and value label

  const rowH = 0.42;
  const totalH = bars.length * rowH;
  const startY = Math.max(frame.bodyY + 0.04, frame.centerY(totalH));

  bars.forEach((bar, i) => {
    const y = startY + i * rowH;
    const barW = (bar.value / maxVal) * barFullW;
    const color = bar.color || (bar.highlight ? theme.accent : theme.border);
    const textColor = bar.highlight ? theme.accent : theme.text;

    // Alternating background
    if (i % 2 === 0) {
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y, w: G.contentW, h: rowH,
        fill: { color: theme.darkMode ? '1A1614' : 'F5F7FA' },
      });
    }

    // Highlight indicator
    if (bar.highlight) {
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y, w: 0.04, h: rowH, fill: { color: theme.accent },
      });
    }

    // Label
    slide.addText(bar.label, {
      x: G.marginL + G.cellPad, y, w: labelW - G.cellPad, h: rowH,
      fontSize: 10, fontFace: theme.font, color: textColor,
      bold: bar.highlight, valign: 'middle',
      margin: 0, fit: 'shrink',
    });

    // Bar
    slide.addShape(pptx.ShapeType.rect, {
      x: barX, y: y + 0.1, w: Math.max(barW, 0.02), h: rowH - 0.2,
      fill: { color }, rectRadius: 0.02,
    });

    // Value label
    const unit = bar.unit || '';
    slide.addText(`${bar.value}${unit}`, {
      x: barX + barW + valueGap, y, w: 1.2, h: rowH,
      fontSize: 10, fontFace: theme.font, color: textColor,
      bold: bar.highlight, valign: 'middle',
      margin: 0, fit: 'shrink',
    });
  });

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
