// Rebuilds the Indiana levers slide as an editable PPTX.
// Background and Font Awesome icons are rasterized in temp; all layout, text,
// badges, rules, and the center-system diagram remain native PowerPoint objects.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const { chromium } = require('playwright-core');
const stripPptxMetadata = require(path.join(__dirname, '..', 'strip-pptx-metadata.js'));

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, 'indiana-Workforce-03-13-levers.pptx');

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
  textMain: '#EDF2F8',
  textSoft: '#DBE5F2',
  title: '#F3F6FC',
  prelimLine: '#7D95B1',
  accentA: '#9DDCE6',
  accentB: '#1BB1EA',
  accentC: '#2D5EF2',
  accentD: '#F4F5F8',
  accentDText: '#050D1B',
  iconGray: '#8A98AA',
  nodeFill: '#F0F2F6',
  arrow: '#D8E3F2',
  footer: '#EDF2FA',
  bg0: '#0B2544',
  bg1: '#08213F',
  bg2: '#081B39',
  bg3: '#071B43'
};

// Layout anchors preserve the reference slide geometry.
// Section content below is data-driven so bullets can reflow by line count.
const LAYOUT = {
  titleLeft: 38,
  titleTop: 16,
  titleWidth: 860,
  titleHeight: 60,
  prelimLeft: 38,
  prelimTop: 96,
  prelimRuleTop: 109,
  prelimRuleWidth: 42,
  sectionHeadBadgeSize: 24,
  sectionHeadGap: 9,
  sectionHeadTitleFontPx: 19,
  sectionRuleOffsetX: 27,
  sectionRuleOffsetY: 26,
  sectionRuleWidth: 280,
  sectionRuleHeight: 6,
  leftItemsOffsetX: 50,
  rightItemsOffsetX: 33,
  itemsTopOffset: 42,
  itemGap: 8,
  itemMinHeight: 24,
  itemBadgeSize: 18,
  itemBadgeTopOffset: 2,
  itemTextGap: 12,
  itemTextFontPx: 15.5,
  itemLineHeightPx: 17.36,
  leftItemTextWidth: 430,
  rightItemTextWidth: 250,
  centerLeft: 362,
  centerTop: 200,
  centerWidth: 230,
  centerHeight: 214,
  triangleStroke: 1.5,
  triangleArrowHeadSize: 7,
  footerRight: 34,
  footerBottom: 22,
  footerGap: 18
};

const sections = [
  {
    key: 'a',
    badge: 'A',
    title: 'Training providers and jobseekers',
    x: 38,
    y: 114,
    width: 536,
    color: COLORS.accentA,
    badgeTextColor: '#021426',
    itemsOffsetX: LAYOUT.leftItemsOffsetX,
    itemTextWidth: LAYOUT.leftItemTextWidth,
    items: [
      { badge: '1', lines: ['Training capacity expansion'] },
      { badge: '2', lines: ['Outcomes-driven training'], strong: true },
      { badge: '3', lines: ['Access and affordability'] }
    ]
  },
  {
    key: 'b',
    badge: 'B',
    title: 'Employers and jobseekers',
    x: 38,
    y: 273,
    width: 536,
    color: COLORS.accentB,
    badgeTextColor: '#F3F6FC',
    itemsOffsetX: LAYOUT.leftItemsOffsetX,
    itemTextWidth: LAYOUT.leftItemTextWidth,
    items: [
      { badge: '4', lines: ['Awareness'], strong: true },
      { badge: '5', lines: ['Career search/ matching'] },
      { badge: '6', lines: ['Experiential learning'] },
      { badge: '7', lines: ['Skills-based hiring'], strong: true },
      { badge: '8', lines: ['Coaching and support'] }
    ]
  },
  {
    key: 'c',
    badge: 'C',
    title: 'Employers and training providers',
    x: 578,
    y: 114,
    width: 360,
    color: COLORS.accentC,
    badgeTextColor: '#F3F6FC',
    itemsOffsetX: LAYOUT.rightItemsOffsetX,
    itemTextWidth: LAYOUT.rightItemTextWidth,
    items: [
      { badge: '9', lines: ['Employer-informed curricula'], strong: true },
      { badge: '10', lines: ['Integration'] }
    ]
  },
  {
    key: 'd',
    badge: 'D',
    title: 'Cross-cutting priorities',
    x: 578,
    y: 273,
    width: 360,
    color: COLORS.accentD,
    badgeTextColor: COLORS.accentDText,
    itemsOffsetX: LAYOUT.rightItemsOffsetX,
    itemTextWidth: LAYOUT.rightItemTextWidth,
    items: [
      { badge: '11', lines: ['Accountable commitment to', 'marginalized groups'] },
      { badge: '12', lines: ['User-centricity'], strong: true },
      { badge: '13', lines: ['Technology and data'] }
    ]
  }
];

