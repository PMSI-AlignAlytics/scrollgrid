
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/interaction/defaultComparer.js
Scrollgrid.prototype.internal.interaction.defaultComparer = function (a, b) {
    "use strict";

    var order;

    if (isNaN(a) || isNaN(b)) {
        order = (new Date(a)) - (new Date(b));
    } else {
        order = parseFloat(a) - parseFloat(b);
    }
    if (isNaN(order)) {
        order = (a < b ? -1 : (a > b ? 1 : 0));
    }

    return order;

};