
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/headerRows.js
Scrollgrid.prototype.headerRows = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.virtualTop;
    } else {
        // Set the value and redraw but return self for chaining
        props.virtualTop = value;
        props.virtualInnerHeight = props.virtualOuterHeight - props.virtualTop - props.virtualBottom;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};
