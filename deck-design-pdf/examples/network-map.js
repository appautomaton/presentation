const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'network-map',
  title: 'Network / Collaboration Map',
  tier: 3,
  proves: 'formal vs. informal collaboration structure — who actually works with whom',
  data: 'Collaboration network across 8 teams based on meeting frequency and shared deliverables',
  sectionLabel: 'Organizational Analysis',
  actionTitle: 'Engineering and Product collaborate 4× more than the formal structure predicts — Data and Sales are isolated despite shared KPIs',
  source: 'Source: Collaboration analytics (calendar, Slack, shared docs), Q1 2026',
  exhibitId: 'Exhibit 17.1',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 860, height: 484 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 940, height: 529 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'network maps need space for node labels and edge visibility; below minimum, nodes overlap',
  },
  renderExhibit({ tokens }) {
    const chartId = 'network-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);

    const nodeSize = tokens.adapt(28, 40, 48);
    const labelSize = tokens.adapt(10, 12, 13);

    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });

      // Positioned manually for consulting-quality layout (force layout is unpredictable in static PDF)
      var nodes = [
        { name: 'Engineering', x: 300, y: 200, symbolSize: ${nodeSize + 16}, itemStyle: { color: '${colors.accent}' } },
        { name: 'Product', x: 500, y: 160, symbolSize: ${nodeSize + 12}, itemStyle: { color: '${colors.accent}' } },
        { name: 'Design', x: 450, y: 340, symbolSize: ${nodeSize}, itemStyle: { color: '${colors.accentAlt}' } },
        { name: 'Data', x: 150, y: 350, symbolSize: ${nodeSize - 4}, itemStyle: { color: '${colors.textLight}' } },
        { name: 'Sales', x: 700, y: 300, symbolSize: ${nodeSize + 4}, itemStyle: { color: '${colors.textLight}' } },
        { name: 'Marketing', x: 650, y: 150, symbolSize: ${nodeSize - 2}, itemStyle: { color: '${colors.accentSoft}' } },
        { name: 'Operations', x: 200, y: 120, symbolSize: ${nodeSize - 6}, itemStyle: { color: '${colors.accentSoft}' } },
        { name: 'Finance', x: 100, y: 220, symbolSize: ${nodeSize - 8}, itemStyle: { color: '${colors.textLight}' } },
      ];

      // lineWidth = collaboration intensity (meetings/week + shared deliverables)
      var links = [
        { source: 'Engineering', target: 'Product', lineStyle: { width: 6, color: '${colors.accent}' } },
        { source: 'Engineering', target: 'Design', lineStyle: { width: 3.5, color: '${colors.accentAlt}' } },
        { source: 'Product', target: 'Design', lineStyle: { width: 3, color: '${colors.accentAlt}' } },
        { source: 'Product', target: 'Marketing', lineStyle: { width: 2, color: '${colors.borderSoft}' } },
        { source: 'Engineering', target: 'Operations', lineStyle: { width: 2.5, color: '${colors.borderSoft}' } },
        { source: 'Engineering', target: 'Data', lineStyle: { width: 2, color: '${colors.borderSoft}' } },
        { source: 'Sales', target: 'Marketing', lineStyle: { width: 3, color: '${colors.accentSoft}' } },
        { source: 'Finance', target: 'Operations', lineStyle: { width: 1.5, color: '${colors.gridLine}' } },
        { source: 'Sales', target: 'Product', lineStyle: { width: 1.5, color: '${colors.gridLine}' } },
        // Missing link highlighted: Data ↔ Sales should be strong but isn't
        { source: 'Data', target: 'Sales', lineStyle: { width: 1, color: '${colors.danger}', type: 'dashed' } },
      ];

      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        series: [{
          type: 'graph',
          layout: 'none',
          roam: false,
          label: {
            show: true,
            position: 'bottom',
            fontSize: ${labelSize},
            fontWeight: 'bold',
            fontFamily: 'var(--font-body)',
            color: '${colors.textStrong}',
            distance: 8,
          },
          edgeLabel: { show: false },
          data: nodes,
          links: links,
          lineStyle: { curveness: 0.15, opacity: 0.7 },
          itemStyle: { borderColor: '#fff', borderWidth: 2 },
        }],
        graphic: [
          { type: 'text', right: 24, top: 16,
            style: { text: '━ Strong collaboration\\n┅ Weak / missing link', fontSize: ${tokens.microText},
              fill: '${colors.textMuted}', fontFamily: 'var(--font-body)', lineHeight: 18 } },
          // Annotation for the gap
          { type: 'text', left: '22%', bottom: '12%',
            style: { text: '⚠ Data ↔ Sales link is weak\\n   despite shared pipeline KPIs', fontSize: ${tokens.smallText},
              fill: '${colors.danger}', fontFamily: 'var(--font-body)', fontWeight: 'bold', lineHeight: 18 } },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
