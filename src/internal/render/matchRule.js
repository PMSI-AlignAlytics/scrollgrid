
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/render/matchRule.js
Scrollgrid.prototype.internal.render.matchRule = function (ruleSelector, toCompare, extremity, span, cutPoints) {
    "use strict";

    // Default for selection is to match.  So no row or column definition will match all
    var match = false,
        defs,
        upperOffset,
        rangeMarker,
        lhs,
        rhs,
        upper,
        lower,
        i,
        c;

    // Get the number of places to add to the upper extremity of the range
    upperOffset = Math.max((span || 0) - 1, 0);
    // If there is a header and/or a footer there will be intermediate points over which spans do not cross
    // this array should contain each index at which a region ends
    cutPoints = cutPoints || [0, extremity];

    // Valid rule selectors are:
    //      "12"            Match 12th element of dimension
    //      "12,14"         Match 12th and 14th element of dimension
    //      "12:14"         Match 12th, 13th and 14th element of dimension
    //      "12:14,16"      Match 12th, 13th, 14th and 16th element of dimension
    //      "-1"            Match last element of dimension
    //      "-2:-1"         Match last two elements of dimension
    //      "2:-2"          Match all but first and last elements
    //      "*"             Match all elements (same as no selector
    if (!ruleSelector || ruleSelector === "*") {
        match = true;
    } else {
        // Split comma separated into an array, each sub-element can be processed as a rule on its own
        defs = ruleSelector.toString().replace(/\s/g, '').split(",");
        for (i = 0; i < defs.length; i += 1) {
            rangeMarker = defs[i].indexOf(":");
            if (rangeMarker !== -1) {
                // Handle ranges
                lhs = parseFloat(defs[i].substring(0, rangeMarker));
                rhs = parseFloat(defs[i].substring(rangeMarker + 1));
            } else {
                // Create as a range where both ends match
                lhs = parseFloat(defs[i]);
                rhs = lhs;
            }
            // Handle the requirement for negatives to come from the end of the set
            lhs = (lhs < 0 ? extremity + lhs + 1 : lhs);
            rhs = (rhs < 0 ? extremity + rhs + 1 : rhs);
            // Match them from min to max regardless of the way they are defined
            lower = Math.min(lhs, rhs);
            upper = Math.max(lhs, rhs);
            // If the range crosses any cut points they need to be evaluated as separate ranges
            for (c = 0; c < cutPoints.length - 1; c += 1) {
                if (toCompare > cutPoints[c] && upper > cutPoints[c] && toCompare <= cutPoints[c + 1] && lower <= cutPoints[c + 1]) {
                    match = match || (Math.max(lower, cutPoints[c]) <= toCompare && Math.min(upper + upperOffset, cutPoints[c + 1]) >= toCompare);
                    // If any match the rule passes
                    if (match) {
                        break;
                    }
                }
            }
            // If any match the rule passes
            if (match) {
                break;
            }
        }
    }

    return match;

};
