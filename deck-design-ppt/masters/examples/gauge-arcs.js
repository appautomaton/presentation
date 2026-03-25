// AP Health comparison slide — fully native editable PPTX.
// All elements (gauges, stacked bars, text, legends) are native PowerPoint objects.
// One `countryRows` data model drives country order, gauge scores, arc colors, and segment percentages.
const path = require('path');
const fs = require('fs');

const pptxgen = require('pptxgenjs');
const stripPptxMetadata = require(path.join(__dirname, '..', 'strip-pptx-metadata.js'));

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, 'aphealth2020-14-healthcare-sys.pptx');

// --- Scaling ---
const SOURCE_WIDTH = 1300;
const SOURCE_HEIGHT = 726;
const TARGET_WIDTH = 960;
const TARGET_HEIGHT = 540;
const TARGET_WIDTH_IN = 10;
const TARGET_HEIGHT_IN = 5.625;
const SCALE_X = TARGET_WIDTH / SOURCE_WIDTH;
const SCALE_Y = TARGET_HEIGHT / SOURCE_HEIGHT;
const AVG_SCALE = (SCALE_X + SCALE_Y) / 2;

function sx(v) { return Number((v * SCALE_X).toFixed(2)); }
function sy(v) { return Number((v * SCALE_Y).toFixed(2)); }
function sFont(v) { return Number((v * AVG_SCALE).toFixed(2)); }
function pxToInX(v) { return Number(((v / TARGET_WIDTH) * TARGET_WIDTH_IN).toFixed(4)); }
function pxToInY(v) { return Number(((v / TARGET_HEIGHT) * TARGET_HEIGHT_IN).toFixed(4)); }

// --- Zone boundaries ---
const HEADER_HEIGHT = sy(20);
const FOOTER_TOP = sy(571);
const FOOTER_HEIGHT = Number((TARGET_HEIGHT - FOOTER_TOP).toFixed(2));
function contentY(sourceY) { return Number((sy(sourceY) - HEADER_HEIGHT).toFixed(2)); }

// --- Colors ---
const C = {
  bg: 'E8E8E8', text: '1F1F22', dark: '5B5D61', mid: 'AFB1B4',
  ring: 'AFB1B4', red: 'F12C21', border: 'DEDEDE',
};

// --- Layout ---
const L = {
  leftRailLeft: sx(28), leftRailWidth: sx(8),
  topRailTop: contentY(70), topRailHeight: sy(234),
  bottomRailTop: contentY(332), bottomRailHeight: sy(224),
  leftPanelLeft: sx(53), sideSubWidth: 146, sideLegendWidth: 146.88,
  countryColumnWidth: sx(146), countryRuleWidth: sx(114),
  countryRuleHeight: Math.max(1.5, sy(3)), countryRuleMarginTop: sy(10),
  gaugeWidth: sx(106), gaugeHeight: sy(106),
  consumerDistTop: sy(182), physicianDistTop: sy(452),
  naTop: sy(347), distWidth: sx(145), distHeight: sy(70),
  footerLeft: sx(30),
  footerWidth: Number((TARGET_WIDTH - (sx(30) * 2)).toFixed(2)),
  footerSourceWidth: Number(((TARGET_WIDTH - (sx(30) * 2)) / 1.02).toFixed(2)),
};

const F = {
  sideTitle: sFont(30), sideSub: sFont(21.5), sideLegend: sFont(19.2),
  countryName: sFont(25), segment: sFont(18.6), segmentNarrow: sFont(16.8),
  segmentTiny: sFont(15.4), notes: sFont(16.4), na: sFont(33),
  gaugeValuePt: Number((((31 * AVG_SCALE) * 72) / 96).toFixed(2)),
};

// --- Data ---
const CONSUMER_PANEL = { title: 'Consumer', subText: 'Net Promoter Score\u00AE for places of treatment visited in the past 6 months' };
const PHYSICIAN_PANEL = { title: 'Physician', subText: 'Net Promoter Score for their workplace as a place of treatment' };
const LEGEND_LINES = [
  { text: 'Promoter', color: C.red },
  { text: 'Passive', color: 'B3B4B8' },
  { text: 'Detractor', color: '4F5053' },
];

