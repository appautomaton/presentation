/**
 * C04 Facts vs Perspectives — Bain signature two-column layout.
 *
 * data: {
 *   sectionTag?, title,
 *   facts: { bullets: [string], chart?: { type, series, colors, ... } },
 *   perspectives: { bullets: [string], implication?, nextStep? },
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  // Two columns: slightly rebalanced to give the perspective column enough room for Bain-style synthesis.
  const gap = 0.2;
  const factsW = G.contentW * 0.55 - gap / 2;
  const perspW = G.contentW - factsW - gap;
  const factsX = G.marginL;
  const perspX = G.marginL + factsW + gap;
  const colY = frame.bodyY;
  const colH = frame.bodyH;

  // Column headers (band)
  slide.addShape(pptx.ShapeType.rect, { x: factsX, y: colY, w: factsW, h: 0.28, fill: { color: theme.mist } });
  slide.addText('KEY FACTS AND DATA', {
    x: factsX + G.cellPad, y: colY, w: factsW - G.cellPad * 2, h: 0.28,
    fontSize: 9, fontFace: theme.font, color: theme.text, bold: true, charSpacing: 0.8, valign: 'middle',
    margin: 0, fit: 'shrink',
  });

  slide.addShape(pptx.ShapeType.rect, { x: perspX, y: colY, w: perspW, h: 0.28, fill: { color: theme.mist } });
  slide.addText('PERSPECTIVES', {
    x: perspX + G.cellPad, y: colY, w: perspW - G.cellPad * 2, h: 0.28,
    fontSize: 9, fontFace: theme.font, color: theme.text, bold: true, charSpacing: 0.8, valign: 'middle',
    margin: 0, fit: 'shrink',
  });

  // Facts column
  const facts = data.facts || {};
  let fy = colY + 0.38;
  (facts.bullets || []).forEach(b => {
    const bulletH = estimateTextHeight(b, {
      charsPerLine: 54,
      lineH: 0.145,
      padding: 0.05,
      minH: 0.22,
    });
    slide.addText(b, {
      x: factsX + G.cellPad + 0.1, y: fy, w: factsW - G.cellPad * 2 - 0.1, h: bulletH,
      fontSize: 10, fontFace: theme.font, color: theme.text,
      bullet: { code: '2022' }, valign: 'top', lineSpacingMultiple: 1.1,
      margin: 0, fit: 'shrink',
    });
    fy += bulletH + 0.08;
  });

  // Optional chart in facts column
  if (facts.chart) {
    const chartType = facts.chart.type === 'bar' ? pptx.charts.BAR : pptx.charts.LINE;
    slide.addChart(chartType, facts.chart.series, {
      x: factsX + 0.1, y: fy + 0.1, w: factsW - 0.2, h: colH - (fy - colY) - 0.3,
      showLegend: false, chartColors: facts.chart.colors || [theme.accent],
      valAxisLabelFontSize: 8, catAxisLabelFontSize: 8,
      catAxisLineShow: false, valAxisLineShow: false,
      valGridLine: { style: 'none' },
      catGridLine: { style: 'none' },
      chartArea: { fill: { color: 'F3F6FA' } },
    });
  }

  // Perspectives column
  const persp = data.perspectives || {};
  let py = colY + 0.38;
  (persp.bullets || []).forEach(b => {
    const bulletH = estimateTextHeight(b, {
      charsPerLine: 36,
      lineH: 0.145,
      padding: 0.05,
      minH: 0.24,
    });
    slide.addText(b, {
      x: perspX + G.cellPad + 0.1, y: py, w: perspW - G.cellPad * 2 - 0.1, h: bulletH,
      fontSize: 9.5, fontFace: theme.font, color: theme.text,
      bullet: { code: '2022' }, valign: 'top', lineSpacingMultiple: 1.08,
      margin: 0, fit: 'shrink',
    });
    py += bulletH + 0.08;
  });

  // Implication callout
  if (persp.implication) {
    py += 0.1;
    const implicationTextH = estimateTextHeight(persp.implication, {
      charsPerLine: 34,
      lineH: 0.15,
      padding: 0.04,
      minH: 0.24,
    });
    const implicationH = implicationTextH + 0.24;
    slide.addShape(pptx.ShapeType.rect, { x: perspX, y: py, w: perspW, h: implicationH, fill: { color: theme.mist } });
    slide.addShape(pptx.ShapeType.rect, { x: perspX, y: py, w: 0.04, h: implicationH, fill: { color: theme.accent } });
    slide.addText('IMPLICATION', { x: perspX + G.cellPad, y: py + 0.03, w: perspW - 0.3, h: 0.15, fontSize: 9, fontFace: theme.font, color: theme.accent, bold: true, margin: 0, fit: 'shrink' });
    slide.addText(persp.implication, { x: perspX + G.cellPad, y: py + 0.2, w: perspW - 0.3, h: implicationTextH, fontSize: 9.5, fontFace: theme.font, color: theme.text, valign: 'top', lineSpacingMultiple: 1.08, margin: 0, fit: 'shrink' });
    py += implicationH + 0.08;
  }

  // Next step callout
  if (persp.nextStep) {
    py += 0.05;
    const nextTextH = estimateTextHeight(persp.nextStep, {
      charsPerLine: 34,
      lineH: 0.15,
      padding: 0.04,
      minH: 0.2,
    });
    const nextStepH = nextTextH + 0.18;
    slide.addShape(pptx.ShapeType.rect, { x: perspX, y: py, w: 0.03, h: nextStepH, fill: { color: theme.border } });
    slide.addText('NEXT STEP', { x: perspX + G.cellPad, y: py + 0.02, w: perspW - 0.3, h: 0.15, fontSize: 9, fontFace: theme.font, color: theme.accent, bold: true, margin: 0, fit: 'shrink' });
    slide.addText(persp.nextStep, { x: perspX + G.cellPad, y: py + 0.18, w: perspW - 0.3, h: nextTextH, fontSize: 9.5, fontFace: theme.font, color: theme.textSec, valign: 'top', margin: 0, fit: 'shrink', lineSpacingMultiple: 1.08 });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
