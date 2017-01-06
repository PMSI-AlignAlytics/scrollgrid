
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/footerRows.js
Scrollgrid.prototype.footerRows = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.virtualBottom;
    } else {
        // Set the value and redraw but return self for chaining
        props.virtualBottom = value;
        props.virtualInnerHeight = props.virtualOuterHeight - props.virtualTop - props.virtualBottom;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};
