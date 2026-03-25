// This script rebuilds the Indiana workforce automation slide as an editable PPTX.
// The background glow is rasterized to a temp PNG, while all text, lines, labels,
// and dumbbell-chart elements are native PowerPoint objects for maintainability.
const fs = require('fs');
const os = require('os');
const path = require('path');

const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const stripPptxMetadata = require(path.join(__dirname, '..', 'strip-pptx-metadata.js'));

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, 'indiana-Workforce-02-30-automation.pptx');

const SLIDE = {
  width: 960,
  height: 540,
  widthIn: 10,
  heightIn: 5.625
};

const FONTS = {
  serif: 'Source Serif 4',
  sans: 'Source Sans 3'
};

const COLORS = {
  bgBaseStart: '#02243f',
  bgBaseMid: '#0d2c76',
  bgBaseEnd: '#1634a7',
  bgRightGlowStart: '#375dff',
  bgRightGlowMid: '#1838b0',
  bgRightGlowEnd: '#091e62',
  bgLeftGlowStart: '#00414e',
  bgLeftGlowMid: '#002d42',
  bgLeftGlowEnd: '#001f38',
  fg: '#f2f4fb',
  line: '#5f7099',
  lineStrong: '#98a4b9',
  axisLine: '#d7ddec',
  axisMarker: '#8ea1cf',
  cyan: '#12aef0',
  lavender: '#b8c8ff',
  arrow: '#070b14',
  allRowBg: '#8b8f98',
  allRowText: '#05070c',
  footWhite: '#f1f5fc',
  deltaWhite: '#f5f5f5'
};

// Slide-level anchors keep the reconstructed plot aligned to the reference design.
// Chart data lives below in `sections`; these numbers are the visual frame it sits inside.
const LAYOUT = {
  titleLeft: 34,
  titleTop: 14,
  titleWidth: 900,
  titleHeight: 66,
  legendTop: 76,
  legendDotTop: 81,
  legendDotSize: 10,
  legendItem1DotLeft: 47,
  legendItem1TextLeft: 67,
  legendItem1Width: 390,
  legendItem2DotLeft: 476,
  legendItem2TextLeft: 496,
  legendItem2Width: 380,
  accelLeft: 34,
  accelTop: 108,
  accelWidth: 560,
  subtitleLeft: 34,
  subtitleTop: 128,
  subtitleWidth: 820,
  headerLeftLabelLeft: 40,
  headerOccLeft: 296,
  headerTop: 167,
  headerWidth: 220,
  axisLeft: 516,
  axisTop: 178,
  axisWidth: 404,
  axisLineHeight: 2,
  tickHeight: 7,
  tickWidth: 2,
  tickLabelTop: 155,
  axisMarkerHeight: 18,
  axisMarkerTop: 171,
  headerRuleLeft: 34,
  headerRuleTop: 191,
  headerRuleWidth: 886,
  headerRuleHeight: 1,
  sectionRuleLeft: 34,
  sectionRuleWidth: 886,
  sectionRuleHeight: 2,
  rowRuleLeft: 295,
  rowRuleWidth: 625,
  rowRuleHeight: 1,
  groupTitleLeft: 40,
  groupTitleWidth: 250,
  occupationLeft: 293,
  occupationWidth: 287,
  occupationHeight: 18,
  occupationAnchorOffset: 7,
  deltaLabelWidth: 28,
  deltaLabelHeight: 16,
  deltaLabelTopOffset: 9,
  allRowBgLeft: 292,
  allRowBgTop: 475,
  allRowBgWidth: 628,
  allRowBgHeight: 17,
  footnoteLeft: 34,
  footnoteBottom: 24,
  sourceBottom: 8
};

const AXIS = {
  min: 0,
  max: 40,
  markerValue: Number((((232 / LAYOUT.axisWidth) * 40)).toFixed(4)),
  ticks: [0, 10, 20, 30, 40]
};

function axisPxToValue(pixelX) {
  return Number((((pixelX - LAYOUT.axisLeft) / LAYOUT.axisWidth) * (AXIS.max - AXIS.min)).toFixed(4));
}

