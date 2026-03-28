const fs = require('fs');
const path = require('path');
const INTER_DIR = path.join(__dirname, '../vendor/fonts/inter');
const INTER_CSS = [400, 600, 700].map(w => {
  const file = path.join(INTER_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${INTER_DIR}/`);
}).join('\n');

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------
const navy        = '#123A63';
const blue        = '#2E7D9B';
const textStrong  = '#101A27';
const textMuted   = '#4E6176';
const textLight   = '#8BA5BD';
const border      = '#D7E4EE';
const borderSoft  = '#E8F0F7';
const success     = '#2E9E5A';
const danger      = '#A43C35';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const segments = ['Enterprise', 'Mid-Market', 'SMB', 'New Logos'];
const channels = [
  { name: 'Field Sales',         cells: [{ lev:'H', dir:'→' },{ lev:'M', dir:'↑' },{ lev:'M', dir:'↓' },{ lev:'L', dir:'↑' }], net: '−15' },
  { name: 'Inside Sales',        cells: [{ lev:'L', dir:'→' },{ lev:'H', dir:'→' },{ lev:'H', dir:'↓' },{ lev:'M', dir:'↑' }], net: '−10' },
  { name: 'Channel Partners',    cells: [{ lev:'M', dir:'→' },{ lev:'L', dir:'↑' },{ lev:'M', dir:'→' },{ lev:'L', dir:'→' }], net: '+5'  },
  { name: 'Digital / Self-Serve',cells: [{ lev:'L', dir:'→' },{ lev:'L', dir:'↑' },{ lev:'L', dir:'↑' },{ lev:'M', dir:'↑' }], net: '+20' },
];
const summaryMetrics = [
  { val: '0',     label: 'net headcount change'    },
  { val: '+$18M', label: 'projected revenue uplift' },
  { val: '6 mo',  label: 'full ramp to target'      },
];

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------
module.exports = {
  id:           'coverage-matrix',
  title:        'Coverage / Reallocation Matrix',
  tier:         3,
  proves:       'current vs. recommended resource allocation across channels and segments',
  data:         'Sales coverage reallocation across 4 channels × 4 segments',
  sectionLabel: 'Commercial Reallocation',
  actionTitle:  'Shift 40 sales reps from low-ROI SMB field coverage to high-growth Mid-Market digital',
  source:       'Source: Sales capacity model, CRO planning team',
  exhibitId:    'Exhibit 13.1',

  renderExhibit({ tokens }) {
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp([9,  13]);
    const microFont = lerp([7,  10]);
    const badgeW    = lerp([18, 26]);
    const cellPadY  = lerp([5,  11]);
    const cellPadX  = lerp([6,  14]);
    const gap       = lerp([6,  12]);
    const statFont  = lerp([14, 20]);

    // H/M/L badge styles
    const levBg    = { H: navy,       M: blue,  L: borderSoft };
    const levColor = { H: '#ffffff',  M: '#fff', L: textMuted  };

    // Arrow colours
    const arrowColor = { '↑': success, '↓': danger, '→': textLight };

    // ------------------------------------------------------------------
    // Thead
    // ------------------------------------------------------------------
    const thBase = `padding:${cellPadY}px ${cellPadX}px;font-family:'Inter',sans-serif;font-size:${microFont}px;font-weight:600;color:${textMuted};text-transform:uppercase;letter-spacing:0.04em;`;

    const headerCells = segments.map(s =>
      `<th style="${thBase}text-align:center;">${s}</th>`
    ).join('');

    // ------------------------------------------------------------------
    // Tbody
    // ------------------------------------------------------------------
    const bodyRows = channels.map((ch, ri) => {
      const rowBorder = ri < channels.length - 1
        ? `border-bottom:1px solid ${borderSoft};`
        : '';

      const dataCells = ch.cells.map(c => {
        const bg  = levBg[c.lev];
        const fg  = levColor[c.lev];
        const arr = arrowColor[c.dir];
        return `<td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:3px;">
            <div style="width:${badgeW}px;height:${badgeW}px;background:${bg};color:${fg};display:flex;align-items:center;justify-content:center;font-family:'Inter',sans-serif;font-size:${microFont}px;font-weight:700;">${c.lev}</div>
            <span style="font-family:'Inter',sans-serif;font-size:${microFont}px;font-weight:700;color:${arr};">${c.dir}</span>
          </div>
        </td>`;
      }).join('');

      const netColor = ch.net.startsWith('+') ? success
                     : ch.net.startsWith('−') ? danger
                     : textLight;

      return `<tr style="${rowBorder}">
        <td style="padding:${cellPadY}px ${cellPadX}px;font-family:'Inter',sans-serif;font-size:${bodyFont}px;font-weight:600;color:${textStrong};">${ch.name}</td>
        ${dataCells}
        <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-family:'Inter',sans-serif;font-size:${bodyFont}px;font-weight:700;color:${netColor};">${ch.net}</td>
      </tr>`;
    }).join('');

    // ------------------------------------------------------------------
    // Summary strip
    // ------------------------------------------------------------------
    const statsHtml = summaryMetrics.map(m =>
      `<div style="display:flex;align-items:baseline;gap:${Math.round(gap * 0.6)}px;">
        <span style="font-family:'Inter',sans-serif;font-size:${statFont}px;font-weight:700;color:${navy};">${m.val}</span>
        <span style="font-family:'Inter',sans-serif;font-size:${microFont}px;color:${textMuted};">${m.label}</span>
      </div>`
    ).join('');

    // ------------------------------------------------------------------
    // Insight callout
    // ------------------------------------------------------------------
    const callout = `<div style="border-left:3px solid ${navy};padding:${Math.round(cellPadY * 0.8)}px ${cellPadX}px;font-family:'Inter',sans-serif;font-size:${microFont}px;color:${textMuted};line-height:1.4;">
      Digital and Channel routes require net FTE additions; Enterprise Field and Inside Sales absorb the reductions—net org impact is flat.
    </div>`;

    // ------------------------------------------------------------------
    // Full layout
    // ------------------------------------------------------------------
    return `<style>${INTER_CSS}</style>
<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">

  <div style="overflow:auto;">
    <table style="width:100%;table-layout:fixed;border-collapse:collapse;">
      <colgroup>
        <col style="width:28%;">
        <col style="width:minmax(0,1fr);">
        <col style="width:minmax(0,1fr);">
        <col style="width:minmax(0,1fr);">
        <col style="width:minmax(0,1fr);">
        <col style="width:10%;">
      </colgroup>
      <thead>
        <tr style="border-bottom:2px solid ${navy};">
          <th style="${thBase}text-align:left;">Channel</th>
          ${headerCells}
          <th style="${thBase}text-align:center;">Net&nbsp;Δ&nbsp;FTEs</th>
        </tr>
      </thead>
      <tbody>${bodyRows}</tbody>
    </table>
  </div>

  <div style="display:flex;flex-direction:column;gap:${gap}px;">
    ${callout}
    <div style="border-top:1px solid ${border};padding-top:${gap}px;display:flex;gap:${gap * 3}px;flex-wrap:wrap;">
      ${statsHtml}
    </div>
  </div>

</div>`;
  },
};
