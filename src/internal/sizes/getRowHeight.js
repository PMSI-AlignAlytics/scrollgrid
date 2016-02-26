
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/getRowHeight.js
Scrollgrid.prototype.internal.sizes.physical.getRowHeight = function (row) {
    "use strict";

    var int = this.internal,
        sizes = int.sizes,
        physical = sizes.physical,
        virtual = sizes.virtual,
        rowHeight = 0;

    if (row < virtual.top) {
        rowHeight = physical.headerRowHeight;
    } else if (row < virtual.outerHeight - virtual.bottom) {
        rowHeight = physical.rowHeight;
    } else {
        rowHeight = physical.footerRowHeight;
    }

    return rowHeight;

};