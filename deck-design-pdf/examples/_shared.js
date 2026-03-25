const path = require('path');

const REFERENCE_CANVAS = { width: 1280, height: 720 };
const DEFAULT_CHART_RANGE = {
  min: { width: 768, height: 432 },
  preferred: { width: 1280, height: 720 },
  max: { width: 1600, height: 900 },
};
const DEFAULT_LAYOUT_SAMPLES = [
  { label: 'compact', width: 900, height: 506 },
  { label: 'preferred', width: 1280, height: 720 },
  { label: 'wide', width: 1440, height: 810 },
];
// Default colors matching the McKinsey palette. Examples use these for standalone
// preview rendering. In production slides, use CSS custom properties: var(--accent),
// var(--text), var(--surface-muted), etc. See SKILL.md § Design tokens.
const STANDARD_COLORS = Object.freeze({
  textStrong: '#101A27',
  textMuted: '#4E6176',
  textLight: '#8BA5BD',
  textSubtle: '#7A8EA5',
  accent: '#123A63',
  accentAlt: '#2E7D9B',
  accentSoft: '#5BA4C9',
  success: '#2E9E5A',
  danger: '#A43C35',
  axisLine: '#C7D5E5',
  borderSoft: '#D7E4EE',
  gridLine: '#E4EDF7',
});

