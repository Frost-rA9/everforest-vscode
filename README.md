# Everforest (Gogh)

> Six Everforest color schemes (Dark/Light × Hard/Medium/Soft) ported from the
> [Gogh-Co](https://github.com/Gogh-Co/Gogh) terminal color schemes, tuned for
> the Visual Studio Code interface.

A warm, low-contrast, forest-inspired theme family. The 16 terminal ANSI colors
are **exactly** the original Gogh-Co Everforest palettes; the workbench and
syntax colors are derived from them with a small zero-dependency generator.

This is a Visual Studio Code port of the official
[Everforest](https://everforest.vercel.app/) color scheme — see the official
site for the design rationale, the original palettes, and other editor ports.

## Themes

| Theme | Type | Background |
|---|---|---|
| Everforest Dark (Hard) | dark | `#272E33` |
| Everforest Dark (Medium) | dark | `#2D353B` |
| Everforest Dark (Soft) | dark | `#333C43` |
| Everforest Light (Hard) | light | `#FFFBEF` |
| Everforest Light (Medium) | light | `#FDF6E3` |
| Everforest Light (Soft) | light | `#F3EAD3` |

![screenshots placeholder — add dark & light previews here]

## Install

### From VSIX

1. `npm run package` (or download a release `.vsix`)
2. `code --install-extension everforest-gogh-<version>.vsix`

### Development

```bash
npm install          # dev dependencies (@vscode/vsce)
npm run build        # regenerate the 6 themes from the palettes
npm run validate     # sanity-check the generated theme JSONs
npm run preview      # mock VSCode layout preview (HTML) for eyeballing colors
npm run package      # build the .vsix
```

Pick **Everforest Dark (Medium)** or **Everforest Light (Medium)** in
`Ctrl+K Ctrl+T`.

## Development notes

- Palettes (single source of truth): `scripts/palette/index.mjs`
- Color derivation rules: `scripts/templates/derived.mjs`
- See `docs/engineering-plan.md` and `AGENTS.md` for the full picture.

## Credits

- Color schemes: [Gogh-Co/Gogh](https://github.com/Gogh-Co/Gogh) (MIT)
- Official Everforest color scheme: <https://everforest.vercel.app/>

## License

MIT — see the LICENSE file in the repository root.
