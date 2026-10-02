// Derived palette: the semantic color set consumed by the workbench, syntax and
// semantic templates.
//
// Almost every role is a direct everforest-web value — the upstream palette
// already ships a full background ramp (bgDim/bg0..bg5/bgVisual), per-semantic
// background tints (bgRed/bgGreen/...), three greys and eight accents. Mixing
// and alpha are used only where VS Code needs translucency or a UI state the
// palette does not define.
import { alpha, mix } from "../lib/color.mjs";

/**
 * @param {ReturnType<import("../palette/index.mjs").getPalette>} p
 * @returns derived color set shared by the workbench & syntax templates
 */
export function getDerived(p) {
  const light = p.variant === "light";

  // Upstream greys are designed against the lightest surface. On the darker
  // "soft" light background they fall below a comfortable reading contrast, so
  // for light themes only we nudge the three text greys toward the foreground.
  // Dark themes use the upstream greys exactly.
  const comment = light ? mix(p.grey1, p.foreground, 0.3) : p.grey1;
  const lineNumber = light ? mix(p.grey0, p.foreground, 0.3) : p.grey0;
  const lineNumberActive = light ? mix(p.grey2, p.foreground, 0.2) : p.grey2;

  return {
    dark: !light,
    contrast: p.contrast,

    // Core surfaces
    bg: p.bg0,
    fg: p.foreground,
    bgDim: p.bgDim,
    bg0: p.bg0,
    bg1: p.bg1,
    bg2: p.bg2,
    bg3: p.bg3,
    bg4: p.bg4,
    bg5: p.bg5,
    bgVisual: p.bgVisual,
    bgRed: p.bgRed,
    bgYellow: p.bgYellow,
    bgGreen: p.bgGreen,
    bgBlue: p.bgBlue,
    bgPurple: p.bgPurple,

    // Selection & highlights (translucency only)
    selection: p.bgVisual,
    selectionInactive: alpha(p.bgVisual, 0.6),
    wordHighlight: alpha(p.green, 0.18),
    findMatch: alpha(p.orange, 0.4),
    findMatchHighlight: alpha(p.yellow, 0.25),
    lineHighlight: alpha(p.bg1, 0.55),

    // Text roles (upstream neutrals; light greys nudged for readability)
    comment,
    lineNumber,
    lineNumberActive,

    // Diagnostics & UI accents
    error: p.red,
    warning: p.yellow,
    info: p.blue,
    orange: p.orange,
    cursor: p.cursor,

    // Accent roles (upstream names + legacy aliases)
    red: p.red,
    green: p.green,
    yellow: p.yellow,
    blue: p.blue,
    purple: p.purple,
    aqua: p.aqua,
    magenta: p.purple,
    cyan: p.aqua,

    // Neutrals & statusline
    white: p.white,
    grey0: p.grey0,
    grey1: p.grey1,
    grey2: p.grey2,
    statusline1: p.statusline1,
    statusline2: p.statusline2,
    statusline3: p.statusline3,

    // Terminal (exposed for templates that need ANSI directly)
    ansi: p.ansi,
  };
}
