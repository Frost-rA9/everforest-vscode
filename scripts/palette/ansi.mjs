// Terminal ANSI derivation (16 slots) from the everforest-web palette.
//
// everforest-web defines no ANSI colors, so — like every Everforest terminal
// port — the 16 slots are derived from the palette. We keep the rich,
// TUI-friendly convention where the normal and bright groups differ, which is
// what the previous Gogh-based extension offered for `VS Code + integrated
// terminal + agent TUI` workflows:
//
//   dark  — normal group = the soft dark accents, bright group = the saturated
//           light accents, black = Background 1, brightBlack = Grey 1
//   light — normal group = the light accents, bright group = the dark accents,
//           black = Foreground, brightBlack = the dark Background 1
//
// Every value below maps to a named everforest-web color. The only two
// project conventions (upstream has no brighter-than-Foreground neutral) are:
//   - dark  ansiBrightWhite = Foreground
//   - light ansiWhite       = Background 5
// Both are pinned by scripts/validate.mjs.
//
// Slot order follows VS Code's terminal.ansi* keys:
//   Black Red Green Yellow Blue Magenta Cyan White
//   BrightBlack BrightRed BrightGreen BrightYellow BrightBlue BrightMagenta
//   BrightCyan BrightWhite

/** Map upstream role names onto the ANSI slot order. */
const SLOTS = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite",
];

/**
 * @param {"dark"|"light"} variant
 * @param {Record<string,string>} common       this variant's common colors
 * @param {Record<string,string>} bg           this variant's background ramp
 * @param {Record<string,string>} otherCommon  the opposite variant's common colors
 * @param {Record<string,string>} otherBg      the opposite variant's background ramp
 * @returns {string[]} 16 hex colors in SLOTS order
 */
export function buildAnsi(variant, common, bg, otherCommon, otherBg) {
  const dark = variant === "dark";
  const normal = dark
    ? [bg.bg1, common.red, common.green, common.yellow, common.blue, common.purple, common.aqua, common.foreground]
    : [
        common.foreground,
        common.red,
        common.green,
        common.yellow,
        common.blue,
        common.purple,
        common.aqua,
        bg.bg5,
      ];

  const bright = dark
    ? [
        common.grey1,
        otherCommon.red,
        otherCommon.green,
        otherCommon.yellow,
        otherCommon.blue,
        otherCommon.purple,
        otherCommon.aqua,
        common.foreground,
      ]
    : [
        otherBg.bg1,
        otherCommon.red,
        otherCommon.green,
        otherCommon.yellow,
        otherCommon.blue,
        otherCommon.purple,
        otherCommon.aqua,
        otherCommon.foreground,
      ];

  const bySlot = {
    black: normal[0],
    red: normal[1],
    green: normal[2],
    yellow: normal[3],
    blue: normal[4],
    magenta: normal[5],
    cyan: normal[6],
    white: normal[7],
    brightBlack: bright[0],
    brightRed: bright[1],
    brightGreen: bright[2],
    brightYellow: bright[3],
    brightBlue: bright[4],
    brightMagenta: bright[5],
    brightCyan: bright[6],
    brightWhite: bright[7],
  };

  return SLOTS.map((slot) => bySlot[slot]);
}

export { SLOTS as ansiSlots };
