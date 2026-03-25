/**
 * P15 Bubble Matrix — sized circles on a grid (rows × columns).
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   columns: [{ key, label, color? }],
 *   rows: [{ key, label }],
 *   values: { [rowKey]: { [colKey]: number } },  // value drives bubble size
 *   referenceValue?: number,        // value that produces the reference diameter (default: 10)
 *   referenceDiameter?: number,     // diameter in inches at referenceValue (default: 0.45)
 *   sidebar?: { title, bullets: [string] },
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const frame = drawContentHeader(slide, data, theme);

  const columns = data.columns || [];
  const rows = data.rows || [];
  const values = data.values || {};
  const refVal = data.referenceValue || 10;
  const refDiam = data.referenceDiameter || 0.45;

  // Area-proportional sizing: diameter = refDiam * sqrt(value / refVal)
  const valueToDiameter = (v) => refDiam * Math.sqrt(v / refVal);

  // Matrix area
  const hasSidebar = !!data.sidebar;
  const matrixW = hasSidebar ? 6.0 : G.contentW;
  const rowLabelW = 1.2;
  const colW = (matrixW - rowLabelW) / columns.length;
  const rowH = frame.bodyH / (rows.length + 1); // +1 for header
  const matrixX = G.marginL;
  const matrixY = frame.bodyY;

  // Column headers
  columns.forEach((col, ci) => {
    const cx = matrixX + rowLabelW + ci * colW + colW / 2;
    slide.addText(col.label, {
      x: cx - colW / 2, y: matrixY, w: colW, h: rowH * 0.7,
      fontSize: 10, fontFace: theme.font, color: theme.accent,
      bold: true, align: 'center', valign: 'bottom', fit: 'shrink',
    });
  });

  // Row labels + bubbles
  rows.forEach((row, ri) => {
    const ry = matrixY + (ri + 1) * rowH;
    const centerY = ry + rowH / 2;

    // Row label
    slide.addText(row.label, {
      x: matrixX, y: ry, w: rowLabelW - 0.1, h: rowH,
      fontSize: 10, fontFace: theme.font, color: theme.text,
      bold: true, align: 'right', valign: 'middle', fit: 'shrink',
    });

    // Row separator
    if (ri < rows.length - 1) {
      slide.addShape(pptx.ShapeType.rect, {
        x: matrixX + rowLabelW, y: ry + rowH - 0.003, w: matrixW - rowLabelW, h: 0.006,
        fill: { color: theme.border },
      });
    }

    // Bubbles
    columns.forEach((col, ci) => {
      const val = (values[row.key] || {})[col.key];
      if (!val) return;

      const d = valueToDiameter(val);
      const cx = matrixX + rowLabelW + ci * colW + colW / 2;

      slide.addShape(pptx.ShapeType.ellipse, {
        x: cx - d / 2, y: centerY - d / 2, w: d, h: d,
        fill: { color: col.color || theme.accent, transparency: 15 },
        line: { color: col.color || theme.accent, width: 1.5 },
      });

      // Value label inside bubble (if large enough)
      if (d > 0.35) {
        slide.addText(String(Math.round(val * 10) / 10), {
          x: cx - d / 2, y: centerY - d / 2, w: d, h: d,
          fontSize: 8, fontFace: theme.font, color: theme.text,
          bold: true, align: 'center', valign: 'middle',
        });
      }
    });
  });

  // Legend (reference bubble)
  const legendY = frame.bodyEndY - 0.3;
  slide.addShape(pptx.ShapeType.ellipse, {
    x: matrixX + rowLabelW, y: legendY, w: refDiam, h: refDiam,
    line: { color: theme.border, width: 1 },
  });
  slide.addText(`= ${refVal}%`, {
    x: matrixX + rowLabelW + refDiam + 0.08, y: legendY, w: 1, h: refDiam,
    fontSize: 9, fontFace: theme.font, color: theme.textSec, valign: 'middle', fit: 'shrink',
  });

  // Sidebar
  if (data.sidebar) {
    const sx = G.marginL + matrixW + 0.2;
    const sw = G.contentW - matrixW - 0.2;
    let sy = frame.bodyY;
    slide.addText(data.sidebar.title || 'KEY TAKEAWAY', {
      x: sx, y: sy, w: sw, h: 0.2,
      fontSize: 11, fontFace: theme.font, color: theme.accent, bold: true, charSpacing: 0.5,
    });
    sy += 0.25;
    (data.sidebar.bullets || []).forEach(b => {
      const bh = estimateTextHeight(b, { charsPerLine: 28, lineH: 0.16, padding: 0.04, minH: 0.24 });
      slide.addText(b, {
        x: sx + 0.1, y: sy, w: sw - 0.1, h: bh,
        fontSize: 10, fontFace: theme.font, color: theme.text,
        bullet: { code: '2022' }, valign: 'top', lineSpacingMultiple: 1.1, fit: 'shrink',
      });
      sy += bh + 0.06;
    });
  }

  if (data.source) {
    slide.addText(data.source, { x: 2.8, y: G.footerTextY, w: 5, h: 0.18, fontSize: 8, fontFace: theme.font, color: theme.textFine });
  }
};