const centerDiagram = {
  labelTop: { x: 53, y: -10, w: 100, text: 'Jobseekers' },
  labelLeft: { x: 5, y: 131, w: 98, lines: ['Education', 'and training', 'ecosystem'] },
  labelRight: { x: 117, y: 137, w: 72, lines: ['Employers'] },
  nodes: {
    top: { x: 88, y: 8, size: 28, icon: 'users', iconBox: { x: 95, y: 15, w: 14, h: 14 } },
    left: { x: 35, y: 101, size: 28, icon: 'school', iconBox: { x: 42, y: 108, w: 14, h: 14 } },
    right: { x: 139, y: 101, size: 28, icon: 'building', iconBox: { x: 146, y: 108, w: 14, h: 14 } }
  },
  dots: [
    { badge: 'A', x: 66, y: 59, size: 19, fill: COLORS.accentA, color: '#021426' },
    { badge: 'B', x: 118, y: 59, size: 19, fill: COLORS.accentB, color: '#F3F6FC' },
    { badge: 'C', x: 92, y: 106, size: 19, fill: COLORS.accentC, color: '#F3F6FC' }
  ],
  lines: [
    { x1: 57, y1: 100, x2: 94, y2: 37 },
    { x1: 110, y1: 37, x2: 145, y2: 100 },
    { x1: 66, y1: 115, x2: 136, y2: 115 }
  ],
  dLine: { x: 3, y: 186, w: 214, h: 2 },
  dTag: { badgeX: 18, textX: 46, y: 194, badgeSize: 18, text: 'Cross-cutting priorities' }
};

const TEXT = {
  title: [
    '3. Based on our research and experience, 13 levers help address',
    'workforce system challenge'
  ],
  prelim: 'Preliminary',
  footerBrand: 'McKinsey & Company',
  footerPage: '11'
};

const ICONS = [
  { id: 'users', className: 'fa-solid fa-users' },
  { id: 'school', className: 'fa-solid fa-school' },
  { id: 'building', className: 'fa-solid fa-building' }
];

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

function addTextBox(slide, text, options) {
  slide.addText(text, {
    margin: 0,
    fontFace: FONTS.sans,
    color: pptColor(COLORS.textMain),
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
      fontFace: FONTS.sans,
      color: pptColor(COLORS.textMain),
      ...options
    }
  );
}

async function createBackgroundPng(outputPath) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SLIDE.width}" height="${SLIDE.height}" viewBox="0 0 ${SLIDE.width} ${SLIDE.height}">
    <defs>
      <radialGradient id="g0" cx="96%" cy="-4%" r="115%">
        <stop offset="0%" stop-color="#436bff" stop-opacity="1"/>
        <stop offset="24%" stop-color="#3a60f4" stop-opacity="1"/>
        <stop offset="40%" stop-color="#2e4bd4" stop-opacity="0.93"/>
        <stop offset="57%" stop-color="#1f3499" stop-opacity="0.74"/>
        <stop offset="74%" stop-color="#121e5a" stop-opacity="0.42"/>
        <stop offset="88%" stop-color="#0a1136" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#080d28" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g1" cx="94%" cy="42%" r="82%">
        <stop offset="0%" stop-color="#4a77ff" stop-opacity="0.81"/>
        <stop offset="34%" stop-color="#3456e2" stop-opacity="0.62"/>
        <stop offset="60%" stop-color="#1e36aa" stop-opacity="0.24"/>
        <stop offset="74%" stop-color="#0e1b56" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g2" cx="100%" cy="70%" r="70%">
        <stop offset="0%" stop-color="#192eaa" stop-opacity="0.48"/>
        <stop offset="40%" stop-color="#122286" stop-opacity="0.3"/>
        <stop offset="72%" stop-color="#0a155a" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g3" cx="58%" cy="48%" r="72%">
        <stop offset="0%" stop-color="#5cb1f0" stop-opacity="0.09"/>
        <stop offset="30%" stop-color="#3669c3" stop-opacity="0.08"/>
        <stop offset="55%" stop-color="#1b3481" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="#0e1c4f" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="g4" cx="-2%" cy="103%" r="78%">
        <stop offset="0%" stop-color="#021c34" stop-opacity="0.48"/>
        <stop offset="34%" stop-color="#02162c" stop-opacity="0.34"/>
        <stop offset="63%" stop-color="#031226" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#031024" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#04192d" stop-opacity="0.55"/>
        <stop offset="28%" stop-color="#051b31" stop-opacity="0.24"/>
        <stop offset="52%" stop-color="#071e38" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="g6" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="58%" stop-color="#081a38" stop-opacity="0"/>
        <stop offset="83%" stop-color="#385ae4" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#4a74ff" stop-opacity="0.33"/>
      </linearGradient>
      <linearGradient id="g7" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="56%" stop-color="#020712" stop-opacity="0"/>
        <stop offset="100%" stop-color="#020712" stop-opacity="0.38"/>
      </linearGradient>
      <linearGradient id="g8" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${COLORS.bg0}"/>
        <stop offset="42%" stop-color="${COLORS.bg1}"/>
        <stop offset="70%" stop-color="${COLORS.bg2}"/>
        <stop offset="100%" stop-color="${COLORS.bg3}"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g8)"/>
    <rect width="100%" height="100%" fill="url(#g0)"/>
    <rect width="100%" height="100%" fill="url(#g1)"/>
    <rect width="100%" height="100%" fill="url(#g2)"/>
    <rect width="100%" height="100%" fill="url(#g3)"/>
    <rect width="100%" height="100%" fill="url(#g4)"/>
    <rect width="100%" height="100%" fill="url(#g5)"/>
    <rect width="100%" height="100%" fill="url(#g6)"/>
    <rect width="100%" height="100%" fill="url(#g7)"/>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outputPath);
}

