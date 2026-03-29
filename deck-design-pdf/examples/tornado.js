// ════════════════════════════════════════════════════════════════════════
// Tornado / Sensitivity — which variables have the largest impact
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or wide containers.
// Diverging bars need horizontal room for labels on both sides.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap variables, low/high arrays
//   3. Sizing limits    → tune the knobs if defaults don't fit
//
// ECharts gotchas:
//   • Tornado uses two stacked bar series (negative left, positive right)
//   • label.formatter CAN be a function (runs in browser)
//   • containLabel handles diverging axis labels automatically

module.exports = {
  id: 'tornado',
  title: 'Tornado / Sensitivity',
  tier: 4,
  proves: 'which variables have the largest impact on an outcome',
  data: 'NPV sensitivity to six input assumptions',
  sectionLabel: 'Sensitivity Analysis',
  actionTitle: 'Volume and pricing assumptions have the largest impact on NPV',
  source: 'Source: Financial model sensitivity analysis',
  exhibitId: 'Exhibit T4.1',

  renderExhibit({ tokens }) {
    const chartId = 'tornado-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily    = 'sans-serif';
    const textColor     = '#101A27';
    const textMuted     = '#4E6176';
    const downsideColor = '#A43C35';
    const upsideColor   = '#2E7D9B';
    const axisLine      = '#C7D5E5';
    const gridLine      = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Variables sorted by total swing (smallest to largest for bottom-up display)
    const variables = ['Discount Rate', 'Capex Timing', 'Market Share', 'COGS Inflation', 'Pricing', 'Volume'];
    const low  = [-8, -12, -18, -22, -35, -42];
    const high = [6, 10, 15, 20, 30, 38];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange = [11, 16];           // [min, max] px for labels
    const barWidthRange = [12, 28];           // [min, max] px bar thickness

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const barWidth = Math.max(barWidthRange[0], Math.min(barWidthRange[1],
      Math.round((tokens.height - 16) / variables.length * 0.55)));

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
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'value',
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       formatter: (v) => (v > 0 ? '+' : '') + v + '%',
                       alignMinLabel: 'left', alignMaxLabel: 'right' },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        yAxis: {
          type: 'category',
          data: ${JSON.stringify(variables)},
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textColor}' },
        },
        series: [
          {
            name: 'Downside', type: 'bar', stack: 'tornado',
            data: ${JSON.stringify(low)},
            barWidth: ${barWidth},
            itemStyle: { color: '${downsideColor}', borderRadius: [4, 0, 0, 4] },
            label: {
              show: true, position: 'insideLeft',
              fontSize: ${fontSize - 1}, fontFamily: '${fontFamily}', color: '#FFFFFF',
              formatter: (p) => p.value + '%',
            },
          },
          {
            name: 'Upside', type: 'bar', stack: 'tornado',
            data: ${JSON.stringify(high)},
            barWidth: ${barWidth},
            itemStyle: { color: '${upsideColor}', borderRadius: [0, 4, 4, 0] },
            label: {
              show: true, position: 'insideRight',
              fontSize: ${fontSize - 1}, fontFamily: '${fontFamily}', color: '#FFFFFF',
              formatter: (p) => '+' + p.value + '%',
            },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
