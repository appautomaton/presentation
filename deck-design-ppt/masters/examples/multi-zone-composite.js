// Altagamma US market slide — fully native editable PPTX.
// Multi-zone layout: header with title, chart panel with quarterly bars, factor panel with icons, footer band.
// Demonstrates: multi-zone composition, data-driven bar chart, icon placeholders, rich text footer columns.
const fs = require('fs');
const path = require('path');

const pptxgen = require('pptxgenjs');
const stripPptxMetadata = require(path.join(__dirname, '..', 'strip-pptx-metadata.js'));

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, 'altagamma2024-us-market.pptx');

// --- Scaling ---
const SOURCE_WIDTH = 1902;
const SOURCE_HEIGHT = 1058;
const TARGET_WIDTH = 960;
const TARGET_HEIGHT = 540;
const TARGET_WIDTH_IN = 10;
const TARGET_HEIGHT_IN = 5.625;
const SCALE_X = TARGET_WIDTH / SOURCE_WIDTH;
const SCALE_Y = TARGET_HEIGHT / SOURCE_HEIGHT;
const AVG_SCALE = (SCALE_X + SCALE_Y) / 2;

function sx(v) { return Number((v * SCALE_X).toFixed(2)); }
function sy(v) { return Number((v * SCALE_Y).toFixed(2)); }
function pxToInX(v) { return Number(((v / TARGET_WIDTH) * TARGET_WIDTH_IN).toFixed(4)); }
function pxToInY(v) { return Number(((v / TARGET_HEIGHT) * TARGET_HEIGHT_IN).toFixed(4)); }

// --- Colors ---
const C = {
  red: 'C83A2A', dark: '141414', chartBg: 'E7E7E8', chartRightBg: 'ECECEE',
  chartLine: 'D2D2D4', muted: '7D7D80', yearRed: 'BD384D',
  barBlack: '000000', barAccent: 'A03A5F', barQ4: '8A4A91',
  panelSep: 'D0D0D2', q4Split: 'F5F5F6',
  footerOverlay: '0C0A12', footerSep: 'D0D0D6', footerTitle: 'BF3258', footerBody: 'F2F2F5',
  iconPlaceholder: '444444',
};

// --- Layout ---
const HEADER_H = sy(198);
const CONTENT_H = sy(592);
const FOOTER_H = Number((TARGET_HEIGHT - HEADER_H - CONTENT_H).toFixed(2));
const CHART_LEFT_W = sx(1415);
const CHART_RIGHT_W = Number((TARGET_WIDTH - CHART_LEFT_W).toFixed(2));
const BASELINE_Y = sy(294); // zero line within chart content area

const FONTS = {
  eyebrowPt: Number((((18 * AVG_SCALE) * 72) / 96).toFixed(2)),
  titlePt: Number((((63 * AVG_SCALE) * 72) / 96).toFixed(2)),
  chartTitlePt: Number((((28 * AVG_SCALE) * 72) / 96).toFixed(2)),
  chartSubPt: Number((((17 * AVG_SCALE) * 72) / 96).toFixed(2)),
  yearPt: Number((((31 * AVG_SCALE) * 72) / 96).toFixed(2)),
  quarterPt: Number((((17 * AVG_SCALE) * 72) / 96).toFixed(2)),
  factorTitlePt: Number((((28 * AVG_SCALE) * 72) / 96).toFixed(2)),
  factorTextPt: Number((((20 * AVG_SCALE) * 72) / 96).toFixed(2)),
  footerHeadPt: Number((((31 * AVG_SCALE) * 72) / 96).toFixed(2)),
  footerBodyPt: Number((((20 * AVG_SCALE) * 72) / 96).toFixed(2)),
};

