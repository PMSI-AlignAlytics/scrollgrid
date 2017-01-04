
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/allowColumnResizing.js
Scrollgrid.prototype.allowColumnResizing = function (value, silent) {
    "use strict";

    var interaction = this.internal.interaction,
        result;

    if (value === undefined) {
        result = interaction.allowColumnResizing;
    } else {
        // Set the value and redraw but return self for chaining
        interaction.allowColumnResizing = value;
        result = this;
        if (!silent) {
            this.refresh();
        }
    }

    return result;

};