function clamp(value, min, max = Infinity) {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function clampFloat(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function interpolate(start, end, ratio) {
  return start + ((end - start) * ratio);
}

function normalizePoint(point, fallback) {
  return {
    width: point?.width || fallback.width,
    height: point?.height || fallback.height,
  };
}

function normalizeRange(range = {}) {
  const preferred = normalizePoint(range.preferred, DEFAULT_CHART_RANGE.preferred);
  const min = normalizePoint(range.min, DEFAULT_CHART_RANGE.min);
  const max = normalizePoint(range.max, DEFAULT_CHART_RANGE.max);
  return { min, preferred, max };
}

function normalizeSamples(samples = []) {
  if (!samples.length) return DEFAULT_LAYOUT_SAMPLES;
  return samples.map((sample, index) => ({
    label: sample.label || `sample-${index + 1}`,
    width: sample.width || REFERENCE_CANVAS.width,
    height: sample.height || REFERENCE_CANVAS.height,
  }));
}

function normalizeResponsiveSpec(spec = {}) {
  const templateClass = spec.templateClass || 'chart';
  const exhibitRange = normalizeRange(spec.exhibitRange);
  const slideRange = normalizeRange(spec.slideRange || spec.exhibitRange || exhibitRange);
  return {
    templateClass,
    exhibitRange,
    slideRange,
    previewSamples: normalizeSamples(spec.previewSamples || []),
    rationale: spec.rationale || '',
    agentSizingNotes: spec.agentSizingNotes || '',
  };
}

// ── Typography tier baselines ──────────────────────────────────────────
// Each value is [compact, preferred, wide] fed to textAdapt().
// 1 CSS px = 0.75 pt in the rendered PDF (960×540pt page).
const TYPOGRAPHY_TIERS = Object.freeze({
  document: {
    // 12–18pt range. Dense but legible on screen and print.
    actionTitle:   [26, 34, 40],   // 19.5–30pt
    sectionLabel:  [11, 13, 14],
    footer:        [11, 13, 14],
    body:          [15, 17, 19],   // 11.25–14.25pt
    bodyLarge:     [16, 18, 20],
    small:         [13, 15, 16],   // 9.75–12pt
    smallLarge:    [14, 16, 17],
    micro:         [12, 13, 14],   // 9–10.5pt
    microLarge:    [13, 14, 15],
    axis:          [14, 16, 17],   // 10.5–12.75pt
    axisLarge:     [15, 17, 18],
    axisFine:      [13, 15, 16],
    axisFineLarge: [14, 16, 17],
    label:         [14, 16, 17],   // 10.5–12.75pt
    labelLarge:    [15, 17, 18],
    metricValue:   [24, 32, 38],   // 18–28.5pt
    metricLabel:   [14, 16, 17],
    metricLabelLg: [15, 17, 18],
  },
  presentation: {
    // ~15pt–20pt range. Room-safe, projection-safe. (~15% smaller than initial spec.)
    actionTitle:   [27, 36, 43],   // 20–32pt
    sectionLabel:  [12, 14, 15],
    footer:        [12, 14, 15],
    body:          [17, 20, 24],   // 12.75–18pt
    bodyLarge:     [19, 22, 26],
    small:         [15, 19, 20],   // 11.25–15pt
    smallLarge:    [17, 20, 22],
    micro:         [14, 15, 17],   // 10.5–12.75pt
    microLarge:    [15, 17, 19],
    axis:          [15, 19, 20],   // 11.25–15pt
    axisLarge:     [17, 20, 22],
    axisFine:      [15, 17, 19],
    axisFineLarge: [17, 19, 20],
    label:         [15, 19, 20],   // 11.25–15pt
    labelLarge:    [17, 20, 22],
    metricValue:   [27, 36, 43],   // 20–32pt
    metricLabel:   [15, 19, 20],
    metricLabelLg: [17, 20, 22],
  },
});

function getSizeTokens(width = REFERENCE_CANVAS.width, height = REFERENCE_CANVAS.height, tier = 'document') {
  const t = TYPOGRAPHY_TIERS[tier] || TYPOGRAPHY_TIERS.document;
  const minScale = 0.58;
  const preferredScale = 1;
  const maxScale = 1.25;
  // Presentation text should compress more slowly than geometry.
  const readableMinScale = 0.76;
  const readableMaxScale = 1.14;
  const widthScale = width / REFERENCE_CANVAS.width;
  const heightScale = height / REFERENCE_CANVAS.height;
  const scale = clampFloat(Math.min(widthScale, heightScale), minScale, maxScale);
  const readableScale = clampFloat(Math.min(widthScale, heightScale), readableMinScale, readableMaxScale);
  const compactT = clampFloat((scale - minScale) / (preferredScale - minScale), 0, 1);
  const wideT = clampFloat((scale - preferredScale) / (maxScale - preferredScale), 0, 1);
  const readableCompactT = clampFloat((readableScale - readableMinScale) / (preferredScale - readableMinScale), 0, 1);
  const readableWideT = clampFloat((readableScale - preferredScale) / (readableMaxScale - preferredScale), 0, 1);
  const compact = scale <= 0.74 || width < 920 || height < 520;
  const wide = scale >= 1.08 && width >= 1360;
  const interpolatePiecewise = (compactValue, preferredValue, wideValue = preferredValue) => {
    if (scale <= preferredScale) {
      return interpolate(compactValue, preferredValue, compactT);
    }
    return interpolate(preferredValue, wideValue, wideT);
  };
  const interpolateReadable = (compactValue, preferredValue, wideValue = preferredValue) => {
    if (readableScale <= preferredScale) {
      return interpolate(compactValue, preferredValue, readableCompactT);
    }
    return interpolate(preferredValue, wideValue, readableWideT);
  };
  const adapt = (
    compactValue,
    preferredValue,
    wideValue = preferredValue,
    min = Math.min(compactValue, preferredValue, wideValue),
    max = Math.max(compactValue, preferredValue, wideValue)
  ) => clamp(interpolatePiecewise(compactValue, preferredValue, wideValue), min, max);
  const adaptFloat = (
    compactValue,
    preferredValue,
    wideValue = preferredValue,
    min = Math.min(compactValue, preferredValue, wideValue),
    max = Math.max(compactValue, preferredValue, wideValue)
  ) => clampFloat(interpolatePiecewise(compactValue, preferredValue, wideValue), min, max);
  const textAdapt = (
    compactValue,
    preferredValue,
    wideValue = preferredValue,
    min = Math.min(compactValue, preferredValue, wideValue),
    max = Math.max(compactValue, preferredValue, wideValue)
  ) => clamp(interpolateReadable(compactValue, preferredValue, wideValue), min, max);
  const textAdaptFloat = (
    compactValue,
    preferredValue,
    wideValue = preferredValue,
    min = Math.min(compactValue, preferredValue, wideValue),
    max = Math.max(compactValue, preferredValue, wideValue)
  ) => clampFloat(interpolateReadable(compactValue, preferredValue, wideValue), min, max);
  const between = (small, large, min = Math.min(small, large), max = Math.max(small, large)) =>
    adapt(small, large, large, min, max);
  const choose = (compactValue, regularValue, wideValue = regularValue) => {
    if (compact) return compactValue;
    if (wide) return wideValue;
    return regularValue;
  };

  return {
    width,
    height,
    scale,
    compact,
    wide,
    adapt,
    adaptFloat,
    textAdapt,
    textAdaptFloat,
    between,
    choose,
    shellPadX: adapt(28, 56, 68),
    shellPadTop: adapt(22, 40, 48),
    shellPadBottom: adapt(10, 16, 20),
    shellGap: adapt(8, 14, 18),
    footerPadY: adapt(6, 8, 10),
    footerPadX: adapt(28, 56, 68),
    tier,
    headerRule: between(3, 4, 3, 4),
    // Text tokens — all driven by typography tier baselines
    actionTitleSize: textAdapt(...t.actionTitle),
    sectionLabelSize: textAdapt(...t.sectionLabel),
    footerSize: textAdapt(...t.footer),
    exhibitPadX: adapt(12, 20, 26),
    exhibitPadY: adapt(10, 18, 24),
    exhibitRadius: adapt(12, 18, 20),
    exhibitBorder: compact ? 1 : 1.5,
    bodyText: textAdapt(...t.body),
    bodyTextLarge: textAdapt(...t.bodyLarge),
    smallText: textAdapt(...t.small),
    smallTextLarge: textAdapt(...t.smallLarge),
    microText: textAdapt(...t.micro),
    microTextLarge: textAdapt(...t.microLarge),
    axisText: textAdapt(...t.axis),
    axisTextLarge: textAdapt(...t.axisLarge),
    axisFineText: textAdapt(...t.axisFine),
    axisFineTextLarge: textAdapt(...t.axisFineLarge),
    labelText: textAdapt(...t.label),
    labelTextLarge: textAdapt(...t.labelLarge),
    metricValue: textAdapt(...t.metricValue),
    metricLabel: textAdapt(...t.metricLabel),
    metricLabelLarge: textAdapt(...t.metricLabelLg),
    iconSize: adapt(16, 22, 26),
    cardPad: adapt(10, 18, 22),
    gridGap: adapt(10, 20, 24),
    chartBarWidth: adapt(16, 28, 32),
    chartBarWide: adapt(34, 64, 76),
    chartBarXL: adapt(44, 80, 92),
    lineWidth: Number(adaptFloat(2, 2.5, 3).toFixed(2)),
    pointSize: adapt(4, 6, 7),
    badgeRadius: adapt(8, 12, 14),
    bubbleScale: Number(adaptFloat(0.68, 1, 1.12).toFixed(2)),
    bubbleLabelLineHeight: textAdapt(13, 14, 16),
    legendGap: adapt(12, 24, 28),
    tableCellPadY: adapt(7, 11, 13),
    tableCellPadX: adapt(8, 14, 16),
  };
}

function resolveSizeContext(options = {}) {
  const width = options.width || REFERENCE_CANVAS.width;
  const height = options.height || REFERENCE_CANVAS.height;
  const tier = options.tier || 'document';
  return {
    checkpoint: options.checkpoint || 'preferred',
    width,
    height,
    tier,
    tokens: getSizeTokens(width, height, tier),
  };
}

function cssText(styleMap) {
  return Object.entries(styleMap)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      const property = key.startsWith('--')
        ? key
        : key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      return `${property}:${value}`;
    })
    .join(';');
}

