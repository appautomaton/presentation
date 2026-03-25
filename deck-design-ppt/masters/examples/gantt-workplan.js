// Virginia detailed workplan slide — fully native editable PPTX.
// Demonstrates: gantt-like plan driven from row model, calendar grid, status triangles,
// deliverable markers, requirement bubbles, biweekly status indicators.
const path = require('path');

const pptxgen = require('pptxgenjs');
const stripPptxMetadata = require(path.join(__dirname, '..', 'strip-pptx-metadata.js'));
let pptx = new pptxgen();

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, 'Spend-Virginia-31-Detailed-Workplan.pptx');

const SLIDE = { widthPx: 960, heightPx: 540, widthIn: 10, heightIn: 5.625 };
const FONTS = { body: 'Carlito' };

const COLORS = {
  bg: 'F4F4F4', frame: '9B9B9B', green: '35BA7A', greenSoft: 'B9D8B8',
  greenDark: '0D6A46', greenText: '3CB884', cellGray: 'E6E6E6',
  text: '565656', gridV: 'CBCBCB', gridH: 'D8E4D4',
  bubble: 'D3D3D3', bubbleText: '666666', white: 'FFFFFF', rightText: '6F6F6F',
};

// --- Layout zones ---
const HEADER = { left: 50, top: 31, width: 400, height: 28 };
const CONTENT = {
  headerLeft: 42, headerTop: 77, headerWidth: 874, headerHeight: 25,
  reqListLeft: 42, reqListTop: 127, reqListWidth: 365, reqRowHeight: 29,
  bubbleSize: 25, bubbleTextGap: 17,
  gridLeft: 407, gridTop: 127, gridWidth: 509, gridHeight: 319,
  dayRowTop: 102, dayRowHeight: 25,
};
const FOOTER = { biweeklyTop: 463, trianglesTop: 463, keyTop: 499, deliverableTop: 500 };

const DAYS = ['1-15', '16-30', '31-45', '46-60', '61-75', '76-90'];
const ROWS = [
  { id: '1a', text: 'Build addressable spend baseline', start: 0, span: 2 },
  { id: '1b', text: 'Analyze baseline across all categories', start: 1, span: 1 },
  { id: '1c', text: 'Run benchmarking analysis for each category', start: 1, span: 3 },
  { id: '1d', text: 'Develop list of actions to reduce spend', start: 1, span: 3 },
  { id: '1e', text: 'Provide high-level implementation roadmap', start: 2, span: 3 },
  { id: '1f', text: 'Identify improvements in source-to-pay process', start: 2, span: 3 },
  { id: '1g', text: 'Identify ways to achieve full savings potential', start: 2, span: 3 },
  { id: '1h', text: 'Recommend timelines to complete initiatives', start: 3, span: 2 },
  { id: '1i', text: 'Identify barriers / obstacles to execution', start: 3, span: 2 },
  { id: '1j', text: 'Provide Phase 1 final report', start: 4, span: 2 },
  { id: '1k', text: 'Provide proposal for Phase 1 implementation', start: 5, span: 1 },
];
const STATUS_TRIANGLES = [480, 565, 650, 735, 820, 905];
const DELIVERABLES = [
  { label: 'Baseline', x: 525, iconFirst: true },
  { label: 'Interim Report', x: 655, iconFirst: true },
  { label: 'Final Report', x: 790, iconFirst: false },
];

function pxToInX(v) { return Number(((v / SLIDE.widthPx) * SLIDE.widthIn).toFixed(4)); }
function pxToInY(v) { return Number(((v / SLIDE.heightPx) * SLIDE.heightIn).toFixed(4)); }
function pxToPt(v) { return Number(((v * 72) / 96).toFixed(2)); }

function addTextBox(slide, text, options = {}) {
  slide.addText(text, { margin: 0, fontFace: FONTS.body, color: COLORS.text, breakLine: false, valign: 'mid', ...options });
}

