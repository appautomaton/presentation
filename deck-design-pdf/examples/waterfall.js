// ════════════════════════════════════════════════════════════════════════
// Waterfall / Bridge — decomposition ("What drove the delta?")
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or wide containers.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap start value, drivers, and end label
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Waterfall uses a stacked bar trick: invisible base bar + colored delta bar
//   • itemStyle.color CAN be a function on bars (unlike label.color)
//   • label.formatter CAN be a function (runs in browser, not Node.js)
//   • alignMinLabel/alignMaxLabel pins first/last category labels
//   • yAxis formatter is a function — must be inline, not JSON.stringify'd

module.exports = {
  id: 'waterfall',
  title: 'Waterfall / Bridge',
  tier: 1,
  proves: 'decomposition ("What drove the delta?")',
  data: 'EBITDA bridge FY2024 to FY2025',
  sectionLabel: 'Financial Analysis',
  actionTitle: 'EBITDA grew $420M driven by pricing and volume, partially offset by cost inflation',
  source: 'Source: Company financials, team analysis',
  exhibitId: 'Exhibit 2.1',

  renderExhibit({ tokens }) {
    const chartId = 'waterfall-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily   = 'sans-serif';
    const textColor    = '#101A27';
    const textMuted    = '#4E6176';
    const totalBar     = '#123A63';           // start/end total bars
    const positiveBar  = '#2E7D9B';           // positive delta
    const negativeBar  = '#CC4444';           // negative delta
    const axisLine     = '#C7D5E5';
    const gridLine     = '#E4EDF7';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const startLabel = 'FY2024';
    const endLabel   = 'FY2025';
    const startValue = 3800;
    const drivers = [
      { label: 'Pricing',          delta: 480 },
      { label: 'Volume',           delta: 200 },
      { label: 'Mix',              delta: -180 },
      { label: 'COGS\nInflation',  delta: -110 },
      { label: 'SG&A',             delta: -70 },
      { label: 'FX',               delta: 100 },
    ];
    const valueUnit = 'M';

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange   = [9, 16];          // [min, max] px for axis/value labels
    const barWidthRange   = [14, 52];         // [min, max] px bar thickness
    const rotateRange     = [40, 15];         // [min, max] degrees — more rotation at small sizes
    const valueFontRange  = [8, 16];          // [min, max] px for bar value labels

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(Math.min(lo, hi), Math.min(Math.max(lo, hi),
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const fontSize  = lerp(fontSizeRange);
    const barWidth  = lerp(barWidthRange);
    const labelRotate = lerp(rotateRange);
    const valueFont = lerp(valueFontRange);

    // ── Build waterfall bar data ────────────────────────────────────────
    const bars = [{ label: startLabel, base: 0, value: startValue, raw: startValue, total: true }];
    let running = startValue;
    for (const d of drivers) {
      const next = running + d.delta;
      bars.push({
        label: d.label,
        base: d.delta >= 0 ? running : next,
        value: Math.abs(d.delta),
        raw: d.delta,
        total: false,
      });
      running = next;
    }
    bars.push({ label: endLabel, base: 0, value: running, raw: running, total: true });
    const floor = Math.min(...bars.map(b => b.total ? 0 : Math.min(b.base, b.base + b.value))) - 160;

    // ── Template ────────────────────────────────────────────────────────
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });

      const bars = ${JSON.stringify(bars)};

      chart.setOption({
        animation: false,
        tooltip: { show: false },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: {
          type: 'category',
          data: bars.map(b => b.label),
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       interval: 0, rotate: ${labelRotate} },
        },
        yAxis: {
          type: 'value',
          min: ${floor},
          axisLine:  { show: false },
          axisTick:  { show: false },
          axisLabel: { fontSize: ${fontSize}, fontFamily: '${fontFamily}', color: '${textMuted}',
                       formatter: (v) => '$' + v + '${valueUnit}' },
          splitLine: { lineStyle: { color: '${gridLine}', type: 'dashed' } },
        },
        series: [
          {
            type: 'bar',
            stack: 'bridge',
            data: bars.map(b => b.base),
            itemStyle: { color: 'transparent' },
            emphasis: { itemStyle: { color: 'transparent' } },
            silent: true,
          },
          {
            type: 'bar',
            stack: 'bridge',
            barWidth: ${barWidth},
            data: bars.map(b => ({ value: b.value, raw: b.raw, total: b.total })),
            itemStyle: {
              color: (params) => {
                if (params.data.total) return '${totalBar}';
                return params.data.raw >= 0 ? '${positiveBar}' : '${negativeBar}';
              },
              borderRadius: [4, 4, 0, 0],
            },
            label: {
              show: true,
              position: 'top',
              fontSize: ${valueFont},
              fontFamily: '${fontFamily}',
              fontWeight: 'bold',
              color: '${textColor}',
              formatter: (params) => {
                if (params.data.total) return '$' + (params.data.raw / 1000).toFixed(1) + 'B';
                return (params.data.raw >= 0 ? '+' : '') + '$' + params.data.raw + '${valueUnit}';
              },
            },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