function getTokenStyle(tokens) {
  return cssText({
    '--shell-pad-x': `${tokens.shellPadX}px`,
    '--shell-pad-top': `${tokens.shellPadTop}px`,
    '--shell-pad-bottom': `${tokens.shellPadBottom}px`,
    '--footer-pad-x': `${tokens.footerPadX}px`,
    '--footer-pad-y': `${tokens.footerPadY}px`,
    '--header-rule': `${tokens.headerRule}px`,
    '--action-title-size': `${tokens.actionTitleSize}px`,
    '--section-label-size': `${tokens.sectionLabelSize}px`,
    '--footer-size': `${tokens.footerSize}px`,
    '--exhibit-pad-x': `${tokens.exhibitPadX}px`,
    '--exhibit-pad-y': `${tokens.exhibitPadY}px`,
    '--exhibit-radius': `${tokens.exhibitRadius}px`,
    '--exhibit-border': `${tokens.exhibitBorder}px`,
    '--body-text': `${tokens.bodyText}px`,
    '--small-text': `${tokens.smallText}px`,
    '--micro-text': `${tokens.microText}px`,
    '--metric-value': `${tokens.metricValue}px`,
    '--metric-label': `${tokens.metricLabel}px`,
    '--card-pad': `${tokens.cardPad}px`,
    '--grid-gap': `${tokens.gridGap}px`,
  });
}

