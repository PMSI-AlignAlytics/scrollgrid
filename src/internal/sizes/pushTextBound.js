
// Copyright: 2015 AlignAlytics
// License: "https://github.com/PMSI-AlignAlytics/scrollgrid/blob/master/MIT-LICENSE.txt"
// Source: /src/internal/sizes/pushTextBound.js
Scrollgrid.prototype.internal.sizes.pushTextBound = function (currentBounds, shape, cellPadding, sortIconSize) {
    "use strict";

    var originalText = shape.text(),
        b;

    // Remove any abbreviation
    shape.text(shape.datum().originalText || shape.text());

    // Get the bounds
    b = shape.node().getBBox();
    if (b.width + 2 * cellPadding > currentBounds.width) {
        currentBounds.width = b.width + 2 * cellPadding + sortIconSize;
    }
    if (b.height > currentBounds.height) {
        currentBounds.height = b.height;
    }
    // Reapply abbreviation
    shape.text(originalText);

    // Return the newly stretched bounds
    return currentBounds;

};