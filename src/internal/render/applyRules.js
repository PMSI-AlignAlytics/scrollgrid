
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/applyRules.js
Scrollgrid.prototype.internal.render.applyRules = function (data) {
    "use strict";

    var int = this.internal,
        props = this.properties,
        rule,
        key,
        ruleDefinition = {},
        i,
        k,
        r,
        c;

    if (props.formatRules) {

        // Iterate the focus data
        for (i = 0; i < data.length; i += 1) {

            ruleDefinition = {};

            // Rules use 1 based indices for rows and columns, this is because they use negative
            // notation to refer to elements from the end e.g. row: -1 = last row.  This would be
            // inconsistent if 0 was the first row.
            r = data[i].rowIndex + 1;
            c = data[i].columnIndex + 1;

            for (k = 0; k < props.formatRules.length; k += 1) {
                rule = props.formatRules[k];
                if (int.render.matchRule.call(this, rule.row, r, props.virtualOuterHeight) && int.render.matchRule.call(this, rule.column, c, props.virtualOuterWidth)) {
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
        }
    }
};
