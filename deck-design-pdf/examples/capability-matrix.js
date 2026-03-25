const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'capability-matrix',
  title: 'Capability Preservation Matrix',
  tier: 3,
  proves: 'current vs. target capability visibility with risk flags and mitigations',
  data: 'Capability assessment across 6 domains with preservation risk and mitigation actions',
  sectionLabel: 'Organizational Transition',
  actionTitle: 'Three critical capabilities are at risk in the transition — procurement expertise and regulatory knowledge require dedicated retention plans',
  source: 'Source: Capability assessment, HR analytics + leadership interviews',
  exhibitId: 'Exhibit 15.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Capability matrices are dense tables. At compact widths, abbreviate mitigation text or reduce to top 4 capabilities.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const capabilities = [
      { name: 'Procurement expertise', current: 4.2, target: 3.8, risk: 'high', keepers: 3, mitigation: 'Retention bonuses + 6-month knowledge transfer' },
      { name: 'Regulatory knowledge', current: 4.5, target: 3.2, risk: 'high', keepers: 2, mitigation: 'Dedicated documentation sprint + external advisory' },
      { name: 'Customer relationships', current: 3.8, target: 3.5, risk: 'medium', keepers: 5, mitigation: 'Client transition plan with dual coverage period' },
      { name: 'Data engineering', current: 3.2, target: 4.0, risk: 'low', keepers: 8, mitigation: 'Hiring pipeline active — 4 offers extended' },
      { name: 'Product management', current: 3.6, target: 3.8, risk: 'medium', keepers: 4, mitigation: 'Cross-training program between BU product leads' },
      { name: 'Financial modeling', current: 4.0, target: 3.9, risk: 'low', keepers: 6, mitigation: 'Standardized model templates reduce person-dependency' },
    ];

    const riskColors = { high: colors.danger, medium: '#D4A017', low: colors.success };
    const riskBg = { high: '#FFF5F5', medium: '#FFFBEB', low: '#F0FAF4' };

    function scoreBar(score, max = 5) {
      const pct = (score / max) * 100;
      return `<div style="display:flex;align-items:center;gap:6px;">
        <div style="flex:1;height:${tokens.adapt(6, 8, 9)}px;background:${colors.gridLine};border-radius:4px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${colors.accentAlt};border-radius:4px;"></div>
        </div>
        <span style="font-size:${tokens.smallText}px;font-weight:700;color:${colors.textStrong};min-width:24px;">${score}</span>
      </div>`;
    }

    const rows = capabilities.map(c => {
      const rc = riskColors[c.risk];
      const rb = riskBg[c.risk];
      return `<tr style="border-bottom:1px solid rgba(199,213,229,0.4);">
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;font-weight:500;color:${colors.textStrong};font-size:${tokens.bodyText}px;">${c.name}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;width:14%;">${scoreBar(c.current)}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;width:14%;">${scoreBar(c.target)}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;width:8%;">
          <span style="display:inline-block;padding:2px 8px;border-radius:4px;background:${rb};color:${rc};font-size:${tokens.smallText}px;font-weight:700;text-transform:uppercase;">${c.risk}</span>
        </td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;font-weight:700;color:${colors.textStrong};font-size:${tokens.bodyText}px;width:8%;">${c.keepers}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;${cssText(text.annotation)};width:28%;">${c.mitigation}</td>
      </tr>`;
    }).join('');

    const highRiskCount = capabilities.filter(c => c.risk === 'high').length;

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${tokens.adapt(8, 12, 14)}px;">
      <table style="width:100%;border-collapse:collapse;font-family:var(--font-body);">
        <thead>
          <tr style="border-bottom:2px solid ${colors.accent};">
            <th style="text-align:left;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;${cssText(text.tableHeader)};">Capability</th>
            <th style="text-align:left;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;${cssText(text.tableHeader)};">Current</th>
            <th style="text-align:left;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;${cssText(text.tableHeader)};">Target</th>
            <th style="text-align:center;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;${cssText(text.tableHeader)};">Risk</th>
            <th style="text-align:center;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;${cssText(text.tableHeader)};">Key staff</th>
            <th style="text-align:left;padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;${cssText(text.tableHeader)};">Mitigation</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="padding:${tokens.cardPad}px;background:${riskBg.high};border-left:4px solid ${colors.danger};border-radius:0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0;">
        <span style="${cssText(text.body)}"><span style="font-weight:700;color:${colors.danger};">${highRiskCount} high-risk capabilities</span> require board-level retention decisions within 30 days. Procurement and regulatory knowledge cannot be rebuilt through hiring alone — institutional memory is the asset at risk.</span>
      </div>
    </div>`;
  },
});
