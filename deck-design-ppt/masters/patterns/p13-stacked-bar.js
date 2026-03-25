/**
 * P13 Stacked Bar — vertical stacked bar chart with legend and annotations.
 * Borrows segment-stacking logic from Louisiana-DOT-21.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   bars: [{ label, segments: [{ name, value, color? }] }],
 *   legend?: [{ name, color }],       // auto-derived from first bar if omitted
 *   annotations?: [{ text }],
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const bars = data.bars || [];
  if (!bars.length) return;

  // Default colors cycle
  const defaultColors = [theme.accent, theme.positive || '3A8F5C', theme.negative || 'B66A5C', theme.caution || 'D4A843', '888888', 'CCCCCC'];

  // Derive legend from first bar's segments if not provided
  const legend = data.legend || bars[0].segments.map((s, i) => ({
    name: s.name, color: s.color || defaultColors[i % defaultColors.length],
  }));

  // Chart area
  const hasAnnotations = data.annotations && data.annotations.length > 0;
  const chartW = hasAnnotations ? 6.0 : G.contentW;
  const chartH = 2.8;
  const chartX = G.marginL;
  const chartStartY = Math.max(frame.bodyY + 0.04, frame.centerY(chartH + 0.6));
  const chartBottomY = chartStartY + chartH;

  // Find max total for scaling
  const maxTotal = Math.max(...bars.map(b => b.segments.reduce((s, seg) => s + seg.value, 0)));
  const valueToHeight = (v) => (v / maxTotal) * chartH;

  // Bar geometry
  const barCount = bars.length;
  const barGap = 0.08;
  const barW = Math.min(0.6, (chartW - (barCount - 1) * barGap) / barCount);
  const totalBarsW = barCount * barW + (barCount - 1) * barGap;
  const barsStartX = chartX + (chartW - totalBarsW) / 2;

  // X-axis line
  slide.addShape(pptx.ShapeType.rect, {
    x: chartX, y: chartBottomY, w: chartW, h: 0.007, fill: { color: theme.border },
  });

  // Render bars
  bars.forEach((bar, bi) => {
    const x = barsStartX + bi * (barW + barGap);
    let cursor = chartBottomY; // start from bottom, grow upward

    bar.segments.forEach((seg, si) => {
      const h = valueToHeight(seg.value);
      const color = seg.color || legend[si]?.color || defaultColors[si % defaultColors.length];
      cursor -= h;

      slide.addShape(pptx.ShapeType.rect, {
        x, y: cursor, w: barW, h, fill: { color },
      });

      // Value label inside segment (if tall enough)
      if (h > 0.25) {
        slide.addText(String(seg.value), {
          x, y: cursor, w: barW, h,
          fontSize: 9, fontFace: theme.font, color: 'FFFFFF',
          bold: true, align: 'center', valign: 'middle',
        });
      }
    });

    // Total label above bar
    const total = bar.segments.reduce((s, seg) => s + seg.value, 0);
    slide.addText(String(Math.round(total * 10) / 10), {
      x, y: cursor - 0.22, w: barW, h: 0.2,
      fontSize: 9, fontFace: theme.font, color: theme.text,
      bold: true, align: 'center',
      margin: 0, fit: 'shrink',
    });

    // Category label below axis
    slide.addText(bar.label, {
      x: x - 0.1, y: chartBottomY + 0.05, w: barW + 0.2, h: 0.2,
      fontSize: 9, fontFace: theme.font, color: theme.textSec,
      align: 'center',
      margin: 0, fit: 'shrink',
    });
  });

  // Legend (below chart)
  const legendY = chartBottomY + 0.32;
  let legendX = chartX;
  legend.forEach(l => {
    slide.addShape(pptx.ShapeType.rect, {
      x: legendX, y: legendY + 0.03, w: 0.12, h: 0.12, fill: { color: l.color },
    });
    slide.addText(l.name, {
      x: legendX + 0.17, y: legendY, w: 1.2, h: 0.18,
      fontSize: 9, fontFace: theme.font, color: theme.textSec, valign: 'middle',
      margin: 0, fit: 'shrink',
    });
    legendX += 1.4;
  });

  // Annotations sidebar
  if (hasAnnotations) {
    const annoX = G.marginL + 6.3;
    const annoW = G.contentW - 6.3;
    data.annotations.forEach((a, i) => {
      const y = chartStartY + i * 0.8;
      slide.addShape(pptx.ShapeType.ellipse, {
        x: annoX, y: y + 0.02, w: 0.2, h: 0.2, fill: { color: theme.accent },
      });
      slide.addText(String(i + 1), {
        x: annoX, y: y + 0.02, w: 0.2, h: 0.2,
        fontSize: 9, fontFace: theme.font, color: 'FFFFFF',
        bold: true, align: 'center', valign: 'middle',
      });
      slide.addText(a.text, {
        x: annoX + 0.28, y: y, w: annoW - 0.28, h: 0.7,
        fontSize: 10, fontFace: theme.font, color: theme.text,
        valign: 'top', lineSpacingMultiple: 1.15, margin: 0, fit: 'shrink',
      });
    });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