const countryRows = [
  { name: 'Australia', left: 260,
    consumer: { valueText: '23%', color: 'dark', segments: [{ tone: 'red', value: 42, display: '42%' }, { tone: 'mid', value: 38, display: '38' }, { tone: 'dark', value: 20, display: '20' }] },
    physician: { valueText: '44%', color: 'dark', segments: [{ tone: 'red', value: 57, display: '57%' }, { tone: 'mid', value: 29, display: '29' }, { tone: 'dark', value: 14, display: '14' }] } },
  { name: 'Singapore', left: 434,
    consumer: { valueText: '19', color: 'dark', segments: [{ tone: 'red', value: 38, display: '38%' }, { tone: 'mid', value: 43, display: '43' }, { tone: 'dark', value: 19, display: '19' }] },
    physician: { na: true } },
  { name: 'India', left: 609,
    consumer: { valueText: '28', color: 'dark', segments: [{ tone: 'red', value: 47, display: '47' }, { tone: 'mid', value: 34, display: '34' }, { tone: 'dark', value: 19, display: '19' }] },
    physician: { valueText: '42', color: 'dark', segments: [{ tone: 'red', value: 54, display: '54%' }, { tone: 'mid', value: 33, display: '33' }, { tone: 'dark', value: 13, display: '13' }] } },
  { name: 'Indonesia', left: 783,
    consumer: { valueText: '14', color: 'dark', segments: [{ tone: 'red', value: 33, display: '33%' }, { tone: 'mid', value: 49, display: '49' }, { tone: 'dark', value: 19, display: '19' }] },
    physician: { valueText: '1', color: 'red', segments: [{ tone: 'red', value: 21, display: '21%', sizeClass: 'micro' }, { tone: 'mid', value: 60, display: '60' }, { tone: 'dark', value: 19, display: '19' }] } },
  { name: 'China', left: 956,
    consumer: { valueText: '30', color: 'dark', segments: [{ tone: 'red', value: 46, display: '46%' }, { tone: 'mid', value: 39, display: '39' }, { tone: 'dark', value: 16, display: '16' }] },
    physician: { valueText: '22', color: 'dark', segments: [{ tone: 'red', value: 43, display: '43%' }, { tone: 'mid', value: 35, display: '35' }, { tone: 'dark', value: 22, display: '22' }] } },
  { name: 'Thailand', left: 1130,
    consumer: { valueText: '5', color: 'red', segments: [{ tone: 'red', value: 35, display: '35%' }, { tone: 'mid', value: 35, display: '35' }, { tone: 'dark', value: 30, display: '30' }] },
    physician: { na: true } },
];

// --- Stacked bar segment widths (last segment absorbs rounding) ---
function computeSegmentWidths(segments) {
  let used = 0;
  return segments.map((seg, i) => {
    if (i === segments.length - 1) return Number((L.distWidth - used).toFixed(2));
    const w = Number(((seg.value / 100) * L.distWidth).toFixed(2));
    used += w;
    return w;
  });
}

// --- Gauge arc math ---
function gaugeSweepDegrees(valueText) {
  const score = Math.max(0, parseFloat(String(valueText)) || 0);
  return Number(Math.max(8, (6.19 * score) - (0.07 * score * score)).toFixed(2));
}

function gaugeAngleRange(valueText) {
  const sweep = gaugeSweepDegrees(valueText);
  return [270, Number(((270 + sweep) % 360).toFixed(2))];
}

// --- Drawing functions ---

function addGauge(slide, pptx, countryLeftSource, gaugeTopSource, gaugeData) {
  const xPx = sx(countryLeftSource);
  const yPx = Number((sy(gaugeTopSource) - 5.5).toFixed(2));
  const x = pxToInX(xPx), y = pxToInY(yPx);
  const w = pxToInX(L.gaugeWidth), h = pxToInY(L.gaugeHeight);
  const color = gaugeData.color === 'red' ? C.red : C.dark;

  slide.addShape(pptx.ShapeType.ellipse, { x, y, w, h, fill: { color: C.bg, transparency: 100 }, line: { color: C.ring, width: 0.95 } });
  slide.addShape(pptx.ShapeType.arc, { x, y, w, h, angleRange: gaugeAngleRange(gaugeData.valueText), fill: { color: C.bg, transparency: 100 }, line: { color, width: 2.15 } });
  slide.addText(gaugeData.valueText, { x, y: Number((y + h * 0.02).toFixed(4)), w, h, margin: 0, align: 'center', valign: 'mid', fontFace: 'Arial', fontSize: F.gaugeValuePt, bold: true, color, breakLine: false });
}

