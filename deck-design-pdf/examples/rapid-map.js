const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'rapid-map',
  title: 'RAPID Decision Map',
  tier: 3,
  proves: 'decision-rights clarity (who Recommends, Agrees, Performs, has Input, Decides)',
  data: 'Current vs. target decision authority across 5 key decisions and 6 roles',
  sectionLabel: 'Decision Governance',
  actionTitle: 'Pricing authority is diffused across 5 roles today; target model consolidates Decide to BU Head',
  source: 'Source: Organizational design team, March 2026',
  exhibitId: 'Exhibit 7.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'RAPID maps are agent-sized. At compact widths, reduce role columns or abbreviate decision names.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const rapidColors = {
      D: { bg: colors.accent, text: '#fff' },
      R: { bg: colors.accentAlt, text: '#fff' },
      A: { bg: colors.borderSoft, text: colors.accent },
      P: { bg: colors.gridLine, text: colors.textMuted },
      I: { bg: '#F3F6FA', text: colors.textLight },
    };

    const roles = ['CEO', 'BU Head', 'CFO', 'Regional VP', 'Sales Dir', 'Legal'];
    const decisions = [
      { name: 'Pricing >10% discount', current: ['A','A','A','R','D','I'], target: ['I','D','A','R','P','I'] },
      { name: 'New product launch', current: ['D','R','I','I','I','A'], target: ['A','D','I','P','R','A'] },
      { name: 'Capital allocation >$5M', current: ['D','R','A','I','I','I'], target: ['D','R','A','I','I','I'] },
      { name: 'Hiring above plan', current: ['A','I','D','R','I','I'], target: ['I','D','A','R','I','I'] },
      { name: 'Vendor contract >$1M', current: ['A','I','D','I','I','A'], target: ['I','R','D','I','I','A'] },
    ];

    const cellSize = tokens.adapt(26, 32, 36);
    const cellFont = tokens.adapt(11, 13, 14);
    const stateFont = tokens.adapt(9, 10, 11);

    function cellStyle(letter, changed) {
      const c = rapidColors[letter] || { bg: '#fff', text: '#ccc' };
      const ring = changed ? `box-shadow:0 0 0 2px ${colors.accent};` : '';
      return `text-align:center;font-weight:700;font-size:${cellFont}px;border-radius:4px;background:${c.bg};color:${c.text};width:${cellSize}px;height:${cellSize - 6}px;display:flex;align-items:center;justify-content:center;margin:0 auto;${ring}`;
    }

    const headerCells = roles.map(r =>
      `<th style="padding:${tokens.tableCellPadY}px ${tokens.adapt(4, 6, 8)}px;text-align:center;font-weight:600;color:${colors.textStrong};font-size:${tokens.bodyText}px;">${r}</th>`
    ).join('');

    const bodyRows = decisions.map(d => {
      const currentCells = d.current.map(l =>
        `<td style="padding:${tokens.adapt(3, 4, 5)}px ${tokens.adapt(2, 3, 4)}px;"><div style="${cellStyle(l, false)}">${l}</div></td>`
      ).join('');
      const targetCells = d.target.map((l, i) =>
        `<td style="padding:${tokens.adapt(3, 4, 5)}px ${tokens.adapt(2, 3, 4)}px;"><div style="${cellStyle(l, l !== d.current[i])}">${l}</div></td>`
      ).join('');
      return `<tr style="border-bottom:1px solid rgba(199,213,229,0.3);">
        <td rowspan="2" style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;font-weight:500;color:${colors.textStrong};border-bottom:1px solid ${colors.borderSoft};vertical-align:middle;font-size:${tokens.bodyText}px;">${d.name}</td>
        <td style="padding:${tokens.adapt(3, 4, 5)}px ${tokens.adapt(4, 6, 8)}px;text-align:center;font-size:${stateFont}px;font-weight:600;color:${colors.textLight};">Now</td>
        ${currentCells}
      </tr>
      <tr style="border-bottom:1px solid ${colors.borderSoft};">
        <td style="padding:${tokens.adapt(3, 4, 5)}px ${tokens.adapt(4, 6, 8)}px;text-align:center;font-size:${stateFont}px;font-weight:700;color:${colors.accent};">Target</td>
        ${targetCells}
      </tr>`;
    }).join('');

    const legendItems = [
      { l: 'D', n: 'Decide' }, { l: 'R', n: 'Recommend' }, { l: 'A', n: 'Agree' },
      { l: 'P', n: 'Perform' }, { l: 'I', n: 'Input' },
    ];
    const legend = legendItems.map(x => {
      const c = rapidColors[x.l];
      return `<div style="display:flex;align-items:center;gap:5px;">
        <div style="width:${tokens.adapt(18, 22, 24)}px;height:${tokens.adapt(18, 22, 24)}px;border-radius:4px;background:${c.bg};color:${c.text};font-size:${tokens.smallText}px;font-weight:700;display:flex;align-items:center;justify-content:center;">${x.l}</div>
        <span style="${cssText(text.annotation)}">${x.n}</span>
      </div>`;
    }).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${tokens.adapt(6, 10, 12)}px;">
      <table style="width:100%;border-collapse:collapse;font-family:var(--font-body);">
        <thead>
          <tr style="border-bottom:2px solid ${colors.accent};">
            <th style="text-align:left;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;font-weight:600;color:${colors.textStrong};width:22%;font-size:${tokens.bodyText}px;">Decision</th>
            <th style="text-align:center;padding:${tokens.tableCellPadY}px ${tokens.adapt(4, 6, 8)}px;font-weight:600;color:${colors.textStrong};width:8%;font-size:${tokens.smallText}px;">State</th>
            ${headerCells}
          </tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
      <div style="display:flex;gap:${tokens.adapt(12, 16, 20)}px;align-items:center;">
        ${legend}
        <div style="margin-left:auto;${cssText(text.annotation)};color:${colors.accent};font-weight:600;">&#9673; = changed from current</div>
      </div>
    </div>`;
  },
});
