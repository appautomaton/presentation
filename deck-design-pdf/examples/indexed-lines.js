const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'indexed-lines',
  title: 'Indexed Lines',
  tier: 4,
  proves: 'relative growth comparison from a common base (100)',
  data: 'Revenue growth indexed to base year across companies and market',
  sectionLabel: 'Relative Performance',
  actionTitle: 'Company A has outgrown the market and all peers since 2020, with 2.4x cumulative growth',
  source: 'Source: Company financials, market index. Base year 2020 = 100',
  exhibitId: 'Exhibit T4.10',
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
    rationale: 'indexed lines with end labels are similar to standard trend charts',
  },
  renderExhibit({ tokens }) {
    const chartId = 'indexed-lines-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const primaryLabel = { ...figure.annotationStrong, color: colors.accent };
    const secondaryLabel = { ...figure.annotation, color: colors.accentAlt };
    const marketLabel = { ...figure.annotation, color: colors.textLight };
    const tertiaryLabel = { ...figure.annotation, color: colors.axisLine };
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
          left: ${tokens.adapt(40, 48, 56)},
          right: ${tokens.adapt(90, 110, 128)},
          top: ${tokens.adapt(16, 20, 24)},
          bottom: ${tokens.adapt(30, 40, 48)},
        },
        xAxis: {
          type: 'category',
          data: ['2020', '2021', '2022', '2023', '2024', '2025'],
          boundaryGap: false,
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(figure.axisTick)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(figure.axisTick)},
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        series: [
          {
            name: 'Company A', type: 'line',
            data: [100, 118, 142, 175, 210, 240],
            smooth: false, symbol: 'circle', symbolSize: ${tokens.pointSize + 1},
            lineStyle: { width: ${tokens.lineWidth}, color: '${colors.accent}' },
            itemStyle: { color: '${colors.accent}' },
            endLabel: { show: true, ...${JSON.stringify(primaryLabel)}, formatter: 'Company A\\n240 (2.4x)' },
          },
          {
            name: 'Company B', type: 'line',
            data: [100, 108, 118, 130, 138, 148],
            smooth: false, symbol: 'circle', symbolSize: ${tokens.pointSize},
            lineStyle: { width: ${Math.max(tokens.lineWidth - 0.5, 1.5)}, color: '${colors.accentAlt}' },
            itemStyle: { color: '${colors.accentAlt}' },
            endLabel: { show: true, ...${JSON.stringify(secondaryLabel)}, formatter: 'Company B\\n148' },
          },
          {
            name: 'Market Index', type: 'line',
            data: [100, 106, 114, 122, 130, 140],
            smooth: false, symbol: 'none',
            lineStyle: { width: ${Math.max(tokens.lineWidth - 0.5, 1.5)}, color: '${colors.textLight}', type: [6, 4] },
            endLabel: { show: true, ...${JSON.stringify(marketLabel)}, formatter: 'Market\\n140' },
          },
          {
            name: 'Company C', type: 'line',
            data: [100, 105, 112, 120, 125, 132],
            smooth: false, symbol: 'circle', symbolSize: ${tokens.pointSize - 1},
            lineStyle: { width: ${Math.max(tokens.lineWidth - 1, 1.5)}, color: '${colors.axisLine}' },
            itemStyle: { color: '${colors.axisLine}' },
            endLabel: { show: true, ...${JSON.stringify(tertiaryLabel)}, formatter: 'Company C\\n132' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
