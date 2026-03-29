// ════════════════════════════════════════════════════════════════════════
// Treemap — hierarchical area breakdown with two-level grouping
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Uses nested data (parent groups → child items) so ECharts keeps
// items within the same group adjacent and separated by group borders.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap groups/items and palette with real data
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// ECharts gotchas captured here so the agent doesn't rediscover them:
//   • Data MUST be nested (children[]) for proper grouping — flat data
//     does NOT keep group items adjacent
//   • levels[0] = group borders/gaps, levels[1] = leaf item styles
//   • CRITICAL: label.opacity must be set to 1 explicitly — ECharts
//     inherits node visual opacity onto label text (defaultOpacity),
//     causing white text to render as translucent gray
//   • squareRatio 0.5–0.6 produces good rectangles for label readability
//   • breadcrumb: { show: false } is required for static output

module.exports = {
  id: 'treemap',
  title: 'Treemap',
  tier: 4,
  proves: 'hierarchical area breakdown with two-level grouping',
  data: 'Operating expense by category and sub-category',
  sectionLabel: 'Cost Structure',
  actionTitle: 'Personnel costs represent 52% of total opex with engineering as the largest single category',
  source: 'Source: FY2025 operating expense breakdown, $M',
  exhibitId: 'Exhibit T4.7',

  renderExhibit({ tokens }) {
    const chartId = 'treemap-core';

    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily = 'sans-serif';

    // Per-group color palettes (darkest to lightest within each group).
    const palettes = {
      Personnel:      ['#0B2545', '#123A63', '#1A4E7A', '#226492'],
      Infrastructure: ['#124F5A', '#176774', '#1D7F8C', '#2797A5'],
      Software:       ['#5E3A83', '#744A9F', '#8660B2', '#9877C3'],
      Marketing:      ['#9A4A20', '#B85C2C', '#C86B35', '#D97B3F'],
      Other:          ['#425161', '#556577', '#697A8D', '#7D8EA0'],
    };

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Nested: each group has children. ECharts keeps children adjacent
    // and draws group boundaries automatically via levels config.
    const groups = [
      { name: 'Personnel', items: [
        { name: 'Engineering', value: 220 },
        { name: 'Sales', value: 140 },
        { name: 'Operations', value: 90 },
        { name: 'G&A', value: 70 },
      ]},
      { name: 'Infrastructure', items: [
        { name: 'Cloud', value: 95 },
        { name: 'Data Ctrs', value: 50 },
        { name: 'Network', value: 35 },
      ]},
      { name: 'Software', items: [
        { name: 'Licenses', value: 65 },
        { name: 'SaaS', value: 55 },
      ]},
      { name: 'Marketing', items: [
        { name: 'Digital', value: 55 },
        { name: 'Events', value: 30 },
        { name: 'Brand', value: 15 },
      ]},
      { name: 'Other', items: [
        { name: 'Travel', value: 35 },
        { name: 'Prof Svcs', value: 25 },
        { name: 'Facilities', value: 20 },
      ]},
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const itemFontRange   = [11, 16];       // [min, max] px for item name
    const valueFontRange  = [10, 15];       // [min, max] px for value label
    const groupFontRange  = [10, 14];       // [min, max] px for group header
    const padRange        = [4, 8];         // [min, max] px label padding
    const lineHeightRange = [16, 22];       // [min, max] px for rich text line height
    const gapRange        = [1, 3];         // [min, max] px gap between groups

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const itemFont    = lerp(itemFontRange);
    const valueFont   = lerp(valueFontRange);
    const groupFont   = lerp(groupFontRange);
    const padV        = lerp(padRange);
    const lineHeight  = lerp(lineHeightRange);
    const gapWidth    = lerp(gapRange);

    // ── Build nested tree data ──────────────────────────────────────────
    const treeData = groups.map(g => {
      const pal = palettes[g.name] || palettes.Other;
      return {
        name: g.name,
        itemStyle: { color: pal[0], borderColor: '#fff', borderWidth: 1 },
        children: g.items.map((item, idx) => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: pal[idx] || pal[pal.length - 1] },
          label: { color: '#FFFFFF' },
        })),
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
          type: 'treemap',
          left: 2, right: 2, top: 2, bottom: 2,
          width: '100%', height: '100%',
          roam: false, nodeClick: false,
          breadcrumb: { show: false },
          squareRatio: 0.55,
          label: {
            show: true,
            fontFamily: '${fontFamily}',
            color: '#FFFFFF',
            opacity: 1,
            padding: [${padV}, ${padV}],
            formatter: (p) => {
              var g = p.treePathInfo && p.treePathInfo.length > 1 ? p.treePathInfo[1].name : '';
              if (p.value >= 80) return '{bigW|' + g + '}\\n{midW|' + p.name + '}\\n{valW|$' + p.value + 'M}';
              if (p.value >= 30) return '{midW|' + p.name + '}\\n{valW|$' + p.value + 'M}';
              return '{smW|$' + p.value + 'M}';
            },
            rich: {
              bigW: { fontSize: ${groupFont}, fontWeight: 'bold', color: '#FFFFFF', opacity: 1, fontFamily: '${fontFamily}', lineHeight: ${lineHeight} },
              midW: { fontSize: ${itemFont}, fontWeight: 'bold', color: '#FFFFFF', opacity: 1, fontFamily: '${fontFamily}', lineHeight: ${lineHeight} },
              valW: { fontSize: ${valueFont}, fontWeight: 'bold', color: '#FFFFFF', opacity: 1, fontFamily: '${fontFamily}', lineHeight: ${lineHeight} },
              smW:  { fontSize: ${valueFont}, fontWeight: 'bold', color: '#FFFFFF', opacity: 1, fontFamily: '${fontFamily}' },
            },
          },
          levels: [
            {
              // Level 0: group boundaries — gap separates groups visually
              itemStyle: { borderColor: '#fff', borderWidth: 0, gapWidth: ${gapWidth} },
              upperLabel: { show: false },
            },
            {
              // Level 1: leaf items — thin border within a group
              itemStyle: { borderColor: 'rgba(255,255,255,0.15)', borderWidth: 1, gapWidth: 0 },
            },
          ],
          data: ${JSON.stringify(treeData)},
        }],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
};
