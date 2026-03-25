/**
 * Brand System — Preview Builder
 *
 * Takes a brand identity config and renders a 2-3 slide preview PDF
 * showing color palette, font specimens, and a combination demo.
 */

const path = require('path');
const fs = require('fs');
const { renderPDF } = require('./render');
const { getStyleTokens, styleToCSS } = require('./styles');

function buildHTML(brand, options = {}) {
  const { width = 1280, height = 720 } = options;
  const p = brand.palette;
  const f = brand.fonts;
  const firm = brand.firm || { name: p.name || 'Brand Preview', tagline: '', logoSVG: null };
  const style = brand.style || 'modern';
  const rawTokens = getStyleTokens(style);
  // Map CSS custom property tokens to inline-friendly values
  const st = {
    radius: rawTokens['--radius'],
    kpiRadius: rawTokens['--radius-kpi'],
    cardBorder: rawTokens['--card-border'],
    cardBg: rawTokens['--card-bg'] === 'var(--surface-muted)' ? p.surfaceMuted : rawTokens['--card-bg'],
    cardShadow: rawTokens['--card-shadow'],
    headerBorder: rawTokens['--header-rule'] + ' solid',
  };

  // Google Fonts CDN link
  const fontFamilies = [f.heading, f.body, f.mono].filter(Boolean);
  const fontLinks = fontFamilies.map(font => {
    const weights = font.weights.join(';');
    const family = font.family.replace(/ /g, '+');
    return `<link href="https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap" rel="stylesheet">`;
  }).join('\n  ');

  const pageCSS = `
    @page { size: ${width}px ${height}px; margin: 0; }
    *, *::before, *::after { box-sizing: border-box; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    html, body { margin: 0; padding: 0; width: ${width}px; }
    body { font-family: ${f.body.stack}; color: ${p.text}; background: ${p.surface}; }
    .slide { width: ${width}px; height: ${height}px; overflow: hidden; position: relative;
             page-break-after: always; break-after: page; }
    .slide:last-child { page-break-after: auto; break-after: auto; }
  `;

  // ── Slide 1: Color Palette ────────────────────────────────────────
  const paletteRoles = [
    { name: 'Primary / Dark', hex: p.surfaceDark, light: true },
    { name: 'Accent', hex: p.accent, light: true },
    { name: 'Accent Light', hex: p.accentLight, light: false },
    { name: 'Surface Muted', hex: p.surfaceMuted, light: false },
    { name: 'Positive', hex: p.positive, light: true },
    { name: 'Warning', hex: p.warning, light: false },
    { name: 'Negative', hex: p.negative, light: true },
    { name: 'Surface', hex: p.surface, light: false },
  ];

  const swatches = paletteRoles.map(role => `
    <div style="flex: 1; display: flex; flex-direction: column; border-radius: 8px; overflow: hidden;">
      <div style="flex: 1; background: ${role.hex}; display: flex; align-items: flex-end; padding: 12px;">
        <span style="font-size: 11px; font-weight: 600; color: ${role.light ? '#fff' : p.text};">${role.name}</span>
      </div>
      <div style="padding: 8px 12px; background: #fff; border: 1px solid #e5e5e5; border-top: 0; border-radius: 0 0 8px 8px;">
        <span style="font-size: 12px; font-family: monospace; color: ${p.textMuted};">${role.hex}</span>
      </div>
    </div>
  `).join('');

  const slide1 = `
    <section class="slide" style="background: ${p.surface}; display: flex; flex-direction: column; padding: 48px 56px;">
      <div style="margin-bottom: 24px;">
        <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: ${p.accent}; margin: 0 0 8px;">
          Brand System
        </p>
        <h2 style="font-size: 32px; font-weight: 700; letter-spacing: -0.03em; color: ${p.text}; margin: 0; font-family: ${f.heading.stack};">
          Color Palette — ${firm.name}
        </h2>
        <div style="height: 3px; width: 60px; background: ${p.accent}; border-radius: 2px; margin-top: 12px;"></div>
      </div>
      <div style="flex: 1; display: flex; gap: 12px;">
        ${swatches}
      </div>
      <div style="margin-top: 16px; display: flex; gap: 12px;">
        <div style="flex: 1; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 6px; background: ${p.surfaceMuted};">
          <span style="font-size: 11px; font-weight: 600; color: ${p.textMuted};">Text: ${p.text}</span>
        </div>
        <div style="flex: 1; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 6px; background: ${p.surfaceMuted};">
          <span style="font-size: 11px; font-weight: 600; color: ${p.textMuted};">Text Muted: ${p.textMuted}</span>
        </div>
        <div style="flex: 1; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 6px; background: ${p.surfaceMuted};">
          <span style="font-size: 11px; font-weight: 600; color: ${p.textMuted};">Text Fine: ${p.textFine}</span>
        </div>
        <div style="flex: 1; display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 6px; background: ${p.surfaceMuted};">
          <span style="font-size: 11px; font-weight: 600; color: ${p.textMuted};">Chart Primary: ${p.chartPrimary}</span>
        </div>
      </div>
    </section>`;

  // ── Slide 2: Typography Specimens ─────────────────────────────────
  const slide2 = `
    <section class="slide" style="background: ${p.surface}; display: flex; flex-direction: column; padding: 48px 56px;">
      <div style="margin-bottom: 24px;">
        <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: ${p.accent}; margin: 0 0 8px;">
          Brand System
        </p>
        <h2 style="font-size: 32px; font-weight: 700; letter-spacing: -0.03em; color: ${p.text}; margin: 0; font-family: ${f.heading.stack};">
          Typography — ${f.heading.family}${f.body.family !== f.heading.family ? ' + ' + f.body.family : ''}
        </h2>
        <div style="height: 3px; width: 60px; background: ${p.accent}; border-radius: 2px; margin-top: 12px;"></div>
      </div>
      <div style="flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <!-- Left: Heading specimens -->
        <div>
          <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${p.accent}; margin: 0 0 16px;">
            ${f.heading.family} — Headings
          </p>
          <p style="font-size: 40px; font-weight: 700; letter-spacing: -0.03em; color: ${p.text}; margin: 0 0 12px; font-family: ${f.heading.stack}; line-height: 1.05;">
            Bold 700 — Aa Bb Cc
          </p>
          <p style="font-size: 26px; font-weight: 600; letter-spacing: -0.02em; color: ${p.text}; margin: 0 0 12px; font-family: ${f.heading.stack}; line-height: 1.1;">
            Semibold 600 — Aa Bb Cc Dd Ee
          </p>
          <p style="font-size: 18px; font-weight: 400; color: ${p.text}; margin: 0 0 12px; font-family: ${f.body.stack}; line-height: 1.5;">
            Regular 400 — The quick brown fox jumps over the lazy dog. Clarity at every scale.
          </p>
          <p style="font-size: 15px; font-weight: 400; color: ${p.textMuted}; margin: 0; font-family: ${f.body.stack}; line-height: 1.6;">
            Body text at 15px — Analysis reveals a 340bps margin improvement opportunity across five cost levers, capturing $180M in annualized savings within 18 months.
          </p>
        </div>
        <!-- Right: Combination demo -->
        <div>
          <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${p.accent}; margin: 0 0 6px;">
            Combination Demo
          </p>
          <p style="font-size: 10px; color: ${p.textFine}; margin: 0 0 12px; font-family: ${f.body.stack};">
            Style: ${style.charAt(0).toUpperCase() + style.slice(1)} · Radius: ${st.radius} · ${st.cardBorder !== 'none' ? 'Bordered' : 'Borderless'}
          </p>
          <div style="background: #fff; ${st.cardBorder !== 'none' ? `border: ${st.cardBorder} ${p.accentLight}40;` : ''} border-radius: ${st.radius}; overflow: hidden; ${st.cardShadow !== 'none' ? `box-shadow: ${st.cardShadow};` : ''}">
            <div style="padding: 20px 20px 10px; border-top: ${st.headerBorder} ${p.accent};">
              <p style="font-size: 9px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${p.accent}; margin: 0 0 4px;">Market Position</p>
              <p style="font-size: 17px; font-weight: 700; letter-spacing: -0.02em; color: ${p.text}; margin: 0; font-family: ${f.heading.stack}; line-height: 1.15;">
                Cloud revenue grew 48% to $17.7B, outpacing AWS and Azure
              </p>
            </div>
            <div style="padding: 12px 20px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
              <div style="background: ${st.cardBg || p.surfaceMuted}; border-radius: ${st.kpiRadius}; padding: 12px; ${st.cardBorder !== 'none' && !st.cardBg ? `border: 1px solid ${p.accentLight}30;` : ''}">
                <p style="font-size: 20px; font-weight: 700; color: ${p.accent}; margin: 0; font-family: ${f.heading.stack};">$70B+</p>
                <p style="font-size: 10px; font-weight: 600; color: ${p.text}; margin: 4px 0 0;">Cloud ARR</p>
                <p style="font-size: 9px; color: ${p.positive}; margin: 2px 0 0;">+48% YoY</p>
              </div>
              <div style="background: ${st.cardBg || p.surfaceMuted}; border-radius: ${st.kpiRadius}; padding: 12px; ${st.cardBorder !== 'none' && !st.cardBg ? `border: 1px solid ${p.accentLight}30;` : ''}">
                <p style="font-size: 20px; font-weight: 700; color: ${p.accent}; margin: 0; font-family: ${f.heading.stack};">$240B</p>
                <p style="font-size: 10px; font-weight: 600; color: ${p.text}; margin: 4px 0 0;">Backlog</p>
                <p style="font-size: 9px; color: ${p.positive}; margin: 2px 0 0;">+55% QoQ</p>
              </div>
              <div style="background: ${st.cardBg || p.surfaceMuted}; border-radius: ${st.kpiRadius}; padding: 12px; ${st.cardBorder !== 'none' && !st.cardBg ? `border: 1px solid ${p.accentLight}30;` : ''}">
                <p style="font-size: 20px; font-weight: 700; color: ${p.accent}; margin: 0; font-family: ${f.heading.stack};">200%+</p>
                <p style="font-size: 10px; font-weight: 600; color: ${p.text}; margin: 4px 0 0;">GenAI Growth</p>
                <p style="font-size: 9px; color: ${p.textMuted}; margin: 2px 0 0;">YoY revenue</p>
              </div>
            </div>
            <div style="padding: 8px 20px; border-top: 1px solid ${p.accentLight}20; display: flex; justify-content: space-between;">
              <span style="font-size: 9px; color: ${p.textFine};">Source: Analysis, 2026</span>
              <span style="font-size: 9px; color: ${p.textFine};">Confidential</span>
            </div>
          </div>
          ${f.mono ? `
          <div style="margin-top: 16px;">
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${p.accent}; margin: 0 0 8px;">
              ${f.mono.family} — Data / Monospace
            </p>
            <div style="background: ${st.cardBg || p.surfaceMuted}; border-radius: ${st.kpiRadius}; padding: 14px 16px; font-family: ${f.mono.stack};">
              <p style="font-size: 24px; font-weight: 500; color: ${p.text}; margin: 0;">$4.2B</p>
              <p style="font-size: 14px; font-weight: 500; color: ${p.textMuted}; margin: 4px 0 0;">+12.4% YoY | 2,847 bps</p>
            </div>
          </div>
          ` : ''}
        </div>
      </div>
    </section>`;

  // ── Slide 3: Cover Demo ───────────────────────────────────────────
  const slide3 = `
    <section class="slide" style="background: ${p.surfaceDark}; display: flex; flex-direction: column; justify-content: space-between; padding: 48px 56px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        ${firm.logoSVG || ''}
        <span style="font-size: 13px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: ${p.accent}; font-family: ${f.heading.stack};">
          ${firm.name}
        </span>
      </div>
      <div>
        <h1 style="font-size: 48px; font-weight: 700; letter-spacing: -0.03em; color: ${p.textOnDark}; margin: 0 0 16px; font-family: ${f.heading.stack}; line-height: 1.05;">
          Cover Slide Preview
        </h1>
        <p style="font-size: 19px; color: ${p.accentLight}; margin: 0; font-family: ${f.body.stack}; line-height: 1.5; max-width: 640px;">
          ${firm.tagline}
        </p>
        <div style="height: 3px; width: 60px; background: ${p.accent}; border-radius: 2px; margin-top: 20px;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13px; color: ${p.textFine}; font-family: ${f.body.stack};">Prepared for Client Leadership</span>
        <span style="font-size: 13px; color: ${p.textFine}; font-family: ${f.body.stack};">2026 · Confidential</span>
      </div>
    </section>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${firm.name} — Brand Preview</title>
  ${fontLinks}
  <style>${pageCSS}</style>
</head>
<body>
${slide1}
${slide2}
${slide3}
</body>
</html>`;
}

async function createPreview(brand, options = {}) {
  const { output = 'brand-preview.pdf', width = 1280, height = 720 } = options;
  const html = buildHTML(brand, { width, height });
  await renderPDF(html, output, { width, height });
  console.log(`Wrote: ${output} (3 slides, ${width}x${height})`);
  return output;
}

module.exports = { createPreview, buildHTML };
