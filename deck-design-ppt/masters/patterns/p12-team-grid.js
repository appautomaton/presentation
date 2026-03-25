/**
 * P12 Team Grid — team member cards.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   members: [{ name, role, bio }],
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const members = data.members || [];
  const count = members.length;
  const cols = Math.min(count, 4);
  const gap = 0.15;
  const cardW = (G.contentW - (cols - 1) * gap) / cols;
  const cardH = Math.min(2.6, frame.bodyH - 0.08);
  const startY = frame.centerY(cardH);
  const startX = G.marginL;

  members.forEach((m, i) => {
    const col = i % cols;
    const x = startX + col * (cardW + gap);

    // Card outline
    slide.addShape(pptx.ShapeType.rect, {
      x, y: startY, w: cardW, h: cardH,
      line: { color: theme.border, width: 0.5 },
    });

    // Photo placeholder
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.15, y: startY + 0.15, w: cardW - 0.3, h: 1.1,
      fill: { color: theme.mist },
    });

    // Name
    slide.addText(m.name, {
      x: x + 0.12, y: startY + 1.35, w: cardW - 0.24, h: 0.22,
      fontSize: 12, fontFace: theme.font, color: theme.text, bold: true, fit: 'shrink',
    });

    // Role
    slide.addText(m.role, {
      x: x + 0.12, y: startY + 1.57, w: cardW - 0.24, h: 0.2,
      fontSize: 10, fontFace: theme.font, color: theme.accent, bold: true, fit: 'shrink',
    });

    // Accent line under role
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.12, y: startY + 1.78, w: 0.6, h: 0.025,
      fill: { color: theme.accent },
    });

    // Bio
    if (m.bio) {
      slide.addText(m.bio, {
        x: x + 0.12, y: startY + 1.88, w: cardW - 0.24, h: cardH - 2.03,
        fontSize: 9, fontFace: theme.font, color: theme.textSec,
        valign: 'top', lineSpacingMultiple: 1.2, fit: 'shrink',
      });
    }
  });

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
