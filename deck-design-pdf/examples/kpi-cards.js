const fs = require('fs');
const path = require('path');
const SS3_DIR = path.join(__dirname, '../vendor/fonts/source-sans-3');
const SS3_CSS = [400, 600, 700].map(w => {
  const file = path.join(SS3_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${SS3_DIR}/`);
}).join('\n');

module.exports = {
  id: 'kpi-cards',
  title: 'KPI Cards',
  tier: 1,
  proves: 'headline metrics at a glance',
  data: 'Q4 2025 operating metrics dashboard',
  sectionLabel: 'Q4 2025 Scorecard',
  actionTitle: 'All operating metrics are trending positive except customer acquisition cost',
  source: 'Source: Finance & RevOps, Q4 2025 close',
  exhibitId: 'Exhibit 5.1',
  renderExhibit({ tokens }) {
    const fontFamily = "'Source Sans 3', sans-serif";
    const red       = '#CC0000';
    const charcoal  = '#2B2B2B';
    const textMuted = '#666666';
    const textFine  = '#888888';
    const rule      = '#E0E0E0';
    const success   = '#2E9E5A';

    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp([9, 13]);
    const microFont = lerp([7, 10]);
    const valueFont = lerp([20, 32]);
    const pad       = lerp([8, 14]);
    const gap       = lerp([6, 12]);

    const cols = minDim < 450 ? 2 : 3;

    const cards = [
      { tag: 'REV',    value: '$4.2B',  label: 'Annual revenue',           delta: '+12% YoY',         tone: 'accent' },
      { tag: 'MARGIN', value: '23.4%',  label: 'EBITDA margin',             delta: '+180bps YoY',      tone: 'accent' },
      { tag: 'NRR',    value: '118%',   label: 'Net revenue retention',     delta: '+3pp YoY',         tone: 'accent' },
      { tag: 'ENT',    value: '2,847',  label: 'Enterprise customers',      delta: '+340 net new',     tone: 'accent' },
      { tag: 'CAC',    value: '$48K',   label: 'Customer acquisition cost', delta: '+22% YoY',         tone: 'alert'  },
      { tag: 'LTV',    value: '5.2x',   label: 'LTV:CAC ratio',             delta: 'Above 3x target',  tone: 'accent' },
    ];

    const cardsHtml = cards.map((card) => {
      const valueColor = card.tone === 'alert' ? red : charcoal;
      const deltaColor = card.tone === 'alert' ? red : success;
      return `<div style="border:1px solid ${rule};background:transparent;padding:${pad}px;display:flex;flex-direction:column;gap:${Math.max(gap - 2, 4)}px;">
        <div style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;color:${textFine};letter-spacing:0.08em;text-transform:uppercase;">${card.tag}</div>
        <div style="font-family:${fontFamily};font-size:${valueFont}px;font-weight:700;color:${valueColor};line-height:1.1;">${card.value}</div>
        <div style="font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};">${card.label}</div>
        <div style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:600;color:${deltaColor};margin-top:auto;">${card.delta}</div>
      </div>`;
    }).join('');

    const callout = `<div style="border-left:3px solid ${red};padding:${Math.round(pad * 0.75)}px ${pad}px;font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};">All operating metrics trending positive except customer acquisition cost, which is up 22% YoY — LTV:CAC ratio of 5.2x remains above the 3x threshold.</div>`;

    return `<style>${SS3_CSS}</style>
<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
  <div style="display:grid;grid-template-columns:repeat(${cols}, minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:${gap}px;">
    ${cardsHtml}
  </div>
  ${callout}
</div>`;
  },
};
