const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'bubble-scatter',
  title: 'Bubble Scatter',
  tier: 2,
  proves: 'positioning with three variables (x, y, size)',
  data: 'Market segments by attractiveness versus competitive position; bubble size = TAM ($B)',
  sectionLabel: 'Market Positioning',
  actionTitle: 'Cloud infrastructure and data analytics represent the largest addressable opportunities',
  source: 'Source: Market research, team analysis. Bubble size = TAM ($B)',
  exhibitId: 'Exhibit 8.1',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 960, height: 540 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 1024, height: 576 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'bubble labels and quadrant annotations are too dense for sm',
  },
  renderExhibit({ tokens }) {
    const chartId = 'bubble-scatter-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const xAxisTitle = figure.axisTitle;
    const yAxisTitle = figure.axisTitle;
    const priorityBetLabel = { ...figure.annotationStrong, color: colors.accent };
    const buildPositionLabel = { ...figure.annotationStrong, color: colors.textMuted };
    const xAxisCallout = { ...figure.axisTitle, color: colors.textMuted };
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const points = [
        { name: 'Cloud Infra', x: 75, y: 82, tam: 48, color: '#123A63', labelColor: '#ffffff', labelPos: 'inside' },
        { name: 'Data Analytics', x: 60, y: 78, tam: 35, color: '#2E7D9B', labelColor: '#ffffff', labelPos: 'inside' },
        { name: 'Cybersecurity', x: 85, y: 55, tam: 22, color: '#8BA5BD', labelColor: '#123A63', labelPos: 'top' },
        { name: 'AI / ML Platform', x: 40, y: 70, tam: 28, color: '#A7C9DE', labelColor: '#123A63', labelPos: 'right' },
        { name: 'Dev Tools', x: 70, y: 40, tam: 15, color: '#D6E3EE', labelColor: '#123A63', labelPos: 'top' },
        { name: 'IoT', x: 30, y: 45, tam: 12, color: '#E4EDF7', labelColor: '#123A63', labelPos: 'right' },
        { name: 'Edge Compute', x: 55, y: 30, tam: 8, color: '#EEF4F9', labelColor: '#123A63', labelPos: 'bottom' },
      ];
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(52, 60, 68)},
          right: ${tokens.adapt(18, 22, 28)},
          top: ${tokens.adapt(22, 26, 30)},
          bottom: ${tokens.adapt(48, 54, 60)},
        },
        xAxis: {
          type: 'value',
          min: 15,
          max: 100,
          nameTextStyle: ${JSON.stringify(xAxisTitle)},
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(chrome.hiddenAxisLabels)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value',
          min: 15,
          max: 100,
          name: 'Market attractiveness',
          nameLocation: 'center',
          nameGap: ${tokens.adapt(34, 40, 46)},
          nameTextStyle: ${JSON.stringify(yAxisTitle)},
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify(chrome.hiddenAxisLabels)},
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        graphic: [
          {
            type: 'line',
            shape: { x1: '50%', y1: 10, x2: '50%', y2: '92%' },
            style: { stroke: '#D7E4EE', lineDash: [4, 4], lineWidth: 1 },
          },
          {
            type: 'line',
            shape: { x1: ${tokens.adapt(52, 60, 68)}, y1: '52%', x2: '98%', y2: '52%' },
            style: { stroke: '#D7E4EE', lineDash: [4, 4], lineWidth: 1 },
          },
          {
            type: 'text',
            left: '62%',
            top: 10,
            style: { ...${JSON.stringify(priorityBetLabel)}, text: 'Priority bets', fill: '${colors.accent}' },
          },
          {
            type: 'text',
            left: '12%',
            top: 10,
            style: { ...${JSON.stringify(buildPositionLabel)}, text: 'Build position', fill: '${colors.textMuted}' },
          },
          {
            type: 'text',
            left: '43%',
            top: '89%',
            style: { ...${JSON.stringify(xAxisCallout)}, text: 'Competitive position', fill: '${colors.textMuted}' },
          },
        ],
        series: [{
          type: 'scatter',
          labelLayout: { hideOverlap: true },
          data: points.map((point) => ({
            value: [point.x, point.y],
            symbolSize: Math.round((20 + point.tam * 0.85) * ${tokens.bubbleScale}),
            label: {
              show: true,
              formatter: point.name + '\\n$' + point.tam + 'B',
              ...${JSON.stringify(figure.annotationStrong)},
              lineHeight: ${tokens.bubbleLabelLineHeight},
              color: point.labelColor,
              position: point.labelPos,
            },
            itemStyle: {
              color: point.color,
              opacity: 0.92,
            },
          })),
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
