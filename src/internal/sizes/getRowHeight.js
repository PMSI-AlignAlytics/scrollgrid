
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/getRowHeight.js
Scrollgrid.prototype.internal.sizes.physical.getRowHeight = function (row) {
    "use strict";

    var self = this,
        int = self.internal,
        sizes = int.sizes,
        virtual = sizes.virtual,
        rowHeight = 0;

    if (row < self.headerRows) {
        rowHeight = self.headerRowHeight;
    } else if (row < virtual.outerHeight - self.footerRows) {
        rowHeight = self.rowHeight;
    } else {
        rowHeight = self.footerRowHeight;
    }

    return rowHeight;

};