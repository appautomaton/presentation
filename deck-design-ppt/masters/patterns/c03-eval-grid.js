/**
 * C03 Eval Grid — color-coded evaluation matrix (criteria × options).
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   columns: [string],                          // option names
 *   rows: [{ criteria, ratings: [string] }],     // rating text per column
 *   ratingColors?: { Strong: hex, Mixed: hex, Weak: hex },
 *   sidebar?: { title, bullets: [string] },
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const PAD = G.cellPad;
  const cols = data.columns || [];
  const rows = data.rows || [];
  const hasSidebar = !!data.sidebar;
  const gridW = hasSidebar ? 5.95 : G.contentW;
  const critW = 1.8;
  const colW = (gridW - critW) / cols.length;
  const rowH = 0.38, headerH = 0.35;
  const gridH = headerH + rows.length * rowH;
  const startY = hasSidebar ? frame.bodyY + 0.02 : Math.max(frame.bodyY + 0.02, frame.centerY(gridH));

  const ratingColors = data.ratingColors || {
    Strong: 'D4EDDA', Mixed: 'FFF3CD', Weak: 'F8D7DA', High: 'F8D7DA', Low: 'D4EDDA',
  };

  // Header
  slide.addShape(pptx.ShapeType.rect, { x: G.marginL, y: startY, w: gridW, h: headerH, fill: { color: theme.accent } });
  slide.addText('Criteria', { x: G.marginL + PAD, y: startY, w: critW - PAD, h: headerH, fontSize: 10, fontFace: theme.font, color: 'FFFFFF', bold: true, valign: 'middle', margin: 0, fit: 'shrink' });
  cols.forEach((c, i) => {
    const cx = G.marginL + critW + i * colW;
    slide.addText(c, { x: cx, y: startY, w: colW, h: headerH, fontSize: 10, fontFace: theme.font, color: 'FFFFFF', bold: true, align: 'center', valign: 'middle', margin: 0, fit: 'shrink' });
  });

  // Rows
  rows.forEach((row, ri) => {
    const ry = startY + headerH + ri * rowH;
    slide.addShape(pptx.ShapeType.rect, { x: G.marginL, y: ry + rowH - 0.005, w: gridW, h: 0.005, fill: { color: 'E8E8E8' } });
    slide.addText(row.criteria, { x: G.marginL + PAD, y: ry, w: critW - PAD, h: rowH, fontSize: 10, fontFace: theme.font, color: theme.text, bold: true, valign: 'middle', margin: 0, fit: 'shrink' });

    (row.ratings || []).forEach((rating, ci) => {
      const cx = G.marginL + critW + ci * colW;
      const bgColor = ratingColors[rating] || theme.canvas;
      slide.addShape(pptx.ShapeType.rect, { x: cx, y: ry, w: colW, h: rowH, fill: { color: bgColor } });
      slide.addText(rating, { x: cx, y: ry, w: colW, h: rowH, fontSize: 10, fontFace: theme.font, color: theme.text, align: 'center', valign: 'middle', margin: 0, fit: 'shrink' });
    });
  });

  // Sidebar
  if (data.sidebar) {
    const sx = G.marginL + gridW + 0.2;
    const sw = G.contentW - gridW - 0.2;
    let sy = startY;
    slide.addText(data.sidebar.title || 'KEY TAKEAWAY', {
      x: sx, y: sy, w: sw, h: 0.2,
      fontSize: 11, fontFace: theme.font, color: theme.accent, bold: true, charSpacing: 0.5,
      margin: 0, fit: 'shrink',
    });
    sy += 0.25;
    (data.sidebar.bullets || []).forEach(b => {
      const bulletH = estimateTextHeight(b, {
        charsPerLine: 34,
        lineH: 0.15,
        padding: 0.04,
        minH: 0.22,
      });
      slide.addText(b, {
        x: sx + 0.1, y: sy, w: sw - 0.1, h: bulletH,
        fontSize: 9.5, fontFace: theme.font, color: theme.text,
        bullet: { code: '2022' }, valign: 'top', lineSpacingMultiple: 1.08,
        margin: 0, fit: 'shrink',
      });
      sy += bulletH + 0.08;
    });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
