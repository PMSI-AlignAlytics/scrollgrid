
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/footerColumns.js
Scrollgrid.prototype.footerColumns = function (value) {
    "use strict";

    var virtual = this.internal.sizes.virtual,
        result;

    if (value === undefined) {
        result = virtual.right;
    } else {
        // Set the value and redraw but return self for chaining
        virtual.right = value;
        result = this;
        this.refresh();
    }

    return result;

};