function getFigureTypography(tokens, colors = STANDARD_COLORS, fontFamily = 'var(--font-body)') {
  return {
    axisTitle: {
      fontSize: tokens.axisText,
      fontWeight: 'bold',
      color: colors.textMuted,
      fontFamily,
    },
    axisTick: {
      fontSize: tokens.axisFineText,
      color: colors.textMuted,
      fontFamily,
    },
    axisTickLarge: {
      fontSize: tokens.axisFineTextLarge,
      color: colors.textMuted,
      fontFamily,
    },
    legend: {
      fontSize: tokens.smallText,
      color: colors.textMuted,
      fontFamily,
    },
    legendLarge: {
      fontSize: tokens.smallTextLarge,
      color: colors.textMuted,
      fontFamily,
    },
    dataLabel: {
      fontSize: tokens.labelText,
      fontFamily,
      color: colors.textStrong,
    },
    dataLabelStrong: {
      fontSize: tokens.labelText,
      fontWeight: 'bold',
      fontFamily,
      color: colors.textStrong,
    },
    dataLabelLarge: {
      fontSize: tokens.labelTextLarge,
      fontFamily,
      color: colors.textStrong,
    },
    dataLabelLargeStrong: {
      fontSize: tokens.labelTextLarge,
      fontWeight: 'bold',
      fontFamily,
      color: colors.textStrong,
    },
    annotation: {
      fontSize: tokens.smallText,
      fontFamily,
      color: colors.textMuted,
    },
    annotationStrong: {
      fontSize: tokens.smallText,
      fontWeight: 'bold',
      fontFamily,
      color: colors.accent,
    },
    annotationLarge: {
      fontSize: tokens.smallTextLarge,
      fontFamily,
      color: colors.textMuted,
    },
    annotationLargeStrong: {
      fontSize: tokens.smallTextLarge,
      fontWeight: 'bold',
      fontFamily,
      color: colors.accent,
    },
    metricLabel: {
      fontSize: tokens.metricLabel,
      fontWeight: 600,
      color: colors.textStrong,
      fontFamily,
    },
    metricLabelLarge: {
      fontSize: tokens.metricLabelLarge,
      fontWeight: 600,
      color: colors.textStrong,
      fontFamily,
    },
    metricValue: {
      fontSize: tokens.metricValue,
      fontWeight: 700,
      color: colors.textStrong,
      fontFamily,
      lineHeight: 1,
    },
    metaLabel: {
      fontSize: tokens.microText,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: colors.textSubtle,
      fontFamily,
    },
    metaLabelLarge: {
      fontSize: tokens.microTextLarge,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: colors.textSubtle,
      fontFamily,
    },
  };
}

