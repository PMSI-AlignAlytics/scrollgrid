import { matchRule } from '../render/matchRule.js';

/**
 * Compute the cumulative pixel y-offset of the top of every virtual row.
 *
 *   rowOffsets[i] = pixel offset of the top of row i (1-based externally,
 *                   but stored 0-based here)
 *   rowOffsets[virtualOuterHeight] = total height of the grid
 *
 * Row heights default to the band default (`headerRowHeight`,
 * `rowHeight`, `footerRowHeight`) and are overridden by any format rule
 * carrying a `rowHeight` property:
 *
 *     { row: '-1', rowHeight: 40 }
 *     { row: '1(2)-1', rowHeight: 22 }
 *
 * Only the rule's `row` selector matters for height — `column` is
 * ignored, just as `columnWidth` rules ignore `row`.  When multiple
 * rules match the same row the last one wins, matching the precedence
 * used elsewhere in {@link applyRules}.
 *
 * Cost: O(virtualOuterHeight × rulesWithHeight).  Float64Array allocation
 * is ~8 bytes per row, so 1M rows ≈ 8 MB resident.  The array is
 * rebuilt only when something layout-relevant changes (data, format
 * rules, header/footer counts, the band-default row heights).
 */
export function buildRowOffsets(self) {
    const { properties: props } = self;
    const total = props.virtualOuterHeight ?? 0;

    if (total <= 0) {
        // Sentinel: a zero-length array still lets callers index
        // `[virtualTop]`, `[virtualOuterHeight]` etc. with zero result.
        props.rowOffsets = new Float64Array(1);
        return;
    }

    const heightRules = (props.formatRules ?? []).filter((r) => r.rowHeight !== undefined);
    const offsets = new Float64Array(total + 1);

    const { virtualTop = 0, virtualBottom = 0 } = props;
    const bodyEnd = total - virtualBottom;

    let cumulative = 0;
    for (let r = 0; r < total; r += 1) {
        offsets[r] = cumulative;

        let height;
        if (r < virtualTop) height = props.headerRowHeight;
        else if (r < bodyEnd) height = props.rowHeight;
        else height = props.footerRowHeight;

        // Later rules override earlier ones — matches applyRules precedence.
        for (const rule of heightRules) {
            if (matchRule(rule.row, r + 1, total)) height = rule.rowHeight;
        }

        cumulative += height;
    }
    offsets[total] = cumulative;

    props.rowOffsets = offsets;
}

/**
 * Binary search: largest virtual row index `i` such that
 * `rowOffsets[i] <= rowOffsets[virtualTop] + bodyRelativeY`.
 *
 * Returned index is *body-relative* (0 = first body row).  Used by
 * {@link getDataBounds} to map a scroll position to a row index in
 * O(log virtualInnerHeight) instead of the O(1) arithmetic that the
 * uniform-row-height version could rely on.
 */
export function findBodyRowAtOffset(self, bodyRelativeY) {
    const { properties: props } = self;
    const offsets = props.rowOffsets;
    const virtualTop = props.virtualTop ?? 0;
    const virtualBottom = props.virtualBottom ?? 0;
    const bodyStart = offsets[virtualTop];
    const target = bodyStart + bodyRelativeY;

    let lo = virtualTop;
    let hi = props.virtualOuterHeight - virtualBottom;
    if (hi <= lo) return 0;

    // Find largest i in [lo, hi] with offsets[i] <= target.
    while (lo < hi) {
        const mid = (lo + hi + 1) >>> 1;
        if (offsets[mid] <= target) lo = mid;
        else hi = mid - 1;
    }
    return lo - virtualTop;
}
