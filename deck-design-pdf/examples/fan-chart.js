// ════════════════════════════════════════════════════════════════════════
// Fan Chart — forecast with widening confidence intervals
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap years, base, bands with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Fan bands use stacked areas: invisible base + delta for each band
//   • Do NOT use graphic elements for forecast dividers — use markLine
//   • containLabel only covers axis labels — markLine labels and endLabels
//     can overflow the grid. Use legend for series names instead of endLabel,
//     and keep markLine labels inside the grid (insideMiddleTop, not at edges)
//   • alignMinLabel/alignMaxLabel (ECharts 5.5+) pins first/last axis labels
//     so they don't clip — no manual grid padding needed
//   • yAxis formatter is a function — can't be JSON.stringify'd, must be inline

module.exports = {
  id: 'fan-chart',
  title: 'Fan Chart',
  tier: 4,
  proves: 'forecast with widening confidence intervals',
  data: 'Revenue projection with P10–P90 and P25–P75 confidence bands',
  sectionLabel: 'Revenue Forecast',
  actionTitle: 'Base case reaches $8.4B by 2030 with widening confidence interval reflecting macro uncertainty',
  source: 'Source: Financial planning model, Monte Carlo simulation (n=10,000 paths)',
  exhibitId: 'Exhibit T4.9',

  renderExhibit({ tokens }) {
    const chartId = 'fanchart-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily   = 'sans-serif';
    const textColor    = '#101A27';
    const textMuted    = '#4E6176';
    const textLight    = '#8BA5BD';
    const accent       = '#123A63';           // base case line
    const outerBand    = 'rgba(18,58,99,0.06)'; // P10–P90
    const innerBand    = 'rgba(18,58,99,0.12)'; // P25–P75
    const forecastLine = '#C7D5E5';           // forecast divider
    const axisLine     = '#C7D5E5';
    const gridLine     = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const years = ['2023', '2024', '2025', '2026E', '2027E', '2028E', '2029E', '2030E'];
    const base  = [3.6, 3.9, 4.2, 4.8, 5.6, 6.4, 7.3, 8.4];
    const p10   = [3.6, 3.9, 4.2, 4.4, 4.8, 5.1, 5.3, 5.5];
    const p90   = [3.6, 3.9, 4.2, 5.2, 6.4, 7.8, 9.4, 11.2];
    const p25   = [3.6, 3.9, 4.2, 4.6, 5.2, 5.7, 6.2, 6.8];
    const p75   = [3.6, 3.9, 4.2, 5.0, 6.0, 7.0, 8.2, 9.6];
    const forecastStartIndex = 3;             // index where forecast begins (xAxis value for markLine)
    const valueUnit = 'B';                    // unit suffix for Y-axis labels

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

    // ── Template ────────────────────────────────────────────────────────
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const years = ${JSON.stringify(years)};
      const base = ${JSON.stringify(base)};
      const p10 = ${JSON.stringify(p10)};
      const p90 = ${JSON.stringify(p90)};
      const p25 = ${JSON.stringify(p25)};
      const p75 = ${JSON.stringify(p75)};
      chart.setOption({
        animation: false,
        tooltip: { show: false },
        legend: {
          show: true,
          top: 0, right: 0,
          textStyle: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          itemWidth: 20, itemHeight: 2,
          data: ['Base', 'P25\u2013P75', 'P10\u2013P90'],
        },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'category',
          data: years,
          boundaryGap: false,
          axisLine:  { lineStyle: { color: '${axisLine}' } },
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
                       formatter: (v) => '$' + v + '${valueUnit}' },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        series: [
          {
            name: 'P10-floor',
            type: 'line', data: p10, stack: 'outer',
            areaStyle: { color: 'transparent' },
            lineStyle: { width: 0 }, symbol: 'none', silent: true,
            legendHoverLink: false,
          },
          {
            name: 'P10\u2013P90',
            type: 'line', data: p90.map((v, i) => +(v - p10[i]).toFixed(2)), stack: 'outer',
            areaStyle: { color: '${outerBand}' },
            lineStyle: { width: 0 }, symbol: 'none', silent: true,
          },
          {
            name: 'P25-floor',
            type: 'line', data: p25, stack: 'inner',
            areaStyle: { color: 'transparent' },
            lineStyle: { width: 0 }, symbol: 'none', silent: true,
            legendHoverLink: false,
          },
          {
            name: 'P25\u2013P75',
            type: 'line', data: p75.map((v, i) => +(v - p25[i]).toFixed(2)), stack: 'inner',
            areaStyle: { color: '${innerBand}' },
            lineStyle: { width: 0 }, symbol: 'none', silent: true,
          },
          {
            name: 'Base',
            type: 'line', data: base,
            smooth: false,
            symbol: 'circle', symbolSize: ${pointSize},
            lineStyle: { width: ${lineWidth}, color: '${accent}' },
            itemStyle: { color: '${accent}' },
            markLine: {
              silent: true,
              symbol: 'none',
              lineStyle: { color: '${forecastLine}', type: [4, 4], width: 1 },
              label: {
                show: true,
                position: 'insideMiddleTop',
                fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textLight}',
                formatter: 'Forecast \u2192',
              },
              data: [{ xAxis: ${forecastStartIndex} }],
            },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
