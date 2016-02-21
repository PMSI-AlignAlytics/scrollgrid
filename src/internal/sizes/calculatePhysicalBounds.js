
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/calculatePhysicalBounds.js
Scrollgrid.prototype.internal.sizes.calculatePhysicalBounds = function (topMargin) {
    "use strict";

    var self = this,
        int = self.internal,
        sizes = int.sizes,
        virtual = sizes.virtual,
        physical = sizes.physical,
        i;

    // Variable column widths mean horizontal sizes cost O(n) to calculate
    physical.left = 0;
    for (i = 0; i < self.headerColumns; i += 1) {
        physical.left += self.columns[i].width;
    }
    physical.totalInnerWidth = 0;
    for (i = self.headerColumns; i < virtual.outerWidth - self.footerColumns; i += 1) {
        physical.totalInnerWidth += self.columns[i].width;
    }
    physical.right = 0;
    for (i = virtual.outerWidth - self.footerColumns; i < virtual.outerWidth; i += 1) {
        physical.right += self.columns[i].width;
    }

    // Keeping static row height means vertical position calculations can stay O(1)
    physical.top = self.headerRows * self.headerRowHeight;
    physical.bottom = self.footerRows * self.footerRowHeight;
    physical.visibleInnerWidth = int.dom.container.node().offsetWidth - physical.left - physical.right;
    physical.visibleInnerHeight = int.dom.container.node().offsetHeight - physical.top - physical.bottom - topMargin;
    physical.totalInnerHeight = virtual.innerHeight * self.rowHeight;

};