// ════════════════════════════════════════════════════════════════════════
// Cohort Retention Heatmap — retention decay across acquisition cohorts
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: heatmap grid, works at various aspect ratios.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap cohorts, periods, and retention values
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Heatmap label.color CAN be a function (runs in browser)
//   • label.formatter as a function must be inline in the template literal
//   • visualMap controls the color gradient — inRange.color array maps
//     min->max to the color stops
//   • xAxis position:'top' puts period labels above the heatmap
//   • Triangular shape is natural — later cohorts have fewer data points
//   • containLabel:true with minimal grid padding keeps the chart tight

module.exports = {
  id: 'cohort-retention',
  title: 'Cohort Retention Heatmap',
  tier: 2,
  proves: 'retention decay patterns across acquisition cohorts over time',
  data: 'Quarterly cohort retention from Q1 2024 to Q4 2025',
  sectionLabel: 'Customer Retention',
  actionTitle: 'Q1 2024 cohort retained 72% at month 12 — recent cohorts show steeper early decay suggesting onboarding regression',
  source: 'Source: Customer analytics, retention by quarterly acquisition cohort',
  exhibitId: 'Exhibit 18.1',

  renderExhibit({ tokens }) {
    const chartId = 'cohort-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily = 'sans-serif';
    const textColor  = '#101A27';
    const textMuted  = '#4E6176';
    const success    = '#2E9E5A';

    // Retention gradient — red (low) through yellow to green (high)
    const heatColors = ['#FCEAE8', '#F5C7C2', '#E8D5A0', '#9ED4B0', success];

    // ── 2. Data ─────────────────────────────────────────────────────────
    const cohorts = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'];
    const periods = ['M0', 'M3', 'M6', 'M9', 'M12', 'M15', 'M18'];

    // [cohortIndex, periodIndex, retentionPct]
    const data = [
      [0,0,100],[0,1,88],[0,2,79],[0,3,74],[0,4,72],[0,5,68],[0,6,65],
      [1,0,100],[1,1,85],[1,2,76],[1,3,71],[1,4,68],[1,5,64],
      [2,0,100],[2,1,82],[2,2,73],[2,3,67],[2,4,63],
      [3,0,100],[3,1,80],[3,2,70],[3,3,64],
      [4,0,100],[4,1,78],[4,2,66],
      [5,0,100],[5,1,74],[5,2,62],
      [6,0,100],[6,1,72],
      [7,0,100],
    ];

    const valueRange = [50, 100];
    const legendLabels = ['100% retained', '50% retained'];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange    = [9, 14];      // [min, max] px for cell percentage
    const axisFontRange    = [9, 14];      // [min, max] px for axis labels
    const vmFontRange      = [8, 12];      // [min, max] px for visualMap text
    const vmWidthRange     = [10, 16];     // [min, max] px visualMap item width
    const vmHeightRange    = [60, 120];    // [min, max] px visualMap bar height

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const fontSize  = lerp(fontSizeRange);
    const axisFont  = lerp(axisFontRange);
    const vmFont    = lerp(vmFontRange);
    const vmWidth   = lerp(vmWidthRange);
    const vmHeight  = lerp(vmHeightRange);

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
          type: 'category',
          data: ${JSON.stringify(periods)},
          position: 'top',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: ${axisFont}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          splitArea: { show: false },
        },
        yAxis: {
          type: 'category',
          data: ${JSON.stringify(cohorts)},
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: ${axisFont}, fontFamily: '${fontFamily}', color: '${textColor}' },
          splitArea: { show: false },
        },
        visualMap: {
          min: ${valueRange[0]}, max: ${valueRange[1]},
          calculable: false,
          orient: 'horizontal',
          left: 'center',
          bottom: 4,
          itemWidth: ${vmWidth},
          itemHeight: ${vmHeight},
          textStyle: { fontSize: ${vmFont}, fontFamily: '${fontFamily}', color: '${textMuted}' },
          inRange: { color: ${JSON.stringify(heatColors)} },
          text: ${JSON.stringify(legendLabels)},
        },
        series: [{
          type: 'heatmap',
          data: ${JSON.stringify(data)},
          label: {
            show: true,
            fontSize: ${fontSize},
            fontWeight: 'bold',
            fontFamily: '${fontFamily}',
            color: (p) => p.data[2] >= 75 ? '#ffffff' : '${textColor}',
            formatter: (p) => p.data[2] + '%',
          },
          itemStyle: { borderColor: 'transparent', borderWidth: 0 },
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
