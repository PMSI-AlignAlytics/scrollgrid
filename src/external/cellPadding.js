
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/cellPadding.js
Scrollgrid.prototype.cellPadding = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.cellPadding;
    } else {
        // Set the value and redraw but return self for chaining
        props.cellPadding = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};