// --- Data ---
const chartBars = [
  { left: 52, height: 202, dir: 'pos', width: 64, color: C.barBlack },
  { left: 168, height: 168, dir: 'pos', width: 64, color: C.barBlack },
  { left: 284, height: 156, dir: 'pos', width: 64, color: C.barBlack },
  { left: 400, height: 58, dir: 'pos', width: 64, color: C.barBlack },
  { left: 516, height: 18, dir: 'pos', width: 64, color: C.barBlack },
  { left: 632, height: 64, dir: 'neg', width: 64, color: C.barBlack },
  { left: 748, height: 94, dir: 'neg', width: 64, color: C.barBlack },
  { left: 864, height: 34, dir: 'neg', width: 64, color: C.barBlack },
  { left: 980, height: 32, dir: 'neg', width: 64, color: C.barAccent },
  { left: 1098, height: 8, dir: 'pos', width: 58, color: C.barAccent },
  { left: 1214, height: 12, dir: 'neg', width: 58, color: C.barAccent },
  { left: 1328, height: 14, width: 66, color: C.barQ4, fixedTop: 286, splitLine: true },
];

const yearLabels = [
  { left: 46, text: '2022' }, { left: 510, text: '2023' }, { left: 980, text: '2024E', accent: true },
];
const quarterLabels = [
  { left: 64, text: 'Q1' }, { left: 180, text: 'Q2' }, { left: 296, text: 'Q3' }, { left: 412, text: 'Q4' },
  { left: 528, text: 'Q1' }, { left: 644, text: 'Q2' }, { left: 760, text: 'Q3' }, { left: 876, text: 'Q4' },
  { left: 998, text: 'Q1' }, { left: 1108, text: 'Q2' }, { left: 1224, text: 'Q3' }, { left: 1332, text: 'Q4E' },
];
const yearSeparators = [470, 950];

const factorRows = [
  { top: 116, icon: '\u2702', headline: 'Fed cut of interest rates refueling consumer spending', body: '' },
  { top: 242, icon: '\u270B', headline: 'Presidential election', body: 'ending turbulent season, with potential boost to economy' },
  { top: 368, icon: '\u{1F91D}', headline: 'Reducing inflation', body: 'freeing up disposable income' },
  { top: 494, icon: '\u{1F4B5}', headline: 'Potential tax cut', body: 'further fueling retail spending.. yet import tax on the rise?' },
];

const footerColumns = [
  { heading: 'Downtrading of non-VIC', body: 'Luxury consumers downgrading toward more value-for-money luxury and non-luxury brands, especially within department stores and outlet malls' },
  { heading: 'Unbalanced tourism impacting the region', body: 'Slow recovery of inbound flows, Latin American accelerating in Southern US, yet Chinese losing ground in Canada, while US consumers fly toward Europe' },
  { heading: 'Experientiality & uniqueness on the rise', body: 'Hyper-personalized customer service gaining relevance as paramount purchase criterion for new generations, alongside increasing quest for product uniqueness' },
  { heading: 'Sunbelt first, East over West', body: 'Continuing wealth flows toward "new" areas driving South performance, East outperforming West' },
];

// --- Drawing ---

function addHeader(slide) {
  const x = pxToInX(sx(48));
  slide.addText('WAVES OF TRANSITION', {
    x, y: pxToInY(sy(22)), w: pxToInX(sx(420)), h: pxToInY(sy(24)),
    margin: 0, fontFace: 'Arial', fontSize: FONTS.eyebrowPt, bold: true, color: C.red, charSpace: Number((9 * AVG_SCALE).toFixed(2)),
  });
  slide.addText('US market on improving trajectory,', {
    x, y: pxToInY(sy(72)), w: pxToInX(sx(1720)), h: pxToInY(sy(56)),
    margin: 0, fontFace: 'Arial', fontSize: FONTS.titlePt, fit: 'shrink', bold: true, color: '000000',
  });
  slide.addText('despite traffic halt and relevant outbound tourist flows', {
    x, y: pxToInY(sy(134)), w: pxToInX(sx(1800)), h: pxToInY(sy(58)),
    margin: 0, fontFace: 'Arial', fontSize: FONTS.titlePt, fit: 'shrink', bold: false, color: '000000',
  });
}

