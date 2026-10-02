// The six Everforest themes: Dark/Light x Hard/Medium/Soft.
//
// The raw color values are vendored from everforest-web
// (scripts/palette/everforest-web.mjs); the terminal ANSI colors are derived in
// scripts/palette/ansi.mjs. This module assembles the two into one flat,
// semantic Palette object per theme that the templates consume.
//
// Base colors are immutable: never hand-tune them here or in
// everforest-web.mjs. All VSCode-specific tuning happens in
// scripts/templates/derived.mjs.

import { dark, light, variants, UPSTREAM } from "./everforest-web.mjs";
import { buildAnsi } from "./ansi.mjs";

const definitions = [
  { id: "dark-hard", label: "Everforest Dark (Hard)", variant: "dark", uiTheme: "vs-dark", contrast: "hard" },
  { id: "dark-medium", label: "Everforest Dark (Medium)", variant: "dark", uiTheme: "vs-dark", contrast: "medium" },
  { id: "dark-soft", label: "Everforest Dark (Soft)", variant: "dark", uiTheme: "vs-dark", contrast: "soft" },
  { id: "light-hard", label: "Everforest Light (Hard)", variant: "light", uiTheme: "vs", contrast: "hard" },
  { id: "light-medium", label: "Everforest Light (Medium)", variant: "light", uiTheme: "vs", contrast: "medium" },
  { id: "light-soft", label: "Everforest Light (Soft)", variant: "light", uiTheme: "vs", contrast: "soft" },
];

export { UPSTREAM };

export const palettes = definitions.map((def) => ({ ...def }));

export const paletteIds = palettes.map((p) => p.id);

/**
 * Build the flat semantic palette for one theme.
 * @param {string} id  one of paletteIds
 */
export function getPalette(id) {
  const def = palettes.find((p) => p.id === id);
  if (!def) throw new Error(`Unknown palette: ${id}`);

  const { variant, contrast } = def;
  const self = variants[variant];
  const other = variants[variant === "dark" ? "light" : "dark"];

  const common = self.common;
  const bg = self[contrast];
  const otherCommon = other.common;
  const otherBg = other[contrast];

  const ansi = buildAnsi(variant, common, bg, otherCommon, otherBg);

  return {
    id: def.id,
    label: def.label,
    variant,
    uiTheme: def.uiTheme,
    contrast,

    // Terminal
    ansi,
    cursor: common.orange,
    background: bg.bg0,
    foreground: common.foreground,

    // Background ramp (upstream names)
    bgDim: bg.bgDim,
    bg0: bg.bg0,
    bg1: bg.bg1,
    bg2: bg.bg2,
    bg3: bg.bg3,
    bg4: bg.bg4,
    bg5: bg.bg5,
    bgVisual: bg.bgVisual,
    bgRed: bg.bgRed,
    bgYellow: bg.bgYellow,
    bgGreen: bg.bgGreen,
    bgBlue: bg.bgBlue,
    bgPurple: bg.bgPurple,

    // Accents (upstream names + legacy aliases used by older templates)
    red: common.red,
    orange: common.orange,
    yellow: common.yellow,
    green: common.green,
    aqua: common.aqua,
    blue: common.blue,
    purple: common.purple,
    magenta: common.purple,
    cyan: common.aqua,

    // Neutrals
    grey0: common.grey0,
    grey1: common.grey1,
    grey2: common.grey2,
    white: common.foreground,
    grey: common.grey1,

    // Statusline accents
    statusline1: common.statusline1,
    statusline2: common.statusline2,
    statusline3: common.statusline3,
  };
}
