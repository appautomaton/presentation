// ════════════════════════════════════════════════════════════════════════
// Donut Chart — dual-donut comparison with metric cards and HTML legend
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Mixed HTML + ECharts: grid layout for legend/cards, ECharts for donuts.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap segment names, values, and metric cards
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Pie/donut label.color does NOT accept a function — set per data item
//   • Use 'inside' position for labels on donut slices (white on dark)
//   • center: ['28%', '50%'] positions the donut by percentage of container
//   • radius: ['30%', '48%'] = [inner ring, outer ring] as % of smaller dim
//   • avoidLabelOverlap:false is needed when labels are 'inside' (no overlap
//     logic needed since they're positioned within slices)
//   • graphic text elements are used for donut titles — they use fill, not color

module.exports = {
  id: 'donut',
  title: 'Donut Chart',
  tier: 2,
  proves: 'dominant share across two related distributions',
  data: 'Revenue share and customer-count share by segment',
  sectionLabel: 'Customer Mix',
  actionTitle: 'Enterprise accounts represent 58% of revenue despite being only 12% of customer count',
  source: 'Source: CRM data, FY2025',
  exhibitId: 'Exhibit 9.1',

  renderExhibit({ tokens }) {
    const chartId = 'donut-comparison-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily    = 'sans-serif';
    const textColor     = '#101A27';
    const textMuted     = '#4E6176';
    const accent        = '#123A63';

    // Segment colors — darkest = largest segment, lightest = smallest.
    const segmentColors = ['#123A63', '#2E7D9B', '#8BA5BD', '#D6E3EE'];

    // ── 2. Data ─────────────────────────────────────────────────────────
    const segmentNames = ['Enterprise', 'Mid-Market', 'SMB', 'Self-Serve'];

    // Left donut
    const revenueData = [
      { value: 58, name: 'Enterprise' },
      { value: 26, name: 'Mid-Market' },
      { value: 12, name: 'SMB' },
      { value: 4,  name: 'Self-Serve' },
    ];
    const leftTitle = 'Revenue share';

    // Right donut
    const customerData = [
      { value: 12, name: 'Enterprise' },
      { value: 24, name: 'Mid-Market' },
      { value: 28, name: 'SMB' },
      { value: 36, name: 'Self-Serve' },
    ];
    const rightTitle = 'Customer count';

    // Metric cards
    const cards = [
      { value: '58%', label: 'Enterprise revenue share', detail: '$2.4B revenue across 340 accounts', highlight: true },
      { value: '12%', label: 'Enterprise customer share', detail: 'Self-serve and SMB contribute volume, not economics', highlight: false },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const labelFontRange   = [11, 16];     // [min, max] px for inside-donut %
    const titleFontRange   = [11, 15];     // [min, max] px for donut title text
    const legendFontRange  = [10, 14];     // [min, max] px for legend items
    const metricFontRange  = [20, 36];     // [min, max] px for card metric value
    const metricLabelRange = [10, 16];     // [min, max] px for card label text
    const annotFontRange   = [10, 14];     // [min, max] px for card detail text
    const legendSwatchRange = [8, 12];     // [min, max] px for legend color swatch
    const cardPadRange     = [8, 18];      // [min, max] px card padding

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const labelFont   = lerp(labelFontRange);
    const titleFont   = lerp(titleFontRange);
    const legendFont  = lerp(legendFontRange);
    const metricFont  = lerp(metricFontRange);
    const metricLabel = lerp(metricLabelRange);
    const annotFont   = lerp(annotFontRange);
    const swatch      = lerp(legendSwatchRange);
    const cardPad     = lerp(cardPadRange);

    const compact = minDim < 400;
    const donutRadius = compact ? ['34%', '58%'] : ['30%', '48%'];
    const donutCenterY = compact ? '46%' : '50%';
    const cardColumns = compact ? 1 : 2;
    const chartGap = Math.max(8, lerp([8, 16]));

    // ── Build legend HTML ─────────────────────────────────────────────
    const legendItems = segmentNames.map((name, i) => `
      <div style="display:flex;align-items:center;gap:${lerp([6, 10])}px;">
        <span style="width:${swatch}px;height:${swatch}px;background:${segmentColors[i]};display:inline-block;border-radius:2px;"></span>
        <span style="font-size:${legendFont}px;color:${textMuted};font-family:${fontFamily};">${name}</span>
      </div>
    `).join('');

    // ── Build metric cards HTML ───────────────────────────────────────
    const cardsHTML = cards.map(c => `
      <div style="padding:${cardPad}px;border:1px solid #D7E4EE;border-radius:${lerp([8, 16])}px;background:${c.highlight ? 'rgba(18,58,99,0.04)' : '#F7FAFC'};">
        <div style="font-size:${metricFont}px;font-weight:700;line-height:1;color:${c.highlight ? accent : textColor};font-family:${fontFamily};">${c.value}</div>
        <div style="font-size:${metricLabel}px;font-weight:600;color:${textColor};font-family:${fontFamily};margin-top:4px;">${c.label}</div>
        <div style="font-size:${annotFont}px;color:${textMuted};font-family:${fontFamily};margin-top:6px;">${c.detail}</div>
      </div>
    `).join('');

    // ── Per-donut ECharts data ────────────────────────────────────────
    const addColors = (data) => data.map((d, i) => ({
      ...d,
      itemStyle: { color: segmentColors[i] },
    }));

    const revenueItems = addColors(revenueData);
    const customerItems = addColors(customerData);

    // ── Template ────────────────────────────────────────────────────────
    return `<div class="h-full w-full" style="display:grid;grid-template-rows:auto minmax(0,1fr) auto auto;gap:${chartGap}px;">
      <div style="display:grid;grid-template-columns:1fr 1fr;">
        <div style="text-align:center;font-family:${fontFamily};font-size:${titleFont}px;font-weight:700;color:${textColor};">${leftTitle}</div>
        <div style="text-align:center;font-family:${fontFamily};font-size:${titleFont}px;font-weight:700;color:${textColor};">${rightTitle}</div>
      </div>
      <div id="${chartId}" style="width:100%;height:100%;"></div>
      <div style="display:flex;justify-content:center;gap:${lerp([12, 24])}px;flex-wrap:wrap;">
        ${legendItems}
      </div>
      <div style="display:grid;grid-template-columns:repeat(${cardColumns},minmax(0,1fr));gap:${lerp([10, 20])}px;">
        ${cardsHTML}
      </div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      chart.setOption({
        animation: false,
        tooltip: { show: false },
        series: [
          {
            type: 'pie',
            name: '${leftTitle}',
            radius: ${JSON.stringify(donutRadius)},
            center: ['25%', '${donutCenterY}'],
            avoidLabelOverlap: false,
            labelLine: { show: false },
            label: {
              show: true,
              position: 'inside',
              fontSize: ${labelFont},
              fontWeight: 'bold',
              fontFamily: '${fontFamily}',
              color: '#fff',
              formatter: '{d}%',
            },
            data: ${JSON.stringify(revenueItems)},
          },
          {
            type: 'pie',
            name: '${rightTitle}',
            radius: ${JSON.stringify(donutRadius)},
            center: ['75%', '${donutCenterY}'],
            avoidLabelOverlap: false,
            labelLine: { show: false },
            label: {
              show: true,
              position: 'inside',
              fontSize: ${labelFont},
              fontWeight: 'bold',
              fontFamily: '${fontFamily}',
              color: '#fff',
              formatter: '{d}%',
            },
            data: ${JSON.stringify(customerItems)},
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
