const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'rag-status',
  title: 'RAG Status Matrix',
  tier: 3,
  proves: 'what is on track versus at risk across initiatives',
  data: 'Transformation initiative status tracker',
  sectionLabel: 'Initiative Tracker',
  actionTitle: 'Two of eight initiatives require immediate intervention to stay on track',
  source: 'Source: PMO weekly report, March 2026',
  exhibitId: 'Exhibit 15.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'review', width: 1180, height: 664 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Status matrices are agent-sized. Below the review sample, reduce columns or split key issue commentary into a second panel instead of shrinking the grid.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);
    const initiatives = [
      { name: 'Platform migration', status: 'Strong', timeline: 'Strong', budget: 'Strong', quality: 'Strong', issue: 'On track' },
      { name: 'Data lake build', status: 'Strong', timeline: 'Watch', budget: 'Strong', quality: 'Strong', issue: '2-week delay on schema design' },
      { name: 'CRM integration', status: 'Risk', timeline: 'Risk', budget: 'Watch', quality: 'Risk', issue: 'Vendor API instability; escalated' },
      { name: 'Process redesign', status: 'Strong', timeline: 'Strong', budget: 'Strong', quality: 'Watch', issue: 'Awaiting stakeholder sign-off' },
      { name: 'Training program', status: 'Strong', timeline: 'Strong', budget: 'Strong', quality: 'Strong', issue: 'Pilot cohort complete' },
      { name: 'Org restructure', status: 'Watch', timeline: 'Watch', budget: 'Strong', quality: 'Watch', issue: 'Union consultation ongoing' },
      { name: 'Compliance update', status: 'Risk', timeline: 'Risk', budget: 'Risk', quality: 'Watch', issue: 'Regulatory scope change; re-scoping' },
      { name: 'Change management', status: 'Strong', timeline: 'Strong', budget: 'Strong', quality: 'Strong', issue: 'On track' },
    ];
    const tone = {
      Strong: { bg: colors.surfaceMuted, text: colors.textMuted },
      Watch: { bg: 'rgba(18,58,99,0.08)', text: colors.accent },
      Risk: { bg: 'rgba(196,75,67,0.12)', text: '#A43C35' },
    };
    const cell = (value) => `<span style="${cssText({ ...text.annotationStrong, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '4px 0', borderRadius: `${tokens.badgeRadius}px`, background: tone[value].bg, color: tone[value].text, fontWeight: 700 })}">${value}</span>`;
    const rows = initiatives.map((initiative) => {
      const flagged = initiative.status === 'Risk' || initiative.timeline === 'Risk' || initiative.budget === 'Risk' || initiative.quality === 'Risk';
      return `<tr style="border-bottom:1px solid rgba(199,213,229,0.45);background:${flagged ? 'rgba(196,75,67,0.04)' : '#ffffff'};">
        <td style="${cssText({ ...text.body, padding: `${tokens.tableCellPadY}px ${tokens.tableCellPadX}px`, textAlign: 'left', color: flagged ? '#A43C35' : colors.textStrong, fontWeight: flagged ? 600 : 500 })}">${initiative.name}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;">${cell(initiative.status)}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;">${cell(initiative.timeline)}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;">${cell(initiative.budget)}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;">${cell(initiative.quality)}</td>
        <td style="${cssText({ ...text.annotation, padding: `${tokens.tableCellPadY}px ${tokens.tableCellPadX}px`, textAlign: 'left', color: flagged ? '#A43C35' : colors.textMuted })}">${initiative.issue}</td>
      </tr>`;
    }).join('');
    return `<div class="h-full w-full" style="overflow:hidden;border:1px solid #D7E4EE;border-radius:${tokens.exhibitRadius}px;">
      <table style="${cssText({ ...text.table, width: '100%', height: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' })}">
        <colgroup>
          <col style="width:23%;">
          <col style="width:12%;">
          <col style="width:12%;">
          <col style="width:12%;">
          <col style="width:12%;">
          <col style="width:29%;">
        </colgroup>
        <thead>
          <tr style="border-bottom:2px solid var(--accent);background:#F8FBFD;">
            <th style="${cssText({ ...text.tableHeader, padding: `${tokens.tableCellPadY}px ${tokens.tableCellPadX}px`, textAlign: 'left' })}">Initiative</th>
            <th style="${cssText({ ...text.tableHeader, padding: `${tokens.tableCellPadY}px ${tokens.tableCellPadX}px`, textAlign: 'center' })}">Status</th>
            <th style="${cssText({ ...text.tableHeader, padding: `${tokens.tableCellPadY}px ${tokens.tableCellPadX}px`, textAlign: 'center' })}">Timeline</th>
            <th style="${cssText({ ...text.tableHeader, padding: `${tokens.tableCellPadY}px ${tokens.tableCellPadX}px`, textAlign: 'center' })}">Budget</th>
            <th style="${cssText({ ...text.tableHeader, padding: `${tokens.tableCellPadY}px ${tokens.tableCellPadX}px`, textAlign: 'center' })}">Quality</th>
            <th style="${cssText({ ...text.tableHeader, padding: `${tokens.tableCellPadY}px ${tokens.tableCellPadX}px`, textAlign: 'left' })}">Key issue</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
  },
});
