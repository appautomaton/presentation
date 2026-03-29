// ════════════════════════════════════════════════════════════════════════
// Funnel — pipeline conversion by stage with dropoff rates
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Funnel charts are vertically oriented and work well at smaller sizes.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap stages, values, and colors with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • label.color does NOT accept a function — set it per data item
//   • Funnel label rich text lets you combine stage name, value, and
//     conversion rate in one label — no graphic elements needed
//   • Do NOT use graphic elements for data-positioned annotations —
//     they position relative to container, not the funnel geometry
//   • Funnel gap scales with container — use responsive sizing
//   • containLabel is irrelevant for funnel (no axes) — use
//     series left/right/top/bottom for padding

module.exports = {
  id: 'funnel',
  title: 'Funnel',
  tier: 4,
  proves: 'pipeline conversion by stage with dropoff rates',
  data: 'Sales pipeline: awareness through closed-won with conversion rates',
  sectionLabel: 'Pipeline Conversion',
  actionTitle: 'Proposal-to-close is the critical bottleneck at 22% conversion vs. 35% industry benchmark',
  source: 'Source: CRM pipeline analytics, trailing 12 months',
  exhibitId: 'Exhibit T4.6',

  renderExhibit({ tokens }) {
    const chartId = 'funnel-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    // Replace these from the brand config. Default is system sans-serif
    // with a navy/slate consulting palette.
    const fontFamily  = 'sans-serif';
    const textColor   = '#101A27';             // primary label text
    const textMuted   = '#4E6176';             // secondary annotations
    const labelOnDark = '#FFFFFF';             // labels on dark funnel stages

    // Stage colors — darkest at top (widest), lightest mid, accent at bottom.
    // Must have one entry per stage.
    const stageColors = [
      '#123A63',          // Awareness (darkest)
      '#1A4E7A',          // Interest
      '#2E7D9B',          // Qualified
      '#5BA4C9',          // Proposal
      '#8BA5BD',          // Negotiation
      '#2E9E5A',          // Closed Won (success accent)
    ];

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Replace with real pipeline data. stages[] and values[] must match
    // in length. Conversion rates are computed automatically.
    const stages = ['Awareness', 'Interest', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won'];
    const values = [10000, 6200, 3800, 2100, 920, 460];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    // Tune these if the defaults don't suit the deck. The responsive
    // formulas below interpolate between min/max based on container size.
    const fontSizeRange     = [11, 17];       // [min, max] px for stage name + value
    const convSizeRange     = [10, 14];       // [min, max] px for conversion annotation
    const gapRange          = [1, 4];         // [min, max] px gap between trapezoids
    const padRange          = [10, 24];       // [min, max] px top/bottom/side padding

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    // fontSize:   linear interpolation across 300–720px (min dimension), clamped
    // convSize:   same interpolation for the smaller conversion rate text
    // gap:        funnel stage gap, scaled with container
    // pad:        series padding from container edges
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const [convMin, convMax] = convSizeRange;
    const convSize = Math.max(convMin, Math.min(convMax,
      Math.round(convMin + (minDim - 300) / (720 - 300) * (convMax - convMin))));

    const [gapMin, gapMax] = gapRange;
    const funnelGap = Math.max(gapMin, Math.min(gapMax,
      Math.round(gapMin + (minDim - 300) / (720 - 300) * (gapMax - gapMin))));

    const [padMin, padMax] = padRange;
    const pad = Math.max(padMin, Math.min(padMax,
      Math.round(padMin + (minDim - 300) / (720 - 300) * (padMax - padMin))));

    // ── Contrast helper ─────────────────────────────────────────────────
    // Returns white or dark text based on stage background luminance.
    function contrastColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? textColor : labelOnDark;
    }

    // ── Per-item data objects ───────────────────────────────────────────
    // Each stage gets its own label color (because label.color can't be
    // a function in ECharts). The rich text formatter shows stage name,
    // value, and conversion rate from the previous stage — all in one
    // label, no graphic elements needed.
    const dataItems = stages.map((name, i) => {
      const lblColor = contrastColor(stageColors[i]);
      const convRate = i > 0 ? Math.round(values[i] / values[i - 1] * 100) + '% conv.' : '';
      // Muted color for conversion annotation — lighter on dark bg, darker on light bg
      const convColor = lblColor === labelOnDark ? '#BFCFDF' : textMuted;

      return {
        name: name,
        value: values[i],
        itemStyle: { color: stageColors[i], borderWidth: 0 },
        label: {
          color: lblColor,
          rich: {
            name: {
              fontSize: fontSize,
              fontFamily: fontFamily,
              fontWeight: 'bold',
              color: lblColor,
              lineHeight: Math.round(fontSize * 1.3),
            },
            val: {
              fontSize: fontSize,
              fontFamily: fontFamily,
              color: lblColor,
              lineHeight: Math.round(fontSize * 1.3),
            },
            conv: {
              fontSize: convSize,
              fontFamily: fontFamily,
              color: convColor,
              lineHeight: Math.round(convSize * 1.4),
            },
          },
          formatter: convRate
            ? '{name|' + name + '}  {val|' + values[i].toLocaleString() + '}\n{conv|' + convRate + '}'
            : '{name|' + name + '}  {val|' + values[i].toLocaleString() + '}',
        },
      };
    });

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
          type: 'funnel',
          left: 2,
          right: 2,
          top: 2,
          bottom: 2,
          width: 'auto',
          sort: 'descending',
          gap: ${funnelGap},
          label: {
            show: true,
            position: 'inside',
            fontSize: ${fontSize},
            fontFamily: '${fontFamily}',
          },
          labelLine: { show: false },
          data: ${JSON.stringify(dataItems)},
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
