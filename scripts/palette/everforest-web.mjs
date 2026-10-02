// Official Everforest palette, vendored verbatim from the everforest-web data
// module. This is the ONLY place raw upstream color values live — never edit
// values by hand here to "tune" a theme; change the derivation in
// scripts/templates/derived.mjs instead.
//
// Upstream: https://github.com/SirEthanator/everforest-web
//   file:   src/data/colors.ts
//   commit: 6f6e3c5b8b09f044cf77ee4b6d77d03689d39fc4
//   license: MIT
//
// The palette is a faithful transcription of the canonical Everforest scheme
// (https://github.com/sainnhe/everforest, MIT): every accent / grey / background
// value below matches sainnhe's autoload/everforest.vim.
//
// Layout per variant:
//   common  — variant-wide colors (foreground, accents, greys, statusline)
//   hard / medium / soft — the per-contrast background ramp
//
// To refresh from upstream: fetch colors.ts at a new commit, update the values
// below and UPSTREAM.commit, then run `npm run validate`.

export const UPSTREAM = {
  repo: "https://github.com/SirEthanator/everforest-web",
  file: "src/data/colors.ts",
  commit: "6f6e3c5b8b09f044cf77ee4b6d77d03689d39fc4",
  canonical: "https://github.com/sainnhe/everforest",
  license: "MIT",
  retrievedAt: "2026-10-03",
};

/** @typedef {{common: Record<string,string>, hard: Record<string,string>, medium: Record<string,string>, soft: Record<string,string>}} VariantPalette */

/** @type {VariantPalette} */
export const dark = {
  common: {
    foreground: "#D3C6AA",
    red: "#E67E80",
    yellow: "#DBBC7F",
    green: "#A7C080",
    blue: "#7FBBB3",
    purple: "#D699B6",
    aqua: "#83C092",
    orange: "#E69875",
    statusline1: "#A7C080",
    statusline2: "#D3C6AA",
    statusline3: "#E67E80",
    grey0: "#7A8478",
    grey1: "#859289",
    grey2: "#9DA9A0",
  },
  hard: {
    bgDim: "#1E2326",
    bg0: "#272E33",
    bg1: "#2E383C",
    bg2: "#374145",
    bg3: "#414B50",
    bg4: "#495156",
    bg5: "#4F5B58",
    bgRed: "#493B40",
    bgYellow: "#45443C",
    bgGreen: "#3C4841",
    bgBlue: "#384B55",
    bgPurple: "#463F48",
    bgVisual: "#4C3743",
  },
  medium: {
    bgDim: "#232A2E",
    bg0: "#2D353B",
    bg1: "#343F44",
    bg2: "#3D484D",
    bg3: "#475258",
    bg4: "#4F585E",
    bg5: "#56635F",
    bgRed: "#514045",
    bgYellow: "#4D4C43",
    bgGreen: "#425047",
    bgBlue: "#3A515D",
    bgPurple: "#4A444E",
    bgVisual: "#543A48",
  },
  soft: {
    bgDim: "#293136",
    bg0: "#333C43",
    bg1: "#3A464C",
    bg2: "#434F55",
    bg3: "#4D5960",
    bg4: "#555F66",
    bg5: "#5D6B66",
    bgRed: "#59464C",
    bgYellow: "#55544A",
    bgGreen: "#48584E",
    bgBlue: "#3F5865",
    bgPurple: "#4E4953",
    bgVisual: "#5C3F4F",
  },
};

/** @type {VariantPalette} */
export const light = {
  common: {
    foreground: "#5C6A72",
    red: "#F85552",
    yellow: "#DFA000",
    green: "#8DA101",
    blue: "#3A94C5",
    purple: "#DF69BA",
    aqua: "#35A77C",
    orange: "#F57D26",
    statusline1: "#93B259",
    statusline2: "#708089",
    statusline3: "#E66868",
    grey0: "#A6B0A0",
    grey1: "#939F91",
    grey2: "#829181",
  },
  hard: {
    bgDim: "#F2EFDF",
    bg0: "#FFFBEF",
    bg1: "#F8F5E4",
    bg2: "#F2EFDF",
    bg3: "#EDEADA",
    bg4: "#E8E5D5",
    bg5: "#BEC5B2",
    bgRed: "#FFE7DE",
    bgYellow: "#FEF2D5",
    bgGreen: "#F3F5D9",
    bgBlue: "#ECF5ED",
    bgPurple: "#FCECED",
    bgVisual: "#F0F2D4",
  },
  medium: {
    bgDim: "#EFEBD4",
    bg0: "#FDF6E3",
    bg1: "#F4F0D9",
    bg2: "#EFEBD4",
    bg3: "#E6E2CC",
    bg4: "#E0DCC7",
    bg5: "#BDC3AF",
    bgRed: "#FDE3DA",
    bgYellow: "#FAEDCD",
    bgGreen: "#F0F1D2",
    bgBlue: "#E9F0E9",
    bgPurple: "#FAE8E2",
    bgVisual: "#EAEDC8",
  },
  soft: {
    bgDim: "#E5DFC5",
    bg0: "#F3EAD3",
    bg1: "#EAE4CA",
    bg2: "#E5DFC5",
    bg3: "#DDD8BE",
    bg4: "#D8D3BA",
    bg5: "#B9C0AB",
    bgRed: "#FADBD0",
    bgYellow: "#F1E4C5",
    bgGreen: "#E5E6C5",
    bgBlue: "#E1E7DD",
    bgPurple: "#F1DDD4",
    bgVisual: "#E1E4BD",
  },
};

export const variants = { dark, light };
