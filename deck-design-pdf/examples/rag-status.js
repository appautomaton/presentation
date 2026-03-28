const fs = require('fs');
const path = require('path');
const INTER_DIR = path.join(__dirname, '../vendor/fonts/inter');
const INTER_CSS = [400, 600, 700].map(w => {
  const file = path.join(INTER_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${INTER_DIR}/`);
}).join('\n');

// McKinsey palette
const navy        = '#123A63';
const textStrong  = '#101A27';
const textMuted   = '#4E6176';
const textLight   = '#8BA5BD';
const border      = '#D7E4EE';
const borderSoft  = '#E8F0F7';
const danger      = '#A43C35';
const dangerBg    = 'rgba(164,60,53,0.08)';

const initiatives = [
  { name: 'Platform migration', status:'Strong', timeline:'Strong', budget:'Strong', quality:'Strong', issue:'On track' },
  { name: 'Data lake build',    status:'Strong', timeline:'Watch',  budget:'Strong', quality:'Strong', issue:'2-week delay on schema design' },
  { name: 'CRM integration',    status:'Risk',   timeline:'Risk',   budget:'Watch',  quality:'Risk',   issue:'Vendor API instability; escalated' },
  { name: 'Process redesign',   status:'Strong', timeline:'Strong', budget:'Strong', quality:'Watch',  issue:'Awaiting stakeholder sign-off' },
  { name: 'Training program',   status:'Strong', timeline:'Strong', budget:'Strong', quality:'Strong', issue:'Pilot cohort complete' },
  { name: 'Org restructure',    status:'Watch',  timeline:'Watch',  budget:'Strong', quality:'Watch',  issue:'Union consultation ongoing' },
  { name: 'Compliance update',  status:'Risk',   timeline:'Risk',   budget:'Risk',   quality:'Watch',  issue:'Regulatory scope change; re-scoping' },
  { name: 'Change management',  status:'Strong', timeline:'Strong', budget:'Strong', quality:'Strong', issue:'On track' },
];

module.exports = {
  id: 'rag-status',
  title: 'RAG Status Matrix',
  tier: 3,
  proves: 'what is on track versus at risk across initiatives',
  data: 'Transformation initiative status tracker',
  sectionLabel: 'Initiative Tracker',
  actionTitle: 'Two of eight initiatives require immediate intervention to stay on track',
  source: 'Source: PMO weekly report, March 2026',
  exhibitId: 'Exhibit 15.1',

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

    const ff = `'Inter', sans-serif`;

    // RAG cell: flat background fill on a div that fills the cell
    const ragCell = (value) => {
      let bg, color, fw;
      if (value === 'Strong') {
        bg = borderSoft; color = textMuted; fw = 600;
      } else if (value === 'Watch') {
        bg = 'rgba(18,58,99,0.08)'; color = navy; fw = 700;
      } else {
        bg = dangerBg; color = danger; fw = 700;
      }
      return `<td style="padding:0;text-align:center;">` +
        `<div style="width:100%;text-align:center;background:${bg};color:${color};` +
        `font-family:${ff};font-size:${bodyFont}px;font-weight:${fw};` +
        `padding:${cellPadY}px ${cellPadX}px;">${value}</div></td>`;
    };

    const riskCount = initiatives.filter(i =>
      i.status === 'Risk' || i.timeline === 'Risk' || i.budget === 'Risk' || i.quality === 'Risk'
    ).length;

    const rows = initiatives.map((initiative) => {
      const flagged = initiative.status === 'Risk' || initiative.timeline === 'Risk' ||
                      initiative.budget === 'Risk' || initiative.quality === 'Risk';
      return `<tr style="border-bottom:1px solid ${border};">` +
        `<td style="padding:${cellPadY}px ${cellPadX}px;text-align:left;` +
        `font-family:${ff};font-size:${bodyFont}px;` +
        `color:${flagged ? danger : textStrong};font-weight:${flagged ? 700 : 500};">${initiative.name}</td>` +
        ragCell(initiative.status) +
        ragCell(initiative.timeline) +
        ragCell(initiative.budget) +
        ragCell(initiative.quality) +
        `<td style="padding:${cellPadY}px ${cellPadX}px;text-align:left;` +
        `font-family:${ff};font-size:${microFont}px;` +
        `color:${flagged ? danger : textMuted};">${initiative.issue}</td>` +
        `</tr>`;
    }).join('');

    const thStyle = (align) =>
      `padding:${cellPadY}px ${cellPadX}px;text-align:${align};` +
      `font-family:${ff};font-size:${microFont}px;font-weight:700;` +
      `color:${navy};text-transform:uppercase;letter-spacing:0.04em;`;

    return `<style>${INTER_CSS}</style>` +
      `<div style="display:grid;grid-template-rows:minmax(0,1fr) auto;padding:2px;overflow:hidden;` +
      `width:100%;height:100%;box-sizing:border-box;font-family:${ff};">` +

      `<div style="overflow:hidden;">` +
      `<table style="width:100%;border-collapse:collapse;table-layout:fixed;">` +
      `<colgroup>` +
      `<col style="width:23%;">` +
      `<col style="width:12%;">` +
      `<col style="width:12%;">` +
      `<col style="width:12%;">` +
      `<col style="width:12%;">` +
      `<col style="width:29%;">` +
      `</colgroup>` +
      `<thead>` +
      `<tr style="border-bottom:2px solid ${navy};background:#F8FBFD;">` +
      `<th style="${thStyle('left')}">Initiative</th>` +
      `<th style="${thStyle('center')}">Status</th>` +
      `<th style="${thStyle('center')}">Timeline</th>` +
      `<th style="${thStyle('center')}">Budget</th>` +
      `<th style="${thStyle('center')}">Quality</th>` +
      `<th style="${thStyle('left')}">Key issue</th>` +
      `</tr>` +
      `</thead>` +
      `<tbody>${rows}</tbody>` +
      `</table>` +
      `</div>` +

      `<div style="margin-top:${gap}px;border-left:3px solid ${navy};padding:${gap}px ${gap + 4}px;` +
      `font-family:${ff};font-size:${microFont}px;color:${textMuted};">` +
      `<strong style="color:${textStrong};font-weight:700;">${riskCount} initiative${riskCount !== 1 ? 's' : ''} at Risk</strong>` +
      ` — escalate CRM integration and Compliance update to steering committee; assign dedicated remediation owners by end of week.` +
      `</div>` +

      `</div>`;
  },
};
