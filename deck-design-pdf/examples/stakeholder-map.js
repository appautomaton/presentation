// ════════════════════════════════════════════════════════════════════════
// Stakeholder Map — influence × alignment positioning (scatter)
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap stakeholders array with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Use markArea for quadrant labels — data-coordinate, auto-responsive
//   • Use markLine for quadrant dividers — data-coordinate, auto-responsive
//   • Do NOT use graphic elements for anything tied to data positions
//   • Scatter label formatter can be a function in the template literal
//     (it runs in the browser, not in Node.js)

module.exports = {
  id: 'stakeholder-map',
  title: 'Stakeholder Map',
  tier: 3,
  proves: 'influence × alignment positioning to prioritize engagement strategy',
  data: 'Key stakeholders mapped by influence level and alignment to proposed change',
  sectionLabel: 'Change Management',
  actionTitle: 'Three high-influence stakeholders are misaligned — targeted engagement can convert CFO and SVP Sales',
  source: 'Source: Stakeholder interviews, change readiness assessment (n=12)',
  exhibitId: 'Exhibit 9.1',

  renderExhibit({ tokens }) {
    const chartId = 'stakeholder-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily    = 'sans-serif';
    const textColor     = '#101A27';
    const textMuted     = '#4E6176';
    const axisLine      = '#C7D5E5';
    const dividerColor  = '#E4EDF7';
    const championColor = '#2E9E5A';
    const alignedColor  = '#2E7D9B';
    const neutralColor  = '#8BA5BD';
    const opposedColor  = '#A43C35';

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Each: [alignment (x), influence (y), name, stance, strategy]
    // alignment: 1=opposed, 5=champion. influence: 1=low, 5=high.
    const stakeholders = [
      { x: 4.5, y: 4.8, name: 'CEO',              stance: 'champion', strategy: 'Maintain' },
      { x: 2.0, y: 4.5, name: 'CFO',              stance: 'opposed',  strategy: 'Convert' },
      { x: 4.0, y: 3.8, name: 'CTO',              stance: 'aligned',  strategy: 'Maintain' },
      { x: 1.8, y: 4.2, name: 'SVP Sales',        stance: 'opposed',  strategy: 'Convert' },
      { x: 3.5, y: 3.2, name: 'VP Product',       stance: 'aligned',  strategy: 'Maintain' },
      { x: 3.0, y: 2.8, name: 'VP Eng',           stance: 'neutral',  strategy: 'Inform' },
      { x: 4.2, y: 2.5, name: 'VP Marketing',     stance: 'aligned',  strategy: 'Maintain' },
      { x: 2.5, y: 2.2, name: 'VP HR',            stance: 'neutral',  strategy: 'Inform' },
      { x: 1.5, y: 1.8, name: 'Legal Dir',        stance: 'opposed',  strategy: 'Monitor' },
      { x: 4.0, y: 1.5, name: 'VP CS',            stance: 'aligned',  strategy: 'Inform' },
      { x: 3.2, y: 4.0, name: 'COO',              stance: 'neutral',  strategy: 'Convert' },
      { x: 2.2, y: 3.5, name: 'Regional VP EMEA', stance: 'opposed',  strategy: 'Convert' },
    ];

    const stanceColors = { champion: championColor, aligned: alignedColor, neutral: neutralColor, opposed: opposedColor };

    const xAxisName = 'Alignment to change';
    const yAxisName = 'Influence';
    const axisMin = 0.5;
    const axisMax = 5.5;
    const quadrantMid = 3;

    // Quadrant names
    const quadrantNames = {
      topRight:    'High influence\naligned',
      topLeft:     'High influence\nmisaligned',
      bottomLeft:  'Low influence\nmisaligned',
      bottomRight: 'Low influence\naligned',
    };

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange       = [10, 14];     // [min, max] px for labels
    const annotationSizeRange = [9, 12];      // [min, max] px for quadrant labels
    const pointSizeRange      = [12, 22];     // [min, max] px dot diameter

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const [annoMin, annoMax] = annotationSizeRange;
    const annotationSize = Math.max(annoMin, Math.min(annoMax,
      Math.round(annoMin + (minDim - 300) / (720 - 300) * (annoMax - annoMin))));

    const [ptMin, ptMax] = pointSizeRange;
    const pointSize = Math.max(ptMin, Math.min(ptMax,
      Math.round(ptMin + (minDim - 300) / (720 - 300) * (ptMax - ptMin))));

    // ── Per-point ECharts data ──────────────────────────────────────────
    const seriesData = stakeholders.map((s) => ({
      value: [s.x, s.y],
      name: s.name,
      itemStyle: { color: stanceColors[s.stance], borderColor: '#fff', borderWidth: 2 },
    }));

    // ── markArea: quadrant labels ───────────────────────────────────────
    const quadrantAreas = {
      silent: true,
      label: {
        show: true,
        fontSize: annotationSize,
        fontFamily: fontFamily,
        fontWeight: 'bold',
        letterSpacing: 1,
      },
      itemStyle: { color: 'transparent' },
      data: [
        [{ name: quadrantNames.topRight, xAxis: quadrantMid, yAxis: quadrantMid,
           label: { position: 'insideTopRight', color: 'rgba(46,158,90,0.4)' },
           itemStyle: { color: 'rgba(46,158,90,0.04)' } },
         { xAxis: axisMax, yAxis: axisMax }],
        [{ name: quadrantNames.topLeft, xAxis: axisMin, yAxis: quadrantMid,
           label: { position: 'insideTopLeft', color: 'rgba(164,60,53,0.4)' },
           itemStyle: { color: 'rgba(164,60,53,0.04)' } },
         { xAxis: quadrantMid, yAxis: axisMax }],
        [{ name: quadrantNames.bottomLeft, xAxis: axisMin, yAxis: axisMin,
           label: { position: 'insideBottomLeft', color: 'rgba(139,165,189,0.35)' } },
         { xAxis: quadrantMid, yAxis: quadrantMid }],
        [{ name: quadrantNames.bottomRight, xAxis: quadrantMid, yAxis: axisMin,
           label: { position: 'insideBottomRight', color: 'rgba(139,165,189,0.35)' } },
         { xAxis: axisMax, yAxis: quadrantMid }],
      ],
    };

    // ── markLine: quadrant dividers ─────────────────────────────────────
    const quadrantDividers = {
      silent: true,
      symbol: 'none',
      lineStyle: { color: dividerColor, type: 'dashed', width: 1 },
      label: { show: false },
      data: [{ xAxis: quadrantMid }, { yAxis: quadrantMid }],
    };

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
          min: ${axisMin}, max: ${axisMax},
          name: '${xAxisName}',
          nameLocation: 'center',
          nameGap: 2,
          nameTextStyle: { fontSize: ${annotationSize + 1}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${textMuted}' },
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        yAxis: {
          type: 'value',
          min: ${axisMin}, max: ${axisMax},
          name: '${yAxisName}',
          nameLocation: 'center',
          nameGap: 2,
          nameRotate: 90,
          nameTextStyle: { fontSize: ${annotationSize + 1}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${textMuted}' },
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        series: [{
          type: 'scatter',
          symbolSize: ${pointSize},
          z: 5,
          data: ${JSON.stringify(seriesData)},
          label: {
            show: true,
            position: 'right',
            fontSize: ${fontSize},
            fontWeight: 'bold',
            fontFamily: '${fontFamily}',
            color: '${textColor}',
            formatter: (p) => p.data.name,
            distance: 8,
          },
          markLine: ${JSON.stringify(quadrantDividers)},
          markArea: ${JSON.stringify(quadrantAreas)},
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
