const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'line-chart',
  title: 'Line Chart',
  tier: 1,
  proves: 'trend over time ("What changed?")',
  data: 'Quarterly revenue by segment, 8 quarters',
  sectionLabel: 'Revenue Trend',
  actionTitle: 'Enterprise segment accelerated through 2025 while SMB plateaued in Q3',
  source: 'Source: Internal revenue reporting',
  exhibitId: 'Exhibit 3.1',
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
    rationale: 'multi-series trend lines with end labels and eight periods need more horizontal breathing room than the default minimum',
  },
  renderExhibit({ tokens }) {
    const chartId = 'line-chart-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const axisCategory = { ...figure.axisTitle, fontWeight: 'normal' };
    const enterpriseLabel = { ...figure.annotationStrong, color: colors.accent };
    const midMarketLabel = { ...figure.annotation, color: colors.textLight };
    const smbLabel = { ...figure.annotation, color: colors.textLight };
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
          left: ${tokens.adapt(50, 60, 68)},
          right: ${tokens.adapt(78, 104, 122)},
          top: ${tokens.adapt(18, 20, 26)},
          bottom: ${tokens.adapt(42, 48, 54)},
        },
        xAxis: {
          type: 'category',
          data: ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25'],
          boundaryGap: false,
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: {
            ...${JSON.stringify(axisCategory)},
            margin: ${tokens.adapt(12, 14, 16)},
          },
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
            name: 'Enterprise',
            type: 'line',
            data: [280, 310, 340, 390, 420, 470, 530, 610],
            smooth: false,
            symbol: 'circle',
            symbolSize: ${tokens.pointSize + 1},
            lineStyle: { width: ${tokens.lineWidth}, color: '#123A63' },
            itemStyle: { color: '#123A63' },
            endLabel: {
              show: true,
              ...${JSON.stringify(enterpriseLabel)},
              formatter: '{a}\\n$610M',
            },
          },
          {
            name: 'Mid-Market',
            type: 'line',
            data: [190, 200, 215, 225, 240, 255, 270, 290],
            smooth: false,
            symbol: 'circle',
            symbolSize: ${tokens.pointSize},
            lineStyle: { width: ${Math.max(tokens.lineWidth - 0.5, 1.5)}, color: '#8BA5BD' },
            itemStyle: { color: '#8BA5BD' },
            endLabel: {
              show: true,
              ...${JSON.stringify(midMarketLabel)},
              formatter: '{a}\\n$290M',
            },
          },
          {
            name: 'SMB',
            type: 'line',
            data: [150, 160, 170, 175, 180, 190, 188, 192],
            smooth: false,
            symbol: 'circle',
            symbolSize: ${tokens.pointSize},
            lineStyle: { width: ${Math.max(tokens.lineWidth - 0.5, 1.5)}, color: '#C7D5E5' },
            itemStyle: { color: '#C7D5E5' },
            endLabel: {
              show: true,
              ...${JSON.stringify(smbLabel)},
              formatter: '{a}\\n$192M',
            },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
