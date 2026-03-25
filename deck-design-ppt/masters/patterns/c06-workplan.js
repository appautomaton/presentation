/**
 * C06 Workplan — Gantt-like calendar grid with row spans and milestones.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   columns: [string],                          // time period labels (e.g., ['Week 1','Week 2',...])
 *   rows: [{ id?, label, start, span, color? }], // start = column index, span = column count
 *   milestones?: [{ label, column, icon? }],     // markers at specific columns
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const columns = data.columns || [];
  const rows = data.rows || [];
  const milestones = data.milestones || [];
  if (!columns.length || !rows.length) return;

  // Grid geometry
  const labelW = 2.5;
  const gridW = G.contentW - labelW - 0.1;
  const gridX = G.marginL + labelW + 0.1;
  const colW = gridW / columns.length;
  const rowH = 0.35;
  const headerH = 0.3;
  const milestoneH = milestones.length ? 0.35 : 0;
  const totalH = headerH + rows.length * rowH + milestoneH;
  const startY = frame.centerY(totalH);

  // Header row
  slide.addShape(pptx.ShapeType.rect, {
    x: G.marginL, y: startY, w: G.contentW, h: headerH, fill: { color: theme.accent },
  });
  slide.addText('Requirement', {
    x: G.marginL + G.cellPad, y: startY, w: labelW - G.cellPad, h: headerH,
    fontSize: 10, fontFace: theme.font, color: 'FFFFFF', bold: true, valign: 'middle',
  });
  columns.forEach((col, ci) => {
    slide.addText(col, {
      x: gridX + ci * colW, y: startY, w: colW, h: headerH,
      fontSize: 9, fontFace: theme.font, color: 'FFFFFF',
      bold: true, align: 'center', valign: 'middle', fit: 'shrink',
    });
  });

  // Vertical grid lines
  for (let ci = 0; ci <= columns.length; ci++) {
    slide.addShape(pptx.ShapeType.rect, {
      x: gridX + ci * colW - 0.003, y: startY + headerH, w: 0.006,
      h: rows.length * rowH + milestoneH,
      fill: { color: theme.border },
    });
  }

  // Data rows
  rows.forEach((row, ri) => {
    const ry = startY + headerH + ri * rowH;

    // Row separator
    slide.addShape(pptx.ShapeType.rect, {
      x: G.marginL, y: ry + rowH - 0.003, w: G.contentW, h: 0.006,
      fill: { color: 'E8E8E8' },
    });

    // Row ID badge
    if (row.id) {
      const badgeSize = 0.26;
      const badgeX = G.marginL + 0.08;
      const badgeY = ry + (rowH - badgeSize) / 2;
      slide.addShape(pptx.ShapeType.ellipse, {
        x: badgeX, y: badgeY, w: badgeSize, h: badgeSize,
        fill: { color: theme.accent },
      });
      const textW = 0.5;
      slide.addText(row.id, {
        x: badgeX - (textW - badgeSize) / 2,
        y: badgeY,
        w: textW,
        h: badgeSize,
        fontSize: 7, fontFace: theme.font, color: 'FFFFFF',
        bold: true, align: 'center', valign: 'middle',
      });
    }

    // Row label
    const labelX = row.id ? G.marginL + 0.42 : G.marginL + G.cellPad;
    const labelWidth = row.id ? labelW - 0.42 : labelW - G.cellPad;
    slide.addText(row.label, {
      x: labelX, y: ry, w: labelWidth, h: rowH,
      fontSize: 9, fontFace: theme.font, color: theme.text, valign: 'middle', fit: 'shrink',
    });

    // Gantt fill bar
    const fillX = gridX + row.start * colW;
    const fillW = row.span * colW;
    slide.addShape(pptx.ShapeType.rect, {
      x: fillX + 0.02, y: ry + 0.06, w: fillW - 0.04, h: rowH - 0.12,
      fill: { color: row.color || theme.accent, transparency: 25 },
      line: { color: row.color || theme.accent, width: 1 },
      rectRadius: 0.03,
    });
  });

  // Milestones row
  if (milestones.length) {
    const mY = startY + headerH + rows.length * rowH + 0.08;
    milestones.forEach(m => {
      const mx = gridX + m.column * colW + colW / 2;
      slide.addShape(pptx.ShapeType.ellipse, {
        x: mx - 0.08, y: mY, w: 0.16, h: 0.16,
        fill: { color: theme.accent },
      });
      slide.addText(m.label, {
        x: mx - 0.6, y: mY + 0.18, w: 1.2, h: 0.15,
        fontSize: 8, fontFace: theme.font, color: theme.textSec,
        align: 'center', fit: 'shrink',
      });
    });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
