
    // Copyright: 2015 AlignAlytics
    // License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
    // Source: /src/internal/raise.js
    Scrollgrid.prototype.internal.raise = function (err) {
        if (console && console.error) {
            console.error(err);
        } else {
            throw err;
        }
    };