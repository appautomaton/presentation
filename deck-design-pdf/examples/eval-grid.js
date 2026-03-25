const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'eval-grid',
  title: 'Evaluation Grid',
  tier: 2,
  proves: 'multi-criteria assessment with weighted scoring',
  data: 'Vendor evaluation across capability dimensions',
  sectionLabel: 'Vendor Assessment',
  actionTitle: 'Vendor A is the strongest weighted fit overall despite gaps on cost and integration',
  source: 'Source: Vendor RFP responses, reference checks, team assessment',
  exhibitId: 'Exhibit 10.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'review', width: 1120, height: 630 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Weighted scorecards are agent-sized. If the available width is below the review sample, reduce vendors, shorten labels, or split detail from the recommendation view.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);
    const criteria = [
      { name: 'Scalability', a: 5, b: 5, c: 3, d: 1, weight: '25%' },
      { name: 'Security', a: 5, b: 3, c: 5, d: 3, weight: '20%' },
      { name: 'AI / ML', a: 5, b: 1, c: 3, d: 5, weight: '20%' },
      { name: 'Cost efficiency', a: 1, b: 5, c: 5, d: 3, weight: '15%' },
      { name: 'Integration', a: 3, b: 5, c: 3, d: 1, weight: '10%' },
      { name: 'Support', a: 5, b: 3, c: 3, d: 5, weight: '10%' },
    ];
    const grayFill = { 5: '#D9E0E8', 3: '#EEF2F6', 1: '#F7F9FB' };
    const accentFill = { 5: 'rgba(18,58,99,0.16)', 3: 'rgba(18,58,99,0.10)', 1: 'rgba(18,58,99,0.06)' };
    const scoreCell = (score, accent) => {
      const background = accent ? accentFill[score] : grayFill[score];
      const color = accent ? '#123A63' : '#101A27';
      return `background:${background};color:${color};font-weight:${accent ? 700 : 600};`;
    };
    const rows = criteria.map((item) => `<tr style="border-bottom:1px solid rgba(199,213,229,0.45);">
      <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:left;color:#101A27;font-weight:500;">${item.name}</td>
      <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;border-left:1px solid rgba(18,58,99,0.10);border-right:1px solid rgba(18,58,99,0.10);${scoreCell(item.a, true)}">${item.a}</td>
      <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;${scoreCell(item.b, false)}">${item.b}</td>
      <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;${scoreCell(item.c, false)}">${item.c}</td>
      <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;${scoreCell(item.d, false)}">${item.d}</td>
      <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;color:#4E6176;">${item.weight}</td>
    </tr>`).join('');
    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${Math.max(tokens.gridGap - 6, 8)}px;">
      <div style="overflow:hidden;border:1px solid #D7E4EE;border-radius:${tokens.exhibitRadius}px;">
        <table style="${cssText({ ...text.table, width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' })}">
          <colgroup>
            <col style="width:28%;">
            <col style="width:14%;">
            <col style="width:14%;">
            <col style="width:14%;">
            <col style="width:14%;">
            <col style="width:10%;">
          </colgroup>
          <thead>
            <tr style="border-bottom:2px solid var(--accent);background:#F8FBFD;">
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:left;color:#101A27;font-weight:600;">Dimension</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;color:#101A27;font-weight:600;background:rgba(18,58,99,0.06);border-left:1px solid rgba(18,58,99,0.10);border-right:1px solid rgba(18,58,99,0.10);">Vendor A<br><span style="font-size:${tokens.microText}px;letter-spacing:0.14em;text-transform:uppercase;color:#123A63;">Recommended</span></th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;color:#101A27;font-weight:600;">Vendor B</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;color:#101A27;font-weight:600;">Vendor C</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;color:#101A27;font-weight:600;">Vendor D</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;color:#4E6176;font-weight:600;">Weight</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
            <tr style="border-top:1px solid rgba(199,213,229,0.65);background:#FCFDFE;">
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;font-weight:600;color:#101A27;">Weighted score</td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;background:rgba(18,58,99,0.08);border-left:1px solid rgba(18,58,99,0.10);border-right:1px solid rgba(18,58,99,0.10);">
                <span style="${cssText(text.metricValueAccent)}">4.2</span>
                <span style="${cssText({ ...text.annotation, marginLeft: '4px' })}">/ 5.0</span>
              </td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;"><span style="${cssText(text.metricLabel)}">3.7</span></td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;"><span style="${cssText(text.metricLabel)}">3.5</span></td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;"><span style="${cssText(text.metricLabel)}">2.7</span></td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:center;color:#4E6176;">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="${cssText({ ...text.body, padding: `${tokens.cardPad}px`, borderLeft: '4px solid var(--accent)', background: 'rgba(18,58,99,0.05)', borderRadius: `0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0` })}">
        Vendor A wins on scale, security, AI/ML capability, and support. Vendor B remains the benchmark on cost and integration.
      </div>
    </div>`;
  },
});
