// Louisiana DOT outsourcing-mix slide — fully native editable PPTX.
// Demonstrates: data table with column headers, row fills, gold chips, narrative blocks,
// takeaway cards with chevron connectors, header/content/footer bands.
const path = require('path');

const pptxgen = require('pptxgenjs');
const stripPptxMetadata = require(path.join(__dirname, '..', 'strip-pptx-metadata.js'));
let pptx = new pptxgen();

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, 'Louisiana-DOT-15-Implied-outsourcing-mix.pptx');

const SLIDE = { widthPt: 720, heightPt: 405, widthIn: 10, heightIn: 5.625 };
const FONTS = { body: 'Source Sans 3' };

const COLORS = {
  bg: 'FFFFFF', frame: 'B8B8B8', bar: '5CB87A',
  grayHeader: '6E6F73', greenHeader: '5CB87A', mintHeader: 'CFE6CC', mintText: '2E6E3A',
  title: '5CB87A', text: '575757', sep: 'CDCDCD',
  tint: 'E8E8E8', tintB: 'DDDDDE', source: '7F7F7F',
  gold: 'D9D08C', rule: 'A6A6A6', white: 'FFFFFF',
};

const LAYOUT = {
  marginX: 30, topBarHeight: 4, titleTop: 10, titleHeight: 48,
  spacerWidth: 210, footerBottom: 6,
};

const TABLE = { headerTop: 117, headerHeight: 29, rowHeight: 17, labelWidth: 210 };

const CONTENT = {
  title: 'As capital program grows, DOTD will naturally experience shift toward higher outsourcing mix given constraints on hiring',
  narrative: [
    ['Currently, DOTD is at a', '55/45 mix of', 'outsourced vs. internal', 'indirect spend...'],
    ['... however, more funding', 'will require heavy', 'leverage of consultants', 'given challenges in hiring', 'and retention...'],
    ['... which will naturally', 'result in a shift over time', "to a 'higher-outsourcing'", 'model that DOTD will', 'need to adapt to'],
  ],
  columns: [
    { title: 'Current LaDOTD', fill: 'gray' },
    { title: 'Incremental $1B', fill: 'green' },
    { title: 'Future LaDOTD', fill: 'mint' },
  ],
  rows: [
    { label: 'Capital awarded', values: ['$1.1B', '+$1B', '$2.1B'], bold: true, fill: 'white' },
    { label: '$ Internal Resources/Capital awarded', values: ['10%', '', '5%'], fill: 'tint' },
    { label: '$ Consulting Services/Capital awarded', values: ['12%', '26%', '19%'], fill: 'tint' },
    { label: 'Total Indirect spend/Capital awarded', values: ['22%', '26%', '24%'], bold: true, fill: 'tintB' },
    { label: '$ Internal Resources Total', values: ['$115M', '', '$115M (+$0M)'], fill: 'white' },
    { label: '$ Consulting Services Total', values: ['$135M', '(+$260M)', '$395M (+$260M)'], fill: 'white' },
    { label: 'Total Implied Budget', values: ['$250M', '(+$260M)', '$510M (+$260M)'], bold: true, fill: 'white' },
    { label: 'Outsourcing Mix (Consultant vs. Internal)', values: ['55/45', '', '80/20'], bold: true, fill: 'white', chips: [0, 2] },
  ],
  note: '(+/- $XX) Change from current state',
  noteSide: 'Note: Numbers may not add exactly due to rounding',
  takeaways: [
    ['Some opportunity for', 'improving efficiency in', 'current mix of outsourcing', 'based on benchmarks'],
    ['Any internal efficiency gains can', 'be re-invested to optimize', 'operating model to manage', 'higher capital with consulting', 'support'],
    ['New model can be executed with', 'current DOTD infrastructure,', 'however model should balance', 'internal expertise and consultant', 'management'],
  ],
  source: 'Source: DOT annual reports; Expert calls',
};

function ptToIn(v) { return Number((v / 72).toFixed(4)); }

function addTextBox(slide, text, options = {}) {
  slide.addText(text, { margin: 0, fontFace: FONTS.body, color: COLORS.text, breakLine: false, valign: 'mid', ...options });
}

function headerFill(fill) {
  if (fill === 'gray') return { color: COLORS.grayHeader, text: COLORS.white };
  if (fill === 'green') return { color: COLORS.greenHeader, text: COLORS.white };
  return { color: COLORS.mintHeader, text: COLORS.mintText };
}

