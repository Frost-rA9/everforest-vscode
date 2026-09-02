# Changelog

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
  `Frost-rA9.everforest-vscode`) and GitHub Releases
