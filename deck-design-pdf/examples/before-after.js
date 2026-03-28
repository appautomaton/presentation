const fs = require('fs');
const path = require('path');
const SS3_DIR = path.join(__dirname, '../vendor/fonts/source-sans-3');
const SS3_CSS = [400, 600, 700].map(w => {
  const file = path.join(SS3_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${SS3_DIR}/`);
}).join('\n');

module.exports = {
  id: 'before-after',
  title: 'Before / After',
  tier: 3,
  proves: 'impact of intervention across mixed units',
  data: 'Operational metrics before and after process automation',
  sectionLabel: 'Impact Assessment',
  actionTitle: 'Process automation reduced cycle time by 42% and error rate by 68%',
  source: 'Source: Operations dashboard, 90-day post-implementation review',
  exhibitId: 'Exhibit 19.1',

  renderExhibit({ tokens }) {
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const fontFamily = "'Source Sans 3', sans-serif";
    const red       = '#CC0000';
    const charcoal  = '#2B2B2B';
    const textMuted = '#666666';
    const textFine  = '#888888';
    const rule      = '#E0E0E0';

    const bodyFont  = lerp([9, 13]);
    const microFont = lerp([7, 10]);
    const deltaFont = lerp([16, 24]);
    const pad       = lerp([8, 14]);
    const gap       = lerp([6, 12]);

    const cols = minDim < 450 ? 2 : 3;

    const metrics = [
      { name: 'Error rate',   before: '12.4%',   after: '4.0%',    delta: '−68%' },
      { name: 'Manual steps', before: '23',       after: '8',        delta: '−65%' },
      { name: 'Cycle time',   before: '47 days',  after: '27 days',  delta: '−42%' },
      { name: 'Throughput',   before: '340/day',  after: '580/day',  delta: '+71%' },
      { name: 'Cost per txn', before: '$8.50',    after: '$3.20',    delta: '−62%' },
    ];

    const cards = metrics.map(metric => `
      <div style="
        display:flex;
        flex-direction:column;
        gap:${Math.max(gap - 2, 4)}px;
        padding:${pad}px;
        border:1px solid ${rule};
        background:transparent;
        font-family:${fontFamily};
        overflow:hidden;
      ">
        <div style="
          font-size:${bodyFont}px;
          font-weight:700;
          color:${charcoal};
          font-family:${fontFamily};
          line-height:1.2;
        ">${metric.name}</div>
        <div style="
          font-size:${deltaFont}px;
          font-weight:700;
          color:${red};
          font-family:${fontFamily};
          line-height:1;
        ">${metric.delta}</div>
        <div style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:${Math.max(gap - 2, 4)}px;
        ">
          <div>
            <div style="
              font-size:${microFont}px;
              font-weight:400;
              color:${textFine};
              font-family:${fontFamily};
              text-transform:uppercase;
              letter-spacing:0.05em;
              line-height:1.2;
            ">BEFORE</div>
            <div style="
              font-size:${bodyFont + 2}px;
              font-weight:400;
              color:${textMuted};
              font-family:${fontFamily};
              line-height:1.3;
              margin-top:2px;
            ">${metric.before}</div>
          </div>
          <div>
            <div style="
              font-size:${microFont}px;
              font-weight:400;
              color:${textFine};
              font-family:${fontFamily};
              text-transform:uppercase;
              letter-spacing:0.05em;
              line-height:1.2;
            ">AFTER</div>
            <div style="
              font-size:${bodyFont + 2}px;
              font-weight:700;
              color:${charcoal};
              font-family:${fontFamily};
              line-height:1.3;
              margin-top:2px;
            ">${metric.after}</div>
          </div>
        </div>
      </div>
    `).join('');

    return `
      <style>${SS3_CSS}</style>
      <div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
        <div style="
          display:grid;
          grid-template-columns:repeat(${cols}, minmax(0,1fr));
          grid-auto-rows:minmax(0,1fr);
          gap:${gap}px;
          overflow:hidden;
        ">
          ${cards}
        </div>
        <div style="
          border-left:3px solid ${red};
          padding:${Math.round(pad * 0.6)}px ${pad}px;
          font-size:${bodyFont}px;
          font-family:${fontFamily};
          color:${charcoal};
          line-height:1.4;
        ">
          Automation improved all five tracked metrics simultaneously, increasing throughput while reducing cost to serve.
        </div>
      </div>
    `;
  },
};
