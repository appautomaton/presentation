const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'stacked-bar-100',
  title: '100% Stacked Bar',
  tier: 2,
  proves: 'share comparison across categories',
  data: 'Channel mix evolution over 4 years',
  sectionLabel: 'Channel Evolution',
  actionTitle: 'Direct digital grew from 18% to 34% of revenue in four years, displacing field sales',
  source: 'Source: Revenue by channel, FY2022–FY2025',
  exhibitId: 'Exhibit 12.1',
  renderExhibit({ tokens }) {
    const chartId = 'stacked-bar-100-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const axisCategory = { ...figure.axisTitle, fontWeight: 'normal', color: colors.textStrong };
    const axisValue = figure.axisTick;
    const insideLabel = { ...figure.annotation, color: '#fff' };
    const insideLabelStrong = { ...figure.annotationStrong, color: '#fff' };
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
        legend: { ...${JSON.stringify(chrome.legendBase)}, itemGap: ${Math.max(tokens.legendGap - 4, 10)} },
        grid: {
          left: ${tokens.adapt(34, 44, 50)},
          right: ${tokens.adapt(16, 24, 30)},
          top: ${tokens.adapt(18, 20, 24)},
          bottom: ${tokens.adapt(50, 58, 66)},
        },
        xAxis: {
          type: 'category',
          data: ['FY2022', 'FY2023', 'FY2024', 'FY2025'],
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(axisCategory)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { ...${JSON.stringify(axisValue)}, formatter: '{value}%' },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        series: [
          {
            name: 'Field Sales',
            type: 'bar',
            stack: 'total',
            data: [45, 38, 32, 26],
            barWidth: ${tokens.chartBarXL},
            itemStyle: { color: '#123A63' },
            label: { show: true, position: 'inside', ...${JSON.stringify(insideLabel)}, formatter: '{c}%' },
          },
          {
            name: 'Inside Sales',
            type: 'bar',
            stack: 'total',
            data: [22, 23, 22, 20],
            itemStyle: { color: '#2E7D9B' },
            label: { show: true, position: 'inside', ...${JSON.stringify(insideLabel)}, formatter: '{c}%' },
          },
          {
            name: 'Channel Partners',
            type: 'bar',
            stack: 'total',
            data: [15, 16, 18, 20],
            itemStyle: { color: '#8BA5BD' },
            label: { show: true, position: 'inside', ...${JSON.stringify(insideLabel)}, formatter: '{c}%' },
          },
          {
            name: 'Direct Digital',
            type: 'bar',
            stack: 'total',
            data: [18, 23, 28, 34],
            itemStyle: { color: '#5BA4C9' },
            label: { show: true, position: 'inside', ...${JSON.stringify(insideLabelStrong)}, formatter: '{c}%' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
