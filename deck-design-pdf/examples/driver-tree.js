const { STANDARD_COLORS, cssText, defineExample, getTemplateTextStyles } = require('./_shared');

module.exports = defineExample({
  id: 'driver-tree',
  title: 'Driver Tree / Issue Tree',
  tier: 3,
  proves: 'value-driver decomposition with algebraic relationships (×, +, =)',
  data: 'Revenue decomposition: Total → Volume × Price → leaf drivers with variance',
  sectionLabel: 'Profitability Decomposition',
  actionTitle: 'Margin decline is driven by volume erosion in mid-tier, not pricing — market share loss is the root cause',
  source: 'Source: Financial model, team analysis',
  exhibitId: 'Exhibit 3.1',
  responsiveSpec: {
    templateClass: 'layout',
    previewSamples: [
      { label: 'compact', width: 1024, height: 576 },
      { label: 'preferred', width: 1280, height: 720 },
      { label: 'wide', width: 1440, height: 810 },
    ],
    agentSizingNotes: 'Driver trees need horizontal space. At compact widths, reduce leaf nodes or use two-level instead of three-level decomposition.',
  },
  renderExhibit({ tokens }) {
    const colors = STANDARD_COLORS;
    const text = getTemplateTextStyles(tokens, colors);

    const nodeRadius = tokens.adapt(6, 8, 10);
    const nodePad = tokens.adapt(10, 14, 18);
    const metricSize = tokens.adapt(18, 22, 28);
    const leafMetricSize = tokens.adapt(14, 17, 20);
    const connW = tokens.adapt(24, 36, 42);
    const operatorSize = tokens.adapt(14, 18, 20);

    function node(label, value, delta, deltaColor, borderColor, opts = {}) {
      const bg = opts.dark ? '#0B2545' : opts.alert ? '#FFF5F5' : '#fff';
      const textColor = opts.dark ? '#fff' : colors.textStrong;
      const labelColor = opts.dark ? 'rgba(255,255,255,0.5)' : colors.textLight;
      const border = opts.dark ? 'none' : `1.5px solid ${colors.borderSoft}`;
      const leftBorder = borderColor && !opts.dark ? `border-left:5px solid ${borderColor};` : '';
      const fontSize = opts.large ? metricSize : leafMetricSize;
      return `<div style="padding:${nodePad}px;background:${bg};border:${border};${leftBorder}border-radius:${nodeRadius}px;">
        <div style="${cssText(text.metaLabel)};color:${labelColor};">${label}</div>
        <div style="font-size:${fontSize}px;font-weight:700;color:${textColor};line-height:1.05;margin-top:${tokens.adapt(3, 6, 8)}px;">${value}</div>
        <div style="font-size:${tokens.smallText}px;font-weight:700;color:${deltaColor};margin-top:${tokens.adapt(3, 6, 8)}px;">${delta}</div>
      </div>`;
    }

    function connector() {
      return `<div style="display:flex;align-items:center;justify-content:center;width:${connW}px;">
        <div style="width:100%;height:2px;background:${colors.borderSoft};"></div>
      </div>`;
    }

    function operator(symbol) {
      return `<div style="text-align:center;font-size:${operatorSize}px;font-weight:700;color:${colors.borderSoft};line-height:1;">${symbol}</div>`;
    }

    return `<div class="h-full w-full" style="display:grid;grid-template-columns:minmax(120px,160px) ${connW}px minmax(140px,200px) ${connW - 8}px 1fr;align-items:center;font-family:var(--font-body);">
      <!-- L0: Root -->
      ${node('Total Revenue', '$4.2B', '−$180M vs plan', '#FF8A80', null, { dark: true, large: true })}

      ${connector()}

      <!-- L1: Volume × Price -->
      <div style="display:flex;flex-direction:column;gap:${tokens.adapt(4, 6, 8)}px;">
        ${node('Volume', '12.4M', '−8% vs plan', colors.danger, colors.danger, { large: true })}
        ${operator('×')}
        ${node('Avg Price', '$338', '+2% vs plan', colors.success, colors.success, { large: true })}
      </div>

      ${connector()}

      <!-- L2: Leaf nodes -->
      <div style="display:flex;flex-direction:column;gap:${tokens.adapt(4, 6, 8)}px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:${tokens.adapt(4, 6, 8)}px;">
          ${node('Mkt Size', '48M', '+2%', colors.success, colors.success)}
          ${node('Mkt Share', '25.8%', '−3.2pp', colors.danger, colors.danger, { alert: true })}
        </div>
        <div style="border-top:1px dashed ${colors.borderSoft};margin:${tokens.adapt(1, 2, 3)}px 0;"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:${tokens.adapt(4, 6, 8)}px;">
          ${node('List Price', '$395', '+4%', colors.success, colors.success)}
          ${node('Discount', '14.4%', '+1.8pp', '#B85C2C', '#B85C2C')}
        </div>
      </div>
    </div>`;
  },
});
