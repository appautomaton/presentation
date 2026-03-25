// Louisiana DOT attrition slide — fully native editable PPTX.
// Demonstrates: multi-panel layout, segmented stacked bars, dashed overlay brackets,
// axis labels with dot terminators, bullet observations panel, data-driven segment widths.
const path = require('path');

const pptxgen = require('pptxgenjs');
const stripPptxMetadata = require(path.join(__dirname, '..', 'strip-pptx-metadata.js'));
let pptx = new pptxgen();

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, 'Louisiana-DOT-01.pptx');

const SLIDE = { widthPt: 720, heightPt: 405, widthIn: 10, heightIn: 5.625 };
const FONTS = { body: 'Inter' };

const COLORS = {
  bg: 'F3F3F3', frame: '9B9B9B', green: '37A055', greenDark: '298240',
  text: '404040', gray: '7A7A7A', rule: 'A6A6A6', lightRule: 'D9D9D9',
  p1Light: 'E0E0E0', p1Dark: '666666',
  g1: '98D773', g2: '6ECA5D', g3: '4F9B43', g4: '387C2B',
  b1: 'BEE0F5', b2: '5FC4D0', b3: '327EBC', b4: '496495',
  white: 'FFFFFF',
};

const LAYOUT = {
  padLeft: 25, padRight: 25, padTop: 20, padBottom: 15,
  titleHeight: 32, panelTop: 67,
  p1Width: 140, dividerGap: 15, dividerWidth: 1, p2Width: 330, p3Width: 129,
};

const CONTENT = {
  title: [
    '74% of senior engineers and product managers have left road and bridge for',
    'other internal DOTD roles',
  ],
  panel1: {
    header: ['Road and bridge', 'section engineering', 'and PM roles'],
    total: '113',
    segments: [
      { label: ['Vacant', 'Eng & PM'], value: '27%', share: 0.27, color: COLORS.p1Light, textColor: '333333', dashed: true },
      { label: ['Filled', 'Eng & PM'], value: '73%', share: 0.73, color: COLORS.p1Dark, textColor: COLORS.white },
    ],
    axisLabel: ['Filled and vacant', 'engineering and', 'PM roles'],
    yLabels: [
      { top: 0.03, lines: ['Total Eng', 'and PM', "TO's"] },
      { top: 0.25, lines: ['Vacant', 'Eng & PM'] },
      { top: 0.73, lines: ['Filled', 'Eng & PM'] },
    ],
  },
  panel2: {
    header: ['Since 2020, 35 senior engineering and PM function in road', 'and bridge design have left the group\u00B9'],
    total: '35',
    leftBar: {
      axisLabel: 'Cause of Attrition',
      dashedLabel: 'Internal DOTD moves',
      dashedShare: 0.74,
      segments: [
        { value: '45%', share: 0.45, color: COLORS.g1, label: ['Lateral to', 'another section'] },
        { value: '29%', share: 0.29, color: COLORS.g2, label: ['Promoted to', 'a different section'] },
        { value: '18%', share: 0.18, color: COLORS.g3, label: ['Resigned to', 'work for consultant'] },
        { value: '8%', share: 0.08, color: COLORS.g4, label: ['Retired'] },
      ],
    },
    rightBar: {
      axisLabel: 'Titles of Attrition',
      dashedLabel: 'Turnover of Eng 6 and above',
      dashedStart: 0.21,
      segments: [
        { value: '21%', share: 0.21, color: COLORS.b1, label: ['Engineer 5'], textColor: '333333' },
        { value: '37%', share: 0.37, color: COLORS.b2, label: ['Engineer 6'], textColor: COLORS.white },
        { value: '32%', share: 0.32, color: COLORS.b3, label: ['E6 DCL'], textColor: COLORS.white },
        { value: '11%', share: 0.11, color: COLORS.b4, label: ['Engineer 7'], textColor: COLORS.white },
      ],
    },
  },
  panel3: {
    header: ['Observations'],
    bullets: [
      ['22% vacancy of', 'engineering and PM', 'roles in road and', 'bridge section'],
      ['74% of attrition due to', 'lateral or promotion to', 'another DOTD section'],
      ['18% of positions', 'resigned to work in', 'private sector'],
      ["80% of staff that left", 'came from title at', 'Engineering 6 or above'],
    ],
  },
  footer: '1. Excluded entry and mid-level engineering roles Source: Analysis provided by DOTD Engineering',
};