async function rasterizeIcons(tempDir) {
  const cssPath = path.resolve(__dirname, '../../libs/fontawesome/css/all.min.css');
  const htmlPath = path.join(tempDir, 'icons.html');

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="${pathToFileURL(cssPath).href}">
    <style>
      html, body {
        margin: 0;
        padding: 0;
        background: transparent;
        width: 320px;
        height: 120px;
      }
      body {
        display: flex;
        align-items: center;
        gap: 28px;
        padding: 20px;
      }
      .icon {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${COLORS.iconGray};
        font-size: 34px;
        line-height: 1;
      }
    </style>
  </head>
  <body>
    ${ICONS.map((icon) => `<div id="${icon.id}" class="icon"><i class="${icon.className}" aria-hidden="true"></i></div>`).join('')}
  </body>
  </html>`;

  fs.writeFileSync(htmlPath, html, 'utf8');

  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 320, height: 120 }, deviceScaleFactor: 2 });

  try {
    await page.goto(pathToFileURL(htmlPath).href);
    await page.waitForTimeout(150);

    const paths = {};
    for (const icon of ICONS) {
      const locator = page.locator(`#${icon.id}`);
      const rawPath = path.join(tempDir, `${icon.id}-raw.png`);
      const finalPath = path.join(tempDir, `${icon.id}.png`);
      await locator.screenshot({ path: rawPath });
      await sharp(rawPath).trim().extend({ top: 4, bottom: 4, left: 4, right: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(finalPath);
      paths[icon.id] = finalPath;
    }
    return paths;
  } finally {
    await browser.close();
  }
}

function addBadge(slide, pptx, { x, y, size, fill, text, textColor, fontPx, borderColor, borderWidth = 0 }) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x: pxToInX(x),
    y: pxToInY(y),
    w: pxToInX(size),
    h: pxToInY(size),
    fill: { color: pptColor(fill) },
    line: borderWidth > 0
      ? { color: pptColor(borderColor), width: borderWidth }
      : { color: pptColor(fill), transparency: 100, width: 0 }
  });

  addTextBox(slide, text, {
    x: pxToInX(x),
    y: pxToInY(y + 1),
    w: pxToInX(size),
    h: pxToInY(size - 2),
    fontSize: pxToPt(fontPx),
    bold: true,
    align: 'center',
    valign: 'mid',
    color: pptColor(textColor)
  });
}

function addTitle(slide) {
  slide.addText(
    TEXT.title.map((line, index) => ({
      text: line,
      options: { breakLine: index < TEXT.title.length - 1, bold: true }
    })),
    {
      x: pxToInX(LAYOUT.titleLeft),
      y: pxToInY(LAYOUT.titleTop),
      w: pxToInX(LAYOUT.titleWidth),
      h: pxToInY(LAYOUT.titleHeight),
      margin: 0,
      fontFace: FONTS.serif,
      fontSize: pxToPt(24),
      lineSpacingMultiple: 1.05,
      color: pptColor(COLORS.title)
    }
  );
}

