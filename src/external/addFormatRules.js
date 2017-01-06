
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/addFormatRules.js
Scrollgrid.prototype.addFormatRules = function (rules, silent) {
    "use strict";

    var props = this.properties,
        int = this.internal;
    if (rules) {
        // Set the value and redraw but return self for chaining
        props.formatRules = props.formatRules.concat(rules);
        int.sizes.initialiseColumns.call(this);
        if (!silent) {
            this.refresh();
        }
    }

    return props.formatRules;

};
