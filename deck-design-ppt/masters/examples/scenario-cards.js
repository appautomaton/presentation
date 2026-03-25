// Rebuilds the Louisiana DOT cost-scenarios slide as an editable PPTX.
// The slide keeps a simple header / content / footer split, while the three
// scenario columns are driven from one shared data model instead of hard-coded
// one-off text boxes.
const path = require('path');

const pptxgen = require('pptxgenjs');
const stripPptxMetadata = require(path.join(__dirname, '..', 'strip-pptx-metadata.js'));
let pptx = new pptxgen();

const OUTPUT_PATH = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, 'Lousiana-DOT-20-cost.pptx');

const SLIDE = {
  widthPt: 720,
  heightPt: 405,
  widthIn: 10,
  heightIn: 5.625
};

const FONTS = {
  body: 'Carlito'
};

const COLORS = {
  bg: 'F4F4F4',
  frame: '9B9B9B',
  title: '4AB875',
  metric: '56A58C',
  green: '31B773',
  text: '585B5D',
  textSoft: '77797A',
  rule: 'B9B9B9',
  ruleDot: '9B9B9B',
  bullet: '31B773',
  white: 'FFFFFF'
};

const FRAME = {
  padTop: 8,
  padRight: 20,
  padBottom: 7,
  padLeft: 20
};

const GRID = {
  top: 66,
  height: 304,
  labelWidth: 102,
  columnGap: 8
};

const ZONES = {
  heading: 50,
  rule: 9,
  cost: 57,
  capacity: 50,
  values: 58
};
ZONES.method = GRID.height - (ZONES.heading + ZONES.rule + ZONES.cost + ZONES.capacity + ZONES.values);

const CONTENT = {
  title: 'Additional funding will enable shifting to contracts to augment workforce and free up internal resources to ensure critical maintenance work is completed',
  labels: {
    cost: ['FY24 M&O cost¹:', '$314M'],
    capacity: ['Capacity', 'implication³'],
    values: ['Labor capacity:', 'Equipment capacity:', 'Materials capacity:'],
    method: ['Outsourcing', 'methodology']
  },
  scenarios: [
    {
      badge: 'A',
      title: 'Supplement need',
      subtitle: ['Outsource increase in planned', 'maintenance'],
      delta: 'Δ+$15-35M',
      deltaSub: 'Contracting cost²',
      capacity: '0%',
      capacitySub: 'Unlocked internal capacity',
      values: ['$0M', '$0M', '$0M'],
      bullets: [
        {
          lines: [
            { text: 'Increase quantity of work by 30%', bold: true },
            { text: 'for activities that meet qual. for' },
            { text: 'outsourcing and outsource increase' }
          ]
        }
      ]
    },
    {
      badge: 'B',
      title: 'Targeted capacity increase',
      subtitle: ['Outsource planned maintenance', 'for 5 priority activities'],
      delta: 'Δ+$30-60M',
      deltaSub: 'Contracting cost²',
      capacity: '5%',
      capacitySub: 'Unlocked internal capacity',
      values: ['$10M (118 FTE)', '$4M', '$2M'],
      bullets: [
        {
          lines: [
            { text: 'Increase quantity of work by 30%', bold: true },
            { text: 'for activities that meet qual. for' },
            { text: 'outsourcing and outsource increase' }
          ]
        },
        {
          lines: [
            { text: 'Outsource 50% of internal', bold: true },
            { text: 'maintenance', bold: true },
            { text: 'for priority activities:' }
          ],
          sublines: [
            'Mowing, striping, herbicide, tree',
            '/ brush trimming, full-depth',
            'patching'
          ]
        }
      ]
    },
    {
      badge: 'C',
      title: 'Maximum capacity increase',
      subtitle: ['Outsource planned maintenance', 'for all outsourced activities'],
      delta: 'Δ+$45-90M',
      deltaSub: 'Contracting cost²',
      capacity: '12%',
      capacitySub: 'Unlocked internal capacity',
      values: ['$25M (288 FTE)', '$7M', '$5M'],
      bullets: [
        {
          lines: [
            { text: 'Increase quantity of work by 30%', bold: true },
            { text: 'for activities that meet qual. for' },
            { text: 'outsourcing and outsource increase' }
          ]
        },
        {
          lines: [
            { text: 'Outsource 50% of internal', bold: true },
            { text: 'maintenance', bold: true },
            { text: 'for all activities that' },
            { text: 'meet qual. for outsourcing and' },
            { text: 'contract out' }
          ]
        }
      ]
    }
  ],
  footnote: '1. Cost includes labor cost of statewide maintenance crews, districtwide maintenance crews, parish maintenance crews, and repair costs; non-labor costs of supplies, equipment, maintenance contracts 2. Assumed contracting costs are 0.75x - 1.5x of in-house costs; dependent on local market and bids received 3. Total FTE count of 1848 (Agile Assets representation of FTE count) Source: DOTD FY18-24 Agile Assets maintenance work orders file; DOTD FY18-23 All Fleet usage; DOTD FY18-23 All Machine usage; Interviews with DOTD operations, July 2024'
};

