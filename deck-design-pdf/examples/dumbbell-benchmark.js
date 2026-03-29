// ════════════════════════════════════════════════════════════════════════
// Dumbbell / Benchmark — client vs. peer gap on multiple metrics
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: horizontal dumbbell chart, works at various aspect ratios.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap metrics array
//   3. Sizing limits    → tune the knobs if defaults don't fit
//
// ECharts gotchas:
//   • Uses custom series for connector lines between dots
//   • Scatter series for the two dot sets (client + peer)
//   • Per-item labels since label.color doesn't accept a function

module.exports = {
  id: 'dumbbell-benchmark',
  title: 'Dumbbell / Benchmark Comparison',
  tier: 2,
  proves: 'before/after or client-vs-peer gap on multiple metrics',
  data: 'Client vs. peer median performance across 6 operational metrics',
  sectionLabel: 'Performance Benchmarking',
  actionTitle: 'Client trails peer median on 4 of 6 metrics — largest gaps in cycle time and digital adoption',
  source: 'Source: Peer benchmarking survey (n=14 companies), FY2025',
  exhibitId: 'Exhibit 4.1',

  renderExhibit({ tokens }) {
    const chartId = 'dumbbell-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily   = 'sans-serif';
    const textColor    = '#101A27';
    const textMuted    = '#4E6176';
    const textLight    = '#8BA5BD';
    const accent       = '#123A63';           // client dots
    const peerColor    = '#8BA5BD';           // peer dots
    const connectorColor = '#D7E4EE';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const metrics = [
      { name: 'Revenue growth',     client: 6.2,  peer: 8.5,  unit: '%' },
      { name: 'EBITDA margin',      client: 18.4, peer: 22.1, unit: '%' },
      { name: 'Order cycle time',   client: 14,   peer: 8,    unit: 'days' },
      { name: 'Digital adoption',   client: 34,   peer: 62,   unit: '%' },
      { name: 'Employee NPS',       client: 32,   peer: 38,   unit: '' },
      { name: 'Customer retention', client: 87,   peer: 92,   unit: '%' },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange  = [10, 15];
    const dotSizeRange   = [8, 16];
    const connWidthRange = [2, 3];

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const dotSize = Math.max(dotSizeRange[0], Math.min(dotSizeRange[1],
      Math.round(dotSizeRange[0] + (minDim - 300) / (720 - 300) * (dotSizeRange[1] - dotSizeRange[0]))));

    const connWidth = Math.max(connWidthRange[0], Math.min(connWidthRange[1],
      Math.round(connWidthRange[0] + (minDim - 300) / (720 - 300) * (connWidthRange[1] - connWidthRange[0]))));

    const dotOffset = Math.round(dotSize * 0.4);

    // Build data
    const categories = metrics.map(m => m.name);
    const maxValue = metrics.reduce((max, m) => Math.max(max, m.client, m.peer), 0);
    const axisMax = Math.ceil((maxValue * 1.18) / 5) * 5;

    const connectorData = metrics.map((m, i) => [i, Math.min(m.client, m.peer), Math.max(m.client, m.peer)]);

    const clientData = metrics.map((m, i) => ({
      value: [m.client, i],
      label: {
        show: true, position: 'top', distance: dotOffset + 2,
        fontSize: fontSize, fontFamily: fontFamily, fontWeight: 'bold', color: accent,
        formatter: 'Client ' + m.client + (m.unit || ''),
      },
    }));

    const peerData = metrics.map((m, i) => ({
      value: [m.peer, i],
      label: {
        show: true, position: 'bottom', distance: dotOffset + 2,
        fontSize: fontSize - 1, fontFamily: fontFamily, color: textLight,
        formatter: 'Peer ' + m.peer + (m.unit || ''),
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
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        yAxis: {
          type: 'category',
          data: ${JSON.stringify(categories)},
          inverse: true,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}' },
        },
        xAxis: {
          type: 'value', min: 0, max: ${axisMax},
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        series: [
          {
            type: 'custom',
            renderItem: function(params, api) {
              var ci = api.value(0);
              var s = api.coord([api.value(1), ci]);
              var e = api.coord([api.value(2), ci]);
              return { type: 'line', shape: { x1: s[0], y1: s[1], x2: e[0], y2: e[1] },
                style: { stroke: '${connectorColor}', lineWidth: ${connWidth} } };
            },
            data: ${JSON.stringify(connectorData)},
            z: 1, silent: true,
          },
          {
            name: 'Client', type: 'scatter',
            data: ${JSON.stringify(clientData)},
            symbolSize: ${dotSize},
            symbolOffset: [0, -${dotOffset}],
            itemStyle: { color: '${accent}', borderColor: '#fff', borderWidth: 2 },
            z: 3,
          },
          {
            name: 'Peer median', type: 'scatter',
            data: ${JSON.stringify(peerData)},
            symbolSize: ${dotSize},
            symbol: 'diamond',
            symbolOffset: [0, ${dotOffset}],
            itemStyle: { color: '${peerColor}', borderColor: '#fff', borderWidth: 1 },
            z: 2,
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
