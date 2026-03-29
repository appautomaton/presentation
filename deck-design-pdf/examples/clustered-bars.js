// ════════════════════════════════════════════════════════════════════════
// Clustered Bars — multi-metric comparison side by side
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap categories and series
//   3. Sizing limits    → tune the knobs if defaults don't fit
//
// ECharts gotchas:
//   • itemStyle.color CAN be a function on bars (unlike label.color)
//   • Legend identifies series — use bottom placement for horizontal charts
//   • yAxis formatter is a function — must be inline, not JSON.stringify'd

module.exports = {
  id: 'clustered-bars',
  title: 'Clustered Bars',
  tier: 2,
  proves: 'multi-metric comparison side by side',
  data: 'Plan vs. actual vs. prior year by quarter',
  sectionLabel: 'Plan vs. Actual',
  actionTitle: 'Q3 and Q4 actual revenue exceeded both plan and prior year, closing the H1 shortfall',
  source: 'Source: Finance, FY2025 quarterly close',
  exhibitId: 'Exhibit 11.1',

  renderExhibit({ tokens }) {
    const chartId = 'clustered-bars-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily   = 'sans-serif';
    const textColor    = '#101A27';
    const textMuted    = '#4E6176';
    const textLight    = '#8BA5BD';
    const priorColor   = '#C7D5E5';
    const planColor    = '#8BA5BD';
    const actualColor  = '#2E7D9B';
    const actualAccent = '#123A63';           // actual bars that beat plan
    const axisLine     = '#C7D5E5';
    const gridLine     = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const categories = ['Q1', 'Q2', 'Q3', 'Q4'];
    const priorYear  = [820, 860, 910, 950];
    const plan       = [900, 940, 990, 1040];
    const actual     = [880, 920, 1020, 1080];
    const valueUnit  = 'M';
    // Actual bars that beat plan get accent color (index based)
    const beatPlanFrom = 2;                   // Q3 onward

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange = [10, 15];           // [min, max] px for labels
    const barWidthRange = [10, 26];           // [min, max] px per bar in cluster

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const barWidth = Math.max(barWidthRange[0], Math.min(barWidthRange[1],
      Math.round(tokens.width / categories.length / 4)));

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
          show: true, bottom: 0,
          textStyle: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          itemWidth: 14, itemHeight: 14,
        },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'category',
          data: ${JSON.stringify(categories)},
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${textColor}',
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
            name: 'Prior Year', type: 'bar',
            data: ${JSON.stringify(priorYear)},
            barWidth: ${barWidth},
            itemStyle: { color: '${priorColor}' },
            label: { show: true, position: 'top', fontSize: ${fontSize - 1}, fontFamily: '${fontFamily}', color: '${textLight}' },
          },
          {
            name: 'Plan', type: 'bar',
            data: ${JSON.stringify(plan)},
            barWidth: ${barWidth},
            itemStyle: { color: '${planColor}' },
            label: { show: true, position: 'top', fontSize: ${fontSize - 1}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          },
          {
            name: 'Actual', type: 'bar',
            data: ${JSON.stringify(actual)},
            barWidth: ${barWidth},
            itemStyle: {
              color: (params) => params.dataIndex >= ${beatPlanFrom} ? '${actualAccent}' : '${actualColor}',
              borderRadius: [4, 4, 0, 0],
            },
            label: { show: true, position: 'top', fontSize: ${fontSize - 1}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${textColor}' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
