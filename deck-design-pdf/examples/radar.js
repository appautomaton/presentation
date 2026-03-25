const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'radar',
  title: 'Radar',
  tier: 4,
  proves: 'multi-dimensional capability profile (5–8 dimensions)',
  data: 'Capability scores across 7 dimensions, us vs. key competitor',
  sectionLabel: 'Capability Assessment',
  actionTitle: 'We lead on product and technology but lag competitors on go-to-market and partnerships',
  source: 'Source: Internal capability assessment, peer benchmarking Q1 2026',
  exhibitId: 'Exhibit T4.5',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 768, height: 432 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 860, height: 484 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'radar charts are relatively compact and tolerate smaller canvases',
  },
  renderExhibit({ tokens }) {
    const chartId = 'radar-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const radarLegend = {
      ...chrome.legendBase,
      textStyle: figure.legendLarge,
    };
    const radarAxisName = {
      ...figure.axisTickLarge,
      color: colors.textMuted,
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
        legend: {
          ...${JSON.stringify(radarLegend)},
          bottom: ${tokens.adapt(4, 8, 12)},
        },
        radar: {
          indicator: [
            { name: 'Product', max: 10 },
            { name: 'Technology', max: 10 },
            { name: 'Go-to-Market', max: 10 },
            { name: 'Partnerships', max: 10 },
            { name: 'Brand', max: 10 },
            { name: 'Talent', max: 10 },
            { name: 'Operations', max: 10 },
          ],
          radius: ${tokens.compact ? "'55%'" : "'65%'"},
          axisName: ${JSON.stringify(radarAxisName)},
          splitArea: { areaStyle: { color: ['#F3F6FA', '#FFFFFF', '#F3F6FA', '#FFFFFF'] } },
          splitLine: { lineStyle: { color: '${colors.gridLine}' } },
          axisLine: { lineStyle: { color: '${colors.axisLine}' } },
        },
        series: [{
          type: 'radar',
          data: [
            {
              name: 'Our Company',
              value: [9, 8.5, 5, 4, 7, 7.5, 6.5],
              areaStyle: { color: 'rgba(18, 58, 99, 0.15)' },
              lineStyle: { width: ${tokens.lineWidth}, color: '${colors.accent}' },
              itemStyle: { color: '${colors.accent}' },
              symbol: 'circle', symbolSize: ${tokens.pointSize},
            },
            {
              name: 'Key Competitor',
              value: [7, 6, 8, 8.5, 8, 6, 7],
              areaStyle: { color: 'rgba(139, 165, 189, 0.12)' },
              lineStyle: { width: ${tokens.lineWidth}, color: '${colors.textLight}', type: 'dashed' },
              itemStyle: { color: '${colors.textLight}' },
              symbol: 'circle', symbolSize: ${tokens.pointSize - 1},
            },
          ],
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
