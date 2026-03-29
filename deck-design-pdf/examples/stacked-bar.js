// ════════════════════════════════════════════════════════════════════════
// Stacked Bar — composition by category ("What's the mix?")
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap categories, series names, and values
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • yAxis formatter is a function — can't be JSON.stringify'd, must be inline
//   • containLabel only covers axis labels — legend or markLine labels can
//     overflow the grid. Reserve top space for legend with grid.top
//   • alignMinLabel/alignMaxLabel (ECharts 5.5+) pins first/last axis labels
//     so they don't clip — no manual grid padding needed
//   • Inside-bar labels need explicit color (#fff for dark bars, dark for
//     light bars) — ECharts won't auto-contrast
//   • barWidth is shared across stacked series — set it on the first only

module.exports = {
  id: 'stacked-bar',
  title: 'Stacked Bar',
  tier: 1,
  proves: 'composition ("What\'s the mix?")',
  data: 'Revenue by segment across regions',
  sectionLabel: 'Revenue Mix',
  actionTitle: 'APAC is the only region where software exceeds services revenue',
  source: 'Source: Regional P&L FY2025, $M',
  exhibitId: 'Exhibit 4.1',

  renderExhibit({ tokens }) {
    const chartId = 'stacked-bar-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily   = 'sans-serif';
    const textMuted    = '#4E6176';
    const axisLineClr  = '#C7D5E5';
    const gridLine     = '#E4EDF7';

    // Series palette — darkest to lightest so inside-label contrast is predictable
    const seriesColors = ['#123A63', '#2E7D9B', '#C7D5E5'];
    // Label color per series: white on dark bars, muted on light bars
    const labelColors  = ['#FFFFFF', '#FFFFFF', '#4E6176'];

    // ── 2. Data ─────────────────────────────────────────────────────────
    const categories = ['North America', 'EMEA', 'APAC', 'LatAm'];
    const series = [
      { name: 'Services', data: [820, 640, 280, 190] },
      { name: 'Software', data: [480, 360, 420, 110] },
      { name: 'Hardware', data: [200, 180, 140, 60] },
    ];
    const valuePrefix = '$';     // prefix for Y-axis and bar labels

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange  = [11, 16];     // [min, max] px for axis/legend labels
    const barWidthRange  = [28, 64];     // [min, max] px bar thickness
    const labelSizeRange = [10, 14];     // [min, max] px for inside-bar labels

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const t = Math.max(0, Math.min(1, (minDim - 300) / (720 - 300)));

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + t * (fontMax - fontMin))));

    const [barMin, barMax] = barWidthRange;
    const barWidth = Math.max(barMin, Math.min(barMax,
      Math.round(barMin + t * (barMax - barMin))));

    const [lblMin, lblMax] = labelSizeRange;
    const labelSize = Math.max(lblMin, Math.min(lblMax,
      Math.round(lblMin + t * (lblMax - lblMin))));

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
          show: true,
          top: 0, right: 0,
          textStyle: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          itemWidth: 16, itemHeight: 10,
        },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'category',
          data: ${JSON.stringify(categories)},
          axisLine:  { lineStyle: { color: '${axisLineClr}' } },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       alignMinLabel: 'left', alignMaxLabel: 'right' },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          axisLine:  { show: false },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       formatter: (v) => '${valuePrefix}' + v },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        series: [
          {
            name: '${series[0].name}',
            type: 'bar',
            stack: 'total',
            data: ${JSON.stringify(series[0].data)},
            barWidth: ${barWidth},
            itemStyle: { color: '${seriesColors[0]}' },
            label: { show: true, position: 'inside', fontSize: ${labelSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${labelColors[0]}',
                     formatter: (p) => '${valuePrefix}' + p.value },
          },
          {
            name: '${series[1].name}',
            type: 'bar',
            stack: 'total',
            data: ${JSON.stringify(series[1].data)},
            itemStyle: { color: '${seriesColors[1]}' },
            label: { show: true, position: 'inside', fontSize: ${labelSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${labelColors[1]}',
                     formatter: (p) => '${valuePrefix}' + p.value },
          },
          {
            name: '${series[2].name}',
            type: 'bar',
            stack: 'total',
            data: ${JSON.stringify(series[2].data)},
            itemStyle: { color: '${seriesColors[2]}' },
            label: { show: true, position: 'inside', fontSize: ${labelSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${labelColors[2]}',
                     formatter: (p) => '${valuePrefix}' + p.value },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
