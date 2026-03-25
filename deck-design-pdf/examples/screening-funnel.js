const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'screening-funnel',
  title: 'Screening Funnel',
  tier: 3,
  proves: 'systematic elimination logic — why options were cut at each filter stage',
  data: 'Acquisition target screening from 47 candidates to 3 finalists',
  sectionLabel: 'Target Screening',
  actionTitle: 'Of 47 candidates evaluated, 3 survive all four screens — strategic fit and deal readiness are the binding constraints',
  source: 'Source: Target universe analysis, M&A team (March 2026)',
  exhibitId: 'Exhibit 12.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Screening funnels are vertically oriented. At compact heights, reduce to 3 stages or abbreviate elimination rationale.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const stages = [
      { label: 'Initial Universe', count: 47, pct: '100%', width: '100%', filter: null, eliminated: null },
      { label: 'Revenue ≥$50M', count: 28, pct: '60%', width: '75%', filter: 'Size filter', eliminated: '19 below revenue threshold' },
      { label: 'Strategic Fit', count: 12, pct: '26%', width: '52%', filter: 'Capability overlap', eliminated: '16 lack core technology or market position' },
      { label: 'Financial Health', count: 6, pct: '13%', width: '36%', filter: 'Balance sheet screen', eliminated: '6 excessive leverage or declining margins' },
      { label: 'Deal Readiness', count: 3, pct: '6%', width: '24%', filter: 'Willingness & timing', eliminated: '3 not for sale or in competing processes' },
    ];

    const barH = tokens.adapt(42, 50, 56);
    const gap = tokens.adapt(8, 10, 12);
    const cardGap = tokens.adapt(10, 14, 18);

    const rows = stages.map((s, i) => {
      const isFirst = i === 0;
      const isLast = i === stages.length - 1;
      const barColor = isLast ? colors.success : (isFirst ? colors.accent : colors.accentAlt);
      const barOpacity = isFirst ? 1 : (0.4 + (i / stages.length) * 0.6);

      const retained = i === 0 ? '100% retained' : `${s.pct} retained`;
      const previousCount = i === 0 ? null : stages[i - 1].count;
      const eliminatedCount = previousCount === null ? null : previousCount - s.count;

      const stageBar = `
        <div style="display:flex;justify-content:center;">
          <div style="width:${s.width};min-width:${tokens.adapt(180, 240, 280)}px;height:${barH}px;background:${barColor};opacity:${barOpacity};border-radius:${tokens.adapt(6, 8, 10)}px;display:grid;grid-template-columns:${tokens.adapt(54, 66, 74)}px 1fr auto;align-items:center;padding:0 ${tokens.adapt(12, 16, 18)}px;column-gap:${tokens.adapt(8, 12, 14)}px;">
            <div style="font-size:${tokens.adapt(22, 30, 34)}px;font-weight:700;color:#fff;line-height:1;text-align:right;">${s.count}</div>
            <div style="min-width:0;">
              <div style="font-size:${tokens.bodyText}px;font-weight:600;color:#fff;line-height:1.1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.label}</div>
              <div style="font-size:${tokens.microText}px;color:rgba(255,255,255,0.78);margin-top:3px;">${retained}</div>
            </div>
            ${eliminatedCount === null ? '<div></div>' : `<div style="font-size:${tokens.smallText}px;font-weight:600;color:rgba(255,255,255,0.85);white-space:nowrap;">−${eliminatedCount}</div>`}
          </div>
        </div>`;

      const filterHtml = s.filter ? `
        <div style="padding:${tokens.adapt(8, 10, 12)}px ${tokens.adapt(10, 14, 16)}px;background:#F7FAFC;border:1px solid ${colors.borderSoft};border-radius:${tokens.exhibitRadius}px;">
          <div style="${cssText(text.metaLabel)};color:${colors.textLight};margin-bottom:4px;">Screen ${i}</div>
          <div style="${cssText(text.metricLabel)};margin-bottom:4px;">${s.filter}</div>
          <div style="${cssText(text.annotation)};line-height:1.35;"><span style="font-weight:700;color:${colors.danger};">${eliminatedCount} eliminated:</span> ${s.eliminated}</div>
        </div>` : `
        <div style="padding:${tokens.adapt(8, 10, 12)}px ${tokens.adapt(10, 14, 16)}px;background:#F7FAFC;border:1px solid ${colors.borderSoft};border-radius:${tokens.exhibitRadius}px;">
          <div style="${cssText(text.metaLabel)};color:${colors.textLight};margin-bottom:4px;">Starting Point</div>
          <div style="${cssText(text.metricLabel)};margin-bottom:4px;">Broad Target Universe</div>
          <div style="${cssText(text.annotation)};line-height:1.35;">Longlist built from software, data infrastructure, and vertical AI targets before screen application.</div>
        </div>`;

      return `<div style="display:grid;grid-template-columns:minmax(0,1fr);align-items:center;">
        ${stageBar}
      </div>`;
    }).join('');

    const screenCards = stages.slice(1).map((s, index) => {
      const previousCount = stages[index].count;
      const eliminatedCount = previousCount - s.count;
      return `<div style="padding:${tokens.adapt(8, 10, 12)}px ${tokens.adapt(10, 14, 16)}px;background:#F7FAFC;border:1px solid ${colors.borderSoft};border-radius:${tokens.exhibitRadius}px;">
        <div style="${cssText(text.metaLabel)};color:${colors.textLight};margin-bottom:4px;">Screen ${index + 1}</div>
        <div style="${cssText(text.metricLabel)};margin-bottom:4px;">${s.filter}</div>
        <div style="${cssText(text.annotation)};line-height:1.3;"><span style="font-weight:700;color:${colors.danger};">${eliminatedCount} eliminated:</span> ${s.eliminated}</div>
      </div>`;
    }).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-columns:minmax(0,1.45fr) minmax(${tokens.adapt(250, 300, 340)}px,0.95fr);grid-template-rows:minmax(0,1fr) auto;column-gap:${cardGap}px;row-gap:${tokens.adapt(8, 12, 14)}px;">
      <div style="display:flex;flex-direction:column;gap:${gap}px;justify-content:center;min-width:0;">
        ${rows}
      </div>
      <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:${tokens.adapt(8, 10, 12)}px;align-content:center;">
        ${screenCards}
      </div>
      <div style="grid-column:1 / -1;padding:${tokens.cardPad}px;background:rgba(46,158,90,0.08);border-left:4px solid ${colors.success};border-radius:0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0;">
        <div style="${cssText(text.metaLabel)};color:${colors.success};margin-bottom:6px;">Finalists</div>
        <div style="${cssText(text.body)};line-height:1.35;"><span style="font-weight:700;color:${colors.success};">3 finalists advance:</span> TargetCo Alpha ($280M rev, SaaS platform), TargetCo Beta ($180M rev, data infra), and TargetCo Gamma ($95M rev, vertical AI). Proceed to detailed diligence on all three.</div>
      </div>
    </div>`;
  },
});
