const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'process-flow',
  title: 'Process Flow',
  tier: 3,
  proves: 'how work moves through stages',
  data: 'Customer onboarding process with stage cycle times',
  sectionLabel: 'Process Analysis',
  actionTitle: 'Customer onboarding takes 47 days end-to-end with the bottleneck at compliance review',
  source: 'Source: Process mining analysis, Jan–Mar 2026 (n=2,400 cases)',
  exhibitId: 'Exhibit 16.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Process flows are agent-sized. Reflow to two rows when the available width is limited; if the process has more than six stages, split the exhibit instead of compressing labels.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);
    const steps = [
      { code: '01', title: 'Application', note: 'Submit docs', days: '3 days' },
      { code: '02', title: 'KYC review', note: 'Identity & risk', days: '5 days' },
      { code: '03', title: 'Compliance', note: 'Regulatory check', days: '18 days', tone: 'alert' },
      { code: '04', title: 'Account setup', note: 'Systems config', days: '7 days' },
      { code: '05', title: 'Training', note: 'User enablement', days: '8 days' },
      { code: '06', title: 'Go live', note: 'Active customer', days: '6 days', tone: 'positive' },
    ];
    const columns = tokens.choose(3, 6, 6);
    const laneTop = tokens.adapt(28, 32, 36);
    const cards = steps.map((step) => {
      const border = step.tone === 'alert' ? '#D4574C' : step.tone === 'positive' ? '#7DC8AD' : '#D7E4EE';
      const background = step.tone === 'alert' ? '#FBF1F0' : step.tone === 'positive' ? '#EAF7F1' : '#FFFFFF';
      const title = step.tone === 'alert' ? '#A43C35' : step.tone === 'positive' ? '#1E6C53' : '#101A27';
      const noteColor = step.tone === 'alert' ? '#C46259' : step.tone === 'positive' ? '#5B8B78' : colors.textMuted;
      const metaColor = step.tone === 'alert' ? '#A43C35' : '#7A8EA5';
      return `<div style="position:relative;display:flex;flex-direction:column;justify-content:space-between;min-height:${tokens.adapt(140, 162, 176)}px;padding:${tokens.cardPad}px;border:1px solid ${border};border-radius:${tokens.exhibitRadius}px;background:${background};">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <div style="${cssText({ ...text.annotationStrong, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: `${tokens.iconSize + 12}px`, height: `${tokens.iconSize + 12}px`, borderRadius: '999px', background: step.tone === 'alert' ? 'rgba(212,87,76,0.12)' : step.tone === 'positive' ? 'rgba(30,108,83,0.10)' : 'rgba(18,58,99,0.08)', color: title, fontWeight: 700 })}">${step.code}</div>
          <div style="${cssText({ ...text.annotationStrong, color: title, fontWeight: 700 })}">${step.days}</div>
        </div>
        <div>
          <div style="${cssText({ ...text.metricLabel, color: title })}">${step.title}</div>
          <div style="${cssText({ ...text.annotation, marginTop: '6px', color: noteColor })}">${step.note}</div>
        </div>
        <div style="${cssText({ ...text.metaLabel, color: metaColor })}">${step.tone === 'alert' ? 'Bottleneck' : 'Avg cycle'}</div>
      </div>`;
    }).join('');
    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${tokens.gridGap}px;">
      <div style="position:relative;display:grid;grid-template-columns:repeat(${columns},minmax(0,1fr));gap:${Math.max(tokens.gridGap - 8, 6)}px;align-items:stretch;">
        ${columns === 6 ? `<div style="position:absolute;left:0;right:0;top:${laneTop}px;height:2px;background:#D7E4EE;"></div>` : ''}
        ${cards}
      </div>
      <div style="${cssText({ ...text.body, padding: `${tokens.cardPad}px`, borderLeft: '4px solid var(--accent)', background: 'rgba(18,58,99,0.05)', borderRadius: `0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0` })}">
        Automating compliance pre-screening could cut the bottleneck from 18 to 7 days, reducing total cycle time by 23%.
      </div>
    </div>`;
  },
});
