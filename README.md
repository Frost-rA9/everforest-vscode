# Everforest Remastered

Six static Everforest color schemes (Dark/Light × Hard/Medium/Soft) for VS Code,
built directly from the official Everforest palette.

Warm, soft and eye-friendly. Every accent, grey and background comes from the
canonical [Everforest](https://github.com/sainnhe/everforest) palette as published
by [everforest-web](https://github.com/SirEthanator/everforest-web); the VS Code
workbench surfaces and the 16-color terminal palette are derived from it.

This is a maintained remaster of the archived official VS Code port
([sainnhe/everforest-vscode](https://github.com/sainnhe/everforest-vscode), last
released in 2022): six static variants, no runtime configuration, broader
workbench coverage and a richer 16-color terminal palette.

![Everforest Dark (Medium)](images/everforest-dark-medium.png)

![Everforest Light (Medium)](images/everforest-light-medium.png)

Designed for the **VS Code + integrated terminal + terminal-based agent** workflow:
the terminal keeps a full 16-color palette (normal and bright groups differ), while
the editor and workbench reuse the same Everforest color semantics without competing
with the TUI.

## Features

- 🌿 **Official palette** — accents, greys and the six background ramps are taken
  from the canonical Everforest scheme (via `everforest-web`)
- 🌓 **Six static variants** — Dark/Light × Hard/Medium/Soft, pick once and forget
- 🖥️ **Rich 16-color terminal** — the `terminal.ansi*` set is derived from the
  palette, with distinct normal and bright groups for TUIs
- 🎯 **Semantic highlighting** — syntax, HTML/CSS/Markdown, JSON/YAML/TOML, Rust,
  Go, Shell and Dockerfile all share one role mapping
- 🌙 **Blue-light friendly** — pairs well with f.lux / Redshift
- 🧩 **No configuration** — no settings to tune, no runtime overhead

## Themes

| Theme | Type | Note |
|---|---|---|
| Everforest Dark (Hard) | dark | highest contrast |
| Everforest Dark (Medium) | dark | balanced (default) |
| Everforest Dark (Soft) | dark | softest for long sessions |
| Everforest Light (Hard) | light | highest contrast |
| Everforest Light (Medium) | light | balanced (default) |
| Everforest Light (Soft) | light | softest for long sessions |

## Quick Start

1. **Marketplace**：VSCode 扩展面板搜索 `Everforest Remastered` → Install
2. **VSIX**：从 [Releases](https://github.com/Frost-rA9/everforest-vscode/releases) 下载 → `code --install-extension everforest-<version>.vsix`
3. Press `Ctrl+K Ctrl+T` and pick a variant

## Migrating from 0.2.0 (`everforest-gogh`)

The extension id changed to `Frost-rA9.everforest`, so the previous
`Frost-rA9.everforest-gogh` listing no longer receives updates. To migrate:

1. Uninstall the old extension (`code --uninstall-extension Frost-rA9.everforest-gogh`)
2. Install **Everforest Remastered** (`Frost-rA9.everforest`)
3. Done — theme labels are unchanged, so `workbench.colorTheme` keeps working

## Contributing

The palette data is vendored in `scripts/palette/everforest-web.mjs` and must stay
identical to upstream. Tune the VS Code derivation in
`scripts/templates/derived.mjs`, then `npm run build` to regenerate the six theme
files and `npm run validate` to check them. See `AGENTS.md` for conventions.

## Credits

- Palette: [SirEthanator/everforest-web](https://github.com/SirEthanator/everforest-web) (MIT),
  a faithful transcription of the official Everforest colors
- Official color scheme: [sainnhe/everforest](https://github.com/sainnhe/everforest) (MIT)
- VS Code derivation, workbench mapping and terminal palette: this project

## License

MIT — see the LICENSE file in the repository root.
