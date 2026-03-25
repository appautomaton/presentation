const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'kpi-cascade',
  title: 'KPI Cascade',
  tier: 3,
  proves: 'causal chain from activity → pipeline → outcome, identifying the constraining stage',
  data: 'Sales performance cascade with 9 KPIs across 3 tiers',
  sectionLabel: 'Performance Architecture',
  actionTitle: 'Sales activity metrics are on track but pipeline conversion is the constraint on revenue delivery',
  source: 'Source: RevOps dashboard, Q1 2026',
  exhibitId: 'Exhibit 6.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'KPI cascades need horizontal space for 3 tiers. At compact widths, reduce to 2 KPIs per tier or stack tiers vertically.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const tiers = [
      {
        name: 'Activity', subtitle: 'Leading indicators',
        bg: colors.gridLine, textColor: colors.accent,
        metrics: [
          { name: 'Calls / rep / day', val: '42', target: '40', status: 'ok' },
          { name: 'Demos / week', val: '128', target: '120', status: 'ok' },
          { name: 'Proposals sent / mo', val: '84', target: '90', status: 'warn' },
        ],
      },
      {
        name: 'Pipeline', subtitle: 'Conversion metrics',
        bg: colors.accent, textColor: '#fff',
        metrics: [
          { name: 'Qualified opps', val: '312', target: '340', status: 'warn' },
          { name: 'Win rate', val: '24%', target: '28%', status: 'fail' },
          { name: 'Avg deal size', val: '$186K', target: '$175K', status: 'ok' },
        ],
      },
      {
        name: 'Outcome', subtitle: 'Lagging results',
        bg: colors.success, textColor: '#fff',
        metrics: [
          { name: 'Quarterly revenue', val: '$14.2M', target: '$16.0M', status: 'fail' },
          { name: 'Quota attainment', val: '88%', target: '100%', status: 'warn' },
          { name: 'Avg cycle time', val: '68 days', target: '55 days', status: 'fail' },
        ],
      },
    ];

    const statusIcon = { ok: '<i class="fa-solid fa-circle-check" style="color:#2E9E5A;"></i>', warn: '<i class="fa-solid fa-triangle-exclamation" style="color:#D4A017;"></i>', fail: '<i class="fa-solid fa-circle-xmark" style="color:#CC4444;"></i>' };

    const cardPad = tokens.adapt(8, 12, 14);
    const metricSize = tokens.adapt(18, 24, 28);
    const arrowW = tokens.adapt(24, 36, 40);

    function renderTier(tier) {
      const headerBg = tier.bg;
      const cards = tier.metrics.map(m => {
        const isFail = m.status === 'fail';
        const border = isFail ? `1.5px solid #FECDD3` : `1px solid ${colors.borderSoft}`;
        const bg = isFail ? '#FFF5F5' : '#fff';
        const valColor = isFail ? colors.danger : colors.textStrong;
        return `<div style="padding:${cardPad}px;border:${border};border-radius:${tokens.exhibitRadius}px;background:${bg};">
          <div style="${cssText(text.metaLabel)};color:${colors.textLight};">${m.name}</div>
          <div style="display:flex;align-items:baseline;gap:6px;margin-top:6px;">
            <span style="font-size:${metricSize}px;font-weight:700;color:${valColor};">${m.val}</span>
            <span style="font-size:${tokens.smallText}px;color:${colors.textLight};">/ ${m.target}</span>
            <span style="font-size:${tokens.bodyText}px;margin-left:auto;">${statusIcon[m.status]}</span>
          </div>
        </div>`;
      }).join('');

      return `<div style="display:flex;flex-direction:column;gap:${tokens.adapt(6, 8, 10)}px;">
        <div style="text-align:center;padding:${tokens.adapt(6, 8, 10)}px;background:${headerBg};border-radius:${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0 0;">
          <div style="${cssText(text.metaLabel)};color:${tier.textColor};">${tier.name}</div>
          <div style="font-size:${tokens.microText}px;color:${tier.textColor === '#fff' ? 'rgba(255,255,255,0.6)' : colors.textLight};">${tier.subtitle}</div>
        </div>
        ${cards}
      </div>`;
    }

    const arrow = `<div style="display:flex;align-items:center;justify-content:center;width:${arrowW}px;color:${colors.borderSoft};font-size:${tokens.adapt(16, 20, 22)}px;font-weight:700;">→</div>`;

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${tokens.adapt(8, 12, 14)}px;">
      <div style="display:grid;grid-template-columns:1fr ${arrowW}px 1fr ${arrowW}px 1fr;align-items:stretch;gap:0;">
        ${renderTier(tiers[0])}
        ${arrow}
        ${renderTier(tiers[1])}
        ${arrow}
        ${renderTier(tiers[2])}
      </div>
      <div style="padding:${cardPad}px ${tokens.adapt(12, 16, 18)}px;background:${colors.accent};border-radius:${tokens.exhibitRadius}px;color:#fff;display:flex;align-items:center;gap:${tokens.adapt(8, 12, 14)}px;">
        <span style="font-size:${tokens.adapt(14, 18, 20)}px;">→</span>
        <span style="font-size:${tokens.smallText}px;font-family:var(--font-body);line-height:1.45;"><span style="font-weight:700;">Diagnosis:</span> Activity metrics are healthy. The bottleneck is win rate (24% vs. 28% target) — pipeline quality, not pipeline quantity. Fix: tighten qualification criteria and align SDR incentives to conversion, not volume.</span>
      </div>
    </div>`;
  },
});
