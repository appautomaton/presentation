const fs = require('fs');
const path = require('path');
const INTER_DIR = path.join(__dirname, '../vendor/fonts/inter');
const INTER_CSS = [400, 600, 700].map(w => {
  const file = path.join(INTER_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${INTER_DIR}/`);
}).join('\n');

const capabilities = [
  { name: 'Procurement expertise',  current: 4.2, target: 3.8, risk: 'high',   keepers: 3, mitigation: 'Retention bonuses + 6-month knowledge transfer' },
  { name: 'Regulatory knowledge',   current: 4.5, target: 3.2, risk: 'high',   keepers: 2, mitigation: 'Dedicated documentation sprint + external advisory' },
  { name: 'Customer relationships', current: 3.8, target: 3.5, risk: 'medium', keepers: 5, mitigation: 'Client transition plan with dual coverage period' },
  { name: 'Data engineering',       current: 3.2, target: 4.0, risk: 'low',    keepers: 8, mitigation: 'Hiring pipeline active — 4 offers extended' },
  { name: 'Product management',     current: 3.6, target: 3.8, risk: 'medium', keepers: 4, mitigation: 'Cross-training program between BU product leads' },
  { name: 'Financial modeling',     current: 4.0, target: 3.9, risk: 'low',    keepers: 6, mitigation: 'Standardized model templates reduce person-dependency' },
];

module.exports = {
  id: 'capability-matrix',
  title: 'Capability Preservation Matrix',
  tier: 3,
  proves: 'current vs. target capability visibility with risk flags and mitigations',
  data: 'Capability assessment across 6 domains with preservation risk and mitigation actions',
  sectionLabel: 'Organizational Transition',
  actionTitle: 'Three critical capabilities are at risk in the transition — procurement expertise and regulatory knowledge require dedicated retention plans',
  source: 'Source: Capability assessment, HR analytics + leadership interviews',
  exhibitId: 'Exhibit 15.1',

  renderExhibit({ tokens }) {
    const navy       = '#123A63';
    const textStrong = '#101A27';
    const textMuted  = '#4E6176';
    const textLight  = '#8BA5BD';
    const border     = '#D7E4EE';
    const borderSoft = '#E8F0F7';
    const danger     = '#A43C35';
    const amber      = '#D4A017';
    const success    = '#2E9E5A';
    const fontFamily = "'Inter', sans-serif";

    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp([9,  13]);
    const microFont = lerp([7,  10]);
    const barH      = lerp([5,  8]);
    const cellPadY  = lerp([5,  11]);
    const cellPadX  = lerp([6,  14]);
    const gap       = lerp([6,  12]);

    function scoreBar(score, max = 5) {
      const pct = (score / max) * 100;
      return `<div style="display:flex;align-items:center;gap:5px;">
        <div style="flex:1;height:${barH}px;background:${borderSoft};">
          <div style="width:${pct}%;height:100%;background:${navy};"></div>
        </div>
        <span style="font-size:${microFont}px;font-weight:700;color:${textStrong};min-width:20px;">${score}</span>
      </div>`;
    }

    function riskText(risk) {
      if (risk === 'high')   return `<span style="font-size:${microFont}px;font-weight:700;color:${danger};">HIGH</span>`;
      if (risk === 'medium') return `<span style="font-size:${microFont}px;font-weight:700;color:${amber};">MED</span>`;
      return                        `<span style="font-size:${microFont}px;font-weight:700;color:${success};">LOW</span>`;
    }

    const rows = capabilities.map(c => {
      const isHigh = c.risk === 'high';
      const nameColor  = isHigh ? danger : textStrong;
      const nameWeight = isHigh ? 600 : 500;
      return `<tr style="border-bottom:1px solid ${border};">
        <td style="padding:${cellPadY}px ${cellPadX}px;font-size:${bodyFont}px;font-weight:${nameWeight};color:${nameColor};font-family:${fontFamily};">${c.name}</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;">${scoreBar(c.current)}</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;">${scoreBar(c.target)}</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;">${riskText(c.risk)}</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;text-align:center;font-size:${bodyFont}px;font-weight:700;color:${textStrong};font-family:${fontFamily};">${c.keepers}</td>
        <td style="padding:${cellPadY}px ${cellPadX}px;font-size:${microFont}px;color:${textMuted};font-family:${fontFamily};line-height:1.4;">${c.mitigation}</td>
      </tr>`;
    }).join('');

    const highRiskCount = capabilities.filter(c => c.risk === 'high').length;

    return `<style>${INTER_CSS}</style>
<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
  <div style="overflow:hidden;">
    <table style="width:100%;table-layout:fixed;border-collapse:collapse;font-family:${fontFamily};">
      <colgroup>
        <col style="width:30%;">
        <col style="width:13%;">
        <col style="width:13%;">
        <col style="width:8%;">
        <col style="width:8%;">
        <col style="width:28%;">
      </colgroup>
      <thead>
        <tr style="border-bottom:2px solid ${navy};">
          <th style="text-align:left;padding:${cellPadY}px ${cellPadX}px;font-size:${microFont}px;font-weight:700;color:${textLight};font-family:${fontFamily};text-transform:uppercase;letter-spacing:0.05em;">Capability</th>
          <th style="text-align:left;padding:${cellPadY}px ${cellPadX}px;font-size:${microFont}px;font-weight:700;color:${textLight};font-family:${fontFamily};text-transform:uppercase;letter-spacing:0.05em;">Current</th>
          <th style="text-align:left;padding:${cellPadY}px ${cellPadX}px;font-size:${microFont}px;font-weight:700;color:${textLight};font-family:${fontFamily};text-transform:uppercase;letter-spacing:0.05em;">Target</th>
          <th style="text-align:center;padding:${cellPadY}px ${cellPadX}px;font-size:${microFont}px;font-weight:700;color:${textLight};font-family:${fontFamily};text-transform:uppercase;letter-spacing:0.05em;">Risk</th>
          <th style="text-align:center;padding:${cellPadY}px ${cellPadX}px;font-size:${microFont}px;font-weight:700;color:${textLight};font-family:${fontFamily};text-transform:uppercase;letter-spacing:0.05em;">Key staff</th>
          <th style="text-align:left;padding:${cellPadY}px ${cellPadX}px;font-size:${microFont}px;font-weight:700;color:${textLight};font-family:${fontFamily};text-transform:uppercase;letter-spacing:0.05em;">Mitigation</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>
  <div style="border-left:3px solid ${danger};padding:${cellPadY}px ${cellPadX}px;">
    <span style="font-size:${bodyFont}px;color:${textStrong};font-family:${fontFamily};line-height:1.5;"><span style="font-weight:700;color:${danger};">${highRiskCount} high-risk capabilities</span> require board-level retention decisions within 30 days. Procurement and regulatory knowledge cannot be rebuilt through hiring alone — institutional memory is the asset at risk.</span>
  </div>
</div>`;
  },
};
