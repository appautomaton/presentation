const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'matrix-2x2',
  title: '2×2 Matrix',
  tier: 2,
  proves: 'strategic positioning on two dimensions',
  data: 'Business units positioned by growth versus margin; bubble size = revenue',
  sectionLabel: 'Portfolio Strategy',
  actionTitle: 'Two business units warrant accelerated investment based on growth-margin position',
  source: 'Source: BU financials FY2025, bubble size = revenue',
  exhibitId: 'Exhibit 7.1',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 920, height: 520 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 1024, height: 576 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'quadrant labels and bubble names need at least md width',
  },
  renderExhibit({ tokens }) {
    const chartId = 'matrix-2x2-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const quadrantMuted = { ...figure.annotationStrong, color: colors.textMuted };
    const quadrantAccent = { ...figure.annotationStrong, color: colors.accent };
    const axisTitle = figure.axisTitle;
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const points = [
        { name: 'Digital', code: 'DIG', x: 70, y: 75, revenue: 44, highlight: true, labelPos: 'inside' },
        { name: 'Healthcare', code: 'HC', x: 55, y: 65, revenue: 36, highlight: true, labelPos: 'inside' },
        { name: 'Energy', code: 'EN', x: 68, y: 34, revenue: 26, highlight: false, labelPos: 'right' },
        { name: 'Retail', code: 'RT', x: 24, y: 18, revenue: 18, highlight: false, labelPos: 'bottom' },
        { name: 'Logistics', code: 'LOG', x: 32, y: 50, revenue: 22, highlight: false, labelPos: 'left' },
        { name: 'Corp Svc', code: 'CS', x: 45, y: 12, revenue: 14, highlight: false, labelPos: 'bottom' },
      ];
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(54, 64, 74)},
          right: ${tokens.adapt(20, 26, 32)},
          top: ${tokens.adapt(28, 32, 38)},
          bottom: ${tokens.adapt(48, 52, 60)},
        },
        xAxis: {
          type: 'value',
          min: 10,
          max: 80,
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(chrome.hiddenAxisLabels)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 90,
          name: 'Revenue growth (%)',
          nameLocation: 'center',
          nameGap: ${tokens.adapt(34, 40, 46)},
          nameTextStyle: ${JSON.stringify(axisTitle)},
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(chrome.hiddenAxisLabels)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        graphic: [
          {
            type: 'rect',
            left: '53%',
            top: '8%',
            shape: { width: 160, height: 100 },
            style: { fill: 'rgba(18,58,99,0.04)' },
          },
          {
            type: 'text',
            left: '10%',
            top: '10%',
            style: { ...${JSON.stringify(quadrantMuted)}, text: 'Invest\\nto grow', fill: '${colors.textMuted}' },
          },
          {
            type: 'text',
            left: '67%',
            top: '10%',
            style: { ...${JSON.stringify(quadrantAccent)}, text: 'Accelerate', fill: '${colors.accent}' },
          },
          {
            type: 'text',
            left: '10%',
            top: '76%',
            style: { ...${JSON.stringify(quadrantMuted)}, text: 'Rationalize', fill: '${colors.textMuted}' },
          },
          {
            type: 'text',
            left: '71%',
            top: '76%',
            style: { ...${JSON.stringify(quadrantMuted)}, text: 'Harvest', fill: '${colors.textMuted}' },
          },
          {
            type: 'text',
            left: '42%',
            top: '92%',
            style: { ...${JSON.stringify(axisTitle)}, text: 'EBITDA margin (%)', fill: '${colors.textMuted}' },
          },
        ],
        series: [{
          type: 'scatter',
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: { color: '#D7E4EE', type: 'dashed', width: 1 },
            data: [{ xAxis: 45 }, { yAxis: 45 }],
          },
          labelLayout: { hideOverlap: true },
          data: points.map((point) => ({
            value: [point.x, point.y],
            symbolSize: Math.round((18 + point.revenue * 0.65) * ${tokens.bubbleScale}),
            label: {
              show: true,
              formatter: point.labelPos === 'inside' ? point.code : point.name,
              ...${JSON.stringify(figure.annotationStrong)},
              color: point.labelPos === 'inside' ? '#ffffff' : '#123A63',
              position: point.labelPos,
            },
            itemStyle: {
              color: point.highlight ? '#123A63' : '#D7E4EE',
              borderColor: point.highlight ? '#123A63' : '#8BA5BD',
              borderWidth: point.highlight ? 1 : 0.5,
            },
          })),
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
