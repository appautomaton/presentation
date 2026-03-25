const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'funnel',
  title: 'Funnel',
  tier: 4,
  proves: 'pipeline conversion by stage with dropoff rates',
  data: 'Sales pipeline: awareness through closed-won with conversion rates',
  sectionLabel: 'Pipeline Conversion',
  actionTitle: 'Proposal-to-close is the critical bottleneck at 22% conversion vs. 35% industry benchmark',
  source: 'Source: CRM pipeline analytics, trailing 12 months',
  exhibitId: 'Exhibit T4.6',
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
    rationale: 'funnels are vertically oriented and work at smaller sizes',
  },
  renderExhibit({ tokens }) {
    const chartId = 'funnel-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const stages = ['Awareness', 'Interest', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won'];
      const values = [10000, 6200, 3800, 2100, 920, 460];
      const stageColors = ['${colors.accent}', '#1A4E7A', '${colors.accentAlt}', '${colors.accentSoft}', '${colors.textLight}', '${colors.success}'];
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        series: [{
          type: 'funnel',
          left: '15%', right: '15%', top: ${tokens.adapt(16, 24, 28)}, bottom: ${tokens.adapt(16, 24, 28)},
          width: '70%',
          sort: 'descending',
          gap: 3,
          label: {
            show: true, position: 'inside',
            ...${JSON.stringify(figure.dataLabelStrong)},
            color: '#fff',
            formatter: (p) => p.name + '\\n' + p.value.toLocaleString(),
          },
          labelLine: { show: false },
          itemStyle: {
            borderWidth: 0,
            color: (p) => stageColors[p.dataIndex],
          },
          data: stages.map((s, i) => ({ name: s, value: values[i] })),
        }],
        graphic: stages.slice(0, -1).map((s, i) => {
          const rate = Math.round(values[i + 1] / values[i] * 100);
          return {
            type: 'text',
            right: '6%',
            top: (12 + i * 16.5) + '%',
            style: {
              text: rate + '% conv.',
              ...${JSON.stringify(figure.annotation)},
              fill: '${colors.textMuted}',
            },
          };
        }),
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
