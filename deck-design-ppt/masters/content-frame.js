const G = require('./grid');

function estimateLines(text, charsPerLine = 72) {
  if (!text) return 0;

  return String(text)
    .split(/\r?\n/)
    .reduce((total, rawLine) => {
      const line = rawLine.trim();
      if (!line) return total + 1;

      let lines = 1;
      let width = 0;
      line.split(/\s+/).forEach((word) => {
        const nextWidth = width === 0 ? word.length : width + 1 + word.length;
        if (nextWidth > charsPerLine) {
          lines += 1;
          width = word.length;
        } else {
          width = nextWidth;
        }
      });
      return total + lines;
    }, 0);
}

function estimateTextHeight(text, options = {}) {
  if (!text) return 0;

  const charsPerLine = options.charsPerLine ?? 72;
  const lineH = options.lineH ?? 0.16;
  const padding = options.padding ?? 0.04;
  const minH = options.minH ?? lineH;

  return Math.max(minH, estimateLines(text, charsPerLine) * lineH + padding);
}

function getContentFrame(data, options = {}) {
  const titleY = options.titleY ?? G.titleY;
  const bodyEndY = options.bodyEndY ?? G.bodyEndY;

  const titleH = estimateTextHeight(data.title, {
    charsPerLine: options.titleCharsPerLine ?? 74,
    lineH: options.titleLineH ?? 0.21,
    padding: options.titlePadding ?? 0.04,
    minH: options.titleMinH ?? 0.3,
  });

  const subtitleH = data.subtitle
    ? estimateTextHeight(data.subtitle, {
        charsPerLine: options.subtitleCharsPerLine ?? 88,
        lineH: options.subtitleLineH ?? 0.14,
        padding: options.subtitlePadding ?? 0.02,
        minH: options.subtitleMinH ?? 0.16,
      })
    : 0;

  const subtitleY = titleY + titleH + (data.subtitle ? options.titleToSubtitleGap ?? 0.04 : 0);
  const headerBottom = data.subtitle ? subtitleY + subtitleH : titleY + titleH;
  const bodyY = Math.max(options.minBodyY ?? G.bodyY, headerBottom + (options.headerToBodyGap ?? 0.1));
  const bodyH = Math.max(0.2, bodyEndY - bodyY);

  return {
    titleY,
    titleH,
    subtitleY,
    subtitleH,
    bodyY,
    bodyH,
    bodyEndY,
    centerY(contentH, centerOptions = {}) {
      const minPad = centerOptions.minPad ?? 0.04;
      return Math.max(bodyY + minPad, bodyY + (bodyH - contentH) / 2);
    },
  };
}

function drawContentHeader(slide, data, theme, options = {}) {
  const frame = getContentFrame(data, options);

  if (data.sectionTag) {
    slide.addText(data.sectionTag, {
      x: G.marginL,
      y: options.tagY ?? G.tagY,
      w: G.contentW,
      h: 0.15,
      fontSize: options.tagFontSize ?? 8,
      fontFace: theme.font,
      color: theme.textFine,
      bold: true,
      charSpacing: 1,
      margin: 0,
      fit: 'shrink',
    });
  }

  slide.addText(data.title, {
    x: G.marginL,
    y: frame.titleY,
    w: G.contentW,
    h: frame.titleH,
    fontSize: options.titleFontSize ?? 15,
    fontFace: theme.fontDisplay,
    color: theme.accent,
    bold: true,
    margin: 0,
    fit: 'shrink',
    valign: 'top',
    breakLine: false,
  });

  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: G.marginL,
      y: frame.subtitleY,
      w: G.contentW,
      h: frame.subtitleH,
      fontSize: options.subtitleFontSize ?? 10,
      fontFace: theme.font,
      color: theme.textSec,
      margin: 0,
      fit: 'shrink',
      valign: 'top',
    });
  }

  return frame;
}

module.exports = {
  drawContentHeader,
  estimateLines,
  estimateTextHeight,
  getContentFrame,
};
