// Validation script: sanity-check the generated theme JSON files.
//   node scripts/validate.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { paletteIds, getPalette, UPSTREAM } from "./palette/index.mjs";
import { dark, light } from "./palette/everforest-web.mjs";
import { getDerived } from "./templates/derived.mjs";
import { contrast, hexToRgba } from "./lib/color.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

console.log(`Upstream palette: ${UPSTREAM.repo} @ ${UPSTREAM.commit.slice(0, 10)} (${UPSTREAM.license})`);

// Expected editor surface per theme — catches upstream transcription mistakes.
const expectedBackgrounds = {
  "dark-hard": "#272E33",
  "dark-medium": "#2D353B",
  "dark-soft": "#333C43",
  "light-hard": "#FFFBEF",
  "light-medium": "#FDF6E3",
  "light-soft": "#F3EAD3",
};

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
  "diffEditor.insertedTextBackground",
  "diffEditor.removedTextBackground",
];

// Workbench surfaces must resolve to the matching upstream role.
const surfaceRoles = [
  ["editor.background", (p) => p.bg0],
  ["editor.foreground", (p) => p.foreground],
  ["terminal.background", (p) => p.bg0],
  ["terminal.foreground", (p) => p.foreground],
  ["sideBar.background", (p) => p.bg1],
  ["titleBar.activeBackground", (p) => p.bgDim],
  ["activityBar.background", (p) => p.bgDim],
  ["statusBar.background", (p) => p.bgDim],
  ["panel.background", (p) => p.bg0],
  ["editorWidget.background", (p) => p.bg1],
  ["input.background", (p) => p.bg1],
  ["editor.selectionBackground", (p) => p.bgVisual],
  ["editorError.foreground", (p) => p.red],
  ["editorWarning.foreground", (p) => p.yellow],
  ["gitDecoration.addedResourceForeground", (p) => p.green],
  ["gitDecoration.modifiedResourceForeground", (p) => p.yellow],
  ["gitDecoration.deletedResourceForeground", (p) => p.red],
  ["gitDecoration.untrackedResourceForeground", (p) => p.aqua],
  ["gitDecoration.conflictingResourceForeground", (p) => p.purple],
];

const HEX_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;
const eq = (a, b) => typeof a === "string" && typeof b === "string" && a.toUpperCase() === b.toUpperCase();

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`  ✗ ${msg}`);
};

// ---- Upstream data integrity ----
for (const [name, variant] of [["dark", dark], ["light", light]]) {
  const commonKeys = Object.keys(variant.common);
  if (commonKeys.length !== 14) fail(`everforest-web ${name}.common should have 14 colors, got ${commonKeys.length}`);
  for (const level of ["hard", "medium", "soft"]) {
    const keys = Object.keys(variant[level]);
    if (keys.length !== 13) fail(`everforest-web ${name}.${level} should have 13 colors, got ${keys.length}`);
  }
}

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

  const colors = theme.colors || {};

  // Editor background must match the documented upstream Background 0.
  if (!eq(colors["editor.background"], expectedBackgrounds[id]))
    fail(`editor.background should be ${expectedBackgrounds[id]}, got ${colors["editor.background"]}`);

  // ANSI colors must match the derived palette exactly.
  p.ansi.forEach((hex, i) => {
    const key = ansiKeys[i];
    if (!eq(colors[key], hex)) fail(`${key} should be ${hex}, got ${colors[key]}`);
  });

  // Required workbench keys
  for (const key of requiredColors) {
    if (!(key in colors)) fail(`missing color key: ${key}`);
  }

  // Workbench surfaces resolve to the matching upstream role.
  for (const [key, role] of surfaceRoles) {
    if (!eq(colors[key], role(p))) fail(`${key} should be ${role(p)} (upstream role), got ${colors[key]}`);
  }

  // Comment color follows the derived Grey-1 role.
  const d = getDerived(p);
  const commentForeground = theme.tokenColors.find((rule) => rule.name === "Comment")?.settings?.foreground;
  if (!eq(commentForeground, d.comment)) fail(`Comment should be Grey 1 role ${d.comment}, got ${commentForeground}`);

  // Text must remain readable against the editor surface.
  const contrastChecks = [
    ["editor.foreground", colors["editor.foreground"], colors["editor.background"], 4.5],
    ["editorLineNumber.activeForeground", colors["editorLineNumber.activeForeground"], colors["editor.background"], 3.0],
    ["Comment", commentForeground, colors["editor.background"], 2.5],
    ["editorLineNumber.foreground", colors["editorLineNumber.foreground"], colors["editor.background"], 2.0],
  ];
  for (const [name, foreground, background, minimum] of contrastChecks) {
    if (foreground && background && contrast(foreground, background) < minimum) {
      fail(`${name} contrast should be >= ${minimum}, got ${contrast(foreground, background).toFixed(2)}`);
    }
  }

  // All colors must be valid hex (6 or 8 digits)
  for (const [key, value] of Object.entries(colors)) {
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