function getChartChrome(tokens, colors = STANDARD_COLORS, figure = getFigureTypography(tokens, colors)) {
  return {
    tooltipHidden: { show: false },
    axisLineMuted: { lineStyle: { color: colors.axisLine } },
    axisLineNone: { show: false },
    axisTickNone: { show: false },
    splitLineDashed: { lineStyle: { color: colors.gridLine, type: 'dashed' } },
    splitLineNone: { show: false },
    hiddenAxisLabels: { show: false },
    legendBase: {
      bottom: 0,
      textStyle: figure.legend,
      itemWidth: Math.max(tokens.pointSize * 2, 10),
      itemHeight: Math.max(tokens.pointSize * 2, 10),
      itemGap: tokens.legendGap,
    },
  };
}

function getTemplateTextStyles(tokens, colors = STANDARD_COLORS) {
  return {
    body: {
      fontSize: `${tokens.bodyText}px`,
      color: colors.textStrong,
      fontFamily: 'var(--font-body)',
    },
    bodyLarge: {
      fontSize: `${tokens.bodyTextLarge}px`,
      color: colors.textStrong,
      fontFamily: 'var(--font-body)',
    },
    bodyMuted: {
      fontSize: `${tokens.bodyText}px`,
      color: colors.textMuted,
      fontFamily: 'var(--font-body)',
    },
    annotation: {
      fontSize: `${tokens.smallText}px`,
      color: colors.textMuted,
      fontFamily: 'var(--font-body)',
    },
    annotationLarge: {
      fontSize: `${tokens.smallTextLarge}px`,
      color: colors.textMuted,
      fontFamily: 'var(--font-body)',
    },
    annotationStrong: {
      fontSize: `${tokens.smallText}px`,
      fontWeight: 600,
      color: colors.accent,
      fontFamily: 'var(--font-body)',
    },
    annotationStrongLarge: {
      fontSize: `${tokens.smallTextLarge}px`,
      fontWeight: 600,
      color: colors.accent,
      fontFamily: 'var(--font-body)',
    },
    metricLabel: {
      fontSize: `${tokens.metricLabel}px`,
      fontWeight: 600,
      color: colors.textStrong,
      fontFamily: 'var(--font-body)',
    },
    metricLabelLarge: {
      fontSize: `${tokens.metricLabelLarge}px`,
      fontWeight: 600,
      color: colors.textStrong,
      fontFamily: 'var(--font-body)',
    },
    metricValue: {
      fontSize: `${tokens.metricValue}px`,
      fontWeight: 700,
      lineHeight: 1,
      color: colors.textStrong,
      fontFamily: 'var(--font-heading)',
    },
    metricValueAccent: {
      fontSize: `${tokens.metricValue}px`,
      fontWeight: 700,
      lineHeight: 1,
      color: colors.accent,
      fontFamily: 'var(--font-heading)',
    },
    metaLabel: {
      fontSize: `${tokens.microText}px`,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: colors.textSubtle,
      fontFamily: 'var(--font-body)',
    },
    metaLabelLarge: {
      fontSize: `${tokens.microTextLarge}px`,
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: colors.textSubtle,
      fontFamily: 'var(--font-body)',
    },
    table: {
      fontSize: `${tokens.bodyText}px`,
      fontFamily: 'var(--font-body)',
    },
    tableLarge: {
      fontSize: `${tokens.bodyTextLarge}px`,
      fontFamily: 'var(--font-body)',
    },
    tableHeader: {
      fontWeight: 600,
      color: colors.textStrong,
    },
    tableHeaderLarge: {
      fontWeight: 600,
      color: colors.textStrong,
    },
  };
}