function axisValueToPx(value) {
  return Number((LAYOUT.axisLeft + ((value - AXIS.min) / (AXIS.max - AXIS.min)) * LAYOUT.axisWidth).toFixed(2));
}

function makeRow({
  occupation,
  labelTop,
  chartTop = labelTop,
  startPx,
  endPx,
  deltaLabel,
  separatorTop,
  all = false,
  deltaColor = COLORS.fg
}) {
  return {
    occupation,
    labelTop,
    chartTop,
    withoutGenAi: axisPxToValue(startPx),
    withGenAi: axisPxToValue(endPx),
    deltaLabel,
    separatorTop,
    all,
    deltaColor
  };
}

// Canonical dumbbell-table model: section titles, occupation labels, and adoption values live here.
// Rows still keep a few explicit y-anchors because the original slide uses bespoke spacing, not a uniform table grid.
const sections = [
  {
    titleTop: 213,
    titleLines: [
      'High increase in labor demand and high',
      'change of work activities'
    ],
    dividerTop: 262,
    rows: [
      makeRow({ occupation: 'STEM professionals', labelTop: 204, startPx: 659, endPx: 816, deltaLabel: '16', separatorTop: 213 }),
      makeRow({ occupation: 'Education and workforce training', labelTop: 221, startPx: 590, endPx: 753, deltaLabel: '16', separatorTop: 229 }),
      makeRow({ occupation: 'Creatives and arts management', labelTop: 237, startPx: 619, endPx: 768, deltaLabel: '15', separatorTop: 246 }),
      makeRow({ occupation: 'Business and legal professionals', labelTop: 253, chartTop: 254, startPx: 674, endPx: 819, deltaLabel: '14' })
    ]
  },
  {
    titleTop: 338,
    titleLines: [
      'High increase in labor demand and',
      'modest change of work activities'
    ],
    dividerTop: 442,
    rows: [
      makeRow({ occupation: 'Managers', labelTop: 270, startPx: 655, endPx: 751, deltaLabel: '9', separatorTop: 278 }),
      makeRow({ occupation: 'Community services', labelTop: 286, chartTop: 287, startPx: 701, endPx: 793, deltaLabel: '9', separatorTop: 295 }),
      makeRow({ occupation: 'Agriculture', labelTop: 303, startPx: 786, endPx: 818, deltaLabel: '3', separatorTop: 311 }),
      makeRow({ occupation: 'Health Professionals', labelTop: 319, startPx: 639, endPx: 702, deltaLabel: '6', separatorTop: 327 }),
      makeRow({ occupation: 'Builders', labelTop: 336, startPx: 772, endPx: 835, deltaLabel: '6', separatorTop: 344 }),
      makeRow({ occupation: 'Property Maintenance', labelTop: 352, startPx: 639, endPx: 701, deltaLabel: '6', separatorTop: 360 }),
      makeRow({ occupation: 'Health aides, technicians, and wellness', labelTop: 369, startPx: 677, endPx: 717, deltaLabel: '4', separatorTop: 377 }),
      makeRow({ occupation: 'Food services', labelTop: 385, startPx: 834, endPx: 889, deltaLabel: '5', separatorTop: 393 }),
      makeRow({ occupation: 'Transportation services', labelTop: 401, chartTop: 402, startPx: 724, endPx: 779, deltaLabel: '5', separatorTop: 410 }),
      makeRow({ occupation: 'Mechanical installation and repair', labelTop: 418, startPx: 794, endPx: 847, deltaLabel: '5', separatorTop: 426 }),
      makeRow({ occupation: 'Production work', labelTop: 434, startPx: 825, endPx: 871, deltaLabel: '4' })
    ]
  },
  {
    titleTop: 445,
    titleLines: [
      'Modest decrease in labor demand',
      'with modest change of work activities'
    ],
    rows: [
      makeRow({ occupation: 'Customer service and sales', labelTop: 451, startPx: 745, endPx: 805, deltaLabel: '6', separatorTop: 459 }),
      makeRow({ occupation: 'Office support', labelTop: 467, startPx: 830, endPx: 897, deltaLabel: '7', separatorTop: 476 }),
      makeRow({ occupation: 'All sectors', labelTop: 483, chartTop: 484, startPx: 731, endPx: 812, deltaLabel: '8', all: true, deltaColor: COLORS.deltaWhite })
    ]
  }
];

