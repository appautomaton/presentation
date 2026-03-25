const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'data-table',
  title: 'Data Table',
  tier: 1,
  proves: 'structured evidence with comparisons',
  data: 'Regional performance summary with deltas',
  sectionLabel: 'Regional Summary',
  actionTitle: 'APAC outperformed all regions on revenue growth and margin expansion',
  source: 'Source: Regional P&L FY2025 vs FY2024',
  exhibitId: 'Exhibit 6.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'review', width: 1100, height: 620 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Six-column evidence tables are agent-sized; if width is tighter than the review sample, split the table or convert to a chart instead of shrinking text further.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);
    const rows = [
      { region: 'North America', revenue: '1,500', growth: '+8%', margin: '24.2%', delta: '+120bps', headcount: '4,200' },
      { region: 'EMEA', revenue: '1,180', growth: '+5%', margin: '21.8%', delta: '−40bps', headcount: '3,800' },
      { region: 'APAC', revenue: '840', growth: '+18%', margin: '26.1%', delta: '+310bps', headcount: '2,100', highlight: true },
      { region: 'LatAm', revenue: '360', growth: '+11%', margin: '18.5%', delta: '+90bps', headcount: '950' },
    ];
    const rowHtml = rows.map((row) => {
      const tone = row.highlight
        ? 'background:rgba(18,58,99,0.05);font-weight:600;'
        : '';
      return `<tr style="border-bottom:1px solid rgba(199,213,229,0.45);${tone}">
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:left;color:${row.highlight ? '#123A63' : '#101A27'};">${row.highlight ? '→ ' : ''}${row.region}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-variant-numeric:tabular-nums;color:#101A27;">${row.revenue}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-weight:600;color:#2E9E5A;">${row.growth}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-variant-numeric:tabular-nums;color:#101A27;">${row.margin}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-weight:600;color:${row.delta.startsWith('−') ? '#A43C35' : '#2E9E5A'};">${row.delta}</td>
        <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-variant-numeric:tabular-nums;color:#101A27;">${row.headcount}</td>
      </tr>`;
    }).join('');

    return `<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${Math.max(tokens.gridGap - 4, 8)}px;">
      <div style="overflow:hidden;border:1px solid #D7E4EE;border-radius:${tokens.exhibitRadius}px;">
        <table style="${cssText({ ...text.table, width: '100%', height: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' })}">
          <colgroup>
            <col style="width:24%;">
            <col style="width:16%;">
            <col style="width:14%;">
            <col style="width:16%;">
            <col style="width:14%;">
            <col style="width:16%;">
          </colgroup>
          <thead>
            <tr style="border-bottom:2px solid var(--accent);background:#F8FBFD;">
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:left;font-size:${tokens.bodyText}px;font-weight:600;color:#101A27;">Region</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-size:${tokens.bodyText}px;font-weight:600;color:#101A27;">Revenue ($M)</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-size:${tokens.bodyText}px;font-weight:600;color:#101A27;">YoY</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-size:${tokens.bodyText}px;font-weight:600;color:#101A27;">EBITDA margin</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-size:${tokens.bodyText}px;font-weight:600;color:#101A27;">Margin Δ</th>
              <th style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-size:${tokens.bodyText}px;font-weight:600;color:#101A27;">Headcount</th>
            </tr>
          </thead>
          <tbody>
            ${rowHtml}
            <tr style="border-top:2px solid var(--accent);font-weight:700;background:#FCFDFE;">
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;">Total</td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-variant-numeric:tabular-nums;">3,880</td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;color:#2E9E5A;">+9%</td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-variant-numeric:tabular-nums;">23.1%</td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;color:#2E9E5A;">+130bps</td>
              <td style="padding:${tokens.tableCellPadY}px ${tokens.tableCellPadX}px;text-align:right;font-variant-numeric:tabular-nums;">11,050</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="${cssText({ ...text.body, padding: `${tokens.cardPad}px`, borderLeft: '4px solid var(--accent)', background: 'rgba(18,58,99,0.05)', borderRadius: `0 ${tokens.exhibitRadius}px ${tokens.exhibitRadius}px 0` })}">
        APAC's margin expansion reflects the shift to higher-margin software mix, up 12 percentage points year over year.
      </div>
    </div>`;
  },
});
