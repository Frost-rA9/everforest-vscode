// Workbench (UI) color mapping. Takes the raw palette plus the derived color
// set and returns the `colors` object of a VSCode theme, including the
// terminal ANSI colors (exactly the Gogh-Co 16 colors).
import { alpha, mix } from "../lib/color.mjs";

const ansiNames = [
  "Black",
  "Red",
  "Green",
  "Yellow",
  "Blue",
  "Magenta",
  "Cyan",
  "White",
  "BrightBlack",
  "BrightRed",
  "BrightGreen",
  "BrightYellow",
  "BrightBlue",
  "BrightMagenta",
  "BrightCyan",
  "BrightWhite",
];

/** @param {import("./derived.mjs").Derived} d  @param {Palette} p */
export function getWorkbench(d, p) {
  const c = {};

  // ---- Terminal (exact Gogh ANSI colors) ----
  c["terminal.background"] = p.background;
  c["terminal.foreground"] = p.foreground;
  c["terminalCursor.foreground"] = p.cursor;
  p.ansi.forEach((hex, i) => {
    c[`terminal.ansi${ansiNames[i]}`] = hex;
  });

  // ---- Global ----
  c.focusBorder = alpha(d.green, 0.55);
  c.foreground = d.fg;
  c.descriptionForeground = d.comment;
  c.errorForeground = d.error;
  c.warningForeground = d.warning;
  c.infoForeground = d.info;
  c["widget.shadow"] = "#00000070";
  c["scrollbar.shadow"] = "#00000070";
  c["scrollbarSlider.background"] = alpha(d.bg3, 0.6);
  c["scrollbarSlider.hoverBackground"] = alpha(d.bg3, 0.9);
  c["scrollbarSlider.activeBackground"] = alpha(d.bg4, 0.9);
  c["badge.background"] = d.green;
  c["badge.foreground"] = d.bg;
  c["progressBar.background"] = d.green;

  // ---- Editor ----
  c["editor.background"] = d.bg;
  c["editor.foreground"] = d.fg;
  c["editorLineNumber.foreground"] = d.lineNumber;
  c["editorLineNumber.activeForeground"] = d.lineNumberActive;
  c["editorCursor.foreground"] = p.cursor;
  c["editor.selectionBackground"] = d.selection;
  c["editor.inactiveSelectionBackground"] = d.selectionInactive;
  c["editor.selectionHighlightBackground"] = d.wordHighlight;
  c["editor.wordHighlightBackground"] = d.wordHighlight;
  c["editor.wordHighlightStrongBackground"] = alpha(d.blue, 0.2);
  c["editor.findMatchBackground"] = d.findMatch;
  c["editor.findMatchHighlightBackground"] = d.findMatchHighlight;
  c["editor.findRangeHighlightBackground"] = alpha(d.blue, 0.12);
  c["editor.hoverHighlightBackground"] = alpha(d.green, 0.1);
  c["editor.lineHighlightBackground"] = d.lineHighlight;
  c["editor.lineHighlightBorder"] = "#00000000";
  c["editorLink.activeForeground"] = d.blue;
  c["editor.rangeHighlightBackground"] = alpha(d.comment, 0.2);
  c["editorIndentGuide.background"] = alpha(d.bg3, 0.4);
  c["editorIndentGuide.activeBackground"] = alpha(d.green, 0.4);
  c["editorWhitespace.foreground"] = alpha(d.bg3, 0.5);
  c["editorBracketHighlight.foreground1"] = d.green;
  c["editorBracketHighlight.foreground2"] = d.yellow;
  c["editorBracketHighlight.foreground3"] = d.blue;
  c["editorBracketHighlight.foreground4"] = d.red;
  c["editorBracketHighlight.foreground5"] = d.cyan;
  c["editorBracketHighlight.foreground6"] = d.magenta;
  c["editorGutter.background"] = d.bg;
  c["editorGutter.modifiedBackground"] = d.yellow;
  c["editorGutter.addedBackground"] = d.green;
  c["editorGutter.deletedBackground"] = d.red;
  c["editorOverviewRuler.border"] = "#00000000";
  c["editorOverviewRuler.errorForeground"] = alpha(d.error, 0.8);
  c["editorOverviewRuler.warningForeground"] = alpha(d.warning, 0.8);
  c["editorOverviewRuler.infoForeground"] = alpha(d.info, 0.8);
  c["editorError.foreground"] = d.error;
  c["editorWarning.foreground"] = d.warning;
  c["editorInfo.foreground"] = d.info;
  c["editorHint.foreground"] = d.info;
  c["editorWidget.background"] = d.bg1;
  c["editorWidget.border"] = d.bg3;
  c["editorSuggestWidget.background"] = d.bg1;
  c["editorSuggestWidget.foreground"] = d.fg;
  c["editorSuggestWidget.selectedBackground"] = d.bg3;
  c["editorSuggestWidget.selectedForeground"] = d.fg;
  c["editorSuggestWidget.border"] = d.bg3;
  c["editorSuggestWidget.highlightForeground"] = d.green;
  c["editorHoverWidget.background"] = d.bg1;
  c["editorHoverWidget.foreground"] = d.fg;
  c["editorHoverWidget.border"] = d.bg3;
  c["editorGroupHeader.tabsBackground"] = d.bg;
  c["editorGroup.border"] = d.bg3;

  // ---- Sidebar ----
  c["sideBar.background"] = d.bg1;
  c["sideBar.foreground"] = d.fg;
  c["sideBarTitle.foreground"] = d.fg;
  c["sideBarSectionHeader.background"] = d.bg1;
  c["sideBarSectionHeader.foreground"] = d.comment;
  c["sideBarSectionHeader.border"] = d.bg3;

  // ---- Activity bar ----
  c["activityBar.background"] = d.bg0;
  c["activityBar.foreground"] = d.fg;
  c["activityBar.inactiveForeground"] = d.comment;
  c["activityBar.activeBorder"] = d.green;
  c["activityBarBadge.background"] = d.green;
  c["activityBarBadge.foreground"] = d.bg;

  // ---- Title bar ----
  c["titleBar.activeBackground"] = d.bg0;
  c["titleBar.activeForeground"] = d.fg;
  c["titleBar.inactiveBackground"] = d.bg0;
  c["titleBar.inactiveForeground"] = d.comment;

  // ---- Status bar ----
  c["statusBar.background"] = d.bg0;
  c["statusBar.foreground"] = d.fg;
  c["statusBar.border"] = d.bg0;
  c["statusBar.noFolderBackground"] = d.bg0;
  c["statusBar.noFolderForeground"] = d.fg;
  c["statusBar.debuggingBackground"] = mix(d.bg0, d.red, 0.25);
  c["statusBar.debuggingForeground"] = d.fg;
  c["statusBarItem.hoverBackground"] = d.bg2;
  c["statusBarItem.activeBackground"] = d.bg3;
  c["statusBarItem.prominentBackground"] = d.green;
  c["statusBarItem.prominentForeground"] = d.bg;

  // ---- Panels ----
  c["panel.background"] = d.bg;
  c["panel.border"] = d.bg3;
  c["panelTitle.activeBorder"] = d.green;
  c["panelTitle.activeForeground"] = d.fg;
  c["panelTitle.inactiveForeground"] = d.comment;
  c["panelSection.border"] = d.bg3;
  c["panelSectionHeader.background"] = d.bg1;
  c["panelSectionHeader.foreground"] = d.fg;

  // ---- Tabs ----
  c["tab.activeBackground"] = d.bg;
  c["tab.activeForeground"] = d.fg;
  c["tab.activeBorder"] = d.green;
  c["tab.inactiveBackground"] = d.bg1;
  c["tab.inactiveForeground"] = d.comment;
  c["tab.border"] = d.bg3;
  c["tab.hoverBackground"] = d.bg2;
  c["tab.unfocusedActiveBackground"] = d.bg;
  c["tab.unfocusedInactiveBackground"] = d.bg1;

  // ---- Inputs / controls ----
  c["input.background"] = d.bg1;
  c["input.foreground"] = d.fg;
  c["input.placeholderForeground"] = d.comment;
  c["input.border"] = d.bg3;
  c["inputOption.activeBorder"] = d.green;
  c["inputOption.activeBackground"] = alpha(d.green, 0.12);
  c["inputValidation.errorBackground"] = alpha(d.error, 0.15);
  c["inputValidation.errorForeground"] = d.error;
  c["inputValidation.errorBorder"] = d.error;
  c["inputValidation.warningBackground"] = alpha(d.warning, 0.15);
  c["inputValidation.warningForeground"] = d.warning;
  c["inputValidation.warningBorder"] = d.warning;
  c["inputValidation.infoBackground"] = alpha(d.info, 0.15);
  c["inputValidation.infoForeground"] = d.info;
  c["inputValidation.infoBorder"] = d.info;
  c["dropdown.background"] = d.bg1;
  c["dropdown.foreground"] = d.fg;
  c["dropdown.border"] = d.bg3;
  c["button.background"] = d.bg3;
  c["button.foreground"] = d.fg;
  c["button.hoverBackground"] = d.bg4;
  c["button.secondaryBackground"] = d.bg1;
  c["button.secondaryForeground"] = d.fg;
  c["button.secondaryHoverBackground"] = d.bg2;
  c["checkbox.background"] = d.bg1;
  c["checkbox.foreground"] = d.fg;
  c["checkbox.border"] = d.bg3;

  // ---- Lists / menus ----
  c["list.activeSelectionBackground"] = d.bg3;
  c["list.activeSelectionForeground"] = d.fg;
  c["list.inactiveSelectionBackground"] = d.bg2;
  c["list.hoverBackground"] = d.bg2;
  c["list.focusAndSelectionBackground"] = d.bg3;
  c["list.focusBackground"] = d.bg2;
  c["list.focusOutline"] = d.green;
  c["list.highlightForeground"] = d.green;
  c["list.invalidItemForeground"] = d.error;
  c["listFilterWidget.background"] = d.bg1;
  c["listFilterWidget.outline"] = d.green;
  c["menu.background"] = d.bg1;
  c["menu.foreground"] = d.fg;
  c["menu.selectionBackground"] = d.bg3;
  c["menu.selectionForeground"] = d.fg;
  c["menu.border"] = d.bg3;
  c["quickInput.background"] = d.bg1;
  c["quickInput.foreground"] = d.fg;
  c["pickerGroup.foreground"] = d.comment;
  c["pickerGroup.border"] = d.bg3;

  // ---- Breadcrumbs / settings ----
  c["breadcrumb.foreground"] = d.comment;
  c["breadcrumb.focusForeground"] = d.fg;
  c["breadcrumb.activeSelectionForeground"] = d.fg;
  c["settings.headerForeground"] = d.fg;
  c["settings.modifiedItemIndicator"] = d.yellow;

  // ---- Markdown rendering (extensions detail page, markdown preview) ----
  c["textBlockQuote.background"] = d.bg2;
  c["textBlockQuote.border"] = alpha(d.green, 0.5);
  c["textCodeBlock.background"] = d.bg1;
  c["textLink.foreground"] = d.blue;
  c["textLink.activeForeground"] = d.green;
  c["textPreformat.foreground"] = d.fg;
  c["textSeparator.foreground"] = d.bg3;

  // ---- Diff / git decorations ----
  c["diffEditor.insertedTextBackground"] = alpha(d.green, 0.15);
  c["diffEditor.removedTextBackground"] = alpha(d.red, 0.15);
  c["diffEditor.insertedLineBackground"] = alpha(d.green, 0.1);
  c["diffEditor.removedLineBackground"] = alpha(d.red, 0.1);
  c["diffEditor.diagonalFill"] = alpha(d.bg3, 0.3);
  c["gitDecoration.addedResourceForeground"] = d.green;
  c["gitDecoration.modifiedResourceForeground"] = d.yellow;
  c["gitDecoration.deletedResourceForeground"] = d.red;
  c["gitDecoration.untrackedResourceForeground"] = d.cyan;
  c["gitDecoration.conflictingResourceForeground"] = d.magenta;

  // ---- Notifications / minimap ----
  c["notificationCenter.border"] = d.bg3;
  c["notificationToast.border"] = d.bg3;
  c["minimap.background"] = d.bg;
  c["minimap.errorHighlight"] = d.error;
  c["minimap.warningHighlight"] = d.warning;
  c["minimap.findMatchHighlight"] = d.green;
  c["minimap.selectionHighlight"] = d.selection;
  c["minimapGutter.addedBackground"] = d.green;
  c["minimapGutter.modifiedBackground"] = d.yellow;
  c["minimapGutter.deletedBackground"] = d.red;

  return c;
}
