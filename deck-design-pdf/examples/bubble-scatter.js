// ════════════════════════════════════════════════════════════════════════
// Bubble Scatter — quadrant chart with three variables (x, y, size)
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Bubbles, labels, and annotations all scale with container dimensions.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap points array with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • label.color does NOT accept a function — set it per data point
//   • labelLayout.hideOverlap hides labels that collide — always enable it
//   • Use markLine for quadrant dividers (data-coordinate, auto-responsive)
//   • Use markArea for quadrant labels (data-coordinate, auto-responsive)
//   • Do NOT use graphic elements for anything tied to data positions —
//     they position relative to container, not the grid/data area
//   • symbolSize is in px, not data units — scale it from container size

module.exports = {
  id: 'bubble-scatter',
  title: 'Bubble Scatter',
  tier: 2,
  proves: 'positioning with three variables (x, y, size)',
  data: 'Market segments by attractiveness versus competitive position; bubble size = TAM ($B)',
  sectionLabel: 'Market Positioning',
  actionTitle: 'Cloud infrastructure and data analytics represent the largest addressable opportunities',
  source: 'Source: Market research, team analysis. Bubble size = TAM ($B)',
  exhibitId: 'Exhibit 8.1',

  renderExhibit({ tokens }) {
    const chartId = 'bubble-scatter-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily  = 'sans-serif';
    const textColor   = '#101A27';
    const textMuted   = '#4E6176';
    const accent      = '#123A63';
    const axisLine    = '#C7D5E5';

    // Bubble palette — darkest = highest priority, lightest = lowest.
    // Lightest colors should still be visible against the background.
    const bubblePalette = ['#123A63', '#2E7D9B', '#6B9AB8', '#8DB8D0', '#A7C9DE', '#B8D4E8', '#C7DDF0'];

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Each point: name, x, y, size value, palette index, label position.
    // labelPos: 'inside' for large dark bubbles (white text),
    //           'top'/'right'/'bottom' for smaller or light bubbles (dark text).
    const points = [
      { name: 'Cloud Infra',      x: 75, y: 82, tam: 48, palette: 0, labelPos: 'right' },
      { name: 'Data Analytics',   x: 60, y: 78, tam: 35, palette: 1, labelPos: 'left' },
      { name: 'Cybersecurity',    x: 85, y: 55, tam: 22, palette: 2, labelPos: 'top' },
      { name: 'AI / ML Platform', x: 40, y: 70, tam: 28, palette: 3, labelPos: 'right' },
      { name: 'Dev Tools',        x: 70, y: 40, tam: 15, palette: 4, labelPos: 'top' },
      { name: 'IoT',              x: 30, y: 45, tam: 12, palette: 5, labelPos: 'right' },
      { name: 'Edge Compute',     x: 55, y: 30, tam: 8,  palette: 6, labelPos: 'bottom' },
    ];

    // Axis config
    const xAxisName = 'Competitive position';
    const yAxisName = 'Market attractiveness';
    const axisMin = 15;
    const axisMax = 100;
    const quadrantMid = 50;                   // data value where quadrants divide

    // Quadrant names — counterclockwise from top-right
    const quadrantNames = {
      topRight:    'Priority bets',
      topLeft:     'Build position',
      bottomLeft:  'Deprioritize',
      bottomRight: 'Harvest',
    };

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const fontSizeRange       = [11, 16];     // [min, max] px for bubble labels
    const annotationSizeRange = [12, 16];     // [min, max] px for quadrant/axis labels
    const bubbleSizeBase      = 16;           // minimum bubble diameter before TAM scaling
    const bubbleSizeFactor    = 0.85;         // px per TAM unit
    const bubbleScaleRange    = [0.55, 1.15]; // [min, max] bubble scale factor

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);

    const [fontMin, fontMax] = fontSizeRange;
    const fontSize = Math.max(fontMin, Math.min(fontMax,
      Math.round(fontMin + (minDim - 300) / (720 - 300) * (fontMax - fontMin))));

    const [annoMin, annoMax] = annotationSizeRange;
    const annotationSize = Math.max(annoMin, Math.min(annoMax,
      Math.round(annoMin + (minDim - 300) / (720 - 300) * (annoMax - annoMin))));

    const [scaleMin, scaleMax] = bubbleScaleRange;
    const bubbleScale = Math.max(scaleMin, Math.min(scaleMax, minDim / 540));

    // ── Contrast helper (auto white/dark text based on bubble color) ────
    function contrastColor(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? textColor : '#FFFFFF';
    }

    // ── Per-point ECharts data ──────────────────────────────────────────
    const seriesData = points.map((p) => ({
      value: [p.x, p.y],
      symbolSize: Math.round((bubbleSizeBase + p.tam * bubbleSizeFactor) * bubbleScale),
      label: {
        show: true,
        formatter: p.name + '\n$' + p.tam + 'B',
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: 'bold',
        lineHeight: fontSize + 2,
        color: p.labelPos === 'inside' ? contrastColor(bubblePalette[p.palette]) : textColor,
        position: p.labelPos,
      },
      itemStyle: {
        color: bubblePalette[p.palette],
        opacity: 0.92,
      },
    }));

    // ── markArea: quadrant labels (data-coordinate, fully responsive) ────
    // No divider lines by default — the framework is abstract, not a hard boundary.
    // Agent can add markLine with { xAxis: threshold } if the data has a real cutoff.
    const quadrantAreas = {
      silent: true,
      label: {
        show: true,
        fontSize: annotationSize,
        fontFamily: fontFamily,
        fontWeight: 'bold',
        color: textMuted,
      },
      itemStyle: { color: 'transparent' },
      data: [
        [{ name: quadrantNames.topRight, xAxis: quadrantMid, yAxis: quadrantMid,
           label: { position: 'insideTopRight', color: accent } },
         { xAxis: axisMax, yAxis: axisMax }],
        [{ name: quadrantNames.topLeft, xAxis: axisMin, yAxis: quadrantMid,
           label: { position: 'insideTopLeft' } },
         { xAxis: quadrantMid, yAxis: axisMax }],
        [{ name: quadrantNames.bottomLeft, xAxis: axisMin, yAxis: axisMin,
           label: { position: 'insideBottomLeft' } },
         { xAxis: quadrantMid, yAxis: quadrantMid }],
        [{ name: quadrantNames.bottomRight, xAxis: quadrantMid, yAxis: axisMin,
           label: { position: 'insideBottomRight' } },
         { xAxis: axisMax, yAxis: quadrantMid }],
      ],
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
          nameTextStyle: { fontSize: ${annotationSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${textMuted}' },
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
          nameTextStyle: { fontSize: ${annotationSize}, fontFamily: '${fontFamily}', fontWeight: 'bold', color: '${textMuted}' },
          axisLine:  { lineStyle: { color: '${axisLine}' } },
          axisTick:  { show: false },
          axisLabel: { show: false },
          splitLine: { show: false },
        },
        series: [{
          type: 'scatter',
          labelLayout: { hideOverlap: true },
          data: ${JSON.stringify(seriesData)},
          markArea: ${JSON.stringify(quadrantAreas)},
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
