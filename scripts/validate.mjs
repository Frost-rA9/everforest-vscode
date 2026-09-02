// Validation script: sanity-check the generated theme JSON files.
//   node scripts/validate.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { paletteIds, getPalette } from "./palette/index.mjs";
import { contrast, hexToRgba } from "./lib/color.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const ansiKeys = [
  "terminal.ansiBlack",
  "terminal.ansiRed",
  "terminal.ansiGreen",
  "terminal.ansiYellow",
  "terminal.ansiBlue",
  "terminal.ansiMagenta",
  "terminal.ansiCyan",
  "terminal.ansiWhite",
  "terminal.ansiBrightBlack",
  "terminal.ansiBrightRed",
  "terminal.ansiBrightGreen",
  "terminal.ansiBrightYellow",
  "terminal.ansiBrightBlue",
  "terminal.ansiBrightMagenta",
  "terminal.ansiBrightCyan",
  "terminal.ansiBrightWhite",
];

const requiredColors = [
  "editor.background",
  "editor.foreground",
  "sideBar.background",
  "titleBar.activeBackground",
  "statusBar.background",
  "terminal.background",
  "terminal.foreground",
  "editorLineNumber.foreground",
  "editor.selectionBackground",
  "editorBracketMatch.background",
  "editorBracketMatch.border",
  "sideBar.border",
  "terminal.selectionBackground",
];

const HEX_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};

for (const id of paletteIds) {
  const p = getPalette(id);
  const file = join(root, "themes", `everforest-${id}.json`);
  console.log(`Checking ${file}`);

  let theme;
  try {
    theme = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    fail(`cannot parse JSON: ${e.message}`);
    continue;
  }

  if (theme.type !== p.variant) fail(`type should be "${p.variant}"`);
  if (theme.name !== p.label) fail(`name should be "${p.label}"`);
  if (!theme.colors || typeof theme.colors !== "object") fail("colors missing");
  if (!Array.isArray(theme.tokenColors) || theme.tokenColors.length < 20)
    fail(`tokenColors missing or too small (${theme.tokenColors?.length})`);
  if (!theme.semanticTokenColors || typeof theme.semanticTokenColors !== "object")
    fail("semanticTokenColors missing");
  if (!theme.semanticHighlighting) fail("semanticHighlighting should be true");

  // ANSI colors must match the Gogh base palette exactly
  p.ansi.forEach((hex, i) => {
    const key = ansiKeys[i];
    if (theme.colors[key]?.toUpperCase() !== hex.toUpperCase())
      fail(`${key} should be ${hex}, got ${theme.colors[key]}`);
  });

  // Required workbench keys
  for (const key of requiredColors) {
    if (!(key in theme.colors)) fail(`missing color key: ${key}`);
  }

  // Primary and secondary text must remain readable against the editor surface.
  const commentForeground = theme.tokenColors.find((rule) => rule.name === "Comment")
    ?.settings?.foreground;
  const contrastChecks = [
    ["editor.foreground", theme.colors["editor.foreground"], theme.colors["editor.background"], 4.5],
    ["editorLineNumber.activeForeground", theme.colors["editorLineNumber.activeForeground"], theme.colors["editor.background"], 3.0],
    ["Comment", commentForeground, theme.colors["editor.background"], 2.9],
    ["editorLineNumber.foreground", theme.colors["editorLineNumber.foreground"], theme.colors["editor.background"], 2.0],
  ];
  for (const [name, foreground, background, minimum] of contrastChecks) {
    if (foreground && background && contrast(foreground, background) < minimum) {
      fail(`${name} contrast should be >= ${minimum}, got ${contrast(foreground, background).toFixed(2)}`);
    }
  }

  // All colors must be valid hex (6 or 8 digits)
  for (const [key, value] of Object.entries(theme.colors)) {
    if (typeof value !== "string" || !HEX_RE.test(value)) {
      fail(`invalid color value for ${key}: ${value}`);
    } else {
      try {
        hexToRgba(value);
      } catch {
        fail(`invalid color value for ${key}: ${value}`);
      }
    }
  }

  // tokenColors entries must have valid settings (foreground and/or fontStyle)
  for (const rule of theme.tokenColors) {
    const s = rule.settings || {};
    if (!s.foreground && !s.fontStyle)
      fail(`token rule "${rule.name}" has neither foreground nor fontStyle`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} validation failure(s).`);
  process.exit(1);
}
console.log("\nAll themes valid ✓");
