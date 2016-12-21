
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/applyRules.js
Scrollgrid.prototype.internal.render.applyRules = function (data) {
    "use strict";

    var int = this.internal,
        render = int.render,
        sizes = int.sizes,
        physical = sizes.physical,
        virtual = sizes.virtual,
        rule,
        key,
        ruleDefinition = {},
        i,
        k,
        r,
        c,
        row,
        col,
        bound;

    if (render.formatRules) {

        // Iterate the focus data
        for (i = 0; i < data.length; i += 1) {

            if (data[i]) {

                ruleDefinition = {};

                // Rules use 1 based indices for rows and columns, this is because they use negative
                // notation to refer to elements from the end e.g. row: -1 = last row.  This would be
                // inconsistent if 0 was the first row.
                r = data[i].rowIndex + 1;
                c = data[i].columnIndex + 1;

                for (k = 0; k < render.formatRules.length; k += 1) {
                    rule = render.formatRules[k];
                    if (render.matchRule.call(this, rule.row, r, virtual.outerHeight) && render.matchRule.call(this, rule.column, c, virtual.outerWidth)) {
                        // Iterate the rule properties and apply them to the object
                        for (key in rule) {
                            if (rule.hasOwnProperty(key) && key !== "row" && key !== "column") {
                                ruleDefinition[key] = rule[key];
                            }
                        }
                    }
                }

                // Apply the combined rules
                if (ruleDefinition.formatter) {
                    data[i].formatter = ruleDefinition.formatter;
                }
                if (ruleDefinition.alignment) {
                    data[i].alignment = ruleDefinition.alignment;
                }
                if (ruleDefinition.cellPadding) {
                    data[i].cellPadding = ruleDefinition.cellPadding;
                }
                if (ruleDefinition.backgroundStyle) {
                    data[i].backgroundStyle += " " + ruleDefinition.backgroundStyle;
                }
                if (ruleDefinition.foregroundStyle) {
                    data[i].foregroundStyle += " " + ruleDefinition.foregroundStyle;
                }
                if (ruleDefinition.renderBackground) {
                    data[i].renderBackground = ruleDefinition.renderBackground;
                }
                if (ruleDefinition.renderBetween) {
                    data[i].renderBetween = ruleDefinition.renderBetween;
                }
                if (ruleDefinition.renderForeground) {
                    data[i].renderForeground = ruleDefinition.renderForeground;
                }
                if (ruleDefinition.columnSpan) {
                    data[i].columnSpan = ruleDefinition.columnSpan;
                    if (data[i].columnIndex < virtual.left) {
                        bound = virtual.left;
                    } else if (data[i].columnIndex > virtual.outerWidth - virtual.right) {
                        bound = virtual.outerWidth;
                    } else {
                        bound = virtual.outerWidth - virtual.right;
                    }
                    bound = Math.min(bound, data[i].columnIndex + data[i].columnSpan);
                    for (col = data[i].columnIndex + 1; col < bound; col += 1) {
                        data[i].boxWidth += this.columns[col].width;
                        data[i].textWidth += this.columns[col].width;
                    }
                }
                if (ruleDefinition.rowSpan) {
                    data[i].rowSpan = ruleDefinition.rowSpan;
                    if (data[i].rowIndex < virtual.top) {
                        bound = virtual.top;
                    } else if (data[i].rowIndex > virtual.outerHeight - virtual.bottom) {
                        bound = virtual.outerHeight;
                    } else {
                        bound = virtual.outerHeight - virtual.bottom;
                    }
                    bound = Math.min(bound, data[i].rowIndex + data[i].rowSpan);
                    for (row = data[i].rowIndex + 1; row < bound; row += 1) {
                        data[i].boxHeight += physical.getRowHeight.call(this, row);
                        data[i].textHeight += physical.getRowHeight.call(this, row);
                    }
                }
            }
        }
    }
};
