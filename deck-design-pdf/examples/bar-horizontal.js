const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'bar-horizontal',
  title: 'Horizontal Sorted Bars',
  tier: 1,
  proves: 'ranking / comparison ("Which is biggest?")',
  data: 'Operating margin by business unit, sorted descending',
  sectionLabel: 'Performance Review',
  actionTitle: 'Industrial Solutions leads operating margin across all business units',
  source: 'Source: Company financials FY2025',
  exhibitId: 'Exhibit 1.1',
  renderExhibit({ tokens }) {
    const chartId = 'bar-horizontal-chart';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const categoryLabels = { ...figure.dataLabel, color: colors.textStrong };
    const valueLabels = { ...figure.dataLabelStrong, position: 'right', formatter: '{c}%' };
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
          left: ${tokens.adapt(112, 132, 156)},
          right: ${tokens.adapt(26, 44, 56)},
          top: ${tokens.adapt(16, 20, 24)},
          bottom: ${tokens.adapt(10, 14, 18)},
        },
        xAxis: {
          type: 'value',
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(chrome.hiddenAxisLabels)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'category',
          data: ['Corporate Services', 'Retail', 'Logistics', 'Digital', 'Healthcare', 'Energy', 'Industrial Solutions'],
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(categoryLabels)},
        },
        series: [{
          type: 'bar',
          data: [8.2, 11.5, 14.3, 17.8, 19.4, 22.1, 26.7],
          barWidth: ${tokens.chartBarWidth},
          itemStyle: {
            borderRadius: [0, 6, 6, 0],
            color: (params) => params.dataIndex === 6 ? '#123A63' : '#C7D5E5',
          },
          label: {
            show: true,
            ...${JSON.stringify(valueLabels)},
          },
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
