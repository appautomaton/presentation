const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'fan-chart',
  title: 'Fan Chart',
  tier: 4,
  proves: 'forecast with widening confidence intervals',
  data: 'Revenue projection with P10–P90 and P25–P75 confidence bands',
  sectionLabel: 'Revenue Forecast',
  actionTitle: 'Base case reaches $8.4B by 2030 with widening confidence interval reflecting macro uncertainty',
  source: 'Source: Financial planning model, Monte Carlo simulation (n=10,000 paths)',
  exhibitId: 'Exhibit T4.9',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 860, height: 484 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 940, height: 529 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'fan charts with end labels need horizontal breathing room',
  },
  renderExhibit({ tokens }) {
    const chartId = 'fanchart-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const baseLabel = { ...figure.annotationStrong, color: colors.accent };
    const forecastLabel = { ...figure.annotation, color: colors.textLight };
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const years = ['2023', '2024', '2025', '2026E', '2027E', '2028E', '2029E', '2030E'];
      const base = [3.6, 3.9, 4.2, 4.8, 5.6, 6.4, 7.3, 8.4];
      const p10 = [3.6, 3.9, 4.2, 4.4, 4.8, 5.1, 5.3, 5.5];
      const p90 = [3.6, 3.9, 4.2, 5.2, 6.4, 7.8, 9.4, 11.2];
      const p25 = [3.6, 3.9, 4.2, 4.6, 5.2, 5.7, 6.2, 6.8];
      const p75 = [3.6, 3.9, 4.2, 5.0, 6.0, 7.0, 8.2, 9.6];
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(44, 56, 64)},
          right: ${tokens.adapt(80, 100, 116)},
          top: ${tokens.adapt(16, 20, 24)},
          bottom: ${tokens.adapt(30, 40, 48)},
        },
        xAxis: {
          type: 'category', data: years, boundaryGap: false,
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(figure.axisTick)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: {
            ...${JSON.stringify(figure.axisTick)},
            formatter: (v) => '$' + v + 'B',
          },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        series: [
          { name: 'P10', type: 'line', data: p10, stack: 'outer', areaStyle: { color: 'transparent' }, lineStyle: { width: 0 }, symbol: 'none', silent: true },
          { name: 'P10-P90', type: 'line', data: p90.map((v, i) => v - p10[i]), stack: 'outer', areaStyle: { color: 'rgba(18,58,99,0.06)' }, lineStyle: { width: 0 }, symbol: 'none', silent: true },
          { name: 'P25', type: 'line', data: p25, stack: 'inner', areaStyle: { color: 'transparent' }, lineStyle: { width: 0 }, symbol: 'none', silent: true },
          { name: 'P25-P75', type: 'line', data: p75.map((v, i) => v - p25[i]), stack: 'inner', areaStyle: { color: 'rgba(18,58,99,0.12)' }, lineStyle: { width: 0 }, symbol: 'none', silent: true },
          {
            name: 'Base', type: 'line', data: base,
            smooth: false, symbol: 'circle', symbolSize: ${tokens.pointSize},
            lineStyle: { width: ${tokens.lineWidth}, color: '${colors.accent}' },
            itemStyle: { color: '${colors.accent}' },
            endLabel: { show: true, ...${JSON.stringify(baseLabel)}, formatter: 'Base\\n$8.4B' },
          },
        ],
        graphic: [
          { type: 'line', shape: { x1: '38%', y1: 16, x2: '38%', y2: '88%' }, style: { stroke: '${colors.axisLine}', lineDash: [4, 4], lineWidth: 1 } },
          { type: 'text', left: '39%', top: 8, style: { ...${JSON.stringify(forecastLabel)}, text: 'Forecast \\u2192', fill: '${colors.textLight}' } },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
