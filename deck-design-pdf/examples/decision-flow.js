const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'decision-flow',
  title: 'Decision Flow / Approval Path',
  tier: 3,
  proves: 'approval-path bottleneck identification with cycle-time attribution',
  data: 'Capital expenditure approval flow across 6 stages with cycle times',
  sectionLabel: 'Process Optimization',
  actionTitle: 'CapEx approvals take 34 days on average — 60% of elapsed time is in two sequential review gates',
  source: 'Source: Process audit, CapEx approvals (n=86 requests, FY2025)',
  exhibitId: 'Exhibit 16.2',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Decision flows are horizontal. At compact widths, show 4-5 stages max or use a two-row layout.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const stages = [
      { label: 'Request', owner: 'Business unit', days: 2, approval: '95%', tone: 'normal' },
      { label: 'Finance Review', owner: 'FP&A team', days: 5, approval: '82%', tone: 'normal' },
      { label: 'VP Approval', owner: 'BU VP', days: 3, approval: '90%', tone: 'normal' },
      { label: 'Legal Review', owner: 'Legal counsel', days: 8, approval: '78%', tone: 'alert' },
      { label: 'CFO Sign-off', owner: 'CFO office', days: 12, approval: '65%', tone: 'alert' },
      { label: 'Board Ratification', owner: 'Board committee', days: 4, approval: '98%', tone: 'normal' },
    ];

    const totalDays = stages.reduce((a, s) => a + s.days, 0);
    const cardW = tokens.adapt(130, 160, 180);
    const arrowW = tokens.adapt(20, 28, 32);
    const barMaxH = tokens.adapt(60, 80, 90);

    const stageCards = stages.map((s, i) => {
      const isAlert = s.tone === 'alert';
      const barH = Math.max((s.days / 12) * barMaxH, 16);
      const pctOfTotal = Math.round((s.days / totalDays) * 100);
      const borderColor = isAlert ? colors.danger : colors.accentAlt;
      const bg = isAlert ? '#FFF5F5' : '#fff';

      const arrow = i < stages.length - 1 ? `<div style="display:flex;align-items:center;justify-content:center;width:${arrowW}px;flex-shrink:0;">
        <div style="width:${arrowW - 8}px;height:2px;background:${colors.borderSoft};position:relative;">
          <div style="position:absolute;right:-4px;top:-4px;width:0;height:0;border-left:6px solid ${colors.borderSoft};border-top:5px solid transparent;border-bottom:5px solid transparent;"></div>
        </div>
      </div>` : '';

      return `<div style="display:flex;align-items:center;">
        <div style="width:${cardW}px;padding:${tokens.cardPad}px;background:${bg};border:1.5px solid ${isAlert ? '#FECDD3' : colors.borderSoft};border-top:4px solid ${borderColor};border-radius:${tokens.exhibitRadius}px;display:flex;flex-direction:column;gap:${tokens.adapt(6, 8, 10)}px;">
          <div>
            <div style="${cssText(text.metricLabel)};color:${isAlert ? colors.danger : colors.textStrong};">${s.label}</div>
            <div style="font-size:${tokens.microText}px;color:${colors.textLight};margin-top:2px;">${s.owner}</div>
          </div>
          <div style="display:flex;align-items:flex-end;gap:${tokens.adapt(6, 8, 10)}px;">
            <div style="width:${tokens.adapt(24, 32, 36)}px;height:${barH}px;background:${isAlert ? colors.danger : colors.accentAlt};border-radius:3px 3px 0 0;opacity:0.8;"></div>
            <div>
              <div style="font-size:${tokens.adapt(16, 20, 24)}px;font-weight:700;color:${isAlert ? colors.danger : colors.textStrong};">${s.days}d</div>
              <div style="font-size:${tokens.microText}px;color:${colors.textLight};">${pctOfTotal}% of total</div>
            </div>
          </div>
          <div style="font-size:${tokens.microText}px;color:${colors.textMuted};">Pass rate: <span style="font-weight:700;color:${s.approval < '80%' ? colors.danger : colors.textStrong};">${s.approval}</span></div>
        </div>
        ${arrow}
      </div>`;
    }).join('');

    const alertDays = stages.filter(s => s.tone === 'alert').reduce((a, s) => a + s.days, 0);
    const alertPct = Math.round((alertDays / totalDays) * 100);

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${tokens.adapt(8, 12, 14)}px;">
      <div style="display:flex;align-items:center;justify-content:center;gap:0;overflow-x:auto;">
        ${stageCards}
      </div>
      <div style="padding:${tokens.cardPad}px ${tokens.adapt(12, 16, 18)}px;background:#FFF5F5;border-left:4px solid ${colors.danger};border-radius:0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0;">
        <span style="${cssText(text.body)}"><span style="font-weight:700;color:${colors.danger};">Bottleneck:</span> Legal Review + CFO Sign-off account for ${alertDays} of ${totalDays} days (${alertPct}%). Recommendation: pre-clear Legal in parallel with Finance Review, implement delegated authority for CapEx &lt;$2M.</span>
      </div>
    </div>`;
  },
});
