const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'timeline',
  title: 'Timeline / Milestones',
  tier: 3,
  proves: 'key dates and markers on a horizontal axis',
  data: 'Product launch timeline with milestones',
  sectionLabel: 'Launch Plan',
  actionTitle: 'Product launch targets GA release in September with three gates before scale',
  source: 'Source: Product team, March 2026',
  exhibitId: 'Exhibit 17.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Milestone timelines are agent-sized. Reflow to two rows when width is limited; if there are more than six milestones, split the narrative across phases.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const textStyles = getTemplateTextStyles(tokens, colors);
    const milestones = [
      { date: 'Apr 2026', code: 'KO', title: 'Kickoff', note: 'Team formed' },
      { date: 'Jun 2026', code: 'AL', title: 'Alpha', note: 'Internal test' },
      { date: 'Aug 2026', code: 'BT', title: 'Beta', note: '50 design partners' },
      { date: 'Sep 2026', code: 'GA', title: 'GA release', note: 'Press launch', highlight: true },
      { date: 'Nov 2026', code: 'SC', title: 'Scale', note: 'Enterprise rollout' },
      { date: 'Q1 2027', code: 'RV', title: 'Review', note: 'V2 roadmap' },
    ];
    const columns = tokens.choose(3, 6, 6);
    const dotSize = tokens.adapt(28, 34, 40);
    const items = milestones.map((milestone) => {
      const fill = milestone.highlight ? '#123A63' : 'rgba(18,58,99,0.10)';
      const codeColor = milestone.highlight ? '#ffffff' : '#123A63';
      const title = milestone.highlight ? '#123A63' : '#101A27';
      return `<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:${Math.max(tokens.gridGap - 12, 5)}px;">
        <div style="${cssText({ ...textStyles.annotation, fontWeight: milestone.highlight ? 700 : 600, color: milestone.highlight ? colors.accent : colors.textMuted })}">${milestone.date}</div>
        <div style="${cssText({ ...textStyles.annotationStrong, width: `${dotSize}px`, height: `${dotSize}px`, borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: fill, color: codeColor, fontWeight: 700, boxShadow: milestone.highlight ? '0 0 0 6px rgba(18,58,99,0.10)' : 'none' })}">${milestone.code}</div>
        <div>
          <div style="${cssText({ ...textStyles.metricLabel, fontWeight: 700, color: title })}">${milestone.title}</div>
          <div style="${cssText({ ...textStyles.annotation, marginTop: '4px' })}">${milestone.note}</div>
        </div>
      </div>`;
    }).join('');
    return `<div class="h-full w-full" style="display:flex;align-items:center;">
      <div style="position:relative;width:100%;">
        ${columns === 6 ? `<div style="position:absolute;left:0;right:0;top:${Math.round(dotSize / 2) + 24}px;height:3px;background:#D7E4EE;"></div>` : ''}
        <div style="display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:${Math.max(tokens.gridGap - 8, 6)}px;">
          ${items}
        </div>
      </div>
    </div>`;
  },
});
