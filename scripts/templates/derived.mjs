// Derived palette: extends the raw Gogh-Co base colors into the full set of
// colors a VSCode theme needs (workbench neutrals, comments, accents).
// Tune the ratios here — this is the single place to adjust UI appearance.
import { mix, alpha } from "../lib/color.mjs";

/**
 * @param {import("../palette/index.mjs").Palette} p  result of getPalette()
 * @returns derived color set shared by workbench & syntax templates
 */
export function getDerived(p) {
  const dark = p.variant === "dark";
  const bg = p.background;
  const fg = p.foreground;
  const black = p.ansi[0]; // color_01

  // Workbench neutrals (dark: bg0 darkest → bg4 lightest; light: inverted feel)
  const bg0 = dark ? mix(bg, black, 0.6) : mix(bg, fg, 0.12); // titleBar / deepest
  const bg1 = dark ? mix(bg, black, 0.25) : mix(bg, fg, 0.06); // sideBar
  const bg2 = dark ? mix(bg, fg, 0.05) : mix(bg, fg, 0.08); // hover / active
  const bg3 = dark ? mix(bg, fg, 0.12) : mix(bg, fg, 0.16); // borders
  const bg4 = dark ? mix(bg, fg, 0.24) : mix(bg, fg, 0.26); // strong border

  // Selection & highlights
  const selection = dark ? mix(bg, fg, 0.18) : mix(bg, fg, 0.16);
  const selectionInactive = dark ? mix(bg, fg, 0.1) : mix(bg, fg, 0.09);
  const wordHighlight = alpha(p.green, dark ? 0.25 : 0.22);
  const findMatch = alpha(p.brightGreen, 0.35);
  const findMatchHighlight = alpha(p.green, dark ? 0.18 : 0.15);
  const lineHighlight = dark ? mix(bg, fg, 0.03) : mix(bg, fg, 0.035);

  // Text roles
  const comment = dark ? p.grey : mix(fg, bg, 0.3); // light: lift the grey
  const lineNumber = dark ? p.grey : mix(fg, bg, 0.38);
  const lineNumberActive = dark ? fg : mix(fg, bg, 0.15);
  const orange = mix(p.red, p.yellow, 0.5); // operators / storage
  const dim = (c) => mix(c, bg, dark ? 0.3 : 0.3); // muted accents

  // Status / diagnostics
  const error = dark ? p.brightRed : p.red;
  const warning = dark ? p.yellow : p.yellow;
  const info = dark ? p.blue : p.blue;

  return {
    dark,
    bg,
    fg,
    bg0,
    bg1,
    bg2,
    bg3,
    bg4,
    selection,
    selectionInactive,
    wordHighlight,
    findMatch,
    findMatchHighlight,
    lineHighlight,
    comment,
    lineNumber,
    lineNumberActive,
    orange,
    error,
    warning,
    info,
    // accent roles (same keys as the raw palette, plus derived accents)
    red: p.red,
    green: p.green,
    yellow: p.yellow,
    blue: p.blue,
    magenta: p.magenta,
    cyan: p.cyan,
    white: p.white,
    grey: p.grey,
    brightRed: p.brightRed,
    brightGreen: p.brightGreen,
    brightYellow: p.brightYellow,
    brightBlue: p.brightBlue,
    brightMagenta: p.brightMagenta,
    brightCyan: p.brightCyan,
    brightWhite: p.brightWhite,
    dimRed: dim(p.red),
    dimGreen: dim(p.green),
    dimYellow: dim(p.yellow),
    dimBlue: dim(p.blue),
    dimMagenta: dim(p.magenta),
    dimCyan: dim(p.cyan),
  };
}
