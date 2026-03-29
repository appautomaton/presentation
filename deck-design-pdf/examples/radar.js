// ════════════════════════════════════════════════════════════════════════
// Radar — multi-dimensional capability profile (5–8 dimensions)
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: compact, works in portrait, landscape, or square.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap indicators and series values
//   3. Sizing limits    → tune the knobs if defaults don't fit
//
// ECharts gotchas:
//   • Radar uses a special 'radar' coordinate, not xAxis/yAxis
//   • radius as percentage auto-adapts to container
//   • Legend identifies series (us vs competitor)

module.exports = {
  id: 'radar',
  title: 'Radar',
  tier: 4,
  proves: 'multi-dimensional capability profile (5–8 dimensions)',
  data: 'Capability scores across 7 dimensions, us vs. key competitor',
  sectionLabel: 'Capability Assessment',
  actionTitle: 'We lead on product and technology but lag competitors on go-to-market and partnerships',
  source: 'Source: Internal capability assessment, peer benchmarking Q1 2026',
  exhibitId: 'Exhibit T4.5',

  renderExhibit({ tokens }) {
    const chartId = 'radar-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily  = 'sans-serif';
    const textMuted   = '#4E6176';
    const accent      = '#123A63';
    const competitor   = '#8BA5BD';
    const axisLine    = '#C7D5E5';
    const gridLine    = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const indicators = [
      { name: 'Product', max: 10 },
      { name: 'Technology', max: 10 },
      { name: 'Go-to-Market', max: 10 },
      { name: 'Partnerships', max: 10 },
      { name: 'Brand', max: 10 },
      { name: 'Talent', max: 10 },
      { name: 'Operations', max: 10 },
    ];

    const series = [
      { name: 'Our Company',    values: [9, 8.5, 5, 4, 7, 7.5, 6.5], color: accent, solid: true },
      { name: 'Key Competitor', values: [7, 6, 8, 8.5, 8, 6, 7],     color: competitor, solid: false },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange  = [11, 16];
    const lineWidthRange = [1.5, 3];
    const pointSizeRange = [3, 7];

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const lineWidth = Math.max(lineWidthRange[0], Math.min(lineWidthRange[1],
      +(lineWidthRange[0] + (minDim - 300) / (720 - 300) * (lineWidthRange[1] - lineWidthRange[0])).toFixed(1)));

    const pointSize = Math.max(pointSizeRange[0], Math.min(pointSizeRange[1],
      Math.round(pointSizeRange[0] + (minDim - 300) / (720 - 300) * (pointSizeRange[1] - pointSizeRange[0]))));

    const radarRadius = minDim < 400 ? '50%' : '60%';

    // Build series data
    const seriesData = series.map(s => ({
      name: s.name,
      value: s.values,
      areaStyle: { color: s.color.replace('#', 'rgba(') ? `rgba(${parseInt(s.color.slice(1,3),16)},${parseInt(s.color.slice(3,5),16)},${parseInt(s.color.slice(5,7),16)},0.12)` : 'transparent' },
      lineStyle: { width: lineWidth, color: s.color, type: s.solid ? 'solid' : 'dashed' },
      itemStyle: { color: s.color },
      symbol: 'circle',
      symbolSize: s.solid ? pointSize : pointSize - 1,
    }));

    // ── Template ────────────────────────────────────────────────────────
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
        tooltip: { show: false },
        legend: {
          show: true, bottom: 0,
          textStyle: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          itemWidth: 20, itemHeight: 2,
        },
        radar: {
          indicator: ${JSON.stringify(indicators)},
          radius: '${radarRadius}',
          axisName: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          splitArea: { areaStyle: { color: ['#F3F6FA', '#FFFFFF', '#F3F6FA', '#FFFFFF'] } },
          splitLine: { lineStyle: { color: '${gridLine}' } },
          axisLine: { lineStyle: { color: '${axisLine}' } },
        },
        series: [{
          type: 'radar',
          data: ${JSON.stringify(seriesData)},
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
