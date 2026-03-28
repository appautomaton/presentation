const fs = require('fs');
const path = require('path');
const INTER_DIR = path.join(__dirname, '../vendor/fonts/inter');
const INTER_CSS = [400, 600, 700].map(w => {
  const file = path.join(INTER_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${INTER_DIR}/`);
}).join('\n');

const fontFamily = "'Inter', sans-serif";
const navy       = '#123A63';
const textStrong = '#101A27';
const textMuted  = '#4E6176';
const border     = '#D7E4EE';
const borderSoft = '#E8F0F7';
const positive   = '#2E9E5A';
const negative   = '#A43C35';

module.exports = {
  id: 'data-table',
  title: 'Data Table',
  tier: 1,
  proves: 'structured evidence with comparisons',
  data: 'Regional performance summary with deltas',
  sectionLabel: 'Regional Summary',
  actionTitle: 'APAC outperformed all regions on revenue growth and margin expansion',
  source: 'Source: Regional P&L FY2025 vs FY2024',
  exhibitId: 'Exhibit 6.1',
  renderExhibit({ tokens }) {
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp([9, 13]);
    const cellPadY  = lerp([5, 11]);
    const cellPadX  = lerp([6, 14]);
    const gap       = lerp([6, 12]);

    const rows = [
      { region: 'North America', revenue: '1,500', yoy: '+8%',  ebitda: '24.2%', marginDelta: '+120bps', headcount: '4,200' },
      { region: 'EMEA',          revenue: '1,180', yoy: '+5%',  ebitda: '21.8%', marginDelta: '−40bps',  headcount: '3,800' },
      { region: 'APAC',          revenue: '840',   yoy: '+18%', ebitda: '26.1%', marginDelta: '+310bps', headcount: '2,100', highlight: true },
      { region: 'LatAm',         revenue: '360',   yoy: '+11%', ebitda: '18.5%', marginDelta: '+90bps',  headcount: '950' },
    ];

    const cell = (content, extra = '') =>
      `<td style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;${extra}">${content}</td>`;

    const rowHtml = rows.map((row) => {
      const isNegDelta = row.marginDelta.startsWith('−');
      const deltaColor = isNegDelta ? negative : positive;
      const isNegYoy   = row.yoy.startsWith('−');
      const yoyColor   = isNegYoy ? negative : positive;
      const rowBg      = row.highlight ? 'background:#EEF2F7;' : '';
      return `<tr style="border-bottom:1px solid ${borderSoft};${rowBg}">
        ${cell(row.region,      `text-align:left;font-weight:600;color:${textStrong};`)}
        ${cell(row.revenue,     `text-align:right;font-variant-numeric:tabular-nums;color:${textStrong};`)}
        ${cell(row.yoy,         `text-align:right;font-weight:600;color:${yoyColor};`)}
        ${cell(row.ebitda,      `text-align:right;font-variant-numeric:tabular-nums;color:${textStrong};`)}
        ${cell(row.marginDelta, `text-align:right;font-weight:600;color:${deltaColor};`)}
        ${cell(row.headcount,   `text-align:right;font-variant-numeric:tabular-nums;color:${textStrong};`)}
      </tr>`;
    }).join('');

    const thStyle = `padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:600;color:${textStrong};`;

    return `<style>${INTER_CSS}</style>
<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
  <table style="width:100%;border-collapse:collapse;table-layout:fixed;font-family:${fontFamily};">
    <colgroup>
      <col style="width:24%;">
      <col style="width:16%;">
      <col style="width:14%;">
      <col style="width:16%;">
      <col style="width:14%;">
      <col style="width:16%;">
    </colgroup>
    <thead>
      <tr style="border-bottom:2px solid ${navy};background:#F8FBFD;">
        <th style="${thStyle}text-align:left;">Region</th>
        <th style="${thStyle}text-align:right;">Revenue ($M)</th>
        <th style="${thStyle}text-align:right;">YoY</th>
        <th style="${thStyle}text-align:right;">EBITDA margin</th>
        <th style="${thStyle}text-align:right;">Margin \u0394</th>
        <th style="${thStyle}text-align:right;">Headcount</th>
      </tr>
    </thead>
    <tbody>
      ${rowHtml}
      <tr style="border-top:2px solid ${navy};font-weight:700;background:#F8FBFD;">
        ${cell('Total',    `text-align:left;font-weight:700;color:${textStrong};`)}
        ${cell('3,880',    `text-align:right;font-variant-numeric:tabular-nums;color:${textStrong};`)}
        ${cell('+9%',      `text-align:right;font-weight:700;color:${positive};`)}
        ${cell('23.1%',    `text-align:right;font-variant-numeric:tabular-nums;color:${textStrong};`)}
        ${cell('+130bps',  `text-align:right;font-weight:700;color:${positive};`)}
        ${cell('11,050',   `text-align:right;font-variant-numeric:tabular-nums;color:${textStrong};`)}
      </tr>
    </tbody>
  </table>
  <div style="border-left:3px solid ${navy};padding-left:${gap}px;font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};">
    <span style="font-weight:700;color:${navy};">Insight: </span>APAC's margin expansion reflects the shift to higher-margin software mix, up 12 percentage points year over year.
  </div>
</div>`;
  },
};
