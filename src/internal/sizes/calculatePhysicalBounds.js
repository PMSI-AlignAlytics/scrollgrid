
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/calculatePhysicalBounds.js
Scrollgrid.prototype.internal.sizes.calculatePhysicalBounds = function (topMargin) {
    "use strict";

    var props = this.properties,
        elems = this.elements,
        i;

    // Variable column widths mean horizontal sizes cost O(n) to calculate
    props.physicalLeft = 0;
    for (i = 0; i < props.virtualLeft; i += 1) {
        props.physicalLeft += this.columns[i].width;
    }
    props.physicalTotalInnerWidth = 0;
    for (i = props.virtualLeft; i < props.virtualOuterWidth - props.virtualRight; i += 1) {
        props.physicalTotalInnerWidth += this.columns[i].width;
    }
    props.physicalRight = 0;
    for (i = props.virtualOuterWidth - props.virtualRight; i < props.virtualOuterWidth; i += 1) {
        props.physicalRight += this.columns[i].width;
    }

    // Keeping static row height means vertical position calculations can stay O(1)
    props.physicalTop = props.virtualTop * props.headerRowHeight;
    props.physicalBottom = props.virtualBottom * props.footerRowHeight;
    props.physicalVisibleInnerWidth = elems.container.node().offsetWidth - props.physicalLeft - props.physicalRight;
    props.physicalVisibleInnerHeight = elems.container.node().offsetHeight - props.physicalTop - props.physicalBottom - topMargin;
    props.physicalTotalInnerHeight = props.virtualInnerHeight * props.rowHeight;

};
