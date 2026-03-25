const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'before-after',
  title: 'Before / After',
  tier: 3,
  proves: 'impact of intervention across mixed units',
  data: 'Operational metrics before and after process automation',
  sectionLabel: 'Impact Assessment',
  actionTitle: 'Process automation reduced cycle time by 42% and error rate by 68%',
  source: 'Source: Operations dashboard, 90-day post-implementation review',
  exhibitId: 'Exhibit 19.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 900, height: 506 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Keep mixed-unit before/after cards in two or three columns; add or remove cards based on message density instead of forcing a fixed canvas.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);
    const metrics = [
      { name: 'Error rate', before: '12.4%', after: '4.0%', delta: '−68%' },
      { name: 'Manual steps', before: '23', after: '8', delta: '−65%' },
      { name: 'Cycle time', before: '47 days', after: '27 days', delta: '−42%' },
      { name: 'Throughput', before: '340/day', after: '580/day', delta: '+71%' },
      { name: 'Cost per txn', before: '$8.50', after: '$3.20', delta: '−62%' },
    ];
    const columns = tokens.choose(2, 3, 3);
    const cards = metrics.map((metric) => `<div style="padding:${tokens.cardPad}px;border:1px solid #D7E4EE;border-radius:${tokens.exhibitRadius}px;background:#FFFFFF;display:flex;flex-direction:column;gap:${Math.max(tokens.gridGap - 10, 6)}px;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
        <div style="${cssText(text.metricLabel)}">${metric.name}</div>
        <div style="${cssText({ ...text.metaLabel, padding: '4px 8px', borderRadius: `${tokens.badgeRadius}px`, background: 'rgba(18,58,99,0.08)', color: colors.accent })}">${metric.delta}</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:${Math.max(tokens.gridGap - 12, 6)}px;">
        <div>
          <div style="${cssText(text.metaLabel)}">Before</div>
          <div style="${cssText({ ...text.metricValue, marginTop: '4px', fontSize: `${tokens.metricValue - 2}px`, color: colors.textMuted })}">${metric.before}</div>
        </div>
        <div>
          <div style="${cssText(text.metaLabel)}">After</div>
          <div style="${cssText({ ...text.metricValueAccent, marginTop: '4px', fontSize: `${tokens.metricValue - 2}px` })}">${metric.after}</div>
        </div>
      </div>
    </div>`).join('');
    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${tokens.gridGap}px;">
      <div style="display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:${tokens.gridGap}px;">
        ${cards}
      </div>
      <div style="${cssText({ ...text.body, padding: `${tokens.cardPad}px`, borderLeft: '4px solid var(--accent)', background: 'rgba(18,58,99,0.05)', borderRadius: `0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0` })}">
        Automation improved all five tracked metrics simultaneously, increasing throughput while reducing cost to serve.
      </div>
    </div>`;
  },
});
