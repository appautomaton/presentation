const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'heatmap',
  title: 'Heatmap',
  tier: 4,
  proves: 'intensity across two dimensions with color-coded scoring',
  data: 'Capability assessment: 5 BUs × 6 capability dimensions',
  sectionLabel: 'Capability Matrix',
  actionTitle: 'Product and Analytics capabilities are strong across BUs; Supply Chain is the systemic gap',
  source: 'Source: Capability assessment survey, Q1 2026 (1–5 scale)',
  exhibitId: 'Exhibit T4.8',
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
    rationale: 'heatmap with 6 columns needs moderate width for column headers',
  },
  renderExhibit({ tokens }) {
    const chartId = 'heatmap-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const bus = ['BU Alpha', 'BU Beta', 'BU Gamma', 'BU Delta', 'BU Epsilon'];
      const caps = ['Product Dev', 'Analytics', 'Customer Exp', 'Supply Chain', 'Digital Mktg', 'Talent Mgmt'];
      const data = [
        [0,0,4.2],[0,1,3.8],[0,2,3.5],[0,3,2.1],[0,4,3.9],[0,5,3.2],
        [1,0,3.6],[1,1,4.5],[1,2,3.0],[1,3,2.4],[1,4,2.8],[1,5,3.6],
        [2,0,4.0],[2,1,3.2],[2,2,4.1],[2,3,1.8],[2,4,3.5],[2,5,2.9],
        [3,0,3.3],[3,1,4.0],[3,2,3.7],[3,3,2.6],[3,4,4.2],[3,5,3.8],
        [4,0,3.8],[4,1,3.5],[4,2,2.8],[4,3,1.5],[4,4,3.1],[4,5,4.1],
      ];
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(100, 120, 140)},
          right: ${tokens.adapt(16, 20, 24)},
          top: ${tokens.adapt(32, 40, 48)},
          bottom: ${tokens.adapt(40, 54, 64)},
        },
        xAxis: {
          type: 'category', data: caps, position: 'top',
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { ...${JSON.stringify(figure.axisTick)}, interval: 0 },
          splitArea: { show: false },
        },
        yAxis: {
          type: 'category', data: bus,
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify({ ...figure.dataLabel, color: colors.textStrong })},
          splitArea: { show: false },
        },
        visualMap: {
          min: 1, max: 5, calculable: false,
          orient: 'horizontal', left: 'center', bottom: ${tokens.adapt(4, 8, 12)},
          itemWidth: ${tokens.adapt(14, 16, 18)}, itemHeight: ${tokens.adapt(100, 120, 140)},
          textStyle: { ...${JSON.stringify(figure.annotation)}, color: '${colors.textMuted}' },
          inRange: { color: ['#FCEAE8', '#F5C7C2', '#CC8888', '${colors.accentAlt}', '${colors.accent}'] },
          text: ['5.0 Strong', '1.0 Weak'],
        },
        series: [{
          type: 'heatmap',
          data: data,
          label: {
            show: true,
            ...${JSON.stringify(figure.dataLabelStrong)},
            formatter: (p) => p.data[2].toFixed(1),
            color: (p) => p.data[2] >= 3.5 ? '#ffffff' : '${colors.textStrong}',
          },
          itemStyle: { borderColor: 'transparent', borderWidth: 0 },
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
