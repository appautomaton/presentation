const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'marimekko',
  title: 'Marimekko',
  tier: 4,
  proves: 'market landscape — segment size AND competitive share in one view',
  data: 'Market segments by TAM (width) and competitor share (height)',
  sectionLabel: 'Market Landscape',
  actionTitle: 'Enterprise segment dominates the $86B market; Company A leads in Enterprise and Mid-Market',
  source: 'Source: Market research FY2025. Width = segment TAM, height = competitive share',
  exhibitId: 'Exhibit T4.3',
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
    rationale: 'variable-width columns with inside labels need moderate width for legibility',
  },
  renderExhibit({ tokens }) {
    const chartId = 'marimekko-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const insideLabel = {
      ...figure.annotationLargeStrong,
      color: '#ffffff',
    };
    const compactInsideLabelSize = Math.max(tokens.smallText, 11);
    const topBandHeight = tokens.adapt(24, 28, 32);
    const bottomBandHeight = tokens.adapt(30, 36, 42);
    const segments = [
      { name: 'Enterprise', size: 42, shares: [
        { name: 'Company A', pct: 32, color: colors.accent },
        { name: 'Company B', pct: 24, color: colors.accentAlt },
        { name: 'Company C', pct: 18, color: colors.textLight },
        { name: 'Others', pct: 26, color: colors.axisLine },
      ]},
      { name: 'Mid-Market', size: 24, shares: [
        { name: 'Company A', pct: 28, color: colors.accent },
        { name: 'Company B', pct: 20, color: colors.accentAlt },
        { name: 'Company C', pct: 22, color: colors.textLight },
        { name: 'Others', pct: 30, color: colors.axisLine },
      ]},
      { name: 'SMB', size: 14, shares: [
        { name: 'Company A', pct: 15, color: colors.accent },
        { name: 'Company B', pct: 30, color: colors.accentAlt },
        { name: 'Company C', pct: 25, color: colors.textLight },
        { name: 'Others', pct: 30, color: colors.axisLine },
      ]},
      { name: 'Self-Serve', size: 6, shares: [
        { name: 'Company A', pct: 8, color: colors.accent },
        { name: 'Company B', pct: 12, color: colors.accentAlt },
        { name: 'Company C', pct: 35, color: colors.textLight },
        { name: 'Others', pct: 45, color: colors.axisLine },
      ]},
    ];
    const segmentColumns = segments.map((seg) => `${seg.size}fr`).join(' ');
    const totalTam = segments.reduce((sum, seg) => sum + seg.size, 0);
    const shareStrip = segments.map((seg) => {
      const pct = Math.round((seg.size / totalTam) * 100);
      return `
      <div class="flex min-w-0 items-end justify-center text-center" style="padding:${tokens.adapt(2, 4, 6)}px ${tokens.adapt(4, 6, 8)}px;">
        <div style="font-size:${Math.max(tokens.smallText, 11)}px;font-weight:700;color:${colors.textMuted};line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${pct}%</div>
      </div>
    `;
    }).join('');
    const segmentStrip = segments.map((seg) => {
      const compactName = seg.size <= 8;
      const displayName = compactName ? seg.name.replace('-', '-<br>') : seg.name;
      const nameSize = compactName ? Math.max(tokens.microText - 1, 9) : Math.max(tokens.microText, 10);
      return `
      <div class="flex min-w-0 items-start justify-center text-center" style="padding:${tokens.adapt(8, 10, 12)}px ${tokens.adapt(4, 6, 8)}px 0;">
        <div style="font-size:${nameSize}px;font-weight:700;color:${colors.textStrong};line-height:1.05;white-space:normal;word-break:normal;overflow-wrap:anywhere;">${displayName}</div>
      </div>
    `;
    }).join('');
    return `<div class="h-full w-full">
      <div class="grid h-full w-full" style="grid-template-rows:${topBandHeight}px minmax(0,1fr) ${bottomBandHeight}px;">
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
      const segments = ${JSON.stringify(segments)};
      const totalSize = segments.reduce((a, s) => a + s.size, 0);
      const rects = [];
      let xOff = 0;
      segments.forEach(seg => {
        const w = seg.size / totalSize;
        let yOff = 0;
        seg.shares.forEach(share => {
          const h = share.pct / 100;
          rects.push({ x: xOff, y: yOff, w, h, color: share.color, pct: share.pct, seg: seg.name });
          yOff += h;
        });
        xOff += w;
      });
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: { left: 0, right: ${tokens.adapt(4, 8, 10)}, top: 0, bottom: 0, containLabel: false },
        xAxis: { show: false, min: 0, max: 1 },
        yAxis: { show: false, min: 0, max: 1 },
        series: [{
          type: 'custom',
          renderItem: (params, api) => {
            const d = rects[params.dataIndex];
            const start = api.coord([d.x, d.y]);
            const end = api.coord([d.x + d.w, d.y + d.h]);
            const shape = { x: start[0], y: end[1], width: end[0] - start[0], height: start[1] - end[1] };
            const items = [{ type: 'rect', shape, style: { fill: d.color } }];
            const shouldLabel = (d.h > 0.16 && d.w > 0.12) || (d.h > 0.24 && d.w > 0.055);
            if (shouldLabel) {
              const isDark = ['${colors.accent}', '${colors.accentAlt}'].includes(d.color);
              const compactLabel = d.w <= 0.12;
              items.push({
                type: 'text',
                style: {
                  text: d.pct + '%',
                  x: shape.x + shape.width / 2,
                  y: shape.y + shape.height / 2,
                  fill: isDark ? '#ffffff' : '${colors.textMuted}',
                  fontSize: compactLabel ? ${compactInsideLabelSize} : ${insideLabel.fontSize},
                  fontWeight: '${insideLabel.fontWeight}',
                  fontFamily: '${insideLabel.fontFamily}',
                  textAlign: 'center',
                  textVerticalAlign: 'middle',
                },
              });
            }
            return { type: 'group', children: items };
          },
          data: rects.map((_, i) => [i]),
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