function ptToIn(v) { return Number((v / 72).toFixed(4)); }

function addTextBox(slide, text, options = {}) {
  slide.addText(text, { margin: 0, fontFace: FONTS.body, color: COLORS.text, breakLine: false, valign: 'mid', ...options });
}

function drawRule(slide, xPt, yPt, widthPt) {
  slide.addShape(pptx.ShapeType.line, {
    x: ptToIn(xPt), y: ptToIn(yPt), w: ptToIn(widthPt - 4), h: 0,
    line: { color: COLORS.rule, pt: 1 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: ptToIn(xPt + widthPt - 4), y: ptToIn(yPt - 2), w: ptToIn(4), h: ptToIn(4),
    line: { color: COLORS.rule, pt: 0.5 }, fill: { color: COLORS.rule },
  });
}

function renderPanel1(slide, p1X, panelTop) {
  addTextBox(slide, CONTENT.panel1.header.join('\n'), {
    x: ptToIn(p1X), y: ptToIn(panelTop), w: ptToIn(120), h: ptToIn(32),
    fontSize: 11, bold: true, color: '333333',
  });
  drawRule(slide, p1X, panelTop + 36, 112);

  const barX = p1X + 43, barY = panelTop + 82, barW = 50, barH = 200;
  addTextBox(slide, CONTENT.panel1.total, {
    x: ptToIn(barX), y: ptToIn(barY - 12), w: ptToIn(barW), h: ptToIn(10),
    fontSize: 10, bold: true, color: '555555', align: 'center',
  });
  addTextBox(slide, CONTENT.panel1.yLabels[0].lines.join('\n'), {
    x: ptToIn(p1X - 2), y: ptToIn(barY - 2), w: ptToIn(30), h: ptToIn(30),
    fontSize: 8, color: COLORS.gray, align: 'right',
  });

  let segTop = barY;
  CONTENT.panel1.segments.forEach((seg, i) => {
    const h = barH * seg.share;
    slide.addShape(pptx.ShapeType.rect, {
      x: ptToIn(barX), y: ptToIn(segTop), w: ptToIn(barW), h: ptToIn(h),
      line: seg.dashed ? { color: '888888', pt: 1, dash: 'dash' } : { color: seg.color, pt: 0 },
      fill: { color: seg.color },
    });
    addTextBox(slide, seg.value, {
      x: ptToIn(barX), y: ptToIn(segTop + h / 2 - 7), w: ptToIn(barW), h: ptToIn(14),
      fontSize: 9, bold: true, color: seg.textColor, align: 'center',
    });
    const lbl = CONTENT.panel1.yLabels[i + 1];
    addTextBox(slide, lbl.lines.join('\n'), {
      x: ptToIn(p1X - 2), y: ptToIn(barY + barH * lbl.top - 8), w: ptToIn(30), h: ptToIn(22),
      fontSize: 8, color: COLORS.gray, align: 'right',
    });
    segTop += h;
  });
  slide.addShape(pptx.ShapeType.line, {
    x: ptToIn(barX - 15), y: ptToIn(barY + barH + 3), w: ptToIn(80), h: 0,
    line: { color: '888888', pt: 1 },
  });
  addTextBox(slide, CONTENT.panel1.axisLabel.join('\n'), {
    x: ptToIn(barX - 12), y: ptToIn(barY + barH + 5), w: ptToIn(80), h: ptToIn(24),
    fontSize: 7.5, bold: true, color: '444444', align: 'center',
  });
}

function renderPanel2(slide, p2X, panelTop) {
  addTextBox(slide, CONTENT.panel2.header.join('\n'), {
    x: ptToIn(p2X), y: ptToIn(panelTop), w: ptToIn(LAYOUT.p2Width), h: ptToIn(32),
    fontSize: 11, bold: true, color: '333333',
  });
  drawRule(slide, p2X, panelTop + 36, 290);

  const leftBarX = p2X + 18, rightBarX = p2X + 201;
  const p2BarTop = panelTop + 82, p2BarH = 200, p2BarW = 50;

  [
    { x: leftBarX, config: CONTENT.panel2.leftBar, total: CONTENT.panel2.total, dashedTopShare: 0, dashedHeightShare: CONTENT.panel2.leftBar.dashedShare, dashedColor: COLORS.green },
    { x: rightBarX, config: CONTENT.panel2.rightBar, total: CONTENT.panel2.total, dashedTopShare: CONTENT.panel2.rightBar.dashedStart, dashedHeightShare: 1 - CONTENT.panel2.rightBar.dashedStart, dashedColor: COLORS.b3 },
  ].forEach((bar) => {
    addTextBox(slide, bar.total, {
      x: ptToIn(bar.x), y: ptToIn(p2BarTop - 12), w: ptToIn(p2BarW), h: ptToIn(10),
      fontSize: 10, bold: true, color: '555555', align: 'center',
    });

    // Dashed bracket
    const dashedY = p2BarTop + p2BarH * bar.dashedTopShare;
    const dashedH = p2BarH * bar.dashedHeightShare;
    slide.addShape(pptx.ShapeType.rect, {
      x: ptToIn(bar.x - 24), y: ptToIn(dashedY), w: ptToIn(126), h: ptToIn(dashedH),
      line: { color: bar.dashedColor, pt: 1, dash: 'dash' }, fill: { color: COLORS.bg, transparency: 100 },
    });
    // Rotated label — w = bracket height (line width after 270° rotation)
    const labelCenterX = bar.x - 12;
    const labelCenterY = dashedY + dashedH / 2;
    addTextBox(slide, bar.config.dashedLabel, {
      x: ptToIn(labelCenterX - dashedH / 2), y: ptToIn(labelCenterY - 7),
      w: ptToIn(dashedH), h: ptToIn(14),
      fontSize: 7, bold: true, color: bar.dashedColor, rotate: 270, align: 'center',
    });

    // Bar segments
    let cursor = p2BarTop;
    bar.config.segments.forEach((seg) => {
      const h = p2BarH * seg.share;
      slide.addShape(pptx.ShapeType.rect, {
        x: ptToIn(bar.x), y: ptToIn(cursor), w: ptToIn(p2BarW), h: ptToIn(h),
        line: { color: seg.color, pt: 0 }, fill: { color: seg.color },
      });
      addTextBox(slide, seg.value, {
        x: ptToIn(bar.x), y: ptToIn(cursor + h / 2 - 7), w: ptToIn(p2BarW), h: ptToIn(14),
        fontSize: 9, bold: true, color: seg.textColor || COLORS.white, align: 'center',
      });
      // Segment labels — right of bar
      addTextBox(slide, seg.label.join('\n'), {
        x: ptToIn(bar.x + p2BarW + 6), y: ptToIn(cursor + h / 2 - 10), w: ptToIn(74), h: ptToIn(22),
        fontSize: 8, color: '444444',
      });
      cursor += h;
    });
    slide.addShape(pptx.ShapeType.line, {
      x: ptToIn(bar.x - 20), y: ptToIn(p2BarTop + p2BarH + 1), w: ptToIn(100), h: 0,
      line: { color: '888888', pt: 1 },
    });
    addTextBox(slide, bar.config.axisLabel, {
      x: ptToIn(bar.x - 8), y: ptToIn(p2BarTop + p2BarH + 6), w: ptToIn(78), h: ptToIn(12),
      fontSize: 8, bold: true, color: '444444', align: 'center',
    });
  });
}

function renderPanel3(slide, p3X, panelTop) {
  addTextBox(slide, CONTENT.panel3.header[0], {
    x: ptToIn(p3X), y: ptToIn(panelTop + 10), w: ptToIn(LAYOUT.p3Width), h: ptToIn(12),
    fontSize: 11, bold: true, color: '333333',
  });
  drawRule(slide, p3X, panelTop + 36, 116);

  let bulletY = panelTop + 56;
  CONTENT.panel3.bullets.forEach((bullet) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: ptToIn(p3X + 2), y: ptToIn(bulletY + 4), w: ptToIn(4), h: ptToIn(4),
      line: { color: COLORS.green, pt: 0.4 }, fill: { color: COLORS.green },
    });
    addTextBox(slide, bullet.join('\n'), {
      x: ptToIn(p3X + 16), y: ptToIn(bulletY), w: ptToIn(110), h: ptToIn(46),
      fontSize: 10.5, color: COLORS.text,
    });
    bulletY += 52;
  });
}