const TEXT = {
  titleLines: [
    '2. By 2030, 30 percent of hours worked today could be automated',
    'in the U.S.'
  ],
  legend1: 'Automation adoption without generative AI acceleration',
  legend2: 'Automation adoption with generative AI acceleration',
  accel: `XX \u2013 Acceleration in automation adoption from generative AI`,
  subtitle: 'Midpoint automation adoption by 2030 as a share of time spent on work activities, US, %',
  headerLeft: 'Change in Labor Demand & Adoption',
  headerOcc: 'Occupation',
  footnote: '1. Totals are weighted by 2022 employment in each occupation',
  source: 'Source: O*NET; US Bureau of Labor Statistics; McKinsey Global Institute analysis'
};

function pxToInX(value) {
  return Number(((value / SLIDE.width) * SLIDE.widthIn).toFixed(4));
}

function pxToInY(value) {
  return Number(((value / SLIDE.height) * SLIDE.heightIn).toFixed(4));
}

function pxToPt(value) {
  return Number(((value * 72) / 96).toFixed(2));
}

function pptColor(hex) {
  return hex.replace('#', '').toUpperCase();
}

async function createBackgroundPng(outputPath) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SLIDE.width}" height="${SLIDE.height}" viewBox="0 0 ${SLIDE.width} ${SLIDE.height}">
    <defs>
      <linearGradient id="base" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${COLORS.bgBaseStart}"/>
        <stop offset="54%" stop-color="${COLORS.bgBaseMid}"/>
        <stop offset="100%" stop-color="${COLORS.bgBaseEnd}"/>
      </linearGradient>
      <radialGradient id="glowRight" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${COLORS.bgRightGlowStart}" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="${COLORS.bgRightGlowMid}" stop-opacity="0.56"/>
        <stop offset="72%" stop-color="${COLORS.bgRightGlowEnd}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowLeft" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${COLORS.bgLeftGlowStart}" stop-opacity="0.62"/>
        <stop offset="48%" stop-color="${COLORS.bgLeftGlowMid}" stop-opacity="0.2"/>
        <stop offset="75%" stop-color="${COLORS.bgLeftGlowEnd}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#base)"/>
    <ellipse cx="940.8" cy="64.8" rx="600" ry="350" fill="url(#glowRight)"/>
    <ellipse cx="38.4" cy="496.8" rx="350" ry="280" fill="url(#glowLeft)"/>
  </svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
}

function addTextBox(slide, text, options) {
  slide.addText(text, {
    margin: 0,
    color: pptColor(COLORS.fg),
    fontFace: FONTS.sans,
    ...options
  });
}

function addMultilineText(slide, lines, options) {
  slide.addText(
    lines.map((line, index) => ({
      text: line,
      options: { breakLine: index < lines.length - 1 }
    })),
    {
      margin: 0,
      color: pptColor(COLORS.fg),
      fontFace: FONTS.sans,
      ...options
    }
  );
}

function addTitle(slide) {
  slide.addText(
    TEXT.titleLines.map((line, index) => ({
      text: line,
      options: { breakLine: index < TEXT.titleLines.length - 1, bold: true }
    })),
    {
      x: pxToInX(LAYOUT.titleLeft),
      y: pxToInY(LAYOUT.titleTop),
      w: pxToInX(LAYOUT.titleWidth),
      h: pxToInY(LAYOUT.titleHeight),
      margin: 0,
      fontFace: FONTS.serif,
      fontSize: pxToPt(30),
      lineSpacingMultiple: 1.05,
      color: pptColor('#f3f6fd')
    }
  );
}

