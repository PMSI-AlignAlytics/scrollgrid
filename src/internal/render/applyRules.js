
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/applyRules.js
    Scrollgrid.prototype.internal.render.applyRules = function (data) {

        var int = this.internal,
            render = int.render,
            sizes = int.sizes,
            virtual = sizes.virtual,
            rule,
            key,
            ruleDefinition = {},
            i,
            k,
            r,
            c;

        if (render.formatRules) {

            // Iterate the focus data
            for (i = 0; i < data.length; i += 1) {

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
                    data[i].value = ruleDefinition.formatter(data[i].value);
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

            }
        }
    };
