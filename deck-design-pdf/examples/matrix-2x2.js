// ════════════════════════════════════════════════════════════════════════
// 2×2 Matrix — strategic positioning grid with four discrete quadrants
// ════════════════════════════════════════════════════════════════════════
// Flexible layout: works in portrait, landscape, or square containers.
// Pure HTML/CSS grid — no chart library needed.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap font + colors from the brand config
//   2. Data             → swap axes, quadrant names, and items
//   3. Sizing limits    → tune the knobs if defaults don't fit
// Everything else adapts automatically to container size.
//
// Layout notes for agents:
//   • Quadrants are arranged: top-left, top-right, bottom-left, bottom-right
//   • Each quadrant has a name and a list of items with optional metrics
//   • Axis labels sit outside the grid on left (Y) and bottom (X)
//   • Keep items to 2–4 per quadrant to avoid overflow at small sizes
//   • The "star" quadrant (top-right by default) gets accent styling

module.exports = {
  id: 'matrix-2x2',
  title: '2×2 Matrix',
  tier: 2,
  proves: 'strategic positioning on two dimensions',
  data: 'Business units positioned by growth versus margin',
  sectionLabel: 'Portfolio Strategy',
  actionTitle: 'Two business units warrant accelerated investment based on growth-margin position',
  source: 'Source: BU financials FY2025',
  exhibitId: 'Exhibit 7.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables ──────────────────────────────────────────────
    const fontFamily  = 'sans-serif';
    const textColor   = '#101A27';
    const textMuted   = '#4E6176';
    const textLight   = '#6B7F94';
    const accent      = '#123A63';
    const accentSoft  = '#E8EEF4';
    const cellBg      = '#F6F8FB';
    const cellBorder  = '#D7E4EE';
    const starBg      = '#EDF2F8';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const xAxis = { low: 'Low margin', high: 'High margin', label: 'EBITDA margin' };
    const yAxis = { low: 'Low growth', high: 'High growth', label: 'Revenue growth' };

    // Quadrants: topLeft, topRight (star), bottomLeft, bottomRight
    // Each quadrant has a name, items, and a one-line action note.
    // Keep items to 2–4 per quadrant to avoid overflow at small sizes.
    const quadrants = {
      topLeft: {
        name: 'Invest to grow',
        note: 'Fund selectively to build scale',
        items: [
          { name: 'Logistics', metric: '$22M' },
          { name: 'AI / ML Platform', metric: '$18M' },
          { name: 'Data Analytics', metric: '$15M' },
        ],
      },
      topRight: {
        name: 'Accelerate',
        star: true,
        note: 'Double down — highest ROI potential',
        items: [
          { name: 'Digital', metric: '$44M' },
          { name: 'Healthcare', metric: '$36M' },
          { name: 'Cybersecurity', metric: '$28M' },
        ],
      },
      bottomLeft: {
        name: 'Rationalize',
        note: 'Reduce cost or divest',
        items: [
          { name: 'Retail', metric: '$18M' },
          { name: 'Corp Services', metric: '$14M' },
          { name: 'Print Media', metric: '$8M' },
        ],
      },
      bottomRight: {
        name: 'Harvest',
        note: 'Maximize cash flow, limit investment',
        items: [
          { name: 'Energy', metric: '$26M' },
          { name: 'Telecom', metric: '$20M' },
        ],
      },
    };

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const quadrantFontRange = [12, 16];     // [min, max] px for quadrant name
    const itemFontRange     = [11, 15];     // [min, max] px for item name
    const metricFontRange   = [10, 14];     // [min, max] px for item metric
    const axisFontRange     = [10, 13];     // [min, max] px for axis labels
    const padRange          = [8, 16];      // [min, max] px for cell padding
    const gapRange          = [4, 10];      // [min, max] px for item gap
    const axisStripRange    = [20, 30];     // [min, max] px for axis label strip width

    // ── Responsive sizing (computed — don't edit) ───────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const quadrantFont = lerp(quadrantFontRange);
    const itemFont     = lerp(itemFontRange);
    const metricFont   = lerp(metricFontRange);
    const axisFont     = lerp(axisFontRange);
    const pad          = lerp(padRange);
    const itemGap      = lerp(gapRange);
    const axisStrip    = lerp(axisStripRange);

    // ── Render helpers ──────────────────────────────────────────────────
    function renderCell(q) {
      const bg = q.star ? starBg : cellBg;
      const nameColor = q.star ? accent : textMuted;
      const items = q.items.map(it => `
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:4px;">
          <span style="font-family:${fontFamily};font-size:${itemFont}px;font-weight:600;color:${textColor};line-height:1.3;">${it.name}</span>
          ${it.metric ? `<span style="font-family:${fontFamily};font-size:${metricFont}px;color:${textLight};white-space:nowrap;">${it.metric}</span>` : ''}
        </div>`).join('');

      const noteHtml = q.note ? `<div style="font-family:${fontFamily};font-size:${metricFont}px;font-style:italic;color:${textLight};line-height:1.3;margin-top:auto;">${q.note}</div>` : '';

      return `<div style="background:${bg};border:1px solid ${cellBorder};border-radius:4px;padding:${pad}px;display:flex;flex-direction:column;gap:${itemGap}px;overflow:hidden;">
        <div style="font-family:${fontFamily};font-size:${quadrantFont}px;font-weight:700;color:${nameColor};line-height:1.1;">${q.name}</div>
        ${items}
        ${noteHtml}
      </div>`;
    }

    // ── Template ────────────────────────────────────────────────────────
    return `<div class="h-full w-full" style="display:grid;grid-template-columns:${axisStrip}px 1fr 1fr;grid-template-rows:1fr 1fr ${axisStrip}px;gap:2px;overflow:hidden;">
      <!-- Y-axis label -->
      <div style="grid-row:1/3;grid-column:1;display:flex;align-items:center;justify-content:center;">
        <div style="writing-mode:vertical-lr;transform:rotate(180deg);font-family:${fontFamily};font-size:${axisFont}px;font-weight:700;color:${textMuted};text-align:center;white-space:nowrap;">${yAxis.label}</div>
      </div>
      <!-- Y-axis high/low -->

      <!-- Top-left quadrant -->
      ${renderCell(quadrants.topLeft)}
      <!-- Top-right quadrant -->
      ${renderCell(quadrants.topRight)}
      <!-- Bottom-left quadrant -->
      ${renderCell(quadrants.bottomLeft)}
      <!-- Bottom-right quadrant -->
      ${renderCell(quadrants.bottomRight)}

      <!-- Bottom-left corner (empty) -->
      <div></div>
      <!-- X-axis label -->
      <div style="grid-column:2/4;display:flex;align-items:center;justify-content:center;">
        <div style="font-family:${fontFamily};font-size:${axisFont}px;font-weight:700;color:${textMuted};text-align:center;">
          ${xAxis.low} ←&nbsp;&nbsp;${xAxis.label}&nbsp;&nbsp;→ ${xAxis.high}
        </div>
      </div>
    </div>`;
  },
};
