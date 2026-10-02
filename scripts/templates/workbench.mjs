// Workbench (UI) color mapping. Takes the raw palette plus the derived color
// set and returns the `colors` object of a VSCode theme.
//
// Surface roles follow the everforest-web background ramp:
//   chrome (title/activity/status)  -> Background Dim
//   editor / panels                 -> Background 0
//   side bar / widgets              -> Background 1
//   hover & inactive selection      -> Background 2
//   borders / active selection      -> Background 3
//   emphasis (hover)                -> Background 4
//   strong emphasis                 -> Background 5
//   editor selection                -> Background Visual
//   diff / diagnostics tints        -> Background {Red,Green,Blue,Yellow,Purple}
import { alpha } from "../lib/color.mjs";

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

  // ---- Terminal ----
  c["terminal.background"] = d.bg0;
  c["terminal.foreground"] = d.fg;
  c["terminalCursor.foreground"] = d.cursor;
  p.ansi.forEach((hex, i) => {
    c[`terminal.ansi${ansiNames[i]}`] = hex;
  });
  c["terminal.border"] = d.bg3;
  c["terminal.selectionBackground"] = d.bgVisual;
  c["terminal.inactiveSelectionBackground"] = alpha(d.bgVisual, 0.6);
  c["terminal.findMatchHighlightBackground"] = d.findMatch;

  // ---- Global ----
  c.focusBorder = alpha(d.green, 0.7);
  c.foreground = d.fg;
  c.descriptionForeground = d.comment;
  c.errorForeground = d.error;
  c.warningForeground = d.warning;
  c.infoForeground = d.info;
  c["widget.shadow"] = "#00000070";
  c["scrollbar.shadow"] = "#00000070";
  c["scrollbarSlider.background"] = alpha(d.bg4, 0.6);
  c["scrollbarSlider.hoverBackground"] = alpha(d.bg4, 0.9);
  c["scrollbarSlider.activeBackground"] = alpha(d.bg5, 0.9);
  c["badge.background"] = d.green;
  c["badge.foreground"] = d.bg0;
  c["progressBar.background"] = d.green;
  c["sash.hoverBorder"] = alpha(d.green, 0.7);

  // ---- Editor ----
  c["editor.background"] = d.bg0;
  c["editor.foreground"] = d.fg;
  c["editorLineNumber.foreground"] = d.lineNumber;
  c["editorLineNumber.activeForeground"] = d.lineNumberActive;
  c["editorCursor.foreground"] = d.cursor;
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
  c["editor.rangeHighlightBackground"] = alpha(d.grey1, 0.15);
  c["editorIndentGuide.background"] = alpha(d.bg3, 0.5);
  c["editorIndentGuide.activeBackground"] = alpha(d.green, 0.5);
  c["editorWhitespace.foreground"] = alpha(d.bg4, 0.6);
  c["editorBracketHighlight.foreground1"] = d.green;
  c["editorBracketHighlight.foreground2"] = d.yellow;
  c["editorBracketHighlight.foreground3"] = d.blue;
  c["editorBracketHighlight.foreground4"] = d.red;
  c["editorBracketHighlight.foreground5"] = d.aqua;
  c["editorBracketHighlight.foreground6"] = d.purple;
  c["editorGutter.background"] = d.bg0;
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
  c["editorWidget.border"] = d.bg4;
  c["editorSuggestWidget.background"] = d.bg1;
  c["editorSuggestWidget.foreground"] = d.fg;
  c["editorSuggestWidget.selectedBackground"] = d.bg3;
  c["editorSuggestWidget.selectedForeground"] = d.fg;
  c["editorSuggestWidget.border"] = d.bg3;
  c["editorSuggestWidget.highlightForeground"] = d.green;
  c["editorHoverWidget.background"] = d.bg1;
  c["editorHoverWidget.foreground"] = d.fg;
  c["editorHoverWidget.border"] = d.bg4;
  c["editorGroupHeader.tabsBackground"] = d.bg0;
  c["editorGroupHeader.noTabsBackground"] = d.bg0;
  c["editorGroup.emptyBackground"] = d.bg0;
  c["editorGroup.dropBackground"] = alpha(d.green, 0.12);
  c["editorGroup.border"] = d.bg3;
  c["editorPane.background"] = d.bg0;
  c["editorCodeLens.foreground"] = d.comment;
  c["editor.foldBackground"] = alpha(d.green, 0.08);
  c["editor.foldPlaceholderForeground"] = d.comment;
  c["editorBracketMatch.background"] = alpha(d.green, 0.15);
  c["editorBracketMatch.border"] = d.green;
  c["editorRuler.foreground"] = alpha(d.bg3, 0.6);
  c["editorWidget.resizeBorder"] = d.green;
  c["editorStickyScroll.background"] = d.bg0;
  c["editorStickyScrollHover.background"] = d.bg1;

  // ---- Sidebar ----
  c["sideBar.background"] = d.bg1;
  c["sideBar.foreground"] = d.fg;
  c["sideBarTitle.foreground"] = d.fg;
  c["sideBarSectionHeader.background"] = d.bg1;
  c["sideBarSectionHeader.foreground"] = d.comment;
  c["sideBarSectionHeader.border"] = d.bg3;
  c["sideBar.border"] = d.bg3;

  // ---- Activity bar ----
  c["activityBar.background"] = d.bgDim;
  c["activityBar.foreground"] = d.fg;
  c["activityBar.inactiveForeground"] = d.comment;
  c["activityBar.activeBorder"] = d.green;
  c["activityBarBadge.background"] = d.green;
  c["activityBarBadge.foreground"] = d.bg0;

  // ---- Title bar ----
  c["titleBar.activeBackground"] = d.bgDim;
  c["titleBar.activeForeground"] = d.fg;
  c["titleBar.inactiveBackground"] = d.bgDim;
  c["titleBar.inactiveForeground"] = d.comment;
  c["titleBar.border"] = d.bg3;

  // ---- Status bar ----
  c["statusBar.background"] = d.bgDim;
  c["statusBar.foreground"] = d.fg;
  c["statusBar.border"] = d.bgDim;
  c["statusBar.noFolderBackground"] = d.bgDim;
  c["statusBar.noFolderForeground"] = d.fg;
  c["statusBar.debuggingBackground"] = d.statusline3;
  c["statusBar.debuggingForeground"] = d.bg0;
  c["statusBarItem.hoverBackground"] = d.bg2;
  c["statusBarItem.activeBackground"] = d.bg3;
  c["statusBarItem.prominentBackground"] = d.green;
  c["statusBarItem.prominentForeground"] = d.bg0;

  // ---- Panels ----
  c["panel.background"] = d.bg0;
  c["panel.border"] = d.bg3;
  c["panelTitle.activeBorder"] = d.green;
  c["panelTitle.activeForeground"] = d.fg;
  c["panelTitle.inactiveForeground"] = d.comment;
  c["panelSection.border"] = d.bg3;
  c["panelSectionHeader.background"] = d.bg1;
  c["panelSectionHeader.foreground"] = d.fg;

  // ---- Tabs ----
  c["tab.activeBackground"] = d.bg0;
  c["tab.activeForeground"] = d.fg;
  c["tab.activeBorder"] = d.green;
  c["tab.inactiveBackground"] = d.bg1;
  c["tab.inactiveForeground"] = d.comment;
  c["tab.border"] = d.bg3;
  c["tab.hoverBackground"] = d.bg2;
  c["tab.unfocusedActiveBackground"] = d.bg0;
  c["tab.unfocusedActiveForeground"] = d.comment;
  c["tab.unfocusedInactiveBackground"] = d.bg1;
  c["tab.unfocusedInactiveForeground"] = d.comment;
  c["tab.activeModifiedBorder"] = d.yellow;
  c["tab.inactiveModifiedBorder"] = alpha(d.yellow, 0.7);
  c["tab.lastPinnedBorder"] = d.bg4;

  // ---- Inputs / controls ----
  c["input.background"] = d.bg1;
  c["input.foreground"] = d.fg;
  c["input.placeholderForeground"] = d.comment;
  c["input.border"] = d.bg4;
  c["inputOption.activeBorder"] = d.green;
  c["inputOption.activeBackground"] = alpha(d.green, 0.12);
  c["inputValidation.errorBackground"] = d.bgRed;
  c["inputValidation.errorForeground"] = d.error;
  c["inputValidation.errorBorder"] = d.error;
  c["inputValidation.warningBackground"] = d.bgYellow;
  c["inputValidation.warningForeground"] = d.warning;
  c["inputValidation.warningBorder"] = d.warning;
  c["inputValidation.infoBackground"] = d.bgBlue;
  c["inputValidation.infoForeground"] = d.info;
  c["inputValidation.infoBorder"] = d.info;
  c["dropdown.background"] = d.bg1;
  c["dropdown.foreground"] = d.fg;
  c["dropdown.border"] = d.bg4;
  c["button.background"] = d.bg3;
  c["button.foreground"] = d.fg;
  c["button.hoverBackground"] = d.bg4;
  c["button.border"] = d.bg4;
  c["button.secondaryBackground"] = d.bg1;
  c["button.secondaryForeground"] = d.fg;
  c["button.secondaryHoverBackground"] = d.bg2;
  c["checkbox.background"] = d.bg1;
  c["checkbox.foreground"] = d.fg;
  c["checkbox.border"] = d.bg4;

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
  c["list.deemphasizedForeground"] = d.comment;
  c["list.filterMatchBackground"] = d.findMatchHighlight;
  c["list.filterMatchBorder"] = d.yellow;
  c["listFilterWidget.background"] = d.bg1;
  c["listFilterWidget.outline"] = d.green;
  c["menu.background"] = d.bg1;
  c["menu.foreground"] = d.fg;
  c["menu.selectionBackground"] = d.bg3;
  c["menu.selectionForeground"] = d.fg;
  c["menu.border"] = d.bg4;
  c["menu.separatorBackground"] = d.bg3;
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
  c["breadcrumb.background"] = d.bg1;
  c["breadcrumbPicker.background"] = d.bg1;

  // ---- Peek view / inline tooling ----
  c["peekView.border"] = d.green;
  c["peekViewEditor.background"] = d.bg1;
  c["peekViewEditor.matchHighlightBackground"] = d.findMatch;
  c["peekViewResult.background"] = d.bg1;
  c["peekViewResult.fileForeground"] = d.fg;
  c["peekViewResult.lineForeground"] = d.comment;
  c["peekViewResult.selectionBackground"] = d.bg3;
  c["peekViewResult.selectionForeground"] = d.fg;
  c["peekViewTitle.background"] = d.bgDim;
  c["peekViewTitleDescription.foreground"] = d.comment;
  c["peekViewTitleLabel.foreground"] = d.fg;

  // ---- Markdown rendering (extensions detail page, markdown preview) ----
  c["textBlockQuote.background"] = d.bg1;
  c["textBlockQuote.border"] = alpha(d.green, 0.5);
  c["textCodeBlock.background"] = d.bg1;
  c["textLink.foreground"] = d.blue;
  c["textLink.activeForeground"] = d.green;
  c["textPreformat.foreground"] = d.fg;
  c["textSeparator.foreground"] = d.bg4;

  // ---- Diff / git decorations ----
  c["diffEditor.insertedTextBackground"] = d.bgGreen;
  c["diffEditor.removedTextBackground"] = d.bgRed;
  c["diffEditor.insertedLineBackground"] = alpha(d.bgGreen, 0.7);
  c["diffEditor.removedLineBackground"] = alpha(d.bgRed, 0.7);
  c["diffEditor.modifiedTextBackground"] = d.bgBlue;
  c["diffEditor.diagonalFill"] = alpha(d.bg3, 0.4);
  c["gitDecoration.addedResourceForeground"] = d.green;
  c["gitDecoration.modifiedResourceForeground"] = d.yellow;
  c["gitDecoration.deletedResourceForeground"] = d.red;
  c["gitDecoration.untrackedResourceForeground"] = d.aqua;
  c["gitDecoration.conflictingResourceForeground"] = d.purple;
  c["gitDecoration.ignoredResourceForeground"] = d.comment;

  // ---- Notifications / problems / debug ----
  c["notificationCenterHeader.background"] = d.bg1;
  c["notificationCenterHeader.foreground"] = d.fg;
  c["notificationLink.foreground"] = d.blue;
  c["problemsErrorIcon.foreground"] = d.error;
  c["problemsWarningIcon.foreground"] = d.warning;
  c["problemsInfoIcon.foreground"] = d.info;
  c["debugConsole.errorForeground"] = d.error;
  c["debugConsole.warningForeground"] = d.warning;
  c["debugConsole.infoForeground"] = d.info;
  c["debugConsole.sourceForeground"] = d.comment;
  c["debugToolBar.background"] = d.bg1;
  c["debugToolBar.border"] = d.bg3;

  // ---- Charts ----
  c["charts.foreground"] = d.fg;
  c["charts.red"] = d.red;
  c["charts.orange"] = d.orange;
  c["charts.yellow"] = d.yellow;
  c["charts.green"] = d.green;
  c["charts.blue"] = d.blue;
  c["charts.purple"] = d.purple;

  // ---- Notifications / minimap ----
  c["notificationCenter.border"] = d.bg3;
  c["notificationToast.border"] = d.bg3;
  c["minimap.background"] = d.bg0;
  c["minimap.errorHighlight"] = d.error;
  c["minimap.warningHighlight"] = d.warning;
  c["minimap.findMatchHighlight"] = d.green;
  c["minimap.selectionHighlight"] = d.bgVisual;
  c["minimapGutter.addedBackground"] = d.green;
  c["minimapGutter.modifiedBackground"] = d.yellow;
  c["minimapGutter.deletedBackground"] = d.red;

  return c;
}
