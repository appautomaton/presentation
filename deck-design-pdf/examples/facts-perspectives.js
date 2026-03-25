const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'facts-perspectives',
  title: 'Facts vs. Perspectives',
  tier: 3,
  proves: 'separation of observed data from consultants\' interpretation',
  data: 'Diagnostic synthesis with quantified facts and recommended actions',
  sectionLabel: 'Diagnostic Synthesis',
  actionTitle: 'Margin compression is structural, not cyclical — pricing power exists but volume strategy needs reset',
  source: 'Source: Team analysis, FY2023–FY2025 financials',
  exhibitId: 'Exhibit 5.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Facts-perspectives is Bain\'s signature composition. Left column ~57% facts, right ~43% perspectives. Reduce fact count below compact width.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);
    const factMetricWidth = tokens.adapt(72, 88, 96);
    const factMetricSize = tokens.adapt(24, 34, 38);

    const facts = [
      { metric: '−420', color: colors.accent, desc: 'EBITDA margin declined 420bps over 3 years, from 24.6% to 20.4%' },
      { metric: '−12%', color: colors.danger, desc: 'Mid-tier volume down 12% while premium grew 8% — mix shift is real but insufficient to offset' },
      { metric: '+4%', color: colors.success, desc: 'Pricing realization improved 4% YoY — the business retains pricing power in segments where it competes' },
      { metric: '3.2×', color: '#B85C2C', desc: 'COGS per unit grew 3.2× faster than revenue per unit, driven by input cost inflation and fixed cost deleveraging' },
    ];

    const perspectives = [
      'The volume decline is concentrated in mid-tier — this is a <span style="font-weight:700;">strategic choice</span> the company hasn\'t explicitly made, not a market inevitability.',
      'Pricing power in premium suggests the brand can support selective price increases — but <span style="font-weight:700;">only if mid-tier volume stabilizes</span> to maintain fixed-cost absorption.',
      'Cost structure has a ~$140M structural gap vs. peers. Roughly half is addressable through procurement; the remainder requires footprint rationalization.',
    ];

    const factRows = facts.map(f => `
      <div style="display:grid;grid-template-columns:${factMetricWidth}px 1fr;column-gap:${tokens.adapt(10, 14, 16)}px;align-items:flex-start;">
        <div style="${cssText({
          ...text.metricValue,
          color: f.color,
          fontSize: `${factMetricSize}px`,
          textAlign: 'right',
          lineHeight: 0.95,
        })}">${f.metric}</div>
        <div style="${cssText(text.body)};line-height:1.32;padding-top:${tokens.adapt(1, 3, 4)}px;">${f.desc}</div>
      </div>`).join('');

    const perspRows = perspectives.map((p, i) => `
      <div style="display:grid;grid-template-columns:${tokens.adapt(18, 22, 24)}px 1fr;column-gap:${tokens.adapt(8, 10, 12)}px;align-items:flex-start;">
        <span style="font-weight:700;color:${colors.accent};font-size:${tokens.bodyText}px;line-height:1.2;">${i + 1}.</span>
        <div style="${cssText(text.body)};line-height:1.38;">${p}</div>
      </div>`).join('');

    const bridgeBars = [
      { label: 'Price', val: '+160', color: colors.success, h: '60%' },
      { label: 'Volume', val: '−380', color: colors.danger, h: '100%' },
      { label: 'Cost', val: '−200', color: colors.danger, h: '50%' },
    ];

    const bridgeHtml = bridgeBars.map(b => `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:${tokens.adapt(4, 6, 6)}px;">
        <div style="width:100%;background:${b.color};border-radius:3px;height:${b.h};"></div>
        <div style="font-size:${tokens.smallText}px;font-weight:700;color:${b.color};line-height:1;">${b.val}</div>
        <div style="font-size:${tokens.microText}px;color:${colors.textLight};">${b.label}</div>
      </div>`).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-columns:54fr 46fr;column-gap:${tokens.adapt(12, 18, 22)}px;">
      <!-- FACTS -->
      <div style="padding:${tokens.cardPad}px ${tokens.adapt(10, 14, 18)}px ${tokens.cardPad}px 0;border-right:2px solid ${colors.borderSoft};display:grid;grid-template-rows:auto 1fr auto;row-gap:${tokens.adapt(10, 12, 14)}px;min-width:0;">
        <div style="${cssText(text.metaLabel)};color:${colors.textLight};padding-bottom:${tokens.adapt(6, 8, 10)}px;border-bottom:1px solid ${colors.gridLine};">Key Facts</div>
        <div style="display:flex;flex-direction:column;gap:${tokens.adapt(10, 12, 14)}px;justify-content:flex-start;min-width:0;">
          ${factRows}
        </div>
        <div style="margin-top:auto;padding:${tokens.adapt(8, 12, 14)}px;background:#F3F6FA;border-radius:${tokens.exhibitRadius}px;">
          <div style="${cssText(text.metaLabel)};color:${colors.textLight};margin-bottom:6px;">Margin Bridge (bps)</div>
          <div style="display:flex;gap:${tokens.adapt(6, 8, 10)}px;align-items:flex-end;height:${tokens.adapt(18, 24, 28)}px;">
            ${bridgeHtml}
          </div>
        </div>
      </div>
      <!-- PERSPECTIVES -->
      <div style="padding:${tokens.cardPad}px 0 ${tokens.cardPad}px ${tokens.adapt(10, 14, 18)}px;display:grid;grid-template-rows:auto 1fr auto;row-gap:${tokens.adapt(10, 12, 14)}px;min-width:0;">
        <div style="${cssText(text.metaLabel)};color:${colors.accent};padding-bottom:${tokens.adapt(6, 8, 10)}px;border-bottom:2px solid ${colors.accent};">Perspectives</div>
        <div style="display:flex;flex-direction:column;gap:${tokens.adapt(10, 12, 14)}px;justify-content:flex-start;min-width:0;">
          ${perspRows}
        </div>
        <div style="margin-top:auto;padding:${tokens.adapt(10, 14, 16)}px;background:${colors.accent};border-radius:${tokens.exhibitRadius}px;color:#fff;">
          <div style="${cssText(text.metaLabel)};color:rgba(255,255,255,0.6);margin-bottom:6px;">Recommended Action</div>
          <div style="font-size:${tokens.smallText}px;line-height:1.28;font-weight:500;font-family:var(--font-body);">
            Rebalance channels to recover mid-tier volume, then deliver $80–100M of structural cost take-out over the next 18 months.
          </div>
        </div>
      </div>
    </div>`;
  },
});
