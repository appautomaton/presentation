/**
 * C01 Multi-evidence — main exhibit + sidebar drivers/implications.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   chart: { type, series, colors, ... },
 *   metrics?: [{ label, value }],
 *   sidebar: { drivers: [string], implications?: [string] },
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const mainW = 5.5, sideW = G.contentW - mainW - 0.2;
  const sideX = G.marginL + mainW + 0.2;

  // Main chart
  if (data.chart) {
    const chartType = data.chart.type === 'bar' ? pptx.charts.BAR : pptx.charts.LINE;
    slide.addChart(chartType, data.chart.series, {
      x: G.marginL, y: frame.bodyY, w: mainW, h: 2.5,
      showLegend: true, legendPos: 'b', legendFontSize: 9,
      chartColors: data.chart.colors || [theme.accent],
      valAxisLabelFontSize: 9, catAxisLabelFontSize: 9,
      catAxisLineShow: false, valAxisLineShow: false,
      valGridLine: { style: 'none' },
      catGridLine: { style: 'none' },
      chartArea: { fill: { color: 'F3F6FA' } },
    });
  }

  // Metrics row below chart
  if (data.metrics) {
    const metricY = frame.bodyY + 2.7;
    const metricW = mainW / data.metrics.length;
    data.metrics.forEach((m, i) => {
      const mx = G.marginL + i * metricW;
      slide.addShape(pptx.ShapeType.rect, {
        x: mx, y: metricY, w: metricW - 0.05, h: 0.6,
        fill: { color: theme.mist }, line: { color: theme.border, width: 0.5 },
      });
      slide.addText(m.value, {
        x: mx + 0.08, y: metricY + 0.05, w: metricW - 0.2, h: 0.28,
        fontSize: 16, fontFace: theme.fontDisplay, color: theme.accent, bold: true, fit: 'shrink',
      });
      slide.addText(m.label, {
        x: mx + 0.08, y: metricY + 0.33, w: metricW - 0.2, h: 0.2,
        fontSize: 9, fontFace: theme.font, color: theme.textSec, fit: 'shrink',
      });
    });
  }

  // Sidebar
  const sb = data.sidebar || {};
  let sy = frame.bodyY;

  if (sb.drivers) {
    slide.addText('KEY DRIVERS', {
      x: sideX, y: sy, w: sideW, h: 0.2,
      fontSize: 11, fontFace: theme.font, color: theme.accent, bold: true, charSpacing: 0.5,
    });
    sy += 0.25;
    sb.drivers.forEach(d => {
      const dh = estimateTextHeight(d, { charsPerLine: 30, lineH: 0.16, padding: 0.04, minH: 0.24 });
      slide.addText(d, {
        x: sideX + 0.15, y: sy, w: sideW - 0.15, h: dh,
        fontSize: 10, fontFace: theme.font, color: theme.text,
        bullet: { code: '2022' }, valign: 'top', lineSpacingMultiple: 1.1, fit: 'shrink',
      });
      sy += dh + 0.06;
    });
  }

  if (sb.implications) {
    sy += 0.15;
    slide.addText('IMPLICATIONS', {
      x: sideX, y: sy, w: sideW, h: 0.2,
      fontSize: 11, fontFace: theme.font, color: theme.accent, bold: true, charSpacing: 0.5,
    });
    sy += 0.25;
    sb.implications.forEach(d => {
      const dh = estimateTextHeight(d, { charsPerLine: 30, lineH: 0.16, padding: 0.04, minH: 0.24 });
      slide.addText(d, {
        x: sideX + 0.15, y: sy, w: sideW - 0.15, h: dh,
        fontSize: 10, fontFace: theme.font, color: theme.textSec,
        bullet: { code: '2022' }, valign: 'top', lineSpacingMultiple: 1.1, fit: 'shrink',
      });
      sy += dh + 0.06;
    });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
