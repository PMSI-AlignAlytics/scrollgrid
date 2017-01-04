
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/matchRule.js
Scrollgrid.prototype.internal.render.matchRule = function (ruleSelector, toCompare, extremity) {
    "use strict";

    // Default for selection is to match.  So no row or column definition will match all
    var match = false,
        defs,
        rangeMarker,
        skipRange,
        skip,
        lhs,
        rhs,
        min,
        max,
        i;

    // Valid rule selectors are:
    //      "12"            Match 12th element of dimension
    //      "12,14"         Match 12th and 14th element of dimension
    //      "12:14"         Match 12th, 13th and 14th element of dimension
    //      "12:14,16"      Match 12th, 13th, 14th and 16th element of dimension
    //      "-1"            Match last element of dimension
    //      "-2:-1"         Match last two elements of dimension
    //      "2:-2"          Match all but first and last element
    //      "12(2)16"       Match every 2nd element from the 12th to the 16th.  i.e. 12th,14th,16th
    //      "*"             Match all elements (same as no selector
    if (!ruleSelector || ruleSelector === "*") {
        match = true;
    } else {
        // Split comma separated into an array, each sub-element can be processed as a rule on its own
        defs = ruleSelector.toString().replace(/\s/g, '').split(",");
        for (i = 0; i < defs.length; i += 1) {
            rangeMarker = defs[i].indexOf(":");
            // Find the pattern a(n)b where we want every nth cell
            skipRange = defs[i].match(/(\-{0,1}[0-9]+)\(([0-9]+)\)(\-{0,1}[0-9]+)/);
            if (rangeMarker !== -1) {
                // Handle ranges a:b
                lhs = parseFloat(defs[i].substring(0, rangeMarker));
                skip = 1;
                rhs = parseFloat(defs[i].substring(rangeMarker + 1));
            } else if (skipRange && skipRange.length === 4) {
                // Handle skip ranges a(n)b
                lhs = parseFloat(skipRange[1]);
                skip = Math.max(parseFloat(skipRange[2]), 1);
                rhs = parseFloat(skipRange[3]);
            } else {
                // Handle single values by creating as a range where both ends match
                lhs = parseFloat(defs[i]);
                skip = 1;
                rhs = lhs;
            }
            // Handle the requirement for negatives to come from the end of the set
            lhs = (lhs < 0 ? extremity + lhs + 1 : lhs);
            rhs = (rhs < 0 ? extremity + rhs + 1 : rhs);
            // Match them from min to max regardless of the way they are defined
            min = Math.min(lhs, rhs);
            max = Math.max(lhs, rhs);
            // Check that the cell is in the range and not skipped
            match = (min <= toCompare && max >= toCompare) && ((toCompare - min) % skip === 0);
            // If any match the rule passes
            if (match) {
                break;
            }
        }
    }

    return match;

};
