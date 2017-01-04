
// Copyright: 2017 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/raise.js
Scrollgrid.prototype.internal.raise = function (err) {
    "use strict";

    var log = this.reporter || console;
    if (log && log.error) {
        log.error(err);
    } else {
        throw err;
    }

};