function renderDividers(slide, divider1X, divider2X, panelTop) {
  slide.addShape(pptx.ShapeType.line, {
    x: ptToIn(divider1X), y: ptToIn(panelTop + 65), w: 0, h: ptToIn(228),
    line: { color: COLORS.lightRule, pt: 1 },
  });
  slide.addShape(pptx.ShapeType.line, {
    x: ptToIn(divider2X), y: ptToIn(panelTop + 15), w: 0, h: ptToIn(264),
    line: { color: COLORS.lightRule, pt: 1 },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: ptToIn(divider2X - 9), y: ptToIn(panelTop + 136), w: ptToIn(18), h: ptToIn(18),
    line: { color: COLORS.green, pt: 0.5 }, fill: { color: COLORS.green },
  });
  addTextBox(slide, '\u203A', {
    x: ptToIn(divider2X - 9), y: ptToIn(panelTop + 135), w: ptToIn(18), h: ptToIn(16),
    fontSize: 14, bold: true, color: COLORS.white, align: 'center',
  });
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
    line: { color: COLORS.frame, pt: 1 }, fill: { color: COLORS.bg },
  });

  // Title
  addTextBox(slide, CONTENT.title.join('\n'), {
    x: ptToIn(LAYOUT.padLeft), y: ptToIn(LAYOUT.padTop),
    w: ptToIn(SLIDE.widthPt - LAYOUT.padLeft - LAYOUT.padRight), h: ptToIn(LAYOUT.titleHeight),
    fontSize: 18.5, color: COLORS.green, bold: true,
  });

  // Panel positions
  const p1X = LAYOUT.padLeft;
  const divider1X = p1X + LAYOUT.p1Width + LAYOUT.dividerGap;
  const p2X = divider1X + LAYOUT.dividerWidth + LAYOUT.dividerGap;
  const divider2X = p2X + LAYOUT.p2Width + LAYOUT.dividerGap;
  const p3X = divider2X + LAYOUT.dividerWidth + LAYOUT.dividerGap;
  const panelTop = LAYOUT.panelTop;

  renderPanel1(slide, p1X, panelTop);
  renderPanel2(slide, p2X, panelTop);
  renderPanel3(slide, p3X, panelTop);
  renderDividers(slide, divider1X, divider2X, panelTop);

  // Footer
  addTextBox(slide, CONTENT.footer, {
    x: ptToIn(LAYOUT.padLeft), y: ptToIn(396),
    w: ptToIn(SLIDE.widthPt - LAYOUT.padLeft - LAYOUT.padRight), h: ptToIn(10),
    fontSize: 5.5, color: '888888',
  });

  if (!externalPptx) {
    await pptx.writeFile({ fileName: OUTPUT_PATH });
    await stripPptxMetadata(OUTPUT_PATH);
  }
  return pptx;
}

module.exports = { buildSlide };
if (require.main === module) buildSlide().catch((e) => { console.error(e); process.exitCode = 1; });
