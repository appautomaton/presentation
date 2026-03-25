const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'three-horizons',
  title: 'Three Horizons / Growth Portfolio',
  tier: 2,
  proves: 'growth initiatives mapped across time horizons with investment and expected return',
  data: 'Growth portfolio across 3 horizons with 9 initiatives',
  sectionLabel: 'Growth Strategy',
  actionTitle: 'Portfolio is skewed toward H1 optimization — H2 and H3 pipeline needs $45M incremental investment to close the 2028 growth gap',
  source: 'Source: Strategy team, growth initiative portfolio review',
  exhibitId: 'Exhibit 20.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Three horizons need equal column width. At compact widths, reduce to 2-3 initiatives per horizon.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const horizons = [
      {
        label: 'H1 — Defend & Extend', timeline: '0–12 months', color: colors.accent,
        invest: '$25M', returns: '$80M', confidence: 'High',
        initiatives: [
          { name: 'Core pricing optimization', size: '$12M', status: 'In flight' },
          { name: 'Channel partner expansion', size: '$8M', status: 'In flight' },
          { name: 'Customer upsell program', size: '$5M', status: 'Planned' },
        ],
      },
      {
        label: 'H2 — Build & Scale', timeline: '12–36 months', color: colors.accentAlt,
        invest: '$35M', returns: '$120M', confidence: 'Medium',
        initiatives: [
          { name: 'Adjacent market entry (EU)', size: '$18M', status: 'Planned' },
          { name: 'Platform-as-a-Service pivot', size: '$12M', status: 'Concept' },
          { name: 'Strategic acquisition pipeline', size: '$5M', status: 'Planned' },
        ],
      },
      {
        label: 'H3 — Create Options', timeline: '36–60 months', color: colors.accentSoft,
        invest: '$15M', returns: '$200M+', confidence: 'Low',
        initiatives: [
          { name: 'AI-native product line', size: '$8M', status: 'Concept' },
          { name: 'Vertical SaaS incubation', size: '$5M', status: 'Concept' },
          { name: 'Emerging market beachhead', size: '$2M', status: 'Exploratory' },
        ],
      },
    ];

    const statusColors = { 'In flight': colors.success, 'Planned': colors.accentAlt, 'Concept': '#D4A017', 'Exploratory': colors.textLight };

    const gap = tokens.adapt(6, 10, 12);
    const cardPad = tokens.adapt(8, 12, 14);

    const horizonCols = horizons.map(h => {
      const initCards = h.initiatives.map(init => {
        const sc = statusColors[init.status] || colors.textLight;
        return `<div style="padding:${tokens.adapt(6, 8, 10)}px;background:#fff;border:1px solid ${colors.borderSoft};border-left:3px solid ${h.color};border-radius:${tokens.adapt(4, 6, 7)}px;">
          <div style="${cssText(text.annotation)};font-weight:600;color:${colors.textStrong};">${init.name}</div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px;">
            <span style="font-size:${tokens.microText}px;font-weight:700;color:${colors.textMuted};">${init.size}</span>
            <span style="font-size:${tokens.microText}px;font-weight:600;color:${sc};">${init.status}</span>
          </div>
        </div>`;
      }).join('');

      return `<div style="display:flex;flex-direction:column;gap:${gap}px;">
        <!-- Header -->
        <div style="padding:${cardPad}px;background:${h.color};border-radius:${tokens.exhibitRadius}px;color:#fff;">
          <div style="font-size:${tokens.bodyText}px;font-weight:700;">${h.label}</div>
          <div style="font-size:${tokens.microText}px;color:rgba(255,255,255,0.6);margin-top:2px;">${h.timeline}</div>
        </div>
        <!-- Metrics -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;">
          <div style="text-align:center;padding:${tokens.adapt(4, 6, 8)}px;background:#F3F6FA;border-radius:${tokens.adapt(4, 6, 7)}px;">
            <div style="font-size:${tokens.microText}px;color:${colors.textLight};">Invest</div>
            <div style="font-size:${tokens.adapt(13, 16, 18)}px;font-weight:700;color:${colors.textStrong};">${h.invest}</div>
          </div>
          <div style="text-align:center;padding:${tokens.adapt(4, 6, 8)}px;background:#F3F6FA;border-radius:${tokens.adapt(4, 6, 7)}px;">
            <div style="font-size:${tokens.microText}px;color:${colors.textLight};">Returns</div>
            <div style="font-size:${tokens.adapt(13, 16, 18)}px;font-weight:700;color:${colors.success};">${h.returns}</div>
          </div>
          <div style="text-align:center;padding:${tokens.adapt(4, 6, 8)}px;background:#F3F6FA;border-radius:${tokens.adapt(4, 6, 7)}px;">
            <div style="font-size:${tokens.microText}px;color:${colors.textLight};">Confidence</div>
            <div style="font-size:${tokens.adapt(13, 16, 18)}px;font-weight:700;color:${colors.textStrong};">${h.confidence}</div>
          </div>
        </div>
        <!-- Initiatives -->
        ${initCards}
      </div>`;
    }).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${tokens.adapt(8, 12, 14)}px;">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:${tokens.adapt(10, 16, 20)}px;align-items:start;">
        ${horizonCols}
      </div>
      <div style="padding:${cardPad}px;background:rgba(18,58,99,0.05);border-left:4px solid ${colors.accent};border-radius:0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0;">
        <span style="${cssText(text.body)}"><span style="font-weight:700;color:${colors.accent};">Portfolio gap:</span> H1 accounts for 33% of investment but only 20% of 5-year returns. Shift $45M from H1 cost optimization to H2 market entry and H3 AI incubation to close the 2028 growth target.</span>
      </div>
    </div>`;
  },
});
