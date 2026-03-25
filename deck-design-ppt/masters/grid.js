/**
 * Grid — spatial contract for all slide layouts.
 *
 * Every pattern function uses these constants to position content.
 * Change a value here → all 17 patterns adjust automatically.
 *
 * Slide canvas: 10" × 5.625" (pptxgenjs LAYOUT_16x9)
 */

const GRID = {
  // Slide dimensions
  slideW:      10,
  slideH:      5.625,

  // Header
  headerH:     0.083,     // 6pt header bar

  // Margins (symmetric top/bottom)
  marginL:     0.56,
  marginR:     0.56,
  contentW:    8.88,       // 10 - 0.56 - 0.56

  // Title zone
  tagY:        0.33,       // section tag baseline
  titleY:      0.48,       // action title baseline
  subtitleY:   0.72,       // subtitle / context line

  // Body zone
  bodyY:       0.90,       // body content starts
  bodyEndY:    4.95,       // body content must end
  bodyH:       4.05,       // bodyEndY - bodyY

  // Footer zone (symmetric with top margin)
  footerRuleY: 5.20,       // thin rule
  footerTextY: 5.30,       // source, logo, page number

  // Cell padding (for tables, grids)
  cellPad:     0.15,
};

/**
 * Center content vertically within the body zone.
 * @param {number} contentH - total height of content block (inches)
 * @returns {number} - Y position to start content
 */
GRID.centerY = function(contentH) {
  return this.bodyY + (this.bodyH - contentH) / 2;
};

/**
 * Center content vertically within the full slide (for covers, dividers).
 * @param {number} contentH - total height of content block (inches)
 * @returns {number} - Y position to start content
 */
GRID.centerSlideY = function(contentH) {
  return (this.slideH - contentH) / 2;
};

module.exports = GRID;
