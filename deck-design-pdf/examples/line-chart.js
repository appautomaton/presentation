// ════════════════════════════════════════════════════════════════════════
// Line Chart — multi-series trend over time ("What changed?")
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap categories, series names/values, and any
//                         target/threshold lines with real data
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
  id: 'line-chart',
  title: 'Line Chart',
  tier: 1,
  proves: 'trend over time ("What changed?")',
  data: 'Quarterly revenue by segment, 8 quarters',
  sectionLabel: 'Revenue Trend',
  actionTitle: 'Enterprise segment accelerated through 2025 while SMB plateaued in Q3',
  source: 'Source: Internal revenue reporting',
  exhibitId: 'Exhibit 3.1',

  renderExhibit({ tokens }) {
    const chartId = 'line-chart-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily     = 'sans-serif';
    const textMuted      = '#4E6176';
    const accent         = '#123A63';           // primary series
    const secondaryColor = '#8BA5BD';           // secondary series
    const tertiaryColor  = '#C7D5E5';           // tertiary series
    const targetColor    = '#2E9E5A';           // target/threshold line
    const axisLineColor  = '#C7D5E5';
    const gridLineColor  = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const categories = ['Q1 24', 'Q2 24', 'Q3 24', 'Q4 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25'];
    const seriesData = [
      { name: 'Enterprise',  values: [280, 310, 340, 390, 420, 470, 530, 610], color: accent },
      { name: 'Mid-Market',  values: [190, 200, 215, 225, 240, 255, 270, 290], color: secondaryColor },
      { name: 'SMB',         values: [150, 160, 170, 175, 180, 190, 188, 192], color: tertiaryColor },
    ];
    const targetValue = 500;                    // horizontal target line (set null to disable)
    const targetLabel = 'Target: $' + targetValue + 'M';
    const valuePrefix = '$';                    // prefix for Y-axis labels
    const valueSuffix = 'M';                    // suffix for Y-axis labels

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange  = [11, 16];            // [min, max] px for axis/legend labels
    const lineWidthRange = [1.5, 3];            // [min, max] px line thickness
    const pointSizeRange = [4, 8];              // [min, max] px data point diameter

    // ── Responsive sizing (computed — don't edit) ───────────────────────
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

    // ── Build series config ─────────────────────────────────────────────
    const seriesBlocks = seriesData.map((s, i) => {
      const isPrimary = i === 0;
      const sw = isPrimary ? lineWidth : Math.max(lineWidth - 0.5, 1.5);
      const sp = isPrimary ? pointSize + 1 : pointSize;
      let block = `{
            name: '${s.name}',
            type: 'line',
            data: ${JSON.stringify(s.values)},
            smooth: false,
            symbol: 'circle',
            symbolSize: ${sp},
            lineStyle: { width: ${sw}, color: '${s.color}' },
            itemStyle: { color: '${s.color}' },`;
      // Attach markLine to first series when target is set
      if (isPrimary && targetValue != null) {
        block += `
            markLine: {
              silent: true,
              symbol: 'none',
              lineStyle: { color: '${targetColor}', type: 'dashed', width: 1.5 },
              label: {
                show: true,
                position: 'insideMiddleTop',
                fontSize: ${fontSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${targetColor}',
                formatter: '${targetLabel}',
              },
              data: [{ yAxis: ${targetValue} }],
            },`;
      }
      block += `
          }`;
      return block;
    });

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
          axisLine:  { lineStyle: { color: '${axisLineColor}' } },
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
                       formatter: (v) => '${valuePrefix}' + v + '${valueSuffix}' },
          splitLine: { lineStyle: { color: '${gridLineColor}', type: 'dashed' } },
        },
        series: [
          ${seriesBlocks.join(',\n          ')}
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
