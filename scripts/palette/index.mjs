// The six Everforest color schemes from the Gogh-Co terminal color repo.
// Source: https://github.com/Gogh-Co/Gogh/tree/master/themes
//   - Everforest Dark {Hard, Medium, Soft}.yml
//   - Everforest Light {Hard, Medium, Soft}.yml
// Each scheme provides the 16 ANSI terminal colors plus background /
// foreground / cursor. The VSCode workbench and syntax colors are derived
// from these in scripts/templates/ (see the derivation rules there).
// License: MIT (Gogh-Co).

const darkAnsi = [
  "#2E383C", // 01 black   (Host)
  "#E67E80", // 02 red     (Syntax string)
  "#A7C080", // 03 green   (Command)
  "#DBBC7F", // 04 yellow  (Command second)
  "#7FBBB3", // 05 blue    (Path)
  "#D699B6", // 06 magenta (Syntax var)
  "#83C092", // 07 cyan    (Prompt)
  "#D3C6AA", // 08 white
  "#5C6A72", // 09 bright black
  "#F85552", // 10 bright red   (Command error)
  "#8DA101", // 11 bright green (Exec)
  "#DFA000", // 12 bright yellow
  "#3A94C5", // 13 bright blue  (Folder)
  "#DF69BA", // 14 bright magenta
  "#35A77C", // 15 bright cyan
  "#DFDDC8", // 16 bright white
];

const lightAnsi = [
  "#5C6A72", // 01 black   (Host)
  "#F85552", // 02 red     (Syntax string)
  "#8DA101", // 03 green   (Command)
  "#DFA000", // 04 yellow  (Command second)
  "#3A94C5", // 05 blue    (Path)
  "#DF69BA", // 06 magenta (Syntax var)
  "#35A77C", // 07 cyan    (Prompt)
  "#DFDDC8", // 08 white
  "#2E383C", // 09 bright black
  "#E67E80", // 10 bright red   (Command error)
  "#A7C080", // 11 bright green (Exec)
  "#DBBC7F", // 12 bright yellow
  "#7FBBB3", // 13 bright blue  (Folder)
  "#D699B6", // 14 bright magenta
  "#83C092", // 15 bright cyan
  "#D3C6AA", // 16 bright white
];

export const palettes = [
  {
    id: "dark-hard",
    label: "Everforest Dark (Hard)",
    variant: "dark",
    uiTheme: "vs-dark",
    ansi: [...darkAnsi],
    background: "#272E33",
    foreground: "#D3C6AA",
    cursor: "#D3C6AA",
  },
  {
    id: "dark-medium",
    label: "Everforest Dark (Medium)",
    variant: "dark",
    uiTheme: "vs-dark",
    ansi: [...darkAnsi],
    background: "#2D353B",
    foreground: "#D3C6AA",
    cursor: "#D3C6AA",
  },
  {
    id: "dark-soft",
    label: "Everforest Dark (Soft)",
    variant: "dark",
    uiTheme: "vs-dark",
    ansi: [...darkAnsi],
    background: "#333C43",
    foreground: "#D3C6AA",
    cursor: "#D3C6AA",
  },
  {
    id: "light-hard",
    label: "Everforest Light (Hard)",
    variant: "light",
    uiTheme: "vs",
    ansi: [...lightAnsi],
    background: "#FFFBEF",
    foreground: "#5C6A72",
    cursor: "#5C6A72",
  },
  {
    id: "light-medium",
    label: "Everforest Light (Medium)",
    variant: "light",
    uiTheme: "vs",
    ansi: [...lightAnsi],
    background: "#FDF6E3",
    foreground: "#5C6A72",
    cursor: "#5C6A72",
  },
  {
    id: "light-soft",
    label: "Everforest Light (Soft)",
    variant: "light",
    uiTheme: "vs",
    ansi: [...lightAnsi],
    background: "#F3EAD3",
    foreground: "#5C6A72",
    cursor: "#5C6A72",
  },
];

/** Apply per-variant overrides: the only differences between Hard/Medium/Soft. */
function applyVariantOverrides(p, contrast) {
  const overrides = {
    "dark-hard": { bg: "#272E33", ansiBlack: "#2E383C" },
    "dark-medium": { bg: "#2D353B", ansiBlack: "#343F44" },
    "dark-soft": { bg: "#333C43", ansiBlack: "#3A464C" },
    "light-hard": { bg: "#FFFBEF", ansiBrightBlack: "#2E383C" },
    "light-medium": { bg: "#FDF6E3", ansiBrightBlack: "#343F44" },
    "light-soft": { bg: "#F3EAD3", ansiBrightBlack: "#3A464C" },
  };
  void contrast;
  return overrides[p.id] || {};
}

// Export a semantic view of each palette for the templates:
// terminal ANSI colors (exact), base colors, and derived workbench neutrals.
export function getPalette(id) {
  const p = palettes.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown palette: ${id}`);
  const o = applyVariantOverrides(p);

  const ansi = [...p.ansi];
  if (p.variant === "dark") {
    ansi[0] = o.ansiBlack || ansi[0];
  } else {
    ansi[8] = o.ansiBrightBlack || ansi[8];
  }
  const background = o.bg || p.background;

  const black = ansi[0]; // color_01
  const red = ansi[1];
  const green = ansi[2];
  const yellow = ansi[3];
  const blue = ansi[4];
  const magenta = ansi[5];
  const cyan = ansi[6];
  const white = ansi[7];
  const brightBlack = ansi[8]; // grey / comment base
  const brightRed = ansi[9];
  const brightGreen = ansi[10];
  const brightYellow = ansi[11];
  const brightBlue = ansi[12];
  const brightMagenta = ansi[13];
  const brightCyan = ansi[14];
  const brightWhite = ansi[15];

  return {
    id: p.id,
    label: p.label,
    variant: p.variant,
    uiTheme: p.uiTheme,
    background,
    foreground: p.foreground,
    cursor: p.cursor,
    ansi, // 16 colors, exact from Gogh
    // semantic color roles (dark → normal group, light → bright group)
    red,
    green,
    yellow,
    blue,
    magenta,
    cyan,
    white,
    grey: brightBlack, // comment / secondary text
    brightRed,
    brightGreen,
    brightYellow,
    brightBlue,
    brightMagenta,
    brightCyan,
    brightWhite,
  };
}

export const paletteIds = palettes.map((p) => p.id);
