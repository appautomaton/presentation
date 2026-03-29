// ════════════════════════════════════════════════════════════════════════
// 100% Stacked Bar — share comparison across categories
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap categories, series names, and values
//   3. Sizing limits    → tune the knobs if defaults don't fit
//
// ECharts gotchas:
//   • Inside labels on dark bars need white text — set per series
//   • Legend identifies series — ECharts handles layout automatically

module.exports = {
  id: 'stacked-bar-100',
  title: '100% Stacked Bar',
  tier: 2,
  proves: 'share comparison across categories',
  data: 'Channel mix evolution over 4 years',
  sectionLabel: 'Channel Evolution',
  actionTitle: 'Direct digital grew from 18% to 34% of revenue in four years, displacing field sales',
  source: 'Source: Revenue by channel, FY2022–FY2025',
  exhibitId: 'Exhibit 12.1',

  renderExhibit({ tokens }) {
    const chartId = 'stacked-bar-100-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily = 'sans-serif';
    const textColor  = '#101A27';
    const textMuted  = '#4E6176';
    const axisLine   = '#C7D5E5';
    const gridLine   = '#E4EDF7';

    const seriesColors = ['#123A63', '#2E7D9B', '#8BA5BD', '#5BA4C9'];

    // ── 2. Data ─────────────────────────────────────────────────────────
    const categories = ['FY2022', 'FY2023', 'FY2024', 'FY2025'];
    const series = [
      { name: 'Field Sales',      data: [45, 38, 32, 26] },
      { name: 'Inside Sales',     data: [22, 23, 22, 20] },
      { name: 'Channel Partners', data: [15, 16, 18, 20] },
      { name: 'Direct Digital',   data: [18, 23, 28, 34] },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange = [10, 15];           // [min, max] px for labels
    const barWidthRange = [28, 80];           // [min, max] px bar thickness

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const barWidth = Math.max(barWidthRange[0], Math.min(barWidthRange[1],
      Math.round(tokens.width / categories.length * 0.5)));

    // ── Template ────────────────────────────────────────────────────────
    const seriesConfig = series.map((s, i) => ({
      name: s.name,
      type: 'bar',
      stack: 'total',
      data: s.data,
      barWidth: barWidth,
      itemStyle: { color: seriesColors[i] },
      label: {
        show: true,
        position: 'inside',
        fontSize: fontSize - 1,
        fontFamily: fontFamily,
        fontWeight: i === series.length - 1 ? 'bold' : 'normal',
        color: '#FFFFFF',
        formatter: '{c}%',
      },
    }));

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
          itemWidth: 14, itemHeight: 14,
        },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'category',
          data: ${JSON.stringify(categories)},
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${textColor}',
                       alignMinLabel: 'left', alignMaxLabel: 'right' },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLine:  { show: false },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       formatter: '{value}%' },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        series: ${JSON.stringify(seriesConfig)},
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
