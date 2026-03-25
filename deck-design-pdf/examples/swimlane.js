const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'swimlane',
  title: 'Swimlane Process Map',
  tier: 3,
  proves: 'cross-team process with handoffs and bottleneck identification',
  data: 'Order-to-cash cycle across 5 teams with stage durations',
  sectionLabel: 'Process Mapping',
  actionTitle: 'Order-to-cash cycle has 3 cross-team handoffs with the Finance→Legal review adding 9 days',
  source: 'Source: Process mining, order-to-cash (n=1,200 orders, Q1 2026)',
  exhibitId: 'Exhibit 11.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Swimlanes need horizontal space for stages and vertical space for teams. Reduce stages or combine teams at compact widths.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const stages = ['Intake', 'Validate', 'Process', 'Review', 'Close'];
    const lanes = [
      { team: 'Sales', color: colors.accent, items: [{ col: 0, label: 'Receive order', days: '1d' }, { col: 1, label: 'Verify terms', days: '2d' }] },
      { team: 'Operations', color: colors.accentAlt, items: [{ col: 1, label: 'Check inventory', days: '1d' }, { col: 2, label: 'Fulfill order', days: '3d' }] },
      { team: 'Finance', color: colors.accentSoft, items: [{ col: 2, label: 'Generate invoice', days: '1d' }, { col: 3, label: 'Credit review', days: '4d', alert: true }] },
      { team: 'Legal', color: colors.textLight, items: [{ col: 3, label: 'Contract review', days: '5d', alert: true }] },
      { team: 'Customer Success', color: colors.success, items: [{ col: 4, label: 'Confirm & onboard', days: '2d' }] },
    ];

    const teamColW = tokens.adapt(80, 100, 110);
    const cellPad = tokens.adapt(4, 6, 8);
    const cardPad = tokens.adapt(6, 8, 10);

    const headerRow = stages.map(s =>
      `<div style="padding:${cellPad}px;text-align:center;${cssText(text.metricLabel)};">${s}</div>`
    ).join('');

    const laneRows = lanes.map(lane => {
      const cells = stages.map((_, col) => {
        const item = lane.items.find(i => i.col === col);
        if (!item) return `<div style="padding:${cellPad}px;border-left:1px solid rgba(199,213,229,0.3);min-height:${tokens.adapt(44, 56, 62)}px;"></div>`;
        const bg = item.alert ? '#FFF5F5' : '#fff';
        const border = item.alert ? '1.5px solid #FECDD3' : `1px solid ${colors.borderSoft}`;
        const leftColor = item.alert ? colors.danger : lane.color;
        const daysColor = item.alert ? colors.danger : colors.textLight;
        return `<div style="padding:${cellPad}px;border-left:1px solid rgba(199,213,229,0.3);display:flex;align-items:center;justify-content:center;">
          <div style="width:100%;padding:${cardPad}px;background:${bg};border:${border};border-left:3px solid ${leftColor};border-radius:${tokens.adapt(4, 6, 7)}px;">
            <div style="${cssText(text.annotation)};font-weight:600;color:${colors.textStrong};">${item.label}</div>
            <div style="font-size:${tokens.microText}px;font-weight:700;color:${daysColor};margin-top:3px;">${item.days}${item.alert ? ' ← bottleneck' : ''}</div>
          </div>
        </div>`;
      }).join('');

      return `<div style="display:grid;grid-template-columns:${teamColW}px repeat(5,1fr);border-bottom:1px solid rgba(199,213,229,0.3);align-items:center;">
        <div style="padding:${cellPad}px;font-weight:600;color:${lane.color};font-size:${tokens.smallText}px;display:flex;align-items:center;gap:6px;">
          <div style="width:8px;height:8px;border-radius:2px;background:${lane.color};"></div>${lane.team}
        </div>
        ${cells}
      </div>`;
    }).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:auto minmax(0,1fr) auto;gap:0;font-family:var(--font-body);">
      <div style="display:grid;grid-template-columns:${teamColW}px repeat(5,1fr);border-bottom:2px solid ${colors.accent};">
        <div style="padding:${cellPad}px;${cssText(text.metaLabel)};color:${colors.textLight};">Team</div>
        ${headerRow}
      </div>
      <div style="display:flex;flex-direction:column;">
        ${laneRows}
      </div>
      <div style="margin-top:auto;padding:${tokens.adapt(8, 10, 12)}px ${tokens.adapt(10, 12, 14)}px;background:#FFF5F5;border:1px solid #FECDD3;border-radius:${tokens.exhibitRadius}px;font-size:${tokens.smallText}px;color:${colors.danger};font-weight:500;font-family:var(--font-body);">
        <span style="font-weight:700;">Critical path:</span> Finance credit review (4d) + Legal contract review (5d) = 9 days of sequential review. Parallelizing would cut cycle time by 40%.
      </div>
    </div>`;
  },
});
