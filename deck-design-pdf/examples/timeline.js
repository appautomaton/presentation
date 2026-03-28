const fs = require('fs');
const path = require('path');
const DM_SANS_DIR = path.join(__dirname, '../vendor/fonts/dm-sans');
const DM_SANS_CSS = [400, 600, 700].map(w => {
  const file = path.join(DM_SANS_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${DM_SANS_DIR}/`);
}).join('\n');

module.exports = {
  id: 'timeline',
  title: 'Timeline / Milestones',
  tier: 3,
  proves: 'key dates and markers on a horizontal axis',
  data: 'Product launch timeline with milestones',
  sectionLabel: 'Launch Plan',
  actionTitle: 'Product launch targets GA release in September with three gates before scale',
  source: 'Source: Product team, March 2026',
  exhibitId: 'Exhibit 17.1',
  renderExhibit({ tokens }) {
    const accent    = '#0F6B4F';
    const lime      = '#6AB648';
    const charcoal  = '#111111';
    const textMuted = '#5F6368';
    const border    = '#D0D0D0';
    const fontFamily = "'DM Sans', sans-serif";

    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp([9,  13]);
    const microFont = lerp([7,  10]);
    const dotW      = lerp([24, 36]);
    const gap       = lerp([6,  12]);

    const milestones = [
      { date: 'Apr 2026', code: 'KO', title: 'Kickoff',     note: 'Team formed',        highlight: false },
      { date: 'Jun 2026', code: 'AL', title: 'Alpha',        note: 'Internal test',      highlight: false },
      { date: 'Aug 2026', code: 'BT', title: 'Beta',         note: '50 design partners', highlight: false },
      { date: 'Sep 2026', code: 'GA', title: 'GA release',   note: 'Press launch',       highlight: true  },
      { date: 'Nov 2026', code: 'SC', title: 'Scale',        note: 'Enterprise rollout', highlight: false },
      { date: 'Q1 2027',  code: 'RV', title: 'Review',       note: 'V2 roadmap',         highlight: false },
    ];

    // Vertical offset of the connector line centre within the relative wrapper:
    // date label row height ≈ microFont * 1.4 line-height + gap below it
    const dateRowH = Math.round(microFont * 1.4) + gap;
    const lineTop  = dateRowH + Math.round(dotW / 2);

    const cols = milestones.map(m => {
      const squareStyle = [
        `width:${dotW}px`,
        `height:${dotW}px`,
        `display:flex`,
        `align-items:center`,
        `justify-content:center`,
        `font-family:${fontFamily}`,
        `font-size:${microFont}px`,
        `font-weight:700`,
        `position:relative`,
        `z-index:1`,
        m.highlight
          ? `background:${accent};color:#fff`
          : `border:1px solid ${border};background:#fff;color:${charcoal}`,
      ].join(';');

      return `<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:${gap}px;font-family:${fontFamily};">
        <div style="font-size:${microFont}px;color:${textMuted};line-height:1.4;">${m.date}</div>
        <div style="${squareStyle}">${m.code}</div>
        <div style="font-size:${bodyFont}px;font-weight:700;color:${charcoal};line-height:1.3;">${m.title}</div>
        <div style="font-size:${microFont}px;color:${textMuted};line-height:1.4;">${m.note}</div>
      </div>`;
    }).join('');

    const callout = `<div style="border-left:3px solid ${lime};padding:${gap}px ${gap * 2}px;font-family:${fontFamily};font-size:${microFont}px;color:${textMuted};line-height:1.5;">GA release in September 2026 is the pivotal gate — all three prior milestones must close on schedule to preserve the press launch date.</div>`;

    return `<style>${DM_SANS_CSS}</style>
<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
  <div style="display:flex;align-items:center;">
    <div style="position:relative;width:100%;">
      <div style="position:absolute;top:${lineTop}px;left:0;right:0;height:1px;background:${border};z-index:0;"></div>
      <div style="display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:${gap}px;">
        ${cols}
      </div>
    </div>
  </div>
  ${callout}
</div>`;
  },
};
