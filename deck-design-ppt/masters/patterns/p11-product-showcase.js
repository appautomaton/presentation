/**
 * P11 Product Showcase — platform/product with feature cards.
 *
 * data: {
 *   sectionTag?, title,
 *   productTitle, productDescription?,
 *   features: [{ icon?, title, description }],
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const features = data.features || [];
  const leftW = 4.5, rightW = G.contentW - leftW - 0.3;
  const contentH = Math.min(3.0, frame.bodyH - 0.08);
  const startY = frame.centerY(contentH);

  // Product area (left)
  slide.addShape(pptx.ShapeType.rect, {
    x: G.marginL, y: startY, w: leftW, h: contentH,
    fill: { color: theme.mist }, line: { color: theme.border, width: 0.5 },
  });
  slide.addText(data.productTitle, {
    x: G.marginL + 0.2, y: startY + 0.15, w: leftW - 0.4, h: 0.3,
    fontSize: 14, fontFace: theme.fontDisplay, color: theme.accent, bold: true, fit: 'shrink',
  });
  if (data.productDescription) {
    slide.addText(data.productDescription, {
      x: G.marginL + 0.2, y: startY + 0.5, w: leftW - 0.4, h: contentH - 0.7,
      fontSize: 10, fontFace: theme.font, color: theme.textSec, valign: 'top', lineSpacingMultiple: 1.3, fit: 'shrink',
    });
  }

  // Feature cards (right)
  const cardH = (contentH - (features.length - 1) * 0.1) / features.length;
  features.forEach((f, i) => {
    const y = startY + i * (cardH + 0.1);
    const x = G.marginL + leftW + 0.3;
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: rightW, h: cardH,
      fill: { color: theme.canvas }, line: { color: theme.border, width: 0.5 },
    });
    slide.addText(f.title, {
      x: x + 0.12, y: y + 0.08, w: rightW - 0.24, h: 0.22,
      fontSize: 11, fontFace: theme.font, color: theme.accent, bold: true, fit: 'shrink',
    });
    if (f.description) {
      slide.addText(f.description, {
        x: x + 0.12, y: y + 0.32, w: rightW - 0.24, h: cardH - 0.4,
        fontSize: 9, fontFace: theme.font, color: theme.textSec, valign: 'top', lineSpacingMultiple: 1.2, fit: 'shrink',
      });
    }
  });

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
