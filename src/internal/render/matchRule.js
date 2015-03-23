
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/render/matchRule.js
    Scrollgrid.prototype.internal.render.matchRule = function (ruleSelector, toCompare, extremity) {

        // Default for selection is to match.  So no row or column definition will match all
        var match = false,
            defs,
            rangeMarker,
            lhs,
            rhs,
            i;

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
                match = match || (Math.min(lhs, rhs) <= toCompare && Math.max(lhs, rhs) >= toCompare);
                // If any match the rule passes
                if (match) {
                    break;
                }
            }
        }

        return match;

    };
