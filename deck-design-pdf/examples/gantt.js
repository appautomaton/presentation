const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'gantt',
  title: 'Gantt / Roadmap',
  tier: 3,
  proves: 'what happens when, with dependencies',
  data: 'Transformation workplan across four workstreams over 12 months',
  sectionLabel: 'Implementation Roadmap',
  actionTitle: 'Full transformation delivery is sequenced across four workstreams over 12 months',
  source: 'Source: Transformation Office, March 2026',
  exhibitId: 'Exhibit 14.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'review', width: 1180, height: 664 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1600, height: 900 },
    ],
    agentSizingNotes: 'Roadmaps are agent-sized. If the available width is below the review sample, shorten the horizon, reduce labels, or split the roadmap instead of compressing month lanes.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);
    const labelWidth = tokens.adapt(88, 104, 132);
    const months = Array.from({ length: 12 }, (_, index) => `M${index + 1}`);
    const phases = [
      { label: 'Foundation', start: 1, span: 3 },
      { label: 'Build', start: 4, span: 5 },
      { label: 'Scale', start: 9, span: 4 },
    ];
    const workstreams = [
      {
        label: 'Technology',
        tasks: [
          { label: 'Migration', start: 1, span: 4, bg: '#123A63', color: '#ffffff' },
          { label: 'Integration', start: 5, span: 4, bg: 'rgba(18,58,99,0.78)', color: '#ffffff' },
          { label: 'Optimize', start: 9, span: 4, bg: 'rgba(18,58,99,0.16)', color: '#123A63' },
        ],
      },
      {
        label: 'Process',
        tasks: [
          { label: 'Mapping', start: 1, span: 3, bg: '#2E7D9B', color: '#ffffff' },
          { label: 'Pilot', start: 4, span: 5, bg: 'rgba(46,125,155,0.78)', color: '#ffffff' },
          { label: 'Rollout', start: 9, span: 4, bg: 'rgba(46,125,155,0.18)', color: '#123A63' },
        ],
      },
      {
        label: 'People',
        tasks: [
          { label: 'Assess', start: 1, span: 2, bg: '#8BA5BD', color: '#ffffff' },
          { label: 'Training', start: 3, span: 6, bg: 'rgba(139,165,189,0.82)', color: '#ffffff' },
          { label: 'Embed', start: 9, span: 4, bg: 'rgba(139,165,189,0.22)', color: '#123A63' },
        ],
      },
      {
        label: 'Governance',
        tasks: [
          { label: 'PMO & steering cadence', start: 1, span: 12, bg: '#F6F8FA', color: '#4E6176', border: '1px solid #D7E4EE' },
        ],
      },
    ];
    const monthCells = months.map((month) => `<div style="${cssText({ ...text.metaLabel, padding: `${Math.max(tokens.tableCellPadY - 4, 4)}px 0`, textAlign: 'center', borderBottom: '1px solid rgba(199,213,229,0.45)', textTransform: 'none', letterSpacing: '0.08em', fontWeight: 600, color: colors.textMuted })}">${month}</div>`).join('');
    const phaseCells = phases.map((phase) => `<div style="${cssText({ ...text.metaLabel, gridColumn: `${phase.start} / span ${phase.span}`, padding: `${Math.max(tokens.tableCellPadY - 6, 4)}px 0`, textAlign: 'center', borderRadius: `${tokens.badgeRadius}px ${tokens.badgeRadius}px 0 0`, background: 'rgba(18,58,99,0.06)', textTransform: 'none', color: colors.accent })}">${phase.label}</div>`).join('');
    const rows = workstreams.map((stream) => {
      const cells = months.map(() => `<div style="grid-row:1;min-height:${tokens.adapt(34, 38, 42)}px;border-bottom:1px solid rgba(199,213,229,0.28);border-left:1px solid rgba(199,213,229,0.20);"></div>`).join('');
      const tasks = stream.tasks.map((task) => `<div style="grid-row:1;grid-column:${task.start} / span ${task.span};align-self:center;margin:0 2px;padding:0 6px;height:${tokens.adapt(22, 26, 30)}px;border-radius:${tokens.badgeRadius}px;display:flex;align-items:center;justify-content:center;background:${task.bg};color:${task.color};font-size:${tokens.microText}px;font-weight:700;font-family:var(--font-body);${task.border ? `border:${task.border};` : ''}">${task.label}</div>`).join('');
      return `<div style="display:contents;">
        <div style="${cssText({ ...text.metricLabel, paddingRight: `${Math.max(tokens.gridGap - 8, 4)}px`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' })}">${stream.label}</div>
        <div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));position:relative;">
          ${cells}
          ${tasks}
        </div>
      </div>`;
    }).join('');
    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${Math.max(tokens.gridGap - 4, 8)}px;font-family:var(--font-body);">
      <div style="display:grid;grid-template-columns:${labelWidth}px 1fr;row-gap:${Math.max(tokens.gridGap - 10, 6)}px;align-items:center;">
        <div></div>
        <div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));">${monthCells}</div>
        <div></div>
        <div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:2px;">${phaseCells}</div>
        ${rows}
      </div>
      <div style="${cssText({ ...text.annotation, display: 'flex', flexWrap: 'wrap', gap: `${Math.max(tokens.gridGap - 8, 6)}px` })}">
        <span style="${cssText({ ...text.annotation, padding: '6px 10px', borderRadius: `${tokens.badgeRadius}px`, background: colors.surfaceMuted })}">M3: Foundation complete</span>
        <span style="${cssText({ ...text.annotation, padding: '6px 10px', borderRadius: `${tokens.badgeRadius}px`, background: colors.surfaceMuted })}">M8: Pilot results validated</span>
        <span style="${cssText({ ...text.annotation, padding: '6px 10px', borderRadius: `${tokens.badgeRadius}px`, background: colors.surfaceMuted })}">M12: Full operational handover</span>
      </div>
    </div>`;
  },
});
