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
// Communication Cascade — Bain style
// ════════════════════════════════════════════════════════════════════════
// Stakeholder messaging plan: 5 audience tiers × messages over 4 weeks.
// Bain aesthetic: Source Sans 3, red right-border on tier labels,
// message cards as inline blocks with flex-wrap (no fixed column grid).
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap from Bain palette if needed
//   2. Data             → swap tiers and msgs arrays
//   3. Sizing limits    → tune knobs if defaults don't fit
//
// Design notes for agents:
//   • tiers[] rows, each with msgs[] (week number + label + format)
//   • Tier labels: narrow left column with 2px red right-border
//   • Messages: flex-wrap in right column — 2 per row if space allows
//   • No fixed week columns — avoids overflow at small widths
//   • No FA icons — format shown as plain text label
//   • Callout: border-left:3px solid red, plain div, no card background

module.exports = {
  id: 'communication-cascade',
  title: 'Communication Cascade',
  tier: 3,
  proves: 'who hears what, when, from whom — sequenced stakeholder messaging plan',
  data: 'Change communication plan across 5 audience tiers over 4 weeks',
  sectionLabel: 'Change Management',
  actionTitle: 'Communication must cascade from ExCo to frontline in 4 weeks — each tier hears from the tier above, not from corporate',
  source: 'Source: Change management office, communication plan v2',
  exhibitId: 'Exhibit 14.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables (Bain palette) ───────────────────────────────
    const fontFamily = "'Source Sans 3', sans-serif";
    const charcoal   = '#2B2B2B';
    const red        = '#CC0000';   // Bain red — tier border + callout
    const textMuted  = '#666666';
    const textFine   = '#888888';
    const rule       = '#E0E0E0';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const tiers = [
      { audience: 'ExCo / Board',    from: 'CEO',
        msgs: [{ week: 1, label: 'Strategic rationale & decision brief', format: 'In-person' }] },
      { audience: 'SVP / VP',        from: 'ExCo sponsors',
        msgs: [{ week: 1, label: 'Detailed plan & FAQ prep', format: 'Workshop' }, { week: 2, label: 'Q&A debrief', format: 'Virtual' }] },
      { audience: 'Directors',       from: 'SVP / VP',
        msgs: [{ week: 2, label: 'Team impact & role changes', format: 'In-person' }, { week: 3, label: 'Manager toolkit rollout', format: 'Email + deck' }] },
      { audience: 'Managers',        from: 'Directors',
        msgs: [{ week: 3, label: 'Frontline talking points', format: 'Team meeting' }, { week: 4, label: 'Feedback collection', format: 'Survey' }] },
      { audience: 'Frontline Staff', from: 'Managers',
        msgs: [{ week: 4, label: "What changes & what doesn't", format: 'Town hall + FAQ' }] },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const tierColWRange  = [80, 130];   // [min, max] px for tier label column
    const bodyFontRange  = [9,  13];    // [min, max] px for tier name + message text
    const microFontRange = [7,  10];    // [min, max] px for week label, format, "from"
    const padRange       = [5,  10];    // [min, max] px outer padding
    const gapRange       = [6,  12];    // [min, max] px vertical gap between rows
    const rowPadRange    = [4,  8];     // [min, max] px cell padding

    // ── Responsive sizing (computed — don't edit) ────────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const tierColW  = lerp(tierColWRange);
    const bodyFont  = lerp(bodyFontRange);
    const microFont = lerp(microFontRange);
    const pad       = lerp(padRange);
    const gap       = lerp(gapRange);
    const rowPad    = lerp(rowPadRange);

    // ── Tier rows ────────────────────────────────────────────────────────
    const tierRows = tiers.map((tier, i) => {
      const isLast = i === tiers.length - 1;
      const rowBorder = isLast ? '' : `border-bottom:1px solid ${rule};`;

      const msgBlocks = tier.msgs.map(m =>
        `<div style="display:inline-flex;flex-direction:column;gap:1px;padding:${rowPad}px ${rowPad + 2}px;border:1px solid ${rule};margin:${Math.round(gap / 4)}px ${Math.round(gap / 2)}px ${Math.round(gap / 4)}px 0;">
          <div style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;color:${textFine};text-transform:uppercase;letter-spacing:0.05em;">Wk ${m.week}</div>
          <div style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:600;color:${charcoal};line-height:1.3;">${m.label}</div>
          <div style="font-family:${fontFamily};font-size:${microFont}px;color:${textMuted};">${m.format}</div>
        </div>`
      ).join('');

      return `<div style="display:grid;grid-template-columns:${tierColW}px minmax(0,1fr);${rowBorder}align-items:center;">
        <div style="padding:${rowPad}px ${rowPad + 2}px;border-right:2px solid ${red};align-self:stretch;display:flex;flex-direction:column;justify-content:center;">
          <div style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${charcoal};line-height:1.2;">${tier.audience}</div>
          <div style="font-family:${fontFamily};font-size:${microFont}px;color:${textFine};margin-top:1px;">from: ${tier.from}</div>
        </div>
        <div style="padding:${rowPad}px 0 ${rowPad}px ${rowPad + 2}px;display:flex;flex-wrap:wrap;align-items:flex-start;align-content:flex-start;">
          ${msgBlocks}
        </div>
      </div>`;
    }).join('');

    // ── Template ─────────────────────────────────────────────────────────
    return `<style>${SS3_CSS}</style>
    <div class="h-full w-full" style="display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:0;padding:2px;overflow:hidden;">
      <!-- Header -->
      <div style="display:grid;grid-template-columns:${tierColW}px minmax(0,1fr);border-bottom:2px solid ${charcoal};padding-bottom:${rowPad}px;margin-bottom:${rowPad}px;">
        <div style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${textFine};">Audience</div>
        <div style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${textFine};padding-left:${rowPad + 2}px;">Communication plan (4-week cascade)</div>
      </div>
      <!-- Tier rows -->
      <div style="display:flex;flex-direction:column;min-height:0;overflow:hidden;">
        ${tierRows}
      </div>
      <!-- Callout -->
      <div style="border-top:1px solid ${rule};border-left:3px solid ${red};padding:${rowPad}px ${pad + 4}px;margin-top:${rowPad}px;">
        <span style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${red};">Principle: </span><span style="font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};">Each tier hears from their direct leadership — never skip levels. Corporate email follows, not leads. Feedback loops close within 48 hours.</span>
      </div>
    </div>`;
  },
};
