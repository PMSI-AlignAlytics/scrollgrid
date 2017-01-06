
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/headerColumns.js
Scrollgrid.prototype.headerColumns = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.virtualLeft;
    } else {
        // Set the value and redraw but return self for chaining
        props.virtualLeft = value;
        props.virtualInnerWidth = props.virtualOuterWidth - props.virtualLeft - props.virtualRight;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};
