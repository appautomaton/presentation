const fs = require('fs');
const path = require('path');
const INTER_DIR = path.join(__dirname, '../vendor/fonts/inter');
const INTER_CSS = [400, 600, 700].map(w => {
  const file = path.join(INTER_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8').replace(/url\(\.\//g, `url(file://${INTER_DIR}/`);
}).join('\n');

const fontFamily = "'Inter', sans-serif";
const navy       = '#123A63';
const blue       = '#2E7D9B';
const textStrong = '#101A27';
const textMuted  = '#4E6176';
const textLight  = '#8BA5BD';
const border     = '#D7E4EE';
const danger     = '#A43C35';

module.exports = {
  id: 'driver-tree',
  title: 'Driver Tree / Issue Tree',
  tier: 3,
  proves: 'value-driver decomposition with algebraic relationships (×, +, =)',
  data: 'Revenue decomposition: Total → Volume × Price → leaf drivers with variance',
  sectionLabel: 'Profitability Decomposition',
  actionTitle: 'Margin decline is driven by volume erosion in mid-tier, not pricing — market share loss is the root cause',
  source: 'Source: Financial model, team analysis',
  exhibitId: 'Exhibit 3.1',
  renderExhibit({ tokens }) {
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi, Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const connW      = lerp([20, 40]);
    const nodeMetric = lerp([14, 22]);
    const leafMetric = lerp([11, 17]);
    const nodePad    = lerp([6, 14]);
    const labelFont  = lerp([8, 11]);
    const opSize     = lerp([11, 16]);
    const gap        = lerp([4, 8]);

    function rootNode(label, value, delta) {
      return `<div style="display:flex;align-items:center;justify-content:center;">
        <div style="background:${navy};color:#fff;padding:${nodePad}px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;width:100%;">
          <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:600;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.04em;">${label}</div>
          <div style="font-family:${fontFamily};font-size:${nodeMetric}px;font-weight:700;line-height:1.1;margin-top:${Math.round(nodePad * 0.4)}px;">${value}</div>
          <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:600;color:rgba(255,255,255,0.7);margin-top:${Math.round(nodePad * 0.3)}px;">${delta}</div>
        </div>
      </div>`;
    }

    function l1Node(label, value, delta, deltaColor) {
      return `<div style="border:1px solid ${navy};background:#fff;padding:${nodePad}px;display:flex;flex-direction:column;align-items:center;text-align:center;box-sizing:border-box;">
        <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:600;color:${textLight};text-transform:uppercase;letter-spacing:0.04em;">${label}</div>
        <div style="font-family:${fontFamily};font-size:${nodeMetric}px;font-weight:700;color:${textStrong};line-height:1.1;margin-top:${Math.round(nodePad * 0.4)}px;">${value}</div>
        <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:600;color:${deltaColor};margin-top:${Math.round(nodePad * 0.3)}px;">${delta}</div>
      </div>`;
    }

    function leafNode(label, value, delta, deltaColor, alert = false) {
      const leftBorder = alert ? `border-left:3px solid ${danger};` : '';
      return `<div style="border:1px solid ${border};${leftBorder}background:#fff;padding:${nodePad}px;display:flex;flex-direction:column;align-items:center;text-align:center;box-sizing:border-box;">
        <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:600;color:${textLight};text-transform:uppercase;letter-spacing:0.04em;">${label}</div>
        <div style="font-family:${fontFamily};font-size:${leafMetric}px;font-weight:700;color:${textStrong};line-height:1.1;margin-top:${Math.round(nodePad * 0.4)}px;">${value}</div>
        <div style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:600;color:${deltaColor};margin-top:${Math.round(nodePad * 0.3)}px;">${delta}</div>
      </div>`;
    }

    function operator(symbol) {
      return `<div style="font-family:${fontFamily};font-weight:700;color:${navy};font-size:${opSize}px;text-align:center;line-height:1;">${symbol}</div>`;
    }

    // Connector column: horizontal line spanning to the midpoints of the nodes it connects
    function connectorCol() {
      return `<div style="position:relative;height:100%;display:flex;align-items:stretch;">
        <div style="width:${connW}px;position:relative;">
          <div style="position:absolute;top:50%;left:0;right:0;height:1px;background:${border};transform:translateY(-50%);"></div>
        </div>
      </div>`;
    }

    // Left connector: single horizontal line from root to L1 column midpoint
    const leftConn = `<div style="display:flex;align-items:center;height:100%;">
      <div style="width:${connW}px;height:1px;background:${border};"></div>
    </div>`;

    // Right connector: vertical spine + horizontal branches to each leaf row
    // We use a flex column matching the L1 column layout
    const rightConn = `<div style="display:flex;flex-direction:column;gap:${gap}px;height:100%;width:${connW}px;position:relative;">
      <div style="flex:1;position:relative;display:flex;align-items:center;">
        <div style="position:absolute;top:50%;left:0;width:100%;height:1px;background:${border};"></div>
      </div>
      <div style="height:${opSize + gap * 2}px;"></div>
      <div style="flex:1;position:relative;display:flex;align-items:center;">
        <div style="position:absolute;top:50%;left:0;width:100%;height:1px;background:${border};"></div>
      </div>
    </div>`;

    const callout = `<div style="border-left:3px solid ${navy};padding-left:${nodePad}px;">
      <span style="font-family:${fontFamily};font-size:${labelFont}px;font-weight:600;color:${textMuted};">Key insight: </span><span style="font-family:${fontFamily};font-size:${labelFont}px;color:${textMuted};">Volume erosion (−8% vs plan) in mid-tier segment is the primary driver of revenue miss — market share loss of 3.2pp, not pricing, is the root cause.</span>
    </div>`;

    return `<style>${INTER_CSS}</style>
<div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
  <!-- Main driver tree -->
  <div style="display:grid;grid-template-columns:minmax(0,1fr) ${connW}px minmax(0,1fr) ${connW}px minmax(0,1fr);align-items:stretch;gap:0;min-height:0;">

    <!-- Col 1: Root node -->
    ${rootNode('Total Revenue', '$4.2B', '−$180M vs plan')}

    <!-- Col 2: Left connector -->
    ${leftConn}

    <!-- Col 3: L1 nodes stacked with operator -->
    <div style="display:flex;flex-direction:column;gap:${gap}px;justify-content:center;">
      ${l1Node('Volume', '12.4M', '−8% vs plan', danger)}
      ${operator('×')}
      ${l1Node('Avg Price', '$338', '+2% vs plan', blue)}
    </div>

    <!-- Col 4: Right connectors -->
    ${rightConn}

    <!-- Col 5: 2×2 leaf grid -->
    <div style="display:flex;flex-direction:column;gap:${gap}px;justify-content:center;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:${gap}px;">
        ${leafNode('Mkt Size', '48M', '+2% vs plan', blue)}
        ${leafNode('Mkt Share', '25.8%', '−3.2pp vs plan', danger, true)}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:${gap}px;">
        ${leafNode('List Price', '$395', '+4% vs plan', blue)}
        ${leafNode('Discount', '14.4%', '+1.8pp vs plan', danger)}
      </div>
    </div>

  </div>

  <!-- Callout -->
  ${callout}
</div>`;
  },
};
