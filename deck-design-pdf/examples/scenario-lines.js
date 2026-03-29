// ════════════════════════════════════════════════════════════════════════
// Scenario Lines — multiple forecast paths diverging from a common base
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap categories, series arrays, and thresholds
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
  id: 'scenario-lines',
  title: 'Scenario Lines',
  tier: 2,
  proves: 'multiple forecast paths with range',
  data: 'Revenue projections under three scenarios',
  sectionLabel: 'Revenue Forecast',
  actionTitle: 'Base case projects $6.8B by FY2028; upside reaches $8.2B with M&A acceleration',
  source: 'Source: Financial planning model, March 2026',
  exhibitId: 'Exhibit 13.1',

  renderExhibit({ tokens }) {
    const chartId = 'scenario-lines-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily   = 'sans-serif';
    const textColor    = '#101A27';
    const textMuted    = '#4E6176';
    const accent       = '#123A63';           // base + upside lines
    const downsideClr  = '#8BA5BD';           // downside line
    const thresholdClr = '#2E9E5A';           // forecast boundary
    const axisLine     = '#C7D5E5';
    const gridLine     = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const categories   = ['FY2023', 'FY2024', 'FY2025', 'FY2026E', 'FY2027E', 'FY2028E'];
    const upsideData   = [3.6, 3.8, 4.2, 5.4, 6.6, 8.2];
    const baseData     = [3.6, 3.8, 4.2, 5.0, 5.8, 6.8];
    const downsideData = [3.6, 3.8, 4.2, 4.5, 4.9, 5.4];
    const yMin         = 3;
    const forecastIdx  = 3;                   // index where forecast begins (FY2026E)
    const forecastLabel = 'Forecast';
    const valueUnit    = 'B';                 // unit suffix for Y-axis labels

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
      chart.setOption({
        animation: false,
        tooltip: { show: false },
        legend: {
          show: true,
          top: 0, right: 0,
          textStyle: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          itemWidth: 20, itemHeight: 2,
        },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'category',
          data: ${JSON.stringify(categories)},
          boundaryGap: false,
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       alignMinLabel: 'left', alignMaxLabel: 'right' },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          min: ${yMin},
          axisLine:  { show: false },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       formatter: (v) => '$' + (Number.isInteger(v) ? v.toFixed(0) : v.toFixed(1)) + '${valueUnit}' },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        series: [
          {
            name: 'Upside',
            type: 'line',
            data: ${JSON.stringify(upsideData)},
            symbol: 'circle',
            symbolSize: ${pointSize},
            lineStyle: { width: ${Math.max(lineWidth - 0.5, 1.5).toFixed(1)}, color: '${accent}', type: [8, 4] },
            itemStyle: { color: '${accent}' },
          },
          {
            name: 'Base',
            type: 'line',
            data: ${JSON.stringify(baseData)},
            symbol: 'circle',
            symbolSize: ${pointSize + 1},
            lineStyle: { width: ${lineWidth}, color: '${accent}' },
            itemStyle: { color: '${accent}' },
            markLine: {
              silent: true,
              symbol: 'none',
              lineStyle: { color: '${thresholdClr}', type: 'dashed', width: 1.5 },
              label: {
                show: true,
                position: 'insideMiddleTop',
                fontSize: ${fontSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${thresholdClr}',
                formatter: '${forecastLabel}',
              },
              data: [{ xAxis: ${forecastIdx} }],
            },
          },
          {
            name: 'Downside',
            type: 'line',
            data: ${JSON.stringify(downsideData)},
            symbol: 'circle',
            symbolSize: ${pointSize},
            lineStyle: { width: ${Math.max(lineWidth - 0.5, 1.5).toFixed(1)}, color: '${downsideClr}', type: [8, 4] },
            itemStyle: { color: '${downsideClr}' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
