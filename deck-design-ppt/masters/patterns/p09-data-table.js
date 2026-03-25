/**
 * P09 Data Table — financial/comparison table with optional callout.
 *
 * data: {
 *   sectionTag?, title, subtitle?,
 *   columns: [{ label, width, align }],   // align: 'left' | 'right'
 *   rows: [{ cells: [string], highlight?, total? }],
 *   callout?: { text },
 *   source?
 * }
 */
const G = require('../grid');
const { drawContentHeader, estimateTextHeight } = require('../content-frame');

module.exports = function(slide, pptx, data, theme) {
  const PAD = G.cellPad;

  const frame = drawContentHeader(slide, data, theme);

  // Layout
  const cols = data.columns || [];
  const rows = data.rows || [];
  const rowH = 0.38, headerH = 0.35;
  const calloutTextH = data.callout
    ? estimateTextHeight(data.callout.text, {
        charsPerLine: 120,
        lineH: 0.16,
        padding: 0.04,
        minH: 0.24,
      })
    : 0;
  const calloutH = data.callout ? calloutTextH + 0.12 : 0;
  const tableH = headerH + rows.length * rowH + calloutH;
  const tableStartY = Math.max(frame.bodyY + 0.04, frame.centerY(tableH));

  // Header row
  slide.addShape(pptx.ShapeType.rect, {
    x: G.marginL, y: tableStartY, w: G.contentW, h: headerH,
    fill: { color: theme.accent },
  });
  let cx = G.marginL;
  cols.forEach(c => {
    const textX = c.align === 'left' ? cx + PAD : cx;
    const textW = c.width - PAD;
    slide.addText(c.label, {
      x: textX, y: tableStartY, w: textW, h: headerH,
      fontSize: 10, fontFace: theme.font, color: 'FFFFFF',
      bold: true, align: c.align || 'left', valign: 'middle',
      margin: 0, fit: 'shrink',
    });
    cx += c.width;
  });

  // Data rows
  rows.forEach((row, ri) => {
    const ry = tableStartY + headerH + ri * rowH;
    const isAlt = ri % 2 === 1;

    // Total row: double rule above
    if (row.total) {
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y: ry, w: G.contentW, h: 0.007,
        fill: { color: theme.accent },
      });
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y: ry + 0.015, w: G.contentW, h: 0.007,
        fill: { color: theme.accent },
      });
    }

    // Alt row background
    if (isAlt && !row.total) {
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y: ry, w: G.contentW, h: rowH,
        fill: { color: theme.darkMode ? '1A1614' : 'EFF3F8' },
      });
    }

    // Highlight row
    if (row.highlight) {
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y: ry, w: G.contentW, h: rowH,
        fill: { color: theme.darkMode ? '1E1A16' : 'E8EDF5' },
      });
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y: ry, w: 0.04, h: rowH,
        fill: { color: theme.accent },
      });
    }

    // Cells
    let rx = G.marginL;
    row.cells.forEach((cell, ci) => {
      const c = cols[ci];
      const isDelta = cell.startsWith('−') || cell.startsWith('+') || cell.startsWith('-');
      const isPos = cell.startsWith('+');
      const color = row.total ? theme.accent
        : isDelta ? (isPos ? theme.positive : theme.negative)
        : theme.text;
      const textX = c.align === 'left' ? rx + PAD : rx;
      const textW = c.width - PAD;

      slide.addText(cell, {
        x: textX, y: ry + (row.total ? 0.03 : 0), w: textW, h: rowH,
        fontSize: 10, fontFace: theme.font, color,
        bold: row.total || row.highlight,
        align: c.align || 'left', valign: 'middle',
        margin: 0, fit: 'shrink',
      });
      rx += c.width;
    });

    // Row separator
    if (!row.total) {
      slide.addShape(pptx.ShapeType.rect, {
        x: G.marginL, y: ry + rowH, w: G.contentW, h: 0.005,
        fill: { color: theme.darkMode ? '2A2420' : 'E8E8E8' },
      });
    }
  });

  // Callout
  if (data.callout) {
    const calloutY = tableStartY + headerH + rows.length * rowH + 0.15;
    slide.addShape(pptx.ShapeType.rect, {
      x: G.marginL, y: calloutY, w: G.contentW, h: 0.45,
      fill: { color: theme.mist },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: G.marginL, y: calloutY, w: 0.04, h: 0.45,
      fill: { color: theme.accent },
    });
    slide.addText(data.callout.text, {
      x: G.marginL + PAD, y: calloutY + 0.03, w: G.contentW - PAD * 2, h: calloutTextH,
      fontSize: 10, fontFace: theme.font, color: theme.text,
      valign: 'top', lineSpacingMultiple: 1.2, margin: 0, fit: 'shrink',
    });
  }

  // Source
  if (data.source) {
    slide.addText(data.source, {
      x: 2.8, y: G.footerTextY, w: 5, h: 0.18,
      fontSize: 8, fontFace: theme.font, color: theme.textFine,
    });
  }
};
