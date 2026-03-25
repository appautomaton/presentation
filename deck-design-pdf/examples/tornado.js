const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'tornado',
  title: 'Tornado / Sensitivity',
  tier: 4,
  proves: 'which variables have the largest impact on an outcome',
  data: 'NPV sensitivity to six input assumptions',
  sectionLabel: 'Sensitivity Analysis',
  actionTitle: 'Volume and pricing assumptions have the largest impact on NPV',
  source: 'Source: Financial model sensitivity analysis',
  exhibitId: 'Exhibit T4.1',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 820, height: 462 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 900, height: 506 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'diverging bars need enough horizontal room for labels on both sides',
  },
  renderExhibit({ tokens }) {
    const chartId = 'tornado-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const categoryLabel = { ...figure.dataLabel, color: colors.textStrong };
    const downLabel = { ...figure.annotation, color: colors.danger };
    const upLabel = { ...figure.annotation, color: colors.accentAlt };
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const vars = ['Discount Rate', 'Capex Timing', 'Market Share', 'COGS Inflation', 'Pricing', 'Volume'];
      const low  = [-8, -12, -18, -22, -35, -42];
      const high = [6, 10, 15, 20, 30, 38];
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(100, 140, 160)},
          right: ${tokens.adapt(40, 60, 72)},
          top: ${tokens.adapt(16, 20, 24)},
          bottom: ${tokens.adapt(30, 40, 48)},
        },
        xAxis: {
          type: 'value',
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: {
            ...${JSON.stringify(figure.axisTick)},
            formatter: (v) => (v > 0 ? '+' : '') + v + '%',
          },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        yAxis: {
          type: 'category',
          data: vars,
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(categoryLabel)},
        },
        series: [
          {
            name: 'Downside', type: 'bar', stack: 'tornado',
            data: low, barWidth: ${tokens.chartBarWidth},
            itemStyle: { color: '${colors.danger}', borderRadius: [4, 0, 0, 4] },
            label: {
              show: true, position: 'left',
              ...${JSON.stringify(downLabel)},
              formatter: (p) => p.value + '%',
            },
          },
          {
            name: 'Upside', type: 'bar', stack: 'tornado',
            data: high, barWidth: ${tokens.chartBarWidth},
            itemStyle: { color: '${colors.accentAlt}', borderRadius: [0, 4, 4, 0] },
            label: {
              show: true, position: 'right',
              ...${JSON.stringify(upLabel)},
              formatter: (p) => '+' + p.value + '%',
            },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
