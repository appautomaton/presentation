const fs   = require('fs');
const path = require('path');

// Load vendored Inter (weights used: 400, 600, 700) and rewrite url() to absolute file:// paths
const INTER_DIR = path.join(__dirname, '../vendor/fonts/inter');
const INTER_CSS = [400, 600, 700].map(w => {
  const file = path.join(INTER_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8')
    .replace(/url\(\.\//g, `url(file://${INTER_DIR}/`);
}).join('\n');

// ════════════════════════════════════════════════════════════════════════
// RAPID Decision Map — McKinsey style
// ════════════════════════════════════════════════════════════════════════
// Decision-rights matrix: decisions (rows, paired Now/Target) × roles (columns).
// McKinsey aesthetic: Inter, navy anchored, clean grid, no shadows.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap from McKinsey palette if needed
//   2. Data             → swap decisions, roles, and RAPID assignments
//   3. Sizing limits    → tune knobs if defaults don't fit
//
// Layout notes for agents:
//   • decisions[] = row groups (each has current[] and target[] arrays of RAPID letters)
//   • roles[]     = column headers
//   • RAPID letters: D=Decide, R=Recommend, A=Agree, P=Perform, I=Input
//   • Cells where target !== current get a 2px accent border (changed signal)

module.exports = {
  id: 'rapid-map',
  title: 'RAPID Decision Map',
  tier: 3,
  proves: 'decision-rights clarity (who Recommends, Agrees, Performs, has Input, Decides)',
  data: 'Current vs. target decision authority across 5 key decisions and 6 roles',
  sectionLabel: 'Decision Governance',
  actionTitle: 'Pricing authority is diffused across 5 roles today; target model consolidates Decide to BU Head',
  source: 'Source: Organizational design team, March 2026',
  exhibitId: 'Exhibit 7.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables (McKinsey palette) ───────────────────────────
    const fontFamily   = "'Inter', sans-serif";
    const navy         = '#123A63';   // McKinsey navy — structural anchor
    const blue         = '#2E7D9B';   // medium blue — accent / changed border
    const textStrong   = '#111827';
    const textMuted    = '#6B7280';
    const textLight    = '#9CA3AF';
    const border       = '#D1D5DB';   // gridlines
    const borderSoft   = '#E5E7EB';

    // RAPID cell styles
    const rapidColors = {
      D: { bg: navy,       text: '#FFFFFF' },   // Decide — solid navy, most authority
      R: { bg: blue,       text: '#FFFFFF' },   // Recommend — solid medium blue
      A: { bg: '#E8F0F7',  text: navy       },  // Agree — light blue tint, navy text
      P: { bg: '#F0F2F4',  text: textMuted  },  // Perform — light gray, muted
      I: { bg: 'transparent', text: textLight }, // Input — bare, least authority
    };

    // ── 2. Data ─────────────────────────────────────────────────────────
    const roles = ['CEO', 'BU Head', 'CFO', 'Regional VP', 'Sales Dir', 'Legal'];
    const decisions = [
      { name: 'Pricing >10% discount',   current: ['A','A','A','R','D','I'], target: ['I','D','A','R','P','I'] },
      { name: 'New product launch',       current: ['D','R','I','I','I','A'], target: ['A','D','I','P','R','A'] },
      { name: 'Capital allocation >$5M',  current: ['D','R','A','I','I','I'], target: ['D','R','A','I','I','I'] },
      { name: 'Hiring above plan',        current: ['A','I','D','R','I','I'], target: ['I','D','A','R','I','I'] },
      { name: 'Vendor contract >$1M',     current: ['A','I','D','I','I','A'], target: ['I','R','D','I','I','A'] },
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const cellFontRange     = [10, 13]; // [min, max] px for cell letter
    const decisionFontRange = [10, 13]; // [min, max] px for decision name
    const headerFontRange   = [9,  12]; // [min, max] px for role column headers
    const stateFontRange    = [8,  11]; // [min, max] px for Now/Target labels
    const legendFontRange   = [9,  11]; // [min, max] px for legend text
    const cellPadRange      = [3,  6];  // [min, max] px vertical cell padding
    const gapRange          = [2,  5];  // [min, max] px layout gap

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const cellFont   = lerp(cellFontRange);
    const decFont    = lerp(decisionFontRange);
    const headerFont = lerp(headerFontRange);
    const stateFont  = lerp(stateFontRange);
    const legendFont = lerp(legendFontRange);
    const cellPad    = lerp(cellPadRange);
    const gap        = lerp(gapRange);

    // ── Helper: <td> style for a RAPID cell ─────────────────────────────
    // Color goes directly on the td — no inner pill div.
    // Changed cells use outline (doesn't disturb border-collapse layout).
    function cellTdStyle(letter, changed) {
      const c = rapidColors[letter] || { bg: 'transparent', text: textLight };
      const outline = changed ? `outline:2px solid ${blue};outline-offset:-2px;` : '';
      return `text-align:center;padding:${cellPad}px ${gap}px;border-left:1px solid ${borderSoft};background:${c.bg};color:${c.text};font-family:${fontFamily};font-size:${cellFont}px;font-weight:700;${outline}`;
    }

    // ── Role column headers ──────────────────────────────────────────────
    const headerCells = roles.map(r =>
      `<th style="text-align:center;padding:${gap}px ${gap + 2}px;font-family:${fontFamily};font-size:${headerFont}px;font-weight:600;color:${navy};border-left:1px solid ${borderSoft};">${r}</th>`
    ).join('');

    // ── Decision rows (each decision = 2 rows: Now + Target) ────────────
    const bodyRows = decisions.map((d, di) => {
      const rowBorderBottom = di < decisions.length - 1
        ? `border-bottom:1px solid ${border};`
        : '';

      const nowCells = d.current.map(l =>
        `<td style="${cellTdStyle(l, false)}">${l}</td>`
      ).join('');

      const targetCells = d.target.map((l, i) =>
        `<td style="${cellTdStyle(l, l !== d.current[i])}">${l}</td>`
      ).join('');

      return `<tr style="border-bottom:1px solid ${borderSoft};">
          <td rowspan="2" style="padding:${gap + 2}px ${gap + 4}px;vertical-align:middle;width:24%;${rowBorderBottom}">
            <span style="font-family:${fontFamily};font-size:${decFont}px;font-weight:600;color:${textStrong};line-height:1.3;">${d.name}</span>
          </td>
          <td style="text-align:center;padding:${gap}px ${gap + 2}px;white-space:nowrap;">
            <span style="font-family:${fontFamily};font-size:${stateFont}px;font-weight:400;color:${textMuted};">Now</span>
          </td>
          ${nowCells}
        </tr>
        <tr style="${rowBorderBottom}">
          <td style="text-align:center;padding:${gap}px ${gap + 2}px;white-space:nowrap;border-bottom:1px solid ${border};">
            <span style="font-family:${fontFamily};font-size:${stateFont}px;font-weight:700;color:${navy};">Target</span>
          </td>
          ${targetCells}
        </tr>`;
    }).join('');

    // ── Legend ───────────────────────────────────────────────────────────
    const legendItems = [
      { l: 'D', n: 'Decide' },
      { l: 'R', n: 'Recommend' },
      { l: 'A', n: 'Agree' },
      { l: 'P', n: 'Perform' },
      { l: 'I', n: 'Input' },
    ];
    const swatchSize = legendFont + 4;
    const legendDots = legendItems.map(x => {
      const c = rapidColors[x.l];
      const bg = c.bg === 'transparent' ? borderSoft : c.bg;
      return `<div style="display:flex;align-items:center;gap:${gap + 1}px;">
        <div style="width:${swatchSize}px;height:${swatchSize}px;background:${bg};flex-shrink:0;"></div>
        <span style="font-family:${fontFamily};font-size:${legendFont}px;color:${textMuted};">${x.l} = ${x.n}</span>
      </div>`;
    }).join('');

    const changedNote = `<div style="display:flex;align-items:center;gap:${gap + 1}px;margin-left:auto;">
      <div style="width:${swatchSize}px;height:${swatchSize}px;outline:2px solid ${blue};outline-offset:-2px;flex-shrink:0;"></div>
      <span style="font-family:${fontFamily};font-size:${legendFont}px;color:${textMuted};">changed from current</span>
    </div>`;

    // ── Template ─────────────────────────────────────────────────────────
    return `<style>${INTER_CSS}</style><div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
      <div style="overflow:auto;min-height:0;">
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:2px solid ${navy};">
              <th style="text-align:left;padding:${gap + 2}px ${gap + 4}px;font-family:${fontFamily};font-size:${headerFont}px;font-weight:700;color:${navy};text-transform:uppercase;letter-spacing:0.05em;width:24%;">Decision</th>
              <th style="text-align:center;padding:${gap}px ${gap + 2}px;font-family:${fontFamily};font-size:${headerFont}px;font-weight:600;color:${textMuted};width:7%;">State</th>
              ${headerCells}
            </tr>
          </thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:${gap + 6}px;padding:${gap}px ${gap + 2}px;border-top:1px solid ${borderSoft};">
        ${legendDots}
        ${changedNote}
      </div>
    </div>`;
  },
};