function rowFill(fill) {
  if (fill === 'tint') return COLORS.tint;
  if (fill === 'tintB') return COLORS.tintB;
  return COLORS.bg;
}

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
    line: { color: COLORS.frame, pt: 0.75 }, fill: { color: COLORS.bg },
  });

  // Header bar
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: SLIDE.widthIn, h: ptToIn(LAYOUT.topBarHeight), fill: { color: COLORS.bar },
  });

  // Title
  addTextBox(slide, CONTENT.title, {
    x: ptToIn(LAYOUT.marginX), y: ptToIn(LAYOUT.titleTop),
    w: ptToIn(SLIDE.widthPt - LAYOUT.marginX * 2), h: ptToIn(LAYOUT.titleHeight),
    fontSize: 19, bold: true, color: COLORS.title,
  });

  const contentWidth = SLIDE.widthPt - LAYOUT.marginX * 2;
  const colWidth = (contentWidth - LAYOUT.spacerWidth) / 3;
  const dataLeft = LAYOUT.marginX + LAYOUT.spacerWidth;

  // Narrative blocks
  CONTENT.narrative.forEach((block, i) => {
    addTextBox(slide, block.join('\n'), {
      x: ptToIn(dataLeft + i * colWidth + 5), y: ptToIn(68),
      w: ptToIn(colWidth - 10), h: ptToIn(34),
      fontSize: 9.2, bold: true, color: COLORS.title,
    });
  });

  // Column headers
  CONTENT.columns.forEach((col, i) => {
    const style = headerFill(col.fill);
    const x = dataLeft + i * colWidth;
    slide.addShape(pptx.ShapeType.rect, {
      x: ptToIn(x), y: ptToIn(TABLE.headerTop), w: ptToIn(colWidth - 1.5), h: ptToIn(TABLE.headerHeight),
      fill: { color: style.color },
    });
    addTextBox(slide, col.title, {
      x: ptToIn(x), y: ptToIn(TABLE.headerTop + 5), w: ptToIn(colWidth - 1.5), h: ptToIn(18),
      fontSize: 13, bold: true, color: style.text, align: 'center',
    });
  });

  // Data rows
  CONTENT.rows.forEach((row, ri) => {
    const y = TABLE.headerTop + TABLE.headerHeight + ri * TABLE.rowHeight;
    const fillColor = rowFill(row.fill);
    slide.addShape(pptx.ShapeType.rect, {
      x: ptToIn(LAYOUT.marginX), y: ptToIn(y), w: ptToIn(contentWidth), h: ptToIn(TABLE.rowHeight),
      fill: { color: fillColor },
    });
    slide.addShape(pptx.ShapeType.line, {
      x: ptToIn(LAYOUT.marginX), y: ptToIn(y + TABLE.rowHeight), w: ptToIn(contentWidth), h: 0,
      line: { color: ri === CONTENT.rows.length - 1 ? '999999' : COLORS.sep, pt: ri === CONTENT.rows.length - 1 ? 1.5 : 0.5 },
    });
    addTextBox(slide, row.label, {
      x: ptToIn(LAYOUT.marginX + 5), y: ptToIn(y + 1), w: ptToIn(TABLE.labelWidth - 10), h: ptToIn(TABLE.rowHeight - 2),
      fontSize: 10.5, color: COLORS.text, bold: Boolean(row.bold),
    });
    row.values.forEach((value, ci) => {
      const x = dataLeft + ci * colWidth;
      if (row.chips && row.chips.includes(ci) && value) {
        const chipW = 44;
        slide.addShape(pptx.ShapeType.rect, {
          x: ptToIn(x + (colWidth - chipW) / 2), y: ptToIn(y + 1), w: ptToIn(chipW), h: ptToIn(15.5),
          fill: { color: COLORS.gold },
        });
      }
      addTextBox(slide, value, {
        x: ptToIn(x), y: ptToIn(y + 1), w: ptToIn(colWidth), h: ptToIn(TABLE.rowHeight - 2),
        fontSize: 11, color: COLORS.text, bold: Boolean(row.bold), align: 'center',
      });
    });
  });

  // Notes
  addTextBox(slide, CONTENT.note, {
    x: ptToIn(LAYOUT.marginX), y: ptToIn(255), w: ptToIn(180), h: ptToIn(10),
    fontSize: 7.5, italic: true, bold: true, color: COLORS.source,
  });
  addTextBox(slide, CONTENT.noteSide, {
    x: ptToIn(LAYOUT.marginX + 8), y: ptToIn(329), w: ptToIn(150), h: ptToIn(30),
    fontSize: 7.5, italic: true, bold: true, color: COLORS.source, align: 'center',
  });

  // Takeaway cards
  CONTENT.takeaways.forEach((takeaway, i) => {
    const x = dataLeft + i * colWidth;
    slide.addShape(pptx.ShapeType.line, {
      x: ptToIn(x + 10), y: ptToIn(320), w: ptToIn(colWidth - 20), h: 0,
      line: { color: COLORS.rule, pt: 0.55 },
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: ptToIn(x + colWidth / 2 - 9.75), y: ptToIn(308), w: ptToIn(19.5), h: ptToIn(19.5),
      line: { color: COLORS.bar, pt: 0.5 }, fill: { color: COLORS.bar },
    });
    slide.addText('\u2304', {
      x: ptToIn(x + colWidth / 2 - 5), y: ptToIn(308), w: ptToIn(10), h: ptToIn(12),
      margin: 0, fontFace: FONTS.body, fontSize: 12, color: COLORS.white, bold: true, align: 'center',
    });
    addTextBox(slide, takeaway.join('\n'), {
      x: ptToIn(x + 6), y: ptToIn(334), w: ptToIn(colWidth - 12), h: ptToIn(58),
      fontSize: 8, color: COLORS.text, align: 'center', valign: 'top',
    });
  });

  // Footer source
  addTextBox(slide, CONTENT.source, {
    x: ptToIn(LAYOUT.marginX), y: ptToIn(SLIDE.heightPt - LAYOUT.footerBottom - 8),
    w: ptToIn(220), h: ptToIn(8), fontSize: 8, color: COLORS.source,
  });

  if (!externalPptx) {
    await pptx.writeFile({ fileName: OUTPUT_PATH });
    await stripPptxMetadata(OUTPUT_PATH);
  }
  return pptx;
}

module.exports = { buildSlide };
if (require.main === module) buildSlide().catch((e) => { console.error(e); process.exitCode = 1; });
