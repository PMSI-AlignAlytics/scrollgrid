
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/headerRows.js
Scrollgrid.prototype.headerRows = function (value, silent) {
    "use strict";

    var virtual = this.internal.sizes.virtual,
        result;

    if (value === undefined) {
        result = virtual.top;
    } else {
        // Set the value and redraw but return self for chaining
        virtual.top = value;
        virtual.innerHeight = virtual.outerHeight - virtual.top - virtual.bottom;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};