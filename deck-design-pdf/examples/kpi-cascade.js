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
// KPI Cascade — Bain style
// ════════════════════════════════════════════════════════════════════════
// Causal chain: Activity → Pipeline → Outcome, three equal columns
// separated by thin vertical rules. Bain aesthetic: Source Sans 3,
// charcoal text, red only on fail status and callout.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap from Bain palette if needed
//   2. Data             → swap tiers and metrics
//   3. Sizing limits    → tune knobs if defaults don't fit
//
// Design notes for agents:
//   • 3 tiers × 3 metrics — keep this 3×3 shape
//   • status: 'ok' | 'warn' | 'fail' — icons are Unicode (✓ ⚠ ✕)
//   • Fail metrics get red value text
//   • Column dividers are 1px solid gray — no arrows between tiers
//   • Callout: border-left:3px solid red, plain div, no card background

module.exports = {
  id: 'kpi-cascade',
  title: 'KPI Cascade',
  tier: 3,
  proves: 'causal chain from activity → pipeline → outcome, identifying the constraining stage',
  data: 'Sales performance cascade with 9 KPIs across 3 tiers',
  sectionLabel: 'Performance Architecture',
  actionTitle: 'Sales activity metrics are on track but pipeline conversion is the constraint on revenue delivery',
  source: 'Source: RevOps dashboard, Q1 2026',
  exhibitId: 'Exhibit 6.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables (Bain palette) ───────────────────────────────
    const fontFamily = "'Source Sans 3', sans-serif";
    const charcoal   = '#2B2B2B';
    const red        = '#CC0000';   // Bain red — fail status + callout
    const textMuted  = '#666666';
    const textFine   = '#888888';
    const rule       = '#E0E0E0';   // metric row separators
    const divider    = '#D0D0D0';   // column dividers
    const success    = '#2E9E5A';   // ok status
    const warn       = '#D4A017';   // warn status

    // ── 2. Data ─────────────────────────────────────────────────────────
    const tiers = [
      {
        name: 'Activity',
        subtitle: 'Leading indicators',
        metrics: [
          { name: 'Calls / rep / day',   val: '42',     target: '40',     status: 'ok'   },
          { name: 'Demos / week',         val: '128',    target: '120',    status: 'ok'   },
          { name: 'Proposals sent / mo',  val: '84',     target: '90',     status: 'warn' },
        ],
      },
      {
        name: 'Pipeline',
        subtitle: 'Conversion metrics',
        metrics: [
          { name: 'Qualified opps',  val: '312',   target: '340',   status: 'warn' },
          { name: 'Win rate',        val: '24%',   target: '28%',   status: 'fail' },
          { name: 'Avg deal size',   val: '$186K', target: '$175K', status: 'ok'   },
        ],
      },
      {
        name: 'Outcome',
        subtitle: 'Lagging results',
        metrics: [
          { name: 'Quarterly revenue',  val: '$14.2M', target: '$16.0M', status: 'fail' },
          { name: 'Quota attainment',   val: '88%',    target: '100%',   status: 'warn' },
          { name: 'Avg cycle time',     val: '68 days',target: '55 days',status: 'fail' },
        ],
      },
    ];

    const statusIcon  = { ok: '✓', warn: '⚠', fail: '✕' };
    const statusColor = { ok: success, warn: warn, fail: red };

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const metricSizeRange = [14, 22];   // [min, max] px for metric value
    const headerFontRange = [9,  13];   // [min, max] px for tier header name
    const labelFontRange  = [8,  11];   // [min, max] px for metric label / target
    const bodyFontRange   = [9,  13];   // [min, max] px for callout text
    const iconFontRange   = [10, 14];   // [min, max] px for status icon
    const padRange        = [6,  12];   // [min, max] px column padding
    const gapRange        = [4,  10];   // [min, max] px vertical gap

    // ── Responsive sizing (computed — don't edit) ────────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const metricSize = lerp(metricSizeRange);
    const headerFont = lerp(headerFontRange);
    const labelFont  = lerp(labelFontRange);
    const bodyFont   = lerp(bodyFontRange);
    const iconFont   = lerp(iconFontRange);
    const pad        = lerp(padRange);
    const gap        = lerp(gapRange);

    // ── Render a single tier column ──────────────────────────────────────
    function renderTier(tier) {
      const metricRows = tier.metrics.map(m => {
        const valColor  = m.status === 'fail' ? red : charcoal;
        const icon      = statusIcon[m.status];
        const iconColor = statusColor[m.status];
        return `
          <div style="border-bottom:1px solid ${rule};padding:${gap + 2}px 0;display:flex;flex-direction:column;gap:2px;">
            <div style="display:flex;align-items:baseline;justify-content:space-between;gap:${gap}px;">
              <div style="font-family:${fontFamily};font-size:${labelFont}px;color:${textFine};line-height:1.3;min-width:0;">${m.name}</div>
              <div style="font-family:${fontFamily};font-size:${labelFont}px;color:${textFine};white-space:nowrap;flex-shrink:0;">/ ${m.target}</div>
            </div>
            <div style="display:flex;align-items:baseline;justify-content:space-between;gap:${gap}px;">
              <div style="font-family:${fontFamily};font-size:${metricSize}px;font-weight:700;color:${valColor};line-height:1.1;">${m.val}</div>
              <div style="font-family:${fontFamily};font-size:${iconFont}px;font-weight:700;color:${iconColor};flex-shrink:0;">${icon}</div>
            </div>
          </div>`;
      }).join('');

      return `
        <div style="display:flex;flex-direction:column;padding:0 ${pad}px;min-width:0;">
          <div style="border-bottom:2px solid ${charcoal};padding-bottom:${gap}px;margin-bottom:${gap}px;">
            <div style="font-family:${fontFamily};font-size:${headerFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${charcoal};">${tier.name}</div>
            <div style="font-family:${fontFamily};font-size:${labelFont}px;color:${textMuted};margin-top:1px;">${tier.subtitle}</div>
          </div>
          ${metricRows}
        </div>`;
    }

    // ── Template ─────────────────────────────────────────────────────────
    return `<style>${SS3_CSS}</style>
    <div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap * 2}px;padding:2px;overflow:hidden;">
      <div style="display:grid;grid-template-columns:1fr 1px 1fr 1px 1fr;min-height:0;overflow:hidden;">
        ${renderTier(tiers[0])}
        <div style="background:${divider};align-self:stretch;"></div>
        ${renderTier(tiers[1])}
        <div style="background:${divider};align-self:stretch;"></div>
        ${renderTier(tiers[2])}
      </div>
      <div style="border-top:1px solid ${rule};border-left:3px solid ${red};padding:${gap}px ${gap + 4}px;margin-top:${gap}px;">
        <span style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${red};">Diagnosis: </span><span style="font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};">Activity metrics are healthy. The bottleneck is win rate (24% vs. 28% target) — pipeline quality, not pipeline quantity. Fix: tighten qualification criteria and align SDR incentives to conversion, not volume.</span>
      </div>
    </div>`;
  },
};
