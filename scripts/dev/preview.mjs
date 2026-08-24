// Dev-only preview generator: renders a mock VSCode layout from a theme JSON
// so the palette can be eyeballed without launching VSCode.
// Usage: node scripts/dev/preview.mjs <theme-id> ...
import { readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ids = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const target = ids.length ? ids : ["dark-medium"];

function load(id) {
  return JSON.parse(readFileSync(join(root, "themes", `everforest-${id}.json`), "utf8"));
}

function findToken(theme, name) {
  const r = theme.tokenColors.find((x) => x.name === name);
  return r?.settings?.foreground || "#000000";
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Tokenize demo.ts lines manually with the theme's token colors.
function codeLine(theme, parts) {
  return (
    `<div class="code">` +
    parts
      .map(([text, role]) => {
        const color =
          role === "red" ? findToken(theme, "Keyword")
          : role === "orange" ? findToken(theme, "Storage")
          : role === "yellow" ? findToken(theme, "String")
          : role === "green" ? findToken(theme, "Function")
          : role === "cyan" ? findToken(theme, "Preproc")
          : role === "blue" ? findToken(theme, "Type")
          : role === "magenta" ? findToken(theme, "Number")
          : role === "comment" ? findToken(theme, "Comment")
          : findToken(theme, "Identifier");
        return `<span style="color:${color}">${esc(text)}</span>`;
      })
      .join("") +
    `</div>`
  );
}

function render(theme, id) {
  const c = theme.colors;
  const w = 1360;
  const tb = 30, act = 48, sb = 220, tab = 35, stat = 22, term = 150;

  const tree = `
    <div class="tree">
      <div class="item dir">▾ everforest-vscode</div>
      <div class="item file">scripts</div>
      <div class="item file">themes</div>
      <div class="item file" style="color:${c["gitDecoration.modifiedResourceForeground"]}">▸ package.json</div>
      <div class="item file" style="color:${c["gitDecoration.addedResourceForeground"]}">▸ README.md</div>
      <div class="item file" style="color:${c["gitDecoration.untrackedResourceForeground"]}">▸ AGENTS.md</div>
      <div class="item file" style="color:${c["gitDecoration.deletedResourceForeground"]}">▸ CHANGELOG.md</div>
      <div class="item file" style="color:${c["gitDecoration.conflictingResourceForeground"]}">▸ LICENSE</div>
    </div>`;

  const lines = [
    [["// Everforest (Gogh) demo — TypeScript", "comment"]],
    [["import ", "keyword"], ["{ readFile }", "orange"], [" from ", "keyword"], ["\"node:fs\"", "yellow"], [";", "identifier"]],
    [["", ""]],
    [["interface ", "keyword"], ["User", "blue"], [" {", "identifier"]],
    [["  id", "identifier"], [": ", "identifier"], ["number", "blue"], [";", "identifier"]],
    [["  name", "identifier"], [": ", "identifier"], ["string", "blue"], [";", "identifier"]],
    [["  active", "identifier"], [": ", "identifier"], ["boolean", "blue"], [";", "identifier"]],
    [["}", "identifier"]],
    [["", ""]],
    [["const ", "orange"], ["users", "identifier"], [": ", "identifier"], ["User", "blue"], ["[] = [", "identifier"]],
    [["  { id", "identifier"], [": ", "identifier"], ["1", "magenta"], [", name", "identifier"], [": ", "identifier"], ["\"Alice\"", "yellow"], [", active", "identifier"], [": ", "identifier"], ["true", "magenta"], [" },", "identifier"]],
    [["  { id", "identifier"], [": ", "identifier"], ["2", "magenta"], [", name", "identifier"], [": ", "identifier"], ["\"Bob\"", "yellow"], [", active", "identifier"], [": ", "identifier"], ["false", "magenta"], [" },", "identifier"]],
    [["];", "identifier"]],
    [["", ""]],
    [["async ", "keyword"], ["function ", "keyword"], ["fetchUsers", "green"], ["(url", "identifier"], [": ", "identifier"], ["string", "blue"], [")", "identifier"], [": ", "identifier"], ["Promise", "blue"], ["<", "identifier"], ["User", "blue"], ["> ", "identifier"], ["{", "identifier"]],
    [["  const ", "orange"], ["data", "identifier"], [" = ", "keyword"], ["await ", "keyword"], ["readFile", "green"], ["(url, ", "identifier"], ["\"utf8\"", "yellow"], [");", "identifier"]],
    [["  return ", "keyword"], ["JSON", "cyan"], [".parse", "green"], ["(data);", "identifier"]],
    [["}", "identifier"]],
    [["", ""]],
    [["for (", "keyword"], ["const ", "orange"], ["u", "identifier"], [" of ", "keyword"], ["users", "identifier"], [") {", "identifier"]],
    [["  if (", "keyword"], ["u.active", "identifier"], [") {", "identifier"]],
    [["    ", "identifier"], ["console", "cyan"], [".log", "green"], ["(`user: ", "yellow"], ["${", "identifier"], ["u.name", "identifier"], ["}", "identifier"], [" (#", "yellow"], ["${", "identifier"], ["u.id", "identifier"], ["})`);", "yellow"]],
    [["  } ", "identifier"], ["else {", "identifier"]],
    [["    ", "identifier"], ["console", "cyan"], [".warn", "green"], ["(\"skipping\", ", "yellow"], ["u.id", "identifier"], [");", "yellow"]],
    [["  }", "identifier"]],
    [["}", "identifier"]],
  ].map((parts) => codeLine(theme, parts)).join("\n");

  const terminal = `
    <div class="term" style="background:${c["terminal.background"]};color:${c["terminal.foreground"]}">
      <div class="term-bar">bash — terminal</div>
      <div><span style="color:${c["terminal.ansiBrightGreen"]}">lou@wsl</span><span style="color:${c["terminal.ansiBrightCyan"]}"> ~/projects/everforest-vscode</span> <span style="color:${c["terminal.ansiYellow"]}">$</span> npm run build</div>
      <div><span style="color:${c["terminal.ansiBrightBlack"]}">Generated 6 themes:</span></div>
      <div>  <span style="color:${c["terminal.ansiGreen"]}">✓</span> everforest-dark-hard.json</div>
      <div>  <span style="color:${c["terminal.ansiGreen"]}">✓</span> everforest-light-medium.json</div>
      <div><span style="color:${c["terminal.ansiRed"]}">✗</span> <span style="color:${c["terminal.ansiBrightRed"]}">error</span>: something went wrong</div>
    </div>`;

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; margin: 0; font-family: "Segoe UI", "Microsoft YaHei", sans-serif; }
    body { width: ${w}px; }
    .titlebar { height: ${tb}px; background: ${c["titleBar.activeBackground"]}; color: ${c["titleBar.activeForeground"]}; display:flex; align-items:center; padding:0 14px; font-size:12px; }
    .layout { display: flex; height: ${900 - tb - stat - term}px; }
    .activity { width: ${act}px; background: ${c["activityBar.background"]}; color: ${c["activityBar.inactiveForeground"]}; padding-top:8px; text-align:center; }
    .activity .icon { margin: 6px 0; font-size: 20px; }
    .activity .icon.active { color: ${c["activityBar.foreground"]}; border-left: 2px solid ${c["activityBar.activeBorder"]}; }
    .sidebar { width: ${sb}px; background: ${c["sideBar.background"]}; color: ${c["sideBar.foreground"]}; padding: 8px; font-size: 13px; }
    .tree .item { padding: 3px 6px; white-space: nowrap; }
    .tree .dir { font-weight: 600; }
    .tree .file:hover { background: ${c["list.hoverBackground"]}; }
    .main { flex: 1; display:flex; flex-direction:column; }
    .tabs { height: ${tab}px; background: ${c["editorGroupHeader.tabsBackground"]}; display:flex; font-size:12px; border-bottom: 1px solid ${c["tab.border"]}; }
    .tab { padding: 0 14px; display:flex; align-items:center; color: ${c["tab.inactiveForeground"]}; background: ${c["tab.inactiveBackground"]}; border-right: 1px solid ${c["tab.border"]}; }
    .tab.active { background: ${c["tab.activeBackground"]}; color: ${c["tab.activeForeground"]}; box-shadow: inset 0 2px 0 ${c["tab.activeBorder"]}; }
    .editor { flex:1; background: ${c["editor.background"]}; color: ${c["editor.foreground"]}; padding: 10px 0 0 12px; font-family: "Cascadia Code", Consolas, monospace; font-size: 13px; line-height: 1.5; }
    .code { white-space: pre; }
    .term { height: ${term}px; background: ${c["terminal.background"]}; color: ${c["terminal.foreground"]}; font-family: "Cascadia Code", Consolas, monospace; font-size: 12px; padding: 6px 12px; }
    .term-bar { color: ${c["terminal.ansiBrightBlack"]}; }
    .statusbar { height: ${stat}px; background: ${c["statusBar.background"]}; color: ${c["statusBar.foreground"]}; display:flex; align-items:center; font-size:11px; padding: 0 10px; gap: 16px; }
    .badge { background: ${c["badge.background"]}; color: ${c["badge.foreground"]}; border-radius: 10px; padding: 0 8px; font-size: 11px; }
  </style></head><body>
    <div class="titlebar">Everforest (Gogh) — ${esc(theme.name)}</div>
    <div class="layout">
      <div class="activity">
        <div class="icon active">◫</div><div class="icon">⌕</div><div class="icon">⑂</div><div class="icon">◉</div>
      </div>
      <div class="sidebar"><div class="tree">${tree}</div></div>
      <div class="main">
        <div class="tabs">
          <div class="tab active">demo.ts</div><div class="tab">demo.py</div><div class="tab">demo.md</div><div class="tab">demo.html</div>
        </div>
        <div class="editor">${lines}</div>
      </div>
    </div>
    ${terminal}
    <div class="statusbar">
      <span>⎇ main</span><span>◐ 0 ↓ 0 ↑ 0</span>
      <span style="flex:1"></span>
      <span>Ln 24, Col 12</span><span>UTF-8</span><span>TypeScript</span>
      <span class="badge">6</span><span>Everforest (Gogh)</span>
    </div>
  </body></html>`;

  const out = `/tmp/efv-preview-${id}.html`;
  writeFileSync(out, html);
  return out;
}

for (const id of target) {
  const theme = load(id);
  const out = render(theme, id);
  console.log(out);
}
