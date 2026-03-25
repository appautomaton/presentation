const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'scenario-lines',
  title: 'Scenario Lines',
  tier: 2,
  proves: 'multiple forecast paths with range',
  data: 'Revenue projections under three scenarios',
  sectionLabel: 'Revenue Forecast',
  actionTitle: 'Base case projects $6.8B by FY2028; upside reaches $8.2B with M&A acceleration',
  source: 'Source: Financial planning model, March 2026',
  exhibitId: 'Exhibit 13.1',
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
    rationale: 'forecast lines can go below md if end labels stay concise and the time series remains short',
  },
  renderExhibit({ tokens }) {
    const chartId = 'scenario-lines-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const axisCategory = { ...figure.axisTitle, fontWeight: 'normal' };
    const upsideLabel = { ...figure.annotationStrong, color: colors.accent };
    const baseLabel = { ...figure.annotationStrong, color: colors.accent };
    const downsideLabel = { ...figure.annotation, color: colors.textLight };
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(48, 58, 66)},
          right: ${tokens.adapt(92, 110, 126)},
          top: ${tokens.adapt(18, 20, 24)},
          bottom: ${tokens.adapt(42, 36, 42)},
        },
        xAxis: {
          type: 'category',
          data: ['FY2023', 'FY2024', 'FY2025', 'FY2026E', 'FY2027E', 'FY2028E'],
          boundaryGap: false,
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(axisCategory)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          min: 3,
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: {
            ...${JSON.stringify(figure.axisTick)},
            formatter: (value) => '$' + (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)) + 'B',
          },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        series: [
          {
            name: 'Upside',
            type: 'line',
            data: [3.6, 3.8, 4.2, 5.4, 6.6, 8.2],
            symbol: 'circle',
            symbolSize: ${tokens.pointSize},
            lineStyle: { width: ${Math.max(tokens.lineWidth - 0.5, 1.5)}, color: '#123A63', type: [8, 4] },
            itemStyle: { color: '#123A63' },
            endLabel: { show: true, ...${JSON.stringify(upsideLabel)}, formatter: 'Upside\\n$8.2B' },
          },
          {
            name: 'Base',
            type: 'line',
            data: [3.6, 3.8, 4.2, 5.0, 5.8, 6.8],
            symbol: 'circle',
            symbolSize: ${tokens.pointSize + 1},
            lineStyle: { width: ${tokens.lineWidth}, color: '#123A63' },
            itemStyle: { color: '#123A63' },
            endLabel: { show: true, ...${JSON.stringify(baseLabel)}, formatter: 'Base\\n$6.8B' },
          },
          {
            name: 'Downside',
            type: 'line',
            data: [3.6, 3.8, 4.2, 4.5, 4.9, 5.4],
            symbol: 'circle',
            symbolSize: ${tokens.pointSize},
            lineStyle: { width: ${Math.max(tokens.lineWidth - 0.5, 1.5)}, color: '#8BA5BD', type: [8, 4] },
            itemStyle: { color: '#8BA5BD' },
            endLabel: { show: true, ...${JSON.stringify(downsideLabel)}, formatter: 'Downside\\n$5.4B' },
          },
        ],
        graphic: [
          {
            type: 'line',
            shape: { x1: '42%', y1: 16, x2: '42%', y2: '88%' },
            style: { stroke: '#C7D5E5', lineDash: [4, 4], lineWidth: 1 },
          },
          {
            type: 'text',
            left: '43%',
            top: 8,
            style: { ...${JSON.stringify({ ...figure.annotation, color: colors.textLight })}, text: 'Forecast →' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
