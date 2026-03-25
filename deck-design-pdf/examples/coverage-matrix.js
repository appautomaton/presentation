const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'coverage-matrix',
  title: 'Coverage / Reallocation Matrix',
  tier: 3,
  proves: 'current vs. recommended resource allocation across channels and segments',
  data: 'Sales coverage reallocation across 4 channels × 4 segments',
  sectionLabel: 'Commercial Reallocation',
  actionTitle: 'Shift 40 sales reps from low-ROI SMB field coverage to high-growth Mid-Market digital',
  source: 'Source: Sales capacity model, CRO planning team',
  exhibitId: 'Exhibit 13.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Coverage matrices need balanced column widths. At compact width, abbreviate channel names or reduce to 3 segments.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const segments = ['Enterprise', 'Mid-Market', 'SMB', 'New Logos'];
    const channels = [
      { name: 'Field Sales', cells: [{ lev: 'H', dir: '→' }, { lev: 'M', dir: '↑' }, { lev: 'M', dir: '↓' }, { lev: 'L', dir: '↑' }], net: '−15' },
      { name: 'Inside Sales', cells: [{ lev: 'L', dir: '→' }, { lev: 'H', dir: '→' }, { lev: 'H', dir: '↓' }, { lev: 'M', dir: '↑' }], net: '−10' },
      { name: 'Channel Partners', cells: [{ lev: 'M', dir: '→' }, { lev: 'L', dir: '↑' }, { lev: 'M', dir: '→' }, { lev: 'L', dir: '→' }], net: '+5' },
      { name: 'Digital / Self-Serve', cells: [{ lev: 'L', dir: '→' }, { lev: 'L', dir: '↑' }, { lev: 'L', dir: '↑' }, { lev: 'M', dir: '↑' }], net: '+20' },
    ];

    const levStyles = {
      H: { bg: colors.accent, text: '#fff' },
      M: { bg: colors.textLight, text: '#fff' },
      L: { bg: colors.borderSoft, text: colors.textMuted },
    };
    const arrowColors = { '↑': colors.success, '↓': colors.danger, '→': colors.textLight };
    const badgeSize = tokens.adapt(22, 28, 32);
    const arrowSize = tokens.adapt(14, 18, 20);

    const headerCells = segments.map(s =>
      `<th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;${cssText(text.tableHeader)};">${s}</th>`
    ).join('');

    const bodyRows = channels.map(ch => {
      const cells = ch.cells.map(c => {
        const ls = levStyles[c.lev];
        return `<td style="padding:${tokens.adapt(6, 8, 10)}px ${tokens.adapt(8, 12, 14)}px;text-align:center;">
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:${tokens.smallText}px;font-weight:700;width:${badgeSize}px;height:${badgeSize - 4}px;border-radius:4px;display:flex;align-items:center;justify-content:center;background:${ls.bg};color:${ls.text};">${c.lev}</span>
            <span style="font-size:${arrowSize}px;font-weight:700;color:${arrowColors[c.dir]};">${c.dir}</span>
          </div>
        </td>`;
      }).join('');

      const netColor = ch.net.startsWith('+') ? colors.success : ch.net.startsWith('−') ? colors.danger : colors.textLight;

      return `<tr style="border-bottom:1px solid rgba(199,213,229,0.4);">
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;font-weight:500;color:${colors.textStrong};font-size:${tokens.bodyText}px;">${ch.name}</td>
        ${cells}
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;font-size:${tokens.bodyText}px;font-weight:700;color:${netColor};">${ch.net}</td>
      </tr>`;
    }).join('');

    const summaryMetrics = [
      { val: '0', label: 'net headcount change', color: colors.accent },
      { val: '+$18M', label: 'projected revenue uplift', color: colors.success },
      { val: '6 mo', label: 'full ramp to target', color: colors.accent },
    ];

    const summaryHtml = summaryMetrics.map(m =>
      `<div><span style="font-size:${tokens.adapt(16, 20, 24)}px;font-weight:700;color:${m.color};">${m.val}</span><span style="font-size:${tokens.smallText}px;color:${colors.textMuted};margin-left:6px;">${m.label}</span></div>`
    ).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${tokens.adapt(8, 12, 14)}px;">
      <table style="width:100%;border-collapse:collapse;font-family:var(--font-body);">
        <thead>
          <tr style="border-bottom:2px solid ${colors.accent};">
            <th style="text-align:left;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;${cssText(text.tableHeader)};">Channel</th>
            ${headerCells}
            <th style="text-align:center;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;color:${colors.textLight};font-weight:600;font-size:${tokens.smallText}px;">Net Δ FTEs</th>
          </tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
      <div style="padding:${tokens.adapt(8, 12, 14)}px ${tokens.adapt(10, 14, 16)}px;background:#F3F6FA;border-radius:${tokens.exhibitRadius}px;display:flex;gap:${tokens.adapt(16, 24, 28)}px;">
        ${summaryHtml}
      </div>
    </div>`;
  },
});
