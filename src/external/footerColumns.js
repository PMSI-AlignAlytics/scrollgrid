
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/footerColumns.js
Scrollgrid.prototype.footerColumns = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.virtualRight;
    } else {
        // Set the value and redraw but return self for chaining
        props.virtualRight = value;
        props.virtualInnerWidth = props.virtualOuterWidth - props.virtualLeft - props.virtualRight;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};
