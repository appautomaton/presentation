const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'org-model',
  title: 'Organizational Model',
  tier: 3,
  proves: 'target operating model structure with design rationale',
  data: 'Product-aligned BUs with centralized shared services',
  sectionLabel: 'Target Operating Model',
  actionTitle: 'Product-aligned BUs with centralized shared services reduce layers from 7 to 4 and cut decision cycle by 60%',
  source: 'Source: Organizational design team, target state March 2026',
  exhibitId: 'Exhibit 8.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Org models are vertically dense. At compact heights, reduce shared services row or merge design choice callouts.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const cardPad = tokens.adapt(8, 12, 16);
    const gap = tokens.adapt(6, 8, 10);
    const buColors = [colors.accent, colors.accentAlt, colors.accentSoft];

    const bus = [
      { name: 'Cloud Platform', rev: '$1.8B', ppl: '2,400' },
      { name: 'Data & AI', rev: '$1.2B', ppl: '1,600' },
      { name: 'Enterprise Apps', rev: '$1.2B', ppl: '1,800' },
    ];

    const sharedSvcs = ['Finance & Accounting', 'HR & Talent', 'IT & Infrastructure', 'Legal & Compliance'];

    const designChoices = [
      { color: colors.accent, text: 'Product-aligned P&L ownership — each BU owns revenue, cost, and roadmap' },
      { color: colors.accentAlt, text: 'Eliminate regional layer — BUs go direct to market with shared GTM support' },
    ];

    const buCards = bus.map((bu, i) => `
      <div style="padding:${cardPad}px;background:#fff;border:1.5px solid ${colors.borderSoft};border-left:5px solid ${buColors[i]};border-radius:${tokens.exhibitRadius}px;">
        <div style="${cssText(text.metaLabel)};color:${colors.textLight};">Business Unit</div>
        <div style="${cssText(text.metricLabel)};margin-top:3px;">${bu.name}</div>
        <div style="display:flex;gap:${tokens.adapt(8, 12, 14)}px;margin-top:6px;">
          <span style="${cssText(text.annotation)}">${bu.rev} rev</span>
          <span style="${cssText(text.annotation)}">${bu.ppl} FTEs</span>
        </div>
      </div>`).join('');

    const svcCards = sharedSvcs.map(s => `
      <div style="padding:${tokens.adapt(6, 10, 12)}px;background:${colors.gridLine};border-radius:${tokens.exhibitRadius}px;text-align:center;">
        <div style="font-size:${tokens.smallText}px;font-weight:600;color:${colors.accent};">${s}</div>
        <div style="font-size:${tokens.microText}px;color:${colors.textLight};margin-top:3px;">Shared Service</div>
      </div>`).join('');

    const choiceCallouts = designChoices.map(dc => `
      <div style="flex:1;padding:${tokens.adapt(6, 8, 10)}px ${tokens.adapt(8, 12, 14)}px;background:#F3F6FA;border-left:3px solid ${dc.color};border-radius:0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0;">
        <span style="${cssText(text.annotation)}"><span style="font-weight:700;color:${dc.color};">Design choice:</span> ${dc.text}</span>
      </div>`).join('');

    const connectorV = `<div style="display:flex;justify-content:center;"><div style="width:2px;height:${tokens.adapt(8, 12, 14)}px;background:${colors.borderSoft};"></div></div>`;

    return `<div class="h-full w-full" style="display:flex;flex-direction:column;gap:${gap}px;">
      <!-- Executive layer -->
      <div style="display:flex;justify-content:center;">
        <div style="padding:${cardPad}px ${tokens.adapt(16, 20, 24)}px;background:#0B2545;border-radius:${tokens.exhibitRadius}px;color:#fff;text-align:center;min-width:${tokens.adapt(160, 200, 220)}px;">
          <div style="${cssText(text.metaLabel)};color:rgba(255,255,255,0.5);">Executive</div>
          <div style="font-size:${tokens.bodyTextLarge}px;font-weight:700;margin-top:4px;">CEO + 3 Direct Reports</div>
          <div style="font-size:${tokens.microText}px;color:rgba(255,255,255,0.6);margin-top:2px;">COO &middot; CFO &middot; Chief Product Officer</div>
        </div>
      </div>

      ${connectorV}

      <!-- BU layer -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:${gap}px;">
        ${buCards}
      </div>

      <!-- Design choices -->
      <div style="display:flex;gap:${gap}px;">
        ${choiceCallouts}
      </div>

      ${connectorV}

      <!-- Shared services -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:${tokens.adapt(4, 6, 8)}px;">
        ${svcCards}
      </div>

      <!-- Bottom callout -->
      <div style="margin-top:auto;padding:${tokens.adapt(6, 8, 10)}px ${tokens.adapt(8, 12, 14)}px;background:#F3F6FA;border-left:3px solid ${colors.success};border-radius:0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0;">
        <span style="${cssText(text.annotation)}"><span style="font-weight:700;color:${colors.success};">Design choice:</span> Centralize procurement, FP&amp;A, and HRBP into shared services — saves ~$45M and standardizes processes</span>
      </div>
    </div>`;
  },
});
