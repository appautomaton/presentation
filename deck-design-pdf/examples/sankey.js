const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'sankey',
  title: 'Sankey',
  tier: 4,
  proves: 'how value flows from sources through channels to products',
  data: 'Revenue allocation: customer segment → channel → product line',
  sectionLabel: 'Revenue Flow',
  actionTitle: 'Enterprise services generate 40% of total revenue, flowing primarily through direct sales',
  source: 'Source: Revenue allocation model FY2025, $M',
  exhibitId: 'Exhibit T4.4',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 900, height: 506 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 960, height: 540 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'sankey labels and flow widths need horizontal space to remain legible',
  },
  renderExhibit({ tokens }) {
    const chartId = 'sankey-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const sankeyLabel = {
      ...figure.dataLabelLargeStrong,
      color: colors.textStrong,
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
        series: [{
          type: 'sankey',
          orient: 'horizontal',
          left: ${tokens.adapt(28, 40, 48)},
          right: ${tokens.adapt(88, 108, 124)},
          top: ${tokens.adapt(16, 24, 28)},
          bottom: ${tokens.adapt(16, 24, 28)},
          nodeWidth: ${tokens.adapt(16, 22, 26)},
          nodeGap: ${tokens.adapt(12, 16, 20)},
          layoutIterations: 32,
          label: { ...${JSON.stringify(sankeyLabel)}, color: '${colors.textStrong}' },
          lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.3 },
          itemStyle: { borderWidth: 0 },
          data: [
            { name: 'Enterprise', itemStyle: { color: '${colors.accent}' } },
            { name: 'Mid-Market', itemStyle: { color: '${colors.accentAlt}' } },
            { name: 'SMB', itemStyle: { color: '${colors.textLight}' } },
            { name: 'Direct Sales', itemStyle: { color: '${colors.accent}' } },
            { name: 'Channel', itemStyle: { color: '${colors.accentSoft}' } },
            { name: 'Digital', itemStyle: { color: '${colors.textLight}' } },
            { name: 'Services', itemStyle: { color: '${colors.accent}' } },
            { name: 'Software', itemStyle: { color: '${colors.accentAlt}' } },
            { name: 'Hardware', itemStyle: { color: '${colors.axisLine}' } },
          ],
          links: [
            { source: 'Enterprise', target: 'Direct Sales', value: 820 },
            { source: 'Enterprise', target: 'Channel', value: 280 },
            { source: 'Mid-Market', target: 'Direct Sales', value: 340 },
            { source: 'Mid-Market', target: 'Channel', value: 260 },
            { source: 'Mid-Market', target: 'Digital', value: 180 },
            { source: 'SMB', target: 'Digital', value: 320 },
            { source: 'SMB', target: 'Channel', value: 140 },
            { source: 'Direct Sales', target: 'Services', value: 680 },
            { source: 'Direct Sales', target: 'Software', value: 380 },
            { source: 'Direct Sales', target: 'Hardware', value: 100 },
            { source: 'Channel', target: 'Services', value: 340 },
            { source: 'Channel', target: 'Software', value: 240 },
            { source: 'Channel', target: 'Hardware', value: 100 },
            { source: 'Digital', target: 'Software', value: 380 },
            { source: 'Digital', target: 'Services', value: 80 },
            { source: 'Digital', target: 'Hardware', value: 40 },
          ],
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
