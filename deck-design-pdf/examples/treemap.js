const { STANDARD_COLORS, defineExample, getFigureTypography } = require('./_shared');

module.exports = defineExample({
  id: 'treemap',
  title: 'Treemap',
  tier: 4,
  proves: 'hierarchical area breakdown with two-level grouping',
  data: 'Operating expense by category and sub-category',
  sectionLabel: 'Cost Structure',
  actionTitle: 'Personnel costs represent 52% of total opex with engineering as the largest single category',
  source: 'Source: FY2025 operating expense breakdown, $M',
  exhibitId: 'Exhibit T4.7',
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
    rationale: 'treemap labels need area to remain legible; small blocks collapse to value only',
  },
  renderExhibit({ tokens }) {
    const chartId = 'treemap-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const treeGroupSize = figure.metaLabelLarge.fontSize + 1;
    const treeItemSize = figure.dataLabelLargeStrong.fontSize + 2;
    const treeValueSize = figure.annotationLarge.fontSize + 2;
    const treeSmallSize = Math.max(figure.annotation.fontSize + 1, tokens.smallText);
    return `<div class="h-full w-full">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const pal = {
        Personnel: ['#0B2545', '#123A63', '#1A4E7A', '#226492'],
        Infrastructure: ['#124F5A', '#176774', '#1D7F8C', '#2797A5'],
        Software: ['#5E3A83', '#744A9F', '#8660B2', '#9877C3'],
        Marketing: ['#9A4A20', '#B85C2C', '#C86B35', '#D97B3F'],
        Other: ['#425161', '#556577', '#697A8D', '#7D8EA0'],
      };
      const groups = [
        { name: 'Personnel', items: [{ name: 'Engineering', value: 220 }, { name: 'Sales', value: 140 }, { name: 'Operations', value: 90 }, { name: 'G&A', value: 70 }] },
        { name: 'Infrastructure', items: [{ name: 'Cloud', value: 95 }, { name: 'Data Ctrs', value: 50 }, { name: 'Network', value: 35 }] },
        { name: 'Software', items: [{ name: 'Licenses', value: 65 }, { name: 'SaaS', value: 55 }] },
        { name: 'Marketing', items: [{ name: 'Digital', value: 55 }, { name: 'Events', value: 30 }, { name: 'Brand', value: 15 }] },
        { name: 'Other', items: [{ name: 'Travel', value: 35 }, { name: 'Prof Svcs', value: 25 }, { name: 'Facilities', value: 20 }] },
      ];
      const flat = [];
      groups.forEach(g => {
        g.items.forEach((item, idx) => {
          flat.push({
            name: item.name,
            value: item.value,
            group: g.name,
            itemStyle: { color: pal[g.name][idx] || pal[g.name][0], opacity: 1 },
            label: { color: '#FFFFFF', opacity: 1 },
          });
        });
      });
      chart.setOption({
        animation: false,
        tooltip: { show: false },
        series: [{
          type: 'treemap',
          left: 0, right: 0, top: 0, bottom: 0,
          width: '100%', height: '100%',
          roam: false, nodeClick: false,
          breadcrumb: { show: false },
          squareRatio: 0.55,
          label: {
            show: true, fontFamily: 'var(--font-body)', color: '#FFFFFF', opacity: 1, padding: [${tokens.adapt(5, 8, 10)}, ${tokens.adapt(8, 10, 12)}],
            formatter: (p) => {
              const g = p.data.group;
              if (p.value >= 80) return '{bigW|' + g + '}\\n{midW|' + p.name + '}\\n{valW|$' + p.value + 'M}';
              if (p.value >= 30) return '{midW|' + p.name + '}\\n{valW|$' + p.value + 'M}';
              return '{smW|$' + p.value + 'M}';
            },
            rich: {
              bigW: {
                fontSize: ${treeGroupSize},
                fontWeight: 'bold',
                color: '#FFFFFF',
                opacity: 1,
                fontFamily: 'var(--font-body)',
                lineHeight: ${tokens.adapt(18, 20, 22)},
              },
              midW: {
                fontSize: ${treeItemSize},
                fontWeight: 'bold',
                color: '#ffffff',
                opacity: 1,
                fontFamily: 'var(--font-body)',
                lineHeight: ${tokens.adapt(20, 22, 24)},
              },
              valW: {
                fontSize: ${treeValueSize},
                color: '#FFFFFF',
                fontWeight: 'bold',
                opacity: 1,
                fontFamily: 'var(--font-body)',
                lineHeight: ${tokens.adapt(18, 20, 22)},
              },
              smW:  {
                fontSize: ${treeSmallSize},
                color: '#FFFFFF',
                fontWeight: 'bold',
                opacity: 1,
                fontFamily: 'var(--font-body)',
              },
            },
          },
          levels: [{ itemStyle: { borderColor: 'transparent', borderWidth: 0, gapWidth: 0 } }],
          data: flat,
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
