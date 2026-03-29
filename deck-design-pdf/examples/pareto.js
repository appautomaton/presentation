// ════════════════════════════════════════════════════════════════════════
// Pareto — cumulative contribution and the 80/20 rule
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: dual-axis chart (bars + cumulative line).
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap categories and counts
//   3. Sizing limits    → tune the knobs if defaults don't fit
//
// ECharts gotchas:
//   • Dual yAxis: left for counts, right for cumulative %
//   • itemStyle.color CAN be a function on bars
//   • Cumulative % is computed automatically from counts

module.exports = {
  id: 'pareto',
  title: 'Pareto',
  tier: 4,
  proves: 'cumulative contribution and the 80/20 rule',
  data: 'Defect categories ranked by frequency with cumulative line',
  sectionLabel: 'Root Cause Analysis',
  actionTitle: 'Top 3 defect categories account for 78% of all quality issues',
  source: 'Source: Quality management system, Q1 2026 (n=910 defects)',
  exhibitId: 'Exhibit T4.2',

  renderExhibit({ tokens }) {
    const chartId = 'pareto-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily  = 'sans-serif';
    const textColor   = '#101A27';
    const textMuted   = '#4E6176';
    const textLight   = '#8BA5BD';
    const accent      = '#123A63';            // top bars
    const mutedBar    = '#C7D5E5';            // remaining bars
    const lineColor   = '#A43C35';            // cumulative line
    const axisLine    = '#C7D5E5';
    const gridLine    = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const categories = ['Assembly Error', 'Material Defect', 'Calibration', 'Contamination', 'Packaging', 'Labeling', 'Other'];
    const counts = [342, 218, 156, 89, 54, 32, 19];
    const topN = 3;                           // highlight top N bars with accent

    // Compute cumulative %
    const total = counts.reduce((a, b) => a + b, 0);
    let running = 0;
    const cumul = counts.map(c => { running += c; return Math.round(running / total * 100); });

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange  = [10, 15];
    const barWidthRange  = [16, 44];
    const lineWidthRange = [1.5, 3];
    const pointSizeRange = [3, 7];

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const barWidth = Math.max(barWidthRange[0], Math.min(barWidthRange[1],
      Math.round(tokens.width / categories.length * 0.45)));

    const lineWidth = Math.max(lineWidthRange[0], Math.min(lineWidthRange[1],
      +(lineWidthRange[0] + (minDim - 300) / (720 - 300) * (lineWidthRange[1] - lineWidthRange[0])).toFixed(1)));

    const pointSize = Math.max(pointSizeRange[0], Math.min(pointSizeRange[1],
      Math.round(pointSizeRange[0] + (minDim - 300) / (720 - 300) * (pointSizeRange[1] - pointSizeRange[0]))));

    const labelRotate = tokens.width < 400 ? 25 : 15;

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
          type: 'category', data: ${JSON.stringify(categories)},
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       interval: 0, rotate: ${labelRotate} },
        },
        yAxis: [
          {
            type: 'value', position: 'left',
            axisLine: { show: false }, axisTick: { show: false },
            axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}' },
            splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
          },
          {
            type: 'value', position: 'right', max: 100,
            axisLine: { show: false }, axisTick: { show: false },
            axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textLight}', formatter: '{value}%' },
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: 'Count', type: 'bar', yAxisIndex: 0,
            data: ${JSON.stringify(counts)},
            barWidth: ${barWidth},
            itemStyle: {
              color: (p) => p.dataIndex < ${topN} ? '${accent}' : '${mutedBar}',
              borderRadius: [4, 4, 0, 0],
            },
            label: { show: true, position: 'top',
              fontSize: ${fontSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${textColor}' },
          },
          {
            name: 'Cumulative %', type: 'line', yAxisIndex: 1,
            data: ${JSON.stringify(cumul)},
            smooth: false, symbol: 'circle', symbolSize: ${pointSize},
            lineStyle: { width: ${lineWidth}, color: '${lineColor}' },
            itemStyle: { color: '${lineColor}' },
            label: { show: true, position: 'bottom',
              fontSize: ${fontSize - 1}, fontFamily: '${fontFamily}', color: '${lineColor}',
              formatter: (p) => p.value + '%' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
