// ════════════════════════════════════════════════════════════════════════
// Sankey — value flow from sources through channels to products
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Node widths and gaps scale with container. Labels stay legible at all sizes.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap nodes + links with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Sankey right margin must be large enough for the longest right-side
//     label — if labels clip, increase rightPadRange
//   • lineStyle.color:'gradient' gives source-to-target color blending
//   • layoutIterations controls how many passes ECharts makes to reduce
//     crossings — 32 is a good default for moderate graphs
//   • Node colors must be set per data item — series-level color doesn't work

module.exports = {
  id: 'sankey',
  title: 'Sankey',
  tier: 4,
  proves: 'how value flows from sources through channels to products',
  data: 'Revenue allocation: customer segment → channel → product line',
  sectionLabel: 'Revenue Flow',
  actionTitle: 'Enterprise services generate 40% of total revenue, flowing primarily through direct sales',
  source: 'Source: Revenue allocation model FY2025, $M',
  exhibitId: 'Exhibit T4.4',

  renderExhibit({ tokens }) {
    const chartId = 'sankey-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily = 'sans-serif';
    const textColor  = '#101A27';
    const accent     = '#123A63';
    const accentAlt  = '#2E7D9B';
    const accentSoft = '#5BA4C9';
    const muted      = '#8BA5BD';
    const axisLine   = '#C7D5E5';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const nodes = [
      { name: 'Enterprise',   color: accent },
      { name: 'Mid-Market',   color: accentAlt },
      { name: 'SMB',          color: muted },
      { name: 'Direct Sales', color: accent },
      { name: 'Channel',      color: accentSoft },
      { name: 'Digital',      color: muted },
      { name: 'Services',     color: accent },
      { name: 'Software',     color: accentAlt },
      { name: 'Hardware',     color: axisLine },
    ];

    const links = [
      { source: 'Enterprise',   target: 'Direct Sales', value: 820 },
      { source: 'Enterprise',   target: 'Channel',      value: 280 },
      { source: 'Mid-Market',   target: 'Direct Sales', value: 340 },
      { source: 'Mid-Market',   target: 'Channel',      value: 260 },
      { source: 'Mid-Market',   target: 'Digital',      value: 180 },
      { source: 'SMB',          target: 'Digital',       value: 320 },
      { source: 'SMB',          target: 'Channel',       value: 140 },
      { source: 'Direct Sales', target: 'Services',      value: 680 },
      { source: 'Direct Sales', target: 'Software',      value: 380 },
      { source: 'Direct Sales', target: 'Hardware',      value: 100 },
      { source: 'Channel',      target: 'Services',      value: 340 },
      { source: 'Channel',      target: 'Software',      value: 240 },
      { source: 'Channel',      target: 'Hardware',      value: 100 },
      { source: 'Digital',      target: 'Software',      value: 380 },
      { source: 'Digital',      target: 'Services',      value: 80 },
      { source: 'Digital',      target: 'Hardware',      value: 40 },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange    = [11, 16];     // [min, max] px for node labels
    const nodeWidthRange   = [12, 26];     // [min, max] px node bar width
    const nodeGapRange     = [10, 20];     // [min, max] px vertical gap between nodes
    const leftPadRange     = [24, 48];     // [min, max] px left margin
    const rightPadRange    = [72, 124];    // [min, max] px right margin (room for labels)
    const vertPadRange     = [12, 28];     // [min, max] px top/bottom margin

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const fontSize  = lerp(fontSizeRange);
    const nodeWidth = lerp(nodeWidthRange);
    const nodeGap   = lerp(nodeGapRange);
    const leftPad   = lerp(leftPadRange);
    const rightPad  = lerp(rightPadRange);
    const vertPad   = lerp(vertPadRange);

    // ── Per-node ECharts data ─────────────────────────────────────────
    const nodeData = nodes.map(n => ({
      name: n.name,
      itemStyle: { color: n.color },
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
          type: 'sankey',
          orient: 'horizontal',
          left: 2,
          right: 2,
          top: 2,
          bottom: 2,
          nodeWidth: ${nodeWidth},
          nodeGap: ${nodeGap},
          layoutIterations: 32,
          label: {
            fontSize: ${fontSize},
            fontWeight: 'bold',
            fontFamily: '${fontFamily}',
            color: '${textColor}',
          },
          lineStyle: { color: 'gradient', curveness: 0.5, opacity: 0.3 },
          itemStyle: { borderWidth: 0 },
          data: ${JSON.stringify(nodeData)},
          links: ${JSON.stringify(links)},
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
