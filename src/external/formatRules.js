
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/formatRules.js
Scrollgrid.prototype.formatRules = function (value, silent) {
    "use strict";

    var int = this.internal,
        props = this.properties,
        result;

    if (value === undefined) {
        result = props.formatRules;
    } else {
        // Set the value and redraw but return self for chaining
        props.formatRules = value;
        int.sizes.initialiseColumns.call(this);
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};