function defineExample(config) {
  const required = ['id', 'title', 'tier', 'proves', 'data', 'sectionLabel', 'actionTitle', 'source', 'exhibitId', 'renderExhibit'];
  for (const key of required) {
    if (!config[key]) {
      throw new Error(`Example "${config.id || path.basename(__filename)}" is missing required field "${key}"`);
    }
  }
  config.responsiveSpec = normalizeResponsiveSpec(config.responsiveSpec);
  return config;
}

function getModeRange(example, modeKey) {
  const spec = example.responsiveSpec;
  return modeKey === 'slides' ? spec.slideRange : spec.exhibitRange;
}

function getPreviewContexts(example, modeKey) {
  const spec = example.responsiveSpec;
  if (spec.templateClass === 'layout') {
    return spec.previewSamples.map((sample) => ({
      checkpoint: sample.label,
      width: sample.width,
      height: sample.height,
      note: spec.agentSizingNotes || 'representative QA sample for an agent-sized layout template',
    }));
  }

  const range = getModeRange(example, modeKey);
  return [
    { checkpoint: 'min', width: range.min.width, height: range.min.height, note: spec.rationale || '' },
    { checkpoint: 'preferred', width: range.preferred.width, height: range.preferred.height, note: spec.rationale || '' },
    { checkpoint: 'max', width: range.max.width, height: range.max.height, note: spec.rationale || '' },
  ];
}

function renderStandaloneExhibit(example, context) {
  const { tokens } = context;
  const exhibit = example.renderExhibit(context);
  return `<div class="h-full w-full bg-[var(--surface)]" style="${getTokenStyle(tokens)}">
    <div class="h-full w-full overflow-hidden" style="padding:var(--exhibit-pad-y) var(--exhibit-pad-x);">
      ${exhibit}
    </div>
  </div>`;
}

function renderSlideWrapper(example, context) {
  const { tokens } = context;
  const exhibit = example.renderExhibit(context);
  return `<div class="flex h-full flex-col bg-[var(--surface)]" style="${getTokenStyle(tokens)}">
    <div style="padding:var(--shell-pad-top) var(--shell-pad-x) ${Math.max(tokens.shellGap - 2, 6)}px;border-top:var(--header-rule) solid var(--accent);">
      <p style="margin:0 0 6px 0;font-size:var(--section-label-size);font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);font-family:var(--font-body);">
        ${example.sectionLabel}
      </p>
      <h2 style="margin:0;font-size:var(--action-title-size);font-weight:600;line-height:1.12;letter-spacing:-0.02em;color:var(--text);font-family:var(--font-heading);">
        ${example.actionTitle}
      </h2>
    </div>
    <div class="flex-1 min-h-0" style="padding:0 var(--shell-pad-x) var(--shell-pad-bottom) var(--shell-pad-x);">
      <div class="h-full w-full overflow-hidden" style="padding:var(--exhibit-pad-y) 0;">
        ${exhibit}
      </div>
    </div>
    <div class="flex items-center justify-between" style="padding:var(--footer-pad-y) var(--footer-pad-x);border-top:1px solid color-mix(in srgb, var(--accent-light) 30%, transparent);font-size:var(--footer-size);color:var(--text-fine);font-family:var(--font-body);">
      <span>${example.source}</span>
      <span>${example.exhibitId}</span>
    </div>
  </div>`;
}

module.exports = {
  DEFAULT_CHART_RANGE,
  DEFAULT_LAYOUT_SAMPLES,
  REFERENCE_CANVAS,
  STANDARD_COLORS,
  TYPOGRAPHY_TIERS,
  cssText,
  defineExample,
  getChartChrome,
  getFigureTypography,
  getModeRange,
  getPreviewContexts,
  getSizeTokens,
  getTemplateTextStyles,
  normalizeResponsiveSpec,
  resolveSizeContext,
  renderSlideWrapper,
  renderStandaloneExhibit,
};
