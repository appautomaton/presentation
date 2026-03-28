const fs   = require('fs');
const path = require('path');

// Load vendored Source Sans 3 (weights: 400, 600, 700) — Bain's typeface
const SS3_DIR = path.join(__dirname, '../vendor/fonts/source-sans-3');
const SS3_CSS = [400, 600, 700].map(w => {
  const file = path.join(SS3_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8')
    .replace(/url\(\.\//g, `url(file://${SS3_DIR}/`);
}).join('\n');

// ════════════════════════════════════════════════════════════════════════
// Decision Flow / Approval Path — Bain style
// ════════════════════════════════════════════════════════════════════════
// Approval-path cycle-time visualization: 6 stages as vertical rows,
// each with a horizontal time bar proportional to days elapsed.
// Bain aesthetic: Source Sans 3, red for alert stages, gray otherwise.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap from Bain palette if needed
//   2. Data             → swap stages array (label, owner, days, alert)
//   3. Sizing limits    → tune knobs if defaults don't fit
//
// Design notes for agents:
//   • stages[] = vertical rows (no horizontal scroll)
//   • alert:true stages get red number badge, red bar fill, ⚠ indicator
//   • Bar width = days/maxDays * 100% (not % of total — scales to widest)
//   • % of total shown as text next to bar
//   • Callout: border-left:3px solid red, plain div, no card background

module.exports = {
  id: 'decision-flow',
  title: 'Decision Flow / Approval Path',
  tier: 3,
  proves: 'approval-path bottleneck identification with cycle-time attribution',
  data: 'Capital expenditure approval flow across 6 stages with cycle times',
  sectionLabel: 'Process Optimization',
  actionTitle: 'CapEx approvals take 34 days on average — 60% of elapsed time is in two sequential review gates',
  source: 'Source: Process audit, CapEx approvals (n=86 requests, FY2025)',
  exhibitId: 'Exhibit 16.2',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables (Bain palette) ───────────────────────────────
    const fontFamily = "'Source Sans 3', sans-serif";
    const charcoal   = '#2B2B2B';
    const red        = '#CC0000';   // Bain red — alert stages + callout
    const textMuted  = '#666666';
    const textFine   = '#888888';
    const rule       = '#E0E0E0';
    const normalBadge = '#999999';   // gray for non-alert stage numbers

    // ── 2. Data ─────────────────────────────────────────────────────────
    const stages = [
      { label: 'Request',            owner: 'Business unit',   days: 2,  approval: '95%', alert: false },
      { label: 'Finance Review',     owner: 'FP&A team',       days: 5,  approval: '82%', alert: false },
      { label: 'VP Approval',        owner: 'BU VP',           days: 3,  approval: '90%', alert: false },
      { label: 'Legal Review',       owner: 'Legal counsel',   days: 8,  approval: '78%', alert: true  },
      { label: 'CFO Sign-off',       owner: 'CFO office',      days: 12, approval: '65%', alert: true  },
      { label: 'Board Ratification', owner: 'Board committee', days: 4,  approval: '98%', alert: false },
    ];

    const maxDays   = Math.max(...stages.map(s => s.days));
    const totalDays = stages.reduce((a, s) => a + s.days, 0);
    const alertDays = stages.filter(s => s.alert).reduce((a, s) => a + s.days, 0);
    const alertPct  = Math.round(alertDays / totalDays * 100);

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const bodyFontRange  = [9,  13];   // [min, max] px for stage name
    const microFontRange = [7,  10];   // [min, max] px for owner, pct label
    const numWRange      = [22, 32];   // [min, max] px for stage number badge
    const barHRange      = [10, 18];   // [min, max] px for time bar height
    const rowGapRange    = [4,  10];   // [min, max] px vertical padding per row
    const padRange       = [6,  12];   // [min, max] px column gap
    const indicWRange    = [18, 26];   // [min, max] px for alert indicator column

    // ── Responsive sizing (computed — don't edit) ────────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp(bodyFontRange);
    const microFont = lerp(microFontRange);
    const numW      = lerp(numWRange);
    const barH      = lerp(barHRange);
    const rowGap    = lerp(rowGapRange);
    const pad       = lerp(padRange);
    const indicW    = lerp(indicWRange);

    // ── Stage rows ───────────────────────────────────────────────────────
    const stageRows = stages.map((s, i) => {
      const isLast     = i === stages.length - 1;
      const rowBorder  = isLast ? '' : `border-bottom:1px solid ${rule};`;
      const badgeBg    = s.alert ? red : normalBadge;
      const barColor   = s.alert ? red : '#AAAAAA';
      const labelColor = s.alert ? red : charcoal;
      const barWidth   = Math.round(s.days / maxDays * 100);
      const pctTotal   = Math.round(s.days / totalDays * 100);

      return `
        <div style="display:grid;grid-template-columns:${numW}px minmax(0,1fr) minmax(0,2fr) ${indicW}px;align-items:center;gap:${pad}px;padding:${rowGap}px 0;${rowBorder}">
          <!-- Stage number badge -->
          <div style="width:${numW}px;height:${numW}px;background:${badgeBg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="font-family:${fontFamily};font-size:${microFont + 1}px;font-weight:700;color:#FFFFFF;">${i + 1}</span>
          </div>
          <!-- Stage name + owner -->
          <div style="min-width:0;">
            <div style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${labelColor};line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.label}</div>
            <div style="font-family:${fontFamily};font-size:${microFont}px;color:${textFine};margin-top:1px;">${s.owner}</div>
          </div>
          <!-- Time bar -->
          <div style="display:flex;align-items:center;gap:${Math.round(pad / 2)}px;">
            <div style="flex:1;background:#F0F0F0;height:${barH}px;">
              <div style="width:${barWidth}%;height:100%;background:${barColor};"></div>
            </div>
            <div style="white-space:nowrap;flex-shrink:0;">
              <span style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${labelColor};">${s.days}d</span>
              <span style="font-family:${fontFamily};font-size:${microFont}px;color:${textFine};margin-left:2px;">${pctTotal}%</span>
            </div>
          </div>
          <!-- Alert indicator -->
          <div style="text-align:center;">
            ${s.alert ? `<span style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${red};">⚠</span>` : ''}
          </div>
        </div>`;
    }).join('');

    // ── Template ─────────────────────────────────────────────────────────
    return `<style>${SS3_CSS}</style>
    <div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${rowGap * 2}px;padding:2px;overflow:hidden;">
      <div style="display:flex;flex-direction:column;justify-content:center;min-height:0;">
        ${stageRows}
      </div>
      <div style="border-top:1px solid ${rule};border-left:3px solid ${red};padding:${rowGap}px ${pad}px;margin-top:${rowGap}px;">
        <span style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${red};">Bottleneck: </span><span style="font-family:${fontFamily};font-size:${bodyFont}px;color:${textMuted};">Legal Review + CFO Sign-off account for ${alertDays} of ${totalDays} days (${alertPct}%). Recommendation: pre-clear Legal in parallel with Finance Review, implement delegated authority for CapEx &lt;$2M.</span>
      </div>
    </div>`;
  },
};
