/**
 * P03 Evidence — claim + chart proof with sidebar callouts.
 *
 * data: {
 *   sectionTag?, title,
 *   chart: { type, series, colors, yMin?, yMax?, yStep?, yTitle? },
 *   callouts: [{ label, text }],
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  // Chart (native PowerPoint chart)
  const chartH = Math.max(2.4, frame.bodyH - 0.15);
  const chartStartY = frame.bodyY;
  const chartType = data.chart.type === 'bar' ? pptx.charts.BAR
    : data.chart.type === 'area' ? pptx.charts.AREA
    : pptx.charts.LINE;

  const chartOpts = {
    x: G.marginL, y: chartStartY, w: 5.5, h: chartH,
    showLegend: true, legendPos: 'b', legendFontSize: 9,
    chartColors: data.chart.colors || [theme.accent, theme.negative],
    valAxisLabelFontSize: 9, catAxisLabelFontSize: 9,
    catAxisLineShow: false, valAxisLineShow: false,
    valGridLine: { style: 'none' },
    catGridLine: { style: 'none' },
    chartArea: { fill: { color: 'F3F6FA' } },
  };
  if (chartType === pptx.charts.LINE) {
    chartOpts.lineDataSymbol = 'circle';
    chartOpts.lineDataSymbolSize = 6;
  }
  if (data.chart.yMin != null) chartOpts.valAxisMinVal = data.chart.yMin;
  if (data.chart.yMax != null) chartOpts.valAxisMaxVal = data.chart.yMax;
  if (data.chart.yStep) chartOpts.valAxisMajorUnit = data.chart.yStep;
  if (data.chart.yTitle) {
    chartOpts.valAxisTitle = data.chart.yTitle;
    chartOpts.showValAxisTitle = true;
    chartOpts.valAxisTitleFontSize = 9;
  }

  slide.addChart(chartType, data.chart.series, chartOpts);

  // Sidebar callouts
  const callouts = data.callouts || [];
  const calloutH = callouts.map((c, i) => {
    const textH = estimateTextHeight(c.text, {
      charsPerLine: 30,
      lineH: 0.16,
      padding: 0.06,
      minH: i === 0 ? 0.72 : 0.42,
    });
    return textH + (i === 0 ? 0.38 : 0.3);
  });
  const calloutGap = 0.12;
  const totalCalloutH = calloutH.reduce((s, h) => s + h, 0) + (callouts.length - 1) * calloutGap;
  let calloutY = frame.centerY(totalCalloutH);

  callouts.forEach((c, i) => {
    const h = calloutH[i];
    const isPrimary = i === 0;

    if (isPrimary) {
      slide.addShape(pptx.ShapeType.rect, {
        x: 6.3, y: calloutY, w: 3.4, h, fill: { color: theme.mist },
      });
      slide.addShape(pptx.ShapeType.rect, {
        x: 6.3, y: calloutY, w: 0.05, h, fill: { color: theme.accent },
      });
    } else {
      slide.addShape(pptx.ShapeType.rect, {
        x: 6.3, y: calloutY, w: 0.03, h, fill: { color: theme.border },
      });
    }

    slide.addText(c.label, {
      x: 6.45, y: calloutY + 0.05, w: 3.15, h: 0.2,
      fontSize: 11, fontFace: theme.font, color: theme.accent,
      bold: true, charSpacing: 0.5,
      margin: 0, fit: 'shrink',
    });
    slide.addText(c.text, {
      x: 6.45, y: calloutY + 0.28, w: 3.15, h: h - 0.35,
      fontSize: 11, fontFace: theme.font,
      color: isPrimary ? theme.text : theme.textSec,
      lineSpacingMultiple: 1.15, valign: 'top', margin: 0, fit: 'shrink',
    });

    calloutY += h + calloutGap;
  });

  // Source
  if (data.source) {
    slide.addText(data.source, {
      x: 2.8, y: G.footerTextY, w: 5, h: 0.18,
      fontSize: 8, fontFace: theme.font, color: theme.textFine,
    });
  }
};
