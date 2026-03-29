// ════════════════════════════════════════════════════════════════════════
// Heatmap — intensity across two dimensions with color-coded scoring
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap rows, columns, and values
//   3. Sizing limits    → tune the knobs if defaults don't fit
//
// ECharts gotchas:
//   • Heatmap label.color CAN be a function (runs in browser)
//   • visualMap controls the color mapping — inRange defines the gradient
//   • xAxis position:'top' places column headers above the grid

module.exports = {
  id: 'heatmap',
  title: 'Heatmap',
  tier: 4,
  proves: 'intensity across two dimensions with color-coded scoring',
  data: 'Capability assessment: 5 BUs × 6 capability dimensions',
  sectionLabel: 'Capability Matrix',
  actionTitle: 'Product and Analytics capabilities are strong across BUs; Supply Chain is the systemic gap',
  source: 'Source: Capability assessment survey, Q1 2026 (1–5 scale)',
  exhibitId: 'Exhibit T4.8',

  renderExhibit({ tokens }) {
    const chartId = 'heatmap-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily = 'sans-serif';
    const textColor  = '#101A27';
    const textMuted  = '#4E6176';
    const accent     = '#123A63';
    const accentAlt  = '#2E7D9B';

    // Heatmap gradient — low (warm/weak) to high (cool/strong)
    const heatColors = ['#FCEAE8', '#F5C7C2', '#CC8888', accentAlt, accent];

    // ── 2. Data ─────────────────────────────────────────────────────────
    const rows = ['BU Alpha', 'BU Beta', 'BU Gamma', 'BU Delta', 'BU Epsilon'];
    const cols = ['Product Dev', 'Analytics', 'Customer Exp', 'Supply Chain', 'Digital Mktg', 'Talent Mgmt'];
    // [colIndex, rowIndex, value]
    const data = [
      [0,0,4.2],[0,1,3.8],[0,2,3.5],[0,3,2.1],[0,4,3.9],[0,5,3.2],
      [1,0,3.6],[1,1,4.5],[1,2,3.0],[1,3,2.4],[1,4,2.8],[1,5,3.6],
      [2,0,4.0],[2,1,3.2],[2,2,4.1],[2,3,1.8],[2,4,3.5],[2,5,2.9],
      [3,0,3.3],[3,1,4.0],[3,2,3.7],[3,3,2.6],[3,4,4.2],[3,5,3.8],
      [4,0,3.8],[4,1,3.5],[4,2,2.8],[4,3,1.5],[4,4,3.1],[4,5,4.1],
    ];
    const valueRange = [1, 5];
    const legendLabels = ['5.0 Strong', '1.0 Weak'];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange    = [10, 15];        // [min, max] px for cell/axis labels
    const visualMapWidth   = [12, 18];        // [min, max] px legend swatch width
    const visualMapHeight  = [80, 140];       // [min, max] px legend swatch height

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const vmWidth = Math.max(visualMapWidth[0], Math.min(visualMapWidth[1],
      Math.round(visualMapWidth[0] + (minDim - 300) / (720 - 300) * (visualMapWidth[1] - visualMapWidth[0]))));
    const vmHeight = Math.max(visualMapHeight[0], Math.min(visualMapHeight[1],
      Math.round(visualMapHeight[0] + (minDim - 300) / (720 - 300) * (visualMapHeight[1] - visualMapHeight[0]))));

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
          type: 'category', data: ${JSON.stringify(cols)}, position: 'top',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}', interval: 0 },
          splitArea: { show: false },
        },
        yAxis: {
          type: 'category', data: ${JSON.stringify(rows)},
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textColor}' },
          splitArea: { show: false },
        },
        visualMap: {
          min: ${valueRange[0]}, max: ${valueRange[1]}, calculable: false,
          orient: 'horizontal', left: 'center', bottom: 4,
          itemWidth: ${vmWidth}, itemHeight: ${vmHeight},
          textStyle: { fontSize: ${fontSize - 1}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          inRange: { color: ${JSON.stringify(heatColors)} },
          text: ${JSON.stringify(legendLabels)},
        },
        series: [{
          type: 'heatmap',
          data: ${JSON.stringify(data)},
          label: {
            show: true,
            fontSize: ${fontSize},
            fontFamily: '${fontFamily}',
            fontWeight: 'bold',
            formatter: (p) => p.data[2].toFixed(1),
            color: (p) => p.data[2] >= 3.5 ? '#ffffff' : '${textColor}',
          },
          itemStyle: { borderColor: 'transparent', borderWidth: 0 },
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