function drawDeliverableIcon(slide, x, y) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x: pxToInX(x), y: pxToInY(y), w: pxToInX(24), h: pxToInY(24),
    line: { color: COLORS.greenDark, pt: 0.5 }, fill: { color: COLORS.greenDark },
  });
  addTextBox(slide, '\u2606', {
    x: pxToInX(x), y: pxToInY(y + 1), w: pxToInX(24), h: pxToInY(20),
    fontSize: pxToPt(18), color: COLORS.white, align: 'center',
  });
}

// --- Header ---
function renderHeader(slide) {
  addTextBox(slide, 'Execution Plan - Phase 1', {
    x: pxToInX(HEADER.left), y: pxToInY(HEADER.top),
    w: pxToInX(HEADER.width), h: pxToInY(HEADER.height),
    fontSize: pxToPt(24), bold: true, color: COLORS.green,
  });
}

// --- Content ---
function renderContent(slide) {
  const C = CONTENT;
  const dayCellWidth = C.gridWidth / DAYS.length;

  // Green header bar
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(C.headerLeft), y: pxToInY(C.headerTop),
    w: pxToInX(C.headerWidth), h: pxToInY(C.headerHeight), fill: { color: COLORS.green },
  });
  addTextBox(slide, 'Requirement', {
    x: pxToInX(C.headerLeft + 12), y: pxToInY(C.headerTop + 5),
    w: pxToInX(160), h: pxToInY(18), fontSize: pxToPt(15), bold: true, color: COLORS.white,
  });
  addTextBox(slide, 'Days', {
    x: pxToInX(C.gridLeft), y: pxToInY(C.headerTop + 4),
    w: pxToInX(C.gridWidth), h: pxToInY(18), fontSize: pxToPt(14), bold: true, color: COLORS.white, align: 'center',
  });

  // Day row
  DAYS.forEach((day, i) => {
    const x = C.gridLeft + dayCellWidth * i;
    slide.addShape(pptx.ShapeType.rect, {
      x: pxToInX(x), y: pxToInY(C.dayRowTop), w: pxToInX(dayCellWidth), h: pxToInY(C.dayRowHeight),
      line: i === DAYS.length - 1 ? undefined : { color: COLORS.gridV, pt: 0.75, dash: 'dot' },
      fill: { color: COLORS.cellGray },
    });
    addTextBox(slide, day, {
      x: pxToInX(x), y: pxToInY(C.dayRowTop + 3), w: pxToInX(dayCellWidth), h: pxToInY(18),
      fontSize: pxToPt(12), bold: true, color: COLORS.text, align: 'center',
    });
  });

  // Vertical grid lines
  for (let i = 1; i < DAYS.length; i++) {
    slide.addShape(pptx.ShapeType.line, {
      x: pxToInX(C.gridLeft + dayCellWidth * i), y: pxToInY(C.gridTop),
      w: 0, h: pxToInY(C.gridHeight), line: { color: COLORS.gridV, pt: 1, dash: 'dot' },
    });
  }

  // Requirement rows
  ROWS.forEach((row, i) => {
    const rowTop = C.reqListTop + i * C.reqRowHeight;

    // Horizontal separator
    if (i > 0) {
      slide.addShape(pptx.ShapeType.line, {
        x: pxToInX(C.gridLeft), y: pxToInY(rowTop), w: pxToInX(C.gridWidth), h: 0,
        line: { color: COLORS.gridH, pt: 1, dash: 'dot' },
      });
    }

    // ID bubble
    slide.addShape(pptx.ShapeType.ellipse, {
      x: pxToInX(C.reqListLeft + 14), y: pxToInY(rowTop + 2),
      w: pxToInX(C.bubbleSize), h: pxToInY(C.bubbleSize),
      line: { color: COLORS.bubble, pt: 0.5 }, fill: { color: COLORS.bubble },
    });
    addTextBox(slide, row.id, {
      x: pxToInX(C.reqListLeft + 14), y: pxToInY(rowTop + 5),
      w: pxToInX(C.bubbleSize), h: pxToInY(18),
      fontSize: pxToPt(13), color: COLORS.bubbleText, align: 'center',
    });

    // Requirement text
    addTextBox(slide, row.text, {
      x: pxToInX(C.reqListLeft + 14 + C.bubbleSize + C.bubbleTextGap), y: pxToInY(rowTop + 3),
      w: pxToInX(300), h: pxToInY(22),
      fontSize: pxToPt(14), bold: true, color: COLORS.text,
    });

    // Gantt fill
    slide.addShape(pptx.ShapeType.rect, {
      x: pxToInX(C.gridLeft + dayCellWidth * row.start), y: pxToInY(rowTop),
      w: pxToInX(dayCellWidth * row.span), h: pxToInY(C.reqRowHeight),
      fill: { color: COLORS.greenSoft },
    });
  });

  // Copyright sidebar
  addTextBox(slide, 'Copyright \u00A9 2022 by Boston Consulting Group, All rights reserved.', {
    x: pxToInX(934), y: pxToInY(123), w: pxToInX(10), h: pxToInY(315),
    fontSize: pxToPt(7.5), color: COLORS.rightText, vert: 'vert270', align: 'center',
  });
}

