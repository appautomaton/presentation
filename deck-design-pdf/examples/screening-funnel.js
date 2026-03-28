const fs   = require('fs');
const path = require('path');

// Load vendored Source Sans 3 (weights: 400, 600, 700) — Bain's typeface
const SS3_DIR = path.join(__dirname, '../vendor/fonts/source-sans-3');
const SS3_CSS = [400, 600, 700].map(w => {
  const file = path.join(SS3_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8')
    .replace(/url\(\.\//g, `url(file://${SS3_DIR}/`);
}).join('\n');

// ════════════════════════════════════════════════════════════════════════
// Screening Funnel — Bain style
// ════════════════════════════════════════════════════════════════════════
// Systematic elimination logic: how a broad universe narrows to finalists.
// Bain aesthetic: Source Sans 3, charcoal bars narrowing to one red focal
// bar at the bottom, elimination counts in red, everything else gray.
// Recommended minimum: 400px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap from Bain palette if needed
//   2. Data             → swap stages array (label, count, pct, width, filter, eliminated)
//   3. Sizing limits    → tune knobs if defaults don't fit
//
// Design notes for agents:
//   • stages[0] has no filter/eliminated — it is the starting universe
//   • width is a CSS percentage string controlling bar width
//   • Bain rule: ONE red element per exhibit — here it is the finalist bar
//     and the elimination counts (the key insight is what was cut)
//   • Bars are center-aligned so the funnel narrows symmetrically
//   • No rounded corners, no opacity tricks, no card UI

module.exports = {
  id: 'screening-funnel',
  title: 'Screening Funnel',
  tier: 3,
  proves: 'systematic elimination logic — why options were cut at each filter stage',
  data: 'Acquisition target screening from 47 candidates to 3 finalists',
  sectionLabel: 'Target Screening',
  actionTitle: 'Of 47 candidates evaluated, 3 survive all four screens — strategic fit and deal readiness are the binding constraints',
  source: 'Source: Target universe analysis, M&A team (March 2026)',
  exhibitId: 'Exhibit 12.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables (Bain palette) ───────────────────────────────
    const fontFamily  = "'Source Sans 3', sans-serif";
    const charcoal    = '#2B2B2B';   // default bar color
    const red         = '#CC0000';   // Bain red — finalist bar + elimination counts
    const textStrong  = '#1A1A1A';
    const textMuted   = '#666666';
    const textFine    = '#888888';
    const rule        = '#D8D5D2';   // warm gray rule

    // ── 2. Data ─────────────────────────────────────────────────────────
    // width is computed from count using sqrt-scaling for visual balance:
    //   raw % (6%) would make the last bar unreadably thin;
    //   sqrt scale compresses the range while preserving relative order.
    //   A lerp-based min-width (set below) prevents any bar from being
    //   too narrow to show its content at small container sizes.
    const stages = [
      { label: 'Initial Universe',    count: 47, filter: null,                      eliminated: null },
      { label: 'Revenue ≥$50M',       count: 28, filter: 'Size filter',             eliminated: '19 below revenue threshold' },
      { label: 'Strategic Fit',       count: 12, filter: 'Capability overlap',      eliminated: '16 lack core technology or market position' },
      { label: 'Financial Health',    count:  6, filter: 'Balance sheet screen',    eliminated: '6 excessive leverage or declining margins' },
      { label: 'Deal Readiness',      count:  3, filter: 'Willingness & timing',    eliminated: '3 not for sale or in competing processes' },
    ];

    const callout = '3 finalists advance: TargetCo Alpha ($280M rev, SaaS platform), TargetCo Beta ($180M rev, data infra), and TargetCo Gamma ($95M rev, vertical AI). Proceed to detailed diligence on all three.';

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const barHRange         = [28, 44];  // [min, max] px bar height
    const countFontRange    = [16, 26];  // [min, max] px for count number
    const labelFontRange    = [9,  13];  // [min, max] px for stage label
    const elimFontRange     = [8,  11];  // [min, max] px for elimination note
    const calloutRange      = [9,  12];  // [min, max] px for bottom callout
    const barPadRange       = [6,  14];  // [min, max] px horizontal bar padding
    const gapRange          = [3,  7];   // [min, max] px between elements
    const minBarWidthRange  = [80, 120]; // [min, max] px — prevents narrowest bar from clipping content

    // ── Responsive sizing (computed — don't edit) ────────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const barH        = lerp(barHRange);
    const countFont   = lerp(countFontRange);
    const labelFont   = lerp(labelFontRange);
    const elimFont    = lerp(elimFontRange);
    const calloutFont = lerp(calloutRange);
    const barPad      = lerp(barPadRange);
    const gap         = lerp(gapRange);
    const minBarWidth = lerp(minBarWidthRange);

    // Compute visual bar widths from data using sqrt-scaling.
    // sqrt compresses the range (100%→6% becomes 100%→25%) so narrow bars
    // remain readable, while still reflecting relative magnitude.
    const maxCount = stages[0].count;
    stages.forEach(s => {
      s.visualPct = Math.round(Math.sqrt(s.count / maxCount) * 100);
      s.retainedPct = Math.round(s.count / maxCount * 100) + '%';
    });

    // ── Funnel rows ──────────────────────────────────────────────────────
    const funnelRows = stages.map((s, i) => {
      const isLast  = i === stages.length - 1;
      const barColor = isLast ? red : charcoal;
      const prevCount = i > 0 ? stages[i - 1].count : null;
      const elimCount = prevCount !== null ? prevCount - s.count : null;

      // Elimination note between bars (shown above all except first)
      const elimNote = s.filter ? `
        <div style="text-align:center;padding:${gap}px 0;font-family:${fontFamily};font-size:${elimFont}px;color:${textFine};line-height:1.3;">
          <span style="color:${red};font-weight:700;">−${elimCount} eliminated</span>
          <span style="color:${textMuted};"> · ${s.filter}: ${s.eliminated}</span>
        </div>` : '';

      // The bar itself — centered, narrowing each stage
      const bar = `
        <div style="width:${s.visualPct}%;min-width:${minBarWidth}px;margin:0 auto;background:${barColor};height:${barH}px;display:flex;align-items:center;padding:0 ${barPad}px;gap:${barPad}px;">
          <div style="font-family:${fontFamily};font-size:${countFont}px;font-weight:700;color:#FFFFFF;line-height:1;white-space:nowrap;">${s.count}</div>
          <div style="min-width:0;">
            <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:600;color:#FFFFFF;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.label}</div>
            <div style="font-family:${fontFamily};font-size:${elimFont}px;color:rgba(255,255,255,0.65);margin-top:1px;">${s.retainedPct} retained</div>
          </div>
        </div>`;

      return elimNote + bar;
    }).join('');

    // ── Template ─────────────────────────────────────────────────────────
    return `<style>${SS3_CSS}</style>
    <div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap * 2}px;padding:2px;overflow:hidden;">
      <div style="display:flex;flex-direction:column;justify-content:center;">
        ${funnelRows}
      </div>
      <div style="border-top:1px solid ${rule};border-left:3px solid ${red};padding:${gap + 2}px ${gap + 4}px;margin-top:${gap}px;">
        <span style="font-family:${fontFamily};font-size:${calloutFont}px;font-weight:700;color:${red};">3 finalists: </span><span style="font-family:${fontFamily};font-size:${calloutFont}px;color:${textMuted};">${callout}</span>
      </div>
    </div>`;
  },
};
