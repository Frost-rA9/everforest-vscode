// Build script: generate the 6 theme JSON files from the Gogh-Co palettes.
//   node scripts/build.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getPalette, paletteIds } from "./palette/index.mjs";
import { getDerived } from "./templates/derived.mjs";
import { getWorkbench } from "./templates/workbench.mjs";
import { getSyntax } from "./templates/syntax.mjs";
import { getSemantic } from "./templates/semantic.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const themesDir = join(root, "themes");
mkdirSync(themesDir, { recursive: true });

function buildTheme(id) {
  const p = getPalette(id);
  const d = getDerived(p);
  const theme = {
    name: p.label,
    type: p.variant,
    semanticHighlighting: true,
    semanticTokenColors: getSemantic(d),
    colors: getWorkbench(d, p),
    tokenColors: getSyntax(d),
  };
  const file = join(themesDir, `everforest-${id}.json`);
  writeFileSync(file, JSON.stringify(theme, null, 2) + "\n");
  return file;
}

const built = paletteIds.map(buildTheme);
console.log(`Generated ${built.length} themes:`);
for (const f of built) console.log(`  ${f}`);