function addPrelim(slide, pptx) {
  addTextBox(slide, TEXT.prelim, {
    x: pxToInX(LAYOUT.prelimLeft),
    y: pxToInY(LAYOUT.prelimTop),
    w: pxToInX(80),
    h: pxToInY(14),
    fontSize: pxToPt(11),
    bold: true,
    color: pptColor('#D8E0EA')
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(LAYOUT.prelimLeft),
    y: pxToInY(LAYOUT.prelimRuleTop),
    w: pxToInX(LAYOUT.prelimRuleWidth),
    h: pxToInY(1),
    fill: { color: pptColor(COLORS.prelimLine) },
    line: { color: pptColor(COLORS.prelimLine), transparency: 100, width: 0 }
  });
}

function renderSection(slide, pptx, section) {
  addBadge(slide, pptx, {
    x: section.x,
    y: section.y,
    size: LAYOUT.sectionHeadBadgeSize,
    fill: section.color,
    text: section.badge,
    textColor: section.badgeTextColor,
    fontPx: 16
  });

  addTextBox(slide, section.title, {
    x: pxToInX(section.x + LAYOUT.sectionHeadBadgeSize + LAYOUT.sectionHeadGap),
    y: pxToInY(section.y + 1),
    w: pxToInX(section.width - 40),
    h: pxToInY(24),
    fontSize: pxToPt(LAYOUT.sectionHeadTitleFontPx),
    bold: true,
    color: pptColor('#EEF3F9')
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(section.x + LAYOUT.sectionRuleOffsetX),
    y: pxToInY(section.y + LAYOUT.sectionRuleOffsetY),
    w: pxToInX(LAYOUT.sectionRuleWidth),
    h: pxToInY(LAYOUT.sectionRuleHeight),
    fill: { color: pptColor(section.color) },
    line: { color: pptColor(section.color), transparency: 100, width: 0 }
  });

  let cursorY = section.y + LAYOUT.itemsTopOffset;
  const itemTextLeft = section.x + section.itemsOffsetX + LAYOUT.itemBadgeSize + LAYOUT.itemTextGap;

  section.items.forEach((item) => {
    const lineCount = item.lines.length;
    const itemHeight = Math.max(LAYOUT.itemMinHeight, lineCount * LAYOUT.itemLineHeightPx);

    addBadge(slide, pptx, {
      x: section.x + section.itemsOffsetX,
      y: cursorY + LAYOUT.itemBadgeTopOffset,
      size: LAYOUT.itemBadgeSize,
      fill: section.color,
      text: item.badge,
      textColor: section.badgeTextColor,
      fontPx: 10,
      borderColor: 'DBE8F6',
      borderWidth: 0.75
    });

    addMultilineText(slide, item.lines, {
      x: pxToInX(itemTextLeft),
      y: pxToInY(cursorY),
      w: pxToInX(section.itemTextWidth),
      h: pxToInY(itemHeight),
      fontSize: pxToPt(LAYOUT.itemTextFontPx),
      lineSpacingMultiple: 1.12,
      bold: Boolean(item.strong),
      color: pptColor('#ECF3FA')
    });

    cursorY += itemHeight + LAYOUT.itemGap;
  });
}

function addTriangleLine(slide, pptx, line) {
  const x = Math.min(line.x1, line.x2);
  const y = Math.min(line.y1, line.y2);
  const w = Math.abs(line.x2 - line.x1);
  const h = Math.abs(line.y2 - line.y1);

  slide.addShape(pptx.ShapeType.line, {
    x: pxToInX(LAYOUT.centerLeft + x),
    y: pxToInY(LAYOUT.centerTop + y),
    w: pxToInX(w),
    h: pxToInY(h),
    flipH: line.x2 < line.x1,
    flipV: line.y2 < line.y1,
    line: {
      color: pptColor(COLORS.arrow),
      width: LAYOUT.triangleStroke,
      beginArrowType: 'triangle',
      endArrowType: 'triangle'
    }
  });
}

