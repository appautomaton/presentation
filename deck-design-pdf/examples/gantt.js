const fs = require('fs');
const path = require('path');
const DM_SANS_DIR = path.join(__dirname, '../vendor/fonts/dm-sans');
const DM_SANS_CSS = [400, 600, 700].map(w => {
  const file = path.join(DM_SANS_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${DM_SANS_DIR}/`);
}).join('\n');

const accent    = '#0F6B4F';
const lime      = '#6AB648';
const charcoal  = '#111111';
const textMuted = '#5F6368';
const border    = '#D0D0D0';
const borderSoft = '#EEEEEE';

const phases = [
  { label: 'Foundation', start: 1, span: 3 },
  { label: 'Build',      start: 4, span: 5 },
  { label: 'Scale',      start: 9, span: 4 },
];

const workstreams = [
  { label: 'Technology', tasks: [
    { label: 'Migration',   start: 1, span: 4, bg: '#0F6B4F',              color: '#ffffff' },
    { label: 'Integration', start: 5, span: 4, bg: 'rgba(15,107,79,0.65)', color: '#ffffff' },
    { label: 'Optimize',    start: 9, span: 4, bg: 'rgba(15,107,79,0.18)', color: '#0F6B4F' },
  ]},
  { label: 'Process', tasks: [
    { label: 'Mapping',  start: 1, span: 3, bg: '#2E8B5B',              color: '#ffffff' },
    { label: 'Pilot',    start: 4, span: 5, bg: 'rgba(46,139,91,0.65)', color: '#ffffff' },
    { label: 'Rollout',  start: 9, span: 4, bg: 'rgba(46,139,91,0.18)', color: '#2E8B5B' },
  ]},
  { label: 'People', tasks: [
    { label: 'Assess',   start: 1, span: 2, bg: '#6AB648',               color: '#ffffff' },
    { label: 'Training', start: 3, span: 6, bg: 'rgba(106,182,72,0.65)', color: '#ffffff' },
    { label: 'Embed',    start: 9, span: 4, bg: 'rgba(106,182,72,0.20)', color: '#2E8B5B' },
  ]},
  { label: 'Governance', tasks: [
    { label: 'PMO & steering cadence', start: 1, span: 12, bg: '#F0F0F0', color: '#5F6368', border: '1px solid #D0D0D0' },
  ]},
];

const milestoneNotes = ['M3: Foundation complete', 'M8: Pilot results validated', 'M12: Full operational handover'];

module.exports = {
  id: 'gantt',
  title: 'Gantt / Roadmap',
  tier: 3,
  proves: 'what happens when, with dependencies',
  data: 'Transformation workplan across four workstreams over 12 months',
  sectionLabel: 'Implementation Roadmap',
  actionTitle: 'Full transformation delivery is sequenced across four workstreams over 12 months',
  source: 'Source: Transformation Office, March 2026',
  exhibitId: 'Exhibit 14.1',

  renderExhibit({ tokens }) {
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp([9,  13]);
    const microFont = lerp([7,  10]);
    const labelW    = lerp([80, 120]);
    const barH      = lerp([18, 28]);
    const rowGap    = lerp([4,  10]);
    const gap       = lerp([6,  12]);

    const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

    // Month header row
    const monthCells = months.map(m =>
      `<div style="font-size:${microFont}px;font-weight:600;color:${textMuted};text-align:center;border-bottom:1px solid ${border};padding:3px 0;font-family:'DM Sans',sans-serif;">${m}</div>`
    ).join('');

    // Phase header row — plain text, no pill background
    const phaseCells = phases.map(phase =>
      `<div style="grid-column:${phase.start} / span ${phase.span};text-align:center;font-size:${microFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${accent};border-bottom:2px solid ${accent};padding:3px 0;font-family:'DM Sans',sans-serif;">${phase.label}</div>`
    ).join('');

    // Workstream rows
    const rows = workstreams.map(stream => {
      const tasks = stream.tasks.map(task =>
        `<div style="grid-row:1;grid-column:${task.start} / span ${task.span};align-self:center;height:${barH}px;display:flex;align-items:center;justify-content:center;background:${task.bg};color:${task.color};font-size:${microFont}px;font-weight:700;font-family:'DM Sans',sans-serif;${task.border ? `border:${task.border};` : ''}">${task.label}</div>`
      ).join('');

      return `<div style="display:contents;">
        <div style="font-size:${bodyFont}px;font-weight:600;color:${charcoal};font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:flex-end;padding-right:8px;">${stream.label}</div>
        <div style="position:relative;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));">
          ${tasks}
        </div>
      </div>`;
    }).join('');

    // Milestone notes — plain text, no pill/background
    const notes = milestoneNotes.map(n =>
      `<span style="font-size:${microFont}px;color:${textMuted};font-family:'DM Sans',sans-serif;">${n}</span>`
    ).join(`<span style="font-size:${microFont}px;color:${textMuted};margin:0 4px;">·</span>`);

    return `<style>${DM_SANS_CSS}</style>
<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
  <div style="display:grid;grid-template-columns:${labelW}px 1fr;row-gap:${rowGap}px;align-items:center;">
    <div></div>
    <div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));">${monthCells}</div>
    <div></div>
    <div style="display:grid;grid-template-columns:repeat(12,minmax(0,1fr));">${phaseCells}</div>
    ${rows}
  </div>
  <div style="border-left:3px solid ${lime};padding-left:8px;display:flex;align-items:center;flex-wrap:wrap;gap:${gap}px;">
    ${notes}
  </div>
</div>`;
  },
};
