// ════════════════════════════════════════════════════════════════════════
// Horizontal Bar Chart — sorted descending, hero item highlighted
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or narrow columns.
// Adapts to any aspect ratio — can be tall and narrow or short and wide.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap categories + values with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size and item count.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • label.color does NOT accept a function — set it per data item
//   • Y-axis multiline labels can't right-align — use a formatter that
//     splits on spaces (not overflow:'break', which leaves a trailing space)
//   • containLabel:true makes the grid shrink to fit axis labels

module.exports = {
  id: 'bar-horizontal',
  title: 'Horizontal Sorted Bars',
  tier: 1,
  proves: 'ranking / comparison ("Which is biggest?")',
  data: 'Operating margin by business unit, sorted descending',
  sectionLabel: 'Performance Review',
  actionTitle: 'Industrial Solutions leads operating margin across all business units',
  source: 'Source: Company financials FY2025',
  exhibitId: 'Exhibit 1.1',

  renderExhibit({ tokens }) {
    const chartId = 'bar-horizontal-chart';

    // ── 1. Brand variables ──────────────────────────────────────────────
    // Replace these from the brand config. Default is system sans-serif
    // with a navy/slate consulting palette.
    const fontFamily = 'sans-serif';
    const textColor  = '#101A27';             // axis labels, value labels
    const accentBar  = '#123A63';             // hero item (darkest bar)
    const mutedBar   = '#C7D5E5';             // all other bars

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Replace with real data. Keep categories and values in matching order.
    // The last item is treated as the "hero" (accent color + white label).
    const categories = [
      'Corporate Services', 'Retail', 'Logistics',
      'Digital', 'Healthcare', 'Energy', 'Industrial Solutions',
    ];
    const values = [8.2, 11.5, 14.3, 17.8, 19.4, 22.1, 26.7];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    // Tune these if the defaults don't suit the deck. The responsive
    // formulas below interpolate between min/max based on container size.
    const fontSizeRange     = [14, 20];       // [min, max] px for all labels
    const barWidthRange     = [12, 48];       // [min, max] px bar thickness
    const barFillRatio      = 0.55;           // portion of vertical slot per bar (rest is gap)
    const labelWrapBelow    = 400;            // container width below which long labels wrap

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    // fontSize:  linear interpolation across 300–1120px width, clamped to range
    // barWidth:  height ÷ item count × fill ratio, clamped to range
    // wrapChars: below labelWrapBelow, names longer than 10 chars split at spaces
    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (tokens.width - 300) / (1120 - 300) * (fontMax - fontMin))));

    const [barMin, barMax] = barWidthRange;
    const barWidth = Math.max(barMin, Math.min(barMax,
      Math.round((tokens.height - 16) / categories.length * barFillRatio)));

    const wrapChars = tokens.width < labelWrapBelow ? 10 : Infinity;

    // ── Per-item styling ────────────────────────────────────────────────
    // Hero bar = accent color + white text. Others = muted color + dark text.
    // Must be per-item objects because ECharts label.color doesn't take a function.
    const dataItems = values.map((v, i) => {
      const isHero = i === values.length - 1;
      return {
        value: v,
        itemStyle: { color: isHero ? accentBar : mutedBar, borderRadius: [0, 6, 6, 0] },
        label:     { color: isHero ? '#FFFFFF' : textColor },
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
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'value',
          axisLine:  { show: false },
          axisTick:  { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'category',
          data: ${JSON.stringify(categories)},
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            fontSize:   ${fontSize},
            fontFamily: '${fontFamily}',
            color:      '${textColor}',
            formatter: (name) => name.length > ${wrapChars} ? name.split(' ').join('\\n') : name,
          },
        },
        series: [{
          type: 'bar',
          data: ${JSON.stringify(dataItems)},
          barWidth: ${barWidth},
          label: {
            show:       true,
            position:   'insideRight',
            formatter:  '{c}%',
            fontSize:   ${fontSize},
            fontFamily: '${fontFamily}',
            fontWeight: 'bold',
          },
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
