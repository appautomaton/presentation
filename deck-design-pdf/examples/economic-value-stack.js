const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'economic-value-stack',
  title: 'Economic Value Stack',
  tier: 2,
  proves: 'total economic value decomposition — how much value the customer captures vs. what they pay',
  data: 'Economic value estimation for enterprise SaaS pricing',
  sectionLabel: 'Pricing Strategy',
  actionTitle: 'Total economic value is $840K per customer — current price captures only 38% of value delivered, leaving $520K on the table',
  source: 'Source: EVE model, customer value interviews (n=24 enterprise accounts)',
  exhibitId: 'Exhibit 19.1',
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
    rationale: 'value stacks need vertical space for bar labels; 6-8 segments is the practical max',
  },
  renderExhibit({ tokens }) {
    const chartId = 'eve-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);

    const segments = [
      { name: 'Current price', value: 320, color: colors.accent },
      { name: 'Willingness-to-pay gap', value: 120, color: colors.accentAlt },
      { name: 'Productivity gains', value: 180, color: colors.success },
      { name: 'Risk reduction', value: 95, color: '#7DC8AD' },
      { name: 'Compliance savings', value: 65, color: '#B8D4CC' },
      { name: 'Switching cost avoidance', value: 60, color: colors.borderSoft },
    ];
    const total = segments.reduce((a, s) => a + s.value, 0);
    const priceCapturePct = Math.round((320 / total) * 70 + 3);
    const priceCaptureMid = Math.round((320 / total) * 70 / 2 + 3);

    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });

      const segments = ${JSON.stringify(segments)};
      const total = ${total};

      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(20, 24, 28)},
          right: ${tokens.adapt(120, 160, 180)},
          top: ${tokens.adapt(40, 48, 56)},
          bottom: ${tokens.adapt(48, 56, 64)},
        },
        xAxis: {
          type: 'value',
          max: total,
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: {
            ...${JSON.stringify(figure.axisTick)},
            formatter: function(v) { return '$' + v + 'K'; },
          },
          splitLine: ${JSON.stringify(chrome.splitLineDashed)},
        },
        yAxis: {
          type: 'category',
          data: categories,
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { show: false },
        },
        series: segments.map(function(seg) {
          return {
            name: seg.name,
            type: 'bar',
            stack: 'eve',
            data: [seg.value],
            barWidth: ${tokens.adapt(60, 80, 96)},
            itemStyle: { color: seg.color, borderRadius: 0 },
            label: {
              show: seg.value >= 80,
              position: 'inside',
              fontSize: ${tokens.adapt(11, 13, 14)},
              fontWeight: 'bold',
              fontFamily: 'var(--font-body)',
              color: seg.color === '${colors.borderSoft}' || seg.color === '#B8D4CC' ? '${colors.textStrong}' : '#fff',
              formatter: function(p) { return '$' + p.value + 'K'; },
            },
          };
        }),
        // Annotations via graphic
        graphic: [
          // Price capture bracket
          { type: 'line', shape: { x1: 0, y1: 0, x2: 0, y2: 24 },
            left: '${priceCapturePct}%', top: ${tokens.adapt(14, 18, 22)},
            style: { stroke: '${colors.accent}', lineWidth: 2 } },
          { type: 'text', left: '${priceCaptureMid}%', top: ${tokens.adapt(4, 6, 8)},
            style: { text: 'Current capture: 38%', fontSize: ${tokens.smallText},
              fontWeight: 'bold', fill: '${colors.accent}', fontFamily: 'var(--font-body)', textAlign: 'center' } },
          // Value gap annotation
          { type: 'text', right: ${tokens.adapt(8, 16, 20)}, top: '35%',
            style: { text: 'Value delivered: $840K\\nPrice charged: $320K\\nCapture rate: 38%\\n\\nPricing headroom: $120K\\n(14% of total value)',
              fontSize: ${tokens.smallText}, fill: '${colors.textMuted}', fontFamily: 'var(--font-body)', lineHeight: 20 } },
        ],
        legend: {
          ...${JSON.stringify(chrome.legendBase)},
          orient: 'horizontal',
          data: segments.map(function(s) { return s.name; }),
        },
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
