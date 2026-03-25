/**
 * Theme — reads a palette name and returns a flat theme object.
 *
 * Usage:
 *   const theme = loadTheme('consulting-mckinsey');
 *   theme.accent  // '123A63'
 *   theme.font    // 'Arial'
 */

const fs = require('fs');
const path = require('path');

const PALETTES_DIR = path.join(__dirname, '..', 'palettes');

// Built-in themes (parsed from palette markdown files)
const THEMES = {
  'consulting-mckinsey': {
    name: 'McKinsey',
    accent:    '123A63',
    canvas:    'F3F6FA',
    mist:      'E4EDF7',
    structure: 'C7D5E5',
    midnight:  '0A0E14',
    text:      '101A27',
    textSec:   '4E6176',
    textFine:  '71859A',
    border:    'C7D5E5',
    positive:  '3A8F5C',
    caution:   'D4A843',
    negative:  'B66A5C',
    font:      'Arial',
    fontDisplay: 'Arial',
    headerBar: true,
    author:    'appcubic',
  },
  'consulting-bcg': {
    name: 'BCG',
    accent:    '0F6B4F',
    rule:      '6AB648',
    canvas:    'FFFFFF',
    mist:      'F5F6F4',
    structure: 'D0D0D0',
    midnight:  '1A1A1A',
    text:      '111111',
    textSec:   '5F6368',
    textFine:  '71859A',
    border:    'D0D0D0',
    positive:  '3E9E5A',
    caution:   'E7B33D',
    negative:  'C85A54',
    font:      'Arial',
    fontDisplay: 'Arial',
    headerBar: true,
    author:    'appcubic',
  },
  'consulting-bain': {
    name: 'Bain',
    accent:    'CC0000',
    canvas:    'F5F4F2',
    mist:      'E8E5E2',
    structure: 'D0D0D0',
    midnight:  '2B2B2B',
    text:      '1A1A1A',
    textSec:   '666666',
    textFine:  '888888',
    border:    'D0D0D0',
    positive:  '2E7D32',
    caution:   'E8A317',
    negative:  'CC0000',
    font:      'Source Sans 3',
    fontDisplay: 'Source Sans 3',
    fontFallback: 'Arial',
    headerBar: false,
    author:    'appcubic',
  },
  'founder': {
    name: 'Founder',
    accent:    '0B2D72',
    accentLight: '0992C2',
    canvas:    'F5F8FB',
    mist:      'EDF2F7',
    structure: 'D4DEE8',
    midnight:  '0B2D72',
    text:      '333333',
    textSec:   '666666',
    textFine:  '999999',
    border:    'D4DEE8',
    positive:  '2E9E5A',
    caution:   'E8A317',
    negative:  'D04545',
    font:      'Arial',
    fontDisplay: 'Arial',
    headerBar: true,
    author:    'appcubic',
  },
  'sequoia': {
    name: 'Sequoia',
    accent:    'E8554D',
    canvas:    '0D0B0A',
    mist:      '1A1614',
    structure: '2A2420',
    midnight:  '0D0B0A',
    text:      'F5F0E5',
    textSec:   'B0B0B0',
    textFine:  '999999',
    border:    '2A2420',
    positive:  'E8554D',
    caution:   'D4554D',
    negative:  'E8554D',
    font:      'Arial',
    fontDisplay: 'Georgia',
    headerBar: false,
    darkMode:  true,
    author:    'appcubic',
  },
};

/**
 * Load a theme by palette name.
 * @param {string} paletteName - e.g., 'consulting-mckinsey', 'founder', 'sequoia'
 * @returns {object} theme object with color tokens, font names, and flags
 */
function loadTheme(paletteName) {
  const theme = THEMES[paletteName];
  if (!theme) {
    const available = Object.keys(THEMES).join(', ');
    throw new Error(`Unknown palette "${paletteName}". Available: ${available}`);
  }
  return { ...theme };
}

module.exports = { loadTheme, THEMES };
