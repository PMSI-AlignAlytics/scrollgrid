
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/headerRows.js
Scrollgrid.prototype.headerRows = function (value) {
    "use strict";

    var virtual = this.internal.sizes.virtual,
        result;

    if (value === undefined) {
        result = virtual.top;
    } else {
        // Set the value and redraw but return self for chaining
        virtual.top = value;
        result = this;
        this.refresh();
    }

    return result;

};