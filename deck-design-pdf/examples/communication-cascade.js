const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'communication-cascade',
  title: 'Communication Cascade',
  tier: 3,
  proves: 'who hears what, when, from whom — sequenced stakeholder messaging plan',
  data: 'Change communication plan across 5 audience tiers over 4 weeks',
  sectionLabel: 'Change Management',
  actionTitle: 'Communication must cascade from ExCo to frontline in 4 weeks — each tier hears from the tier above, not from corporate',
  source: 'Source: Change management office, communication plan v2',
  exhibitId: 'Exhibit 14.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Communication cascades need horizontal space for timing columns and vertical space for audience tiers. Reduce to 3 tiers at compact heights.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const tiers = [
      { audience: 'ExCo / Board', from: 'CEO', color: '#0B2545',
        msgs: [{ week: 0, label: 'Strategic rationale & decision brief', format: 'In-person' }] },
      { audience: 'SVP / VP', from: 'ExCo sponsors', color: colors.accent,
        msgs: [{ week: 0, label: 'Detailed plan & FAQ prep', format: 'Workshop' }, { week: 1, label: 'Q&A debrief', format: 'Virtual' }] },
      { audience: 'Directors', from: 'SVP / VP', color: colors.accentAlt,
        msgs: [{ week: 1, label: 'Team impact & role changes', format: 'In-person' }, { week: 2, label: 'Manager toolkit rollout', format: 'Email + deck' }] },
      { audience: 'Managers', from: 'Directors', color: colors.accentSoft,
        msgs: [{ week: 2, label: 'Frontline talking points', format: 'Team meeting' }, { week: 3, label: 'Feedback collection', format: 'Survey' }] },
      { audience: 'Frontline Staff', from: 'Managers', color: colors.textLight,
        msgs: [{ week: 3, label: 'What changes & what doesn\'t', format: 'Town hall + FAQ' }] },
    ];

    const colW = tokens.adapt(80, 100, 110);
    const cellPad = tokens.adapt(4, 6, 8);
    const cardPad = tokens.adapt(6, 8, 10);

    const headerRow = weeks.map(w =>
      `<div style="padding:${cellPad}px;text-align:center;${cssText(text.metricLabel)};">${w}</div>`
    ).join('');

    const tierRows = tiers.map(tier => {
      const cells = weeks.map((_, wi) => {
        const msg = tier.msgs.find(m => m.week === wi);
        if (!msg) return `<div style="padding:${cellPad}px;border-left:1px solid rgba(199,213,229,0.3);min-height:${tokens.adapt(48, 60, 68)}px;"></div>`;
        return `<div style="padding:${cellPad}px;border-left:1px solid rgba(199,213,229,0.3);display:flex;align-items:center;justify-content:center;">
          <div style="width:100%;padding:${cardPad}px;background:#fff;border:1px solid ${colors.borderSoft};border-left:3px solid ${tier.color};border-radius:${tokens.adapt(4, 6, 7)}px;">
            <div style="${cssText(text.annotation)};font-weight:600;color:${colors.textStrong};">${msg.label}</div>
            <div style="font-size:${tokens.microText}px;color:${colors.textLight};margin-top:3px;"><i class="fa-solid fa-bullhorn" style="margin-right:4px;"></i>${msg.format}</div>
          </div>
        </div>`;
      }).join('');

      return `<div style="display:grid;grid-template-columns:${colW}px ${colW - 10}px repeat(4,1fr);border-bottom:1px solid rgba(199,213,229,0.3);align-items:center;">
        <div style="padding:${cellPad}px;">
          <div style="${cssText(text.annotation)};font-weight:700;color:${tier.color};">${tier.audience}</div>
        </div>
        <div style="padding:${cellPad}px;">
          <div style="font-size:${tokens.microText}px;color:${colors.textLight};">← ${tier.from}</div>
        </div>
        ${cells}
      </div>`;
    }).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:0;font-family:var(--font-body);">
      <div style="display:grid;grid-template-columns:${colW}px ${colW - 10}px repeat(4,1fr);border-bottom:2px solid ${colors.accent};">
        <div style="padding:${cellPad}px;${cssText(text.metaLabel)};color:${colors.textLight};">Audience</div>
        <div style="padding:${cellPad}px;${cssText(text.metaLabel)};color:${colors.textLight};">From</div>
        ${headerRow}
      </div>
      <div style="display:flex;flex-direction:column;">
        ${tierRows}
      </div>
      <div style="margin-top:auto;padding:${tokens.adapt(8, 10, 12)}px ${tokens.adapt(10, 12, 14)}px;background:rgba(18,58,99,0.05);border-left:4px solid ${colors.accent};border-radius:0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0;">
        <span style="${cssText(text.annotation)}"><span style="font-weight:700;color:${colors.accent};">Principle:</span> Each tier hears from their direct leadership — never skip levels. Corporate email follows, not leads. Feedback loops close within 48 hours.</span>
      </div>
    </div>`;
  },
});
