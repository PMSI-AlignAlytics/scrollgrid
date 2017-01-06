
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/external/on.js
Scrollgrid.prototype.on = function (type, listener, capture) {
    "use strict";

    this.eventHandlers.push({
        type: type,
        listener: listener,
        capture: capture
    });
};
