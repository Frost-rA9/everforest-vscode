[English](README.md) | 简体中文

# Everforest Remastered

面向 Visual Studio Code 的六套静态 **Everforest** 配色（Dark/Light × Hard/Medium/Soft），
直接基于官方 Everforest 调色板构建。

所有 accent、grey 与背景色都取自 [everforest-web](https://github.com/SirEthanator/everforest-web)
转录的官方 [Everforest](https://github.com/sainnhe/everforest) 调色板；VS Code 的
workbench 界面与 16 色终端调色板都由它派生，没有手工微调的颜色。

![Everforest Dark (Medium)](images/everforest-dark-medium.png)

## 为什么是 Everforest Remastered？

官方 VS Code 端口 [sainnhe/everforest-vscode](https://github.com/sainnhe/everforest-vscode)
仓库已归档，Marketplace 最后一次发布停留在 2022 年 12 月的 v0.3.0。本扩展是基于同一套
调色板维护的重制版：

- **六个静态主题** —— Dark/Light × Hard/Medium/Soft 一次选定，无运行时设置、无需重载
- **官方配色** —— 固定到上游调色板（仓库中记录确切 commit），而非近似值
- **完整的 workbench 覆盖** —— 编辑器、侧边栏、标签、面板、列表、菜单、diff 与诊断、
  Peek 视图、minimap 等
- **真正的 16 色终端** —— normal 与 bright 两组不同，TUI 的强调色不会丢
- **零运行时开销** —— 主题就是纯 JSON，没有扩展宿主代码

## 特性

- 🌿 **官方调色板** —— accent、grey 与六套背景色阶均取自官方 Everforest 方案（经 `everforest-web`）
- 🌓 **六个静态变体** —— Dark/Light × Hard/Medium/Soft，选一次即可
- 🖥️ **丰富的 16 色终端** —— `terminal.ansi*` 由调色板派生，normal 与 bright 分组不同
- 🎯 **语义高亮** —— 语法、HTML/CSS/Markdown、JSON/YAML/TOML、Rust、Go、Shell、Dockerfile 共用一套角色映射
- 🌙 **护眼** —— 适合搭配 f.lux / Redshift
- 🧩 **无需配置** —— 没有设置项，没有运行时负担

## 主题

| 主题 | 类型 | 说明 |
|---|---|---|
| Everforest Dark (Hard) | dark | 对比度最高 |
| Everforest Dark (Medium) | dark | 均衡（默认） |
| Everforest Dark (Soft) | dark | 最柔和，适合长时间使用 |
| Everforest Light (Hard) | light | 对比度最高 |
| Everforest Light (Medium) | light | 均衡（默认） |
| Everforest Light (Soft) | light | 最柔和，适合长时间使用 |

## 截图

### 亮色

![Everforest Light (Medium)](images/everforest-light-medium.png)

### 终端调色板

集成终端中并排展示 normal 与 bright 两组颜色。

![Everforest 终端调色板](images/everforest-terminal.png)

### diff 视图

新增行使用上游 `Background Green` 底色。

![Everforest diff 视图](images/everforest-diff.png)

## 安装

### Marketplace

在扩展面板搜索 **Everforest Remastered**，或执行：

```bash
code --install-extension Frost-rA9.everforest
```

### VSIX

从 [Releases](https://github.com/Frost-rA9/everforest-vscode/releases) 下载
`everforest-<version>.vsix`，然后：

```bash
code --install-extension everforest-<version>.vsix
```

### Remote / WSL

主题属于 UI 扩展，请装在渲染窗口的那一侧（例如使用 Remote - WSL 时装在 Windows 侧）。
各变体的主题 label 保持一致，用 `Ctrl+K Ctrl+T` 切换即可。

## 终端调色板

`terminal.ansi*` 由 Everforest 调色板派生，分为两组：

| 槽位 | Dark (Medium) | Light (Medium) |
|---|---|---|
| Black | `#343F44` | `#5C6A72` |
| Red | `#E67E80` | `#F85552` |
| Green | `#A7C080` | `#8DA101` |
| Yellow | `#DBBC7F` | `#DFA000` |
| Blue | `#7FBBB3` | `#3A94C5` |
| Magenta | `#D699B6` | `#DF69BA` |
| Cyan | `#83C092` | `#35A77C` |
| White | `#D3C6AA` | `#BDC3AF` |
| Bright Black | `#859289` | `#343F44` |
| Bright Red | `#F85552` | `#E67E80` |
| Bright Green | `#8DA101` | `#A7C080` |
| Bright Yellow | `#DFA000` | `#DBBC7F` |
| Bright Blue | `#3A94C5` | `#7FBBB3` |
| Bright Magenta | `#DF69BA` | `#D699B6` |
| Bright Cyan | `#35A77C` | `#83C092` |
| Bright White | `#D3C6AA` | `#D3C6AA` |

上表为 Medium 变体的取值，全部变体由 `scripts/palette/ansi.mjs` 生成。若希望终端严格按
设计渲染，可把 VS Code 的终端对比度调整设为 1：

```json
{
  "workbench.colorTheme": "Everforest Dark (Medium)",
  "terminal.integrated.minimumContrastRatio": 1
}
```

## 从 `everforest-gogh` 迁移

扩展 ID 已改为 `Frost-rA9.everforest`，旧的 `Frost-rA9.everforest-gogh` 列表不再收到更新。
迁移步骤：

1. 卸载旧扩展（`code --uninstall-extension Frost-rA9.everforest-gogh`）
2. 安装 **Everforest Remastered**（`Frost-rA9.everforest`）
3. 完成 —— 主题 label 未变，`workbench.colorTheme` 会继续生效

## 开发

```bash
npm install
npm run build      # 重新生成 6 个主题 JSON
npm run validate   # 结构 + 上游一致性 + 对比度校验
npm run preview    # 渲染模拟 VS Code 布局到 /tmp/efv-preview-<id>.html
npm run package    # 打包 everforest-<version>.vsix
```

调色板数据 vendored 在 `scripts/palette/everforest-web.mjs`，必须与上游一致；VS Code 的
派生规则在 `scripts/templates/derived.mjs`，改完 `npm run build` 再 `npm run validate`。
详细约定见 `AGENTS.md`。

## 致谢

- 调色板：[SirEthanator/everforest-web](https://github.com/SirEthanator/everforest-web)（MIT），
  官方 Everforest 配色的忠实转录
- 官方配色方案：[sainnhe/everforest](https://github.com/sainnhe/everforest)（MIT）
- VS Code 派生、workbench 映射与终端调色板：本项目

## 许可

MIT —— 见仓库根目录的 LICENSE 文件。
