const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'stacked-bar',
  title: 'Stacked Bar',
  tier: 1,
  proves: 'composition ("What\'s the mix?")',
  data: 'Revenue by segment across regions',
  sectionLabel: 'Revenue Mix',
  actionTitle: 'APAC is the only region where software exceeds services revenue',
  source: 'Source: Regional P&L FY2025, $M',
  exhibitId: 'Exhibit 4.1',
  renderExhibit({ tokens }) {
    const chartId = 'stacked-bar-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const axisCategory = { ...figure.axisTitle, fontWeight: 'normal', color: colors.textStrong };
    const valueAxis = figure.axisTick;
    const insideLabel = { ...figure.annotation, color: '#fff' };
    const insideLabelStrong = { ...figure.annotationStrong, color: '#fff' };
    const insideLabelMuted = { ...figure.annotation, color: colors.textMuted };
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
        legend: ${JSON.stringify(chrome.legendBase)},
        grid: {
          left: ${tokens.adapt(36, 56, 64)},
          right: ${tokens.adapt(16, 24, 30)},
          top: ${tokens.adapt(16, 18, 24)},
          bottom: ${tokens.adapt(50, 58, 66)},
        },
        xAxis: {
          type: 'category',
          data: ['North America', 'EMEA', 'APAC', 'LatAm'],
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(axisCategory)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { ...${JSON.stringify(valueAxis)}, formatter: (value) => '$' + value },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        series: [
          {
            name: 'Services',
            type: 'bar',
            stack: 'total',
            data: [820, 640, 280, 190],
            barWidth: ${tokens.chartBarWide},
            itemStyle: { color: '#123A63' },
            label: { show: true, position: 'inside', ...${JSON.stringify(insideLabel)}, formatter: (p) => '$' + p.value },
          },
          {
            name: 'Software',
            type: 'bar',
            stack: 'total',
            data: [480, 360, 420, 110],
            itemStyle: { color: '#2E7D9B' },
            label: { show: true, position: 'inside', ...${JSON.stringify(insideLabel)}, formatter: (p) => '$' + p.value },
          },
          {
            name: 'Hardware',
            type: 'bar',
            stack: 'total',
            data: [200, 180, 140, 60],
            itemStyle: { color: '#C7D5E5' },
            label: { show: true, position: 'inside', ...${JSON.stringify(insideLabelMuted)}, formatter: (p) => '$' + p.value },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
