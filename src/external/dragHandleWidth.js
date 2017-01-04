
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/dragHandleWidth.js
Scrollgrid.prototype.dragHandleWidth = function (value, silent) {
    "use strict";

    var physical = this.internal.sizes.physical,
        result;

    if (value === undefined) {
        result = physical.dragHandleWidth;
    } else {
        // Set the value and redraw but return self for chaining
        physical.dragHandleWidth = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};