const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'pareto',
  title: 'Pareto',
  tier: 4,
  proves: 'cumulative contribution and the 80/20 rule',
  data: 'Defect categories ranked by frequency with cumulative line',
  sectionLabel: 'Root Cause Analysis',
  actionTitle: 'Top 3 defect categories account for 78% of all quality issues',
  source: 'Source: Quality management system, Q1 2026 (n=910 defects)',
  exhibitId: 'Exhibit T4.2',
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
    rationale: 'dual-axis chart with rotated labels needs moderate width',
  },
  renderExhibit({ tokens }) {
    const chartId = 'pareto-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const barLabel = { ...figure.annotationStrong, color: colors.textStrong };
    const lineLabel = { ...figure.annotation, color: colors.danger };
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const cats = ['Assembly Error', 'Material Defect', 'Calibration', 'Contamination', 'Packaging', 'Labeling', 'Other'];
      const counts = [342, 218, 156, 89, 54, 32, 19];
      const total = counts.reduce((a, b) => a + b, 0);
      let running = 0;
      const cumul = counts.map(c => { running += c; return Math.round(running / total * 100); });
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(40, 48, 56)},
          right: ${tokens.adapt(36, 48, 56)},
          top: ${tokens.adapt(20, 24, 28)},
          bottom: ${tokens.adapt(48, 52, 60)},
        },
        xAxis: {
          type: 'category', data: cats,
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { ...${JSON.stringify(figure.axisTick)}, interval: 0, rotate: ${tokens.compact ? 20 : 15} },
        },
        yAxis: [
          {
            type: 'value', position: 'left',
            axisLine: ${JSON.stringify(chrome.axisLineNone)},
            axisTick: ${JSON.stringify(chrome.axisTickNone)},
            axisLabel: ${JSON.stringify(figure.axisTick)},
            splitLine: ${JSON.stringify(chrome.splitLineDashed)},
          },
          {
            type: 'value', position: 'right', max: 100,
            axisLine: ${JSON.stringify(chrome.axisLineNone)},
            axisTick: ${JSON.stringify(chrome.axisTickNone)},
            axisLabel: { ...${JSON.stringify(figure.axisTick)}, color: '${colors.textLight}', formatter: '{value}%' },
            splitLine: ${JSON.stringify(chrome.splitLineNone)},
          },
        ],
        series: [
          {
            name: 'Count', type: 'bar', yAxisIndex: 0,
            data: counts, barWidth: ${tokens.adapt(24, 36, 44)},
            itemStyle: { color: (p) => p.dataIndex < 3 ? '${colors.accent}' : '${colors.axisLine}', borderRadius: [4, 4, 0, 0] },
            label: { show: true, position: 'top', ...${JSON.stringify(barLabel)} },
          },
          {
            name: 'Cumulative %', type: 'line', yAxisIndex: 1,
            data: cumul, smooth: false, symbol: 'circle', symbolSize: ${tokens.pointSize},
            lineStyle: { width: ${tokens.lineWidth}, color: '${colors.danger}' },
            itemStyle: { color: '${colors.danger}' },
            label: { show: true, position: 'top', ...${JSON.stringify(lineLabel)}, formatter: (p) => p.value + '%' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
