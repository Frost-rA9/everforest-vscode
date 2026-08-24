// Syntax token color mapping (tokenColors). The scope→role mapping follows
// the Everforest conventions, with colors
// sourced from the Gogh-Co base palette via the derived set.
//
// Role → Gogh color (dark uses the normal group, light uses the bright group):
//   keyword/error → red | storage/operator → orange (mixed) | string → yellow
//   function → green | preproc/module/label → cyan | type/class → blue
//   number/constant → magenta | variable/delimiter → foreground
//   comment → grey

/** @param {import("./derived.mjs").Derived} d */
export function getSyntax(d) {
  return [
    {
      name: "Keyword",
      scope:
        "keyword, storage.type.function, storage.type.class, storage.type.enum, storage.type.interface, storage.type.property, keyword.operator.new, keyword.operator.expression, keyword.operator.delete, storage.type.extends",
      settings: { foreground: d.red },
    },
    { name: "Debug", scope: "keyword.other.debugger", settings: { foreground: d.red } },
    {
      name: "Storage",
      scope:
        "storage, modifier, keyword.var, entity.name.tag, keyword.control.case, keyword.control.switch",
      settings: { foreground: d.orange },
    },
    { name: "Operator", scope: "keyword.operator", settings: { foreground: d.orange } },
    {
      name: "String",
      scope:
        "string, punctuation.definition.string.end, punctuation.definition.string.begin, punctuation.definition.string.template.begin, punctuation.definition.string.template.end",
      settings: { foreground: d.yellow },
    },
    { name: "Attribute", scope: "entity.other.attribute-name", settings: { foreground: d.yellow } },
    {
      name: "String Escape",
      scope:
        "constant.character.escape, punctuation.quasi.element, punctuation.definition.template-expression, punctuation.section.embedded, storage.type.format, constant.other.placeholder, variable.interpolation",
      settings: { foreground: d.green },
    },
    {
      name: "Function",
      scope:
        "entity.name.function, support.function, meta.function, meta.function-call, meta.definition.method",
      settings: { foreground: d.green },
    },
    {
      name: "Preproc",
      scope:
        "keyword.control.at-rule, keyword.control.import, keyword.control.export, storage.type.namespace, punctuation.decorator, keyword.control.directive, keyword.preprocessor, punctuation.definition.preprocessor, punctuation.definition.directive, keyword.other.import, keyword.other.package, entity.name.type.namespace, entity.name.scope-resolution, keyword.other.using, keyword.package, keyword.import, keyword.map",
      settings: { foreground: d.cyan },
    },
    { name: "Annotation", scope: "storage.type.annotation", settings: { foreground: d.cyan } },
    {
      name: "Label",
      scope: "entity.name.label, constant.other.label",
      settings: { foreground: d.cyan },
    },
    {
      name: "Modules",
      scope:
        "support.module, support.node, support.other.module, support.type.object.module, entity.name.type.module, entity.name.type.class.module, keyword.control.module",
      settings: { foreground: d.cyan },
    },
    {
      name: "Type",
      scope: "storage.type, support.type, entity.name.type, keyword.type",
      settings: { foreground: d.blue },
    },
    {
      name: "Class",
      scope:
        "entity.name.type.class, support.class, entity.name.class, entity.other.inherited-class, storage.class",
      settings: { foreground: d.blue },
    },
    { name: "Number", scope: "constant.numeric", settings: { foreground: d.magenta } },
    { name: "Boolean", scope: "constant.language.boolean", settings: { foreground: d.magenta } },
    {
      name: "Special identifier",
      scope:
        "variable.language.this, variable.language.self, variable.language.super, keyword.other.this, variable.language.special, constant.language.nu",
      settings: { foreground: d.magenta },
    },
    {
      name: "Constant",
      scope: "constant.language, support.constant",
      settings: { foreground: d.magenta },
    },
    {
      name: "Identifier",
      scope: "variable, support.variable, meta.definition.variable",
      settings: { foreground: d.fg },
    },
    {
      name: "Property",
      scope:
        "variable.object.property, support.variable.property, variable.other.property, variable.other.object.property, variable.other.enummember",
      settings: { foreground: d.fg },
    },
    {
      name: "Delimiter",
      scope:
        "punctuation.definition.tag, punctuation.separator, punctuation.terminator, punctuation.accessor, punctuation.definition.interpolation, punctuation.definition.template-expression",
      settings: { foreground: d.comment },
    },
    {
      name: "Comment",
      scope: "comment, punctuation.definition.comment",
      settings: { foreground: d.comment, fontStyle: "italic" },
    },
    { name: "Invalid", scope: "invalid, invalid.illegal", settings: { foreground: d.error } },

    // ---- Markdown ----
    {
      name: "Markdown heading1",
      scope: "heading.1.markdown, markup.heading.setext.1.markdown",
      settings: { foreground: d.red, fontStyle: "bold" },
    },
    {
      name: "Markdown heading2",
      scope: "heading.2.markdown, markup.heading.setext.2.markdown",
      settings: { foreground: d.orange, fontStyle: "bold" },
    },
    {
      name: "Markdown heading3",
      scope: "heading.3.markdown",
      settings: { foreground: d.yellow, fontStyle: "bold" },
    },
    {
      name: "Markdown heading4",
      scope: "heading.4.markdown",
      settings: { foreground: d.green, fontStyle: "bold" },
    },
    {
      name: "Markdown heading5",
      scope: "heading.5.markdown",
      settings: { foreground: d.blue, fontStyle: "bold" },
    },
    {
      name: "Markdown heading6",
      scope: "heading.6.markdown",
      settings: { foreground: d.magenta, fontStyle: "bold" },
    },
    {
      name: "Markdown link",
      scope:
        "string.other.link.title.markdown, constant.other.reference.link.markdown, string.other.link.description.markdown",
      settings: { foreground: d.magenta },
    },
    {
      name: "Markdown link text",
      scope: "markup.underline.link.image.markdown, markup.underline.link.markdown",
      settings: { foreground: d.green, fontStyle: "underline" },
    },
    {
      name: "Markdown delimiter",
      scope:
        "punctuation.definition.string.begin.markdown, punctuation.definition.string.end.markdown, punctuation.definition.italic.markdown, punctuation.definition.bold.markdown, punctuation.definition.heading.markdown",
      settings: { foreground: d.comment },
    },
    { name: "Markdown italic", scope: "markup.italic", settings: { fontStyle: "italic" } },
    { name: "Markdown bold", scope: "markup.bold", settings: { fontStyle: "bold" } },
    {
      name: "Markdown bold italic",
      scope: "markup.bold.markdown markup.italic.markdown",
      settings: { fontStyle: "italic bold" },
    },
    {
      name: "Markdown code",
      scope:
        "markup.inline.raw.string.markdown, markup.fenced_code.block.markdown",
      settings: { foreground: d.green },
    },
    {
      name: "Markdown code delimiter",
      scope: "punctuation.definition.raw.markdown, punctuation.definition.markdown",
      settings: { foreground: d.yellow },
    },
    {
      name: "Markdown list mark",
      scope: "punctuation.definition.list.begin.markdown",
      settings: { foreground: d.red },
    },

    // ---- Language specific ----
    {
      name: "HTML attribute value",
      scope:
        "string.quoted.double.html, string.quoted.single.html, punctuation.definition.string.begin.html, punctuation.definition.string.end.html",
      settings: { foreground: d.green },
    },
    {
      name: "CSS property name",
      scope: "support.type.property-name.css",
      settings: { foreground: d.cyan },
    },
    {
      name: "CSS vendored property",
      scope: "support.type.vendored.property-name.css",
      settings: { foreground: d.blue },
    },
    {
      name: "CSS pseudo class",
      scope:
        "entity.other.attribute-name.pseudo-class.css, entity.other.attribute-name.pseudo-element.css",
      settings: { foreground: d.yellow },
    },
    {
      name: "CSS class selector",
      scope: "entity.other.attribute-name.class.css",
      settings: { foreground: d.red },
    },
    { name: "CSS unit", scope: "keyword.other.unit", settings: { foreground: d.orange } },
    {
      name: "CSS at-rule",
      scope: "entity.name.tag.css, keyword.control.at-rule.keyframes.css",
      settings: { foreground: d.magenta },
    },
    {
      name: "JSON key",
      scope: "support.type.property-name.json, support.type.object.key.json",
      settings: { foreground: d.yellow },
    },
    {
      name: "JavaScript storage",
      scope: "storage.type.js, storage.type.function.arrow.js",
      settings: { foreground: d.orange },
    },
    {
      name: "JavaScript punctuation",
      scope:
        "punctuation.accessor.js, punctuation.separator.key-value.js, keyword.operator.accessor.js",
      settings: { foreground: d.comment },
    },
    {
      name: "JSDoc tag",
      scope: "punctuation.definition.block.tag.jsdoc",
      settings: { foreground: d.red },
    },
    {
      name: "Python parameter",
      scope: "variable.parameter.function.python",
      settings: { foreground: d.fg },
    },
  ];
}
