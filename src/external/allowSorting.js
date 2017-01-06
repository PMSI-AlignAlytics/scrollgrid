
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/allowSorting.js
Scrollgrid.prototype.allowSorting = function (value, silent) {
    "use strict";

    var props = this.properties,
        result;

    if (value === undefined) {
        result = props.allowSorting;
    } else {
        // Set the value and redraw but return self for chaining
        props.allowSorting = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};
