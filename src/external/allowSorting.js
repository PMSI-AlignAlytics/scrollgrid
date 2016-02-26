
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/allowSorting.js
Scrollgrid.prototype.allowSorting = function (value) {
    "use strict";

    var interaction = this.internal.interaction,
        result;

    if (value === undefined) {
        result = interaction.allowSorting;
    } else {
        // Set the value and redraw but return self for chaining
        interaction.allowSorting = value;
        result = this;
        this.refresh();
    }

    return result;

};