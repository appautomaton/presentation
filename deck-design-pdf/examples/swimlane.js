const fs   = require('fs');
const path = require('path');

// Load vendored DM Sans (weights used: 400, 600, 700) and rewrite url() to absolute file:// paths
const DM_SANS_DIR = path.join(__dirname, '../vendor/fonts/dm-sans');
const DM_SANS_CSS = [400, 600, 700].map(w => {
  const file = path.join(DM_SANS_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8')
    .replace(/url\(\.\//g, `url(file://${DM_SANS_DIR}/`);
}).join('\n');

// ════════════════════════════════════════════════════════════════════════
// Swimlane Process Map — BCG style
// ════════════════════════════════════════════════════════════════════════
// Cross-functional process map: teams (rows) × phases (columns).
// BCG aesthetic: DM Sans, green anchored, shaded column headers,
// alternating row fills, no shadows, no rounded corners.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap from BCG palette if needed
//   2. Data             → swap stages, lanes, and tasks
//   3. Sizing limits    → tune knobs if defaults don't fit
//
// Layout notes for agents:
//   • stages[] = column headers (phases of the process)
//   • lanes[] = rows (teams); each has items[] placed by col index
//   • Bottleneck tasks: set alert:true — gets dark green left accent
//   • Keep stages to 4–6 and lanes to 4–6 for legibility
//   • teamColW controls the team label gutter width

module.exports = {
  id: 'swimlane',
  title: 'Swimlane Process Map',
  tier: 3,
  minSize: 400,   // 5 stages × 5 lanes doesn't render usably below ~400px
  proves: 'cross-team process with handoffs and bottleneck identification',
  data: 'Order-to-cash cycle across 5 teams with stage durations',
  sectionLabel: 'Process Mapping',
  actionTitle: 'Order-to-cash cycle has 3 cross-team handoffs with Finance→Legal review adding 9 days',
  source: 'Source: Process mining, order-to-cash (n=1,200 orders, Q1 2026)',
  exhibitId: 'Exhibit 11.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables (BCG palette) ────────────────────────────────
    const fontFamily    = "'DM Sans', sans-serif";
    const textColor     = '#111111';
    const textMuted     = '#5F6368';
    const accent        = '#0F6B4F';   // BCG dark green — structural
    const accentRule    = '#6AB648';   // BCG lime green — signature rule
    const surfaceMuted  = '#F5F6F4';   // alternate row fill
    const border        = '#D0D0D0';   // gridlines
    const alertFill     = '#0F6B4F';   // bottleneck — solid green fill (BCG isolation-by-color)

    // ── 2. Data ─────────────────────────────────────────────────────────
    const stages = ['Intake', 'Validate', 'Process', 'Review', 'Close'];

    // Each lane is a team row. items[] placed by col index (0-based).
    // alert:true marks bottlenecks with a green accent.
    const lanes = [
      { team: 'Sales', items: [
        { col: 0, label: 'Receive order',   days: '1d' },
        { col: 1, label: 'Verify terms',    days: '2d' },
      ]},
      { team: 'Operations', items: [
        { col: 1, label: 'Check inventory', days: '1d' },
        { col: 2, label: 'Fulfill order',   days: '3d' },
      ]},
      { team: 'Finance', items: [
        { col: 2, label: 'Generate invoice', days: '1d' },
        { col: 3, label: 'Credit review',   days: '4d', alert: true },
      ]},
      { team: 'Legal', items: [
        { col: 3, label: 'Contract review', days: '5d', alert: true },
      ]},
      { team: 'Customer Success', items: [
        { col: 4, label: 'Confirm & onboard', days: '2d' },
      ]},
    ];

    const callout = 'Finance credit review (4d) + Legal contract review (5d) = 9 days of sequential review. Parallelizing would cut cycle time by 40%.';

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const headerFontRange  = [9, 13];     // [min, max] px for stage headers
    const teamFontRange    = [9, 13];     // [min, max] px for team labels
    const taskFontRange    = [9, 13];     // [min, max] px for task label
    const daysFontRange    = [8, 11];     // [min, max] px for duration
    const calloutFontRange = [9, 12];     // [min, max] px for bottom callout
    const teamColRange     = [64, 96];    // [min, max] px for team gutter
    const cellPadRange     = [4, 8];      // [min, max] px cell padding
    const taskPadRange     = [4, 8];      // [min, max] px task inner padding
    const headerHRange     = [22, 32];    // [min, max] px header row height

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const headerFont  = lerp(headerFontRange);
    const teamFont    = lerp(teamFontRange);
    const taskFont    = lerp(taskFontRange);
    const daysFont    = lerp(daysFontRange);
    const calloutFont = lerp(calloutFontRange);
    const teamCol     = lerp(teamColRange);
    const cellPad     = lerp(cellPadRange);
    const taskPad     = lerp(taskPadRange);
    const headerH     = lerp(headerHRange);

    const gridCols = `${teamCol}px repeat(${stages.length}, minmax(0,1fr))`;

    // ── Header row ───────────────────────────────────────────────────────
    const stageCells = stages.map(s =>
      `<div style="padding:0 ${cellPad}px;display:flex;align-items:center;justify-content:center;text-align:center;font-family:${fontFamily};font-size:${headerFont}px;font-weight:700;color:${textColor};text-transform:uppercase;letter-spacing:0.06em;border-left:1px solid ${border};">${s}</div>`
    ).join('');

    // ── Lane rows ────────────────────────────────────────────────────────
    const laneRows = lanes.map((lane, li) => {
      const rowBg = li % 2 === 1 ? surfaceMuted : 'transparent';

      const cells = stages.map((_, col) => {
        const item = lane.items.find(i => i.col === col);
        if (!item) return `<div style="border-left:1px solid ${border};background:${rowBg};"></div>`;

        const cellBg    = item.alert ? alertFill : rowBg;
        const labelColor = item.alert ? '#FFFFFF' : textColor;
        const daysColor  = item.alert ? 'rgba(255,255,255,0.8)' : textMuted;

        return `<div style="border-left:1px solid ${border};background:${cellBg};padding:${cellPad}px ${taskPad}px;display:flex;flex-direction:column;justify-content:center;">
          <div style="font-family:${fontFamily};font-size:${taskFont}px;font-weight:600;color:${labelColor};line-height:1.25;">${item.label}</div>
          <div style="font-family:${fontFamily};font-size:${daysFont}px;font-weight:700;color:${daysColor};margin-top:2px;">${item.days}</div>
        </div>`;
      }).join('');

      return `<div style="display:grid;grid-template-columns:${gridCols};border-top:1px solid ${border};min-height:0;flex:1;">
        <div style="padding:${cellPad}px ${cellPad + 2}px;display:flex;align-items:center;background:${rowBg};border-right:2px solid ${accentRule};">
          <span style="font-family:${fontFamily};font-size:${teamFont}px;font-weight:700;color:${accent};">${lane.team}</span>
        </div>
        ${cells}
      </div>`;
    }).join('');

    // ── Template ─────────────────────────────────────────────────────────
    return `<style>${DM_SANS_CSS}</style>
    <div class="h-full w-full" style="display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:0;padding:2px;overflow:hidden;">
      <!-- Header -->
      <div style="display:grid;grid-template-columns:${gridCols};height:${headerH}px;border-bottom:3px solid ${accentRule};border-top:1px solid ${border};">
        <div style="padding:0 ${cellPad + 2}px;display:flex;align-items:center;border-right:2px solid ${accentRule};">
          <span style="font-family:${fontFamily};font-size:${headerFont}px;font-weight:700;color:${textMuted};text-transform:uppercase;letter-spacing:0.06em;">Team</span>
        </div>
        ${stageCells}
      </div>
      <!-- Lanes -->
      <div style="display:flex;flex-direction:column;border-bottom:1px solid ${border};">
        ${laneRows}
      </div>
      <!-- Callout -->
      <div style="padding:${cellPad + 2}px ${cellPad + 4}px;border-left:3px solid ${accentRule};margin-top:${cellPad}px;">
        <span style="font-family:${fontFamily};font-size:${calloutFont}px;font-weight:700;color:${accent};">Critical path: </span><span style="font-family:${fontFamily};font-size:${calloutFont}px;color:${textMuted};">${callout}</span>
      </div>
    </div>`;
  },
};