function addBackground(slide, pptx) {
  const H = HEADER_HEIGHT;
  slide.background = { color: C.bg };

  // Red rails
  slide.addShape(pptx.ShapeType.rect, { x: pxToInX(L.leftRailLeft), y: pxToInY(H + L.topRailTop), w: pxToInX(L.leftRailWidth), h: pxToInY(L.topRailHeight), fill: { color: C.red } });
  slide.addShape(pptx.ShapeType.rect, { x: pxToInX(L.leftRailLeft), y: pxToInY(H + L.bottomRailTop), w: pxToInX(L.leftRailWidth), h: pxToInY(L.bottomRailHeight), fill: { color: C.red } });

  // Panel text: two boxes per panel, same bounds as bar, valign top/bottom
  const panelX = pxToInX(L.leftPanelLeft);
  const panelW = pxToInX(L.sideSubWidth);
  const titlePt = Number(((F.sideTitle * 72) / 96).toFixed(2));
  const subPt = Number(((F.sideSub * 72) / 96).toFixed(2));
  const legendPt = Number(((F.sideLegend * 72) / 96).toFixed(2));

  function addPanel(barTopPx, barHeightPx, panel) {
    const y = pxToInY(H + barTopPx);
    const h = pxToInY(barHeightPx);

    // Title + subtitle: top-aligned
    slide.addText([
      { text: panel.title, options: { fontSize: titlePt, bold: true, color: '222327', breakLine: true, paraSpaceAfter: 2 } },
      { text: panel.subText, options: { fontSize: subPt, bold: false, color: '242428' } },
    ], { x: panelX, y, w: panelW, h, fontFace: 'Arial', margin: 0, valign: 'top', lineSpacingMultiple: 1.08, fit: 'shrink' });

    // Legend: bottom-aligned
    slide.addText(LEGEND_LINES.map((l, i) => ({
      text: l.text, options: { color: l.color, bold: true, breakLine: i < LEGEND_LINES.length - 1 },
    })), { x: panelX, y, w: panelW, h, fontFace: 'Arial', fontSize: legendPt, margin: 0, valign: 'bottom', lineSpacingMultiple: 1.12, fit: 'shrink' });
  }

  addPanel(L.topRailTop, L.topRailHeight, CONSUMER_PANEL);
  addPanel(L.bottomRailTop, L.bottomRailHeight, PHYSICIAN_PANEL);
}

function addDistribution(slide, pptx, countryLeftPx, topPx, segments) {
  const widths = computeSegmentWidths(segments);
  const toneColor = { red: C.red, mid: C.mid, dark: C.dark };
  const toneText = { red: 'FFFFFF', mid: '2B2D30', dark: 'F3F3F3' };

  let cursor = 0;
  segments.forEach((seg, i) => {
    const w = widths[i];
    const x = pxToInX(sx(countryLeftPx) + cursor);
    const y = pxToInY(topPx);
    const wIn = pxToInX(w), hIn = pxToInY(L.distHeight);
    const fontPt = w <= sx(24) ? Number(((F.segmentTiny * 72) / 96).toFixed(2))
      : w <= sx(32) ? Number(((F.segmentNarrow * 72) / 96).toFixed(2))
      : Number(((F.segment * 72) / 96).toFixed(2));

    slide.addShape(pptx.ShapeType.rect, { x, y, w: wIn, h: hIn, fill: { color: toneColor[seg.tone] } });
    if (i < segments.length - 1) slide.addShape(pptx.ShapeType.rect, { x: x + wIn, y, w: pxToInX(0.75), h: hIn, fill: { color: C.border } });
    slide.addText(seg.display, { x, y, w: wIn, h: hIn, fontSize: fontPt, fontFace: 'Arial', color: toneText[seg.tone], bold: true, align: 'center', valign: 'middle', margin: 0, fit: 'shrink' });
    cursor += w;
  });
  // Outer border
  slide.addShape(pptx.ShapeType.rect, { x: pxToInX(sx(countryLeftPx)), y: pxToInY(topPx), w: pxToInX(L.distWidth), h: pxToInY(L.distHeight), line: { color: C.border, width: 0.5 } });
}

