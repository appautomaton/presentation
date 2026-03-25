const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'burndown',
  title: 'Burndown',
  tier: 3,
  proves: 'progress toward target over time',
  data: 'Cost reduction initiative tracking versus plan',
  sectionLabel: 'Cost Reduction Tracker',
  actionTitle: 'Cost take-out is tracking 8% ahead of plan with $127M captured through March',
  source: 'Source: Transformation Office, cumulative savings tracker',
  exhibitId: 'Exhibit 18.1',
  renderExhibit({ tokens }) {
    const chartId = 'burndown-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const axisCategory = { ...figure.axisTitle, fontWeight: 'normal' };
    const planLabel = { ...figure.annotation, color: colors.textLight };
    const actualLabel = { ...figure.annotationStrong, color: colors.accent };
    const targetLabel = { ...figure.annotationStrong, color: colors.success };
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
          left: ${tokens.adapt(46, 58, 64)},
          right: ${tokens.adapt(84, 92, 104)},
          top: ${tokens.adapt(22, 28, 34)},
          bottom: ${tokens.adapt(30, 36, 42)},
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          boundaryGap: false,
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(axisCategory)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { ...${JSON.stringify(figure.axisTick)}, formatter: (value) => '$' + value + 'M' },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        series: [
          {
            name: 'Plan',
            type: 'line',
            data: [12, 28, 48, 72, 98, 128, 156, 182, 210, 238, 264, 290],
            symbol: 'none',
            lineStyle: { width: ${Math.max(tokens.lineWidth - 0.5, 1.5)}, color: '#C7D5E5', type: [6, 4] },
            endLabel: { show: true, ...${JSON.stringify(planLabel)}, formatter: 'Plan\\n$290M' },
          },
          {
            name: 'Actual',
            type: 'line',
            data: [15, 38, 127],
            symbol: 'circle',
            symbolSize: ${tokens.pointSize + 1},
            lineStyle: { width: ${tokens.lineWidth}, color: '#123A63' },
            itemStyle: { color: '#123A63' },
            endLabel: { show: true, ...${JSON.stringify(actualLabel)}, formatter: 'Actual\\n$127M' },
          },
        ],
        graphic: [
          {
            type: 'line',
            shape: { x1: 0, y1: 0, x2: '96%', y2: 0 },
            top: ${tokens.adapt(22, 28, 34)},
            left: ${tokens.adapt(46, 58, 64)},
            style: { stroke: '#2E9E5A', lineDash: [4, 4], lineWidth: 1.5 },
          },
          {
            type: 'text',
            right: 8,
            top: ${tokens.adapt(10, 16, 20)},
            style: { ...${JSON.stringify(targetLabel)}, text: 'Target: $290M', fill: '${colors.success}' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
