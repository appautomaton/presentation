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
const textLight  = '#8BA5BD';
const border     = '#D7E4EE';
const borderSoft = '#E8F0F7';

module.exports = {
  id: 'eval-grid',
  title: 'Evaluation Grid',
  tier: 2,
  proves: 'multi-criteria assessment with weighted scoring',
  data: 'Vendor evaluation across capability dimensions',
  sectionLabel: 'Vendor Assessment',
  actionTitle: 'Vendor A is the strongest weighted fit overall despite gaps on cost and integration',
  source: 'Source: Vendor RFP responses, reference checks, team assessment',
  exhibitId: 'Exhibit 10.1',
  renderExhibit({ tokens }) {
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp([9, 13]);
    const microFont = lerp([7, 10]);
    const cellPadY  = lerp([5, 11]);
    const cellPadX  = lerp([6, 14]);
    const gap       = lerp([6, 12]);

    const criteria = [
      { name: 'Scalability',    a: 5, b: 5, c: 3, d: 1, weight: '25%' },
      { name: 'Security',       a: 5, b: 3, c: 5, d: 3, weight: '20%' },
      { name: 'AI / ML',        a: 5, b: 1, c: 3, d: 5, weight: '20%' },
      { name: 'Cost efficiency', a: 1, b: 5, c: 5, d: 3, weight: '15%' },
      { name: 'Integration',    a: 3, b: 5, c: 3, d: 1, weight: '10%' },
      { name: 'Support',        a: 5, b: 3, c: 3, d: 5, weight: '10%' },
    ];

    const grayFill   = { 5: '#D9E0E8', 3: '#EEF2F6', 1: '#F7F9FB' };
    const accentFill = { 5: 'rgba(18,58,99,0.16)', 3: 'rgba(18,58,99,0.10)', 1: 'rgba(18,58,99,0.06)' };

    const scoreCell = (score, accent) => {
      const background = accent ? accentFill[score] : grayFill[score];
      const color = accent ? navy : textStrong;
      return `background:${background};color:${color};font-weight:${accent ? 700 : 600};`;
    };

    const rows = criteria.map((item) => `<tr style="border-bottom:1px solid ${borderSoft};">
      <td style="padding:${cellPadY}px ${cellPadX}px;text-align:left;color:${textStrong};font-weight:500;font-size:${bodyFont}px;">${item.name}</td>
      <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;border-left:1px solid rgba(18,58,99,0.10);border-right:1px solid rgba(18,58,99,0.10);${scoreCell(item.a, true)}">${item.a}</td>
      <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;${scoreCell(item.b, false)}">${item.b}</td>
      <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;${scoreCell(item.c, false)}">${item.c}</td>
      <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;${scoreCell(item.d, false)}">${item.d}</td>
      <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;color:${textMuted};">${item.weight}</td>
    </tr>`).join('');

    // Vendor A column center = 30% (dim col) + 7% (half of 14%) = 37%
    const labelH = microFont + 8;

    return `<style>${INTER_CSS}</style>
<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
  <div style="display:flex;flex-direction:column;min-height:0;">
    <!-- RECOMMENDED label floating above Vendor A column, outside table -->
    <div style="position:relative;height:${labelH}px;flex-shrink:0;">
      <div style="position:absolute;left:37%;transform:translateX(-50%);bottom:2px;white-space:nowrap;">
        <span style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${navy};">Recommended</span>
      </div>
    </div>
    <!-- Table -->
    <table style="width:100%;border-collapse:collapse;table-layout:fixed;font-family:${fontFamily};">
    <colgroup>
      <col style="width:30%;">
      <col style="width:14%;">
      <col style="width:14%;">
      <col style="width:14%;">
      <col style="width:14%;">
      <col style="width:14%;">
    </colgroup>
    <thead>
      <tr style="border-bottom:2px solid ${navy};">
        <th style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:600;color:${textStrong};text-align:left;">Dimension</th>
        <th style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:700;color:${navy};text-align:center;background:rgba(18,58,99,0.08);border-left:1px solid rgba(18,58,99,0.10);border-right:1px solid rgba(18,58,99,0.10);">Vendor A</th>
        <th style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:600;color:${navy};text-align:center;">Vendor B</th>
        <th style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:600;color:${navy};text-align:center;">Vendor C</th>
        <th style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:600;color:${navy};text-align:center;">Vendor D</th>
        <th style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:600;color:${navy};text-align:center;">Weight</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
      <tr style="border-top:2px solid ${navy};">
        <td style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:700;color:${navy};">Weighted score</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;font-weight:700;color:${navy};background:rgba(18,58,99,0.08);border-left:1px solid rgba(18,58,99,0.10);border-right:1px solid rgba(18,58,99,0.10);">4.2 <span style="font-size:${microFont}px;font-weight:400;color:${textMuted};">/ 5.0</span></td>
        <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;font-weight:700;color:${navy};">3.7</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;font-weight:700;color:${navy};">3.5</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;font-weight:700;color:${navy};">2.7</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;color:${textMuted};">100%</td>
      </tr>
    </tbody>
  </table>
  </div>
  <div style="border-left:3px solid ${navy};padding-left:${gap}px;font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};">
    <span style="font-weight:700;color:${navy};">Recommendation: </span>Vendor A wins on scale, security, AI/ML capability, and support. Vendor B remains the benchmark on cost and integration.
  </div>
</div>`;
  },
};