function ptToIn(value) {
  return Number((value / 72).toFixed(4));
}

function addTextBox(slide, text, options = {}) {
  slide.addText(text, {
    margin: 0,
    fontFace: FONTS.body,
    color: COLORS.text,
    valign: 'mid',
    breakLine: false,
    ...options
  });
}

function addRule(slide, xPt, yPt, widthPt) {
  slide.addShape(pptx.ShapeType.line, {
    x: ptToIn(xPt),
    y: ptToIn(yPt + 4.5),
    w: ptToIn(widthPt - 8),
    h: 0,
    line: { color: COLORS.rule, pt: 1 }
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: ptToIn(xPt + widthPt - 5.3),
    y: ptToIn(yPt + 1.7),
    w: ptToIn(5.3),
    h: ptToIn(5.3),
    line: { color: COLORS.ruleDot, pt: 0.5 },
    fill: { color: COLORS.ruleDot }
  });
}

function addBadge(slide, letter, cxPt, cyPt) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x: ptToIn(cxPt - 8.1),
    y: ptToIn(cyPt - 8.1),
    w: ptToIn(16.2),
    h: ptToIn(16.2),
    line: { color: COLORS.green, pt: 0.5 },
    fill: { color: COLORS.green }
  });
  addTextBox(slide, letter, {
    x: ptToIn(cxPt - 8.1),
    y: ptToIn(cyPt - 6.8),
    w: ptToIn(16.2),
    h: ptToIn(12),
    fontSize: 10,
    bold: true,
    color: COLORS.white,
    align: 'center'
  });
}

function renderLabelColumn(slide, xPt, yPt) {
  addTextBox(slide, CONTENT.labels.cost[0], {
    x: ptToIn(xPt),
    y: ptToIn(yPt + ZONES.heading + ZONES.rule + 4),
    w: ptToIn(GRID.labelWidth),
    h: ptToIn(15),
    fontSize: 12.1,
    bold: true,
    color: '575A5C'
  });
  addTextBox(slide, CONTENT.labels.cost[1], {
    x: ptToIn(xPt),
    y: ptToIn(yPt + ZONES.heading + ZONES.rule + 22),
    w: ptToIn(GRID.labelWidth),
    h: ptToIn(12),
    fontSize: 11.1,
    bold: true,
    color: '575A5C'
  });

  addTextBox(slide, CONTENT.labels.capacity.join('\n'), {
    x: ptToIn(xPt),
    y: ptToIn(yPt + ZONES.heading + ZONES.rule + ZONES.cost + 9),
    w: ptToIn(GRID.labelWidth),
    h: ptToIn(26),
    fontSize: 12.1,
    bold: true,
    color: '575A5C'
  });

  addTextBox(slide, CONTENT.labels.values.join('\n'), {
    x: ptToIn(xPt),
    y: ptToIn(yPt + ZONES.heading + ZONES.rule + ZONES.cost + ZONES.capacity + 10),
    w: ptToIn(GRID.labelWidth),
    h: ptToIn(32),
    fontSize: 11.1,
    bold: true,
    color: '575A5C'
  });

  addTextBox(slide, CONTENT.labels.method.join('\n'), {
    x: ptToIn(xPt),
    y: ptToIn(yPt + ZONES.heading + ZONES.rule + ZONES.cost + ZONES.capacity + ZONES.values + 16),
    w: ptToIn(GRID.labelWidth),
    h: ptToIn(32),
    fontSize: 12.1,
    bold: true,
    color: '575A5C'
  });
}

function addBulletBlock(slide, columnXPt, baseYPt, bullet) {
  const bulletX = columnXPt + 9;
  const textX = columnXPt + 22;
  const lineHeight = 10.2;
  const subLineHeight = 9;

  slide.addShape(pptx.ShapeType.ellipse, {
    x: ptToIn(bulletX - 1.8),
    y: ptToIn(baseYPt + 4),
    w: ptToIn(3.1),
    h: ptToIn(3.1),
    line: { color: COLORS.bullet, pt: 0.4 },
    fill: { color: COLORS.bullet }
  });

  let cursor = baseYPt;
  bullet.lines.forEach((line) => {
  addTextBox(slide, line.text, {
      x: ptToIn(textX),
      y: ptToIn(cursor),
      w: ptToIn(146),
      h: ptToIn(lineHeight + 1),
      fontSize: 8.5,
      bold: Boolean(line.bold),
      color: COLORS.text,
      valign: 'top'
    });
    cursor += lineHeight;
  });

  if (bullet.sublines) {
    bullet.sublines.forEach((line) => {
      addTextBox(slide, `- ${line}`, {
        x: ptToIn(textX + 11),
        y: ptToIn(cursor + 0.5),
        w: ptToIn(134),
        h: ptToIn(subLineHeight + 1),
        fontSize: 8.1,
        bold: true,
        color: COLORS.text,
        valign: 'top'
      });
      cursor += subLineHeight;
    });
  }

  return cursor - baseYPt + 3;
}

