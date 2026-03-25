const { STANDARD_COLORS, cssText, defineExample, getChartChrome, getFigureTypography, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'donut',
  title: 'Donut Chart',
  tier: 2,
  proves: 'dominant share across two related distributions',
  data: 'Revenue share and customer-count share by segment',
  sectionLabel: 'Customer Mix',
  actionTitle: 'Enterprise accounts represent 58% of revenue despite being only 12% of customer count',
  source: 'Source: CRM data, FY2025',
  exhibitId: 'Exhibit 9.1',
  responsiveSpec: {
    templateClass: 'chart',
    exhibitRange: {
      min: { width: 840, height: 472 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    slideRange: {
      min: { width: 920, height: 518 },
      preferred: { width: 1280, height: 720 },
      max: { width: 1600, height: 900 },
    },
    rationale: 'dual-donut comparisons need more room for inside labels, category labels, and takeaway cards once presentation text floors are enforced',
  },
  renderExhibit({ tokens }) {
    const chartId = 'donut-comparison-core';
    const colors = STANDARD_COLORS;
    const figure = getFigureTypography(tokens, colors);
    const chrome = getChartChrome(tokens, colors, figure);
    const text = getTemplateTextStyles(tokens, colors);
    const cardColumns = tokens.choose(1, 2, 2);
    const donutRadius = tokens.compact ? ['34%', '58%'] : ['30%', '48%'];
    const donutCenterY = tokens.compact ? '46%' : '50%';
    const chartGap = Math.max(tokens.gridGap - 4, 8);
    const legendItems = [
      { color: '#123A63', label: 'Enterprise' },
      { color: '#2E7D9B', label: 'Mid-Market' },
      { color: '#8BA5BD', label: 'SMB' },
      { color: '#D6E3EE', label: 'Self-Serve' },
    ].map((item) => `
      <div style="display:flex;align-items:center;gap:${tokens.adapt(6, 8, 10)}px;">
        <span style="width:${tokens.adapt(10, 12, 12)}px;height:${tokens.adapt(10, 12, 12)}px;background:${item.color};display:inline-block;border-radius:2px;"></span>
        <span style="${cssText(text.annotation)}">${item.label}</span>
      </div>
    `).join('');
    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto auto;gap:${chartGap}px;">
      <div id="${chartId}" style="width:100%;height:100%;"></div>
      <div style="display:flex;justify-content:center;gap:${tokens.adapt(12, 20, 24)}px;flex-wrap:wrap;">
        ${legendItems}
      </div>
      <div style="display:grid;grid-template-columns:repeat(${cardColumns},minmax(0,1fr));gap:${tokens.gridGap}px;">
        <div style="padding:${tokens.cardPad}px;border:1px solid #D7E4EE;border-radius:${tokens.exhibitRadius}px;background:rgba(18,58,99,0.04);">
          <div style="${cssText({ ...text.metricValueAccent })}">58%</div>
          <div style="${cssText({ ...text.metricLabel, marginTop: '4px' })}">Enterprise revenue share</div>
          <div style="${cssText({ ...text.annotation, marginTop: '6px' })}">$2.4B revenue across 340 accounts</div>
        </div>
        <div style="padding:${tokens.cardPad}px;border:1px solid #D7E4EE;border-radius:${tokens.exhibitRadius}px;background:#F7FAFC;">
          <div style="${cssText({ ...text.metricValue })}">12%</div>
          <div style="${cssText({ ...text.metricLabel, marginTop: '4px' })}">Enterprise customer share</div>
          <div style="${cssText({ ...text.annotation, marginTop: '6px' })}">Self-serve and SMB contribute volume, not economics</div>
        </div>
      </div>
    </div>
    <script>
    (() => {
      const mount = document.getElementById('${chartId}');
      if (!mount) return;
      const chart = echarts.init(mount, null, { renderer: 'svg' });
      const colors = ['#123A63', '#2E7D9B', '#8BA5BD', '#D6E3EE'];
      chart.setOption({
        animation: false,
        tooltip: ${JSON.stringify(chrome.tooltipHidden)},
        series: [
          {
            type: 'pie',
            name: 'Revenue share',
            radius: ${JSON.stringify(donutRadius)},
            center: ['28%', ${JSON.stringify(donutCenterY)}],
            avoidLabelOverlap: false,
            labelLine: { show: false },
            label: { show: true, position: 'inside', ...${JSON.stringify({ ...figure.dataLabelStrong, color: '#fff' })}, formatter: '{d}%' },
            data: [
              { value: 58, name: 'Enterprise', itemStyle: { color: colors[0] } },
              { value: 26, name: 'Mid-Market', itemStyle: { color: colors[1] } },
              { value: 12, name: 'SMB', itemStyle: { color: colors[2] } },
              { value: 4, name: 'Self-Serve', itemStyle: { color: colors[3] } },
            ],
          },
          {
            type: 'pie',
            name: 'Customer share',
            radius: ${JSON.stringify(donutRadius)},
            center: ['72%', ${JSON.stringify(donutCenterY)}],
            avoidLabelOverlap: false,
            labelLine: { show: false },
            label: { show: true, position: 'inside', ...${JSON.stringify({ ...figure.dataLabelStrong, color: '#fff' })}, formatter: '{d}%' },
            data: [
              { value: 12, name: 'Enterprise', itemStyle: { color: colors[0] } },
              { value: 24, name: 'Mid-Market', itemStyle: { color: colors[1] } },
              { value: 28, name: 'SMB', itemStyle: { color: colors[2] } },
              { value: 36, name: 'Self-Serve', itemStyle: { color: colors[3] } },
            ],
          },
        ],
        graphic: [
          {
            type: 'text',
            left: '28%',
            top: '14%',
            style: { ...${JSON.stringify({ ...figure.annotationStrongLarge, color: colors.textStrong })}, text: 'Revenue share', fill: '${STANDARD_COLORS.textStrong}', textAlign: 'center' },
          },
          {
            type: 'text',
            left: '72%',
            top: '14%',
            style: { ...${JSON.stringify({ ...figure.annotationStrongLarge, color: colors.textStrong })}, text: 'Customer count', fill: '${STANDARD_COLORS.textStrong}', textAlign: 'center' },
          },
        ],
      });
      window.addEventListener('resize', () => chart.resize());
    })();
    </script>`;
  },
});
