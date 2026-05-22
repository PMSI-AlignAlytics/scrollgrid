export function calculateCellAdjustments(self, row, column) {
    const { properties: props, columns } = self;
    const ext = {
        x: 0, y: 0, boxHeight: 0, boxWidth: 0, textHeight: 0, textWidth: 0,
    };

    // Header / footer columns must stretch to absorb the scroll-bar gap.
    if ((row < props.virtualTop || row >= props.virtualOuterHeight - props.virtualBottom) && column === props.virtualOuterWidth - props.virtualRight - 1) {
        ext.boxWidth += props.verticalScrollbarWidth;
    }
    if ((column < props.virtualLeft || column >= props.virtualOuterWidth - props.virtualRight) && row === props.virtualOuterHeight - props.virtualBottom - 1) {
        ext.boxHeight += props.horizontalScrollbarHeight;
    }
    // Adjustments for hiding/showing grid lines at the header boundaries.
    if (row === props.virtualTop - 1) ext.boxHeight -= 1;
    if (row === props.virtualTop && row > 0) {
        ext.boxHeight += 1;
        ext.y -= 1;
    }
    if (column === props.virtualLeft - 1) ext.boxWidth -= 1;
    if (column === props.virtualLeft && column > 0) {
        ext.boxWidth += 1;
        ext.x -= 1;
    }
    if (row === props.virtualOuterHeight - 1) ext.boxHeight -= 1;
    if (column === props.virtualOuterWidth - 1) ext.boxWidth -= 1;

    if (row === props.virtualTop - 1) {
        ext.sortIcon = columns[column]?.sort;
    }
    return ext;
}
