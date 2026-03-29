// ════════════════════════════════════════════════════════════════════════
// Burndown — progress toward target over time (actual vs plan)
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap months, plan, actual, target with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts layout gotchas (so the agent doesn't rediscover them):
//
//   Grid padding uses percentages, not pixels, so it scales with container.
//   • containLabel:true only covers axis labels — NOT markLine or endLabel
//   • Top Y-axis label clips without top padding (known ECharts bug #15562)
//   • endLabel overflows the grid (ignoreClip:true in source, #17828)
//   • Fix: grid.top/right as '%' gives both room to breathe, responsively
//
//   Line labels use endLabel (built-in, auto-positions at last data point):
//   • align:'right' makes text grow leftward so it stays inside the grid
//   • offset:[-4,0] nudges the anchor inward for safety
//   • grid.right:'10%' reserves overflow space that scales with container
//   • No legend needed — each line is labeled directly
//
//   Threshold lines use markLine (data-coordinate, auto-responsive):
//   • position:'insideMiddleBottom' keeps label below the line, inside grid
//   • Do NOT use 'insideMiddleTop' near the chart ceiling — it clips
//
//   Axis labels:
//   • alignMinLabel:'left' + alignMaxLabel:'right' (ECharts 5.5+)
//     pins first/last x-axis labels so they don't overflow
//   • yAxis formatter is a function — must be inline, not JSON.stringify'd

module.exports = {
  id: 'burndown',
  title: 'Burndown',
  tier: 3,
  proves: 'progress toward target over time',
  data: 'Cost reduction initiative tracking versus plan',
  sectionLabel: 'Cost Reduction Tracker',
  actionTitle: 'Cost take-out is tracking 8% ahead of plan with $127M captured through March',
  source: 'Source: Transformation Office, cumulative savings tracker',
  exhibitId: 'Exhibit 18.1',

  renderExhibit({ tokens }) {
    const chartId = 'burndown-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily   = 'sans-serif';
    const textColor    = '#101A27';
    const textMuted    = '#4E6176';
    const accent       = '#123A63';           // actual line color
    const planColor    = '#8BA5BD';           // plan line color (muted)
    const successColor = '#2E9E5A';           // target threshold color
    const axisLine     = '#C7D5E5';
    const gridLine     = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const planData   = [12, 28, 48, 72, 98, 128, 156, 182, 210, 238, 264, 290];
    const actualData = [15, 38, 127];         // partial year — only months with actuals
    const targetValue = 290;                  // horizontal threshold line value
    const targetLabel = 'Target: $' + targetValue + 'M';
    const valueUnit = 'M';

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange   = [11, 16];         // [min, max] px for all labels
    const lineWidthRange  = [1.5, 3];         // [min, max] px line thickness
    const pointSizeRange  = [4, 8];           // [min, max] px data point diameter

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
          data: ${JSON.stringify(months)},
          boundaryGap: false,
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          // alignMinLabel/alignMaxLabel pins first/last labels to their ticks
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       alignMinLabel: 'left', alignMaxLabel: 'right' },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          axisLine:  { show: false },
          axisTick:  { show: false },
          // formatter must be inline function (not JSON.stringify'd)
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       formatter: (v) => '$' + v + '${valueUnit}' },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        series: [
          {
            name: 'Plan',
            type: 'line',
            data: ${JSON.stringify(planData)},
            symbol: 'none',
            lineStyle: { width: ${Math.max(lineWidth - 0.5, 1.5)}, color: '${planColor}', type: [6, 4] },
            // endLabel labels the line directly — no legend needed.
            // align:'right' grows text leftward into the grid.
            // offset:[-4,0] nudges anchor inside; grid.right:'10%' catches overflow.
            endLabel: {
              show: true, formatter: 'Plan', align: 'right', offset: [-4, 0],
              fontSize: ${fontSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${planColor}',
              valueAnimation: false,
            },
            // markLine = horizontal target threshold (data-coordinate, auto-responsive)
            // insideMiddleBottom keeps label below the line, away from grid ceiling
            markLine: {
              silent: true,
              symbol: 'none',
              lineStyle: { color: '${successColor}', type: 'dashed', width: 1.5 },
              label: {
                show: true,
                position: 'insideMiddleBottom',
                fontSize: ${fontSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${successColor}',
                formatter: '${targetLabel}',
              },
              data: [{ yAxis: ${targetValue} }],
            },
          },
          {
            name: 'Actual',
            type: 'line',
            data: ${JSON.stringify(actualData)},
            symbol: 'circle',
            symbolSize: ${pointSize},
            lineStyle: { width: ${lineWidth}, color: '${accent}' },
            itemStyle: { color: '${accent}' },
            // endLabel at the last actual data point (mid-chart, no overflow risk)
            endLabel: {
              show: true, align: 'right', distance: 8,
              fontSize: ${fontSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${accent}',
              formatter: 'Actual\\n$${actualData[actualData.length - 1]}${valueUnit}',
              valueAnimation: false,
            },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
