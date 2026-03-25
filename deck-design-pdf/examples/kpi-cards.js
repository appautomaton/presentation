const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'kpi-cards',
  title: 'KPI Cards',
  tier: 1,
  proves: 'headline metrics at a glance',
  data: 'Q4 2025 operating metrics dashboard',
  sectionLabel: 'Q4 2025 Scorecard',
  actionTitle: 'All operating metrics are trending positive except customer acquisition cost',
  source: 'Source: Finance & RevOps, Q4 2025 close',
  exhibitId: 'Exhibit 5.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 900, height: 506 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'KPI cards are agent-sized. Move between two and three columns based on width, and trim the metric set rather than shrinking type below the compact sample.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);
    const cards = [
      { tag: 'REV', value: '$4.2B', label: 'Annual revenue', delta: '+12% YoY', tone: 'accent' },
      { tag: 'MARGIN', value: '23.4%', label: 'EBITDA margin', delta: '+180bps YoY', tone: 'accent' },
      { tag: 'NRR', value: '118%', label: 'Net revenue retention', delta: '+3pp YoY', tone: 'accent' },
      { tag: 'ENT', value: '2,847', label: 'Enterprise customers', delta: '+340 net new', tone: 'accent' },
      { tag: 'CAC', value: '$48K', label: 'Customer acquisition cost', delta: '+22% YoY', tone: 'alert' },
      { tag: 'LTV', value: '5.2x', label: 'LTV:CAC ratio', delta: 'Above 3x target', tone: 'accent' },
    ];
    const columns = tokens.choose(2, 3, 3);
    const cardsHtml = cards.map((card) => {
      const chipBg = card.tone === 'alert' ? 'rgba(196,75,67,0.10)' : 'rgba(18,58,99,0.08)';
      const chipText = card.tone === 'alert' ? '#A43C35' : '#123A63';
      const deltaText = card.tone === 'alert' ? '#A43C35' : '#123A63';
      return `<div style="padding:${tokens.cardPad}px;border:1px solid #D7E4EE;border-radius:${tokens.exhibitRadius}px;background:#FFFFFF;display:flex;flex-direction:column;gap:${Math.max(tokens.gridGap - 10, 6)}px;">
        <div style="${cssText({ ...text.metaLabel, display: 'inline-flex', alignItems: 'center', width: 'max-content', padding: '4px 8px', borderRadius: `${tokens.badgeRadius}px`, background: chipBg, color: chipText })}">${card.tag}</div>
        <div style="${cssText({ ...text.metricValue, letterSpacing: '-0.03em' })}">${card.value}</div>
        <div style="${cssText(text.metricLabel)}">${card.label}</div>
        <div style="${cssText({ ...text.annotationStrong, marginTop: 'auto', color: deltaText })}">${card.delta}</div>
      </div>`;
    }).join('');
    return `<div class="h-full w-full" style="display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:${tokens.gridGap}px;">
      ${cardsHtml}
    </div>`;
  },
});
