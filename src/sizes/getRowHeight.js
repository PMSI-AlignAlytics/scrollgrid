/**
 * Look up the rendered height of a virtual row.
 *
 * Heights live in the cumulative `rowOffsets` array built by
 * {@link buildRowOffsets}: `offsets[row + 1] - offsets[row]`.  If the
 * offsets haven't been built yet (early construction, tests that touch
 * the helper directly) we fall back to the band defaults.
 */
export function getRowHeight(self, row) {
    const { properties: props } = self;
    const offsets = props.rowOffsets;
    if (offsets && offsets.length > row + 1) {
        return offsets[row + 1] - offsets[row];
    }
    if (row < props.virtualTop) return props.headerRowHeight;
    if (row < props.virtualOuterHeight - props.virtualBottom) return props.rowHeight;
    return props.footerRowHeight;
}
