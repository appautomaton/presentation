// ════════════════════════════════════════════════════════════════════════
// Network / Collaboration Map — who actually works with whom
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Node positions are manually placed for consulting-quality static output
// (force-directed layout is unpredictable in PDF rendering).
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap nodes, links, and annotations with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Graph type with layout:'none' requires explicit x,y for every node
//   • Node x,y are in the chart's pixel coordinate space — scale them to
//     container dimensions for responsive positioning
//   • label.color does NOT accept a function — set it per data item
//   • Use graphic text elements sparingly — they don't reflow on resize
//   • lineStyle.width on links encodes edge weight (collaboration intensity)

module.exports = {
  id: 'network-map',
  title: 'Network / Collaboration Map',
  tier: 3,
  proves: 'formal vs. informal collaboration structure — who actually works with whom',
  data: 'Collaboration network across 8 teams based on meeting frequency and shared deliverables',
  sectionLabel: 'Organizational Analysis',
  actionTitle: 'Engineering and Product collaborate 4x more than the formal structure predicts — Data and Sales are isolated despite shared KPIs',
  source: 'Source: Collaboration analytics (calendar, Slack, shared docs), Q1 2026',
  exhibitId: 'Exhibit 17.1',

  renderExhibit({ tokens }) {
    const chartId = 'network-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily  = 'sans-serif';
    const textColor   = '#101A27';
    const textMuted   = '#4E6176';
    const accent      = '#123A63';
    const accentAlt   = '#2E7D9B';
    const accentSoft  = '#5BA4C9';
    const muted       = '#8BA5BD';
    const axisLine    = '#C7D5E5';
    const gridLine    = '#E4EDF7';
    const danger      = '#A43C35';

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Nodes: name, x/y as fractions of container (0–1), relative size offset, color.
    // Using fractional positioning so nodes scale with container dimensions.
    const nodesRaw = [
      { name: 'Engineering', fx: 0.375, fy: 0.37,  sizeOffset: 16, color: accent },
      { name: 'Product',     fx: 0.625, fy: 0.30,  sizeOffset: 12, color: accent },
      { name: 'Design',      fx: 0.563, fy: 0.63,  sizeOffset: 0,  color: accentAlt },
      { name: 'Data',        fx: 0.188, fy: 0.65,  sizeOffset: -4, color: muted },
      { name: 'Sales',       fx: 0.875, fy: 0.56,  sizeOffset: 4,  color: muted },
      { name: 'Marketing',   fx: 0.813, fy: 0.28,  sizeOffset: -2, color: accentSoft },
      { name: 'Operations',  fx: 0.250, fy: 0.22,  sizeOffset: -6, color: accentSoft },
      { name: 'Finance',     fx: 0.125, fy: 0.41,  sizeOffset: -8, color: muted },
    ];

    // Links: source, target, width (collaboration intensity), color, optional dash.
    const linksRaw = [
      { source: 'Engineering', target: 'Product',    width: 6,   color: accent },
      { source: 'Engineering', target: 'Design',     width: 3.5, color: accentAlt },
      { source: 'Product',     target: 'Design',     width: 3,   color: accentAlt },
      { source: 'Product',     target: 'Marketing',  width: 2,   color: axisLine },
      { source: 'Engineering', target: 'Operations', width: 2.5, color: axisLine },
      { source: 'Engineering', target: 'Data',       width: 2,   color: axisLine },
      { source: 'Sales',       target: 'Marketing',  width: 3,   color: accentSoft },
      { source: 'Finance',     target: 'Operations', width: 1.5, color: gridLine },
      { source: 'Sales',       target: 'Product',    width: 1.5, color: gridLine },
      // Missing link highlighted: Data <-> Sales should be strong but isn't
      { source: 'Data',        target: 'Sales',      width: 1,   color: danger, type: 'dashed' },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const nodeSizeRange   = [20, 48];      // [min, max] px base node diameter
    const labelSizeRange  = [10, 14];      // [min, max] px node label font
    const annotSizeRange  = [10, 13];      // [min, max] px for legend/annotation text

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [nodeMin, nodeMax] = nodeSizeRange;
    const nodeSize = Math.max(nodeMin, Math.min(nodeMax,
      Math.round(nodeMin + (minDim - 300) / (720 - 300) * (nodeMax - nodeMin))));

    const [labelMin, labelMax] = labelSizeRange;
    const labelSize = Math.max(labelMin, Math.min(labelMax,
      Math.round(labelMin + (minDim - 300) / (720 - 300) * (labelMax - labelMin))));

    const [annotMin, annotMax] = annotSizeRange;
    const annotSize = Math.max(annotMin, Math.min(annotMax,
      Math.round(annotMin + (minDim - 300) / (720 - 300) * (annotMax - annotMin))));

    // Scale node positions to container pixel space
    const nodes = nodesRaw.map(n => ({
      name: n.name,
      x: Math.round(n.fx * tokens.width),
      y: Math.round(n.fy * tokens.height),
      symbolSize: nodeSize + n.sizeOffset,
      itemStyle: { color: n.color },
    }));

    const links = linksRaw.map(l => ({
      source: l.source,
      target: l.target,
      lineStyle: { width: l.width, color: l.color, ...(l.type ? { type: l.type } : {}) },
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
        series: [{
          type: 'graph',
          layout: 'none',
          roam: false,
          label: {
            show: true,
            position: 'bottom',
            fontSize: ${labelSize},
            fontWeight: 'bold',
            fontFamily: '${fontFamily}',
            color: '${textColor}',
            distance: 8,
          },
          edgeLabel: { show: false },
          data: ${JSON.stringify(nodes)},
          links: ${JSON.stringify(links)},
          lineStyle: { curveness: 0.15, opacity: 0.7 },
          itemStyle: { borderColor: '#fff', borderWidth: 2 },
        }],
        graphic: [
          { type: 'text', right: 16, top: 8,
            style: { text: '\\u2501 Strong collaboration\\n\\u2505 Weak / missing link',
              fontSize: ${annotSize}, fill: '${textMuted}', fontFamily: '${fontFamily}', lineHeight: 18 } },
          { type: 'text', left: '18%', bottom: '8%',
            style: { text: '\\u26A0 Data \\u2194 Sales link is weak\\n   despite shared pipeline KPIs',
              fontSize: ${annotSize + 1}, fill: '${danger}', fontFamily: '${fontFamily}', fontWeight: 'bold', lineHeight: 18 } },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
