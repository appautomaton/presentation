const fs   = require('fs');
const path = require('path');

// Load vendored DM Sans (weights: 400, 600, 700) — BCG's typeface
const DM_SANS_DIR = path.join(__dirname, '../vendor/fonts/dm-sans');
const DM_SANS_CSS = [400, 600, 700].map(w => {
  const file = path.join(DM_SANS_DIR, `${w}.css`);
  return fs.readFileSync(file, 'utf8')
    .replace(/url\(\.\//g, `url(file://${DM_SANS_DIR}/`);
}).join('\n');

// ════════════════════════════════════════════════════════════════════════
// Organizational Model — BCG style
// ════════════════════════════════════════════════════════════════════════
// Target operating model: CEO box → BU layer → shared services bar.
// BCG aesthetic: DM Sans, dark green structural, lime callout borders,
// no fill on CEO box, no rounded corners, no shadows.
// Recommended minimum: 300px on the shorter side.
//
// Responsive template for agentic AI. Three things to change:
//   1. Brand variables  → swap from BCG palette if needed
//   2. Data             → swap bus[], sharedSvcs[], designCallouts[]
//   3. Sizing limits    → tune knobs if defaults don't fit
//
// Design notes for agents:
//   • CEO: border-only box (no fill) centered above 3-col BU grid
//   • BUs: border:1px solid gray; border-left:3px solid green
//   • Shared services: single wide bar with services listed inline
//   • Design callouts: border-left:3px solid lime, no card background
//   • Connectors: height:${connH}px; width:1px; background:gray; margin:0 auto

module.exports = {
  id: 'org-model',
  title: 'Organizational Model',
  tier: 3,
  proves: 'target operating model structure with design rationale',
  data: 'Product-aligned BUs with centralized shared services',
  sectionLabel: 'Target Operating Model',
  actionTitle: 'Product-aligned BUs with centralized shared services reduce layers from 7 to 4 and cut decision cycle by 60%',
  source: 'Source: Organizational design team, target state March 2026',
  exhibitId: 'Exhibit 8.1',

  renderExhibit({ tokens }) {
    // ── 1. Brand variables (BCG palette) ────────────────────────────────
    const fontFamily = "'DM Sans', sans-serif";
    const accent     = '#0F6B4F';   // BCG dark green — structural
    const lime       = '#6AB648';   // BCG lime green — callout borders
    const charcoal   = '#111111';
    const textMuted  = '#5F6368';
    const border     = '#D0D0D0';

    // ── 2. Data ─────────────────────────────────────────────────────────
    const bus = [
      { name: 'Cloud Platform',  rev: '$1.8B', ppl: '2,400 FTEs' },
      { name: 'Data & AI',       rev: '$1.2B', ppl: '1,600 FTEs' },
      { name: 'Enterprise Apps', rev: '$1.2B', ppl: '1,800 FTEs' },
    ];
    const sharedSvcs = ['Finance & Accounting', 'HR & Talent', 'IT & Infrastructure', 'Legal & Compliance'];

    const designCallouts = [
      'Product-aligned P&L ownership — each BU owns revenue, cost, and roadmap independently',
      'Centralize procurement, FP&A, and HRBP into shared services — saves ~$45M and standardizes processes',
    ];

    // ── 3. Sizing limits ────────────────────────────────────────────────
    const bodyFontRange  = [9,  13];    // [min, max] px for BU name, svc text
    const microFontRange = [7,  10];    // [min, max] px for labels, sub-text
    const padRange       = [6,  14];    // [min, max] px cell padding
    const gapRange       = [4,  10];    // [min, max] px between elements
    const connHRange     = [8,  14];    // [min, max] px connector height
    const ceoMinWRange   = [140, 200];  // [min, max] px for CEO box min-width

    // ── Responsive sizing (computed — don't edit) ────────────────────────
    const minDim = Math.min(tokens.width, tokens.height);
    const lerp = (range) => {
      const [lo, hi] = range;
      return Math.max(lo, Math.min(hi,
        Math.round(lo + (minDim - 300) / (720 - 300) * (hi - lo))));
    };

    const bodyFont  = lerp(bodyFontRange);
    const microFont = lerp(microFontRange);
    const pad       = lerp(padRange);
    const gap       = lerp(gapRange);
    const connH     = lerp(connHRange);
    const ceoMinW   = lerp(ceoMinWRange);

    // ── Connector ────────────────────────────────────────────────────────
    const connectorV = `<div style="height:${connH}px;width:1px;background:${border};margin:0 auto;"></div>`;

    // ── CEO card ─────────────────────────────────────────────────────────
    const ceoCard = `
      <div style="display:flex;justify-content:center;">
        <div style="border:2px solid ${accent};padding:${pad}px ${pad * 2}px;text-align:center;min-width:${ceoMinW}px;">
          <div style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${textMuted};">Executive</div>
          <div style="font-family:${fontFamily};font-size:${bodyFont + 2}px;font-weight:700;color:${charcoal};margin-top:2px;">CEO + 3 Direct Reports</div>
          <div style="font-family:${fontFamily};font-size:${microFont}px;color:${textMuted};margin-top:1px;">COO · CFO · Chief Product Officer</div>
        </div>
      </div>`;

    // ── BU grid ──────────────────────────────────────────────────────────
    const buCards = bus.map(bu =>
      `<div style="border:1px solid ${border};border-left:3px solid ${accent};padding:${pad}px;">
        <div style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${textMuted};">Business Unit</div>
        <div style="font-family:${fontFamily};font-size:${bodyFont}px;font-weight:700;color:${charcoal};margin-top:2px;">${bu.name}</div>
        <div style="font-family:${fontFamily};font-size:${microFont}px;color:${textMuted};margin-top:${Math.round(gap / 2)}px;">${bu.rev} rev · ${bu.ppl}</div>
      </div>`
    ).join('');

    const buGrid = `
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:${gap}px;">
        ${buCards}
      </div>`;

    // ── Shared services bar ──────────────────────────────────────────────
    const sharedSvcBar = `
      <div style="border:1px solid ${border};padding:${Math.round(pad * 0.7)}px ${pad}px;display:flex;align-items:center;gap:${gap + 4}px;">
        <div style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${accent};white-space:nowrap;flex-shrink:0;">Shared Services</div>
        <div style="font-family:${fontFamily};font-size:${microFont}px;color:${textMuted};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${sharedSvcs.join(' · ')}</div>
      </div>`;

    // ── Design callouts ──────────────────────────────────────────────────
    const calloutDivs = designCallouts.map(txt =>
      `<div style="border-left:3px solid ${lime};padding:${Math.round(gap / 2)}px ${gap + 2}px;flex:1;min-width:0;">
        <span style="font-family:${fontFamily};font-size:${microFont}px;font-weight:700;color:${accent};">Design choice: </span><span style="font-family:${fontFamily};font-size:${microFont}px;color:${textMuted};">${txt}</span>
      </div>`
    ).join('');

    // ── Template ─────────────────────────────────────────────────────────
    return `<style>${DM_SANS_CSS}</style>
    <div class="h-full w-full" style="display:grid;grid-template-rows:minmax(0,1fr) auto;gap:${gap}px;padding:2px;overflow:hidden;">
      <div style="display:flex;flex-direction:column;gap:${gap}px;justify-content:center;">
        ${ceoCard}
        ${connectorV}
        ${buGrid}
        ${connectorV}
        ${sharedSvcBar}
      </div>
      <div style="display:flex;gap:${gap}px;flex-wrap:wrap;border-top:1px solid ${border};padding-top:${gap}px;">
        ${calloutDivs}
      </div>
    </div>`;
  },
};
