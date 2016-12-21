
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/isMergeVictim.js
Scrollgrid.prototype.internal.render.isMergeVictim = function (row, column) {
    "use strict";

    var int = this.internal,
        render = int.render,
        sizes = int.sizes,
        virtual = sizes.virtual,
        intersected = false,
        rowCutOffs,
        colCutOffs,
        rule,
        k;

    if (render.formatRules) {

        // Pass the bounds of the fixed panel which the current cell is in
        colCutOffs = [0, virtual.left, virtual.outerWidth - virtual.right, virtual.outerWidth];
        rowCutOffs = [0, virtual.top, virtual.outerHeight - virtual.bottom, virtual.outerHeight];

        for (k = 0; k < render.formatRules.length; k += 1) {
            rule = render.formatRules[k];
            // Check that the rule doesn't match directly but does match with span
            intersected = intersected || (
                !(
                    render.matchRule.call(this, rule.column, column, virtual.outerWidth) &&
                    render.matchRule.call(this, rule.row, row, virtual.outerHeight)
                ) &&
                render.matchRule.call(this, rule.column, column, virtual.outerWidth, rule.columnSpan, colCutOffs) &&
                render.matchRule.call(this, rule.row, row, virtual.outerHeight, rule.rowSpan, rowCutOffs)
            );
        }
    }

    return intersected;
};