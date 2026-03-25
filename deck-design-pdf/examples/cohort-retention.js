const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'cohort-retention',
  title: 'Cohort Retention Heatmap',
  tier: 2,
  proves: 'retention decay patterns across acquisition cohorts over time',
  data: 'Quarterly cohort retention from Q1 2024 to Q4 2025',
  sectionLabel: 'Customer Retention',
  actionTitle: 'Q1 2024 cohort retained 72% at month 12 — recent cohorts show steeper early decay suggesting onboarding regression',
  source: 'Source: Customer analytics, retention by quarterly acquisition cohort',
  exhibitId: 'Exhibit 18.1',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 860, height: 484 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 940, height: 529 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'heatmap cells need minimum width for percentage labels; 7 columns × 8 rows is the practical maximum',
  },
  renderExhibit({ tokens }) {
    const chartId = 'cohort-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);

    const cellFont = tokens.adapt(10, 12, 14);

    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });

      const cohorts = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'];
      const periods = ['M0', 'M3', 'M6', 'M9', 'M12', 'M15', 'M18'];
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

      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(70, 90, 100)},
          right: ${tokens.adapt(16, 20, 24)},
          top: ${tokens.adapt(28, 36, 40)},
          bottom: ${tokens.adapt(48, 56, 64)},
        },
        xAxis: {
          type: 'category',
          data: periods,
          position: 'top',
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: ${JSON.stringify({ ...figure.axisTitle, fontWeight: 'normal' })},
          splitArea: { show: false },
        },
        yAxis: {
          type: 'category',
          data: cohorts,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: ${JSON.stringify({ ...figure.axisTitle, fontWeight: 'normal', color: colors.textStrong })},
          splitArea: { show: false },
        },
        visualMap: {
          min: 50, max: 100,
          calculable: false,
          orient: 'horizontal',
          left: 'center',
          bottom: 6,
          itemWidth: ${tokens.adapt(12, 14, 16)},
          itemHeight: ${tokens.adapt(80, 100, 120)},
          textStyle: ${JSON.stringify(figure.axisTick)},
          inRange: { color: ['#FCEAE8', '#F5C7C2', '#E8D5A0', '#9ED4B0', '${colors.success}'] },
          text: ['100% retained', '50% retained'],
        },
        series: [{
          type: 'heatmap',
          data: data,
          label: {
            show: true,
            fontSize: ${cellFont},
            fontWeight: 'bold',
            fontFamily: 'var(--font-body)',
            color: function(p) { return p.data[2] >= 75 ? '#ffffff' : '${colors.textStrong}'; },
            formatter: function(p) { return p.data[2] + '%'; },
          },
          itemStyle: { borderColor: 'transparent', borderWidth: 0 },
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
