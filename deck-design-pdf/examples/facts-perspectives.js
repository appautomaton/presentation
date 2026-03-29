// ════════════════════════════════════════════════════════════════════════
// Facts vs. Perspectives — diagnostic synthesis layout
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: two-column split — quantified facts (left) and
// interpretive perspectives (right). Works in portrait, landscape, or
// square containers. Content scales and wraps to fit.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap facts, perspectives, and action text
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// Layout notes for agents:
//   • Left column ~54% facts, right ~46% perspectives
//   • Keep facts to 3 items max — more will overflow at small sizes
//   • Keep perspectives to 2–3 items — shorter is better
//   • The action box at bottom-right is optional — remove if tight
//   • All text sizing uses the same lerp pattern as ECharts templates

module.exports = {
  id: 'facts-perspectives',
  title: 'Facts vs. Perspectives',
  tier: 3,
  proves: 'separation of observed data from consultants\' interpretation',
  data: 'Diagnostic synthesis with quantified facts and recommended actions',
  sectionLabel: 'Diagnostic Synthesis',
  actionTitle: 'Margin compression is structural, not cyclical — pricing power exists but volume strategy needs reset',
  source: 'Source: Team analysis, FY2023–FY2025 financials',
  exhibitId: 'Exhibit 5.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily  = 'sans-serif';
    const textColor   = '#101A27';
    const textMuted   = '#4E6176';
    const textLight   = '#6B7F94';
    const accent      = '#123A63';
    const success     = '#2E9E5A';
    const danger      = '#C0392B';
    const borderSoft  = '#C7D5E5';
    const gridLine    = '#E4EDF7';
    const bgSubtle    = '#F3F6FA';

    // ── 2. Data ─────────────────────────────────────────────────────────
    // Keep facts to 3 items with concise descriptions for exhibit sizing.
    const facts = [
      { metric: '−420', color: accent,  desc: 'EBITDA margin declined 420bps over 3 years, from 24.6% to 20.4%' },
      { metric: '−12%', color: danger,  desc: 'Mid-tier volume down 12% while premium grew 8% — mix shift insufficient to offset' },
      { metric: '+4%',  color: success, desc: 'Pricing realization improved 4% YoY — pricing power retained in key segments' },
    ];

    // Keep perspectives to 2–3 items with concise text.
    const perspectives = [
      'Volume decline is concentrated in mid-tier — a <b>strategic choice</b> the company hasn\'t explicitly made, not a market inevitability.',
      'Cost structure has a ~$140M structural gap vs. peers. Half is addressable through procurement; the rest requires <b>footprint rationalization</b>.',
    ];

    const actionText = 'Rebalance channels to recover mid-tier volume, then deliver $80–100M of structural cost take-out over 18 months.';

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const metricFontRange  = [20, 32];      // [min, max] px for fact metric
    const metricWidthRange = [52, 80];      // [min, max] px for metric column
    const bodyFontRange    = [11, 15];      // [min, max] px for body text
    const labelFontRange   = [9, 13];       // [min, max] px for section headers
    const gapRange         = [8, 14];       // [min, max] px for row gaps
    const padRange         = [8, 16];       // [min, max] px for section padding
    const colGapRange      = [10, 20];      // [min, max] px for column gap

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const metricFont  = lerp(metricFontRange);
    const metricWidth = lerp(metricWidthRange);
    const bodyFont    = lerp(bodyFontRange);
    const labelFont   = lerp(labelFontRange);
    const gap         = lerp(gapRange);
    const pad         = lerp(padRange);
    const colGap      = lerp(colGapRange);

    // ── Render helpers ──────────────────────────────────────────────────
    const factRows = facts.map(f => `
      <div style="display:grid;grid-template-columns:${metricWidth}px 1fr;column-gap:${Math.round(gap * 0.8)}px;align-items:baseline;">
        <div style="font-family:${fontFamily};font-size:${metricFont}px;font-weight:700;color:${f.color};text-align:right;line-height:1;">${f.metric}</div>
        <div style="font-family:${fontFamily};font-size:${bodyFont}px;color:${textColor};line-height:1.35;">${f.desc}</div>
      </div>`).join('');

    const perspRows = perspectives.map((p, i) => `
      <div style="display:grid;grid-template-columns:${Math.round(bodyFont * 1.5)}px 1fr;column-gap:${Math.round(gap * 0.6)}px;align-items:baseline;">
        <span style="font-family:${fontFamily};font-weight:700;color:${accent};font-size:${bodyFont}px;line-height:1.2;">${i + 1}.</span>
        <div style="font-family:${fontFamily};font-size:${bodyFont}px;color:${textColor};line-height:1.4;">${p}</div>
      </div>`).join('');

    // ── Template ────────────────────────────────────────────────────────
    return `<div class="h-full w-full" style="display:grid;grid-template-columns:54fr 46fr;column-gap:${colGap}px;overflow:hidden;">
      <!-- FACTS -->
      <div style="padding:${pad}px ${pad}px ${pad}px 0;border-right:2px solid ${borderSoft};display:flex;flex-direction:column;gap:${gap}px;min-width:0;overflow:hidden;">
        <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${textLight};padding-bottom:${Math.round(gap * 0.5)}px;border-bottom:1px solid ${gridLine};">Key Facts</div>
        <div style="display:flex;flex-direction:column;gap:${gap}px;flex:1;min-height:0;">
          ${factRows}
        </div>
      </div>
      <!-- PERSPECTIVES -->
      <div style="padding:${pad}px 0 ${pad}px ${pad}px;display:flex;flex-direction:column;gap:${gap}px;min-width:0;overflow:hidden;">
        <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${accent};padding-bottom:${Math.round(gap * 0.5)}px;border-bottom:2px solid ${accent};">Perspectives</div>
        <div style="display:flex;flex-direction:column;gap:${gap}px;flex:1;min-height:0;">
          ${perspRows}
        </div>
        <div style="margin-top:auto;padding:${Math.round(pad * 0.8)}px;background:${accent};border-radius:4px;color:#fff;">
          <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.6);margin-bottom:4px;">Recommended Action</div>
          <div style="font-family:${fontFamily};font-size:${bodyFont}px;line-height:1.3;font-weight:500;color:#fff;">${actionText}</div>
        </div>
      </div>
    </div>`;
  },
};
