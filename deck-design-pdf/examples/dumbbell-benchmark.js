const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'dumbbell-benchmark',
  title: 'Dumbbell / Benchmark Comparison',
  tier: 2,
  proves: 'before/after or client-vs-peer gap on multiple metrics',
  data: 'Client vs. peer median performance across 6 operational metrics',
  sectionLabel: 'Performance Benchmarking',
  actionTitle: 'Client trails peer median on 4 of 6 metrics — largest gaps in cycle time and digital adoption',
  source: 'Source: Peer benchmarking survey (n=14 companies), FY2025',
  exhibitId: 'Exhibit 4.1',
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
    rationale: 'dumbbell charts need vertical space for label legibility; fewer than 6 metrics can shrink further',
  },
  renderExhibit({ tokens }) {
    const chartId = 'dumbbell-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);

    const metrics = [
      { name: 'Revenue growth', client: 6.2, peer: 8.5, unit: '%' },
      { name: 'EBITDA margin', client: 18.4, peer: 22.1, unit: '%' },
      { name: 'Order cycle time', client: 14, peer: 8, unit: 'days', invert: true },
      { name: 'Digital adoption', client: 34, peer: 62, unit: '%' },
      { name: 'Employee NPS', client: 32, peer: 38, unit: '' },
      { name: 'Customer retention', client: 87, peer: 92, unit: '%' },
    ];

    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });

      const metrics = ${JSON.stringify(metrics)};
      const categories = metrics.map(m => m.name);
      const maxValue = metrics.reduce((max, m) => Math.max(max, m.client, m.peer), 0);
      const axisMax = Math.ceil((maxValue * 1.18) / 5) * 5;

      // Custom series for dumbbell connectors
      const connectorData = metrics.map((m, i) => [i, Math.min(m.client, m.peer), Math.max(m.client, m.peer)]);
      const clientData = metrics.map((m, i) => ({
        value: [m.client, i],
        name: m.name,
        label: {
          show: true,
          position: 'top',
          distance: ${tokens.adapt(4, 6, 7)},
          ...${JSON.stringify(figure.annotationStrongLarge)},
          color: '${colors.accent}',
          formatter: 'Client ' + m.client + (m.unit || ''),
        },
      }));
      const peerData = metrics.map((m, i) => ({
        value: [m.peer, i],
        name: m.name,
        label: {
          show: true,
          position: 'bottom',
          distance: ${tokens.adapt(4, 6, 7)},
          ...${JSON.stringify(figure.annotationLarge)},
          color: '${colors.textLight}',
          formatter: 'Peer ' + m.peer + (m.unit || ''),
        },
      }));

      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(28, 34, 40)},
          right: ${tokens.adapt(92, 112, 124)},
          top: ${tokens.adapt(18, 24, 28)},
          bottom: ${tokens.adapt(16, 18, 22)},
          containLabel: true,
        },
        yAxis: {
          type: 'category',
          data: categories,
          inverse: true,
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: ${JSON.stringify({ ...figure.axisTitle, fontWeight: 'normal' })},
        },
        xAxis: {
          type: 'value', min: 0, max: axisMax,
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { show: false },
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        series: [
          // Connector lines (custom)
          {
            type: 'custom',
            renderItem: function(params, api) {
              const categoryIndex = api.value(0);
              const startVal = api.value(1);
              const endVal = api.value(2);
              const start = api.coord([startVal, categoryIndex]);
              const end = api.coord([endVal, categoryIndex]);
              return {
                type: 'line',
                shape: { x1: start[0], y1: start[1], x2: end[0], y2: end[1] },
                style: { stroke: '${colors.borderSoft}', lineWidth: ${tokens.adapt(2, 3, 3)} },
              };
            },
            data: connectorData,
            z: 1,
            silent: true,
          },
          // Client dots
          {
            name: 'Client',
            type: 'scatter',
            data: clientData,
            symbolSize: ${tokens.adapt(10, 14, 16)},
            symbolOffset: [0, -${tokens.adapt(4, 6, 7)}],
            itemStyle: { color: '${colors.accent}', borderColor: '#fff', borderWidth: 2 },
            z: 3,
          },
          // Peer dots
          {
            name: 'Peer median',
            type: 'scatter',
            data: peerData,
            symbolSize: ${tokens.adapt(10, 14, 16)},
            symbol: 'diamond',
            symbolOffset: [0, ${tokens.adapt(4, 6, 7)}],
            itemStyle: { color: '${colors.textLight}', borderColor: '#fff', borderWidth: 1 },
            z: 2,
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
