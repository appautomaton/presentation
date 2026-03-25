/**
 * P07 Machine — process / mechanism / flywheel.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   steps: [{ num, title, description }],
 *   conclusion?,
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const steps = data.steps || [];
  const stepHeights = steps.map((step) => {
    const descH = step.description
      ? estimateTextHeight(step.description, {
          charsPerLine: 92,
          lineH: 0.145,
          padding: 0.03,
          minH: 0.18,
        })
      : 0;
    return 0.16 + descH + 0.18;
  });
  const stepGap = 0.06;
  const conclusionTextH = data.conclusion
    ? estimateTextHeight(data.conclusion, {
        charsPerLine: 118,
        lineH: 0.15,
        padding: 0.04,
        minH: 0.22,
      })
    : 0;
  const conclusionH = data.conclusion ? conclusionTextH + 0.14 : 0;
  const totalH =
    stepHeights.reduce((sum, h) => sum + h, 0)
    + Math.max(0, stepHeights.length - 1) * stepGap
    + conclusionH
    + (data.conclusion ? 0.12 : 0);
  const startY = Math.max(frame.bodyY + 0.04, frame.centerY(totalH));

  // Vertical connector line
  const lineX = G.marginL + 0.22;
  if (steps.length > 1) {
    const lineTop = startY + 0.21;
    const lineBottom = startY + stepHeights.slice(0, -1).reduce((sum, h) => sum + h + stepGap, 0) + 0.21;
    slide.addShape(pptx.ShapeType.rect, {
      x: lineX + 0.07, y: lineTop, w: 0.02, h: Math.max(0.12, lineBottom - lineTop),
      fill: { color: theme.border },
    });
  }

  let cursorY = startY;
  steps.forEach((step, i) => {
    const y = cursorY;
    const stepH = stepHeights[i];
    const descH = Math.max(0, stepH - 0.34);

    // Numbered circle
    slide.addShape(pptx.ShapeType.ellipse, {
      x: lineX, y: y + 0.05, w: 0.32, h: 0.32,
      fill: { color: theme.accent },
    });
    slide.addText(step.num || String(i + 1), {
      x: lineX, y: y + 0.05, w: 0.32, h: 0.32,
      fontSize: 11, fontFace: theme.font, color: 'FFFFFF', bold: true,
      align: 'center', valign: 'middle',
    });

    // Title + description
    slide.addText(step.title, {
      x: G.marginL + 0.7, y: y + 0.02, w: 5, h: 0.22,
      fontSize: 12, fontFace: theme.font, color: theme.accent, bold: true,
      margin: 0, fit: 'shrink',
    });
    if (step.description) {
      slide.addText(step.description, {
        x: G.marginL + 0.7, y: y + 0.24, w: 7.25, h: descH,
        fontSize: 10, fontFace: theme.font, color: theme.textSec, valign: 'top',
        margin: 0, fit: 'shrink', lineSpacingMultiple: 1.08,
      });
    }

    cursorY += stepH + stepGap;
  });

  // Conclusion band
  if (data.conclusion) {
    const conY = cursorY + 0.04;
    slide.addShape(pptx.ShapeType.rect, { x: G.marginL, y: conY, w: G.contentW, h: conclusionH, fill: { color: theme.mist } });
    slide.addShape(pptx.ShapeType.rect, { x: G.marginL, y: conY, w: 0.04, h: conclusionH, fill: { color: theme.accent } });
    slide.addText(data.conclusion, {
      x: G.marginL + G.cellPad, y: conY + 0.06, w: G.contentW - 0.3, h: conclusionTextH,
      fontSize: 10, fontFace: theme.font, color: theme.text, bold: true, valign: 'top',
      margin: 0, fit: 'shrink',
    });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
