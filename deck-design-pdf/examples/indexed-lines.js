// ════════════════════════════════════════════════════════════════════════
// Indexed Lines — relative growth comparison from a common base (100)
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap categories, series with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Use markLine for target/threshold lines — data-coordinate, auto-responsive
//   • Do NOT use graphic elements for anything tied to data positions
//   • containLabel only covers axis labels — markLine labels and endLabels
//     can overflow the grid. Use legend for series names instead of endLabel,
//     and keep markLine labels inside the grid (insideMiddleTop, not at edges)
//   • alignMinLabel/alignMaxLabel (ECharts 5.5+) pins first/last axis labels
//     so they don't clip — no manual grid padding needed
//   • yAxis formatter is a function — can't be JSON.stringify'd, must be inline

module.exports = {
  id: 'indexed-lines',
  title: 'Indexed Lines',
  tier: 4,
  proves: 'relative growth comparison from a common base (100)',
  data: 'Revenue growth indexed to base year across companies and market',
  sectionLabel: 'Relative Performance',
  actionTitle: 'Company A has outgrown the market and all peers since 2020, with 2.4x cumulative growth',
  source: 'Source: Company financials, market index. Base year 2020 = 100',
  exhibitId: 'Exhibit T4.10',

  renderExhibit({ tokens }) {
    const chartId = 'indexed-lines-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily   = 'sans-serif';
    const textMuted    = '#4E6176';
    const accent       = '#123A63';           // primary series
    const accentAlt    = '#2E7D9B';           // secondary series
    const textLight    = '#8BA5BD';           // market / benchmark
    const axisLineClr  = '#C7D5E5';          // tertiary series + axis
    const gridLine     = '#E4EDF7';
    const thresholdClr = '#2E9E5A';          // threshold markLine

    // ── 2. Data ─────────────────────────────────────────────────────────
    const categories = ['2020', '2021', '2022', '2023', '2024', '2025'];
    // labelOffset: [x, y] nudge for endLabel when lines converge at the end.
    // Agents should adjust these if end values change — lines ending close
    // together need vertical separation so labels don't overlap.
    const series = [
      { name: 'Company A', data: [100, 118, 142, 175, 210, 240], color: accent,     weight: 'bold', primary: true, labelOffset: [-8, 0] },
      { name: 'Company B', data: [100, 108, 118, 130, 138, 148], color: accentAlt,  weight: 'normal', labelOffset: [-8, -8] },
      { name: 'Market',    data: [100, 106, 114, 122, 130, 140], color: textLight,  weight: 'normal', dashed: true, noSymbol: true, labelOffset: [-8, 0] },
      { name: 'Company C', data: [100, 105, 112, 120, 125, 132], color: axisLineClr, weight: 'normal', labelOffset: [-8, 8] },
    ];
    const baseValue    = 100;                 // horizontal threshold line
    const baseLabel    = 'Base = 100';

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange   = [11, 16];         // [min, max] px for axis/legend labels
    const lineWidthRange  = [1.5, 3];         // [min, max] px line thickness
    const pointSizeRange  = [4, 8];           // [min, max] px data point diameter

    // ── 4. Responsive sizing (computed — don't edit) ────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const [lwMin, lwMax] = lineWidthRange;
    const lineWidth = Math.max(lwMin, Math.min(lwMax,
      +(lwMin + (minDim - 300) / (720 - 300) * (lwMax - lwMin)).toFixed(1)));

    const [ptMin, ptMax] = pointSizeRange;
    const pointSize = Math.max(ptMin, Math.min(ptMax,
      Math.round(ptMin + (minDim - 300) / (720 - 300) * (ptMax - ptMin))));

    // ── Build ECharts series ────────────────────────────────────────────
    const echartsSeriesJSON = JSON.stringify(series.map((s, i) => {
      const isPrimary = !!s.primary;
      const lw = isPrimary ? lineWidth : Math.max(lineWidth - 0.5, 1.5);
      const ps = isPrimary ? pointSize + 1 : (i === series.length - 1 ? Math.max(pointSize - 1, 3) : pointSize);
      const obj = {
        name: s.name,
        type: 'line',
        data: s.data,
        smooth: false,
        symbol: s.noSymbol ? 'none' : 'circle',
        symbolSize: ps,
        lineStyle: { width: lw, color: s.color },
        itemStyle: { color: s.color },
      };
      if (s.dashed) {
        obj.lineStyle.type = [6, 4];
      }
      // Inline label at end of line — no legend needed
      obj.endLabel = {
        show: true,
        formatter: s.name,
        fontSize, fontFamily, fontWeight: 'bold',
        color: s.color,
        align: 'right',
        offset: s.labelOffset || [-8, 0],
        valueAnimation: false,
      };
      // Attach markLine to the first series for the base threshold
      if (i === 0) {
        obj.markLine = {
          silent: true,
          symbol: 'none',
          lineStyle: { color: thresholdClr, type: 'dashed', width: 1.5 },
          label: {
            show: true,
            position: 'insideMiddleTop',
            fontSize, fontFamily, fontWeight: 'bold', color: thresholdClr,
            formatter: baseLabel,
          },
          data: [{ yAxis: baseValue }],
        };
      }
      return obj;
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
        legend: { show: false },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'category',
          data: ${JSON.stringify(categories)},
          boundaryGap: false,
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
                       formatter: (v) => v + 'x' },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        series: ${echartsSeriesJSON},
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