function addCenterDiagram(slide, pptx, iconPaths) {
  const { centerLeft, centerTop } = LAYOUT;

  addTextBox(slide, centerDiagram.labelTop.text, {
    x: pxToInX(centerLeft + centerDiagram.labelTop.x),
    y: pxToInY(centerTop + centerDiagram.labelTop.y),
    w: pxToInX(centerDiagram.labelTop.w),
    h: pxToInY(14),
    fontSize: pxToPt(12),
    align: 'center',
    color: pptColor('#E8EEF8')
  });

  centerDiagram.lines.forEach((line) => addTriangleLine(slide, pptx, line));

  Object.values(centerDiagram.nodes).forEach((node) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x: pxToInX(centerLeft + node.x),
      y: pxToInY(centerTop + node.y),
      w: pxToInX(node.size),
      h: pxToInY(node.size),
      fill: { color: pptColor(COLORS.nodeFill) },
      line: { color: pptColor(COLORS.nodeFill), transparency: 100, width: 0 }
    });

    slide.addImage({
      path: iconPaths[node.icon],
      x: pxToInX(centerLeft + node.iconBox.x),
      y: pxToInY(centerTop + node.iconBox.y),
      w: pxToInX(node.iconBox.w),
      h: pxToInY(node.iconBox.h)
    });
  });

  centerDiagram.dots.forEach((dot) => {
    addBadge(slide, pptx, {
      x: centerLeft + dot.x,
      y: centerTop + dot.y,
      size: dot.size,
      fill: dot.fill,
      text: dot.badge,
      textColor: dot.color,
      fontPx: 10
    });
  });

  addMultilineText(slide, centerDiagram.labelLeft.lines, {
    x: pxToInX(centerLeft + centerDiagram.labelLeft.x),
    y: pxToInY(centerTop + centerDiagram.labelLeft.y),
    w: pxToInX(centerDiagram.labelLeft.w),
    h: pxToInY(42),
    fontSize: pxToPt(12),
    lineSpacingMultiple: 1.08,
    align: 'center',
    color: pptColor('#E8EEF8')
  });

  addMultilineText(slide, centerDiagram.labelRight.lines, {
    x: pxToInX(centerLeft + centerDiagram.labelRight.x),
    y: pxToInY(centerTop + centerDiagram.labelRight.y),
    w: pxToInX(centerDiagram.labelRight.w),
    h: pxToInY(20),
    fontSize: pxToPt(12),
    lineSpacingMultiple: 1.08,
    align: 'center',
    color: pptColor('#E8EEF8')
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInX(centerLeft + centerDiagram.dLine.x),
    y: pxToInY(centerTop + centerDiagram.dLine.y),
    w: pxToInX(centerDiagram.dLine.w),
    h: pxToInY(centerDiagram.dLine.h),
    fill: { color: pptColor('#D7DDE6') },
    line: { color: pptColor('#D7DDE6'), transparency: 100, width: 0 }
  });

  addBadge(slide, pptx, {
    x: centerLeft + centerDiagram.dTag.badgeX,
    y: centerTop + centerDiagram.dTag.y,
    size: centerDiagram.dTag.badgeSize,
    fill: COLORS.accentD,
    text: 'D',
    textColor: COLORS.accentDText,
    fontPx: 12
  });

  addTextBox(slide, centerDiagram.dTag.text, {
    x: pxToInX(centerLeft + centerDiagram.dTag.textX),
    y: pxToInY(centerTop + centerDiagram.dTag.y + 1),
    w: pxToInX(150),
    h: pxToInY(18),
    fontSize: pxToPt(12),
    color: pptColor('#ECF3FB')
  });
}

function addFooter(slide) {
  const brandWidth = 110;
  const pageWidth = 22;
  const totalWidth = brandWidth + LAYOUT.footerGap + pageWidth;
  const left = SLIDE.width - LAYOUT.footerRight - totalWidth;
  const top = SLIDE.height - LAYOUT.footerBottom - 12;

  addTextBox(slide, TEXT.footerBrand, {
    x: pxToInX(left),
    y: pxToInY(top),
    w: pxToInX(brandWidth),
    h: pxToInY(12),
    fontSize: pxToPt(11),
    color: pptColor(COLORS.footer)
  });

  addTextBox(slide, TEXT.footerPage, {
    x: pxToInX(left + brandWidth + LAYOUT.footerGap),
    y: pxToInY(top),
    w: pxToInX(pageWidth),
    h: pxToInY(12),
    fontSize: pxToPt(11),
    color: pptColor(COLORS.footer),
    align: 'right'
  });
}

async function buildSlide(externalPptx) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'indiana-workforce-levers-'));
  const bgPath = path.join(tempDir, 'bg.png');

  try {
    await createBackgroundPng(bgPath);
    const iconPaths = await rasterizeIcons(tempDir);

    const pptx = externalPptx || new pptxgen();
    if (!externalPptx) pptx.layout = 'LAYOUT_16x9';
    const slide = pptx.addSlide();
    slide.addImage({ path: bgPath, x: 0, y: 0, w: SLIDE.widthIn, h: SLIDE.heightIn });

    addTitle(slide);
    addPrelim(slide, pptx);
    sections.forEach((section) => renderSection(slide, pptx, section));
    addCenterDiagram(slide, pptx, iconPaths);
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
