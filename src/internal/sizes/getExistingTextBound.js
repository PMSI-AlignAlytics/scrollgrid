
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/getExistingTextBound.js
Scrollgrid.prototype.internal.sizes.getExistingTextBound = function (surface, column, row) {
    "use strict";

    var self = this,
        int = self.internal,
        sizes = int.sizes,
        returnBounds = { width: 0, height: 0 };

    surface.selectAll("text")
        .filter(function (d) {
            return (column === undefined || d.columnIndex === column) && (row === undefined || d.rowIndex === row);
        })
        .each(function (d) {
            var sortIconSize = (d.sortIcon && d.sortIcon !== 'none' ? self.sortIconSize + d.cellPadding : 0);
            returnBounds = sizes.pushTextBound(returnBounds, d3.select(this), d.cellPadding, sortIconSize);
        });

    return returnBounds;

};