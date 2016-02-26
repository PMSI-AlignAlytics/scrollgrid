
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/sortIconSize.js
Scrollgrid.prototype.sortIconSize = function (value) {
    "use strict";

    var render = this.internal.render,
        result;

    if (value === undefined) {
        result = render.sortIconSize;
    } else {
        // Set the value and redraw but return self for chaining
        render.sortIconSize = value;
        result = this;
        this.refresh();
    }

    return result;

};