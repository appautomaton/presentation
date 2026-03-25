/**
 * C02 Waterfall / Bridge — start/end with intermediate deltas.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   bars: [{ label, value, delta?, color? }],  // first=start, last=end, middle=steps
 *   panels?: [{ title, bullets: [string] }],
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  // Waterfall chart using native stacked bar
  const bars = data.bars || [];
  if (bars.length > 0) {
    // Build waterfall as stacked bar: invisible base + visible delta
    const labels = bars.map(b => b.label);
    let running = 0;
    const bases = [], deltas = [];

    bars.forEach((b, i) => {
      if (i === 0 || i === bars.length - 1) {
        bases.push(0);
        deltas.push(b.value);
        running = b.value;
      } else {
        const d = b.delta || b.value;
        if (d >= 0) {
          bases.push(running);
          deltas.push(d);
          running += d;
        } else {
          bases.push(running + d);
          deltas.push(Math.abs(d));
          running += d;
        }
      }
    });

    const chartColors = bars.map((b, i) => {
      if (b.color) return b.color;
      if (i === 0 || i === bars.length - 1) return theme.accent;
      return (b.delta || b.value) >= 0 ? theme.positive : theme.negative;
    });

    slide.addChart(pptx.charts.BAR, [
      { name: 'Base', labels, values: bases },
      { name: 'Delta', labels, values: deltas },
    ], {
      x: G.marginL, y: frame.bodyY, w: G.contentW, h: 2.5,
      barGrouping: 'stacked', barDir: 'col',
      showLegend: false,
      chartColors: ['FFFFFF', theme.accent],  // base invisible, delta visible
      valAxisLabelFontSize: 9, catAxisLabelFontSize: 9,
      catAxisLineShow: false, valAxisLineShow: false,
      valGridLine: { style: 'none' },
      catGridLine: { style: 'none' },
      chartArea: { fill: { color: 'F3F6FA' } },
      showValue: true, dataLabelFontSize: 9, dataLabelColor: theme.text,
    });
  }

  // Interpretation panels below chart
  const panels = data.panels || [];
  if (panels.length > 0) {
    const panelY = frame.bodyY + 2.7;
    const panelW = (G.contentW - (panels.length - 1) * 0.15) / panels.length;
    panels.forEach((p, i) => {
      const px = G.marginL + i * (panelW + 0.15);
      slide.addText(p.title, {
        x: px, y: panelY, w: panelW, h: 0.2,
        fontSize: 11, fontFace: theme.font, color: theme.accent, bold: true, charSpacing: 0.5,
      });
      let by = panelY + 0.25;
      (p.bullets || []).forEach((b) => {
        const bh = estimateTextHeight(b, { charsPerLine: Math.floor(panelW * 11), lineH: 0.16, padding: 0.04, minH: 0.22 });
        slide.addText(b, {
          x: px + 0.12, y: by, w: panelW - 0.12, h: bh,
          fontSize: 10, fontFace: theme.font, color: theme.text,
          bullet: { code: '2022' }, valign: 'top', lineSpacingMultiple: 1.1, fit: 'shrink',
        });
        by += bh + 0.04;
      });
    });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