// --- Footer ---
function renderFooter(slide) {
  const F = FOOTER;

  // Bi-weekly label
  addTextBox(slide, 'Bi-Weekly Status Updates', {
    x: pxToInX(223), y: pxToInY(F.biweeklyTop), w: pxToInX(250), h: pxToInY(18),
    fontSize: pxToPt(13), italic: true, bold: true, color: COLORS.greenText, align: 'center',
  });

  // Status triangles
  STATUS_TRIANGLES.forEach(left => {
    slide.addShape(pptx.ShapeType.triangle, {
      x: pxToInX(left - 11), y: pxToInY(F.trianglesTop), w: pxToInX(22), h: pxToInY(18),
      line: { color: '45BE8F', pt: 0.5 }, fill: { color: '45BE8F' },
    });
  });

  // Key deliverables label
  addTextBox(slide, 'Key Deliverables', {
    x: pxToInX(280), y: pxToInY(F.keyTop), w: pxToInX(180), h: pxToInY(18),
    fontSize: pxToPt(13), italic: true, bold: true, color: COLORS.greenDark, align: 'center',
  });

  // Deliverable items
  DELIVERABLES.forEach(item => {
    if (item.iconFirst) {
      drawDeliverableIcon(slide, item.x, F.deliverableTop);
      addTextBox(slide, item.label, {
        x: pxToInX(item.x + 34), y: pxToInY(F.deliverableTop + 1),
        w: pxToInX(120), h: pxToInY(22),
        fontSize: pxToPt(13), bold: true, color: COLORS.greenDark,
      });
    } else {
      addTextBox(slide, item.label, {
        x: pxToInX(item.x), y: pxToInY(F.deliverableTop + 1),
        w: pxToInX(90), h: pxToInY(22),
        fontSize: pxToPt(13), bold: true, color: COLORS.greenDark,
      });
      drawDeliverableIcon(slide, item.x + 90, F.deliverableTop);
    }
  });
}

// --- Entry point ---
async function buildSlide(externalPptx) {
  if (externalPptx) pptx = externalPptx;
  if (!externalPptx) {
    pptx.layout = 'LAYOUT_16x9';
    pptx.lang = 'en-US';
    pptx.theme = { headFontFace: FONTS.body, bodyFontFace: FONTS.body, lang: 'en-US' };
  }

  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bg };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: SLIDE.widthIn, h: SLIDE.heightIn,
    line: { color: COLORS.frame, pt: 1 }, fill: { color: COLORS.bg },
  });

  renderHeader(slide);
  renderContent(slide);
  renderFooter(slide);

  if (!externalPptx) {
    await pptx.writeFile({ fileName: OUTPUT_PATH });
    await stripPptxMetadata(OUTPUT_PATH);
  }
  return pptx;
}

module.exports = { buildSlide };
if (require.main === module) buildSlide().catch((e) => { console.error(e); process.exitCode = 1; });
