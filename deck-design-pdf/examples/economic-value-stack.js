// ════════════════════════════════════════════════════════════════════════
// Economic Value Stack — total value decomposition (horizontal stacked)
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: single horizontal stacked bar with annotations.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap segments array
//   3. Sizing limits    → tune the knobs if defaults don't fit
//
// ECharts gotchas:
//   • Single-row horizontal stacked bar — yAxis has one invisible category
//   • Use markLine for price capture bracket instead of graphic elements
//   • Per-segment label colors set inline (contrast against segment color)

module.exports = {
  id: 'economic-value-stack',
  title: 'Economic Value Stack',
  tier: 2,
  proves: 'total economic value decomposition — how much value the customer captures vs. what they pay',
  data: 'Economic value estimation for enterprise SaaS pricing',
  sectionLabel: 'Pricing Strategy',
  actionTitle: 'Total economic value is $840K per customer — current price captures only 38% of value delivered',
  source: 'Source: EVE model, customer value interviews (n=24 enterprise accounts)',
  exhibitId: 'Exhibit 19.1',

  renderExhibit({ tokens }) {
    const chartId = 'eve-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily  = 'sans-serif';
    const textColor   = '#101A27';
    const textMuted   = '#4E6176';
    const axisLine    = '#C7D5E5';
    const gridLine    = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const segments = [
      { name: 'Current price',           value: 320, color: '#123A63',  labelColor: '#FFFFFF' },
      { name: 'Willingness-to-pay gap',  value: 120, color: '#2E7D9B',  labelColor: '#FFFFFF' },
      { name: 'Productivity gains',      value: 180, color: '#2E9E5A',  labelColor: '#FFFFFF' },
      { name: 'Risk reduction',          value: 95,  color: '#7DC8AD',  labelColor: '#101A27' },
      { name: 'Compliance savings',      value: 65,  color: '#B8D4CC',  labelColor: '#101A27' },
      { name: 'Switching cost avoidance', value: 60, color: '#D7E4EE',  labelColor: '#101A27' },
    ];
    const valueUnit = 'K';
    const total = segments.reduce((a, s) => a + s.value, 0);

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange = [10, 14];
    const barWidthRange = [40, 96];

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const barWidth = Math.max(barWidthRange[0], Math.min(barWidthRange[1],
      Math.round(tokens.height * 0.12)));

    // Build series
    const seriesConfig = segments.map((seg) => ({
      name: seg.name,
      type: 'bar',
      stack: 'eve',
      data: [seg.value],
      barWidth: barWidth,
      itemStyle: { color: seg.color, borderRadius: 0 },
      label: {
        show: seg.value >= 80,
        position: 'inside',
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: 'bold',
        color: seg.labelColor,
        formatter: '$' + seg.value + valueUnit,
      },
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
        legend: {
          show: true, bottom: 0, orient: 'horizontal',
          textStyle: { fontSize: ${fontSize - 1}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          itemWidth: 12, itemHeight: 12,
        },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'value', max: ${total},
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       formatter: (v) => '$' + v + '${valueUnit}' },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        yAxis: {
          type: 'category', data: [''],
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
        series: ${JSON.stringify(seriesConfig)},
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