function addCountries(slide, pptx) {
  const H = HEADER_HEIGHT;
  const namePt = Number(((F.countryName * 72) / 96).toFixed(2));
  const naPt = Number(((F.na * 72) / 96).toFixed(2));

  for (const country of countryRows) {
    const x = pxToInX(sx(country.left));
    slide.addText(country.name, { x, y: pxToInY(H), w: pxToInX(L.countryColumnWidth), h: pxToInY(sy(28)), fontSize: namePt, fontFace: 'Arial', color: '25262A', bold: true, margin: 0, fit: 'shrink' });
    slide.addShape(pptx.ShapeType.rect, { x, y: pxToInY(H + L.countryRuleMarginTop + sy(24)), w: pxToInX(L.countryRuleWidth), h: pxToInY(L.countryRuleHeight), fill: { color: '2D2F33' } });
    addDistribution(slide, pptx, country.left, H + L.consumerDistTop, country.consumer.segments);
    if (country.physician.na) {
      slide.addText('N/A', { x, y: pxToInY(H + L.naTop), w: pxToInX(L.gaugeWidth), h: pxToInY(sy(36)), fontSize: naPt, fontFace: 'Arial', color: 'B3B4B8', bold: true, align: 'center', margin: 0 });
    } else {
      addDistribution(slide, pptx, country.left, H + L.physicianDistTop, country.physician.segments);
    }
  }
}

function addGauges(slide, pptx) {
  for (const country of countryRows) {
    addGauge(slide, pptx, country.left, 70, country.consumer);
    if (!country.physician.na) addGauge(slide, pptx, country.left, 338, country.physician);
  }
}

function addFooter(slide) {
  const pt = Number(((F.notes * 72) / 96).toFixed(2));
  const x = pxToInX(L.footerLeft);
  const w = pxToInX(L.footerWidth);
  const y = pxToInY(FOOTER_TOP + sy(4));
  slide.addText(
    'Notes: Consumer Net Promoter Score calculated as a percentage of consumers answering 9 or 10 minus percentage of consumers answering 0\u20136 to the question: \u201COn a scale of 0 to 10 \u2026 how likely are you to recommend the following medical facility/facilities to a friend or colleague as a place for treatment?\u201D; physician Net Promoter Score calculated similarly; weighted average taken to aggregate individual centres to a country level Net Promoter Score; Net Promoter Score\u00AE is a registered trademark of Bain & Company, Inc., Fred Reichheld and Satmetrix Systems, Inc.',
    { x, y, w, h: pxToInY(FOOTER_HEIGHT - sy(20)), fontSize: pt, fontFace: 'Arial', color: C.text, margin: 0, lineSpacingMultiple: 1.23, fit: 'shrink', valign: 'top' }
  );
  slide.addText('Source: Bain Front Line of Healthcare Asia-Pacific Survey, 2019 (patient n=1,823; physician n=257)', {
    x, y: pxToInY(FOOTER_TOP + FOOTER_HEIGHT - sy(20)), w: pxToInX(L.footerSourceWidth), h: pxToInY(sy(18)),
    fontSize: pt, fontFace: 'Arial', color: C.text, margin: 0, fit: 'shrink',
  });
}

// --- Entry point ---
async function buildSlide(externalPptx) {
  const pptx = externalPptx || new pptxgen();
  if (!externalPptx) pptx.layout = 'LAYOUT_16x9';
  const slide = pptx.addSlide();

  addBackground(slide, pptx);
  addCountries(slide, pptx);
  addGauges(slide, pptx);
  addFooter(slide);

  if (!externalPptx) {
    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    await pptx.writeFile({ fileName: OUTPUT_PATH });
    await stripPptxMetadata(OUTPUT_PATH);
    console.log(`Wrote: ${OUTPUT_PATH}`);
  }
  return pptx;
}

module.exports = { buildSlide };
if (require.main === module) buildSlide().catch((e) => { console.error(e); process.exitCode = 1; });
