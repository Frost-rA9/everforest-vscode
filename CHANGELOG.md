# Changelog

## [1.0.0] - 2026-10-03

### Changed

- **Rebased the whole extension onto the official Everforest palette** published by
  [everforest-web](https://github.com/SirEthanator/everforest-web) (pinned to
  `6f6e3c5b8b`, MIT) instead of the Gogh terminal schemes. Workbench surfaces now use
  the upstream `Background Dim/0–5`, `Background Visual` and `Background
  Red/Green/Blue/Yellow/Purple` ramps, the `Grey 0–2` neutrals, and the exact
  official accents (notably the true orange `#E69875`/`#F57D26` instead of a
  red+yellow mix).
- Renamed the extension to **Everforest Remastered** (id `Frost-rA9.everforest`,
  new Marketplace listing) and bumped to 1.0.0. Theme labels are unchanged.
- Terminal ANSI colors are now derived from the palette with distinct normal and
  bright groups (`scripts/palette/ansi.mjs`), replacing the Gogh values.

### Added

- `scripts/palette/everforest-web.mjs` — vendored upstream palette data + provenance.
- `scripts/palette/ansi.mjs` — documented 16-color terminal derivation.
- Upstream-consistency validation: editor/terminal backgrounds, chrome and border
  roles, accent roles, and a per-theme expected-background table.
- Extended workbench coverage: diff line backgrounds, modified-text tint,
  sticky-scroll surfaces, sash hover border, terminal border/selection.

### Fixed

- Corrected the Marketplace id recorded for the 0.1.0 release (it is
  `Frost-rA9.everforest-gogh`, not `Frost-rA9.everforest-vscode`).
- Light-theme comment/line-number greys are nudged toward the foreground so they
  stay readable on the darker "soft" background.

### Notes

- The previous `Frost-rA9.everforest-gogh` listing does not receive this update;
  see the migration section in the README.

## [0.2.0] - 2026-09-03

### Added

- Expanded Workbench coverage for editor groups, folds, bracket matching, Peek
  View, diagnostics, debugging, charts, and terminal selection.
- Added syntax highlighting for Rust, Go, Shell, Dockerfile, YAML, TOML, and
  Diff while preserving the shared Gogh color semantics.
- Added language-specific semantic token mappings for TypeScript, Python, and
  Rust.
- Added contrast checks for primary text, comments, and line numbers, plus
  validation for the new UI color roles.
- Documented the VS Code + integrated terminal + terminal-based agent workflow
  as the project's primary use case.

## [0.1.1] - 2026-08-24

### Fixed

- Add `textBlockQuote` / `textCodeBlock` / `textLink` colors so quote blocks and
  code blocks render softly under the Everforest themes (extensions detail
  page, markdown preview)
- README: remove retired shields.io marketplace badges and the quote block,
  fixing the awkward dark background bar on the detail page

## [0.1.0] - 2026-08-24

### Added

- 6 themes: Everforest Dark/Light × Hard/Medium/Soft, colors sourced from the
  Gogh-Co terminal palettes (terminal ANSI colors match the source exactly)
- Zero-dependency Node generator: palettes → derived palette → workbench /
  syntax / semantic templates → `themes/*.json`
- `npm run build` / `validate` / `preview` / `package` scripts
- Validation script: JSON structure, hex validity, ANSI-16 consistency with the
  base palettes, required workbench keys
- Mock VSCode layout preview (`scripts/dev/preview.mjs`) for visual iteration
- Docs: `AGENTS.md`, `docs/engineering-plan.md`, README, LICENSE (MIT)

### Published

- **v0.1.0 released on the VS Code Marketplace** (extension id
  `Frost-rA9.everforest-gogh`) and GitHub Releases
