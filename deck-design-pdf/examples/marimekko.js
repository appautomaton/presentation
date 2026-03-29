// ════════════════════════════════════════════════════════════════════════
// Marimekko — market landscape: segment size (width) x share (height)
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: mixed HTML grid + ECharts custom rendering.
// Column widths = segment TAM (CSS fr units), heights = competitor share.
// Recommended minimum width: 300px.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap segments array (name, size, shares)
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • ECharts has no native Marimekko — use custom series with renderItem
//   • renderItem receives normalized 0-1 coordinates; api.coord() maps them
//   • Inside labels are rendered as graphic text elements within renderItem
//   • HTML grid with CSS fr units handles the segment width proportions
//   • Label visibility is conditional on rect area (shouldLabel threshold)
//   • Small segments may need word-break for long names

module.exports = {
  id: 'marimekko',
  title: 'Marimekko',
  tier: 4,
  proves: 'market landscape — segment size AND competitive share in one view',
  data: 'Market segments by TAM (width) and competitor share (height)',
  sectionLabel: 'Market Landscape',
  actionTitle: 'Enterprise segment dominates the $86B market; Company A leads in Enterprise and Mid-Market',
  source: 'Source: Market research FY2025. Width = segment TAM, height = competitive share',
  exhibitId: 'Exhibit T4.3',

  renderExhibit({ tokens }) {
    const chartId = 'marimekko-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily = 'sans-serif';
    const textColor  = '#101A27';
    const textMuted  = '#4E6176';
    const accent     = '#123A63';
    const accentAlt  = '#2E7D9B';
    const muted      = '#8BA5BD';
    const axisLine   = '#C7D5E5';

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Each segment: name, TAM size (for column width), and shares.
    // Shares within a segment must sum to 100.
    const segments = [
      { name: 'Enterprise', size: 42, shares: [
        { name: 'Company A', pct: 32, color: accent },
        { name: 'Company B', pct: 24, color: accentAlt },
        { name: 'Company C', pct: 18, color: muted },
        { name: 'Others',    pct: 26, color: axisLine },
      ]},
      { name: 'Mid-Market', size: 24, shares: [
        { name: 'Company A', pct: 28, color: accent },
        { name: 'Company B', pct: 20, color: accentAlt },
        { name: 'Company C', pct: 22, color: muted },
        { name: 'Others',    pct: 30, color: axisLine },
      ]},
      { name: 'SMB', size: 14, shares: [
        { name: 'Company A', pct: 15, color: accent },
        { name: 'Company B', pct: 30, color: accentAlt },
        { name: 'Company C', pct: 25, color: muted },
        { name: 'Others',    pct: 30, color: axisLine },
      ]},
      { name: 'Self-Serve', size: 6, shares: [
        { name: 'Company A', pct: 8,  color: accent },
        { name: 'Company B', pct: 12, color: accentAlt },
        { name: 'Company C', pct: 35, color: muted },
        { name: 'Others',    pct: 45, color: axisLine },
      ]},
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange    = [9, 14];      // [min, max] px for segment names and TAM%
    const labelFontRange   = [10, 16];     // [min, max] px for inside-rect % labels
    const topBandRange     = [20, 36];     // [min, max] px for TAM% strip height
    const padRange         = [2, 8];       // [min, max] px for cell padding

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const fontSize   = lerp(fontSizeRange);
    const labelFont  = lerp(labelFontRange);
    const topBand    = lerp(topBandRange);
    const bottomBand = topBand + 6;
    const pad        = lerp(padRange);

    // ── Computed layout ───────────────────────────────────────────────
    const segmentColumns = segments.map(s => s.size + 'fr').join(' ');
    const totalTam = segments.reduce((sum, s) => sum + s.size, 0);

    const shareStrip = segments.map(seg => {
      const pct = Math.round((seg.size / totalTam) * 100);
      return `<div class="flex min-w-0 items-end justify-center text-center" style="padding:${pad}px;">
        <div style="font-size:${fontSize}px;font-weight:700;color:${textMuted};line-height:1;">${pct}%</div>
      </div>`;
    }).join('');

    const segmentStrip = segments.map(seg => {
      const nameSize = seg.size <= 8 ? Math.max(fontSize - 1, 9) : fontSize;
      return `<div class="flex min-w-0 items-start justify-center text-center" style="padding:${pad + 4}px ${pad}px 0;">
        <div style="font-size:${nameSize}px;font-weight:700;color:${textColor};line-height:1.05;overflow-wrap:anywhere;">${seg.name}</div>
      </div>`;
    }).join('');

    // ── Template ────────────────────────────────────────────────────────
    return `<div class="h-full w-full">
      <div class="grid h-full w-full" style="grid-template-rows:${topBand}px minmax(0,1fr) ${bottomBand}px;">
        <div class="grid" style="grid-template-columns:${segmentColumns};">
          ${shareStrip}
        </div>
        <div class="relative min-h-0 overflow-hidden border-b border-slate-200" style="width:100%;height:100%;">
          <div id="${chartId}" class="h-full w-full"></div>
        </div>
        <div class="grid" style="grid-template-columns:${segmentColumns};">
          ${segmentStrip}
        </div>
      </div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      var segments = ${JSON.stringify(segments)};
      var totalSize = segments.reduce(function(a, s) { return a + s.size; }, 0);
      var rects = [];
      var xOff = 0;
      segments.forEach(function(seg) {
        var w = seg.size / totalSize;
        var yOff = 0;
        seg.shares.forEach(function(share) {
          var h = share.pct / 100;
          rects.push({ x: xOff, y: yOff, w: w, h: h, color: share.color, pct: share.pct });
          yOff += h;
        });
        xOff += w;
      });
      chart.setOption({
        animation: false,
        tooltip: { show: false },
        grid: { left: 2, right: 2, top: 2, bottom: 2 },
        xAxis: { show: false, min: 0, max: 1 },
        yAxis: { show: false, min: 0, max: 1 },
        series: [{
          type: 'custom',
          renderItem: function(params, api) {
            var d = rects[params.dataIndex];
            var start = api.coord([d.x, d.y]);
            var end = api.coord([d.x + d.w, d.y + d.h]);
            var shape = { x: start[0], y: end[1], width: end[0] - start[0], height: start[1] - end[1] };
            var items = [{ type: 'rect', shape: shape, style: { fill: d.color } }];
            var shouldLabel = (d.h > 0.16 && d.w > 0.12) || (d.h > 0.24 && d.w > 0.055);
            if (shouldLabel) {
              var isDark = d.color === '${accent}' || d.color === '${accentAlt}';
              items.push({
                type: 'text',
                style: {
                  text: d.pct + '%',
                  x: shape.x + shape.width / 2,
                  y: shape.y + shape.height / 2,
                  fill: isDark ? '#ffffff' : '${textMuted}',
                  fontSize: ${labelFont},
                  fontWeight: 'bold',
                  fontFamily: '${fontFamily}',
                  textAlign: 'center',
                  textVerticalAlign: 'middle',
                },
              });
            }
            return { type: 'group', children: items };
          },
          data: rects.map(function(_, i) { return [i]; }),
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