function addChartPanel(slide, pptx) {
  const contentY = HEADER_H;

  // Chart left background
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: pxToInY(contentY), w: pxToInX(CHART_LEFT_W), h: pxToInY(CONTENT_H), fill: { color: C.chartBg },
  });
  // Chart right background
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(CHART_LEFT_W), y: pxToInY(contentY), w: pxToInX(CHART_RIGHT_W), h: pxToInY(CONTENT_H), fill: { color: C.chartRightBg },
  });
  // Panel separator
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(CHART_LEFT_W), y: pxToInY(contentY), w: pxToInX(1.5), h: pxToInY(CONTENT_H), fill: { color: C.panelSep },
  });

  // Chart title + subtitle
  slide.addText('Americas quarter on quarter growth', {
    x: pxToInX(sx(44)), y: pxToInY(contentY + sy(20)), w: pxToInX(sx(600)), h: pxToInY(sy(30)),
    margin: 0, fontFace: 'Arial', fontSize: FONTS.chartTitlePt, bold: true, color: '111111', fit: 'shrink',
  });
  slide.addText('% | Q1-22, Q4-24E', {
    x: pxToInX(sx(44)), y: pxToInY(contentY + sy(54)), w: pxToInX(sx(300)), h: pxToInY(sy(18)),
    margin: 0, fontFace: 'Arial', fontSize: FONTS.chartSubPt, color: C.muted,
  });

  // Baseline (zero line)
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(sx(42)), y: pxToInY(contentY + BASELINE_Y),
    w: pxToInX(sx(1362)), h: pxToInY(Math.max(1.25, sy(2))), fill: { color: C.chartLine },
  });

  // Bars
  chartBars.forEach(bar => {
    const x = pxToInX(sx(bar.left));
    const w = pxToInX(sx(bar.width));
    const h = pxToInY(sy(bar.height));
    const barColor = bar.color.replace('#', '');
    let y;
    if (bar.fixedTop !== undefined) {
      y = pxToInY(contentY + sy(bar.fixedTop));
    } else if (bar.dir === 'pos') {
      y = pxToInY(contentY + BASELINE_Y - sy(bar.height));
    } else {
      y = pxToInY(contentY + BASELINE_Y);
    }
    slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: barColor } });
    // Split line for Q4E bar
    if (bar.splitLine) {
      slide.addShape(pptx.ShapeType.rect, {
        x, y: Number((y + h * 0.46).toFixed(4)), w, h: pxToInY(Math.max(1, sy(2))), fill: { color: C.q4Split },
      });
    }
  });

  // Year separators
  yearSeparators.forEach(left => {
    slide.addShape(pptx.ShapeType.rect, {
      x: pxToInX(sx(left)), y: pxToInY(contentY + sy(425)),
      w: pxToInX(Math.max(1, sx(2))), h: pxToInY(sy(66)), fill: { color: C.panelSep },
    });
  });

  // Year labels
  yearLabels.forEach(yl => {
    slide.addText(yl.text, {
      x: pxToInX(sx(yl.left)), y: pxToInY(contentY + sy(420)), w: pxToInX(sx(120)), h: pxToInY(sy(34)),
      margin: 0, fontFace: 'Arial', fontSize: FONTS.yearPt, bold: true, color: yl.accent ? C.yearRed : '111111',
    });
  });

  // Quarter labels
  quarterLabels.forEach(ql => {
    slide.addText(ql.text, {
      x: pxToInX(sx(ql.left)), y: pxToInY(contentY + sy(468)), w: pxToInX(sx(50)), h: pxToInY(sy(18)),
      margin: 0, fontFace: 'Arial', fontSize: FONTS.quarterPt, color: '1C1C1E',
    });
  });
}