function addLegend(slide, pptx) {
  const items = [
    {
      dotLeft: LAYOUT.legendItem1DotLeft,
      textLeft: LAYOUT.legendItem1TextLeft,
      width: LAYOUT.legendItem1Width,
      color: COLORS.cyan,
      label: TEXT.legend1
    },
    {
      dotLeft: LAYOUT.legendItem2DotLeft,
      textLeft: LAYOUT.legendItem2TextLeft,
      width: LAYOUT.legendItem2Width,
      color: COLORS.lavender,
      label: TEXT.legend2
    }
  ];

  items.forEach((item) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: pxToInX(item.dotLeft),
      y: pxToInY(LAYOUT.legendDotTop),
      w: pxToInX(LAYOUT.legendDotSize),
      h: pxToInY(LAYOUT.legendDotSize),
      fill: { color: pptColor(item.color) },
      line: { color: pptColor(item.color), transparency: 100, width: 0 }
    });

    addTextBox(slide, item.label, {
      x: pxToInX(item.textLeft),
      y: pxToInY(LAYOUT.legendTop),
      w: pxToInX(item.width),
      h: pxToInY(20),
      fontSize: pxToPt(14),
      fit: 'shrink',
      wrap: false,
      valign: 'mid',
      color: pptColor('#f1f5fd')
    });
  });
}

function addHeaders(slide) {
  addTextBox(slide, TEXT.accel, {
    x: pxToInX(LAYOUT.accelLeft),
    y: pxToInY(LAYOUT.accelTop),
    w: pxToInX(LAYOUT.accelWidth),
    h: pxToInY(20),
    fontSize: pxToPt(15),
    fit: 'shrink',
    wrap: false,
    valign: 'mid',
    color: pptColor('#eef3fb')
  });

  addTextBox(slide, TEXT.subtitle, {
    x: pxToInX(LAYOUT.subtitleLeft),
    y: pxToInY(LAYOUT.subtitleTop),
    w: pxToInX(LAYOUT.subtitleWidth),
    h: pxToInY(20),
    fontSize: pxToPt(17),
    bold: true,
    fit: 'shrink',
    wrap: false,
    valign: 'mid',
    color: pptColor('#f3f5fd')
  });

  addTextBox(slide, TEXT.headerLeft, {
    x: pxToInX(LAYOUT.headerLeftLabelLeft),
    y: pxToInY(LAYOUT.headerTop),
    w: pxToInX(230),
    h: pxToInY(16),
    fontSize: pxToPt(14),
    bold: true
  });

  addTextBox(slide, TEXT.headerOcc, {
    x: pxToInX(LAYOUT.headerOccLeft),
    y: pxToInY(LAYOUT.headerTop),
    w: pxToInX(100),
    h: pxToInY(16),
    fontSize: pxToPt(14),
    bold: true
  });
}

function addAxis(slide, pptx) {
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(LAYOUT.axisLeft),
    y: pxToInY(LAYOUT.axisTop),
    w: pxToInX(LAYOUT.axisWidth),
    h: pxToInY(LAYOUT.axisLineHeight),
    fill: { color: pptColor(COLORS.axisLine) },
    line: { color: pptColor(COLORS.axisLine), transparency: 100, width: 0 }
  });

  AXIS.ticks.forEach((tick) => {
    const tickLeft = axisValueToPx(tick);
    const labelX = tick === AXIS.max ? tickLeft - 10 : tickLeft - 14;

    addTextBox(slide, String(tick), {
      x: pxToInX(labelX),
      y: pxToInY(LAYOUT.tickLabelTop),
      w: pxToInX(28),
      h: pxToInY(20),
      fontSize: pxToPt(18),
      bold: true,
      color: pptColor(COLORS.fg)
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: pxToInX(tickLeft - 1),
      y: pxToInY(LAYOUT.axisTop),
      w: pxToInX(LAYOUT.tickWidth),
      h: pxToInY(LAYOUT.tickHeight),
      fill: { color: pptColor(COLORS.axisLine) },
      line: { color: pptColor(COLORS.axisLine), transparency: 100, width: 0 }
    });
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(axisValueToPx(AXIS.markerValue) - 1),
    y: pxToInY(LAYOUT.axisMarkerTop),
    w: pxToInX(2),
    h: pxToInY(LAYOUT.axisMarkerHeight),
    fill: { color: pptColor(COLORS.axisMarker) },
    line: { color: pptColor(COLORS.axisMarker), transparency: 100, width: 0 }
  });
}

