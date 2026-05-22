/**
 * Match a rule selector against a 1-based row/column index.  Supported
 * forms (all combinable with commas):
 *
 *   "12"        match the 12th element
 *   "12,14"     match 12th and 14th
 *   "12:14"     match 12th through 14th inclusive
 *   "-1"        match the last element (negatives count from the end)
 *   "-2:-1"     match the last two
 *   "2:-2"      match all but the first and last
 *   "12(2)16"   match every 2nd element from 12 to 16
 *   "*"         match all elements (same as omitting the selector)
 */
export function matchRule(ruleSelector, toCompare, extremity) {
    if (!ruleSelector || ruleSelector === '*') return true;

    const defs = String(ruleSelector).replace(/\s/g, '').split(',');
    for (const def of defs) {
        const rangeMarker = def.indexOf(':');
        const skipRange = def.match(/(-?\d+)\((\d+)\)(-?\d+)/);

        let lhs;
        let rhs;
        let skip = 1;

        if (rangeMarker !== -1) {
            lhs = parseFloat(def.substring(0, rangeMarker));
            rhs = parseFloat(def.substring(rangeMarker + 1));
        } else if (skipRange && skipRange.length === 4) {
            lhs = parseFloat(skipRange[1]);
            skip = Math.max(parseFloat(skipRange[2]), 1);
            rhs = parseFloat(skipRange[3]);
        } else {
            lhs = parseFloat(def);
            rhs = lhs;
        }

        lhs = lhs < 0 ? extremity + lhs + 1 : lhs;
        rhs = rhs < 0 ? extremity + rhs + 1 : rhs;
        const min = Math.min(lhs, rhs);
        const max = Math.max(lhs, rhs);

        if (min <= toCompare && max >= toCompare && (toCompare - min) % skip === 0) {
            return true;
        }
    }
    return false;
}
