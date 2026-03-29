// ════════════════════════════════════════════════════════════════════════
// Three Horizons — growth initiatives across time horizons
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: three equal columns separated by thin vertical rules.
// Typography-driven hierarchy — no decorative boxes or rounded corners.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap horizons, initiatives, and callout text
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// Design notes for agents:
//   • Consulting-deck aesthetic: austere, typography-driven, no card UI
//   • Hierarchy comes from font weight and size, not colored backgrounds
//   • Thin rules separate columns — no borders on individual items
//   • Status is plain colored text, not badges or pills
//   • Keep initiatives to 2–3 per horizon at small sizes

module.exports = {
  id: 'three-horizons',
  title: 'Three Horizons / Growth Portfolio',
  tier: 2,
  proves: 'growth initiatives mapped across time horizons with investment and expected return',
  data: 'Growth portfolio across 3 horizons with 9 initiatives',
  sectionLabel: 'Growth Strategy',
  actionTitle: 'Portfolio is skewed toward H1 — H2 and H3 pipeline needs $45M incremental investment to close the 2028 growth gap',
  source: 'Source: Strategy team, growth initiative portfolio review',
  exhibitId: 'Exhibit 20.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily  = "var(--font-body, 'Inter', sans-serif)";
    const textColor   = '#101A27';
    const textMuted   = '#4E6176';
    const textLight   = '#8BA5BD';
    const accent      = '#123A63';
    const accentAlt   = '#2E7D9B';
    const accentSoft  = '#5BA4C9';
    const success     = '#2E9E5A';
    const rule        = '#D7E4EE';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const horizons = [
      {
        id: 'H1', name: 'Defend & Extend', timeline: '0–12 months', color: accent,
        invest: '$25M', returns: '$80M', confidence: 'High',
        initiatives: [
          { name: 'Core pricing optimization', size: '$12M', status: 'In flight', statusColor: success },
          { name: 'Channel partner expansion', size: '$8M', status: 'In flight', statusColor: success },
          { name: 'Customer upsell program', size: '$5M', status: 'Planned', statusColor: accentAlt },
        ],
      },
      {
        id: 'H2', name: 'Build & Scale', timeline: '12–36 months', color: accentAlt,
        invest: '$35M', returns: '$120M', confidence: 'Medium',
        initiatives: [
          { name: 'Adjacent market entry (EU)', size: '$18M', status: 'Planned', statusColor: accentAlt },
          { name: 'PaaS pivot', size: '$12M', status: 'Concept', statusColor: '#D4A017' },
          { name: 'Strategic acquisition pipeline', size: '$5M', status: 'Planned', statusColor: accentAlt },
        ],
      },
      {
        id: 'H3', name: 'Create Options', timeline: '36–60 months', color: accentSoft,
        invest: '$15M', returns: '$200M+', confidence: 'Low',
        initiatives: [
          { name: 'AI-native product line', size: '$8M', status: 'Concept', statusColor: '#D4A017' },
          { name: 'Vertical SaaS incubation', size: '$5M', status: 'Concept', statusColor: '#D4A017' },
          { name: 'Emerging market beachhead', size: '$2M', status: 'Exploratory', statusColor: textLight },
        ],
      },
    ];

    const callout = 'H1 accounts for 33% of investment but only 20% of 5-year returns. Shift $45M to H2 market entry and H3 incubation.';

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const horizonIdRange    = [18, 28];     // [min, max] px for H1/H2/H3
    const headerFontRange   = [10, 14];     // [min, max] px for horizon name
    const bodyFontRange     = [10, 14];     // [min, max] px for initiative name
    const metricFontRange   = [12, 18];     // [min, max] px for invest/returns values
    const microFontRange    = [8, 11];      // [min, max] px for labels, status, timeline
    const padRange          = [6, 14];      // [min, max] px for column padding
    const gapRange          = [6, 12];      // [min, max] px for vertical gaps

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const horizonId  = lerp(horizonIdRange);
    const headerFont = lerp(headerFontRange);
    const bodyFont   = lerp(bodyFontRange);
    const metricFont = lerp(metricFontRange);
    const microFont  = lerp(microFontRange);
    const pad        = lerp(padRange);
    const gap        = lerp(gapRange);

    // ── Render ──────────────────────────────────────────────────────────
    const cols = horizons.map((h, hi) => {
      const colBorder = hi > 0 ? `border-left:1px solid ${rule};padding-left:${Math.round(pad * 0.5)}px;` : '';

      const inits = h.initiatives.map(init =>
        `<div style="padding:${Math.round(gap * 0.4)}px 0;border-bottom:1px solid ${rule};">
          <div style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:600;color:${textColor};line-height:1.25;">${init.name}</div>
          <div style="display:flex;justify-content:space-between;margin-top:1px;">
            <span style="font-family:${fontFamily};font-size:${microFont}px;color:${textMuted};">${init.size}</span>
            <span style="font-family:${fontFamily};font-size:${microFont}px;font-weight:600;color:${init.statusColor};">${init.status}</span>
          </div>
        </div>`
      ).join('');

      return `<div style="display:flex;flex-direction:column;gap:${gap}px;min-width:0;${colBorder}">
        <div>
          <div style="display:flex;align-items:baseline;gap:${Math.round(gap * 0.5)}px;">
            <span style="font-family:${fontFamily};font-size:${horizonId}px;font-weight:800;color:${h.color};line-height:1;">${h.id}</span>
            <span style="font-family:${fontFamily};font-size:${headerFont}px;font-weight:700;color:${textColor};line-height:1;">${h.name}</span>
          </div>
          <div style="font-family:${fontFamily};font-size:${microFont}px;color:${textLight};margin-top:2px;">${h.timeline}</div>
        </div>
        <div style="display:flex;gap:${Math.round(pad * 0.4)}px ${Math.round(pad * 0.6)}px;flex-wrap:wrap;">
          <div><div style="font-family:${fontFamily};font-size:${microFont}px;color:${textLight};text-transform:uppercase;letter-spacing:0.04em;">Invest</div><div style="font-family:${fontFamily};font-size:${metricFont}px;font-weight:700;color:${textColor};line-height:1.1;">${h.invest}</div></div>
          <div><div style="font-family:${fontFamily};font-size:${microFont}px;color:${textLight};text-transform:uppercase;letter-spacing:0.04em;">Returns</div><div style="font-family:${fontFamily};font-size:${metricFont}px;font-weight:700;color:${success};line-height:1.1;">${h.returns}</div></div>
          <div><div style="font-family:${fontFamily};font-size:${microFont}px;color:${textLight};text-transform:uppercase;letter-spacing:0.04em;">Conf.</div><div style="font-family:${fontFamily};font-size:${metricFont}px;font-weight:700;color:${textColor};line-height:1.1;">${h.confidence}</div></div>
        </div>
        <div style="border-top:2px solid ${h.color};padding-top:${Math.round(gap * 0.5)}px;display:flex;flex-direction:column;">
          ${inits}
        </div>
      </div>`;
    }).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));column-gap:${Math.round(pad * 0.5)}px;">
        ${cols}
      </div>
      <div style="border-top:1px solid ${rule};padding-top:${Math.round(gap * 0.6)}px;">
        <div style="font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};line-height:1.3;"><span style="font-weight:700;color:${accent};">Portfolio gap</span>  ${callout}</div>
      </div>
    </div>`;
  },
};
