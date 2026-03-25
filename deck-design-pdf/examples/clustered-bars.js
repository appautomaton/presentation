const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'clustered-bars',
  title: 'Clustered Bars',
  tier: 2,
  proves: 'multi-metric comparison side by side',
  data: 'Plan vs. actual vs. prior year by quarter',
  sectionLabel: 'Plan vs. Actual',
  actionTitle: 'Q3 and Q4 actual revenue exceeded both plan and prior year, closing the H1 shortfall',
  source: 'Source: Finance, FY2025 quarterly close',
  exhibitId: 'Exhibit 11.1',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 840, height: 472 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 920, height: 518 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'clustered comparisons can go below md if category count stays low and labels remain short',
  },
  renderExhibit({ tokens }) {
    const chartId = 'clustered-bars-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const categoryAxis = { ...figure.axisTitle, fontWeight: 'normal', color: colors.textStrong };
    const valueAxis = {
      ...figure.axisTick,
      formatter: "(value) => '$' + value + 'M'",
    };
    const priorYearLabel = { ...figure.annotation, position: 'top', color: colors.textLight };
    const planLabel = { ...figure.annotation, position: 'top', color: colors.textMuted };
    const actualLabel = { ...figure.annotationStrong, position: 'top', color: colors.textStrong };
    const legend = {
      ...chrome.legendBase,
      bottom: tokens.adapt(8, 12, 16),
    };
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
        legend: ${JSON.stringify(legend)},
        grid: {
          left: ${tokens.adapt(44, 58, 64)},
          right: ${tokens.adapt(16, 24, 30)},
          top: ${tokens.adapt(18, 20, 26)},
          bottom: ${tokens.adapt(68, 78, 86)},
        },
        xAxis: {
          type: 'category',
          data: ['Q1', 'Q2', 'Q3', 'Q4'],
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(categoryAxis)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: {
            ...${JSON.stringify(figure.axisTick)},
            formatter: (value) => '$' + value + 'M',
          },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        series: [
          {
            name: 'Prior Year',
            type: 'bar',
            data: [820, 860, 910, 950],
            barWidth: ${Math.max(tokens.chartBarWidth - 2, 14)},
            itemStyle: { color: '#C7D5E5' },
            label: { show: true, ...${JSON.stringify(priorYearLabel)} },
          },
          {
            name: 'Plan',
            type: 'bar',
            data: [900, 940, 990, 1040],
            barWidth: ${Math.max(tokens.chartBarWidth - 2, 14)},
            itemStyle: { color: '#8BA5BD' },
            label: { show: true, ...${JSON.stringify(planLabel)} },
          },
          {
            name: 'Actual',
            type: 'bar',
            data: [880, 920, 1020, 1080],
            barWidth: ${Math.max(tokens.chartBarWidth - 2, 14)},
            itemStyle: {
              color: (params) => params.dataIndex >= 2 ? '#123A63' : '#2E7D9B',
              borderRadius: [4, 4, 0, 0],
            },
            label: { show: true, ...${JSON.stringify(actualLabel)} },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