function renderScenario(slide, scenario, xPt, yPt, widthPt) {
  const badgeCenterX = xPt + 20;
  const titleLeft = xPt + 32;

  addBadge(slide, scenario.badge, badgeCenterX, yPt + 15);

  addTextBox(slide, scenario.title, {
    x: ptToIn(titleLeft),
    y: ptToIn(yPt + 5),
    w: ptToIn(widthPt - 34),
    h: ptToIn(14),
    fontSize: 13.4,
    bold: true,
    color: COLORS.title,
    align: 'center'
  });
  addTextBox(slide, scenario.subtitle.join('\n'), {
    x: ptToIn(xPt + 10),
    y: ptToIn(yPt + 20),
    w: ptToIn(widthPt - 20),
    h: ptToIn(28),
    fontSize: 9.2,
    bold: true,
    color: COLORS.title,
    align: 'center'
  });

  addRule(slide, xPt, yPt + ZONES.heading, widthPt);

  addTextBox(slide, scenario.delta, {
    x: ptToIn(xPt),
    y: ptToIn(yPt + ZONES.heading + ZONES.rule + 4),
    w: ptToIn(widthPt),
    h: ptToIn(24),
    fontSize: 27.8,
    bold: false,
    color: COLORS.metric,
    align: 'center'
  });
  addTextBox(slide, scenario.deltaSub, {
    x: ptToIn(xPt),
    y: ptToIn(yPt + ZONES.heading + ZONES.rule + 30),
    w: ptToIn(widthPt),
    h: ptToIn(14),
    fontSize: 8.7,
    bold: true,
    color: COLORS.metric,
    align: 'center'
  });

  const capacityTop = yPt + ZONES.heading + ZONES.rule + ZONES.cost;
  addTextBox(slide, scenario.capacity, {
    x: ptToIn(xPt),
    y: ptToIn(capacityTop + 4),
    w: ptToIn(widthPt),
    h: ptToIn(24),
    fontSize: 27.2,
    color: COLORS.metric,
    align: 'center'
  });
  addTextBox(slide, scenario.capacitySub, {
    x: ptToIn(xPt),
    y: ptToIn(capacityTop + 30),
    w: ptToIn(widthPt),
    h: ptToIn(14),
    fontSize: 8.7,
    bold: true,
    color: COLORS.metric,
    align: 'center'
  });

  const valueTop = capacityTop + ZONES.capacity + 3;
  addTextBox(slide, scenario.values.join('\n'), {
    x: ptToIn(xPt + 8),
    y: ptToIn(valueTop),
    w: ptToIn(widthPt - 16),
    h: ptToIn(42),
    fontSize: 12.5,
    color: COLORS.text,
    align: 'center'
  });

  const methodTop = yPt + ZONES.heading + ZONES.rule + ZONES.cost + ZONES.capacity + ZONES.values + 5;
  let bulletY = methodTop;
  scenario.bullets.forEach((bullet) => {
    bulletY += addBulletBlock(slide, xPt, bulletY, bullet);
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

  addTextBox(slide, CONTENT.title, {
    x: ptToIn(FRAME.padLeft), y: ptToIn(FRAME.padTop),
    w: ptToIn(SLIDE.widthPt - FRAME.padLeft - FRAME.padRight), h: ptToIn(40),
    fontSize: 18.2, color: COLORS.title, breakLine: true,
  });

  const contentLeft = FRAME.padLeft;
  const contentTop = GRID.top;
  const contentWidth = SLIDE.widthPt - FRAME.padLeft - FRAME.padRight;
  const scenarioWidth = (contentWidth - GRID.labelWidth - GRID.columnGap * 3) / 3;

  renderLabelColumn(slide, contentLeft, contentTop);
  CONTENT.scenarios.forEach((scenario, index) => {
    const xPt = contentLeft + GRID.labelWidth + GRID.columnGap + index * (scenarioWidth + GRID.columnGap);
    renderScenario(slide, scenario, xPt, contentTop, scenarioWidth);
  });

  addTextBox(slide, CONTENT.footnote, {
    x: ptToIn(FRAME.padLeft), y: ptToIn(SLIDE.heightPt - FRAME.padBottom - 18),
    w: ptToIn(SLIDE.widthPt - FRAME.padLeft - FRAME.padRight), h: ptToIn(17),
    fontSize: 6.2, color: COLORS.textSoft, valign: 'top',
  });

  if (!externalPptx) {
    await pptx.writeFile({ fileName: OUTPUT_PATH });
    await stripPptxMetadata(OUTPUT_PATH);
  }
  return pptx;
}

module.exports = { buildSlide };
if (require.main === module) buildSlide().catch((e) => { console.error(e); process.exitCode = 1; });
