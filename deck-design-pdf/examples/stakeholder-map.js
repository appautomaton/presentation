const { STANDARD_COLORS, defineExample, getChartChrome, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'stakeholder-map',
  title: 'Stakeholder Map',
  tier: 3,
  proves: 'influence × alignment positioning to prioritize engagement strategy',
  data: 'Key stakeholders mapped by influence level and alignment to proposed change',
  sectionLabel: 'Change Management',
  actionTitle: 'Three high-influence stakeholders are misaligned — targeted engagement can convert CFO and SVP Sales',
  source: 'Source: Stakeholder interviews, change readiness assessment (n=12)',
  exhibitId: 'Exhibit 9.1',
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
    rationale: 'stakeholder maps need space for name labels; fewer than 12 stakeholders can shrink further',
  },
  renderExhibit({ tokens }) {
    const chartId = 'stakeholder-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);

    const labelSize = tokens.adapt(10, 12, 13);

    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });

      // [alignment (x), influence (y), name, strategy]
      // alignment: 1=opposed, 5=champion. influence: 1=low, 5=high.
      const stakeholders = [
        [4.5, 4.8, 'CEO', 'champion', 'Maintain'],
        [2.0, 4.5, 'CFO', 'opposed', 'Convert'],
        [4.0, 3.8, 'CTO', 'aligned', 'Maintain'],
        [1.8, 4.2, 'SVP Sales', 'opposed', 'Convert'],
        [3.5, 3.2, 'VP Product', 'aligned', 'Maintain'],
        [3.0, 2.8, 'VP Eng', 'neutral', 'Inform'],
        [4.2, 2.5, 'VP Marketing', 'aligned', 'Maintain'],
        [2.5, 2.2, 'VP HR', 'neutral', 'Inform'],
        [1.5, 1.8, 'Legal Dir', 'opposed', 'Monitor'],
        [4.0, 1.5, 'VP CS', 'aligned', 'Inform'],
        [3.2, 4.0, 'COO', 'neutral', 'Convert'],
        [2.2, 3.5, 'Regional VP EMEA', 'opposed', 'Convert'],
      ];

      var colorMap = {
        champion: '${colors.success}',
        aligned: '${colors.accentAlt}',
        neutral: '${colors.textLight}',
        opposed: '${colors.danger}',
      };

      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        grid: {
          left: ${tokens.adapt(56, 64, 72)},
          right: ${tokens.adapt(24, 32, 40)},
          top: ${tokens.adapt(16, 24, 28)},
          bottom: ${tokens.adapt(44, 52, 60)},
        },
        xAxis: {
          type: 'value', min: 0.5, max: 5.5,
          name: 'Alignment to Change  →',
          nameLocation: 'center',
          nameGap: ${tokens.adapt(28, 34, 38)},
          nameTextStyle: ${JSON.stringify(figure.axisTitle)},
          axisLine: ${JSON.stringify(chrome.axisLineMuted)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { show: false },
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        yAxis: {
          type: 'value', min: 0.5, max: 5.5,
          name: '↑  Influence',
          nameLocation: 'center',
          nameGap: ${tokens.adapt(36, 42, 48)},
          nameTextStyle: ${JSON.stringify(figure.axisTitle)},
          axisLine: ${JSON.stringify(chrome.axisLineNone)},
          axisTick: ${JSON.stringify(chrome.axisTickNone)},
          axisLabel: { show: false },
          splitLine: ${JSON.stringify(chrome.splitLineNone)},
        },
        // Quadrant backgrounds + labels
        graphic: [
          // Quadrant fills
          { type: 'rect', left: '${tokens.adapt(56, 64, 72)}px', top: '${tokens.adapt(16, 24, 28)}px',
            shape: { width: '50%', height: '50%' },
            style: { fill: 'rgba(164,60,53,0.04)' }, z: -1, silent: true },
          { type: 'rect', right: '${tokens.adapt(24, 32, 40)}px', top: '${tokens.adapt(16, 24, 28)}px',
            shape: { width: '50%', height: '50%' },
            style: { fill: 'rgba(46,158,90,0.04)' }, z: -1, silent: true },
          // Quadrant labels
          { type: 'text', left: '12%', top: '8%',
            style: { text: 'HIGH INFLUENCE\\nMISALIGNED', fontSize: ${tokens.microText}, fontWeight: 700,
              fill: 'rgba(164,60,53,0.35)', fontFamily: 'var(--font-body)', letterSpacing: 1 }, z: 0 },
          { type: 'text', right: '12%', top: '8%',
            style: { text: 'HIGH INFLUENCE\\nALIGNED', fontSize: ${tokens.microText}, fontWeight: 700,
              fill: 'rgba(46,158,90,0.35)', fontFamily: 'var(--font-body)', letterSpacing: 1, textAlign: 'right' }, z: 0 },
          { type: 'text', left: '12%', bottom: '14%',
            style: { text: 'LOW INFLUENCE\\nMISALIGNED', fontSize: ${tokens.microText}, fontWeight: 700,
              fill: 'rgba(139,165,189,0.3)', fontFamily: 'var(--font-body)', letterSpacing: 1 }, z: 0 },
          { type: 'text', right: '12%', bottom: '14%',
            style: { text: 'LOW INFLUENCE\\nALIGNED', fontSize: ${tokens.microText}, fontWeight: 700,
              fill: 'rgba(139,165,189,0.3)', fontFamily: 'var(--font-body)', letterSpacing: 1, textAlign: 'right' }, z: 0 },
          // Midlines
          { type: 'line', shape: { x1: '50%', y1: 0, x2: '50%', y2: '100%' },
            left: '${tokens.adapt(56, 64, 72)}px', top: '${tokens.adapt(16, 24, 28)}px',
            style: { stroke: '${colors.gridLine}', lineWidth: 1, lineDash: [4, 4] }, z: 0 },
          { type: 'line', shape: { x1: 0, y1: '50%', x2: '100%', y2: '50%' },
            left: '${tokens.adapt(56, 64, 72)}px', top: '${tokens.adapt(16, 24, 28)}px',
            style: { stroke: '${colors.gridLine}', lineWidth: 1, lineDash: [4, 4] }, z: 0 },
        ],
        series: [{
          type: 'scatter',
          data: stakeholders.map(function(s) {
            return {
              value: [s[0], s[1]],
              name: s[2],
              stance: s[3],
              strategy: s[4],
              itemStyle: { color: colorMap[s[3]], borderColor: '#fff', borderWidth: 2 },
            };
          }),
          symbolSize: ${tokens.adapt(14, 18, 22)},
          z: 5,
          label: {
            show: true,
            position: 'right',
            fontSize: ${labelSize},
            fontWeight: 'bold',
            fontFamily: 'var(--font-body)',
            color: '${colors.textStrong}',
            formatter: function(p) { return p.data.name; },
            distance: 8,
          },
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