function addFactorPanel(slide, pptx) {
  // Right panel bounds (inches)
  const panelLeftIn = pxToInX(CHART_LEFT_W) + 0.1;
  const panelTopIn = pxToInY(HEADER_H) + 0.08;
  const panelBottomIn = pxToInY(HEADER_H + CONTENT_H) - 0.05;
  const panelWIn = TARGET_WIDTH_IN - panelLeftIn - 0.1;
  const iconSizeIn = 0.4;
  const textLeftIn = panelLeftIn + iconSizeIn + 0.08;
  const textWIn = TARGET_WIDTH_IN - textLeftIn - 0.1;

  // Title
  const titleH = 0.42;
  slide.addText('With some sweet factors rising over the horizon', {
    x: panelLeftIn, y: panelTopIn, w: panelWIn, h: titleH,
    margin: 0, fontFace: 'Arial', fontSize: FONTS.factorTitlePt, bold: true, color: '111111', fit: 'shrink', valign: 'top',
  });

  // Distribute 4 factors evenly in remaining space
  const factorsTop = panelTopIn + titleH + 0.06;
  const factorsH = panelBottomIn - factorsTop;
  const rowH = factorsH / factorRows.length;

  factorRows.forEach((factor, i) => {
    const rowY = factorsTop + i * rowH;

    // Separator line
    if (i > 0) {
      slide.addShape(pptx.ShapeType.rect, {
        x: panelLeftIn, y: rowY, w: panelWIn, h: 0.01, fill: { color: C.panelSep },
      });
    }

    // Icon placeholder
    const iconY = rowY + 0.06;
    slide.addShape(pptx.ShapeType.rect, {
      x: panelLeftIn, y: iconY, w: iconSizeIn, h: iconSizeIn, fill: { color: 'F0F0F0' },
    });
    slide.addText(factor.icon, {
      x: panelLeftIn, y: iconY, w: iconSizeIn, h: iconSizeIn,
      fontSize: 18, align: 'center', valign: 'middle', margin: 0,
    });

    // Factor text — same Y as icon, height fills the row
    const textH = rowH - 0.1;
    const runs = [{ text: factor.headline, options: { bold: true, breakLine: Boolean(factor.body) } }];
    if (factor.body) runs.push({ text: factor.body, options: { bold: false } });
    slide.addText(runs, {
      x: textLeftIn, y: iconY, w: textWIn, h: textH,
      margin: 0, fontFace: 'Arial', fontSize: FONTS.factorTextPt, lineSpacingMultiple: 1.1, fit: 'shrink', color: '161616', valign: 'top',
    });
  });
}

function addFooter(slide, pptx) {
  const footerYIn = pxToInY(HEADER_H + CONTENT_H);
  const footerHIn = pxToInY(FOOTER_H);
  const colWIn = TARGET_WIDTH_IN / 4;
  const padIn = 0.12;
  const innerWIn = colWIn - padIn * 2;
  const headingHIn = 0.42;

  // Footer dark background
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: footerYIn, w: TARGET_WIDTH_IN, h: footerHIn, fill: { color: C.footerOverlay },
  });

  // Top rule
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: footerYIn, w: TARGET_WIDTH_IN, h: 0.02, fill: { color: '07070A', transparency: 40 },
  });

  // Column dividers
  for (let i = 1; i < 4; i++) {
    slide.addShape(pptx.ShapeType.rect, {
      x: colWIn * i, y: footerYIn, w: 0.01, h: footerHIn, fill: { color: C.footerSep, transparency: 62 },
    });
  }

  // Separate heading + body text boxes per column
  footerColumns.forEach((col, i) => {
    const xIn = colWIn * i + padIn;
    const headYIn = footerYIn + 0.1;
    const bodyYIn = headYIn + headingHIn + 0.04;
    const bodyHIn = footerHIn - 0.1 - headingHIn - 0.04 - 0.08;

    // Heading — larger font, natural wrap
    slide.addText(col.heading, {
      x: xIn, y: headYIn, w: innerWIn, h: headingHIn,
      margin: 0, fontFace: 'Arial', fontSize: FONTS.footerHeadPt, bold: true, color: C.footerTitle,
      valign: 'top', fit: 'shrink', lineSpacingMultiple: 1.1,
    });

    // Body — separate box below heading
    slide.addText(col.body, {
      x: xIn, y: bodyYIn, w: innerWIn, h: Math.max(0.2, bodyHIn),
      margin: 0, fontFace: 'Arial', fontSize: FONTS.footerBodyPt, color: C.footerBody,
      valign: 'top', fit: 'shrink', lineSpacingMultiple: 1.14,
    });
  });
}

// --- Entry point ---
async function buildSlide(externalPptx) {
  const pptx = externalPptx || new pptxgen();
  if (!externalPptx) pptx.layout = 'LAYOUT_16x9';
  const slide = pptx.addSlide();

  addHeader(slide);
  addChartPanel(slide, pptx);
  addFactorPanel(slide, pptx);
  addFooter(slide, pptx);

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