function addRules(slide, pptx) {
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(LAYOUT.headerRuleLeft),
    y: pxToInY(LAYOUT.headerRuleTop),
    w: pxToInX(LAYOUT.headerRuleWidth),
    h: pxToInY(LAYOUT.headerRuleHeight),
    fill: { color: pptColor('#8996b7') },
    line: { color: pptColor('#8996b7'), transparency: 100, width: 0 }
  });

  sections.forEach((section) => {
    if (typeof section.dividerTop === 'number') {
      slide.addShape(pptx.ShapeType.rect, {
        x: pxToInX(LAYOUT.sectionRuleLeft),
        y: pxToInY(section.dividerTop),
        w: pxToInX(LAYOUT.sectionRuleWidth),
        h: pxToInY(LAYOUT.sectionRuleHeight),
        fill: { color: pptColor(COLORS.lineStrong) },
        line: { color: pptColor(COLORS.lineStrong), transparency: 100, width: 0 }
      });
    }

    section.rows.forEach((row) => {
      if (typeof row.separatorTop === 'number') {
        slide.addShape(pptx.ShapeType.rect, {
          x: pxToInX(LAYOUT.rowRuleLeft),
          y: pxToInY(row.separatorTop),
          w: pxToInX(LAYOUT.rowRuleWidth),
          h: pxToInY(LAYOUT.rowRuleHeight),
          fill: { color: pptColor(COLORS.line) },
          line: { color: pptColor(COLORS.line), transparency: 100, width: 0 }
        });
      }
    });
  });
}

function addGroupTitles(slide) {
  sections.forEach((section) => {
    addMultilineText(slide, section.titleLines, {
      x: pxToInX(LAYOUT.groupTitleLeft),
      y: pxToInY(section.titleTop),
      w: pxToInX(LAYOUT.groupTitleWidth),
      h: pxToInY(34),
      fontSize: pxToPt(14),
      bold: true,
      italic: true,
      lineSpacingMultiple: 1.05,
      color: pptColor('#f3f5fb')
    });
  });
}

function addAllRowBackground(slide, pptx) {
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(LAYOUT.allRowBgLeft),
    y: pxToInY(LAYOUT.allRowBgTop),
    w: pxToInX(LAYOUT.allRowBgWidth),
    h: pxToInY(LAYOUT.allRowBgHeight),
    fill: { color: pptColor(COLORS.allRowBg) },
    line: { color: pptColor(COLORS.allRowBg), transparency: 100, width: 0 }
  });
}

function addOccupationLabels(slide) {
  sections.forEach((section) => {
    section.rows.forEach((row) => {
      const labelY = row.labelTop - LAYOUT.occupationAnchorOffset;

      if (row.all) {
        slide.addText([
          { text: 'All sectors', options: { bold: true, color: pptColor(COLORS.allRowText) } },
          { text: '1', options: { superscript: true, fontSize: pxToPt(11), bold: true, color: pptColor(COLORS.allRowText) } }
        ], {
          x: pxToInX(LAYOUT.occupationLeft),
          y: pxToInY(labelY),
          w: pxToInX(150),
          h: pxToInY(LAYOUT.occupationHeight),
          margin: 0,
          fontFace: FONTS.sans,
          fontSize: pxToPt(15),
          wrap: false,
          fit: 'shrink',
          valign: 'top',
          color: pptColor(COLORS.allRowText)
        });
        return;
      }

      addTextBox(slide, row.occupation, {
        x: pxToInX(LAYOUT.occupationLeft),
        y: pxToInY(labelY),
        w: pxToInX(LAYOUT.occupationWidth),
        h: pxToInY(LAYOUT.occupationHeight),
        fontSize: pxToPt(15),
        fit: 'shrink',
        wrap: false,
        valign: 'top',
        color: pptColor('#f3f6fd')
      });
    });
  });
}

