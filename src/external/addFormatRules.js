
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/addFormatRules.js
Scrollgrid.prototype.addFormatRules = function (rules, silent) {
    "use strict";

    var render = this.internal.render,
        physical = this.internal.sizes.physical;

    if (rules) {
        // Set the value and redraw but return self for chaining
        render.formatRules = render.formatRules.concat(rules);
        physical.initialiseColumns.call(this);
        if (!silent) {
            this.refresh();
        }
    }

    return render.formatRules;

};