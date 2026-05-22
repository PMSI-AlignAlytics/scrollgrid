import { findBodyRowAtOffset } from '../sizes/buildRowOffsets.js';

/**
 * Map a viewport scroll position to the slice of virtual rows/columns
 * that need rendering.
 *
 * Rows use a binary search on the cumulative `rowOffsets` array so
 * per-row heights (driven by format rules) work without changing the
 * cost class — O(log virtualInnerHeight).  Columns walk left-to-right
 * as before; that was already O(virtualInnerWidth) regardless of any
 * per-column rule.
 */
export function getDataBounds(self, physicalViewArea) {
    const { properties: props, columns: cols } = self;
    const offsets = props.rowOffsets;

    // Body-row indices that bracket the visible window.  +1 overdraw on
    // each side matches the original padding behaviour for smooth scrolling.
    const topRow = findBodyRowAtOffset(self, physicalViewArea.top);
    const bottomRow = findBodyRowAtOffset(self, physicalViewArea.bottom);

    const bounds = {
        physical: { x: 0, y: 0 },
        virtual: {
            top: Math.max(topRow - 1, 0),
            bottom: Math.min(bottomRow + 1, props.virtualInnerHeight ?? 0),
        },
    };

    // Pixel y of the top of the first visible body row, relative to the
    // viewport's scroll origin.
    const bodyStart = offsets ? offsets[props.virtualTop ?? 0] : 0;
    const firstVisibleVirtualRow = (props.virtualTop ?? 0) + bounds.virtual.top;
    const firstVisibleOffset = offsets
        ? offsets[firstVisibleVirtualRow] - bodyStart
        : bounds.virtual.top * props.rowHeight;
    bounds.physical.y = firstVisibleOffset - physicalViewArea.top;

    let runningX = 0;
    let left;
    let right;
    for (let i = 0; i < props.virtualInnerWidth; i += 1) {
        const columnWidth = cols[i + props.virtualLeft].width;
        if (left === undefined && (i === props.virtualInnerWidth - 1 || runningX + columnWidth > physicalViewArea.left)) {
            left = i;
            bounds.physical.x = runningX - physicalViewArea.left;
        }
        if (right === undefined && (i === props.virtualInnerWidth - 1 || runningX + columnWidth > physicalViewArea.right)) {
            right = i + 1;
            break;
        }
        runningX += columnWidth;
    }

    bounds.virtual.left = Math.max(Math.floor(left), 0);
    bounds.virtual.right = Math.min(Math.ceil(right + 1), props.virtualInnerWidth);

    return bounds;
}