function addDumbbellRow(slide, pptx, row) {
  const startX = axisValueToPx(row.withoutGenAi);
  const endX = axisValueToPx(row.withGenAi);
  const deltaLabelLeft = ((startX + endX) / 2) - (LAYOUT.deltaLabelWidth / 2);

  // Each row is rendered natively as a dumbbell: start dot, arrow bar, end dot, and delta label.
  // This preserves editability while staying visually close to the HTML reference.
  slide.addShape(pptx.ShapeType.line, {
    x: pxToInX(startX + 4),
    y: pxToInY(row.chartTop),
    w: pxToInX(Math.max(endX - startX - 10, 0)),
    h: 0,
    line: {
      color: pptColor(COLORS.arrow),
      width: 1.5,
      beginArrowType: 'none',
      endArrowType: 'triangle'
    }
  });

  slide.addShape(pptx.ShapeType.ellipse, {
    x: pxToInX(startX - 4),
    y: pxToInY(row.chartTop - 4),
    w: pxToInX(9),
    h: pxToInY(9),
    fill: { color: pptColor(COLORS.cyan) },
    line: { color: pptColor(COLORS.cyan), transparency: 100, width: 0 }
  });

  slide.addShape(pptx.ShapeType.ellipse, {
    x: pxToInX(endX - 4),
    y: pxToInY(row.chartTop - 4),
    w: pxToInX(9),
    h: pxToInY(9),
    fill: { color: pptColor(COLORS.lavender) },
    line: { color: pptColor(COLORS.lavender), transparency: 100, width: 0 }
  });

  addTextBox(slide, row.deltaLabel, {
    x: pxToInX(deltaLabelLeft),
    y: pxToInY(row.chartTop - LAYOUT.deltaLabelTopOffset),
    w: pxToInX(LAYOUT.deltaLabelWidth),
    h: pxToInY(LAYOUT.deltaLabelHeight),
    fontSize: pxToPt(15),
    bold: true,
    align: 'center',
    valign: 'mid',
    color: pptColor(row.deltaColor)
  });
}

function addDumbbells(slide, pptx) {
  sections.forEach((section) => {
    section.rows.forEach((row) => addDumbbellRow(slide, pptx, row));
  });
}

function addFooter(slide) {
  addTextBox(slide, TEXT.footnote, {
    x: pxToInX(LAYOUT.footnoteLeft),
    y: pxToInY(SLIDE.height - LAYOUT.footnoteBottom - 10),
    w: pxToInX(460),
    h: pxToInY(12),
    fontSize: pxToPt(10),
    bold: true,
    color: pptColor(COLORS.footWhite)
  });

  addTextBox(slide, TEXT.source, {
    x: pxToInX(LAYOUT.footnoteLeft),
    y: pxToInY(SLIDE.height - LAYOUT.sourceBottom - 10),
    w: pxToInX(520),
    h: pxToInY(12),
    fontSize: pxToPt(10),
    bold: true,
    color: pptColor(COLORS.fg)
  });
}

async function buildSlide(externalPptx) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'indiana-workforce-automation-'));
  const backgroundPath = path.join(tempDir, 'indiana-workforce-02-30-automation-bg.png');

  try {
    await createBackgroundPng(backgroundPath);

    const pptx = externalPptx || new pptxgen();
    if (!externalPptx) pptx.layout = 'LAYOUT_16x9';
    const slide = pptx.addSlide();
    slide.addImage({ path: backgroundPath, x: 0, y: 0, w: SLIDE.widthIn, h: SLIDE.heightIn });

    addTitle(slide);
    addLegend(slide, pptx);
    addHeaders(slide);
    addAxis(slide, pptx);
    addRules(slide, pptx);
    addGroupTitles(slide);
    addAllRowBackground(slide, pptx);
    addOccupationLabels(slide);
    addDumbbells(slide, pptx);
    addFooter(slide);

    if (!externalPptx) {
      fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
      await pptx.writeFile({ fileName: OUTPUT_PATH });
      await stripPptxMetadata(OUTPUT_PATH);
      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log(`Wrote: ${OUTPUT_PATH}`);
    }
    return pptx;
  } catch (error) {
    console.error(`Build failed. Temp files kept at: ${tempDir}`);
    throw error;
  }
}

module.exports = { buildSlide };
if (require.main === module) buildSlide().catch((e) => { console.error(e); process.exitCode = 1; });
