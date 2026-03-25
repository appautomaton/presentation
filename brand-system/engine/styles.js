/**
 * Style tokens — shape language definitions for each visual direction.
 *
 * These are CSS custom properties that downstream skills consume.
 * The brand-system preview engine uses them directly.
 * The deck build script gets them via identity.toCSS() which includes them.
 */

const STYLE_TOKENS = {
  institutional: {
    '--radius':        '2px',
    '--radius-card':   '2px',
    '--radius-kpi':    '2px',
    '--card-border':   '1px solid',
    '--card-bg':       'transparent',
    '--card-shadow':   'none',
    '--header-rule':   '4px',
    '--divider-style': 'sharp',     // sharp | soft | editorial
  },
  modern: {
    '--radius':        '8px',
    '--radius-card':   '8px',
    '--radius-kpi':    '8px',
    '--card-border':   '1px solid',
    '--card-bg':       'var(--surface-muted)',
    '--card-shadow':   'none',
    '--header-rule':   '4px',
    '--divider-style': 'soft',
  },
  dark: {
    '--radius':        '6px',
    '--radius-card':   '6px',
    '--radius-kpi':    '6px',
    '--card-border':   'none',
    '--card-bg':       'rgba(255,255,255,0.06)',
    '--card-shadow':   'none',
    '--header-rule':   '4px',
    '--divider-style': 'soft',
  },
  bento: {
    '--radius':        '12px',
    '--radius-card':   '12px',
    '--radius-kpi':    '12px',
    '--card-border':   '1px solid',
    '--card-bg':       'var(--surface-muted)',
    '--card-shadow':   '0 1px 3px rgba(0,0,0,0.06)',
    '--header-rule':   '4px',
    '--divider-style': 'soft',
  },
  editorial: {
    '--radius':        '0px',
    '--radius-card':   '0px',
    '--radius-kpi':    '0px',
    '--card-border':   'none',
    '--card-bg':       'transparent',
    '--card-shadow':   'none',
    '--header-rule':   '3px',
    '--divider-style': 'editorial',
  },
  'data-forward': {
    '--radius':        '2px',
    '--radius-card':   '2px',
    '--radius-kpi':    '2px',
    '--card-border':   '1px solid',
    '--card-bg':       'transparent',
    '--card-shadow':   'none',
    '--header-rule':   '3px',
    '--divider-style': 'sharp',
  },
};

function getStyleTokens(style) {
  return STYLE_TOKENS[style] || STYLE_TOKENS.modern;
}

/**
 * Generate CSS custom properties for a style direction.
 * Injected into the palette CSS so downstream skills can use var(--radius), etc.
 */
function styleToCSS(style) {
  const tokens = getStyleTokens(style);
  return Object.entries(tokens)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join('\n');
}

module.exports = { STYLE_TOKENS, getStyleTokens, styleToCSS };
