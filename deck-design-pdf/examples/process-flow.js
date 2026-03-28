const fs   = require('fs');
const path = require('path');

// Load vendored DM Sans (weights: 400, 600, 700) — BCG's typeface
const DM_SANS_DIR = path.join(__dirname, '../vendor/fonts/dm-sans');
const DM_SANS_CSS = [400, 600, 700].map(w => {
  const file = path.join(DM_SANS_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8')
    .replace(/url\(\.\//g, `url(file://${DM_SANS_DIR}/`);
}).join('\n');

// ════════════════════════════════════════════════════════════════════════
// Process Flow — BCG style
// ════════════════════════════════════════════════════════════════════════
// Stage-by-stage process card grid with bottleneck isolation.
// BCG aesthetic: DM Sans, isolation-by-color (solid green fill on
// bottleneck card), lime callout border, no rounded corners, no shadows.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap from BCG palette if needed
//   2. Data             → swap steps array (code, title, note, days, tone)
//   3. Sizing limits    → tune knobs if defaults don't fit
//
// Design notes for agents:
//   • tone: 'normal' | 'alert' | 'positive'
//   • alert = solid green fill (#0F6B4F) + white text — BCG isolation-by-color
//   • positive = lime left-border accent
//   • Columns: 2 at minDim < 450, 3 otherwise
//   • Callout: border-left:3px solid lime, plain div, no card background

module.exports = {
  id: 'process-flow',
  title: 'Process Flow',
  tier: 3,
  proves: 'how work moves through stages with bottleneck identification',
  data: 'Customer onboarding process with stage cycle times',
  sectionLabel: 'Process Analysis',
  actionTitle: 'Customer onboarding takes 47 days end-to-end with the bottleneck at compliance review',
  source: 'Source: Process mining analysis, Jan–Mar 2026 (n=2,400 cases)',
  exhibitId: 'Exhibit 16.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables (BCG palette) ────────────────────────────────
    const fontFamily = "'DM Sans', sans-serif";
    const accent     = '#0F6B4F';   // BCG dark green — bottleneck fill
    const lime       = '#6AB648';   // BCG lime green — callout + positive
    const charcoal   = '#111111';
    const textMuted  = '#5F6368';
    const border     = '#D0D0D0';

    // ── 2. Data ─────────────────────────────────────────────────────────
    // tone: 'normal' | 'alert' (bottleneck, solid green fill) | 'positive'
    const steps = [
      { code: '01', title: 'Application',   note: 'Submit docs',      days: '3 days',  tone: 'normal'   },
      { code: '02', title: 'KYC Review',    note: 'Identity & risk',  days: '5 days',  tone: 'normal'   },
      { code: '03', title: 'Compliance',    note: 'Regulatory check', days: '18 days', tone: 'alert'    },
      { code: '04', title: 'Account Setup', note: 'Systems config',   days: '7 days',  tone: 'normal'   },
      { code: '05', title: 'Training',      note: 'User enablement',  days: '8 days',  tone: 'normal'   },
      { code: '06', title: 'Go Live',       note: 'Active customer',  days: '6 days',  tone: 'positive' },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const bodyFontRange  = [9,  13];   // [min, max] px for stage title + days
    const microFontRange = [7,  10];   // [min, max] px for note, tag label
    const stepFontRange  = [11, 16];   // [min, max] px for stage code number
    const padRange       = [8,  14];   // [min, max] px card padding
    const gapRange       = [6,  12];   // [min, max] px card grid gap

    // ── Responsive sizing (computed — don't edit) ────────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp(bodyFontRange);
    const microFont = lerp(microFontRange);
    const stepFont  = lerp(stepFontRange);
    const pad       = lerp(padRange);
    const gap       = lerp(gapRange);

    // Reflow: 2 cols at compact widths, 3 at reference+
    const cols = minDim < 450 ? 2 : 3;

    // ── Card renderer ────────────────────────────────────────────────────
    const cards = steps.map(step => {
      const isAlert    = step.tone === 'alert';
      const isPositive = step.tone === 'positive';

      const bg         = isAlert ? accent : 'transparent';
      const borderStyle = isAlert
        ? `border:1px solid ${accent};`
        : isPositive
          ? `border:1px solid ${border};border-left:3px solid ${lime};`
          : `border:1px solid ${border};`;
      const codeColor  = isAlert ? '#FFFFFF' : accent;
      const titleColor = isAlert ? '#FFFFFF' : charcoal;
      const noteColor  = isAlert ? 'rgba(255,255,255,0.75)' : textMuted;
      const daysColor  = isAlert ? '#FFFFFF' : charcoal;
      const tagColor   = isAlert ? 'rgba(255,255,255,0.6)' : textMuted;
      const tagText    = isAlert ? 'Bottleneck' : isPositive ? 'Outcome' : 'Avg cycle';

      return `<div style="${borderStyle}background:${bg};padding:${pad}px;display:flex;flex-direction:column;gap:${Math.round(pad / 2)}px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:4px;">
          <div style="font-family:${fontFamily};font-size:${stepFont}px;font-weight:700;color:${codeColor};line-height:1;">${step.code}</div>
          <div style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${daysColor};text-align:right;line-height:1.2;">${step.days}</div>
        </div>
        <div>
          <div style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${titleColor};line-height:1.2;">${step.title}</div>
          <div style="font-family:${fontFamily};font-size:${microFont}px;color:${noteColor};margin-top:2px;">${step.note}</div>
        </div>
        <div style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;color:${tagColor};text-transform:uppercase;letter-spacing:0.06em;margin-top:auto;">${tagText}</div>
      </div>`;
    }).join('');

    // ── Template ─────────────────────────────────────────────────────────
    return `<style>${DM_SANS_CSS}</style>
    <div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
      <div style="display:grid;grid-template-columns:repeat(${cols},minmax(0,1fr));gap:${gap}px;align-content:start;">
        ${cards}
      </div>
      <div style="border-left:3px solid ${lime};padding:${Math.round(gap / 2)}px ${gap + 2}px;">
        <span style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${accent};">Bottleneck: </span><span style="font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};">Automating compliance pre-screening could cut the bottleneck from 18 to 7 days, reducing total cycle time by 23%.</span>
      </div>
    </div>`;
  },
};
