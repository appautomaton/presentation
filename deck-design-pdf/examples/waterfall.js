const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'waterfall',
  title: 'Waterfall / Bridge',
  tier: 1,
  proves: 'decomposition ("What drove the delta?")',
  data: 'EBITDA bridge FY2024 to FY2025',
  sectionLabel: 'Financial Analysis',
  actionTitle: 'EBITDA grew $420M driven by pricing and volume, partially offset by cost inflation',
  source: 'Source: Company financials, team analysis',
  exhibitId: 'Exhibit 2.1',
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
    rationale: 'bridges can shrink below md when the number of drivers is limited and labels are tightly edited',
  },
  renderExhibit({ tokens }) {
    const chartId = 'waterfall-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const categoryAxis = { ...figure.axisTitle, fontWeight: 'normal' };
    const waterfallLabel = { ...figure.annotationStrong, color: colors.textStrong };
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });

      const start = 3800;
      const drivers = [
        { label: 'Pricing', delta: 480 },
        { label: 'Volume', delta: 200 },
        { label: 'Mix', delta: -180 },
        { label: 'COGS\\nInflation', delta: -110 },
        { label: 'SG&A', delta: -70 },
        { label: 'FX', delta: 100 },
      ];

      const bars = [{ label: 'FY2024', base: 0, value: start, raw: start, total: true, end: start }];
      let running = start;
      for (const driver of drivers) {
        const next = running + driver.delta;
        bars.push({
          label: driver.label,
          base: driver.delta >= 0 ? running : next,
          value: Math.abs(driver.delta),
          raw: driver.delta,
          total: false,
          end: next,
        });
        running = next;
      }
      bars.push({ label: 'FY2025', base: 0, value: running, raw: running, total: true, end: running });
      const floor = Math.min(...bars.map((bar) => (bar.total ? bar.end : Math.min(bar.base, bar.end)))) - 160;

      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(52, 54, 62)},
          right: ${tokens.adapt(18, 24, 30)},
          top: ${tokens.adapt(28, 32, 40)},
          bottom: ${tokens.adapt(42, 46, 54)},
        },
        xAxis: {
          type: 'category',
          data: bars.map((bar) => bar.label),
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { ...${JSON.stringify(categoryAxis)}, interval: 0 },
        },
        yAxis: {
          type: 'value',
          min: floor,
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { ...${JSON.stringify(figure.axisTick)}, formatter: (value) => '$' + value + 'M' },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        series: [
          {
            type: 'bar',
            stack: 'bridge',
            data: bars.map((bar) => bar.base),
            itemStyle: { color: 'transparent' },
            emphasis: { itemStyle: { color: 'transparent' } },
            silent: true,
          },
          {
            type: 'bar',
            stack: 'bridge',
            barWidth: ${Math.max(tokens.chartBarWide - 14, 24)},
            data: bars.map((bar) => ({
              value: bar.value,
              raw: bar.raw,
              total: bar.total,
            })),
            itemStyle: {
              color: (params) => {
                if (params.data.total) return '#123A63';
                return params.data.raw >= 0 ? '#2E7D9B' : '#CC4444';
              },
              borderRadius: [4, 4, 0, 0],
            },
            label: {
              show: true,
              position: 'top',
              ...${JSON.stringify(waterfallLabel)},
              formatter: (params) => {
                if (params.data.total) return '$' + (params.data.raw / 1000).toFixed(1) + 'B';
                return (params.data.raw >= 0 ? '+' : '') + '$' + params.data.raw + 'M';
              },
            },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
