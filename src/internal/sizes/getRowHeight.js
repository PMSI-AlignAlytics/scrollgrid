
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/getRowHeight.js
Scrollgrid.prototype.internal.sizes.getRowHeight = function (row) {
    "use strict";

    var props = this.properties,
        rowHeight = 0;

    if (row < props.virtualTop) {
        rowHeight = props.headerRowHeight;
    } else if (row < props.virtualOuterHeight - props.virtualBottom) {
        rowHeight = props.rowHeight;
    } else {
        rowHeight = props.footerRowHeight;
    }

    return rowHeight;

};
