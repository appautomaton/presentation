/**
 * P08 Closer — recommendation / closing slide.
 *
 * data: { title, body, nextSteps?: [string] }
 */
const G = require('../grid');
const { estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const stepsCount = (data.nextSteps || []).length;
  const titleH = estimateTextHeight(data.title, {
    charsPerLine: 42,
    lineH: 0.3,
    padding: 0.08,
    minH: 0.45,
  });
  const bodyH = estimateTextHeight(data.body, {
    charsPerLine: 72,
    lineH: 0.22,
    padding: 0.06,
    minH: 0.7,
  });
  const stepHeights = (data.nextSteps || []).map((step) => estimateTextHeight(step, {
    charsPerLine: 70,
    lineH: 0.18,
    padding: 0.03,
    minH: 0.24,
  }));
  const stepsH = stepHeights.reduce((sum, h) => sum + h, 0) + Math.max(0, stepsCount - 1) * 0.08;
  const contentH = titleH + 0.18 + bodyH + 0.22 + (stepsCount ? 0.26 + stepsH : 0);
  const startY = G.centerY(contentH);

  // Title
  slide.addText(data.title, {
    x: G.marginL, y: startY, w: G.contentW, h: titleH,
    fontSize: 24, fontFace: theme.fontDisplay, color: theme.accent, bold: true,
    margin: 0, fit: 'shrink', valign: 'top',
  });

  // Body
  slide.addText(data.body, {
    x: G.marginL, y: startY + titleH + 0.18, w: 7.4, h: bodyH,
    fontSize: 14, fontFace: theme.font, color: theme.text,
    lineSpacingMultiple: 1.3, margin: 0, fit: 'shrink', valign: 'top',
  });

  // Divider rule
  const ruleY = startY + titleH + 0.18 + bodyH + 0.12;
  slide.addShape(pptx.ShapeType.rect, {
    x: G.marginL, y: ruleY, w: 0.8, h: 0.04,
    fill: { color: theme.border },
  });

  // Next steps
  if (data.nextSteps) {
    let stepY = ruleY + 0.18;
    data.nextSteps.forEach((step, i) => {
      slide.addText(step, {
        x: G.marginL + 0.2, y: stepY, w: 6.8, h: stepHeights[i],
        fontSize: 12, fontFace: theme.font, color: theme.textSec,
        bullet: { code: '2022' }, margin: 0, fit: 'shrink',
        lineSpacingMultiple: 1.1,
        valign: 'top',
      });
      stepY += stepHeights[i] + 0.08;
    });
  }
};
