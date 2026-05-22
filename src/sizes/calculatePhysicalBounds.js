export function calculatePhysicalBounds(self, topMargin) {
    const { properties: props, elements: elems, columns } = self;

    // Variable column widths mean horizontal sizes cost O(n) to calculate.
    props.physicalLeft = 0;
    for (let i = 0; i < props.virtualLeft; i += 1) {
        props.physicalLeft += columns[i].width;
    }
    props.physicalTotalInnerWidth = 0;
    for (let i = props.virtualLeft; i < props.virtualOuterWidth - props.virtualRight; i += 1) {
        props.physicalTotalInnerWidth += columns[i].width;
    }
    props.physicalRight = 0;
    for (let i = props.virtualOuterWidth - props.virtualRight; i < props.virtualOuterWidth; i += 1) {
        props.physicalRight += columns[i].width;
    }

    // Vertical dimensions now come from the cumulative rowOffsets array,
    // which lets per-row heights vary via format rules.  The total grid
    // height is `offsets[virtualOuterHeight]`; sticky-band heights are
    // just slices of the array.
    const offsets = props.rowOffsets;
    if (offsets && offsets.length === props.virtualOuterHeight + 1) {
        const bodyEnd = props.virtualOuterHeight - props.virtualBottom;
        props.physicalTop = offsets[props.virtualTop];
        props.physicalBottom = offsets[props.virtualOuterHeight] - offsets[bodyEnd];
        props.physicalTotalInnerHeight = offsets[bodyEnd] - offsets[props.virtualTop];
    } else {
        // Defensive fallback for the very-early-construction case.
        props.physicalTop = props.virtualTop * props.headerRowHeight;
        props.physicalBottom = props.virtualBottom * props.footerRowHeight;
        props.physicalTotalInnerHeight = (props.virtualInnerHeight ?? 0) * props.rowHeight;
    }

    props.physicalVisibleInnerWidth = elems.container.node().offsetWidth - props.physicalLeft - props.physicalRight;
    props.physicalVisibleInnerHeight = elems.container.node().offsetHeight - props.physicalTop - props.physicalBottom - topMargin;
}
