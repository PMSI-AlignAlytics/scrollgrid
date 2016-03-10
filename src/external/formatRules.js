
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/formatRules.js
Scrollgrid.prototype.formatRules = function (value, silent) {
    "use strict";

    var render = this.internal.render,
        physical = this.internal.sizes.physical,
        result;

    if (value === undefined) {
        result = render.formatRules;
    } else {
        // Set the value and redraw but return self for chaining
        render.formatRules = value;
        physical.initialiseColumns.call(this);
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};